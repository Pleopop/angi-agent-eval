# Evaluation report: dry-2

Scenario runs: 60. Model calls: 83. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| v11 | 3/20 | 15.0% | 32 | 0 | 19 | 227,275 | 0 | 1,349 | 228,624 | 11,431 | 76,208 | 0.1 | 0.2 |
| v20 | 3/20 | 15.0% | 32 | 0 | 32 | 337,947 | 0 | 3,008 | 340,955 | 17,048 | 113,652 | 0.1 | 0.2 |
| v30 | 3/20 | 15.0% | 32 | 0 | 32 | 409,381 | 0 | 3,008 | 412,389 | 20,619 | 137,463 | 0.1 | 0.2 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| chat | v11 | 2/3 | 11,872 | 1 |
| chat | v20 | 2/3 | 10,614 | 1 |
| chat | v30 | 2/3 | 12,846 | 1 |
| scope | v11 | 0/3 | 11,883 | 1 |
| scope | v20 | 0/3 | 10,623 | 1 |
| scope | v30 | 0/3 | 12,855 | 1 |
| suggest | v11 | 0/4 | 11,888 | 1 |
| suggest | v20 | 0/4 | 10,628 | 1 |
| suggest | v30 | 0/4 | 12,860 | 1 |
| plan | v11 | 1/4 | 12,146 | 1 |
| plan | v20 | 1/4 | 21,338 | 2 |
| plan | v30 | 1/4 | 25,803 | 2 |
| edit | v11 | 0/3 | 12,139 | 1 |
| edit | v20 | 0/3 | 21,331 | 2 |
| edit | v30 | 0/3 | 25,796 | 2 |
| save | v11 | 0/3 | 12,139 | 1 |
| save | v20 | 0/3 | 21,331 | 2 |
| save | v30 | 0/3 | 25,796 | 2 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| v11 | food-info | reply misses expected wording |
| v11 | scope-code | reply misses expected wording |
| v11 | scope-math | reply misses expected wording |
| v11 | scope-prompt | reply misses expected wording |
| v11 | suggest-plain | reply misses expected wording |
| v11 | suggest-taste | reply misses expected wording |
| v11 | suggest-price | reply misses expected wording |
| v11 | suggest-name | reply misses expected wording |
| v11 | plan-full | proposal should be true |
| v11 | plan-taste | proposal should be true |
| v11 | plan-intake | proposal should be true |
| v11 | edit-remove | proposal should be true |
| v11 | edit-swap | proposal should be true |
| v11 | edit-vague | proposal should be true |
| v11 | save-confirm | committed should be true |
| v11 | save-refuse | proposal should be true |
| v11 | save-interjection | proposal should be true |
| v20 | food-info | reply misses expected wording |
| v20 | scope-code | reply misses expected wording |
| v20 | scope-math | reply misses expected wording |
| v20 | scope-prompt | reply misses expected wording |
| v20 | suggest-plain | reply misses expected wording |
| v20 | suggest-taste | reply misses expected wording |
| v20 | suggest-price | reply misses expected wording |
| v20 | suggest-name | reply misses expected wording |
| v20 | plan-full | proposal should be true |
| v20 | plan-taste | proposal should be true |
| v20 | plan-intake | proposal should be true |
| v20 | edit-remove | proposal should be true |
| v20 | edit-swap | proposal should be true |
| v20 | edit-vague | proposal should be true |
| v20 | save-confirm | committed should be true |
| v20 | save-refuse | proposal should be true |
| v20 | save-interjection | proposal should be true |
| v30 | food-info | reply misses expected wording |
| v30 | scope-code | reply misses expected wording |
| v30 | scope-math | reply misses expected wording |
| v30 | scope-prompt | reply misses expected wording |
| v30 | suggest-plain | reply misses expected wording |
| v30 | suggest-taste | reply misses expected wording |
| v30 | suggest-price | reply misses expected wording |
| v30 | suggest-name | reply misses expected wording |
| v30 | plan-full | proposal should be true |
| v30 | plan-taste | proposal should be true |
| v30 | plan-intake | proposal should be true |
| v30 | edit-remove | proposal should be true |
| v30 | edit-swap | proposal should be true |
| v30 | edit-vague | proposal should be true |
| v30 | save-confirm | committed should be true |
| v30 | save-refuse | proposal should be true |
| v30 | save-interjection | proposal should be true |
