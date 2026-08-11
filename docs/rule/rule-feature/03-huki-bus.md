# 🚌 Quy Tắc Thiết Kế Feature: HuKi Bus Service (`huki-bus-service`)

> **Đặc tả kỹ thuật chuyên sâu cấp Senior System Architect cho Phân Hệ Vé Xe Khách Giường Nằm 2 Tầng Real-Time.**
> **Tác giả**: Huỳnh Gia Huy (`Huy`) | **HK Team**
> **Mã Service**: `huki-bus-service` | **Base Route**: `/api/v1/huki/bus`

---

## 🏛️ 1. PHẠM VI NGHIỆP VỤ & ĐỊNH VỊ KIẾN TRÚC

- **Chức năng chính**: 
  - Đặt vé xe khách giường nằm 2 tầng (Sleeper Bus 2-Deck: Tầng 1 / Tầng 2).
  - Quản lý sơ đồ ghế `seatMap` thời gian thực qua WebSocket.
  - Tự động khóa tạm thời vị trí ghế (10 phút) bằng Redis Redlock khi có khách đang bấm chọn.
  - Quản lý điểm đón / điểm trả trên hành trình.
- **Database chỉ định**: **MongoDB Atlas** (`bus_trips`, `bus_operators`) + **Redis Cluster** (Seat Lock).

---

## 🗄️ 2. ĐẶC TẢ SCHEMA CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

```json
// MongoDB Mongoose Schema: bus_trips
{
  "_id": "ObjectId('65f...')",
  "busOperator": "Phương Trang - FUTA Bus Lines",
  "busType": "SLEEPER_2_TIER",
  "totalSeats": 36,
  "route": {
    "fromCity": "TP. Hồ Chí Minh",
    "toCity": "Đà Lạt",
    "pickupPoints": ["Bến xe Miền Đông", "Hàng Xanh"],
    "dropoffPoints": ["Bến xe Đà Lạt", "Nội thành Đà Lạt"]
  },
  "departureTime": "2026-08-15T23:00:00Z",
  "arrivalTime": "2026-08-16T05:30:00Z",
  "price": 320000,
  "seatMap": [
    { "seatNo": "A01", "deck": 1, "status": "BOOKED", "lockedByUserId": "user-999" },
    { "seatNo": "A02", "deck": 1, "status": "AVAILABLE", "lockedByUserId": null },
    { "seatNo": "B01", "deck": 2, "status": "LOCKED", "lockedByUserId": "user-888", "lockExpiresAt": "2026-08-11T12:15:00Z" }
  ],
  "isDeleted": false,
  "createdAt": "2026-08-11T10:00:00Z"
}
```

---

## 📡 3. RESTFUL & WEBSOCKET CONTRACTS

| Giao thức | Endpoint Path / Event | Chức năng | Phân quyền |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/huki/bus/trips` | Tìm chuyến xe theo ngày, điểm đi, điểm đến | Public |
| `GET` | `/api/v1/huki/bus/trips/:id/seats` | Lấy sơ đồ ghế real-time của chuyến xe | Public |
| `POST` | `/api/v1/huki/bus/lock-seat` | Khóa tạm thời vị trí ghế (Hold 10m) | User Authenticated |
| `WS` | `ws://gateway/huki-bus-live` | Event `seat_status_changed` cập nhật real-time | Public Listener |

---

## ⚙️ 4. CƠ CHẾ CHỐNG ĐẶT TRÙNG GHẾ (REDIS REDLOCK & WEBSOCKET)

1. **Khóa Ghế Tạm Thời (10-Minute Seat Lock)**:
   - Khi người dùng click chọn vị trí ghế `A05`, client gửi request `POST /lock-seat`.
   - Backend thực thi lệnh Redis Distributed Lock:
     ```bash
     SET bus:lock:{tripId}:{seatNo} {userId} NX PX 600000
     ```
   - Nếu Redis trả về `OK` $\rightarrow$ Ghế được giữ chỗ cho `userId` trong 10 phút. Cập nhật `seatMap` trong MongoDB thành `status: 'LOCKED'`.
   - Phát sóng WebSocket Event `seat_status_changed` báo cho tất cả clients khác đổi màu ghế sang **Màu Vàng (Đang giữ chỗ)**.
2. **Hết Hạn Giữ Chỗ (Hold Expiry)**:
   - Nếu hết 10 phút người dùng không thanh toán, Redis Key tự động hết hạn (`Expired`). Redis Key Space Notification kích hoạt cập nhật status về `AVAILABLE`.
