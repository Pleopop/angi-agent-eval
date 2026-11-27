# Evaluation report: models-try-1

Scenario runs: 6. Model calls: 22. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| gemini | 0/2 | 0.0% | 4 | 4 | 8 | 30,730 | 16,080 | 1,466 | 32,196 | 16,098 | n/a | 2.5 | 4.6 |
| haiku | 0/2 | 0.0% | 4 | 4 | 4 | 0 | 0 | 0 | 0 | 0 | n/a | 1.2 | 2.8 |
| luna | 2/2 | 100.0% | 3 | 0 | 10 | 178,169 | 65,939 | 3,193 | 181,362 | 90,681 | 90,681 | 13.3 | 15.5 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| plan | gemini | 0/1 | 16,098 | 4 |
| plan | haiku | 0/1 | 0 | 2 |
| plan | luna | 1/1 | 51,087 | 3 |
| edit | gemini | 0/1 | 16,098 | 4 |
| edit | haiku | 0/1 | 0 | 2 |
| edit | luna | 1/1 | 130,275 | 7 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| haiku | plan-full | turn 1: HTTP 503 AGENT_UNAVAILABLE; turn 2: HTTP 503 AGENT_UNAVAILABLE; proposal should be true; reply is empty |
| gemini | plan-full | turn 1: HTTP 503 AGENT_UNAVAILABLE; turn 2: HTTP 503 AGENT_UNAVAILABLE; proposal should be true; reply is empty |
| haiku | edit-add-dish | turn 1: HTTP 503 AGENT_UNAVAILABLE; turn 2: HTTP 503 AGENT_UNAVAILABLE; proposal should be true; reply is empty |
| gemini | edit-add-dish | turn 1: HTTP 503 AGENT_UNAVAILABLE; turn 2: HTTP 503 AGENT_UNAVAILABLE; proposal should be true; reply is empty |
