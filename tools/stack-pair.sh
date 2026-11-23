#!/usr/bin/env bash
# Fresh databases and reco containers for V3 (v30) and V3.1 (v31), restored from the same dump.
set -euo pipefail; export MSYS_NO_PATHCONV=1
R=/e/ANGI-Agent-Eval; set -a; . $R/.secrets.env; set +a
docker start angi-eval-pg >/dev/null; for i in $(seq 1 30); do docker exec angi-eval-pg pg_isready -U postgres -q && break; sleep 1; done
for p in v30:3 v31:4; do v=${p%:*}; i=${p#*:}; db=angi_eval_$v
  docker rm -f angi-eval-reco-$v >/dev/null 2>&1 || true
  docker exec angi-eval-pg psql -U postgres -q -c "drop database if exists $db with (force)"
  docker exec angi-eval-pg createdb -U postgres $db
  docker exec angi-eval-pg pg_restore -U postgres -d $db /seed/base.dump > $R/runs/_setup/restore-$v.log 2>&1 || true
  docker exec angi-eval-pg psql -U postgres -d $db -q -c 'truncate table core.agent_proposals, core.agent_messages, core.agent_conversations restart identity'
  docker run -d --name angi-eval-reco-$v --network angi-eval -p 127.0.0.1:1811$i:8000 -e DATABASE_URL="postgresql://angi_reco:$PG_RECO@angi-eval-pg:5432/$db" -e RECO_API_KEY="$RECO_KEY" -e LLM_BASE_URL=http://127.0.0.1:9/v1/ -e LLM_TIMEOUT_SECONDS=1 -e ENVIRONMENT=development -e LOG_LEVEL=INFO -e PYTHONDONTWRITEBYTECODE=1 -e PYTHONPATH=/srv/angi-source -v E:/ANGI-Agent-Eval/src/reco:/srv/angi-source:ro angi-reco-runtime:local >/dev/null
  echo "$v restore_errors=$(grep -c 'error:' $R/runs/_setup/restore-$v.log || true) md5=$(docker exec angi-eval-pg psql -U postgres -d $db -At -c "select md5(string_agg(id||':'||name||':'||price, ',' order by id)) from core.dishes")"
done
