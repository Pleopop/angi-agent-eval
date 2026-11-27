# Evaluation report: models-try-5

Scenario runs: 6. Model calls: 42. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| v30 | 2/2 | 100.0% | 3 | 0 | 11 | 201,257 | 176,652 | 3,207 | 204,464 | 102,232 | 102,232 | 13.6 | 14.2 |
| v31 | 0/2 | 0.0% | 4 | 2 | 16 | 464,170 | 108,529 | 6,546 | 470,716 | 235,358 | n/a | 12.2 | 15.6 |
| v40 | 2/2 | 100.0% | 3 | 0 | 15 | 320,546 | 106,325 | 6,131 | 326,677 | 163,339 | 163,339 | 12.8 | 18.2 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| plan | v30 | 1/1 | 51,093 | 3 |
| plan | v31 | 0/1 | 238,799 | 8 |
| plan | v40 | 1/1 | 129,898 | 6 |
| edit | v30 | 1/1 | 153,371 | 8 |
| edit | v31 | 0/1 | 231,917 | 8 |
| edit | v40 | 1/1 | 196,779 | 9 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| v31 | plan-full | turn 1: HTTP 503 AGENT_UNAVAILABLE; proposal should be true |
| v31 | edit-add-dish | turn 1: HTTP 503 AGENT_UNAVAILABLE; proposal should be true |
