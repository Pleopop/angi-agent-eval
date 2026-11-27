# Evaluation report: models-try-4

Scenario runs: 3. Model calls: 20. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| v30 | 1/1 | 100.0% | 2 | 0 | 8 | 149,090 | 129,771 | 1,747 | 150,837 | 150,837 | 150,837 | 15.0 | 15.0 |
| v31 | 0/1 | 0.0% | 2 | 2 | 2 | 0 | 0 | 0 | 0 | 0 | n/a | 1.8 | 1.8 |
| v40 | 0/1 | 0.0% | 2 | 0 | 10 | 214,633 | 20,176 | 3,656 | 218,289 | 218,289 | n/a | 15.9 | 15.9 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| edit | v30 | 1/1 | 150,837 | 8 |
| edit | v31 | 0/1 | 0 | 2 |
| edit | v40 | 0/1 | 218,289 | 10 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| v31 | edit-add-dish | turn 1: HTTP 503 AGENT_UNAVAILABLE; turn 2: HTTP 503 AGENT_UNAVAILABLE; proposal should be true; reply is empty |
| v40 | edit-add-dish | draft check: the added dish replaced an existing one |
