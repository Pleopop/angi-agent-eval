# Evaluation report: models-1

Scenario runs: 180. Model calls: 1224. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| gemini | 25/36 | 69.4% | 82 | 7 | 329 | 7,651,628 | 1,730,544 | 106,965 | 7,758,593 | 215,516 | 310,344 | 10.1 | 18.0 |
| haiku | 14/36 | 38.9% | 95 | 19 | 274 | 7,074,194 | 848,744 | 121,932 | 7,196,126 | 199,892 | 514,009 | 5.9 | 12.8 |
| luna | 90/108 | 83.3% | 245 | 19 | 621 | 10,867,155 | 7,755,368 | 167,527 | 11,034,682 | 102,173 | 122,608 | 7.5 | 14.6 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| chat | gemini | 3/3 | 11,770 | 1 |
| chat | haiku | 3/3 | 14,885 | 1 |
| chat | luna | 9/9 | 8,887 | 1 |
| scope | gemini | 3/3 | 11,796 | 1 |
| scope | haiku | 2/3 | 14,905 | 1 |
| scope | luna | 9/9 | 8,908 | 1 |
| suggest | gemini | 4/4 | 37,671 | 3 |
| suggest | haiku | 4/4 | 60,984 | 3 |
| suggest | luna | 10/12 | 34,692 | 3 |
| plan | gemini | 4/4 | 109,942 | 5 |
| plan | haiku | 2/4 | 187,934 | 7 |
| plan | luna | 11/12 | 59,653 | 4 |
| edit | gemini | 4/5 | 217,886 | 10 |
| edit | haiku | 1/5 | 188,474 | 7 |
| edit | luna | 13/15 | 107,142 | 6 |
| save | gemini | 2/3 | 122,962 | 6 |
| save | haiku | 0/3 | 174,575 | 7 |
| save | luna | 8/9 | 62,872 | 4 |
| area | gemini | 4/7 | 37,900 | 3 |
| area | haiku | 2/7 | 77,267 | 4 |
| area | luna | 18/21 | 51,133 | 3 |
| conversation | gemini | 1/7 | 636,195 | 24 |
| conversation | haiku | 0/7 | 358,490 | 15 |
| conversation | luna | 12/21 | 372,493 | 17 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| haiku | scope-math | reply contains forbidden content |
| haiku | plan-full | turn 1: HTTP 503 AGENT_UNAVAILABLE; proposal should be true |
| haiku | plan-tight | turn 1: HTTP 503 AGENT_UNAVAILABLE |
| haiku | edit-remove | turn 2: HTTP 503 AGENT_UNAVAILABLE; proposal should be true; reply is empty |
| haiku | edit-swap | turn 1: HTTP 503 AGENT_UNAVAILABLE; proposal should be true |
| haiku | edit-vague | turn 1: HTTP 503 AGENT_UNAVAILABLE; proposal should be true |
| haiku | edit-add-dish | turn 1: HTTP 503 AGENT_UNAVAILABLE; proposal should be true |
| gemini | edit-add-dish | draft check: the added dish replaced an existing one |
| haiku | save-confirm | turn 2: says it saved, nothing saved; turn 3: says it saved, nothing saved |
| gemini | save-confirm | turn 2: says it saved, nothing saved; turn 3: says it saved, nothing saved |
| haiku | save-refuse | proposal should be true |
| haiku | save-interjection | turn 1: HTTP 503 AGENT_UNAVAILABLE; proposal should be true |
| gemini | noido-suggest | check insideZone: dishes=10 outer=3 |
| gemini | noithanh-suggest | check insideZone: dishes=10 outer=3 |
| haiku | noido-plan | turn 2: HTTP 503 AGENT_UNAVAILABLE; reply is empty; check insideZone: draftItems=0 outer=0 |
| haiku | area-nodata | turn 2: HTTP 503 AGENT_UNAVAILABLE; reply is empty |
| luna | comrang-plan | check pickedFromList: wanted=415 dinnerDay1=none |
| haiku | comrang-plan | turn 2: HTTP 503 AGENT_UNAVAILABLE; check pickedFromList: wanted=126 dinnerDay1=none |
| haiku | quan-nuoc | reply is empty; check drinksOnly: dishes=0 drinks=0 |
| haiku | xadan-buffet | check located: located=true dishes=0 km= |
| gemini | comrang-plan | check pickedFromList: wanted=415 dinnerDay1=127 |
| haiku | c13-add-named-dish | turn 5: HTTP 503 AGENT_UNAVAILABLE; turn 6: HTTP 503 AGENT_UNAVAILABLE; reply is empty; check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check adds: before=0 after=0 keptAll=true new= |
| gemini | c13-add-named-dish | check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check adds: before=0 after=0 keptAll=true new= |
| haiku | c14-add-kind | check list: lines=0 |
| gemini | c14-add-kind | check adds: before=9 after=9 keptAll=true new= |
| haiku | c16-add-from-list | turn 1: HTTP 503 AGENT_UNAVAILABLE; turn 2: HTTP 503 AGENT_UNAVAILABLE; check fullPlan: items=0 days=0; check adds: before=0 after=0 keptAll=true new=; check list: lines=0; check adds: before=0 after=0 keptAll=true new= |
| gemini | c16-add-from-list | turn 5: HTTP 503 AGENT_UNAVAILABLE; check adds: before=9 after=9 keptAll=false new=3/breakfast/265,3/lunch/189,3/dinner/538; check adds: before=9 after=9 keptAll=true new= |
| luna | c17-drink-and-budget | check askMeal: Mình thêm Cà Phê nâu vào bữa phụ ngày 1 nhé, tổng giờ khoảng 920.000 đồng/người. Bạn xem lại, ổn thì mình chốt |
| haiku | c17-drink-and-budget | turn 6: HTTP 503 AGENT_UNAVAILABLE; turn 9: HTTP 503 AGENT_UNAVAILABLE; check fullPlan: items=0 days=3; check askMeal: Bạn đang khát nên muốn chút đồ uống cho ngày 1 đúng không? Đồ uống trên ANGI có tên như Cà Phê Đen, Chanh dây ; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=false meals=0 noMain=0 total=0 |
| haiku | c19-two-dishes-one-meal | turn 1: HTTP 503 AGENT_UNAVAILABLE; check fullPlan: items=0 days=0; check addsTwo: before=0 after=0 keptAll=true new= |
| gemini | c17-drink-and-budget | turn 4: HTTP 503 AGENT_UNAVAILABLE; turn 5: HTTP 503 AGENT_UNAVAILABLE; turn 8: HTTP 503 AGENT_UNAVAILABLE; turn 9: HTTP 503 AGENT_UNAVAILABLE; reply is empty; check askMeal: Mình thêm cà phê vào bữa ăn vặt ngày 1 nhé, tổng giờ khoảng 804.000 đồng. Bạn xem lại, ổn thì mình chốt luôn n; check adds: before=10 after=10 keptAll=true new=; check addsB: before=10 after=10 keptAll=true new=; check mainKept: newDraft=false meals=10 noMain=1 total=804000 |
| luna | c20-kind-on-a-day | check askMeal: Mình thêm Bia sapporo vào bữa trưa ngày 1 nhé, tổng giờ khoảng 1.915.000 đồng/người. Bạn xem lại, ổn thì mình  |
| haiku | c20-kind-on-a-day | turn 1: HTTP 503 AGENT_UNAVAILABLE; check fullPlan: items=0 days=0; check adds: before=0 after=0 keptAll=true new=; check askMeal: Bạn muốn đi đâu và đi mấy ngày để mình lập lịch nhé? Đồ uống ở ngày 1 mình sẽ thêm sau khi có lịch.; check addsB: before=0 after=0 keptAll=true new= |
| haiku | c21-replace-and-remove | turn 1: HTTP 503 AGENT_UNAVAILABLE; check fullPlan: items=0 days=0; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=true was= now=; check remove:3/breakfast: othersKept=true was= now=; check remove:2: othersKept=true was= now= |
| gemini | c19-two-dishes-one-meal | turn 3: HTTP 503 AGENT_UNAVAILABLE; turn 4: HTTP 503 AGENT_UNAVAILABLE; reply is empty; check addsTwo: before=15 after=15 keptAll=true new= |
| luna | suggest-price | turn 1: HTTP 429 AGENT_UNAVAILABLE; reply misses expected wording; reply is empty |
| luna | suggest-name | turn 1: HTTP 429 AGENT_UNAVAILABLE; reply misses expected wording; reply is empty |
| luna | plan-full | turn 1: HTTP 429 AGENT_UNAVAILABLE; proposal should be true |
| gemini | c20-kind-on-a-day | check adds: before=15 after=15 keptAll=true new=; check addsB: before=15 after=15 keptAll=true new= |
| luna | noido-suggest | check insideZone: dishes=10 outer=3 |
| luna | xadan-buffet | turn 1: HTTP 429 AGENT_UNAVAILABLE; reply is empty; check located: located=true dishes=0 km= |
| luna | c13-add-named-dish | turn 1: HTTP 429 AGENT_UNAVAILABLE; turn 2: HTTP 429 AGENT_UNAVAILABLE; turn 3: HTTP 429 AGENT_UNAVAILABLE; turn 4: HTTP 429 AGENT_UNAVAILABLE; check list: lines=0; check fullPlan: items=0 days=0; check adds: before=0 after=0 keptAll=true new=; check adds: before=0 after=0 keptAll=true new= |
| luna | c17-drink-and-budget | turn 6: HTTP 429 AGENT_UNAVAILABLE; turn 7: HTTP 429 AGENT_UNAVAILABLE; turn 8: HTTP 429 AGENT_UNAVAILABLE; turn 9: HTTP 429 AGENT_UNAVAILABLE; turn 10: HTTP 429 AGENT_UNAVAILABLE; reply is empty; check fullPlan: items=0 days=3; check askMeal: Mình hiểu bạn muốn thêm đồ uống vào lịch ngày 1. Bạn dự tính ngân sách khoảng bao nhiêu cho mỗi ngày hay cả ch; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=false meals=0 noMain=0 total=0 |
| luna | c19-two-dishes-one-meal | turn 1: HTTP 429 AGENT_UNAVAILABLE; check fullPlan: items=0 days=0; check list: lines=0; check addsTwo: before=0 after=0 keptAll=true new= |
| luna | c20-kind-on-a-day | check adds: before=15 after=18 keptAll=true new=3/breakfast/280,3/lunch/280,3/dinner/280; check askMeal: Bạn đang muốn kèm đồ uống cho cả ba bữa ngày 1 đúng không? ANGI chưa có món tên chung là “đồ uống”; bạn muốn c; check addsB: before=21 after=21 keptAll=true new= |
| luna | c21-replace-and-remove | turn 1: HTTP 429 AGENT_UNAVAILABLE; turn 2: HTTP 429 AGENT_UNAVAILABLE; check fullPlan: items=0 days=0; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=true was= now=; check remove:3/breakfast: othersKept=true was= now=; check remove:2: othersKept=true was= now= |
| luna | edit-swap | turn 1: HTTP 503 AGENT_UNAVAILABLE; proposal should be true |
| luna | edit-add-meal | turn 2: HTTP 429 AGENT_UNAVAILABLE; turn 2: newProposal should be true; reply is empty |
| luna | save-confirm | turn 1: HTTP 429 AGENT_UNAVAILABLE; committed should be true |
| luna | c17-drink-and-budget | check askMeal: Mình thêm Cà Phê nâu vào bữa sáng ngày 1; Bia sapporo vào bữa trưa ngày 1; Bia hơi vào bữa tối ngày 1 nhé, tổn; check adds: before=12 after=12 keptAll=true new= |
| luna | c20-kind-on-a-day | check askMeal: Mình thêm Cà Phê nâu vào bữa sáng ngày 1; Bia sapporo vào bữa trưa ngày 1; Bia hơi vào bữa tối ngày 1 nhé, tổn |
