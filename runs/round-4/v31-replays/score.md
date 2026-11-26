scenario | before (checks / whole) | after (checks / whole)
--- | --- | ---
c10 | 4/5 · 0/1 | 6/10 · 0/2
c11 | 0/3 · 0/1 | 2/6 · 0/2
c12 | 1/3 · 0/1 | 5/6 · 1/2
c13 | 1/4 · 0/1 | 6/8 · 1/2
c14 | 1/3 · 0/1 | 5/6 · 1/2
c15 | 0/3 · 0/1 | 1/6 · 0/2

[before r1 c10 conv 69] FAIL errors=0
   NO  nodata        Mình chưa tìm thấy món phở nào ở Hưng Yên trên ANGI. Bạn thử nới rộng điều kiện tìm nhé.
   ok  noCarry       ANGI không có món cơm hộp đúng tên bạn tìm. Bạn thử tìm một món cơm khác gần giống nhé.
   ok  noCarry       Mình chưa tìm được khu “nội thành Hà Nội”, nên các món chưa được lọc theo khu vực đó. Vì bạn đang đói, thử nhé
   ok  noSave        committed=false
   ok  fullPlan      items=9 days=3
[after r1 c10 conv 70] FAIL errors=0
   NO  nodata        Mình chưa tìm thấy món phở nào ở Hưng Yên trên ANGI. Bạn thử nới lỏng điều kiện tìm kiếm nhé.
   ok  noCarry       Mình đang đói thì hiểu mà 😅 ANGI hiện chưa có món nào đúng tên “cơm hộp”, nên mình chưa thể tìm quán cơm hộp 
   ok  noCarry       Mình tìm được vài quán phở quanh nội thành Hà Nội nhé; tìm kiếm bao phủ Hoàn Kiếm, Ba Đình, Hai Bà Trưng, Đống
   ok  noSave        committed=false
   NO  fullPlan      items=0 days=3
[after r1 c11 conv 71] FAIL errors=0
   ok  namDinh       ANGI hiện chưa có quán nào ở Nam Định để mình kiểm tra giúp bạn. Bạn muốn mình gợi ý mì ở khu vực khác không?
   NO  askLocation   Mình tìm được vài món cơm rang đang có quán mở quanh vị trí hiện tại nè:
- Cơm rang thập cẩm (hợp bữa trưa, bữ
   NO  pickedTwo     want=250 inDraft= items=9
[before r1 c11 conv 72] FAIL errors=0
   NO  namDinh       Ở Nam Định mình chưa tìm được món mì phù hợp. Đại Cồ Việt không khớp với khu vực Nam Định nên kết quả chưa đượ
   NO  askLocation   Mình tìm quanh Đại Cồ Việt được một món cơm rang nè: Cơm rang thập cẩm ở Vạn Long - SYS Việt Nam (Phố Hàm Long
   NO  pickedTwo     want=250 inDraft= items=9
[before r1 c12 conv 73] FAIL errors=0
   NO  list          lines=0
   NO  nodata        Mình chưa tìm thấy món nào ở Hà Nam trên ANGI. Bạn thử nới lỏng điều kiện tìm kiếm nhé.
   ok  fullPlan      items=9 days=3
[after r1 c12 conv 74] FAIL errors=0
   ok  list          lines=10
   ok  nodata        ANGI hiện chưa có quán ăn được xác minh ở Hà Nam nên mình chưa tìm được món nào tại đó. Bạn muốn mình gợi ý mó
   NO  fullPlan      items=0 days=0
[after r1 c13 conv 75] PASS errors=0
   ok  list          lines=10
   ok  fullPlan      items=9 days=3
   ok  adds          before=9 after=10 keptAll=true
   ok  adds          before=10 after=11 keptAll=true
[before r1 c13 conv 76] FAIL errors=0
   NO  list          lines=0
   ok  fullPlan      items=9 days=3
   NO  adds          before=9 after=9 keptAll=false
   NO  adds          before=9 after=9 keptAll=true
[before r1 c14 conv 77] FAIL errors=0
   NO  list          lines=0
   ok  fullPlan      items=9 days=3
   NO  adds          before=9 after=9 keptAll=true
[after r1 c14 conv 78] PASS errors=0
   ok  list          lines=9
   ok  fullPlan      items=9 days=3
   ok  adds          before=9 after=10 keptAll=true
[after r1 c15 conv 79] FAIL errors=0
   NO  list          lines=0
   NO  lunchFromList lunchFromList=false othersFromList=0/0
   NO  adds          before=0 after=9 keptAll=true
[before r1 c15 conv 80] FAIL errors=0
   NO  list          lines=0
   NO  lunchFromList lunchFromList=false othersFromList=0/0
   NO  adds          before=0 after=0 keptAll=true
[after r2 c10 conv 81] FAIL errors=0
   NO  nodata        Mình chưa tìm thấy quán phở nào trên ANGI ở Hưng Yên. Bạn muốn mình gợi ý món khác không?
   ok  noCarry       Mình chưa thấy món cơm hộp đúng tên đó trên ANGI, nên chưa thể tìm quán bán món này. Bạn muốn mình gợi ý món c
   ok  noCarry       Mình tìm được vài món cơm quanh nội thành Hà Nội nè; lượt tìm này bao phủ Ba Đình, Hoàn Kiếm, Đống Đa, Hai Bà 
   ok  noSave        committed=false
   NO  fullPlan      items=0 days=3
[after r2 c11 conv 82] FAIL errors=0
   ok  namDinh       Mình chưa thể gợi ý quán mì ở Nam Định vì ANGI chưa có nhà hàng tại tỉnh này. Bạn muốn mình tìm món mì ở khu v
   NO  askLocation   Mình tìm được vài món cơm rang nè:
- Cơm rang thập cẩm (hợp bữa trưa, bữa tối) ở Vạn Long - SYS Việt Nam (Phố 
   NO  pickedTwo     want=250 inDraft=250 items=9
[after r2 c12 conv 83] PASS errors=0
   ok  list          lines=10
   ok  nodata        ANGI hiện chưa có quán ăn được ghi nhận ở Hà Nam nên mình chưa tìm được món nào tại đó. Bạn muốn mình gợi ý mó
   ok  fullPlan      items=9 days=3
[after r2 c13 conv 84] FAIL errors=0
   ok  list          lines=10
   ok  fullPlan      items=9 days=3
   NO  adds          before=9 after=9 keptAll=true
   NO  adds          before=9 after=9 keptAll=false
[after r2 c14 conv 85] FAIL errors=0
   ok  list          lines=9
   ok  fullPlan      items=9 days=3
   NO  adds          before=9 after=9 keptAll=false
[after r2 c15 conv 86] FAIL errors=0
   ok  list          lines=10
   NO  lunchFromList lunchFromList=false othersFromList=0/0
   NO  adds          before=0 after=0 keptAll=true
