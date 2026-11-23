#!/usr/bin/env bash
# V1.1 and V2.0 predate the meal_role, cooking_method and ingredient tag types of the production catalog: reading such a tag
# fails with KeyNotFoundException and every turn returns HTTP 500. They never used these tags, so the tags (and their
# dish links, removed by cascade) are dropped from those two evaluation databases only. Dishes, prices, restaurants,
# vectors and the older tag types stay identical to the other versions.
set -euo pipefail; export MSYS_NO_PATHCONV=1
for v in v11 v20; do
  n=$(docker exec angi-eval-pg psql -U postgres -d "angi_eval_$v" -At -v ON_ERROR_STOP=1 -c "with d as (delete from core.tags where tag_type in ('meal_role','cooking_method','ingredient') returning 1) select count(*) from d")
  echo "$v removed $n tags of types unknown to it; left: $(docker exec angi-eval-pg psql -U postgres -d "angi_eval_$v" -At -c "select string_agg(tag_type||'='||c, ', ') from (select tag_type, count(*) c from core.tags group by 1 order by 1) s")"
done
