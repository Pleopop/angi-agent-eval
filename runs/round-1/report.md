# Evaluation report: round-1

Scenario runs: 60. Model calls: 161. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| v11 | 18/20 | 90.0% | 40 | 0 | 38 | 343,120 | 262,023 | 14,330 | 357,450 | 17,873 | 19,858 | 2.5 | 13.9 |
| v20 | 18/20 | 90.0% | 32 | 0 | 63 | 682,124 | 460,911 | 17,582 | 699,706 | 34,985 | 38,873 | 6.4 | 17.1 |
| v30 | 16/20 | 80.0% | 37 | 0 | 60 | 717,119 | 486,402 | 15,625 | 732,744 | 36,637 | 45,797 | 3.0 | 16.4 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| chat | v11 | 3/3 | 7,841 | 1 |
| chat | v20 | 3/3 | 7,362 | 1 |
| chat | v30 | 3/3 | 8,585 | 1 |
| scope | v11 | 3/3 | 7,848 | 1 |
| scope | v20 | 3/3 | 7,390 | 1 |
| scope | v30 | 3/3 | 8,611 | 1 |
| suggest | v11 | 2/4 | 15,734 | 2 |
| suggest | v20 | 3/4 | 25,773 | 3 |
| suggest | v30 | 4/4 | 32,456 | 3 |
| plan | v11 | 4/4 | 30,177 | 3 |
| plan | v20 | 4/4 | 47,688 | 4 |
| plan | v30 | 3/4 | 56,044 | 4 |
| edit | v11 | 3/3 | 18,698 | 2 |
| edit | v20 | 3/3 | 48,833 | 4 |
| edit | v30 | 2/3 | 67,709 | 5 |
| save | v11 | 3/3 | 30,063 | 3 |
| save | v20 | 2/3 | 48,874 | 4 |
| save | v30 | 1/3 | 90,316 | 6 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| v11 | suggest-plain | reply misses expected wording |
| v11 | suggest-taste | reply misses expected wording |
| v20 | suggest-name | reply misses expected wording |
| v30 | plan-taste | proposal should be true |
| v30 | edit-remove | proposal should be true |
| v30 | save-confirm | committed should be true |
| v20 | save-confirm | committed should be true |
| v30 | save-interjection | proposal should be true |
