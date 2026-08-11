# 🔐 Quy Tắc Thiết Kế Feature: HuKi ID & Identity Service (`huki-auth-service`)

> **Đặc tả kỹ thuật chuyên sâu cấp Senior System Architect cho Phân Hệ Đăng Nhập Tập Trung (SSO) & Xác Thực Sinh Trắc Học KYC.**
> **Tác giả**: Huỳnh Gia Huy (`Huy`) | **HK Team**
> **Mã Service**: `huki-auth-service` | **Base Route**: `/api/v1/auth`

---

## 🏛️ 1. PHẠM VI NGHIỆP VỤ & ĐỊNH VỊ KIẾN TRÚC

- **Chức năng chính**: 
  - Đăng nhập tập trung (SSO) cấp Access Token (JWT 15 phút) & Refresh Token (7 ngày).
  - Xác thực sinh trắc học KYC (CCCD, Hộ chiếu, Giấy phép lái xe GPLX).
  - Tích hợp OAuth 2.0 (Google, Apple ID) & Xác thực OTP SMS.
  - Phân quyền RBAC (`CUSTOMER`, `HOST`, `BUS_OPERATOR`, `ADMIN`).
- **Database chỉ định**: **PostgreSQL** (`users`, `user_profiles_kyc`, `user_tokens`) qua Prisma Driver Adapter (ACID Strict).

---

## 🗄️ 2. ĐẶC TẢ SCHEMA CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

```prisma
// Prisma Schema Definition for HuKi ID
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  phone_number  String?   @unique
  password_hash String
  full_name     String
  role          UserRole  @default(CUSTOMER)
  status        UserStatus @default(ACTIVE)
  is_verified   Boolean   @default(false)

  // Audit Fields
  is_deleted    Boolean   @default(false)
  deleted_at    DateTime?
  created_at    DateTime  @default(now())
  updated_at    DateTime  @updatedAt

  kyc_profile   UserProfileKYC?
  tokens        UserToken[]

  @@map("users")
}

model UserProfileKYC {
  id                     String    @id @default(uuid())
  user_id                String    @unique
  identity_card_number   String?   // CCCD / CMND
  passport_number        String?   // Hộ chiếu
  driver_license_number  String?   // GPLX (Bắt buộc khi thuê xe HuKi Ride)
  driver_license_class   String?   // A1, A2, B1, B2
  kyc_status             KYCStatus @default(UNVERIFIED)
  identity_image_front   String?
  identity_image_back    String?
  driver_license_image   String?

  user                   User      @relation(fields: [user_id], references: [id], onDelete: Cascade)
  @@map("user_profiles_kyc")
}

enum UserRole {
  CUSTOMER
  HOST
  BUS_OPERATOR
  ADMIN
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  BANNED
}

enum KYCStatus {
  UNVERIFIED
  PENDING
  VERIFIED
  REJECTED
}
```

---

## 📡 3. RESTFUL API ENDPOINTS & CONTRACTS

| Phương thức | Endpoint Path | Chức năng | Phân quyền |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Đăng ký tài khoản người dùng mới | Public |
| `POST` | `/api/v1/auth/login` | Đăng nhập cấp JWT Access & Refresh Token | Public |
| `POST` | `/api/v1/auth/refresh` | Làm mới Access Token bằng Refresh Token | Public |
| `GET` | `/api/v1/auth/me` | Lấy thông tin tài khoản & trạng thái KYC | User Authenticated |
| `POST` | `/api/v1/auth/kyc/submit` | Gửi giấy tờ KYC (CCCD, GPLX, Hộ chiếu) | User Authenticated |
| `PUT` | `/api/v1/auth/kyc/verify` | Duyệt / Từ chối hồ sơ KYC | Admin Only |

---

## ⚙️ 4. QUY TẮC XỬ LÝ EDGE CASES & BẢO MẬT (SECURITY & EDGE CASES)

1. **Khóa GPLX khi Thuê Xe (HuKi Ride Enforcement Gate)**:
   - Khi người dùng gọi API đặt xe `/api/v1/huki/rides/book`, Gateway hoặc Auth Middleware phải kiểm tra `kyc_profile.kyc_status === 'VERIFIED'` và `driver_license_number !== null`.
   - Nếu chưa KYC GPLX $\rightarrow$ Chặn tiến trình, trả về error code `KYC_DRIVER_LICENSE_REQUIRED` kèm link mở Popup KYC.
2. **Chống Brute-Force & Rate Limiting**:
   - Sử dụng Redis Token Bucket giới hạn tối đa **5 lần thử đăng nhập thất bại trong 15 phút** cho mỗi IP / Email. Sau 5 lần $\rightarrow$ Khóa tài khoản tạm thời 30 phút.
3. **Mã Hóa Mật Khẩu**: Sử dụng `bcrypt` với salt rounds $\ge 12$.
