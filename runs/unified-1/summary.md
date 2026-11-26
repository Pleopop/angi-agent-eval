# Summary: unified-1

## By version

| Metric | V1.1 | V2.0 | V3.0 | V3.1 | V4.0 |
| --- | --- | --- | --- | --- | --- |
| Runs passed | 50/108 (46.3%) | 62/108 (57.4%) | 71/108 (65.7%) | 77/108 (71.3%) | 96/108 (88.9%) |
| Data checks passed (area, conversation) | 6/111 | 31/111 | 34/111 | 50/111 | 101/111 |
| Turns with a valid reply | 316/316 | 280/281 | 275/278 | 257/258 | 241/244 |
| Turns without false information | 316/316 | 278/281 | 275/278 | 258/258 | 243/244 |
| Dish claims verified | 0/0 | 259/259 | 368/368 | 425/425 | 531/531 |
| False "saved" replies | 0 | 3 | 3 | 0 | 1 |
| Unfilled slots | 0 | 0 | 1 | 0 | 0 |
| Draft items not matching the catalog | 0/276 | 0/693 | 0/662 | 0/818 | 0/1025 |
| Model calls | 437 | 725 | 697 | 725 | 713 |
| Total tokens | 4,155,034 | 10,265,303 | 11,413,637 | 13,099,424 | 14,032,687 |
| Tokens per run | 38,473 | 95,049 | 105,682 | 121,291 | 129,932 |
| Cost per run (USD) | 0.0014 | 0.0042 | 0.0044 | 0.0055 | 0.0055 |
| Total cost (USD) | 0.155 | 0.458 | 0.479 | 0.599 | 0.595 |
| Median turn (s) | 2.7 | 6.4 | 6.7 | 7.7 | 7.3 |
| p95 turn (s) | 9.5 | 15.8 | 16.2 | 17.2 | 16.9 |

## By kind

| Kind | Scenarios | V1.1 | V2.0 | V3.0 | V3.1 | V4.0 |
| --- | --- | --- | --- | --- | --- | --- |
| chat | 3 | 9/9 | 9/9 | 9/9 | 9/9 | 9/9 |
| scope | 3 | 8/9 | 9/9 | 9/9 | 9/9 | 9/9 |
| suggest | 4 | 4/12 | 9/12 | 12/12 | 12/12 | 12/12 |
| plan | 4 | 9/12 | 12/12 | 12/12 | 12/12 | 11/12 |
| edit | 5 | 8/15 | 11/15 | 12/15 | 15/15 | 14/15 |
| save | 3 | 9/9 | 6/9 | 6/9 | 9/9 | 7/9 |
| area | 7 | 3/21 | 4/21 | 10/21 | 8/21 | 21/21 |
| conversation | 7 | 0/21 | 2/21 | 1/21 | 3/21 | 13/21 |
| Total | 36 | 50/108 | 62/108 | 71/108 | 77/108 | 96/108 |

## By scenario (runs passed of 3)

| No. | Scenario | Kind | V1.1 | V2.0 | V3.0 | V3.1 | V4.0 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | chat-greet | chat | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 2 | chat-slang | chat | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 3 | food-info | chat | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 4 | scope-code | scope | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 5 | scope-math | scope | 2/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 6 | scope-prompt | scope | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 7 | suggest-plain | suggest | 0/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 8 | suggest-taste | suggest | 0/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 9 | suggest-price | suggest | 2/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 10 | suggest-name | suggest | 2/3 | 0/3 | 3/3 | 3/3 | 3/3 |
| 11 | plan-full | plan | 2/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 12 | plan-taste | plan | 1/3 | 3/3 | 3/3 | 3/3 | 2/3 |
| 13 | plan-intake | plan | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 14 | plan-tight | plan | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 15 | edit-remove | edit | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 16 | edit-swap | edit | 2/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 17 | edit-vague | edit | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 18 | edit-add-dish | edit | 0/3 | 0/3 | 0/3 | 3/3 | 2/3 |
| 19 | edit-add-meal | edit | 0/3 | 2/3 | 3/3 | 3/3 | 3/3 |
| 20 | save-confirm | save | 3/3 | 0/3 | 0/3 | 3/3 | 1/3 |
| 21 | save-refuse | save | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 22 | save-interjection | save | 3/3 | 3/3 | 3/3 | 3/3 | 3/3 |
| 23 | noido-suggest | area | 0/3 | 0/3 | 0/3 | 0/3 | 3/3 |
| 24 | noithanh-suggest | area | 0/3 | 0/3 | 0/3 | 0/3 | 3/3 |
| 25 | noido-plan | area | 0/3 | 1/3 | 3/3 | 3/3 | 3/3 |
| 26 | area-nodata | area | 3/3 | 0/3 | 0/3 | 0/3 | 3/3 |
| 27 | comrang-plan | area | 0/3 | 0/3 | 2/3 | 2/3 | 3/3 |
| 28 | quan-nuoc | area | 0/3 | 2/3 | 2/3 | 3/3 | 3/3 |
| 29 | xadan-buffet | area | 0/3 | 1/3 | 3/3 | 0/3 | 3/3 |
| 30 | c13-add-named-dish | conversation | 0/3 | 0/3 | 0/3 | 0/3 | 3/3 |
| 31 | c14-add-kind | conversation | 0/3 | 0/3 | 0/3 | 0/3 | 1/3 |
| 32 | c16-add-from-list | conversation | 0/3 | 0/3 | 0/3 | 0/3 | 2/3 |
| 33 | c17-drink-and-budget | conversation | 0/3 | 0/3 | 0/3 | 0/3 | 0/3 |
| 34 | c19-two-dishes-one-meal | conversation | 0/3 | 0/3 | 0/3 | 0/3 | 3/3 |
| 35 | c20-kind-on-a-day | conversation | 0/3 | 0/3 | 0/3 | 0/3 | 1/3 |
| 36 | c21-replace-and-remove | conversation | 0/3 | 2/3 | 1/3 | 3/3 | 3/3 |

## Failed runs

- V1.1 r1 suggest-plain: reply misses expected wording
- V1.1 r1 suggest-taste: reply misses expected wording
- V2.0 r1 suggest-name: reply misses expected wording
- V1.1 r1 plan-taste: proposal should be true
- V4.0 r1 plan-taste: proposal should be true
- V1.1 r1 edit-add-dish: turn 3: newProposal should be true
- V1.1 r1 edit-add-meal: turn 3: newProposal should be true
- V3.0 r1 edit-add-dish: draft check: the added dish replaced an existing one
- V2.0 r1 edit-add-dish: draft check: the added dish replaced an existing one
- V1.1 r1 noido-suggest: check insideZone: dishes=0 outer=0
- V1.1 r1 noithanh-suggest: check insideZone: dishes=0 outer=0
- V1.1 r1 noido-plan: check insideZone: draftItems=0 outer=0
- V2.0 r1 save-confirm: committed should be true; turn 4: says it saved, nothing saved
- V3.0 r1 save-confirm: committed should be true; turn 4: says it saved, nothing saved
- V1.1 r1 comrang-plan: check pickedFromList: wanted=none dinnerDay1=570
- V1.1 r1 quan-nuoc: check drinksOnly: dishes=0 drinks=0
- V4.0 r1 save-confirm: turn 1: HTTP 503 AGENT_UNAVAILABLE; committed should be true
- V1.1 r1 xadan-buffet: check located: located=true dishes=0 km=
- V2.0 r1 noido-suggest: check insideZone: dishes=10 outer=3
- V1.1 r1 c13-add-named-dish: check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=9 keptAll=true new=1/breakfast/190,1/lunch/307,1/dinner/236,2/breakfast/245,2/lunch/186,2/dinner/240,3/breakfast/296,3/lunch/990,3/dinner/275; check adds: before=9 after=9 keptAll=true new=
- V2.0 r1 noithanh-suggest: check insideZone: dishes=0 outer=0
- V3.0 r1 noido-suggest: check insideZone: dishes=10 outer=3
- V2.0 r1 noido-plan: check insideZone: draftItems=0 outer=0
- V3.0 r1 noithanh-suggest: check insideZone: dishes=0 outer=0
- V3.1 r1 noido-suggest: check insideZone: dishes=10 outer=3
- V2.0 r1 area-nodata: check noDataNoDishes: secondDishes=10
- V3.1 r1 noithanh-suggest: check insideZone: dishes=10 outer=3
- V1.1 r1 c14-add-kind: check list: lines=0; check adds: before=9 after=9 keptAll=true new=
- V3.0 r1 area-nodata: check noDataNoDishes: secondDishes=10
- V2.0 r1 comrang-plan: check pickedFromList: wanted=980 dinnerDay1=186
- V3.1 r1 area-nodata: check noDataNoDishes: secondDishes=10
- V3.0 r1 quan-nuoc: check drinksOnly: dishes=0 drinks=0
- V1.1 r1 c16-add-from-list: check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check list: lines=0; check adds: before=0 after=0 keptAll=true new=
- V3.1 r1 xadan-buffet: check located: located=false dishes=10 km=3.9,2.0,2.0,2.0,2.0,1.6,4.0,13.6,13.6,6.5
- V3.0 r1 c13-add-named-dish: check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check adds: before=0 after=0 keptAll=true new=
- V1.1 r1 c17-drink-and-budget: check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Bạn cho mình biết ngân sách cho một người (tổng chuyến hoặc mỗi ngày) để lập lịch nhé?; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=true meals=9 noMain=3 
- V2.0 r1 c13-add-named-dish: check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/dinner/990; check adds: before=9 after=9 keptAll=true new=
- V1.1 r1 c19-two-dishes-one-meal: check fullPlan: items=0 days=5; check list: lines=0; check addsTwo: before=0 after=0 keptAll=true new=
- V1.1 r1 c20-kind-on-a-day: check fullPlan: items=0 days=5; check list: lines=0; check adds: before=0 after=0 keptAll=true new=; check askMeal: Bạn cho mình biết ngân sách cho một người (tổng chuyến hoặc mỗi ngày) để lập lịch nhé?; check addsB: before=0 after=0 keptAll=true new=
- V3.0 r1 c14-add-kind: check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/26,3/dinner/188
- V1.1 r1 c21-replace-and-remove: check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=true was= now=; check remove:3/breakfast: othersKept=true was= now=; check remove:2: othersKept=true was= now=
- V3.1 r1 c13-add-named-dish: check list: lines=0; check adds: before=10 after=10 keptAll=false new=2/lunch/847,2/dinner/276,3/breakfast/296,3/lunch/185,3/lunch/990,3/dinner/188
- V1.1 r2 scope-math: reply misses expected wording
- V4.0 r1 c14-add-kind: turn 2: HTTP 503 AGENT_UNAVAILABLE; check fullPlan: items=0 days=0; check adds: before=0 after=0 keptAll=true new=
- V1.1 r2 suggest-plain: reply misses expected wording
- V1.1 r2 suggest-taste: reply misses expected wording
- V2.0 r1 c14-add-kind: check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/26,3/dinner/188
- V1.1 r2 suggest-price: reply misses expected wording
- V1.1 r2 suggest-name: reply misses expected wording
- V1.1 r2 plan-taste: proposal should be true
- V3.0 r1 c16-add-from-list: check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=true new=
- V3.1 r1 c14-add-kind: check list: lines=0; check adds: before=9 after=9 keptAll=true new=
- V2.0 r1 c16-add-from-list: check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=false new=1/breakfast/26,1/lunch/186,1/dinner/240,2/breakfast/265,2/lunch/307,2/dinner/276,3/breakfast/296,3/lunch/185,3/dinner/188
- V3.0 r1 c17-drink-and-budget: check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Mình ghi nhận bạn muốn thêm đồ uống ngày 1 nhé. Bạn muốn dành khoảng bao nhiêu cho cả chuyến hoặc mỗi ngày? Nế; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraf
- V3.1 r1 c16-add-from-list: check adds: before=9 after=9 keptAll=true new=; check list: lines=0
- V1.1 r2 edit-add-dish: turn 3: newProposal should be true
- V1.1 r2 edit-add-meal: turn 3: newProposal should be true
- V3.0 r1 c19-two-dishes-one-meal: turn 2: unfilled template slot; check fullPlan: items=0 days=5; check list: lines=0; check addsTwo: before=0 after=0 keptAll=true new=
- V2.0 r1 c17-drink-and-budget: turn 6: HTTP 503 AGENT_UNAVAILABLE; check list: lines=0; check askMeal: Mình thêm đồ uống cho ngày 1 nhé, tổng giờ khoảng 555.000 đồng/người. Bạn xem lại, ổn thì mình chốt luôn nhé.; check adds: before=9 after=9 keptAll=true new=; check addsB: before=9 after=9 keptAll=true new=; check mainKept: newD
- V1.1 r2 noido-suggest: check insideZone: dishes=0 outer=0
- V1.1 r2 noithanh-suggest: check insideZone: dishes=0 outer=0
- V4.0 r1 c17-drink-and-budget: check fullPlan: items=0 days=3; check askMeal: Lịch 3 ngày ở Thành phố Hà Nội xong rồi nè, tổng khoảng 725.000 đồng/người. Bạn xem thử, ưng thì bảo mình chốt; check mainKept: newDraft=false meals=9 noMain=3 total=775000
- V1.1 r2 noido-plan: check insideZone: draftItems=0 outer=0
- V3.1 r1 c17-drink-and-budget: check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Lịch 3 ngày ở Thành phố Hà Nội xong rồi nè, tổng khoảng 750.000 đồng/người. Bạn xem thử, ưng thì bảo mình chốt; check adds: before=9 after=9 keptAll=true new=; check mainKept: newDraft=false meals=9 noMain=3 total=775000
- V3.0 r1 c20-kind-on-a-day: check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check addsB: before=15 after=15 keptAll=false new=1/lunch/1010,1/dinner/186,2/breakfast/191,2/lunch/236,2/dinner/240,3/breakfast/239,3/lunch/275,3/dinner/276,4/breakfast/245,4/lunch/1002,4/dinner/1004,5/breakfast/296,5/lunch/185,
- V1.1 r2 comrang-plan: check pickedFromList: wanted=none dinnerDay1=236
- V1.1 r2 quan-nuoc: check drinksOnly: dishes=0 drinks=0
- V1.1 r2 xadan-buffet: check located: located=true dishes=0 km=
- V2.0 r1 c19-two-dishes-one-meal: check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new=
- V3.1 r1 c19-two-dishes-one-meal: check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new=
- V1.1 r2 c13-add-named-dish: check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=9 keptAll=true new=1/breakfast/190,1/lunch/307,1/dinner/186,2/breakfast/191,2/lunch/240,2/dinner/275,3/breakfast/296,3/lunch/990,3/dinner/277; check adds: before=9 after=9 keptAll=true new=
- V2.0 r1 c20-kind-on-a-day: check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check addsB: before=15 after=15 keptAll=true new=
- V3.0 r1 c21-replace-and-remove: turn 3: HTTP 503 AGENT_UNAVAILABLE; check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=false was= now=Phở gà
- V3.1 r1 c20-kind-on-a-day: check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check addsB: before=15 after=15 keptAll=true new=
- V4.0 r1 c20-kind-on-a-day: check askMeal: Mình thêm Cà Phê nâu vào bữa sáng ngày 1; Bia sapporo vào bữa trưa ngày 1; Bia hơi vào bữa tối ngày 1 nhé, tổn
- V1.1 r2 c14-add-kind: check list: lines=0; check adds: before=9 after=9 keptAll=true new=
- V1.1 r2 c16-add-from-list: check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check list: lines=0; check adds: before=0 after=0 keptAll=true new=
- V1.1 r2 c17-drink-and-budget: check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Bạn cho mình biết ngân sách cho một người (tổng chuyến hoặc mỗi ngày) để lập lịch nhé?; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=false meals=0 noMain=0
- V2.0 r2 suggest-name: reply misses expected wording
- V1.1 r2 c19-two-dishes-one-meal: check fullPlan: items=0 days=5; check list: lines=0; check addsTwo: before=0 after=0 keptAll=true new=
- V1.1 r2 c20-kind-on-a-day: check fullPlan: items=0 days=5; check list: lines=0; check adds: before=0 after=0 keptAll=true new=; check askMeal: Bạn cho mình biết ngân sách cho một người (tổng chuyến hoặc mỗi ngày) để lập lịch nhé?; check addsB: before=0 after=0 keptAll=true new=
- V1.1 r2 c21-replace-and-remove: check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=true was= now=; check remove:3/breakfast: othersKept=true was= now=; check remove:2: othersKept=true was= now=
- V1.1 r3 suggest-plain: reply misses expected wording
- V1.1 r3 suggest-taste: reply misses expected wording
- V1.1 r3 plan-full: proposal should be true
- V3.0 r2 edit-add-dish: draft check: the added dish replaced an existing one
- V1.1 r3 edit-swap: proposal should be true
- V2.0 r2 edit-add-dish: draft check: the added dish replaced an existing one
- V1.1 r3 edit-add-dish: turn 3: newProposal should be true
- V1.1 r3 edit-add-meal: turn 3: newProposal should be true
- V4.0 r2 edit-add-dish: turn 1: HTTP 503 AGENT_UNAVAILABLE; proposal should be true
- V3.0 r2 save-confirm: committed should be true; turn 4: says it saved, nothing saved
- V2.0 r2 save-confirm: committed should be true; turn 4: says it saved, nothing saved
- V1.1 r3 noido-suggest: check insideZone: dishes=0 outer=0
- V1.1 r3 noithanh-suggest: check insideZone: dishes=0 outer=0
- V3.0 r2 noido-suggest: check insideZone: dishes=10 outer=3
- V1.1 r3 noido-plan: check insideZone: draftItems=0 outer=0
- V4.0 r2 save-confirm: committed should be true
- V3.0 r2 noithanh-suggest: check insideZone: dishes=0 outer=0
- V2.0 r2 noido-suggest: check insideZone: dishes=10 outer=3
- V2.0 r2 noithanh-suggest: check insideZone: dishes=0 outer=0
- V1.1 r3 comrang-plan: check pickedFromList: wanted=none dinnerDay1=236
- V1.1 r3 quan-nuoc: check drinksOnly: dishes=0 drinks=0
- V2.0 r2 noido-plan: check insideZone: draftItems=0 outer=0
- V3.1 r2 noido-suggest: check insideZone: dishes=10 outer=3
- V1.1 r3 xadan-buffet: check located: located=true dishes=0 km=
- V3.0 r2 area-nodata: check noDataNoDishes: secondDishes=10
- V3.1 r2 noithanh-suggest: check insideZone: dishes=0 outer=0
- V2.0 r2 area-nodata: check noDataNoDishes: secondDishes=10
- V1.1 r3 c13-add-named-dish: check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check adds: before=0 after=0 keptAll=true new=
- V2.0 r2 comrang-plan: check pickedFromList: wanted=980 dinnerDay1=186
- V2.0 r2 quan-nuoc: check drinksOnly: dishes=0 drinks=0
- V3.1 r2 area-nodata: check noDataNoDishes: secondDishes=10
- V3.0 r2 comrang-plan: turn 3: HTTP 503 AGENT_UNAVAILABLE; reply is empty; check pickedFromList: wanted=415 dinnerDay1=186
- V2.0 r2 xadan-buffet: check located: located=false dishes=10 km=22.3,3.9,0.6,1.6,2.1,1.7,1.7,39.8,39.8,5.0
- V1.1 r3 c14-add-kind: check list: lines=0; check adds: before=9 after=9 keptAll=true new=
- V3.1 r2 xadan-buffet: check located: located=false dishes=10 km=3.9,4.0,13.6,13.6,6.5,4.1,4.1,4.0,13.6,13.6
- V1.1 r3 c16-add-from-list: check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check list: lines=0; check adds: before=0 after=0 keptAll=true new=
- V2.0 r2 c13-add-named-dish: check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/990,3/dinner/1004; check adds: before=9 after=9 keptAll=true new=
- V1.1 r3 c17-drink-and-budget: check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Bạn cho mình biết ngân sách cho một người (tổng chuyến hoặc mỗi ngày) để lập lịch nhé?; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraft=false meals=0 noMain=0
- V3.0 r2 c13-add-named-dish: check list: lines=0; check adds: before=9 after=10 keptAll=false new=3/lunch/990,3/lunch/990,3/dinner/1002; check adds: before=10 after=10 keptAll=true new=
- V1.1 r3 c19-two-dishes-one-meal: check fullPlan: items=0 days=5; check list: lines=0; check addsTwo: before=0 after=0 keptAll=true new=
- V3.1 r2 c13-add-named-dish: check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/990,3/dinner/1002; check adds: before=9 after=9 keptAll=true new=
- V1.1 r3 c20-kind-on-a-day: check fullPlan: items=0 days=5; check list: lines=0; check adds: before=0 after=0 keptAll=true new=; check askMeal: Chưa tìm thấy món/quán theo tên yêu cầu (“đồ uống”) trong danh mục ANGI. Bạn có muốn xem lựa chọn khác không?; check addsB: before=0 after=0 keptAll=true new=
- V3.0 r2 c14-add-kind: check list: lines=0; check adds: before=9 after=10 keptAll=false new=3/lunch/26,3/lunch/26,3/dinner/188
- V1.1 r3 c21-replace-and-remove: check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=true was= now=; check remove:3/breakfast: othersKept=true was= now=; check remove:2: othersKept=true was= now=
- V2.0 r2 c14-add-kind: check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/26,3/dinner/188
- V3.1 r2 c14-add-kind: turn 2: HTTP 503 AGENT_UNAVAILABLE; check list: lines=0; check fullPlan: items=0 days=0; check adds: before=0 after=0 keptAll=true new=
- V3.0 r2 c16-add-from-list: check fullPlan: items=0 days=3; check adds: before=0 after=9 keptAll=true new=1/breakfast/296,1/lunch/186,1/dinner/275,2/breakfast/297,2/lunch/570,2/dinner/185,3/breakfast/176,3/lunch/189,3/dinner/246; check list: lines=0; check adds: before=9 after=9 keptAll=false new=1/breakfast/336,1/lunch/186,1/
- V2.0 r2 c16-add-from-list: check adds: before=9 after=9 keptAll=true new=; check list: lines=0
- V3.1 r2 c16-add-from-list: check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=false new=1/breakfast/198,1/lunch/186,1/dinner/240,2/breakfast/245,2/lunch/275,2/dinner/276,3/breakfast/296,3/lunch/185,3/dinner/188
- V4.0 r2 c16-add-from-list: check adds: before=9 after=9 keptAll=false new=3/breakfast/559,3/lunch/189,3/dinner/265
- V3.0 r2 c17-drink-and-budget: check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Mình ghi nhận bạn muốn thêm đồ uống vào ngày 1. Bạn dự trù ngân sách mỗi người khoảng bao nhiêu cho cả chuyến ; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraf
- V2.0 r2 c17-drink-and-budget: check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Mình ghi nhận bạn muốn thêm đồ uống ngày 1. Bạn muốn ngân sách tính theo ngày hay cả chuyến? Ngày bắt đầu có t; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraf
- V3.1 r2 c17-drink-and-budget: check list: lines=0; check askMeal: Mình thêm bữa sáng ngày 1 sang Cà Phê nâu; bữa trưa ngày 1 sang Soda Táo Xanh; bữa tối ngày 1 sang Soda Táo Xa; check adds: before=9 after=10 keptAll=false new=1/lunch/899,1/lunch/899,1/dinner/1010,2/breakfast/297,2/lunch/185,2/dinner/277,3/breakfast/281,3/lunch/2
- V2.0 r2 c19-two-dishes-one-meal: check fullPlan: items=0 days=5; check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new=
- V3.0 r2 c19-two-dishes-one-meal: check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new=
- V4.0 r2 c17-drink-and-budget: check askMeal: Mình thêm Cà Phê nâu vào bữa sáng ngày 1 nhé, tổng giờ khoảng 920.000 đồng/người. Bạn xem lại, ổn thì mình chố
- V3.1 r2 c19-two-dishes-one-meal: check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new=
- V3.0 r2 c20-kind-on-a-day: check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check addsB: before=15 after=15 keptAll=true new=
- V2.0 r2 c20-kind-on-a-day: check list: lines=0; check adds: before=15 after=15 keptAll=false new=3/lunch/280,3/dinner/275,4/breakfast/245,4/lunch/1002,4/dinner/1004,5/breakfast/296,5/lunch/185,5/dinner/187; check askMeal: Mình hiểu bạn muốn kèm đồ uống vào ngày 1, nhưng chưa tìm được món khớp với yêu cầu đó. Bạn muốn mình thử
- V3.1 r2 c20-kind-on-a-day: check list: lines=0; check adds: before=15 after=15 keptAll=true new=
- V2.0 r2 c21-replace-and-remove: check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=false was= now=Phở gà
- V4.0 r2 c20-kind-on-a-day: check askMeal: Mình thêm Cà Phê nâu vào bữa sáng ngày 1 nhé, tổng giờ khoảng 1.910.000 đồng/người. Bạn xem lại, ổn thì bảo mì
- V2.0 r3 suggest-name: reply misses expected wording
- V2.0 r3 edit-add-dish: draft check: the added dish replaced an existing one
- V3.0 r3 edit-add-dish: draft check: the added dish replaced an existing one
- V2.0 r3 edit-add-meal: turn 2: newProposal should be true
- V2.0 r3 save-confirm: committed should be true; turn 4: says it saved, nothing saved
- V3.0 r3 save-confirm: committed should be true; turn 5: says it saved, nothing saved
- V2.0 r3 noido-suggest: check insideZone: dishes=10 outer=3
- V2.0 r3 noithanh-suggest: check insideZone: dishes=10 outer=3
- V3.0 r3 noido-suggest: check insideZone: dishes=10 outer=3
- V3.0 r3 noithanh-suggest: check insideZone: dishes=10 outer=3
- V2.0 r3 area-nodata: check noDataNoDishes: secondDishes=10
- V3.1 r3 noido-suggest: check insideZone: dishes=10 outer=3
- V3.0 r3 area-nodata: check noDataNoDishes: secondDishes=10
- V2.0 r3 comrang-plan: check pickedFromList: wanted=none dinnerDay1=186
- V3.1 r3 noithanh-suggest: check insideZone: dishes=10 outer=3
- V2.0 r3 xadan-buffet: check located: located=false dishes=1 km=22.3
- V3.1 r3 area-nodata: check noDataNoDishes: secondDishes=10
- V3.1 r3 comrang-plan: check pickedFromList: wanted=415 dinnerDay1=416
- V2.0 r3 c13-add-named-dish: check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=9 keptAll=true new=1/breakfast/239,1/lunch/186,1/dinner/240,2/breakfast/245,2/lunch/275,2/dinner/276,3/breakfast/296,3/lunch/990,3/dinner/1004; check adds: before=9 after=9 keptAll=true new=
- V3.1 r3 xadan-buffet: check located: located=false dishes=10 km=3.9,4.0,13.6,13.6,6.5,4.1,4.1,4.0,13.6,13.6
- V3.0 r3 c13-add-named-dish: check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=0 keptAll=true new=; check adds: before=0 after=0 keptAll=true new=
- V2.0 r3 c14-add-kind: check list: lines=0; check adds: before=9 after=10 keptAll=false new=3/lunch/26,3/lunch/26,3/dinner/188
- V3.0 r3 c14-add-kind: check list: lines=0; check adds: before=9 after=9 keptAll=true new=
- V3.1 r3 c13-add-named-dish: check list: lines=0; check adds: before=9 after=9 keptAll=false new=3/lunch/990,3/dinner/1004
- V4.0 r3 c14-add-kind: turn 3: says it saved, nothing saved
- V2.0 r3 c16-add-from-list: check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=true new=
- V3.0 r3 c16-add-from-list: check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=false new=1/breakfast/198,1/lunch/186,1/dinner/240,2/breakfast/245,2/lunch/275,2/dinner/276,3/breakfast/296,3/lunch/185,3/dinner/188
- V3.1 r3 c14-add-kind: check list: lines=0; check adds: before=9 after=9 keptAll=true new=
- V2.0 r3 c17-drink-and-budget: check list: lines=0; check fullPlan: items=0 days=3; check askMeal: Mình ghi nhận bạn muốn có đồ uống trong ngày đầu nhé. Mình cần biết ngày đi và ngân sách dự kiến để hoàn tất l; check adds: before=0 after=0 keptAll=true new=; check addsB: before=0 after=0 keptAll=true new=; check mainKept: newDraf
- V3.0 r3 c17-drink-and-budget: check list: lines=0; check fullPlan: items=0 days=3; check adds: before=0 after=9 keptAll=true new=1/breakfast/239,1/lunch/1010,1/dinner/980,2/breakfast/190,2/lunch/186,2/dinner/236,3/breakfast/191,3/lunch/240,3/dinner/275; check addsB: before=9 after=10 keptAll=false new=1/dinner/899,1/dinner/198,2
- V2.0 r3 c19-two-dishes-one-meal: check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new=
- V3.0 r3 c19-two-dishes-one-meal: check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new=
- V3.1 r3 c16-add-from-list: check adds: before=9 after=9 keptAll=true new=; check list: lines=0; check adds: before=9 after=9 keptAll=false new=1/breakfast/198,1/lunch/186,1/dinner/240,2/breakfast/245,2/lunch/275,2/dinner/276,3/breakfast/296,3/lunch/236,3/dinner/1002
- V4.0 r3 c17-drink-and-budget: check mainKept: newDraft=false meals=9 noMain=0 total=920000
- V2.0 r3 c20-kind-on-a-day: check fullPlan: items=0 days=5; check list: lines=0; check adds: before=0 after=0 keptAll=true new=; check askMeal: Mình ghi nhận bạn muốn kèm đồ uống ngày 1. Ngày khởi hành bạn muốn chọn ngày nào, hay để trống cũng được?; check addsB: before=0 after=0 keptAll=true new=
- V3.0 r3 c20-kind-on-a-day: check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check askMeal: Mình thêm đồ uống kèm cho ngày 1 nhé, tổng giờ khoảng 1.890.000 đồng/người. Bạn xem lại, ổn thì mình chốt luôn; check addsB: before=16 after=16 keptAll=true new=
- V3.1 r3 c17-drink-and-budget: check list: lines=0; check askMeal: Mình thêm đồ uống cho ngày 1 nhé, tổng giờ khoảng 664.000 đồng/người. Bạn xem lại, ổn thì mình chốt luôn nhé.; check mainKept: newDraft=true meals=9 noMain=9 total=260000
- V3.0 r3 c21-replace-and-remove: check fullPlan: items=0 days=3; check replace:1/dinner: othersKept=true was= now=; check replaceName:2/lunch:pho: othersKept=false was= now=Phở gà
- V3.1 r3 c19-two-dishes-one-meal: check list: lines=0; check addsTwo: before=15 after=15 keptAll=true new=
- V3.1 r3 c20-kind-on-a-day: check list: lines=0; check adds: before=15 after=15 keptAll=true new=; check addsB: before=15 after=15 keptAll=true new=
