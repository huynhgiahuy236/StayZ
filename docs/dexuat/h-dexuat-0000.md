# Mã Đề Xuất: h-dexuat-0000
**Dự án**: StayZ / HuKi Travel Ecosystem
**Tiêu đề**: Đề Xuất Bổ Sung Các Quy Tắc Chuẩn Doanh Nghiệp (Master Rules) Cho File Config `docs/.agents/AGENTS.md`
**Trạng thái**: ĐANG CHỜ THỐNG NHẤT (PROPOSAL PENDING APPROVAL ⏳)

---

## 📋 1. TỔNG QUAN ĐỀ XUẤT (OVERVIEW)

Để nâng cao tính chuyên nghiệp, đảm bảo chất lượng code và phòng ngừa rủi ro hỏng hóc dữ liệu/hệ thống trong quá trình AI làm việc với bạn, dưới đây là **6 Quy tắc bổ sung cực kỳ quan trọng** được đề xuất thêm vào file [`docs/.agents/AGENTS.md`](docs/.agents/AGENTS.md).

---

## 🏛️ 2. CHI TIẾT 6 QUY TẮC BỔ SUNG ĐỀ XUẤT CHO `AGENTS.md`

### 1. 🧪 Quy Tắc Kiểm Thử Tự Động Trước Khi Tuyên Bố Bàn Giao (Verification & Auto-Check Protocol)
- **Quy định**: AI **TUYỆT ĐỐI KHÔNG** được tuyên bố hoàn thành công việc hay báo cáo "SUCCESS" trong `docs/results/h-result-XXXX.md` nếu chưa chạy lệnh kiểm thử cú pháp/runtime (ví dụ: `node -c`, `npx prisma generate`, hoặc kiểm tra server).
- **Yêu cầu**: Mọi kết quả kiểm thử phải được trích xuất minh bạch và ghi vào bảng kết quả trong file `h-result-XXXX.md`.

### 2. 🔐 Quy Tắc Bảo Mật & Quản Lý Biến Môi Trường (Environment Credentials Safety)
- **Quy định**: TUYỆT ĐỐI KHÔNG hardcode mật khẩu, chuỗi kết nối CSDL (PostgreSQL / MongoDB URI), JWT Secret hay PayOS API Keys trực tiếp vào các file source code.
- **Yêu cầu**: Tất cả bí mật hệ thống phải khai báo trong file `platform/.env` và luôn duy trì file mẫu `platform/.env.example` không chứa thông tin nhạy cảm.

### 3. 🛡️ Quy Tắc Bảo Toàn Code & Documentation Integrity
- **Quy định**: Khi thực hiện chỉnh sửa/nâng cấp code, AI phải **giữ nguyên toàn bộ các comment, docstring, helper functions cũ** không liên quan.
- **Yêu cầu**: Không tự ý xóa code cũ hoặc thay đổi định dạng API contract (Input/Output JSON signature) khi chưa cập nhật đồng bộ ở tất cả các nơi gọi API (Mobile & Web).

### 4. 📝 Quy Tắc Phân Tích & Ghi Nhật Ký Lỗi (`docs/errors/`)
- **Quy định**: Khi xảy ra lỗi runtime, build failure hoặc lỗi API, AI không đoán mò nguyên nhân. AI phải inspect file log thực tế, trích xuất chính xác Stack Trace và Root Cause.
- **Yêu cầu**: Mọi lỗi phức tạp cần fix phải được tự động ghi lại file phân tích lỗi tại `docs/errors/error-YYYY-MM-DD.log` hoặc `docs/errors/error-XXXX.md`.

### 5. 🗺️ Quy Tắc Đồng Bộ Luồng Nghiệp Vụ Doanh Nghiệp (`docs/business_flows/`)
- **Quy định**: Mỗi khi bổ sung một phân hệ dịch vụ mới hoặc thay đổi luồng trải nghiệm chính (User Journey), AI phải tự động cập nhật tài liệu luồng nghiệp vụ tương ứng tại `docs/business_flows/huki_travel_master_flow.md`.

### 6. 📐 Quy Tắc Chuẩn Hóa Đặt Tên (Naming & Coding Standard)
- **Quy định**:
  - Controller file: `camelCase` (ví dụ `trip.controller.js`).
  - Router file: `camelCase` (ví dụ `trip.router.js`).
  - Mongoose Model file: `camelCase` (ví dụ `busTrips.model.js`).
  - Prisma PostgreSQL Table/Column: `snake_case` database mapping (ví dụ `split_bill_expenses`, `identity_card_number`).

---

## 📑 3. NỘI DUNG DỰ KIẾN NÂNG CẤP CHO `docs/.agents/AGENTS.md` KHI THỐNG NHẤT

Khi bạn phát lệnh **`h-thống nhất - @docs/dexuat/h-dexuat-0000.md`**, nội dung file `AGENTS.md` sẽ được cập nhật trọn vẹn bao gồm cả 6 quy tắc nâng cấp trên.

---

> [!NOTE]
> **Quy định AGENTS.md**:
> - Đề xuất `h-dexuat-0000.md` hiện đang ở chế độ **`đề xuất`**, **CHƯA THỰC HIỆN SỬA CODE/FILE GỐC**.
> - Bạn vui lòng xem qua 6 quy tắc đề xuất trên, nếu thấy phù hợp thì hãy gõ **`h-thống nhất - @docs/dexuat/h-dexuat-0000.md`** để mình tiến hành cập nhật vào file [`docs/.agents/AGENTS.md`](docs/.agents/AGENTS.md) nhé!
