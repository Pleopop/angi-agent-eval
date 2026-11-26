scenario | before | after
--- | --- | ---
noido-suggest | 0/3 | 3/3
noithanh-suggest | 0/3 | 2/3
noido-plan | 3/3 | 2/3
area-nodata | 0/3 | 3/3
comrang-plan | 1/3 | 3/3
quan-nuoc | 3/3 | 3/3
xadan-buffet | 0/3 | 3/3

[before r1 noido-suggest conv 4] FAIL dishes=10 outer=3 (Xã Tây Phương, Phường Sơn Tây, Phường Sơn Tây)
  > Mình không tìm được khu vực “nội đô Hà Nội” để giới hạn kết quả, nên các món dưới đây chưa được lọc theo khu vực đó: Bò Cuốn Cải ở Nhà hàng Hùng Béo (Dị Nậu), khoảng 120.000 đồng. Sushi tổng hợp ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai), khoảng 145.000 đồng. Lẩu ba ba ở Nhà Hàng Giang Dung 1 (Ngách 25 Ngõ Thổ Quan), khoảng 45.000 đồng. Mực sốt thái ở Nhà hàng Tân Tiến Ba ba (

[before r1 noithanh-suggest conv 7] FAIL dishes=10 outer=3 (Xã Tây Phương, Phường Sơn Tây, Phường Sơn Tây)
  > Mình không tìm được khu vực “nội thành Hà Nội” để giới hạn tìm kiếm, nên các gợi ý dưới đây chưa được lọc theo khu vực đó nhé: Bò Cuốn Cải ở Nhà hàng Hùng Béo, khoảng 120.000 đồng — Dị Nậu Sushi tổng hợp ở Nhà hàng Buffet Sen Việt, khoảng 145.000 đồng — A25 Luxury Hotel, 684 P. Minh Khai Lẩu ba ba ở Nhà Hàng Giang Dung 1, khoảng 45.000 đồng — Ngách 25 Ngõ Thổ Quan Mực sốt thái ở Nhà hàng Tân Tiến 

[before r1 noido-plan conv 8] PASS draftItems=6 outer=0
  > Lịch 2 ngày ở Thành phố Hà Nội xong rồi nè, tổng khoảng 680.000 đồng/người. Bạn xem thử, ưng thì bảo mình chốt nhé!

[before r1 area-nodata conv 11] FAIL lists=2 secondDishes=10 nearCauGiay=2
  > Mình tìm quanh Sóc Sơn nhé; địa chỉ mỗi món ghi khoảng cách từ khu vực này. Sushi tổng hợp ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai, cách Sóc Sơn khoảng 28,6 km), khoảng 145.000 đồng. Mực sốt thái ở Nhà hàng Tân Tiến Ba ba (Ngõ Xóm Hạ Hồi, cách Sóc Sơn khoảng 26,2 km), khoảng 120.000 đồng. Hến xúc banh đa ở Vị Quảng (Nhà hàng 13 năm tuổi) (Phố Ngô Quyền, cách Sóc Sơn khoảng 2

[before r1 comrang-plan conv 12] FAIL wanted=Cơm rang thịt cua với lòng trắng trứng @ Nhà hàng May Mắn | dinnerDay1=Lẩu ba ba @ Nhà Hàng Giang Dung 1
  > 

[before r1 quan-nuoc conv 15] PASS dishes=9 drinks=9
  > Mình tìm quanh Hoàn Kiếm được vài món nước nè: Chanh dây kim quất ở Yến Bún Chả (Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1,5 km), khoảng 15.000 đồng. Sữa đậu nành ở Yến Bún Chả (Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1,5 km), khoảng 10.000 đồng. Cafe trứng ở MẸT Vietnamese restaurant & Vegetarian Food 5 (Phố Hàng Hòm, cách Hoàn Kiếm khoảng 0,5 km), khoảng 55.000 đồng. Milo trân châu đen ở 4

[before r1 xadan-buffet conv 16] FAIL located=false dishes=10 kmFromXaDan=3.9,4.0,13.6,13.6,6.5,4.1,4.1,4.0,13.6,13.6 names=Buffet Hải Sản & Á - Âu Sen Việt 380000; Buffet Royal – Đỉnh cao Wagyu 699000; Buffet Nướng 179000; Buffet Nướng Hải Sản 224000; Buffet nướng lẩu thoả thích 219000; Buffet Hải Sản Nướng Lẩu Trưa Ngày Thường 493000; Buffet Hải Sản Tối & Cuối tuần 563000; Buffet Classic – Tiệc nướng gọn nhẹ 299000; Buffet Lẩu Nướng 199000; Buffet Lẩu Nướng Hải Sản 244000
  > Mình tìm được các buffet này, nhưng không tìm thấy Xã Đàn nên danh sách chưa được lọc theo khu vực đó: Buffet Hải Sản & Á - Âu Sen Việt ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai), khoảng 380.000 đồng. Buffet Royal – Đỉnh cao Wagyu ở King BBQ Time City (Toà T2, Đ9, 11A-11B, hầm B1/458 P. Minh Khai, Khu đô thị Times City), khoảng 699.000 đồng. Buffet Nướng ở BamBam Hoài Đức - Bu

[before r2 noido-suggest conv 19] FAIL dishes=10 outer=3 (Xã Tây Phương, Phường Sơn Tây, Phường Sơn Tây)
  > Mình không tìm thấy “nội đô Hà Nội” làm khu vực cụ thể nên danh sách chưa được lọc theo vị trí đó. Bạn có thể thử Bò Cuốn Cải ở Nhà hàng Hùng Béo (Dị Nậu), khoảng 120.000 đồng; Sushi tổng hợp ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai), khoảng 145.000 đồng; Lẩu ba ba ở Nhà Hàng Giang Dung 1 (Ngách 25 Ngõ Thổ Quan), khoảng 45.000 đồng; Mực sốt thái ở Nhà hàng Tân Tiến Ba ba (Ngõ

[before r2 noithanh-suggest conv 20] FAIL dishes=0 outer=0
  > Mình chưa tìm thấy quán theo tên “quán ăn tối”, và cũng chưa định vị được khu “nội thành Hà Nội”. Bạn muốn ăn tối ở quán nào, hay muốn mình gợi ý món ăn tối quanh khu vực nào cụ thể?

[before r2 noido-plan conv 23] PASS draftItems=6 outer=0
  > Lịch 2 ngày ở Hà Nội xong rồi nè, tổng khoảng 680.000 đồng/người. Bạn xem thử, ưng thì bảo mình chốt nhé!

[before r2 area-nodata conv 24] FAIL lists=2 secondDishes=10 nearCauGiay=2
  > Mình tìm quanh Sóc Sơn được vài gợi ý ăn tối nè: Sushi tổng hợp ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai, cách Sóc Sơn khoảng 28,6 km), khoảng 145.000 đồng. Mực sốt thái ở Nhà hàng Tân Tiến Ba ba (Ngõ Xóm Hạ Hồi, cách Sóc Sơn khoảng 26,2 km), khoảng 120.000 đồng. Hến xúc banh đa ở Vị Quảng (Nhà hàng 13 năm tuổi) (Phố Ngô Quyền, cách Sóc Sơn khoảng 26,3 km), khoảng 70.000 đồng

[before r2 comrang-plan conv 27] PASS wanted=Cơm rang thịt cua với lòng trắng trứng @ Nhà hàng May Mắn | dinnerDay1=Cơm rang thập cẩm @ Vạn Long - SYS Việt Nam + Cơm rang thịt cua với lòng trắng trứng @ Nhà hàng May Mắn
  > Mình thêm Cơm rang thịt cua với lòng trắng trứng vào bữa tối ngày 1 nhé, tổng giờ khoảng 700.000 đồng/người. Bạn xem lại, ổn thì mình chốt luôn nhé. Lịch này tổng khoảng 700.000 đồng/người, vượt ngân sách 500.000 đồng bạn đặt. Mình nâng ngân sách lên 700.000 đồng nhé; bạn có muốn mình chọn lại món cho hợp ngân sách không, hay giữ nguyên lịch này?

[before r2 quan-nuoc conv 28] PASS dishes=9 drinks=9
  > Mình gợi ý vài món nước quanh Hoàn Kiếm nè: Chanh dây kim quất ở Yến Bún Chả, khoảng 15.000 đồng — Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1,5 km Sữa đậu nành ở Yến Bún Chả, khoảng 10.000 đồng — Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1,5 km Cafe trứng ở MẸT Vietnamese restaurant & Vegetarian Food 5, khoảng 55.000 đồng — Phố Hàng Hòm, cách Hoàn Kiếm khoảng 0,5 km Milo trân châu đen ở 4Season

[before r2 xadan-buffet conv 31] FAIL located=false dishes=10 kmFromXaDan=3.9,4.0,13.6,13.6,6.5,4.1,4.1,4.0,13.6,13.6 names=Buffet Hải Sản & Á - Âu Sen Việt 380000; Buffet Royal – Đỉnh cao Wagyu 699000; Buffet Nướng 179000; Buffet Nướng Hải Sản 224000; Buffet nướng lẩu thoả thích 219000; Buffet Hải Sản Nướng Lẩu Trưa Ngày Thường 493000; Buffet Hải Sản Tối & Cuối tuần 563000; Buffet Classic – Tiệc nướng gọn nhẹ 299000; Buffet Lẩu Nướng 199000; Buffet Lẩu Nướng Hải Sản 244000
  > Mình chưa tìm được địa điểm Xã Đàn nên các món dưới đây chưa được lọc quanh khu đó. Món buffet rẻ nhất trong danh sách là Buffet Hải Sản & Á - Âu Sen Việt ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai), khoảng 380.000 đồng; bạn cũng có thể thử Buffet Royal – Đỉnh cao Wagyu ở King BBQ Time City (Toà T2, Đ9, 11A-11B, hầm B1/458 P. Minh Khai, Khu đô thị Times City), khoảng 699.000 đồ

[before r3 noido-suggest conv 32] FAIL dishes=10 outer=3 (Xã Tây Phương, Phường Sơn Tây, Phường Sơn Tây)
  > Mình chưa tìm được đúng khu vực “nội đô Hà Nội”, nên các gợi ý này chưa được lọc theo vị trí đó. Bạn có thể thử Bò Cuốn Cải ở Nhà hàng Hùng Béo (Dị Nậu), khoảng 120.000 đồng; Sushi tổng hợp ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai), khoảng 145.000 đồng; Lẩu ba ba ở Nhà Hàng Giang Dung 1 (Ngách 25 Ngõ Thổ Quan), khoảng 45.000 đồng; Mực sốt thái ở Nhà hàng Tân Tiến Ba ba (Ngõ X

[before r3 noithanh-suggest conv 35] FAIL dishes=10 outer=3 (Xã Tây Phương, Phường Sơn Tây, Phường Sơn Tây)
  > Mình tìm quanh khu vực bạn nói nhưng không xác định được địa điểm đó, nên các quán dưới đây chưa được lọc theo nội thành. Bạn thử Bò Cuốn Cải ở Nhà hàng Hùng Béo (Dị Nậu), khoảng 120.000 đồng; Sushi tổng hợp ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai), khoảng 145.000 đồng; Lẩu ba ba ở Nhà Hàng Giang Dung 1 (Ngách 25 Ngõ Thổ Quan), khoảng 45.000 đồng; Mực sốt thái ở Nhà hàng Tân

[before r3 noido-plan conv 36] PASS draftItems=6 outer=0
  > Lịch 2 ngày ở Thành phố Hà Nội xong rồi nè, tổng khoảng 680.000 đồng/người. Mình đang dùng thứ tự đánh giá thay cho cá nhân hóa. Bạn xem thử, ưng thì bảo mình chốt nhé!

[before r3 area-nodata conv 39] FAIL lists=2 secondDishes=10 nearCauGiay=2
  > Mình hiểu là bạn muốn đổi sang ăn tối quanh Sóc Sơn nhé. Gợi ý Sushi tổng hợp ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai, cách Sóc Sơn khoảng 28,6 km), khoảng 145.000 đồng; Mực sốt thái ở Nhà hàng Tân Tiến Ba ba (Ngõ Xóm Hạ Hồi, cách Sóc Sơn khoảng 26,2 km), khoảng 120.000 đồng; Hến xúc banh đa ở Vị Quảng (Nhà hàng 13 năm tuổi) (Phố Ngô Quyền, cách Sóc Sơn khoảng 26,3 km), khoả

[before r3 comrang-plan conv 40] FAIL wanted=Cơm rang thịt cua với lòng trắng trứng @ Nhà hàng May Mắn | dinnerDay1=none
  > Mình hiểu bạn muốn thêm Cơm rang thịt cua với lòng trắng trứng vào bữa tối ngày 1. Ngân sách 500 nghìn bạn nêu là tổng cả ngày hay mỗi bữa?

[before r3 quan-nuoc conv 43] PASS dishes=9 drinks=9
  > Mình tìm vài món nước quanh Hoàn Kiếm nhé: Chanh dây kim quất ở Yến Bún Chả (Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1,5 km), khoảng 15.000 đồng. Sữa đậu nành ở Yến Bún Chả (Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1,5 km), khoảng 10.000 đồng. Cafe trứng ở MẸT Vietnamese restaurant & Vegetarian Food 5 (Phố Hàng Hòm, cách Hoàn Kiếm khoảng 0,5 km), khoảng 55.000 đồng. Milo trân châu đen ở 4Seas

[before r3 xadan-buffet conv 44] FAIL located=false dishes=10 kmFromXaDan=3.9,4.0,13.6,13.6,6.5,4.1,4.1,4.0,13.6,13.6 names=Buffet Hải Sản & Á - Âu Sen Việt 380000; Buffet Royal – Đỉnh cao Wagyu 699000; Buffet Nướng 179000; Buffet Nướng Hải Sản 224000; Buffet nướng lẩu thoả thích 219000; Buffet Hải Sản Nướng Lẩu Trưa Ngày Thường 493000; Buffet Hải Sản Tối & Cuối tuần 563000; Buffet Classic – Tiệc nướng gọn nhẹ 299000; Buffet Lẩu Nướng 199000; Buffet Lẩu Nướng Hải Sản 244000
  > Mình chưa tìm được khu Xã Đàn để khoanh vùng, nên các gợi ý chưa lọc theo khu vực này. Bạn thử Buffet Hải Sản & Á - Âu Sen Việt ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai), khoảng 380.000 đồng; Buffet Royal – Đỉnh cao Wagyu ở King BBQ Time City (Toà T2, Đ9, 11A-11B, hầm B1/458 P. Minh Khai, Khu đô thị Times City), khoảng 699.000 đồng; Buffet Nướng ở BamBam Hoài Đức - Buffet Lẩu

[after r1 noido-suggest conv 46] PASS dishes=10 outer=0
  > Mình gợi ý vài món ăn trưa nhé; tìm quanh nội đô Hà Nội, trong phạm vi Hoàn Kiếm, Ba Đình, Đống Đa, Hai Bà Trưng, Cầu Giấy, Tây Hồ, Thanh Xuân, Long Biên, Hoàng Mai và Hà Đông. Bắc Từ Liêm chưa nằm trong phạm vi tìm kiếm. Sushi tổng hợp ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai), khoảng 145.000 đồng. Lẩu ba ba ở Nhà Hàng Giang Dung 1 (Ngách 25 Ngõ Thổ Quan), khoảng 45.000 đồng

[after r1 noithanh-suggest conv 47] FAIL dishes=10 outer=3 (Xã Tây Phương, Phường Sơn Tây, Phường Sơn Tây)
  > Mình tìm được vài món cho bữa tối ở Hà Nội nè: Bò Cuốn Cải tại Nhà hàng Hùng Béo (Dị Nậu), khoảng 120.000 đồng. Sushi tổng hợp tại Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai), khoảng 145.000 đồng. Lẩu ba ba tại Nhà Hàng Giang Dung 1 (Ngách 25 Ngõ Thổ Quan), khoảng 45.000 đồng. Mực sốt thái tại Nhà hàng Tân Tiến Ba ba (Ngõ Xóm Hạ Hồi), khoảng 120.000 đồng. Hến xúc banh đa tại Vị Q

[after r1 noido-plan conv 48] FAIL draftItems=0 outer=0
  > Mình đã nắm lịch 2 ngày ở Hà Nội và ngân sách 1 triệu cả chuyến. Bạn muốn chọn khu vực nào trong nội đô để mình lên lịch sát nơi bạn đi hơn?

[after r1 area-nodata conv 49] PASS lists=1 secondDishes=0 nearCauGiay=0
  > Mình chưa tìm thấy món ăn tối nào quanh Sóc Sơn trong phạm vi 12 km. Bạn thử nới khu vực tìm kiếm nhé.

[after r1 comrang-plan conv 50] PASS wanted=Cơm rang thịt cua với lòng trắng trứng @ Nhà hàng May Mắn | dinnerDay1=Lẩu ba ba @ Nhà Hàng Giang Dung 1 + Cơm rang thịt cua với lòng trắng trứng @ Nhà hàng May Mắn
  > Mình thêm Cơm rang thịt cua với lòng trắng trứng vào bữa tối ngày 1 nhé, tổng giờ khoảng 660.000 đồng/người. Bạn xem lại, ổn thì mình chốt luôn nhé. Lịch này tổng khoảng 660.000 đồng/người, vượt ngân sách 500.000 đồng bạn đặt. Mình nâng ngân sách lên 660.000 đồng nhé; bạn có muốn mình chọn lại món cho hợp ngân sách không, hay giữ nguyên lịch này?

[after r1 quan-nuoc conv 51] PASS dishes=9 drinks=9
  > Mình tìm quanh Hoàn Kiếm, trong phạm vi 3 km nhé. Bạn thử Chanh dây kim quất ở Yến Bún Chả (Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1 km), khoảng 15.000 đồng; Sữa đậu nành ở Yến Bún Chả (Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1 km), khoảng 10.000 đồng; hoặc Cafe trứng ở MẸT Vietnamese restaurant & Vegetarian Food 5 (Phố Hàng Hòm, cách Hoàn Kiếm khoảng 0 km), khoảng 55.000 đồng.

[after r1 xadan-buffet conv 52] PASS located=true dishes=9 kmFromXaDan=3.9,4.0,4.1,4.1,4.0,4.1,4.0,4.0,4.0 names=Buffet Hải Sản & Á - Âu Sen Việt 380000; Buffet Royal – Đỉnh cao Wagyu 699000; Buffet Hải Sản Nướng Lẩu Trưa Ngày Thường 493000; Buffet Hải Sản Tối & Cuối tuần 563000; Buffet Classic – Tiệc nướng gọn nhẹ 299000; Buffet suất trẻ em 238000; Buffet Signature – Hải sản cao cấp 449000; Buffet Master – Sườn bò thượng hạng 499000; Buffet Selection – Dẻ sườn mỹ vị 399000
  > Mình tìm quanh Xã Đàn trong phạm vi 5 km; các lựa chọn gần nhất cách đó khoảng 3,9 km. Bạn thử Buffet Hải Sản & Á - Âu Sen Việt ở Nhà hàng Buffet Sen Việt, khoảng 380.000 đồng (A25 Luxury Hotel, 684 P. Minh Khai, cách Xã Đàn khoảng 3,9 km); hoặc Buffet Royal – Đỉnh cao Wagyu ở King BBQ Time City, khoảng 699.000 đồng (Toà T2, Đ9, 11A-11B, hầm B1/458 P. Minh Khai, Khu đô thị Times City, cách Xã Đàn 

[after r2 noido-suggest conv 53] PASS dishes=10 outer=0
  > Mình tìm quanh khu nội đô Hà Nội, gồm Ba Đình, Hoàn Kiếm, Hai Bà Trưng, Đống Đa, Cầu Giấy, Thanh Xuân, Tây Hồ, Long Biên, Hoàng Mai và Nam Từ Liêm; chưa tìm được khu Bắc Từ Liêm. Bạn tham khảo vài món ăn trưa nhé: Sushi tổng hợp ở Nhà hàng Buffet Sen Việt, khoảng 145.000 đồng — A25 Luxury Hotel, 684 P. Minh Khai Lẩu ba ba ở Nhà Hàng Giang Dung 1, khoảng 45.000 đồng — Ngách 25 Ngõ Thổ Quan Mực sốt 

[after r2 noithanh-suggest conv 54] PASS dishes=10 outer=0
  > Mình tìm quanh nội thành Hà Nội, ở các khu Ba Đình, Hoàn Kiếm, Hai Bà Trưng, Đống Đa, Cầu Giấy, Thanh Xuân, Tây Hồ, Long Biên, Hoàng Mai, Nam Từ Liêm và Hà Đông; chưa tìm được ở Bắc Từ Liêm. Bạn thử Sushi tổng hợp tại Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai), khoảng 145.000 đồng; Lẩu ba ba tại Nhà Hàng Giang Dung 1 (Ngách 25 Ngõ Thổ Quan), khoảng 45.000 đồng; Mực sốt thái tại 

[after r2 noido-plan conv 55] PASS draftItems=6 outer=0
  > Lịch 2 ngày ở nội đô Hà Nội xong rồi nè, tổng khoảng 680.000 đồng/người. Khu vực tìm được gồm Ba Đình, Hoàn Kiếm, Đống Đa, Hai Bà Trưng, Cầu Giấy, Tây Hồ, Thanh Xuân, Long Biên, Hoàng Mai, Nam Từ Liêm và Hà Đông; chưa tìm được Bắc Từ Liêm. Bạn xem thử, ưng thì bảo mình chốt nhé!

[after r2 area-nodata conv 56] PASS lists=1 secondDishes=0 nearCauGiay=0
  > Mình chưa tìm thấy món ăn tối nào trên ANGI quanh Sóc Sơn trong phạm vi 12 km. Bạn thử nới lỏng điều kiện tìm kiếm nhé.

[after r2 comrang-plan conv 57] PASS wanted=Cơm rang thịt cua với lòng trắng trứng @ Nhà hàng May Mắn | dinnerDay1=Cơm rang thịt cua với lòng trắng trứng @ Nhà hàng May Mắn
  > Mình cập nhật bữa tối ngày 1 theo món bạn chọn nhé. Tổng giờ khoảng 520.000 đồng/người; bạn xem lại, ổn thì bảo mình chốt luôn nha! Lịch này tổng khoảng 520.000 đồng/người, vượt ngân sách 500.000 đồng bạn đặt. Mình nâng ngân sách lên 520.000 đồng nhé; bạn có muốn mình chọn lại món cho hợp ngân sách không, hay giữ nguyên lịch này?

[after r2 quan-nuoc conv 58] PASS dishes=9 drinks=9
  > Mình tìm các món uống quanh Hoàn Kiếm, trong phạm vi khoảng 3 km nhé: Chanh dây kim quất ở Yến Bún Chả (Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1 km), khoảng 15.000 đồng. Sữa đậu nành ở Yến Bún Chả (Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1 km), khoảng 10.000 đồng. Cafe trứng ở MẸT Vietnamese restaurant & Vegetarian Food 5 (Phố Hàng Hòm, cách Hoàn Kiếm khoảng 0 km), khoảng 55.000 đồng. Milo 

[after r2 xadan-buffet conv 59] PASS located=true dishes=9 kmFromXaDan=3.9,4.0,4.1,4.1,4.0,4.1,4.0,4.0,4.0 names=Buffet Hải Sản & Á - Âu Sen Việt 380000; Buffet Royal – Đỉnh cao Wagyu 699000; Buffet Hải Sản Nướng Lẩu Trưa Ngày Thường 493000; Buffet Hải Sản Tối & Cuối tuần 563000; Buffet Classic – Tiệc nướng gọn nhẹ 299000; Buffet suất trẻ em 238000; Buffet Signature – Hải sản cao cấp 449000; Buffet Master – Sườn bò thượng hạng 499000; Buffet Selection – Dẻ sườn mỹ vị 399000
  > Mình tìm quanh Xã Đàn nhé; các món này ở gần đó: Buffet Hải Sản & Á - Âu Sen Việt tại Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai, cách Xã Đàn khoảng 3,9 km), khoảng 380.000 đồng. Buffet Royal – Đỉnh cao Wagyu tại King BBQ Time City (Toà T2, Đ9, 11A-11B, hầm B1/458 P. Minh Khai, Khu đô thị Times City, cách Xã Đàn khoảng 4,1 km), khoảng 699.000 đồng. Buffet Hải Sản Nướng Lẩu Trưa N

[after r3 noido-suggest conv 60] PASS dishes=10 outer=0
  > Mình tìm quanh nội đô Hà Nội, gồm Ba Đình, Hoàn Kiếm, Đống Đa, Hai Bà Trưng, Cầu Giấy, Thanh Xuân, Tây Hồ, Long Biên, Hoàng Mai, Nam Từ Liêm và Hà Đông; Bắc Từ Liêm chưa nằm trong phạm vi tìm được. Bạn thử Sushi tổng hợp ở Nhà hàng Buffet Sen Việt, khoảng 145.000 đồng; A25 Luxury Hotel, 684 P. Minh Khai Lẩu ba ba ở Nhà Hàng Giang Dung 1, khoảng 45.000 đồng; Ngách 25 Ngõ Thổ Quan Mực sốt thái ở Nhà

[after r3 noithanh-suggest conv 61] PASS dishes=10 outer=0
  > Mình tìm quanh nội thành Hà Nội, gồm Ba Đình, Hoàn Kiếm, Đống Đa, Hai Bà Trưng, Tây Hồ, Cầu Giấy, Thanh Xuân, Long Biên, Hoàng Mai, Nam Từ Liêm và Hà Đông; chưa tìm được ở Bắc Từ Liêm. Gợi ý vài món cho bữa tối nhé: Sushi tổng hợp ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai), khoảng 145.000 đồng. Lẩu ba ba ở Nhà Hàng Giang Dung 1 (Ngách 25 Ngõ Thổ Quan), khoảng 45.000 đồng. Mực 

[after r3 noido-plan conv 62] PASS draftItems=6 outer=0
  > Lịch 2 ngày ở Hà Nội xong rồi nè, tổng khoảng 680.000 đồng/người. Bạn xem thử, ưng thì bảo mình chốt nhé!

[after r3 area-nodata conv 63] PASS lists=1 secondDishes=0 nearCauGiay=0
  > Mình chưa tìm thấy món ăn tối nào trên ANGI trong phạm vi 12 km quanh Sóc Sơn. Bạn thử nới lỏng điều kiện tìm kiếm nhé.

[after r3 comrang-plan conv 64] PASS wanted=Cơm rang thịt cua với lòng trắng trứng @ Nhà hàng May Mắn | dinnerDay1=Cơm rang Dương Châu @ Nhà hàng May Mắn + Cơm rang thịt cua với lòng trắng trứng @ Nhà hàng May Mắn
  > Mình thêm Cơm rang thịt cua với lòng trắng trứng vào bữa tối ngày 1 nhé, tổng giờ khoảng 680.000 đồng/người. Bạn xem lại, ổn thì mình chốt luôn nhé. Lịch này tổng khoảng 680.000 đồng/người, vượt ngân sách 500.000 đồng bạn đặt. Mình nâng ngân sách lên 680.000 đồng nhé; bạn có muốn mình chọn lại món cho hợp ngân sách không, hay giữ nguyên lịch này?

[after r3 quan-nuoc conv 65] PASS dishes=9 drinks=9
  > Mình tìm quanh Hoàn Kiếm trong phạm vi khoảng 3 km nhé. Bạn thử Chanh dây kim quất ở Yến Bún Chả (Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1 km), khoảng 15.000 đồng; hoặc Sữa đậu nành ở Yến Bún Chả (Phố Nguyễn Thái Học, cách Hoàn Kiếm khoảng 1 km), khoảng 10.000 đồng; hay Cafe trứng ở MẸT Vietnamese restaurant & Vegetarian Food 5 (Phố Hàng Hòm, cách Hoàn Kiếm khoảng 0 km), khoảng 55.000 đồng.

[after r3 xadan-buffet conv 66] PASS located=true dishes=9 kmFromXaDan=3.9,4.0,4.1,4.1,4.0,4.1,4.0,4.0,4.0 names=Buffet Hải Sản & Á - Âu Sen Việt 380000; Buffet Royal – Đỉnh cao Wagyu 699000; Buffet Hải Sản Nướng Lẩu Trưa Ngày Thường 493000; Buffet Hải Sản Tối & Cuối tuần 563000; Buffet Classic – Tiệc nướng gọn nhẹ 299000; Buffet suất trẻ em 238000; Buffet Signature – Hải sản cao cấp 449000; Buffet Master – Sườn bò thượng hạng 499000; Buffet Selection – Dẻ sườn mỹ vị 399000
  > Mình tìm quanh Xã Đàn được vài lựa chọn buffet; các địa chỉ ghi khoảng cách tới đó nhé: Buffet Hải Sản & Á - Âu Sen Việt ở Nhà hàng Buffet Sen Việt (A25 Luxury Hotel, 684 P. Minh Khai, cách Xã Đàn khoảng 3,9 km), khoảng 380.000 đồng. Buffet Royal – Đỉnh cao Wagyu ở King BBQ Time City (Toà T2, Đ9, 11A-11B, hầm B1/458 P. Minh Khai, Khu đô thị Times City, cách Xã Đàn khoảng 4,1 km), khoảng 699.000 đồ
