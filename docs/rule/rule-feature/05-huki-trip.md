# 🧳 Quy Tắc Thiết Kế Feature: HuKi Trip Service (`huki-trip-service`)

> **Đặc tả kỹ thuật chuyên sâu cấp Senior System Architect cho Phân Hệ Giỏ Hàng Chuyến Đi Combo Đa Dịch Vụ & Bộ Đếm Giữ Chỗ Tập Trung.**
> **Tác giả**: Huỳnh Gia Huy (`Huy`) | **HK Team**
> **Mã Service**: `huki-trip-service` | **Base Route**: `/api/v1/huki/trips`

---

## 🏛️ 1. PHẠM VI NGHIỆP VỤ & ĐỊNH VỊ KIẾN TRÚC

- **Chức năng chính**: 
  - Gom từ 2 dịch vụ trở lên (Flight + Hotel + Bus + Ride) vào 1 Giỏ hàng Chuyến đi duy nhất (`HuKi Trip`).
  - Động cơ tính giảm giá Combo tự động **10% trên tổng giá trị**.
  - Trình đếm ngược giữ chỗ tập trung (**Global Countdown Timer 10-15 phút**).
  - Thuật toán **Saga Pattern (Compensating Transactions)** xử lý giao dịch đền bù nếu 1 dịch vụ trong combo thất bại.
- **Database chỉ định**: **MongoDB Atlas** (`trips`) + **Redis Cluster** (`Global Hold Timer`).

---

## 🗄️ 2. ĐẶC TẢ SCHEMA CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

```json
// MongoDB Mongoose Schema: trips
{
  "_id": "ObjectId('65h...')",
  "userId": "uuid-string-1234",
  "tripName": "Hành trình Khám Phá Đà Lạt 3N2Đ",
  "status": "HOLDING", // HOLDING, CONFIRMED, CANCELLED, EXPIRED
  "holdExpiresAt": "2026-08-11T12:15:00Z",
  "totalAmount": 5200000,
  "discountAmount": 520000, // Chiết khấu 10% Combo
  "finalAmount": 4680000,
  "items": [
    {
      "itemType": "FLIGHT",
      "supplierRef": "VN-1234",
      "price": 1800000,
      "details": { "flightNumber": "VJ362", "seatNumber": "12A" }
    },
    {
      "itemType": "HOTEL",
      "supplierRef": "HT-8899",
      "price": 2400000,
      "details": { "hotelName": "Colline Hotel Dalat", "roomType": "Deluxe" }
    },
    {
      "itemType": "RIDE",
      "supplierRef": "RD-5522",
      "price": 1000000,
      "details": { "vehicleType": "MOTORBIKE_SCOOTER", "model": "Honda AirBlade 160" }
    }
  ],
  "isDeleted": false,
  "createdAt": "2026-08-11T12:05:00Z"
}
```

---

## 📡 3. RESTFUL API ENDPOINTS & CONTRACTS

| Phương thức | Endpoint Path | Chức năng | Phân quyền |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/huki/trips/my-trips` | Lấy danh sách giỏ hàng chuyến đi của tôi | User Authenticated |
| `POST` | `/api/v1/huki/trips/create-combo` | Gom các item vào 1 Trip Combo (Tự động trừ 10%) | User Authenticated |
| `POST` | `/api/v1/huki/trips/:id/checkout` | Thanh toán Chuyến đi Combo | User Authenticated |
| `DELETE` | `/api/v1/huki/trips/:id/cancel` | Hủy chuyến đi & kích hoạt Compensating Saga | User Authenticated |

---

## ⚙️ 4. QUY TẮC SAGA PATTERN & TỰ ĐỘNG ĐỀN BÙ (COMPENSATING TRANSACTIONS)

1. **Thuật Toán Saga Pattern Khi Đặt Combo**:
   - Bước 1: Khóa chỗ `Flight Service` $\rightarrow$ OK.
   - Bước 2: Khóa chỗ `Stay Service` $\rightarrow$ OK.
   - Bước 3: Khóa ghế `Bus Service` $\rightarrow$ **THẤT BẠI (Hết chỗ)**.
   - **Xử lý đền bù (Compensating Transaction)**: Lập tức gửi gRPC / Event RabbitMQ hủy lệnh khóa chỗ tại `Stay Service` và `Flight Service`, hoàn trả trạng thái ban đầu cho người dùng không tốn phí.
2. **Global Hold Timer Expiry Notification**:
   - Khi Redis Key `trip:hold:{tripId}` hết hạn $\rightarrow$ Event `TripHoldExpired` được phát qua RabbitMQ để giải phóng phòng/ghế của toàn bộ items trong trip.
