# HuKi Travel Ecosystem - Multi-Language i18n & AI Translation Specification

> **Document Type**: Production Technical Specification & AI Agent Translation Blueprint  
> **Target File**: `docs/db/promt.i18n.md`  
> **Author**: Huỳnh Gia Huy (`Huy`) | HK Team  
> **Role**: Senior Database Architect & i18n Asset Pipeline Engineer  
> **Status**: APPROVED PRODUCTION SPECIFICATION  
> **Supported Languages (10 Global Languages)**: `vi` (Gốc/Tiếng Việt), `en` (English), `ko` (한국어), `ja` (日本語), `th` (ไทย), `zh` (中文 - 简体), `fr` (Français), `de` (Deutsch), `es` (Español), `ru` (Русский)

---

## 1. KIẾN TRÚC VÀ PIPELINE BIÊN DỊCH DỮ LIỆU DA NGÔN NGỮ (I18N ARCHITECTURE)

Hệ sinh thái HuKi Travel áp dụng mô hình **Hai Tầng Biên Dịch Đa Ngôn Ngữ Tách Biệt (Decoupled Dual-Layer i18n Architecture)** để đảm bảo tốc độ render giao diện client $\le 100\text{ms}$ và khả năng mở rộng CSDL lên hàng triệu bản ghi.

```mermaid
graph TD
    UserLang["1. User Selects Language<br/>(VI, EN, KO, JA, TH, ZH, FR, DE, ES, RU)"] --> Persistence["2. Persist Preference<br/>(localStorage: stayz_lang & Cookie: stayz_lang)"]
    
    subgraph UI_Layer ["Tầng 1: Static UI Translation (web/src/lib/i18n.ts)"]
        Dictionary["3. Dictionary Key Lookup<br/>t('nav_stays', lang)"] --> RenderUI["4. Render UI Components<br/>(Buttons, Headers, Tabs, Modals)"]
    
    subgraph DB_Layer ["Tầng 2: Dynamic DB Entity Translation (MongoDB/Postgres)"]
        SchemaCheck["5. Query Entity Document<br/>(Hotels, Foods, Destinations, Bus Routes)"] --> FallbackEngine["6. i18n Subdocument Resolution<br/>entity.name[lang] || entity.name['en'] || entity.name['vi']"]
        FallbackEngine --> RenderDB["7. Render Dynamic Content<br/>(Hotel Descriptions, Room Names, Food Reviews)"]
    
    UserLang --> UI_Layer
    UserLang --> DB_Layer
```

---

## 2. QUY TẮC BẮT BUỘC KHI BIÊN DỊCH (CRITICAL INVARIANT RULES)

Khi AI Agent / Crawler / Translator thực hiện biên dịch dữ liệu từ Tiếng Việt (`vi`) hoặc Tiếng Anh (`en`) sang các ngôn ngữ khác, BẮT BUỘC tuân thủ 5 Quy Tắc Vàng sau:

### 🚫 Quy tắc 1: Bảo Tồn Danh Từ Riêng & Địa Danh (Proper Nouns Invariant Rule)
- **Tên Thành Phố & Địa Danh**: **KHÔNG ĐƯỢC DỊCH THÔ** tên các thành phố, điểm du lịch sang từ lóng/từ vô nghĩa.
  - *Đúng*: `Đà Nẵng`, `Hà Nội`, `TP. Hồ Chí Minh`, `Phú Quốc`, `Tokyo`, `Seoul`, `New York`, `Bali`, `Paris`, `Barcelona`.
  - *Sai*: Dịch "Đà Nẵng" thành "Da Nang City" trong tiếng Pháp/Đức nếu gây biến dạng chuỗi tìm kiếm CSDL.
- **Tên Thương Hiệu**: Giữ nguyên `HuKi Travel`, `HuKi Pick`, `HuKi Wallet`, `StayZ`, `VIP Limousine`.

### 💲 Quy tắc 2: Chuẩn Hóa Định Dạng Tiền Tệ & Con Số (Currency & Number Standard)
- Giữ nguyên các biến nội suy trong ngoặc nhọn `{count}`, `{price}`, `{percent}`, `{days}`.
- Chuyển đổi định dạng dấu phân cách số theo chuẩn quốc gia:
  - `vi`: `1.200.000 ₫`
  - `en`: `$48 USD`
  - `ko`: `₩65,000`
  - `ja`: `¥7,200`
  - `zh`: `¥340`

### 🗣️ Quy tắc 3: Văn Phong Chuẩn Ứng Dụng Du Lịch Quốc Tế (Native Travel Tone)
- Câu từ phải sử dụng thuật ngữ chuyên ngành Du Lịch / Khách Sạn (Hospitality & Travel Tech) giống như Agoda, Booking.com, Airbnb.
- Tránh dịch từng từ một (Word-by-word / Literal translation). Sử dụng văn phong mượt mà tự nhiên của người bản xứ (Native Fluency).

### 🔍 Quy tắc 4: Giữ Nguyên Từ Khóa Tìm Kiếm CSDL (Search Keyword Preservation)
- Trường `search_keywords` trong MongoDB BẮT BUỘC chứa cả tên gốc không dấu và có dấu của địa danh để hỗ trợ ô tìm kiếm SearchBar hoạt động 100% chính xác.

---

## 3. PROMPT MẪU CHUYÊN DỤNG CHO AI AGENT / BIÊN DỊCH VIÊN (MASTER PROMPT SPEC)

Sử dụng PROMPT dưới đây để gọi AI (Gemini / GPT / Claude) mỗi khi cần biên dịch một Entity CSDL hoặc một tập hợp Dictionary Keys mới:

```text
================================================================================
SYSTEM PROMPT: HUKI TRAVEL MASTER I18N TRANSLATOR AGENT
================================================================================
You are the Senior i18n Localization Engine for HuKi Travel Ecosystem.
Your task is to translate input travel data from Source Language (Vietnamese 'vi' or English 'en') into exactly 10 Target Languages:
1. vi  (Vietnamese - Primary Gốc)
2. en  (English - Global Standard)
3. ko  (Korean - 한국어)
4. ja  (Japanese - 日本語)
5. th  (Thai - ไทย)
6. zh  (Chinese Simplified - 中文简体)
7. fr  (French - Français)
8. de  (German - Deutsch)
9. es  (Spanish - Español)
10. ru (Russian - Русский)

INSTRUCTIONS:
1. Preserve all proper nouns (e.g. Đà Nẵng, Tokyo, Seoul, New York, HuKi Travel, StayZ) invariant across all target languages.
2. Maintain exact tone of high-end travel booking platforms (Booking.com / Agoda / Airbnb).
3. Do not alter any dynamic variables such as {count}, {price}, {percent}, or HTML tags.
4. Output MUST BE 100% VALID JSON conforming strictly to the requested schema.

INPUT DATA:
{
  "entity_type": "hotel_description",
  "source_text_vi": "Resort nghỉ dưỡng 5 sao đẳng cấp quốc tế nằm ven biển Đà Nẵng với đầy đủ tiện ích hồ bơi vô cực, spa chăm sóc sức khỏe và phục vụ ẩm thực cao cấp."
}

REQUIRED OUTPUT FORMAT (JSON ONLY):
{
  "vi": "Resort nghỉ dưỡng 5 sao đẳng cấp quốc tế nằm ven biển Đà Nẵng với đầy đủ tiện ích hồ bơi vô cực, spa chăm sóc sức khỏe và phục vụ ẩm thực cao cấp.",
  "en": "International 5-star luxury beachfront resort in Da Nang featuring an infinity pool, wellness spa, and gourmet fine dining.",
  "ko": "다낭 해변에 위치한 인피니티 풀, 웰니스 스파, 파인 다이닝을 갖춘 세계적인 5성급 럭셔리 리조트입니다.",
  "ja": "ダナンの ビーチフロントに位置する、インフィニティプール、ウェルネススパ、ファインダイニングを備えた国際的な5つ星ラグジュアリーリゾート。",
  "th": "รีสอร์ทหรูระดับ 5 ดาวริมหาดดานัง พร้อมสระว่ายน้ำไร้ขอบ สปาเพื่อสุขภาพ และห้องอาหารชั้นเลิศ",
  "zh": "位于岘港海滨的国际五星级奢华度假村，配备无边泳池、水疗中心及高级精细餐饮。",
  "fr": "Resort de luxe 5 étoiles en bord de mer à Da Nang, doté d'une piscine à débordement, d'un spa bien-être et d'une cuisine gastronomique.",
  "de": "Internationales 5-Sterne-Luxus-Resort am Strand von Da Nang mit Infinity-Pool, Wellness-Spa und erstklassiger Gastronomie.",
  "es": "Resort de lujo de 5 estrellas frente al mar en Da Nang, con piscina de borde infinito, spa de bienestar y gastronomía de alto nivel.",
  "ru": "Международный 5-звездочный роскошный курорт на первой линии в Дананге с панорамным бассейном, спа-центром и изысканной кухней."
}
================================================================================
```

---

## 4. SCHEMA CƠ SỞ DỮ LIỆU CHUYÊN DỤNG CHỨA CHỮ ĐÃ BIÊN DỊCH (`translations` COLLECTION)

Để giữ cho CSDL chính (`properties`, `destinations`, `foods`, `experiences`) luôn nhẹ gọn, không bị phình to dung lượng, toàn bộ chữ đã được biên dịch sẽ được **TẬP TRUNG LƯU TRỮ VÀO MỘT COLLECTION DÀNH RIÊNG** có tên là `translations` trong MongoDB (hoặc bảng `i18n_translations` trong PostgreSQL):

```typescript
// Mongoose / MongoDB Dedicated Translation Collection Schema
interface TranslationRecord {
  _id: string;
  translation_key: string; // Dynamic Unique Key, e.g. "hotel_muongthanh_desc", "food_buncha_title"
  entity_type: "hotel" | "destination" | "food" | "experience" | "bus_route" | "ui_label";
  entity_id: string; // Foreign Key reference (e.g. hotel_id, destination_id)
  field_name: "name" | "description" | "address" | "amenity" | "review";
  
  // 10 Global Languages Object Container
  translations: {
    vi: string; // Tiếng Việt (Gốc)
    en: string; // English
    ko: string; // 한국어
    ja: string; // 日本語
    th: string; // ไทย
    zh: string; // 中文 (简体)
    fr: string; // Français
    de: string; // Deutsch
    es: string; // Español
    ru: string; // Русский
  };
  
  status: "verified" | "ai_generated" | "pending_review";
  updated_at: Date;
}
```

### 💡 Ưu Điểm Đắt Giá Của Mô Hình DB Chứa Chữ Biên Dịch Biệt Lập (`translations` Collection):
1. **Bảo toàn CSDL Gốc 100%**: Các bảng chính (`properties`, `destinations`) chỉ cần giữ chuỗi gốc và `translation_key`. Không bị nặng dung lượng.
2. **Cập Nhập Độc Lập Cho AI Agent**: AI Agent / Crawler cào và dịch chỉ cần ghi thẳng kết quả vào duy nhất 1 Collection `translations` mà không bao giờ sợ làm hỏng cấu trúc dữ liệu chính.
3. **Cache & Export Siêu Tốc**: Dễ dàng Export toàn bộ Collection `translations` thành file `.json` tĩnh để nạp trực tiếp vào CDN/Redis Cache giúp tốc độ load UI $< 50\text{ms}$!

---

## 5. QUY CHUẨN AUDIT VÀ QUÉT BỔ SUNG TRONG 10 TẬP TIN DICTIONARY REPOSITORY (`web/src/lib/i18n/*.ts`)

Từ điển giao diện tĩnh (Static UI Dictionary) được phân tách thành 10 tập tin độc lập theo ngôn ngữ tại `web/src/lib/i18n/*.ts`:
1. `web/src/lib/i18n/vi.ts` (Tiếng Việt - Gốc)
2. `web/src/lib/i18n/en.ts` (English)
3. `web/src/lib/i18n/ko.ts` (한국어)
4. `web/src/lib/i18n/ja.ts` (日本語)
5. `web/src/lib/i18n/th.ts` (ไทย)
6. `web/src/lib/i18n/zh.ts` (中文 - 简体)
7. `web/src/lib/i18n/fr.ts` (Français)
8. `web/src/lib/i18n/de.ts` (Deutsch)
9. `web/src/lib/i18n/es.ts` (Español)
10. `web/src/lib/i18n/ru.ts` (Русский)

### 📋 Cấu Trúc Comment Nhóm Theo Trang (Page-Level Comment Organization):
Mỗi file trong 10 tập tin trên đều chứa các khối comment phân định trang/khu vực minh bạch:
- `// ── 1. PAGE: NAVIGATION & HEADER`
- `// ── 2. PAGE: HERO BANNER & SEARCH BAR`
- `// ── 3. PAGE: HOMEPAGE WIDGETS (COMBO, BUS, SPLIT BILL)`
- `// ── 4. PAGE: SECTIONS (COUNTRIES, DESTINATIONS, HOTELS, TASTE, EXP)`
- `// ── 5. PAGE: CATEGORIES & FILTER BUTTONS`
- `// ── 6. PAGE: AUTH, LOGIN, REGISTER & VALIDATION ERRORS`
- `// ── 7. PAGE: BOOKING, HOTELS DETAIL, ADMIN & TOAST ALERTS`
- `// ── 8. PAGE: FOOTER`

### 🤖 CÚ PHÁP LỆNH CHO AI AGENT / CRAWLER KHI QUÉT 10 FILE NGÔN NGỮ:
Khi được chỉ thị quét biên dịch bổ sung, AI Agent BẮT BUỘC thực hiện quy trình 3 bước:
1. **Đọc tập tin gốc `vi.ts` (hoặc `en.ts`)**: Lấy danh sách toàn bộ các key hiện có theo từng khối Comment Page.
2. **So sánh với 9 tập tin ngôn ngữ còn lại (`ko.ts`, `ja.ts`, `th.ts`...)**: Phát hiện các key còn thiếu hoặc bị đè fallback.
3. **Biên dịch bổ sung**: Tự động gọi **Master Prompt (Mục 3)** để biên dịch chính xác 100% key còn thiếu và ghi trực tiếp vào từng khối Comment Page của file tương ứng!

---

> [!TIP]
> Lưu trữ tài liệu này tại **[`docs/db/promt.i18n.md`](docs/db/promt.i18n.md)**. Mỗi khi hệ thống cần biên dịch hoặc AI Agent cần cào dữ liệu mới, hãy dẫn chiếu tài liệu này làm **QUY CHUẨN THỰC THI GỐC (PRODUCTION SPEC)**.
