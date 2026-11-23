# Evaluation report: round-3/v11-v20-v30

Scenario runs: 12. Model calls: 74. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| v11 | 1/4 | 25.0% | 12 | 0 | 20 | 225,150 | 154,123 | 6,919 | 232,069 | 58,017 | 232,069 | 11.9 | 14.6 |
| v20 | 2/4 | 50.0% | 11 | 0 | 32 | 447,417 | 342,791 | 9,676 | 457,093 | 114,273 | 228,547 | 13.6 | 16.4 |
| v30 | 1/4 | 25.0% | 10 | 0 | 22 | 338,246 | 263,508 | 6,278 | 344,524 | 86,131 | 344,524 | 3.6 | 19.4 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| edit | v11 | 1/4 | 58,169 | 5 |
| edit | v20 | 2/4 | 127,067 | 9 |
| edit | v30 | 1/4 | 134,758 | 8 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| v11 | edit-add-dish | turn 3: newProposal should be true |
| v20 | edit-add-dish | draft check: the added dish replaced an existing one |
| v30 | edit-add-dish | proposal should be true |
| v11 | edit-add-meal | turn 3: newProposal should be true |
| v20 | edit-add-dish | draft check: the added dish replaced an existing one |
| v30 | edit-add-dish | draft check: the added dish replaced an existing one |
| v11 | edit-add-dish | turn 3: newProposal should be true |
| v30 | edit-add-meal | proposal should be true |
