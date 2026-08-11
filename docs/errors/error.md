# 🚨 Nhật Ký Sự Cố & Sửa Lỗi Tập Trung (Master System Error Log)

[Tác giả: Huy] Tất cả các sự cố phát sinh trong quá trình chạy ứng dụng, kết nối CSDL, build source code hoặc thực thi lệnh `fix` (`h-fix` / `k-fix`) sẽ được tự động ghi bổ sung (append) liên tục vào duy nhất file này (`docs/errors/error.md`).

---

## 🛠️ LỊCH SỬ CÁC SỰ CỐ ĐÃ XỬ LÝ (RESOLVED ERROR LOGS)

### 📌 Log #001 - [2026-08-11 21:26:01] PrismaClientInitializationError (Prisma v7.x PostgreSQL Adapter)
* **Lỗi ghi nhận**: `PrismaClientInitializationError: PrismaClient was instantiated without any options. A driver adapter is required to connect to your database.`
* **Thành phần bị lỗi**: `platform/src/controllers/auth.controller.js`, `ride.controller.js`, `splitbill.controller.js`
* **Nguyên nhân gốc rễ**: `@prisma/client` v7.9.1 với provider `postgresql` trong môi trường Node.js yêu cầu truyền Driver Adapter (`@prisma/adapter-pg` & `pg` pool).
* **Phương án xử lý**:
  1. Cài đặt package `@prisma/adapter-pg` và `pg`.
  2. Khởi tạo singleton DB client trung tâm tại `platform/src/config/prisma.config.js` dùng adapter `PrismaPg`.
  3. Cập nhật các Controller dùng chung `prisma.config.js`.
* **Trạng thái**: ✅ **ĐÃ FIX & KIỂM THỬ THÀNH CÔNG** (`node -e "require('./src/controllers/auth.controller')"` PASSED).

---

### 📌 Log #002 - [2026-08-11 22:17:00] Header Navigation Text Break & Proper Noun Translation
* **Lỗi ghi nhận**: Chữ Tiếng Hàn (`숙소 & 빌라`, `버 티켓`, `렌터카`) trên Header Nav Bar bị vỡ gãy thành 2 dòng đứng khi đổi ngôn ngữ sang `KR KO`.
* **Thành phần bị lỗi**: `web/src/app/globals.css` (`.nav-links a`), `web/src/lib/i18n.ts`
* **Nguyên nhân gốc rễ**: 
  1. Thẻ `.nav-links a` thiếu CSS property `white-space: nowrap` & `word-break: keep-all`.
  2. Chưa quy định rõ ràng Quy tắc Bảo tồn Tên riêng Địa danh (Proper Nouns like Sydney, Tokyo, Đà Nẵng, New York).
* **Phương án xử lý**:
  1. Bổ sung `white-space: nowrap; word-break: keep-all; display: inline-flex;` cho `.nav-links a` trong `web/src/app/globals.css`.
  2. Thiết lập Quy tắc Bảo tồn Tên riêng Địa danh (không dịch tên riêng địa danh, chỉ dịch phần tiêu đề/mô tả đi kèm).
  3. Xây dựng script kiểm thử tự động `scripts/test-i18n-darkmode.js`.
* **Trạng thái**: ✅ **ĐÃ FIX & CHẠY SCRIPT TEST THÀNH CÔNG** (`node scripts/test-i18n-darkmode.js` PASSED 29/29).
