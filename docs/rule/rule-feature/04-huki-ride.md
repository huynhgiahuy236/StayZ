# 🚗 Quy Tắc Thiết Kế Feature: HuKi Ride Service (`huki-ride-service`)

> **Đặc tả kỹ thuật chuyên sâu cấp Senior System Architect cho Phân Hệ Thuê Xe Máy & Ô Tô Tự Lái Tích Hợp KYC GPLX.**
> **Tác giả**: Huỳnh Gia Huy (`Huy`) | **HK Team**
> **Mã Service**: `huki-ride-service` | **Base Route**: `/api/v1/huki/rides`

---

## 🏛️ 1. PHẠM VI NGHIỆP VỤ & ĐỊNH VỊ KIẾN TRÚC

- **Chức năng chính**: 
  - Thuê xe máy (xe ga, xe số) & Ô tô tự lái (4 chỗ, 7 chỗ, SUV, Electric).
  - Tự động giao xe tận nơi / khách sạn / sân bay.
  - Cổng kiểm tra bằng lái GPLX KYC trước khi cho phép xác nhận đơn.
  - Theo dõi trạng thái xe (Bảo dưỡng, Đang cho thuê, Sẵn sàng).
- **Database chỉ định**: **MongoDB Atlas** (`rides`, `vehicles`) + **PostgreSQL** (`user_profiles_kyc`).

---

## 🗄️ 2. ĐẶC TẢ SCHEMA CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

```json
// MongoDB Mongoose Schema: vehicles
{
  "_id": "ObjectId('65g...')",
  "vehicleType": "MOTORBIKE_SCOOTER", // MOTORBIKE_SCOOTER, MOTORBIKE_MANUAL, CAR_4SEAT, CAR_7SEAT
  "modelName": "Honda AirBlade 160cc 2026",
  "licensePlate": "43D1-987.65",
  "city": "da-nang",
  "dailyPrice": 180000,
  "depositRequired": 500000,
  "deliveryAvailable": true,
  "requiredLicenseClass": "A1", // A1 cho xe máy > 50cc, B2 cho ô tô
  "status": "AVAILABLE", // AVAILABLE, RENTED, MAINTENANCE
  "images": ["https://cdn.huki.travel/cars/airblade160.jpg"],
  "isDeleted": false
}
```

---

## 📡 3. RESTFUL API ENDPOINTS & CONTRACTS

| Phương thức | Endpoint Path | Chức năng | Phân quyền |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/huki/rides/vehicles` | Tìm xe khả dụng theo thành phố & loại xe | Public |
| `GET` | `/api/v1/huki/rides/vehicles/:id` | Xem chi tiết thông tin xe & chính sách cọc | Public |
| `POST` | `/api/v1/huki/rides/book` | Đặt thuê xe tự lái (Kiểm tra KYC GPLX) | User Authenticated |
| `PUT` | `/api/v1/huki/rides/status` | Cập nhật trạng thái nhận/trả xe | Partner / Admin |

---

## ⚙️ 4. QUY TẮC CỔNG KIỂM TRA BẰNG LÁI GPLX (GPLX KYC GATEWAY ENFORCEMENT)

1. **Ràng Buộc KYC GPLX Trực Tiếp**:
   - Khi nhận request `POST /book`:
     ```typescript
     const kycProfile = await prisma.userProfileKYC.findUnique({ where: { user_id: userId } });
     if (!kycProfile || kycProfile.kyc_status !== 'VERIFIED' || !kycProfile.driver_license_number) {
       return res.status(403).json({
         success: false,
         code: "KYC_DRIVER_LICENSE_REQUIRED",
         message: "Bạn cần cập nhật và xác thực Bằng lái xe (GPLX) trên HuKi ID trước khi thuê xe."
       });
     }
     ```
2. **Kiểm Tra Hạng Bằng Lái**:
   - Thuê xe ô tô 4-7 chỗ yêu cầu `kycProfile.driver_license_class` thuộc nhóm `B1`, `B2`, `C`, `D`. Nếu thuê ô tô bằng bằng A1 $\rightarrow$ Báo lỗi `INVALID_LICENSE_CLASS`.
