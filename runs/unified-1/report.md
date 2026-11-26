# Evaluation report: unified-1

Scenario runs: 540. Model calls: 3297. Calls without a scenario: 0. Calls with mismatched route: 0.

| Version | Passed | Pass rate | Turns | Failed turns | Model calls | Input tokens | Cached | Output tokens | Total tokens | Tokens per scenario | Tokens per passed scenario | Median turn s | P90 turn s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| v11 | 50/108 | 46.3% | 316 | 0 | 437 | 4,060,365 | 3,320,121 | 94,669 | 4,155,034 | 38,473 | 83,101 | 2.7 | 8.2 |
| v20 | 62/108 | 57.4% | 281 | 1 | 725 | 10,076,820 | 7,157,477 | 188,483 | 10,265,303 | 95,049 | 165,569 | 6.4 | 13.7 |
| v30 | 71/108 | 65.7% | 278 | 2 | 697 | 11,220,111 | 8,220,594 | 193,526 | 11,413,637 | 105,682 | 160,755 | 6.7 | 14.3 |
| v31 | 77/108 | 71.3% | 258 | 1 | 725 | 12,900,438 | 8,787,392 | 198,986 | 13,099,424 | 121,291 | 170,122 | 7.7 | 15.8 |
| v40 | 96/108 | 88.9% | 244 | 3 | 713 | 13,859,700 | 9,750,962 | 172,987 | 14,032,687 | 129,932 | 146,174 | 7.4 | 14.6 |

## By scenario kind

| Kind | Version | Passed | Median tokens per scenario | Median model calls |
|---|---|---|---|---|
| chat | v11 | 9/9 | 7,864 | 1 |
| chat | v20 | 9/9 | 7,299 | 1 |
| chat | v30 | 9/9 | 8,520 | 1 |
| chat | v31 | 9/9 | 8,537 | 1 |
| chat | v40 | 9/9 | 8,906 | 1 |
| scope | v11 | 8/9 | 7,849 | 1 |
| scope | v20 | 9/9 | 7,325 | 1 |
| scope | v30 | 9/9 | 8,542 | 1 |
| scope | v31 | 9/9 | 8,565 | 1 |
| scope | v40 | 9/9 | 8,930 | 1 |
| suggest | v11 | 4/12 | 23,729 | 3 |
| suggest | v20 | 9/12 | 25,253 | 3 |
| suggest | v30 | 12/12 | 32,243 | 3 |
| suggest | v31 | 12/12 | 32,049 | 3 |
| suggest | v40 | 12/12 | 34,794 | 3 |
| plan | v11 | 9/12 | 18,918 | 2 |
| plan | v20 | 12/12 | 54,170 | 5 |
| plan | v30 | 12/12 | 68,147 | 5 |
| plan | v31 | 12/12 | 64,691 | 5 |
| plan | v40 | 11/12 | 59,729 | 4 |
| edit | v11 | 8/15 | 41,688 | 4 |
| edit | v20 | 11/15 | 84,774 | 6 |
| edit | v30 | 12/15 | 120,821 | 7 |
| edit | v31 | 15/15 | 119,876 | 7 |
| edit | v40 | 14/15 | 129,757 | 7 |
| save | v11 | 9/9 | 30,049 | 3 |
| save | v20 | 6/9 | 57,132 | 5 |
| save | v30 | 6/9 | 67,190 | 5 |
| save | v31 | 9/9 | 78,149 | 5 |
| save | v40 | 7/9 | 84,689 | 5 |
| area | v11 | 3/21 | 23,693 | 3 |
| area | v20 | 4/21 | 39,841 | 4 |
| area | v30 | 10/21 | 55,610 | 4 |
| area | v31 | 8/21 | 49,544 | 4 |
| area | v40 | 21/21 | 35,083 | 3 |
| conversation | v11 | 0/21 | 65,656 | 7 |
| conversation | v20 | 2/21 | 303,330 | 18 |
| conversation | v30 | 1/21 | 274,655 | 15 |
| conversation | v31 | 3/21 | 341,376 | 19 |
| conversation | v40 | 13/21 | 421,946 | 18 |

## Failed scenarios

| Version | Scenario | Problem |
|---|---|---|
| v11 | suggest-plain | reply misses expected wording |
| v11 | suggest-taste | reply misses expected wording |
| v20 | suggest-name | reply misses expected wording |
| v11 | plan-taste | proposal should be true |
| v40 | plan-taste | proposal should be true |
| v11 | edit-add-dish | turn 3: newProposal should be true |
| v11 | edit-add-meal | turn 3: newProposal should be true |
| v30 | edit-add-dish | draft check: the added dish replaced an existing one |
| v20 | edit-add-dish | draft check: the added dish replaced an existing one |
| v11 | noido-suggest | check insideZone: dishes=0 outer=0 |
| v11 | noithanh-suggest | check insideZone: dishes=0 outer=0 |
| v11 | noido-plan | check insideZone: draftItems=0 outer=0 |
| v20 | save-confirm | committed should be true; turn 4: says it saved, nothing saved |
| v30 | save-confirm | committed should be true; turn 4: says it saved, nothing saved |
| v11 | comrang-plan | check pickedFromList: wanted=none dinnerDay1=570 |
| v11 | quan-nuoc | check drinksOnly: dishes=0 drinks=0 |
| v40 | save-confirm | turn 1: HTTP 503 AGENT_UNAVAILABLE; committed should be true |
| v11 | xadan-buffet | check located: located=true dishes=0 km= |
| v20 | noido-suggest | check insideZone: dishes=10 outer=3 |
| v11 | c13-add-named-dish | check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=9 keptAll=true new=1/breakfast/190,1/lunch/307,1/dinner/236,2/breakfast/245,2/lunch/186,2/dinner/240,3/breakfast/296,3/lunch/990,3/dinner/275; check adds: before=9 after=9 keptAll=true new= |
| v20 | noithanh-suggest | check insideZone: dishes=0 outer=0 |
| v30 | noido-suggest | check insideZone: dishes=10 outer=3 |
| v20 | noido-plan | check insideZone: draftItems=0 outer=0 |
| v30 | noithanh-suggest | check insideZone: dishes=0 outer=0 |
| v31 | noido-suggest | check insideZone: dishes=10 outer=3 |
| v20 | area-nodata | check noDataNoDishes: secondDishes=10 |
| v31 | noithanh-suggest | check insideZone: dishes=10 outer=3 |
| v11 | c14-add-kind | check list: lines=0; check adds: before=9 after=9 keptAll=true new= |
| v30 | area-nodata | check noDataNoDishes: secondDishes=10 |
| v20 | comrang-plan | check pickedFromList: wanted=980 dinnerDay1=186 |
| v31 | area-nodata | check noDataNoDishes: secondDishes=10 |
| v30 | quan-nuoc | check drinksOnly: dishes=0 drinks=0 |
| v11 | c16-add-from-list | check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check list: lines=0; check adds: before=0 after=0 keptAll=true new= |
| v31 | xadan-buffet | check located: located=false dishes=10 km=3.9,2.0,2.0,2.0,2.0,1.6,4.0,13.6,13.6,6.5 |
| v30 | c13-add-named-dish | check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check adds: before=0 after=0 keptAll=true new= |
| v11 | c17-drink-and-budget | check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Bạn cho mình biết ngân sách cho một người (tổng chuyến hoặc mỗi ngày) để lập lịch nhé?; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=true meals=9 noMain=3 total=639000 |
| v20 | c13-add-named-dish | check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/dinner/990; check adds: before=9 after=9 keptAll=true new= |
| v11 | c19-two-dishes-one-meal | check fullPlan: items=0 days=5; check list: lines=0; check addsTwo: before=0 after=0 keptAll=true new= |
| v11 | c20-kind-on-a-day | check fullPlan: items=0 days=5; check list: lines=0; check adds: before=0 after=0 keptAll=true new=; check askMeal: Bạn cho mình biết ngân sách cho một người (tổng chuyến hoặc mỗi ngày) để lập lịch nhé?; check addsB: before=0 after=0 keptAll=true new= |
| v30 | c14-add-kind | check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/26,3/dinner/188 |
| v11 | c21-replace-and-remove | check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=true was= now=; check remove:3/breakfast: othersKept=true was= now=; check remove:2: othersKept=true was= now= |
| v31 | c13-add-named-dish | check list: lines=0; check adds: before=10 after=10 keptAll=false new=2/lunch/847,2/dinner/276,3/breakfast/296,3/lunch/185,3/lunch/990,3/dinner/188 |
| v11 | scope-math | reply misses expected wording |
| v40 | c14-add-kind | turn 2: HTTP 503 AGENT_UNAVAILABLE; check fullPlan: items=0 days=0; check adds: before=0 after=0 keptAll=true new= |
| v11 | suggest-plain | reply misses expected wording |
| v11 | suggest-taste | reply misses expected wording |
| v20 | c14-add-kind | check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/26,3/dinner/188 |
| v11 | suggest-price | reply misses expected wording |
| v11 | suggest-name | reply misses expected wording |
| v11 | plan-taste | proposal should be true |
| v30 | c16-add-from-list | check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=true new= |
| v31 | c14-add-kind | check list: lines=0; check adds: before=9 after=9 keptAll=true new= |
| v20 | c16-add-from-list | check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=false new=1/breakfast/26,1/lunch/186,1/dinner/240,2/breakfast/265,2/lunch/307,2/dinner/276,3/breakfast/296,3/lunch/185,3/dinner/188 |
| v30 | c17-drink-and-budget | check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Mình ghi nhận bạn muốn thêm đồ uống ngày 1 nhé. Bạn muốn dành khoảng bao nhiêu cho cả chuyến hoặc mỗi ngày? Nế; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=true meals=9 noMain=2 total=495000 |
| v31 | c16-add-from-list | check adds: before=9 after=9 keptAll=true new=; check list: lines=0 |
| v11 | edit-add-dish | turn 3: newProposal should be true |
| v11 | edit-add-meal | turn 3: newProposal should be true |
| v30 | c19-two-dishes-one-meal | turn 2: unfilled template slot; check fullPlan: items=0 days=5; check list: lines=0; check addsTwo: before=0 after=0 keptAll=true new= |
| v20 | c17-drink-and-budget | turn 6: HTTP 503 AGENT_UNAVAILABLE; check list: lines=0; check askMeal: Mình thêm đồ uống cho ngày 1 nhé, tổng giờ khoảng 555.000 đồng/người. Bạn xem lại, ổn thì mình chốt luôn nhé.; check adds: before=9 after=9 keptAll=true new=; check addsB: before=9 after=9 keptAll=true new=; check mainKept: newDraft=true meals=9 noMain=1 total=605000 |
| v11 | noido-suggest | check insideZone: dishes=0 outer=0 |
| v11 | noithanh-suggest | check insideZone: dishes=0 outer=0 |
| v40 | c17-drink-and-budget | check fullPlan: items=0 days=3; check askMeal: Lịch 3 ngày ở Thành phố Hà Nội xong rồi nè, tổng khoảng 725.000 đồng/người. Bạn xem thử, ưng thì bảo mình chốt; check mainKept: newDraft=false meals=9 noMain=3 total=775000 |
| v11 | noido-plan | check insideZone: draftItems=0 outer=0 |
| v31 | c17-drink-and-budget | check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Lịch 3 ngày ở Thành phố Hà Nội xong rồi nè, tổng khoảng 750.000 đồng/người. Bạn xem thử, ưng thì bảo mình chốt; check adds: before=9 after=9 keptAll=true new=; check mainKept: newDraft=false meals=9 noMain=3 total=775000 |
| v30 | c20-kind-on-a-day | check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check addsB: before=15 after=15 keptAll=false new=1/lunch/1010,1/dinner/186,2/breakfast/191,2/lunch/236,2/dinner/240,3/breakfast/239,3/lunch/275,3/dinner/276,4/breakfast/245,4/lunch/1002,4/dinner/1004,5/breakfast/296,5/lunch/185,5/dinner/187 |
| v11 | comrang-plan | check pickedFromList: wanted=none dinnerDay1=236 |
| v11 | quan-nuoc | check drinksOnly: dishes=0 drinks=0 |
| v11 | xadan-buffet | check located: located=true dishes=0 km= |
| v20 | c19-two-dishes-one-meal | check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new= |
| v31 | c19-two-dishes-one-meal | check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new= |
| v11 | c13-add-named-dish | check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=9 keptAll=true new=1/breakfast/190,1/lunch/307,1/dinner/186,2/breakfast/191,2/lunch/240,2/dinner/275,3/breakfast/296,3/lunch/990,3/dinner/277; check adds: before=9 after=9 keptAll=true new= |
| v20 | c20-kind-on-a-day | check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check addsB: before=15 after=15 keptAll=true new= |
| v30 | c21-replace-and-remove | turn 3: HTTP 503 AGENT_UNAVAILABLE; check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=false was= now=Phở gà |
| v31 | c20-kind-on-a-day | check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check addsB: before=15 after=15 keptAll=true new= |
| v40 | c20-kind-on-a-day | check askMeal: Mình thêm Cà Phê nâu vào bữa sáng ngày 1; Bia sapporo vào bữa trưa ngày 1; Bia hơi vào bữa tối ngày 1 nhé, tổn |
| v11 | c14-add-kind | check list: lines=0; check adds: before=9 after=9 keptAll=true new= |
| v11 | c16-add-from-list | check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check list: lines=0; check adds: before=0 after=0 keptAll=true new= |
| v11 | c17-drink-and-budget | check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Bạn cho mình biết ngân sách cho một người (tổng chuyến hoặc mỗi ngày) để lập lịch nhé?; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=false meals=0 noMain=0 total=0 |
| v20 | suggest-name | reply misses expected wording |
| v11 | c19-two-dishes-one-meal | check fullPlan: items=0 days=5; check list: lines=0; check addsTwo: before=0 after=0 keptAll=true new= |
| v11 | c20-kind-on-a-day | check fullPlan: items=0 days=5; check list: lines=0; check adds: before=0 after=0 keptAll=true new=; check askMeal: Bạn cho mình biết ngân sách cho một người (tổng chuyến hoặc mỗi ngày) để lập lịch nhé?; check addsB: before=0 after=0 keptAll=true new= |
| v11 | c21-replace-and-remove | check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=true was= now=; check remove:3/breakfast: othersKept=true was= now=; check remove:2: othersKept=true was= now= |
| v11 | suggest-plain | reply misses expected wording |
| v11 | suggest-taste | reply misses expected wording |
| v11 | plan-full | proposal should be true |
| v30 | edit-add-dish | draft check: the added dish replaced an existing one |
| v11 | edit-swap | proposal should be true |
| v20 | edit-add-dish | draft check: the added dish replaced an existing one |
| v11 | edit-add-dish | turn 3: newProposal should be true |
| v11 | edit-add-meal | turn 3: newProposal should be true |
| v40 | edit-add-dish | turn 1: HTTP 503 AGENT_UNAVAILABLE; proposal should be true |
| v30 | save-confirm | committed should be true; turn 4: says it saved, nothing saved |
| v20 | save-confirm | committed should be true; turn 4: says it saved, nothing saved |
| v11 | noido-suggest | check insideZone: dishes=0 outer=0 |
| v11 | noithanh-suggest | check insideZone: dishes=0 outer=0 |
| v30 | noido-suggest | check insideZone: dishes=10 outer=3 |
| v11 | noido-plan | check insideZone: draftItems=0 outer=0 |
| v40 | save-confirm | committed should be true |
| v30 | noithanh-suggest | check insideZone: dishes=0 outer=0 |
| v20 | noido-suggest | check insideZone: dishes=10 outer=3 |
| v20 | noithanh-suggest | check insideZone: dishes=0 outer=0 |
| v11 | comrang-plan | check pickedFromList: wanted=none dinnerDay1=236 |
| v11 | quan-nuoc | check drinksOnly: dishes=0 drinks=0 |
| v20 | noido-plan | check insideZone: draftItems=0 outer=0 |
| v31 | noido-suggest | check insideZone: dishes=10 outer=3 |
| v11 | xadan-buffet | check located: located=true dishes=0 km= |
| v30 | area-nodata | check noDataNoDishes: secondDishes=10 |
| v31 | noithanh-suggest | check insideZone: dishes=0 outer=0 |
| v20 | area-nodata | check noDataNoDishes: secondDishes=10 |
| v11 | c13-add-named-dish | check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check adds: before=0 after=0 keptAll=true new= |
| v20 | comrang-plan | check pickedFromList: wanted=980 dinnerDay1=186 |
| v20 | quan-nuoc | check drinksOnly: dishes=0 drinks=0 |
| v31 | area-nodata | check noDataNoDishes: secondDishes=10 |
| v30 | comrang-plan | turn 3: HTTP 503 AGENT_UNAVAILABLE; reply is empty; check pickedFromList: wanted=415 dinnerDay1=186 |
| v20 | xadan-buffet | check located: located=false dishes=10 km=22.3,3.9,0.6,1.6,2.1,1.7,1.7,39.8,39.8,5.0 |
| v11 | c14-add-kind | check list: lines=0; check adds: before=9 after=9 keptAll=true new= |
| v31 | xadan-buffet | check located: located=false dishes=10 km=3.9,4.0,13.6,13.6,6.5,4.1,4.1,4.0,13.6,13.6 |
| v11 | c16-add-from-list | check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check list: lines=0; check adds: before=0 after=0 keptAll=true new= |
| v20 | c13-add-named-dish | check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/990,3/dinner/1004; check adds: before=9 after=9 keptAll=true new= |
| v11 | c17-drink-and-budget | check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Bạn cho mình biết ngân sách cho một người (tổng chuyến hoặc mỗi ngày) để lập lịch nhé?; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=false meals=0 noMain=0 total=0 |
| v30 | c13-add-named-dish | check list: lines=0; check adds: before=9 after=10 keptAll=false new=3/lunch/990,3/lunch/990,3/dinner/1002; check adds: before=10 after=10 keptAll=true new= |
| v11 | c19-two-dishes-one-meal | check fullPlan: items=0 days=5; check list: lines=0; check addsTwo: before=0 after=0 keptAll=true new= |
| v31 | c13-add-named-dish | check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/990,3/dinner/1002; check adds: before=9 after=9 keptAll=true new= |
| v11 | c20-kind-on-a-day | check fullPlan: items=0 days=5; check list: lines=0; check adds: before=0 after=0 keptAll=true new=; check askMeal: Chưa tìm thấy món/quán theo tên yêu cầu (“đồ uống”) trong danh mục ANGI. Bạn có muốn xem lựa chọn khác không?; check addsB: before=0 after=0 keptAll=true new= |
| v30 | c14-add-kind | check list: lines=0; check adds: before=9 after=10 keptAll=false new=3/lunch/26,3/lunch/26,3/dinner/188 |
| v11 | c21-replace-and-remove | check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=true was= now=; check remove:3/breakfast: othersKept=true was= now=; check remove:2: othersKept=true was= now= |
| v20 | c14-add-kind | check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/26,3/dinner/188 |
| v31 | c14-add-kind | turn 2: HTTP 503 AGENT_UNAVAILABLE; check list: lines=0; check fullPlan: items=0 days=0; check adds: before=0 after=0 keptAll=true new= |
| v30 | c16-add-from-list | check fullPlan: items=0 days=3; check adds: before=0 after=9 keptAll=true new=1/breakfast/296,1/lunch/186,1/dinner/275,2/breakfast/297,2/lunch/570,2/dinner/185,3/breakfast/176,3/lunch/189,3/dinner/246; check list: lines=0; check adds: before=9 after=9 keptAll=false new=1/breakfast/336,1/lunch/186,1/dinner/275,2/breakfast/297,2/lunch/570,2/dinner/185,3/breakfast/176,3/lunch/189,3/dinner/246 |
| v20 | c16-add-from-list | check adds: before=9 after=9 keptAll=true new=; check list: lines=0 |
| v31 | c16-add-from-list | check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=false new=1/breakfast/198,1/lunch/186,1/dinner/240,2/breakfast/245,2/lunch/275,2/dinner/276,3/breakfast/296,3/lunch/185,3/dinner/188 |
| v40 | c16-add-from-list | check adds: before=9 after=9 keptAll=false new=3/breakfast/559,3/lunch/189,3/dinner/265 |
| v30 | c17-drink-and-budget | check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Mình ghi nhận bạn muốn thêm đồ uống vào ngày 1. Bạn dự trù ngân sách mỗi người khoảng bao nhiêu cho cả chuyến ; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=false meals=0 noMain=0 total=0 |
| v20 | c17-drink-and-budget | check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Mình ghi nhận bạn muốn thêm đồ uống ngày 1. Bạn muốn ngân sách tính theo ngày hay cả chuyến? Ngày bắt đầu có t; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=true meals=9 noMain=1 total=555000 |
| v31 | c17-drink-and-budget | check list: lines=0; check askMeal: Mình thêm bữa sáng ngày 1 sang Cà Phê nâu; bữa trưa ngày 1 sang Soda Táo Xanh; bữa tối ngày 1 sang Soda Táo Xa; check adds: before=9 after=10 keptAll=false new=1/lunch/899,1/lunch/899,1/dinner/1010,2/breakfast/297,2/lunch/185,2/dinner/277,3/breakfast/281,3/lunch/284,3/dinner/570; check mainKept: newDraft=true meals=9 noMain=1 total=570000 |
| v20 | c19-two-dishes-one-meal | check fullPlan: items=0 days=5; check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new= |
| v30 | c19-two-dishes-one-meal | check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new= |
| v40 | c17-drink-and-budget | check askMeal: Mình thêm Cà Phê nâu vào bữa sáng ngày 1 nhé, tổng giờ khoảng 920.000 đồng/người. Bạn xem lại, ổn thì mình chố |
| v31 | c19-two-dishes-one-meal | check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new= |
| v30 | c20-kind-on-a-day | check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check addsB: before=15 after=15 keptAll=true new= |
| v20 | c20-kind-on-a-day | check list: lines=0; check adds: before=15 after=15 keptAll=false new=3/lunch/280,3/dinner/275,4/breakfast/245,4/lunch/1002,4/dinner/1004,5/breakfast/296,5/lunch/185,5/dinner/187; check askMeal: Mình hiểu bạn muốn kèm đồ uống vào ngày 1, nhưng chưa tìm được món khớp với yêu cầu đó. Bạn muốn mình thử lựa ; check addsB: before=15 after=15 keptAll=true new= |
| v31 | c20-kind-on-a-day | check list: lines=0; check adds: before=15 after=15 keptAll=true new= |
| v20 | c21-replace-and-remove | check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=false was= now=Phở gà |
| v40 | c20-kind-on-a-day | check askMeal: Mình thêm Cà Phê nâu vào bữa sáng ngày 1 nhé, tổng giờ khoảng 1.910.000 đồng/người. Bạn xem lại, ổn thì bảo mì |
| v20 | suggest-name | reply misses expected wording |
| v20 | edit-add-dish | draft check: the added dish replaced an existing one |
| v30 | edit-add-dish | draft check: the added dish replaced an existing one |
| v20 | edit-add-meal | turn 2: newProposal should be true |
| v20 | save-confirm | committed should be true; turn 4: says it saved, nothing saved |
| v30 | save-confirm | committed should be true; turn 5: says it saved, nothing saved |
| v20 | noido-suggest | check insideZone: dishes=10 outer=3 |
| v20 | noithanh-suggest | check insideZone: dishes=10 outer=3 |
| v30 | noido-suggest | check insideZone: dishes=10 outer=3 |
| v30 | noithanh-suggest | check insideZone: dishes=10 outer=3 |
| v20 | area-nodata | check noDataNoDishes: secondDishes=10 |
| v31 | noido-suggest | check insideZone: dishes=10 outer=3 |
| v30 | area-nodata | check noDataNoDishes: secondDishes=10 |
| v20 | comrang-plan | check pickedFromList: wanted=none dinnerDay1=186 |
| v31 | noithanh-suggest | check insideZone: dishes=10 outer=3 |
| v20 | xadan-buffet | check located: located=false dishes=1 km=22.3 |
| v31 | area-nodata | check noDataNoDishes: secondDishes=10 |
| v31 | comrang-plan | check pickedFromList: wanted=415 dinnerDay1=416 |
| v20 | c13-add-named-dish | check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=9 keptAll=true new=1/breakfast/239,1/lunch/186,1/dinner/240,2/breakfast/245,2/lunch/275,2/dinner/276,3/breakfast/296,3/lunch/990,3/dinner/1004; check adds: before=9 after=9 keptAll=true new= |
| v31 | xadan-buffet | check located: located=false dishes=10 km=3.9,4.0,13.6,13.6,6.5,4.1,4.1,4.0,13.6,13.6 |
| v30 | c13-add-named-dish | check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check adds: before=0 after=0 keptAll=true new= |
| v20 | c14-add-kind | check list: lines=0; check adds: before=9 after=10 keptAll=false new=3/lunch/26,3/lunch/26,3/dinner/188 |
| v30 | c14-add-kind | check list: lines=0; check adds: before=9 after=9 keptAll=true new= |
| v31 | c13-add-named-dish | check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/990,3/dinner/1004 |
| v40 | c14-add-kind | turn 3: says it saved, nothing saved |
| v20 | c16-add-from-list | check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=true new= |
| v30 | c16-add-from-list | check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=false new=1/breakfast/198,1/lunch/186,1/dinner/240,2/breakfast/245,2/lunch/275,2/dinner/276,3/breakfast/296,3/lunch/185,3/dinner/188 |
| v31 | c14-add-kind | check list: lines=0; check adds: before=9 after=9 keptAll=true new= |
| v20 | c17-drink-and-budget | check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Mình ghi nhận bạn muốn có đồ uống trong ngày đầu nhé. Mình cần biết ngày đi và ngân sách dự kiến để hoàn tất l; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=false meals=0 noMain=0 total=0 |
| v30 | c17-drink-and-budget | check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=9 keptAll=true new=1/breakfast/239,1/lunch/1010,1/dinner/980,2/breakfast/190,2/lunch/186,2/dinner/236,3/breakfast/191,3/lunch/240,3/dinner/275; check addsB: before=9 after=10 keptAll=false new=1/dinner/899,1/dinner/198,2/breakfast/190,2/lunch/186,2/dinner/236,3/breakfast/191,3/lunch/240,3/dinner/275 |
| v20 | c19-two-dishes-one-meal | check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new= |
| v30 | c19-two-dishes-one-meal | check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new= |
| v31 | c16-add-from-list | check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=false new=1/breakfast/198,1/lunch/186,1/dinner/240,2/breakfast/245,2/lunch/275,2/dinner/276,3/breakfast/296,3/lunch/236,3/dinner/1002 |
| v40 | c17-drink-and-budget | check mainKept: newDraft=false meals=9 noMain=0 total=920000 |
| v20 | c20-kind-on-a-day | check fullPlan: items=0 days=5; check list: lines=0; check adds: before=0 after=0 keptAll=true new=; check askMeal: Mình ghi nhận bạn muốn kèm đồ uống ngày 1. Ngày khởi hành bạn muốn chọn ngày nào, hay để trống cũng được?; check addsB: before=0 after=0 keptAll=true new= |
| v30 | c20-kind-on-a-day | check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check askMeal: Mình thêm đồ uống kèm cho ngày 1 nhé, tổng giờ khoảng 1.890.000 đồng/người. Bạn xem lại, ổn thì mình chốt luôn; check addsB: before=16 after=16 keptAll=true new= |
| v31 | c17-drink-and-budget | check list: lines=0; check askMeal: Mình thêm đồ uống cho ngày 1 nhé, tổng giờ khoảng 664.000 đồng/người. Bạn xem lại, ổn thì mình chốt luôn nhé.; check mainKept: newDraft=true meals=9 noMain=9 total=260000 |
| v30 | c21-replace-and-remove | check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=false was= now=Phở gà |
| v31 | c19-two-dishes-one-meal | check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new= |
| v31 | c20-kind-on-a-day | check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check addsB: before=15 after=15 keptAll=true new= |
