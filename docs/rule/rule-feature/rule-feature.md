# 🚀 HuKi Travel - Master Feature Standard & Integration Rules

[Tác giả: Huy] Tài liệu này quy định các chuẩn mực kỹ thuật và quy trình phát triển cho tất cả các Phân Hệ Tính Năng (Feature Modules) thuộc Hệ sinh thái Super-App HuKi Travel.

---

## 🏛️ 1. DANH SÁCH 7 PHÂN HỆ TÍNH NĂNG HẠT NHÂN (CORE FEATURE MODULES)

| STT | Tên Phân Hệ | Mô Tả Chức Năng | Platform Route | Database Model |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **HuKi ID** | Đăng nhập tập trung (SSO) & Xác thực KYC (CCCD, Passport, GPLX) | `/api/v1/auth/kyc` | PostgreSQL `users` |
| 2 | **HuKi Stay** | Đặt phòng Khách sạn/Villa, tìm kiếm GPS bán kính & bộ lọc tiện ích | `/api/v1/properties` | MongoDB `properties`, `rooms` |
| 3 | **HuKi Bus** | Sơ đồ ghế xe khách 2 tầng real-time, khóa ghế tạm thời 10 phút | `/api/v1/huki/bus` | MongoDB `bus_trips` |
| 4 | **HuKi Ride** | Thuê xe máy & ô tô tự lái, kiểm tra tự động GPLX KYC | `/api/v1/huki/rides` | MongoDB `rides` |
| 5 | **HuKi Trip** | Giỏ hàng chuyến đi Combo (Flight + Stay + Bus + Ride), đếm ngược giữ chỗ | `/api/v1/huki/trips` | MongoDB `trips` |
| 6 | **HuKi Pass** | Ví vé điện tử & Mã QR Code động tự làm mới mỗi 30 giây | `/api/v1/huki/pass` | MongoDB `huki_passes` |
| 7 | **HuKi Wallet & Split Bill** | Ví nhóm chuyến đi, nhập chi tiêu & tự động hạch toán chia nợ chéo | `/api/v1/huki/split-bill` | PostgreSQL `split_bill_*` |

---

## 📐 2. QUY TRÌNH PHÁT TRIỂN & CẬP NHẬT FEATURE MỚI

1. **Phân Rã Controller & Router**: Mỗi feature mới phải có file Controller (`feature.controller.js`) và Router (`feature.router.js`) độc lập tại `platform/src/`.
2. **Khai Báo Data Schema Dual-DB**:
   - Nếu là giao dịch/tài chính/KYC: Khai báo Table trong `platform/prisma/schema.prisma` (PostgreSQL).
   - Nếu là danh mục/JSON lồng nhau/real-time: Khai báo Schema trong `platform/src/models/` (MongoDB Mongoose).
3. **Chuẩn Hóa API Response Contract**:
   - Thành công: `{ success: true, message: "...", data: { ... } }`
   - Thất bại: `{ success: false, code: "ERROR_CODE", message: "Chi tiết lỗi" }`
4. **Cặp Đôi Đồng Bộ với Nhật Ký Lỗi (`docs/errors/`)**:
   - Mỗi khi phát sinh lỗi trong quá trình phát triển/chạy feature, log lỗi chi tiết phải được tự động ghi lại tại `docs/errors/error-YYYY-MM-DD.log`.

---

## 🛡️ 3. QUY TẮC BẢO TOÀN DỮ LIỆU FEATURE (AUDIT & SOFT DELETE)
Mọi feature mới khi làm việc với CSDL phải tuân thủ 5 trường Audit Soft Delete:
- PostgreSQL Prisma: `is_deleted`, `deleted_at`, `deleted_by`, `created_at`, `updated_at`.
- MongoDB Mongoose: `isDeleted`, `deletedAt`, `deletedBy`, `timestamps: true`.
