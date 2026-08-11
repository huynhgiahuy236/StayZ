# 🎟️ Quy Tắc Thiết Kế Feature: HuKi Pass Service (`huki-pass-service`)

> **Đặc tả kỹ thuật chuyên sâu cấp Senior System Architect cho Phân Hệ Ví Vé Điện Tử & Mã QR Code Động 30s Chống Vé Giả.**
> **Tác giả**: Huỳnh Gia Huy (`Huy`) | **HK Team**
> **Mã Service**: `huki-pass-service` | **Base Route**: `/api/v1/huki/pass`

---

## 🏛️ 1. PHẠM VI NGHIỆP VỤ & ĐỊNH VỊ KIẾN TRÚC

- **Chức năng chính**: 
  - Quản lý tất cả vé điện tử (Khách sạn, Vé xe khách 2 tầng, Vé công viên/Tour) thuộc sở hữu của tài khoản.
  - Cấp mã **QR Code Động (Dynamic TOTP Token)** tự động làm mới mỗi 30 giây.
  - Chống chụp màn hình (Anti-Screenshot) và chống bán vé lại trên mạng xã hội.
  - Quét mã QR offline bằng ứng dụng đối tác (Partner App Scanner).
- **Database chỉ định**: **MongoDB Atlas** (`huki_passes`).

---

## 🗄️ 2. ĐẶC TẢ SCHEMA CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

```json
// MongoDB Mongoose Schema: huki_passes
{
  "_id": "ObjectId('65i...')",
  "passCode": "HKP-2026-889911",
  "userId": "uuid-string-1234",
  "tripId": "ObjectId('65h...')",
  "serviceType": "BUS_SLEEPER", // BUS_SLEEPER, HOTEL_CHECKIN, TOUR_TICKET
  "itemTitle": "Vé Xe Khách 2 Tầng TP.HCM - Đà Lạt (Ghế A05)",
  "totpSecret": "JBSWY3DPEHPK3PXP", // Secret HMAC cho Dynamic QR
  "validFrom": "2026-08-15T23:00:00Z",
  "validUntil": "2026-08-16T06:00:00Z",
  "status": "ACTIVE", // ACTIVE, USED, EXPIRED, REVOKED
  "usedAt": null,
  "isDeleted": false
}
```

---

## 📡 3. RESTFUL API ENDPOINTS & CONTRACTS

| Phương thức | Endpoint Path | Chức năng | Phân quyền |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/huki/pass/my-passes` | Lấy danh sách ví vé điện tử của người dùng | User Authenticated |
| `GET` | `/api/v1/huki/pass/:id/qr-token` | Lấy mã Dynamic TOTP Token mới nhất (Đổi 30s/lần) | User Authenticated |
| `POST` | `/api/v1/huki/pass/scan-verify` | Đối tác / Nhà xe quét mã QR xác nhận nhận vé | Partner / Operator |

---

## ⚙️ 4. QUY TẮC MÃ QR CODE ĐỘNG & CHỐNG GIẢ MẠO (DYNAMIC TOTP ENFORCEMENT)

1. **Thuật Toán Sinh QR Dynamic TOTP**:
   - Client gọi `/qr-token` mỗi 30s. Server sinh chuỗi mã hóa HMAC-SHA256 kết hợp giữa `totpSecret` + `timestamp / 30`.
   - Đối tác quét mã bằng Partner App Scanner. Scanner kiểm tra chuỗi token hợp lệ trong khung thời gian $\pm 1$ bước (window 30s) để bù độ trễ mạng.
2. **Chống Chụp Mảnh Màn Hình (Anti-Screenshot Guard)**:
   - Trên Mobile App (Flutter/React Native), kích hoạt thuộc tính `FLAG_SECURE` (Android) và `preventScreenCapture` (iOS) khi người dùng mở màn hình Ví vé HuKi Pass.
