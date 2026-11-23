# Hướng dẫn sử dụng angi-agent-eval

Bộ công cụ này đo và so sánh các phiên bản ANGI Agent (V1.1, V2.0, V3.0, V3.1). Mọi phiên bản nhận cùng một bộ kịch bản chat, chạy trên cùng dữ liệu và cùng model, rồi được chấm điểm tự động. Toàn bộ số liệu ở mục 5 của tài liệu "III. AI Assistant Optimization" lấy từ thư mục `runs/` của repo này.

Công cụ chạy tách biệt hoàn toàn với dự án: database, reco và backend đều là bản riêng (container `angi-eval-*`, cổng 5201–5204, 55432, 18100). Nó không đụng vào `E:\CapStone` khi chạy. Riêng lúc build và lúc lấy khóa OpenAI, nó chỉ **đọc** từ `angi-backend`.

---

## 1. Có ba cách dùng

| Cách | Để làm gì | Cần gì | Chi phí |
| --- | --- | --- | --- |
| **A. Xem và truy số liệu** | Chỉ ra mỗi con số trong tài liệu đến từ file nào | Node.js và repo này | 0 |
| **B. Chạy thử với model giả** | Cho thấy cả quy trình chạy được: backend, đăng nhập, chat, ghi kết quả, chấm điểm | Máy đã cài đặt đầy đủ (mục 2) | 0 |
| **C. Chạy với model thật** | Chạy lại một hoặc vài kịch bản trên gpt-6-luna và chấm điểm ngay | Như B, cộng khóa OpenAI | Một kịch bản khoảng 130 nghìn token, chưa tới 0,01 USD |

Khi demo cho hội đồng nên đi theo thứ tự: A trước, sau đó C với một kịch bản. B dùng để kiểm tra máy trước buổi demo.

---

## 2. Máy chạy cần có gì

Máy đang dùng để đo (ổ `E:`) đã có đủ mọi thứ dưới đây. Nếu dùng máy khác thì phải chuẩn bị đủ, và phải clone repo vào đúng `E:\ANGI-Agent-Eval`, vì các script đang ghi cứng đường dẫn này.

| Thành phần | Ghi chú |
| --- | --- |
| Docker Desktop | Phải đang chạy. Cần các image `pgvector/pgvector:0.8.7-pg16` và `angi-reco-runtime:local` |
| Node.js 24 | Chạy kịch bản, proxy, chấm điểm |
| .NET SDK 10 | Chỉ cần khi build lại backend |
| Git for Windows | Script `.sh` chạy bằng `C:\Program Files\Git\bin\bash.exe` |
| `E:\CapStone\angi-backend` | Nguồn để build từng phiên bản. Khóa OpenAI được đọc từ user secrets của project này (`Ai:ApiKey`) |
| `.secrets.env` | Chép từ `.secrets.env.example` rồi điền giá trị. File này không có trong git |
| `seed/angi-prod-sync-20261123.dump`, `seed/test-user.sql` | Không có trong git vì chứa dữ liệu người dùng thật và hash mật khẩu (xem `seed/README.md`) |
| `src/`, `build/` | Mã nguồn và bản build của 4 phiên bản. Không có trong git; tạo lại bằng `tools/build-version.sh <v> <commit>`, commit lấy trong `manifest.json` |

Các file không có trong git chỉ được chép tay giữa các máy (USB, ổ chung nội bộ). **Không bao giờ** đưa file dump production lên GitHub, email hay drive công khai.

---

## 3. Cách A: truy một con số về file gốc

Mỗi vòng có một thư mục riêng (bảng đầy đủ ở `runs/README.md`):

| Thư mục | Vòng trong tài liệu | Bảng |
| --- | --- | --- |
| `runs/round-1/` | Vòng 1: V1.1, V2.0, V3.0, 20 kịch bản × 1 lần | 5.1, biểu đồ |
| `runs/round-2/` | Vòng 2: V3.0, V3.1 (`994ce5e`), 10 kịch bản × 2 lần | 5.2 |
| `runs/round-3/v11-v20-v30/` | Vòng 3: V1.1, V2.0, V3.0, 2 kịch bản thêm món × 2 lần | 5.3 |
| `runs/round-3/v31/` | Vòng 3: V3.1 (`c75f9b6`). Cột trong bảng 5.3 lấy từ `metrics-adding.json` | 5.3 |

Mỗi dòng trong bảng tổng hợp ứng với một trường trong `metrics.json`:

| Dòng trong bảng | Trường trong `metrics.json` |
| --- | --- |
| Task success rate | `passed` / `scenarios` |
| Format | `formatOkTurns` / `turns` |
| Faithfulness | `faithfulTurns` / `turns` |
| Dishes and prices in replies matching the catalog | `dishClaimsVerified` / `dishClaims` |
| Draft items matching the catalog | `proposalItems` − `proposalItemsMismatched` / `proposalItems` |
| Average output tokens per scenario | `outputTokensPerScenario` |
| Average total tokens per scenario | `tokensPerScenario` |
| Input tokens served from cache | `cachedTokens` / `inputTokens` |
| Latency p50 / p95 | `turnMsMedian` / `turnMsP95` (mili giây) |
| Cost per task | `costPerScenarioUsd` |

Đi xuống tầng sâu hơn:

| Muốn xem | Mở file |
| --- | --- |
| Nguyên văn câu người dùng gõ và câu Agent trả lời, HTTP status, thời gian từng lượt | `results.jsonl` |
| Từng lần gọi OpenAI, số token OpenAI trả về, `finishReason` | `calls.jsonl` |
| Kịch bản nào không đạt và vì sao | `rescore.log` (cuối file) |
| Phiên bản, commit, checksum của dump đã dùng | `run-info.json` |

Tính lại báo cáo từ dữ liệu có sẵn (không gọi model, không cần Docker):

```powershell
node E:\ANGI-Agent-Eval\tools\report.mjs round-2
node E:\ANGI-Agent-Eval\tools\cost.mjs round-2
```

**Không** chạy lại `tools/rescore.mjs` trên một vòng cũ: nó đọc bản nháp lịch trong database, mà database chỉ còn dữ liệu của lần chạy gần nhất.

---

## 4. Cách B: chạy thử với model giả (miễn phí)

Model giả trả lời theo mẫu cố định. Nó chỉ dùng để kiểm tra quy trình chạy được, **không** dùng số liệu của nó để báo cáo.

Mở PowerShell và dán **từng lệnh một**:

```powershell
# 1. Bật model giả, proxy và backend V3.1
powershell -ExecutionPolicy Bypass -File E:\ANGI-Agent-Eval\tools\services-start.ps1 -RunId _setup/dry-demo -Versions v31
```

Đợi khoảng 30 giây, đến khi http://127.0.0.1:5204/health mở được trên trình duyệt.

```powershell
# 2. Chạy 2 kịch bản
node E:\ANGI-Agent-Eval\tools\run-eval.mjs _setup/dry-demo --versions v31 --only chat-greet,plan-full

# 3. Tắt dịch vụ (luôn chạy lệnh này, kể cả khi lệnh 2 lỗi)
powershell -ExecutionPolicy Bypass -File E:\ANGI-Agent-Eval\tools\services-stop.ps1 -RunId _setup/dry-demo
```

Kết quả nằm ở `runs\_setup\dry-demo\`. Mỗi lần chạy nên đặt một `-RunId` mới (`dry-demo-2`, …).

---

## 5. Cách C: demo với model thật

### 5.1 Chuẩn bị trước buổi demo

1. Bật Docker Desktop.
2. Chạy cách B một lần để chắc máy ổn.
3. Kiểm tra khóa OpenAI còn hạn và tài khoản còn tiền. Script tự đọc khóa từ user secrets của `angi-backend`, không in ra màn hình, không ghi xuống đĩa.

### 5.2 Lệnh chạy (một lệnh duy nhất)

Kịch bản nên dùng là **thêm món** (`edit-add-dish`). Đây chính là lỗi AI-D07 đã sửa ở V3.1, và bộ chấm kiểm tra luôn bản nháp được lưu trong database:

```powershell
powershell -ExecutionPolicy Bypass -File E:\ANGI-Agent-Eval\tools\rerun.ps1 -RunId demo-1 -Versions v31 -Only edit-add-dish
```

Script in ra kế hoạch rồi hỏi xác nhận:

```
Run:            runs\demo-1
Versions:       v31
Scenarios:      1 x 1 run(s) = 1 conversations
Expected:       about 60,000 tokens, about USD 0.00
Token cap:      2,000,000 tokens, at most about USD 0.09
This calls the paid OpenAI API. Type YES to start:
```

Gõ `YES` rồi Enter. Con số "Expected" chỉ là ước tính thô. Thực tế kịch bản này dùng khoảng 130 nghìn token, tức khoảng 0,005 USD. Trần token chặn cứng: hết trần thì proxy trả lỗi 429, nên không thể tốn quá mức trần.

Script tự làm lần lượt:
1. Khôi phục database và container reco mới từ file dump. Bước này mất vài phút vì khôi phục tất cả database đánh giá.
2. Xóa hội thoại Agent cũ, thêm tài khoản test.
3. Bật backend V3.1 nối với OpenAI thật qua proxy có trần token.
4. Chạy kịch bản, chấm điểm, viết báo cáo.
5. Tắt dịch vụ và xóa khóa khỏi bộ nhớ, kể cả khi có lỗi giữa chừng.

Muốn so sánh trực tiếp phiên bản cũ và mới (V2.0 thay món thay vì thêm, V3.1 thêm đúng), chạy:

```powershell
powershell -ExecutionPolicy Bypass -File E:\ANGI-Agent-Eval\tools\rerun.ps1 -RunId demo-2 -Versions v20,v31 -Only edit-add-dish
```

Lệnh này tốn khoảng 250 nghìn token, chưa tới 0,02 USD. V1.1 và V2.0 tự được bỏ 3 loại tag mới mà hai bản này không đọc được (xem `run-info.json`).

### 5.3 Cho hội đồng xem gì sau khi chạy

| Bước | Mở | Điểm cần chỉ |
| --- | --- | --- |
| 1 | `runs\demo-1\report.md` | Đạt hay không, số token, thời gian |
| 2 | `runs\demo-1\results.jsonl` | Câu "Thêm món bún chả vào bữa trưa ngày 1" và câu trả lời thật của Agent |
| 3 | `runs\demo-1\rescore.log` | Kết quả kiểm tra bản nháp: bản mới phải giữ mọi món cũ và có thêm đúng 1 món |
| 4 | `runs\demo-1\calls.jsonl` | Từng lần gọi OpenAI với số token do OpenAI trả về |
| 5 | Dashboard OpenAI (Usage) | Lượng token tăng đúng bằng tổng trong `calls.jsonl` |

Xem trực tiếp bản nháp trong database:

```powershell
docker exec angi-eval-pg psql -U postgres -d angi_eval_v31 -c "select conversation_id, id, jsonb_array_length(payload->'items') as items from core.agent_proposals order by id"
```

Bản nháp sau khi thêm món phải có số món nhiều hơn bản trước đúng 1.

### 5.4 Muốn hội đồng tự đặt câu hỏi

Thêm một kịch bản vào cuối mảng `scenarios` trong `tools\scenarios.json`, ví dụ:

```json
{ "id": "demo-hoidong", "kind": "suggest", "turns": [{ "text": "Ở Hà Nội có món bún chả nào dưới 50 nghìn không?" }], "expect": { "proposal": false, "committed": false } }
```

Rồi chạy `rerun.ps1 -RunId demo-3 -Versions v31 -Only demo-hoidong`. Dùng lại `{ "use": "plan2" }` ở lượt đầu nếu cần có lịch trước, như kịch bản `edit-add-dish`. Sau buổi demo nên xóa kịch bản tạm này, để bộ 22 kịch bản chuẩn không bị đổi.

---

## 6. Các lệnh hay dùng

| Lệnh | Tác dụng |
| --- | --- |
| `rerun.ps1 -RunId <tên>` | 22 kịch bản × 4 phiên bản × 1 lần (khoảng 5–6 triệu token, khoảng 0,25 USD) |
| `rerun.ps1 -RunId <tên> -Repeats 2` | Mỗi kịch bản chạy 2 lần |
| `rerun.ps1 -RunId <tên> -Versions v30,v31` | Chỉ một số phiên bản |
| `rerun.ps1 -RunId <tên> -Only id1,id2` | Chỉ một số kịch bản (danh sách id ở `tools\scenarios.json`) |
| `rerun.ps1 ... -TokenCap 3000000` | Tự đặt trần token |
| `rerun.ps1 ... -Yes` | Bỏ bước gõ YES |
| `node tools\report.mjs <thư mục>` | Viết lại `report.md` từ kết quả có sẵn |
| `node tools\cost.mjs <thư mục>` | Thêm chi phí vào `metrics.json` |
| `node tools\metrics-subset.mjs <thư mục> <id,...> <tên>` | Số liệu cho một nhóm kịch bản trong một lần chạy |

Một `-RunId` đã có sẽ không bao giờ bị ghi đè: script dừng và báo lỗi.

Các phiên bản: `v11` = V1.1 (`9106735`), `v20` = V2.0 (`0706765`), `v30` = V3.0 (`3214648`), `v31` = V3.1 (`c75f9b6`).

---

## 7. Lỗi thường gặp

| Thông báo | Cách xử lý |
| --- | --- |
| `running scripts is disabled on this system` | Chạy qua `powershell -ExecutionPolicy Bypass -File ...` như các lệnh ở trên |
| `runs\<tên> already exists` | Đổi `-RunId` khác |
| `error during connect` / `docker: not found` | Bật Docker Desktop rồi chạy lại |
| `Backend v31 did not become healthy` | Xem `runs\<tên>\backend-v31.err`; thường do chưa build (`build\v31` trống) hoặc thiếu `.secrets.env` |
| `login failed` | Tài khoản test chưa có trong database (thiếu `seed\test-user.sql`) hoặc `EVAL_USER_PASSWORD` trong `.secrets.env` sai |
| `EVAL_USER_PASSWORD is missing from .secrets.env` | Thêm dòng đó vào `.secrets.env` |
| `Ai:ApiKey is missing` | Đặt khóa: `dotnet user-secrets set Ai:ApiKey <khóa>` trong `E:\CapStone\angi-backend\ANGI.WebApi` |
| HTTP 429 trong `proxy.out` | Đã chạm trần token; chạy lại với `-TokenCap` lớn hơn |
| HTTP 500 ở V1.1 hoặc V2.0 | Còn tag loại mới trong database; chạy `tools\legacy-tags.sh` (`rerun.ps1` tự làm bước này) |

---

## 8. Những điều không được làm

- Không đưa lên GitHub: `.secrets.env`, `seed\*.dump`, `seed\test-user.sql`. `.gitignore` đã chặn sẵn; đừng dùng `git add -f` với các file này.
- Không in hoặc ghi khóa OpenAI ra file hay ảnh chụp màn hình.
- Không sửa số trong `runs\round-*`. Đây là bằng chứng của tài liệu. Muốn đo lại thì chạy với `-RunId` mới.
- Không chạy lại `tools\rescore.mjs` trên một vòng cũ (xem mục 3).
