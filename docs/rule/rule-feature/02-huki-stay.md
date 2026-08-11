# 🏨 Quy Tắc Thiết Kế Feature: HuKi Stay Service (`huki-stay-service`)

> **Đặc tả kỹ thuật chuyên sâu cấp Senior System Architect cho Phân Hệ Đặt Phòng Khách Sạn, Villa & Resort Hạng Sang.**
> **Tác giả**: Huỳnh Gia Huy (`Huy`) | **HK Team**
> **Mã Service**: `huki-stay-service` | **Base Route**: `/api/v1/properties`

---

## 🏛️ 1. PHẠM VI NGHIỆP VỤ & ĐỊNH VỊ KIẾN TRÚC

- **Chức năng chính**: 
  - Quản lý danh mục Khách sạn, Villa, Resort, Căn hộ dịch vụ.
  - Quản lý tồn kho phòng `room_inventory` theo từng ngày.
  - Tìm kiếm bán kính tọa độ GPS (Spatial Index), tìm theo thành phố, giá tiền, số lượng khách, số sao.
  - Xử lý đặt phòng với giao dịch tài chính strict ACID.
- **Database chỉ định**: **PostgreSQL** (`hotels`, `rooms`, `room_inventory`, `hotel_bookings`) qua Prisma Driver Adapter.

---

## 🗄️ 2. ĐẶC TẢ SCHEMA CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

```prisma
model Hotel {
  id              String   @id @default(uuid())
  name            String
  slug            String   @unique
  city            String   // da-nang, da-lat, ha-noi...
  address         String
  star_rating     Float    @default(5.0)
  latitude        Float    // GiST Spatial Index
  longitude       Float
  price_from      Float
  amenities       String[] // JSON Array tiện ích
  cover_image     String
  is_active       Boolean  @default(true)

  // Audit Fields
  is_deleted      Boolean  @default(false)
  created_at      DateTime @default(now())

  rooms           Room[]
  @@map("hotels")
}

model Room {
  id              String   @id @default(uuid())
  hotel_id        String
  room_type       String   // Deluxe, Suite, Presidential...
  max_guests      Int      @default(2)
  base_price      Float

  hotel           Hotel    @relation(fields: [hotel_id], references: [id], onDelete: Cascade)
  inventories     RoomInventory[]
  @@map("rooms")
}

model RoomInventory {
  id              BigInt   @id @default(autoincrement())
  room_id         String
  date            DateTime @db.Date
  total_available Int      @default(10)
  reserved_count  Int      @default(0)
  price_override  Float?

  room            Room     @relation(fields: [room_id], references: [id], onDelete: Cascade)

  @@unique([room_id, date]) // Composite Constraint ngăn trùng ngày tồn kho
  @@map("room_inventory")
}
```

---

## 📡 3. RESTFUL API ENDPOINTS & CONTRACTS

| Phương thức | Endpoint Path | Chức năng | Phân quyền |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/properties` | Tìm kiếm danh sách khách sạn kèm bộ lọc | Public |
| `GET` | `/api/v1/properties/:id` | Xem chi tiết thông tin khách sạn & danh sách phòng | Public |
| `POST` | `/api/v1/properties/check-availability` | Kiểm tra tồn kho phòng khả dụng theo ngày checkin/checkout | Public |
| `POST` | `/api/v1/properties/book` | Thực hiện giữ chỗ / đặt phòng | User Authenticated |

---

## ⚙️ 4. QUY TẮC TỐI ƯU HIỆU NĂNG & CHỐNG THẤT THOÁT TỒN KHO

1. **Giữ Chỗ Tồn Kho (ACID Atomic Decrement)**:
   - Khi khách đặt phòng từ ngày A đến ngày B, câu lệnh SQL cập nhật tồn kho phải thực hiện atomic:
     ```sql
     UPDATE room_inventory 
     SET reserved_count = reserved_count + 1 
     WHERE room_id = $1 AND date >= $2 AND date < $3 AND (total_available - reserved_count) >= 1;
     ```
   - Nếu số hàng bị ảnh hưởng $< \text{số ngày đặt}$, lập tức rollback transaction và báo lỗi `ROOM_FULL_FOR_SELECTED_DATES`.
2. **Caching Strategy (Redis)**:
   - Cache chi tiết Khách sạn master data trong 24 giờ (`hotel:detail:{id}`).
   - Cache kết quả tìm kiếm danh mục trong 5 phút (`hotel:search:{city}:{hash}`).
