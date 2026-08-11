# 🗺️ Quy Tắc Thiết Kế Feature: HuKi Guide & Taste (`huki-guide-service`)

> **Đặc tả kỹ thuật chuyên sâu cấp Senior System Architect cho Phân Hệ Cẩm Nang Du Lịch, Ẩm Thực Đặc Sản & Điểm Sống Ảo Triệu View.**
> **Tác giả**: Huỳnh Gia Huy (`Huy`) | **HK Team**
> **Mã Service**: `huki-guide-service` | **Base Route**: `/api/v1/huki/guide`

---

## 🏛️ 1. PHẠM VI NGHIỆP VỤ & ĐỊNH VỊ KIẾN TRÚC

- **Chức năng chính**: 
  - Cẩm nang du lịch (Lịch trình mẫu 3N2Đ, 4N3Đ theo sở thích).
  - Bản đồ ẩm thực đặc sản địa phương (HuKi Taste) & Quán ngon nổi tiếng.
  - Địa điểm check-in sống ảo triệu view (HuKi Experience) phân loại chuẩn i18n 10 ngôn ngữ (`Thiên nhiên`, `Văn hóa`, `Giải trí`, `Sống ảo`).
  - Tự động bóc tách liên kết gợi ý vé máy bay/khách sạn/xe khách tương ứng trong nội dung bài viết.
- **Database chỉ định**: **MongoDB Atlas** (`guide_articles`, `taste_spots`, `experience_spots`).

---

## 🗄️ 2. ĐẶC TẢ SCHEMA CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

```json
// MongoDB Mongoose Schema: taste_spots
{
  "_id": "ObjectId('65j...')",
  "titleKey": "food_title_sydney", // "Đặc sản truyền thống Sydney" (Bảo tồn tên riêng địa danh gốc Sydney)
  "city": "sydney",
  "countryCode": "au",
  "category": "TASTE",
  "imageUrl": "https://cdn.huki.travel/taste/sydney-food.jpg",
  "rating": 4.9,
  "recommendedAddress": "Sydney Opera Harbour & Fish Market, Sydney, NSW",
  "location": {
    "type": "Point",
    "coordinates": [151.2153, -33.8568] // Longitude, Latitude 2DSphere Index
  },
  "linkedStayIds": ["HT-SYD-01", "HT-SYD-02"],
  "isDeleted": false
}
```

---

## 📡 3. RESTFUL API ENDPOINTS & CONTRACTS

| Phương thức | Endpoint Path | Chức năng | Phân quyền |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/huki/guide/destinations` | Lấy danh mục 12 quốc gia du lịch & 8 điểm đến hot | Public |
| `GET` | `/api/v1/huki/guide/taste` | Danh sách món ăn đặc sản địa phương (Bảo tồn tên gốc) | Public |
| `GET` | `/api/v1/huki/guide/experiences` | Danh sách điểm check-in sống ảo phân loại i18n | Public |
| `GET` | `/api/v1/huki/guide/articles/:slug` | Chi tiết bài viết cẩm nang tích hợp liên kết mua vé | Public |

---

## ⚙️ 4. QUY TẮC BẢO TỒN TÊN NGUYÊN BẢN ĐỊA DANH (PROPER NOUN PRESERVATION RULE)

1. **Quy Tắc Bảo Tồn Tên Gốc Địa Danh**:
   - Tên địa danh (như `Sydney`, `Tokyo`, `Đà Nẵng`, `New York`, `Bali`, `Phú Quốc`...) **giữ nguyên tên gốc**, KHÔNG dịch tên riêng địa danh sang tiếng khác.
   - Chỉ dịch tiêu đề/mô tả đi kèm:
     - Tiếng Việt: *Đặc sản truyền thống Sydney*
     - English: *Authentic local food of Sydney*
     - 한국어: *Sydney의 전통 특색 요리*
     - 日本語: *Sydneyの伝統名物料理*
