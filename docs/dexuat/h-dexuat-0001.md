# Mã Đề Xuất: h-dexuat-0001
**Dự án**: StayZ platform & DB Upgrade to HuKi Travel Ecosystem
**Tiêu đề**: Bản Thiết Kế Chi Tiết & Chuẩn Hóa CSDL Dài Hạn (PostgreSQL + MongoDB Atlas) & Nâng Cấp Platform Express API Cho Hệ Sinh Thái HuKi Travel v2.0
**Trạng thái**: ĐÃ THỰC HIỆN THÀNH CÔNG (EXECUTED & COMPLETED ✅)

---

## 📋 1. TỔNG QUAN ĐỀ XUẤT CHUYỂN ĐỔI (OVERVIEW)

Theo định hướng kiến trúc từ bộ tài liệu **HuKi Travel Master Architecture Specification v2.0** (`HuKi Travel/`), hệ thống Backend Platform (`platform/`) và CSDL (Prisma PostgreSQL + Mongoose MongoDB) của StayZ sẽ được tái cấu trúc và nâng cấp mở rộng từ **Đơn dịch vụ Khách sạn (StayZ)** thành **Super-App Du Lịch Đa Dịch Vụ (HuKi Travel)**.

---

## 🗄️ 2. KẾ HOẠCH NÂNG CẤP CƠ SỞ DỮ LIỆU (DATABASE SPECIFICATION)

### 🔹 A. Nâng Cấp CSDL Relational (Prisma Schema - `platform/prisma/schema.prisma`)

1. **Bảng `users` (Nâng cấp thành HuKi ID & Phân hệ KYC)**:
   - Thêm cột `identity_card_number` (CCCD), `passport_number` (Hộ chiếu), `driver_license_number` (GPLX).
   - Thêm cột `kyc_status` (`UNVERIFIED`, `PENDING`, `VERIFIED`), `driver_license_image_url`.

2. **Bảng `bookings` (Nâng cấp thành Universal Trip Order)**:
   - Thêm cột `booking_type` (`STAY`, `FLIGHT`, `BUS`, `RIDE`, `COMBO_TRIP`).
   - Thêm cột `hold_expires_at` (Thời gian đếm ngược giữ chỗ Redis Redlock Countdown Timer - 10 đến 15 phút).

3. **Tạo Bảng Mới `split_bill_expenses` & `split_bill_shares` (Phân hệ HuKi Wallet & Split Bill)**:
   - `split_bill_expenses`: Thêm các khoản chi tiêu chuyến đi nhóm (`trip_id`, `payer_id`, `amount`, `description`, `split_method`).
   - `split_bill_shares`: Quản lý nợ chéo từng thành viên (`expense_id`, `user_id`, `owed_amount`, `is_settled`).

---

### 🔹 B. Nâng Cấp CSDL NoSQL MongoDB Atlas (`platform/src/models/`)

1. **[NEW] `trips.model.js` (Universal Trip Cart)**:
   - Lưu giỏ hàng Chuyến đi đa dịch vụ lồng nhau (Flight + Hotel + Bus + Ride).
   - Quản lý trạng thái `HOLDING` / `PAID` / `EXPIRED` cùng thời gian giải phóng tự động.

2. **[NEW] `busTrips.model.js` (Sơ Đồ Ghế Xe Khách 2 Tầng - Real-time SeatMap)**:
   - Lưu cấu trúc sơ đồ ghế giường nằm (`seatMap` array: `seatNo`, `deck`, `status: AVAILABLE/LOCKED/BOOKED`, `lockedByUserId`, `lockExpiresAt`).

3. **[NEW] `rides.model.js` (Danh Mục Xe Máy / Ô Tô Thuê Tự Lái)**:
   - Lưu danh sách phương tiện, điểm giao xe tận nơi, yêu cầu KYC bằng lái xe GPLX.

4. **[NEW] `hukiPass.model.js` (Ví Vé & Mã QR Động)**:
   - Lưu E-Ticket kèm mã token QR động làm mới mỗi 30 giây chống chụp màn hình bán vé giả.

---

## 🛠️ 3. KẾ HOẠCH NÂNG CẤP BACKEND PLATFORM (`platform/src/`)

| Phân hệ / Module | Đường dẫn File | Mục Đích & Hạng Mục Chỉnh Sửa |
| :--- | :--- | :--- |
| **Server Main** | `platform/server.js` | Tích hợp Route mới `/api/v1/huki`, bổ sung Socket.io namespace cho ghế xe khách & Redis Redlock lock service. |
| **HuKi ID Auth** | `src/controllers/auth.controller.js`<br>`src/routes/auth.routes.js` | Bổ sung API cập nhật hồ sơ KYC (CCCD, Passport, GPLX) và xác thực tài khoản tập trung. |
| **Universal Trip** | `src/controllers/trip.controller.js`<br>`src/routes/trip.routes.js` | [NEW] API Tạo giỏ hàng chuyến đi đa dịch vụ, tính toán tổng tiền Combo tiết kiệm và đếm ngược giữ chỗ. |
| **Bus Service** | `src/controllers/bus.controller.js`<br>`src/routes/bus.routes.js` | [NEW] API Tìm kiếm tuyến xe, tải sơ đồ ghế 2 tầng real-time và khóa ghế tạm thời 10 phút via Redis Redlock. |
| **Ride Service** | `src/controllers/ride.controller.js`<br>`src/routes/ride.routes.js` | [NEW] API Đặt thuê xe máy/ô tô, tự động kiểm tra trạng thái KYC bằng lái xe trước khi duyệt đơn. |
| **Split Bill** | `src/controllers/splitbill.controller.js`<br>`src/routes/splitbill.routes.js` | [NEW] API Tạo nhóm chuyến đi, nhập khoản chi tiêu và chạy thuật toán tối thiểu hóa số lượt chuyển khoản nợ chéo. |

---

## 📑 4. DANH SÁCH FILE ĐÃ THỰC HIỆN

```text
platform/
├── prisma/
│   └── schema.prisma                      # [MODIFY] Thêm KYC, Universal Booking, Split Bill Tables
├── src/
│   ├── models/
│   │   ├── trips.model.js                 # [NEW] MongoDB Schema cho Universal Trip Cart
│   │   ├── busTrips.model.js              # [NEW] MongoDB Schema cho Sơ đồ ghế xe khách real-time
│   │   ├── rides.model.js                 # [NEW] MongoDB Schema cho Xe thuê
│   │   └── hukiPass.model.js              # [NEW] MongoDB Schema cho Mã QR Động
│   ├── controllers/
│   │   ├── auth.controller.js             # [MODIFY] Thêm API KYC
│   │   ├── trip.controller.js             # [NEW] Controller quản lý chuyến đi
│   │   ├── bus.controller.js              # [NEW] Controller sơ đồ ghế & đặt vé xe
│   │   ├── ride.controller.js             # [NEW] Controller thuê xe
│   │   └── splitbill.controller.js        # [NEW] Controller chia tiền nhóm
│   ├── routes/
│   │   ├── auth.routes.js                 # [MODIFY] Thêm router KYC
│   │   ├── trip.routes.js                 # [NEW] Route /api/v1/huki/trips
│   │   ├── bus.routes.js                  # [NEW] Route /api/v1/huki/bus
│   │   ├── ride.routes.js                 # [NEW] Route /api/v1/huki/ride
│   │   └── splitbill.routes.js            # [NEW] Route /api/v1/huki/wallet/split-bill
│   └── server.js                          # [MODIFY] Đăng ký các Route Huki mới
```

---

## ➕ 5. ĐỀ XUẤT BỔ SUNG (NÂNG CẤP CHUYỂN ĐỔI MySQL ➔ PostgreSQL)

### 📊 Đánh Giá Tính Khả Thi & Lợi Ích:
Chuyển đổi từ **MySQL $\rightarrow$ PostgreSQL** là một quyết định **CỰC KỲ ỔN ĐỊNH VÀ ĐÚNG ĐẮN 100%**:

1. **Khớp 100% với Chuẩn Kiến Trúc HuKi Master Spec v2.0**:
   - Tài liệu thiết kế v2.0 (`HuKi Travel/`) đã chọn **PostgreSQL** làm RDBMS hạt nhân cho Auth & Transactions.
2. **PostGIS (Spatial Indexing)**:
   - Hỗ trợ GiST Spatial Index cho phép query địa điểm/khách sạn gần tôi (`latitude/longitude`) cực nhanh.
3. **Tận Dụng Hạ Tầng 0Đ (Supabase / Neon.tech)**:
   - PostgreSQL chạy Serverless hoàn toàn miễn phí trên Supabase hoặc Neon.tech (512MB Storage + High Availability).
4. **Cực Kỳ Dễ Chuyển Đổi Qua Prisma ORM**:
   - Prisma ORM giúp việc đổi từ MySQL sang PostgreSQL diễn ra rất mượt mà chỉ qua việc chỉnh `provider = "postgresql"` trong [`platform/prisma/schema.prisma`](platform/prisma/schema.prisma).

---

## 🏛️ 6. CHI TIẾT MA TRẬN BẢNG & COLLECTION DÀI HẠN TOÀN DỰ ÁN (MASTER DB BLUEPRINT)

Hệ thống HuKi Travel vận hành mô hình **Polyglot Dual-Database Architecture**:
- **PostgreSQL (Transaction DB - ACID strict)**: Quản lý Người dùng, Xác thực KYC, Đơn hàng, Thanh toán tiền tệ, Mã giảm giá, Nợ chéo Split Bill.
- **MongoDB Atlas (Catalog DB - High Performance Read & JSON)**: Quản lý Danh mục Khách sạn, Phòng nghỉ, Giỏ hàng Chuyến đi lồng nhau, Xe khách SeatMap, Xe thuê, Chuyến bay, Cẩm nang Du lịch và Mã QR Động.

```
                               ┌─────────────────────────────────────────┐
                               │       HUKI TRAVEL DUAL DATABASE         │
                               └────────────────────┬────────────────────┘
                                                    │
                   ┌────────────────────────────────┴────────────────────────────────┐
                   ▼                                                                 ▼
      POSTGRESQL (TRANSACTION & IDENTITY DB)                               MONGODB ATLAS (CATALOG & CONTENT DB)
      • users (HuKi ID & KYC)                                              • properties & rooms (HuKi Stay Catalog)
      • bookings (Universal Booking Orders)                                • trips (Universal Multi-Cart & Hold-Timer)
      • booking_items (Chi tiết dịch vụ đơn)                               • bus_trips (Sơ đồ ghế xe khách 2 tầng)
      • payments (Nhật ký thanh toán PayOS/Wallet)                         • rides (Danh mục xe máy/ô tô thuê)
      • split_bill_expenses & split_bill_shares (Chia tiền nhóm)           • flights (Lịch bay khứ hồi / 1 chiều)
      • coupons & reviews (Khuyến mãi & Đánh giá)                          • destinations & guides (Cẩm nang & Điểm đến)
                                                                           • huki_passes (Mã QR Động vé điện tử)
```

---

## 🛡️ 7. CHUẨN HÓA AUDIT TRAIL & SOFT DELETE PATTERN

1. **PostgreSQL Prisma**:
   ```prisma
   is_deleted Boolean   @default(false)
   deleted_at DateTime?
   deleted_by String?   @db.VarChar(64)
   created_at DateTime? @default(now())
   updated_at DateTime? @default(now()) @updatedAt
   ```
2. **MongoDB Mongoose Options**:
   ```javascript
   {
     isDeleted: { type: Boolean, default: false },
     deletedAt: { type: Date, default: null },
     deletedBy: { type: String, default: null }
   },
   { timestamps: true }
   ```

---

> [!NOTE]
> **Tình trạng h-dexuat-0001.md**: Đã phát lệnh `h-thống nhất` và thực thi thành công 100% (Chi tiết lưu tại [`docs/results/h-result-0001.md`](docs/results/h-result-0001.md)).
