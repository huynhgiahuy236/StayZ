# 🚀 HuKi Travel - Master Feature Architecture & Service Rule Registry

> **Tài liệu tổng hợp danh mục quy tắc thiết kế và chuẩn mực kỹ thuật cho tất cả các Phân Hệ Dịch Vụ Microservices (Feature Modules) thuộc Hệ sinh thái Super-App HuKi Travel.**
> **Tác giả**: Huỳnh Gia Huy (`Huy` - Prefix `h-`) | **HK Team**
> **Phiên bản Master**: v2.0.0 | **Ngày cập nhật**: 11/08/2026

---

## 🏛️ 1. MA TRẬN PHÂN RÃ CHUYÊN SÂU 8 MICROSERVICES FEATURE MODULES

| STT | Phân Hệ Dịch Vụ | Tên Service & Route Path | Database Type | File Quy Tắc Chi Tiết (Rule Specification) |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **HuKi ID (SSO & KYC)** | `huki-auth-service` (`/api/v1/auth`) | PostgreSQL | [`01-huki-id-auth.md`](01-huki-id-auth.md) |
| **2** | **HuKi Stay** | `huki-stay-service` (`/api/v1/properties`) | PostgreSQL | [`02-huki-stay.md`](02-huki-stay.md) |
| **3** | **HuKi Bus** | `huki-bus-service` (`/api/v1/huki/bus`) | MongoDB + Redis | [`03-huki-bus.md`](03-huki-bus.md) |
| **4** | **HuKi Ride** | `huki-ride-service` (`/api/v1/huki/rides`) | MongoDB + PostgreSQL | [`04-huki-ride.md`](04-huki-ride.md) |
| **5** | **HuKi Trip** | `huki-trip-service` (`/api/v1/huki/trips`) | MongoDB + Redis | [`05-huki-trip.md`](05-huki-trip.md) |
| **6** | **HuKi Pass** | `huki-pass-service` (`/api/v1/huki/pass`) | MongoDB | [`06-huki-pass.md`](06-huki-pass.md) |
| **7** | **HuKi Wallet & Split Bill**| `huki-wallet-service` (`/api/v1/huki/split-bill`) | PostgreSQL | [`07-huki-wallet-splitbill.md`](07-huki-wallet-splitbill.md) |
| **8** | **HuKi Guide & Taste** | `huki-guide-service` (`/api/v1/huki/guide`) | MongoDB | [`08-huki-guide-taste.md`](08-huki-guide-taste.md) |

---

## 📐 2. NGUYÊN TẮC THIẾT KẾ SENIOR ARCHITECT NĂNG CAO (ARCHITECTURAL STANDARDS)

### 🔹 1. Chuẩn Hóa Kiến Trúc Dual-Database (Polyglot Persistence):
- **PostgreSQL**: Dùng cho giao dịch tài chính, số dư tiền, quản lý tồn kho phòng `room_inventory`, tài khoản User & KYC (đảm bảo tính toàn vẹn **ACID strict**).
- **MongoDB Atlas**: Dùng cho giỏ hàng đa dịch vụ `trips`, sơ đồ xe `bus_trips`, cẩm nang `guide` (phù hợp dữ liệu JSON lồng nhau linh hoạt).
- **Redis Cluster**: Caching API master catalog, đếm ngược giữ chỗ tập trung `Hold Timer` (10 phút) và phân tán khóa `Redlock` chống Overbooking.

### 🔹 2. Chuẩn Hóa RESTful API Contract & Response Format:
Tất cả các Service bắt buộc trả về định dạng JSON thống nhất:
- **Thành công (200/201 OK)**:
  ```json
  {
    "success": true,
    "code": "SUCCESS",
    "message": "Thông báo ngắn gọn",
    "data": { ... },
    "meta": { "page": 1, "limit": 20, "total": 100 }
  }
  ```
- **Thất bại (4xx/5xx Error)**:
  ```json
  {
    "success": false,
    "code": "INVALID_INPUT_DATA",
    "message": "Mô tả chi tiết nguyên nhân lỗi",
    "error": { ... }
  }
  ```

### 🔹 3. Quy Tắc Bảo Toàn Dữ Liệu & Soft Delete (Audit Rules):
Mọi bảng/collection CSDL bắt buộc duy trì 5 trường audit soft delete:
- **PostgreSQL Prisma**: `is_deleted` (Boolean), `deleted_at` (DateTime?), `deleted_by` (UUID?), `created_at` (DateTime), `updated_at` (DateTime).
- **MongoDB Mongoose**: `isDeleted` (Boolean), `deletedAt` (Date), `deletedBy` (String), `timestamps: true`.

---

> Vui lòng truy cập từng file tài liệu quy tắc chi tiết theo danh mục bảng trên để xem đặc tả kỹ thuật chi tiết của từng Service.
