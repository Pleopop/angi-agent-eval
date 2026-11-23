# Evaluation report: round-2

Scenario runs: 40. Model calls: 184. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| v30 | 15/20 | 75.0% | 54 | 0 | 91 | 1,213,390 | 1,048,407 | 28,131 | 1,241,521 | 62,076 | 82,768 | 3.1 | 16.7 |
| v31 | 19/20 | 95.0% | 48 | 0 | 93 | 1,304,361 | 1,022,935 | 31,735 | 1,336,096 | 66,805 | 70,321 | 6.3 | 18.7 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| plan | v30 | 6/8 | 55,931 | 4 |
| plan | v31 | 7/8 | 56,015 | 4 |
| edit | v30 | 5/6 | 67,640 | 5 |
| edit | v31 | 6/6 | 67,632 | 5 |
| save | v30 | 4/6 | 67,680 | 5 |
| save | v31 | 6/6 | 67,615 | 5 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| v30 | plan-full | proposal should be true |
| v31 | plan-taste | proposal should be true |
| v30 | plan-taste | proposal should be true |
| v30 | save-confirm | committed should be true; turn 5: says it saved, nothing saved |
| v30 | edit-swap | proposal should be true |
| v30 | save-confirm | committed should be true |
