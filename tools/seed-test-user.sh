#!/usr/bin/env bash
# Adds the evaluation test account (seed/test-user.sql) to the evaluation databases only (VERSIONS, default all four).
# Production data has no *@local.angi.test account, and every scenario logs in with it.
set -euo pipefail; export MSYS_NO_PATHCONV=1
docker cp "E:/ANGI-Agent-Eval/seed/test-user.sql" angi-eval-pg:/seed/test-user.sql
for v in ${VERSIONS:-v11 v20 v30 v31}; do
  docker exec angi-eval-pg psql -U postgres -d "angi_eval_$v" -v ON_ERROR_STOP=1 -q -f /seed/test-user.sql
  echo "$v test user id=$(docker exec angi-eval-pg psql -U postgres -d "angi_eval_$v" -At -c "select id from core.users where email='agent.personalized@local.angi.test'")"
done
