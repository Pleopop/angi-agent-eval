# Evaluation report: models-try-3

Scenario runs: 6. Model calls: 25. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| v30 | 2/2 | 100.0% | 3 | 0 | 10 | 177,965 | 157,671 | 3,105 | 181,070 | 90,535 | 90,535 | 14.3 | 14.9 |
| v31 | 0/2 | 0.0% | 4 | 4 | 4 | 0 | 0 | 0 | 0 | 0 | n/a | 0.7 | 1.9 |
| v40 | 1/2 | 50.0% | 3 | 1 | 11 | 197,467 | 97,448 | 4,725 | 202,192 | 101,096 | 202,192 | 12.3 | 16.1 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| plan | v30 | 1/1 | 51,059 | 3 |
| plan | v31 | 0/1 | 0 | 2 |
| plan | v40 | 1/1 | 101,916 | 5 |
| edit | v30 | 1/1 | 130,011 | 7 |
| edit | v31 | 0/1 | 0 | 2 |
| edit | v40 | 0/1 | 100,276 | 6 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| v31 | plan-full | turn 1: HTTP 503 AGENT_UNAVAILABLE; turn 2: HTTP 503 AGENT_UNAVAILABLE; proposal should be true; reply is empty |
| v31 | edit-add-dish | turn 1: HTTP 503 AGENT_UNAVAILABLE; turn 2: HTTP 503 AGENT_UNAVAILABLE; proposal should be true; reply is empty |
| v40 | edit-add-dish | turn 2: HTTP 503 AGENT_UNAVAILABLE; turn 2: newProposal should be true; reply is empty |
