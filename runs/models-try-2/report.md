# Evaluation report: models-try-2

Scenario runs: 3. Model calls: 14. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| v30 | 1/1 | 100.0% | 2 | 0 | 8 | 152,378 | 129,766 | 2,189 | 154,567 | 154,567 | 154,567 | 14.2 | 14.2 |
| v31 | 0/1 | 0.0% | 2 | 2 | 2 | 0 | 0 | 0 | 0 | 0 | n/a | 1.8 | 1.8 |
| v40 | 0/1 | 0.0% | 2 | 2 | 4 | 15,365 | 10,721 | 731 | 16,096 | 16,096 | n/a | 3.5 | 3.5 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| edit | v30 | 1/1 | 154,567 | 8 |
| edit | v31 | 0/1 | 0 | 2 |
| edit | v40 | 0/1 | 16,096 | 4 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| v31 | edit-add-dish | turn 1: HTTP 503 AGENT_UNAVAILABLE; turn 2: HTTP 503 AGENT_UNAVAILABLE; proposal should be true; reply is empty |
| v40 | edit-add-dish | turn 1: HTTP 503 AGENT_UNAVAILABLE; turn 2: HTTP 503 AGENT_UNAVAILABLE; proposal should be true; reply is empty |
