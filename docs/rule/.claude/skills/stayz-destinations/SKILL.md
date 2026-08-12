---
name: stayz-destinations
description: Quản lý 12 quốc gia điểm đến StayZ (Vietnam, Indonesia, Japan, Thailand, Singapore, South Korea, Malaysia, Philippines, Cambodia, Myanmar, China, Australia). Seed format, schema validation, slug convention, foods/activities sub-schemas, 5-language i18n fields.
license: MIT
metadata:
  author: StayZ
  version: "1.0.0"
---

# StayZ Destinations Management

Quy tắc quản lý 12 điểm đến quốc gia cho StayZ/HuKi Travel platform.

## Khi Nào Sử Dụng

- Thêm destination mới vào DB
- Seed destinations vào MongoDB Atlas
- Validate schema cho Destination collection
- Cập nhật foods/activities cho destination
- Tạo routes cho destination pages

## 12 Quốc Gia Chuẩn (CONSTITUTION)

```javascript
const DESTINATION_CONSTITUTION = [
  // TRONG NƯỚC (VIETNAM)
  { slug: "da-nang", name_vi: "ĐÀ NẴNG", country: "Việt Nam", flag: "vn", is_domestic: true },
  { slug: "da-lat", name_vi: "ĐÀ LẠT", country: "Việt Nam", flag: "vn", is_domestic: true },
  { slug: "phu-quoc", name_vi: "PHÚ QUỐC", country: "Việt Nam", flag: "vn", is_domestic: true },
  { slug: "ha-noi", name_vi: "HÀ NỘI", country: "Việt Nam", flag: "vn", is_domestic: true },

  // QUỐC TẾ (11)
  { slug: "bali", name_vi: "BALI", country: "Indonesia", flag: "id", is_domestic: false },
  { slug: "tokyo", name_vi: "TOKYO", country: "Nhật Bản", flag: "jp", is_domestic: false },
  { slug: "bangkok", name_vi: "BANGKOK", country: "Thái Lan", flag: "th", is_domestic: false },
  { slug: "singapore", name_vi: "SINGAPORE", country: "Singapore", flag: "sg", is_domestic: false },
  { slug: "seoul", name_vi: "SEOUL", country: "Hàn Quốc", flag: "kr", is_domestic: false },
  { slug: "kuala-lumpur", name_vi: "KUALA LUMPUR", country: "Malaysia", flag: "my", is_domestic: false },
  { slug: "manila", name_vi: "MANILA", country: "Philippines", flag: "ph", is_domestic: false },
  { slug: "siem-reap", name_vi: "SIEM REAP", country: "Cambodia", flag: "kh", is_domestic: false },
  { slug: "yangon", name_vi: "YANGON", country: "Myanmar", flag: "mm", is_domestic: false },
  { slug: "beijing", name_vi: "BẮC KINH", country: "Trung Quốc", flag: "cn", is_domestic: false },
  { slug: "sydney", name_vi: "SYDNEY", country: "Úc", flag: "au", is_domestic: false },
];
```

**Tổng: 16 điểm đến → 12 quốc gia**

## Schema Chuẩn (Multi-Language 5-Ngôn Ngữ)

Tất cả field text đều phải có 5 ngôn ngữ: vi, en, ko, ja, th

```javascript
// I18n String Schema
const I18nStringSchema = {
  vi: { type: String, required: true },  // 🇻🇳 Tiếng Việt (master key)
  en: { type: String, default: "" },     // 🇬🇧 English
  ko: { type: String, default: "" },     // 🇰🇷 한국어
  ja: { type: String, default: "" },     // 🇯🇵 日本語
  th: { type: String, default: "" },     // 🇹🇭 ไทย
};

// Destination Main Schema
const destinationSchema = {
  slug: { type: String, required: true, unique: true, index: true },
  name: I18nStringSchema,
  country: I18nStringSchema,
  is_domestic: { type: Boolean, default: true, index: true },
  rating: { type: Number, default: 4.9 },
  discount_badge: { type: String, default: "20%" },
  hero_image: { type: String, default: "" },
  gallery: [{ type: String }],
  summary: I18nStringSchema,
  description: I18nStringSchema,
  foods: [DestinationFoodSchema],        // 2 món ăn
  activities: [DestinationActivitySchema], // 2 hoạt động
  properties: [{ type: ObjectId, ref: "Property" }],
  is_active: { type: Boolean, default: true, index: true },
};
```

## Sub-Schemas (Foods & Activities)

```javascript
const DestinationFoodSchema = {
  slug: { type: String, required: true },
  title: I18nStringSchema,
  description: I18nStringSchema,
  image_url: { type: String, default: "" },
  price_range: { type: String, default: "" },
  recommended_spots: [I18nStringSchema],  // Gợi ý quán ngon
};

const DestinationActivitySchema = {
  slug: { type: String, required: true },
  title: I18nStringSchema,
  description: I18nStringSchema,
  image_url: { type: String, default: "" },
  category: {
    type: String,
    enum: ["nature", "culture", "entertainment", "checkin"],
    default: "checkin",
  },
  location_name: I18nStringSchema,
};
```

## Slug Conventions

**Quy tắc đặt slug:**
- ✅ **OK**: kebab-case, không dấu, chữ thường
  - `da-nang`, `ha-noi`, `phu-quoc`, `kuala-lumpur`, `siem-reap`
- ❌ **LỖI**: chữ hoa, có dấu, ký tự đặc biệt
  - `DaNang`, `đà-nẵng`, `ha_noi`

**Slug phải unique** → index true trong MongoDB

## Image Sources (Unsplash)

Tất cả hero_image phải dùng Unsplash với format:
```
https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=1600&q=85
```

**Quality settings:**
- Hero: `w=1600&q=85`
- Gallery: `w=1200&q=85`
- Card: `w=800&q=85`

## Seed Pattern (Mandatory)

Mỗi destination PHẢI có:
- ✅ 1 slug unique
- ✅ name i18n (5 ngôn ngữ)
- ✅ country i18n (5 ngôn ngữ)
- ✅ hero_image từ Unsplash
- ✅ gallery 2-3 ảnh
- ✅ summary i18n (1-2 câu ngắn)
- ✅ description i18n (2-3 câu dài)
- ✅ foods: tối thiểu 1 món, tối đa 2 món
- ✅ activities: tối thiểu 1 hoạt động, tối đa 2 hoạt động
- ✅ rating: 4.7 - 4.9
- ✅ discount_badge: "15%" - "50%"
- ✅ is_active: true

## Chạy Seed

```bash
cd platform
node src/seed_destinations.js
```

Output mong đợi:
```
Connecting to Primary MongoDB...
Connected to Primary MongoDB for Seeding!
Seeded HD destination: bali (BALI / BALI)
Seeded HD destination: tokyo (TOKYO / TOKYO)
...
Seeding Destinations HD & 5-Language completed 100%!
```

## Files Liên Quan

- **Model**: [platform/src/models/destinations.model.js](../../../platform/src/models/destinations.model.js)
- **Controller**: [platform/src/controllers/destinations.controller.js](../../../platform/src/controllers/destinations.controller.js)
- **Service**: [platform/src/services/destinations.service.js](../../../platform/src/services/destinations.service.js)
- **Seed**: [platform/src/seed_destinations.js](../../../platform/src/seed_destinations.js)
- **Route**: `/destinations/[slug]` trong web Next.js

## Validation Checklist

Trước khi commit destination mới:

- [ ] Slug unique, kebab-case
- [ ] 5 ngôn ngữ đầy đủ cho name, country, summary, description
- [ ] Hero image Unsplash + ít nhất 2 gallery images
- [ ] Ít nhất 1 food và 1 activity
- [ ] Food có price_range và recommended_spots
- [ ] Activity có location_name và category hợp lệ
- [ ] Rating 4.7-4.9, discount_badge hợp lý
- [ ] Test API: `GET /api/destinations?lang=vi`
- [ ] Hiển thị đúng trên web `localhost:3000`
- [ ] Test search dropdown có destination

## Lỗi Thường Gặp

### Lỗi 1: Thiếu ngôn ngữ
```javascript
// ❌ SAI
name: { vi: "TOKYO", en: "TOKYO" }

// ✅ ĐÚNG
name: { vi: "TOKYO", en: "TOKYO", ko: "도쿄", ja: "東京", th: "โตเกียว" }
```

### Lỗi 2: Slug trùng
```bash
Error: E11000 duplicate key error collection: destinations index: slug_1
```
→ Kiểm tra slug đã tồn tại chưa trước khi insert.

### Lỗi 3: Image không load
```javascript
// ❌ SAI - dùng placeholder.com
hero_image: "https://via.placeholder.com/1600x900"

// ✅ ĐÚNG - dùng Unsplash real
hero_image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85"
```

## Tại Sao Quan Trọng

- **DB Consistency**: 12 quốc gia phải đồng bộ giữa seed và frontend COUNTRIES array
- **i18n**: Mỗi destination phải hiển thị được 5 ngôn ngữ
- **SEO**: slug chuẩn giúp URL thân thiện (`/destinations/tokyo`)
- **Real Data**: Ảnh Unsplash thật, không placeholder