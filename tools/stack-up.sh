#!/usr/bin/env bash
# Isolated evaluation stack: own network, volume, Postgres and reco containers. Never touches angi-postgres or angi-reco.
set -euo pipefail; export MSYS_NO_PATHCONV=1
R=/e/ANGI-Agent-Eval; set -a; . $R/.secrets.env; set +a
IMG=pgvector/pgvector:0.8.7-pg16; DUMP="${SEED_DUMP:-E:/ANGI-Agent-Eval/seed/angi-prod-sync-20261123.dump}"
docker network inspect angi-eval >/dev/null 2>&1 || docker network create angi-eval >/dev/null
docker volume create angi-eval-pgdata >/dev/null
docker ps -a --format '{{.Names}}' | grep -qx angi-eval-pg || docker run -d --name angi-eval-pg --network angi-eval -p 127.0.0.1:55432:5432 -e POSTGRES_PASSWORD="$PG_SUPER" -e TZ=UTC -v angi-eval-pgdata:/var/lib/postgresql/data $IMG >/dev/null
docker start angi-eval-pg >/dev/null
for i in $(seq 1 60); do docker exec angi-eval-pg pg_isready -U postgres -q && break; sleep 1; done; sleep 2
P="docker exec -i angi-eval-pg psql -U postgres -v ON_ERROR_STOP=1 -q"
$P <<S
do \$\$ begin
 if not exists (select from pg_roles where rolname='angi_backend') then create role angi_backend login password '$PG_BACKEND'; end if;
 if not exists (select from pg_roles where rolname='angi_reco') then create role angi_reco login password '$PG_RECO'; end if;
 if not exists (select from pg_roles where rolname='angi_session_test') then create role angi_session_test nologin; end if;
end \$\$;
S
docker exec angi-eval-pg mkdir -p /seed; docker cp "$DUMP" angi-eval-pg:/seed/base.dump >/dev/null
$P -c "alter role angi_backend set search_path=core,public" -c "alter role angi_reco set search_path=recommendation,public"
VS="${VERSIONS:-v11 v20 v30 v31 v40}"
for v in $VS; do
  db=angi_eval_$v
  docker exec angi-eval-pg psql -U postgres -c "drop database if exists $db with (force)" -q
  docker exec angi-eval-pg createdb -U postgres $db
  docker exec angi-eval-pg pg_restore -U postgres -d $db /seed/base.dump > $R/runs/_setup/restore-$v.log 2>&1 || true
  echo "$v restore_errors=$(grep -c 'error:' $R/runs/_setup/restore-$v.log || true)"
  docker exec angi-eval-pg psql -U postgres -d $db -q -c 'truncate table core.agent_proposals, core.agent_messages, core.agent_conversations restart identity'
done
for v in $VS; do case $v in v11) i=1;; v20) i=2;; v30) i=3;; v31) i=4;; v40) i=5;; esac; n=angi-eval-reco-$v; docker rm -f $n >/dev/null 2>&1 || true
  docker run -d --name $n --network angi-eval -p 127.0.0.1:1811$i:8000 -e DATABASE_URL="postgresql://angi_reco:$PG_RECO@angi-eval-pg:5432/angi_eval_$v" -e RECO_API_KEY="$RECO_KEY" -e LLM_BASE_URL=http://127.0.0.1:9/v1/ -e LLM_TIMEOUT_SECONDS=1 -e ENVIRONMENT=development -e LOG_LEVEL=INFO -e PYTHONDONTWRITEBYTECODE=1 -e PYTHONPATH=/srv/angi-source -v E:/ANGI-Agent-Eval/src/reco:/srv/angi-source:ro angi-reco-runtime:local >/dev/null
done
sleep 6; docker ps --filter name=angi-eval --format '{{.Names}} {{.Status}} {{.Ports}}'
