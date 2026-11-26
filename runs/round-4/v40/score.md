scenario | before (checks / whole) | after (checks / whole)
--- | --- | ---
c13 | - | 8/8 · 2/2
c14 | - | 6/6 · 2/2
c16 | - | 8/8 · 2/2
c17 | - | 8/12 · 1/2
c19 | - | 6/6 · 2/2
c20 | - | 8/10 · 0/2
c21 | - | 10/10 · 2/2

[after r1 c13 conv 133] PASS errors=0
   ok  list          lines=10
   ok  fullPlan      items=9 days=3
   ok  adds          before=9 after=10 keptAll=true new=3/lunch/990
   ok  adds          before=10 after=11 keptAll=true new=2/lunch/847
[after r1 c14 conv 134] PASS errors=0
   ok  list          lines=9
   ok  fullPlan      items=9 days=3
   ok  adds          before=9 after=10 keptAll=true new=3/lunch/327
[after r1 c16 conv 135] PASS errors=0
   ok  fullPlan      items=9 days=3
   ok  adds          before=9 after=10 keptAll=true new=3/lunch/327
   ok  list          lines=10
   ok  adds          before=10 after=11 keptAll=true new=1/breakfast/268
[after r1 c17 conv 136] PASS errors=0
   ok  list          lines=10
   ok  fullPlan      items=9 days=3
   ok  askMeal       Bạn muốn thêm đồ uống vào bữa nào ngày 1: sáng, trưa hay tối?
   ok  adds          before=9 after=10 keptAll=true new=1/lunch/899
   ok  addsB         before=10 after=11 keptAll=true new=1/dinner/198
   ok  mainKept      newDraft=true meals=9 noMain= total=534000
[after r1 c19 conv 137] PASS errors=0
   ok  fullPlan      items=15 days=5
   ok  list          lines=10
   ok  addsTwo       before=15 after=17 keptAll=true new=3/lunch/896,3/lunch/899
[after r1 c20 conv 138] FAIL errors=0
   ok  fullPlan      items=15 days=5
   ok  list          lines=10
   ok  adds          before=15 after=16 keptAll=true new=3/lunch/258
   NO  askMeal       Mình thêm Cà Phê Muối vào bữa sáng ngày 1 nhé, tổng giờ khoảng 2.153.000 đồng/người. Bạn xem lại, ổn thì mình 
   ok  addsB         before=17 after=18 keptAll=true new=1/lunch/899
[after r1 c21 conv 139] PASS errors=0
   ok  fullPlan      items=9 days=3
   ok  replace:1/dinner othersKept=true was=Mỳ E-fu Vịt Sốt Tiêu Đen now=Ramen Tantan cay
   ok  replaceName:2/lunch:pho othersKept=true was=Đậu Hũ Tứ Xuyên now=Phở gà
   ok  remove:3/breakfast othersKept=true was=Tô ngon miệng (giò tai, mọc giòn, đậu chiên) now=
   ok  remove:2      othersKept=true was=Mỳ Trộn Phúc Kiến|Phở gà|Mỳ bò cay kiểu Tứ Xuyên now=
[after r2 c13 conv 140] PASS errors=0
   ok  list          lines=10
   ok  fullPlan      items=9 days=3
   ok  adds          before=9 after=10 keptAll=true new=3/dinner/990
   ok  adds          before=10 after=11 keptAll=true new=2/lunch/847
[after r2 c14 conv 141] PASS errors=0
   ok  list          lines=9
   ok  fullPlan      items=9 days=3
   ok  adds          before=9 after=10 keptAll=true new=3/lunch/902
[after r2 c16 conv 142] PASS errors=0
   ok  fullPlan      items=9 days=3
   ok  adds          before=9 after=10 keptAll=true new=3/lunch/714
   ok  list          lines=10
   ok  adds          before=10 after=11 keptAll=true new=1/breakfast/268
[after r2 c17 conv 143] FAIL errors=0
   ok  list          lines=10
   NO  fullPlan      items=0 days=3
   NO  askMeal       Lịch 3 ngày ở Thành phố Hà Nội xong rồi nè, tổng khoảng 886.000 đồng/người. Bạn xem thử, ưng thì bảo mình chốt
   NO  adds          before=9 after=9 keptAll=true new=
   ok  addsB         before=9 after=10 keptAll=true new=1/dinner/198
   NO  mainKept      newDraft=false meals=9 noMain=1/breakfast,1/lunch,1/dinner total=896000
[after r2 c19 conv 144] PASS errors=0
   ok  fullPlan      items=15 days=5
   ok  list          lines=10
   ok  addsTwo       before=15 after=17 keptAll=true new=3/lunch/896,3/lunch/899
[after r2 c20 conv 145] FAIL errors=0
   ok  fullPlan      items=15 days=5
   ok  list          lines=10
   ok  adds          before=15 after=16 keptAll=true new=3/lunch/327
   NO  askMeal       Mình thêm Cà Phê Muối vào bữa sáng ngày 1; Bia sapporo vào bữa trưa ngày 1; Bia sapporo vào bữa tối ngày 1 nhé
   ok  addsB         before=19 after=20 keptAll=true new=1/lunch/1010
[after r2 c21 conv 146] PASS errors=0
   ok  fullPlan      items=9 days=3
   ok  replace:1/dinner othersKept=true was=Mỳ E-fu Vịt Sốt Tiêu Đen now=Bò tiêu đen trên đĩa nóng
   ok  replaceName:2/lunch:pho othersKept=true was=Đậu Hũ Tứ Xuyên now=Phở gà
   ok  remove:3/breakfast othersKept=true was=Tô ngon miệng (giò tai, mọc giòn, đậu chiên) now=
   ok  remove:2      othersKept=true was=Mỳ Trộn Phúc Kiến|Phở gà|Mỳ bò cay kiểu Tứ Xuyên now=
