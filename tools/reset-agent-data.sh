#!/usr/bin/env bash
# Clears earlier Agent conversations in the evaluation databases (VERSIONS, default all four) only, so every version starts from the same empty state.
set -euo pipefail
for v in ${VERSIONS:-v11 v20 v30 v31}; do
  docker exec angi-eval-pg psql -U postgres -d "angi_eval_$v" -v ON_ERROR_STOP=1 -q -c 'truncate table core.agent_proposals, core.agent_messages, core.agent_conversations restart identity'
  echo "$v conversations=$(docker exec angi-eval-pg psql -U postgres -d "angi_eval_$v" -At -c 'select count(*) from core.agent_conversations')"
done
