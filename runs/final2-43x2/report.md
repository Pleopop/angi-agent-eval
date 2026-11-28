# Evaluation report: final2-43x2

Scenario runs: 86. Model calls: 551. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| v30 | 82/86 | 95.3% | 180 | 0 | 551 | 10,571,310 | 7,871,228 | 146,061 | 10,717,371 | 124,621 | 130,700 | 7.8 | 17.6 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| chat | v30 | 6/6 | 9,039 | 1 |
| scope | v30 | 6/6 | 9,061 | 1 |
| suggest | v30 | 8/8 | 35,719 | 3 |
| plan | v30 | 8/8 | 77,927 | 5 |
| edit | v30 | 10/10 | 166,466 | 8 |
| save | v30 | 6/6 | 65,053 | 4 |
| area | v30 | 13/14 | 44,620 | 4 |
| conversation | v30 | 25/28 | 222,933 | 11 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| v30 | c131-korean | check replaceKorean:1/lunch:x: othersKept=true was=Sushi tổng hợp now=Sushi tổng hợp |
| v30 | c109-spicy-after-specialty | check notFromOffered: items=0 fromOffered=0 |
| v30 | noithanh-suggest | check insideZone: dishes=0 outer=0 |
| v30 | c-extend-then-budget | check newDraft: Ngân sách 200.000 đồng mỗi ngày cho lịch 4 ngày tương ứng 800.000 đồng cả chuyến. Mình chưa thể cập nhật lịch  |
