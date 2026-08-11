# Mã Đề Xuất: h-dexuat-0003
**Dự án**: StayZ / HuKi Travel Web Frontend (`web/`)
**Tiêu đề**: Kế Hoạch Đồng Nhất Ngôn Ngữ Toàn Bộ Phiên Bản Web Application (Standardization & i18n Localization Engine Across All Web Pages: Header, Search, Hotels, Booking, Profile, Admin & Footer)
**Tác giả**: Huỳnh Gia Huy (`Huy`)
**Trạng thái**: ĐANG CHỜ THỐNG NHẤT BỔ SUNG (PROPOSAL PENDING APPROVAL ⏳)

---

## 📋 1. TỔNG QUAN YÊU CẦU (OVERVIEW)

Chuẩn hóa **Hệ thống Đa ngôn ngữ Tập trung (i18n Localization Engine)** cho 10 ngôn ngữ chính toàn cầu (`vi`, `en`, `ko`, `ja`, `th`, `zh`, `fr`, `de`, `es`, `ru`), đảm bảo **100% văn bản hiển thị trên Toàn bộ phiên bản Web App** chuyển đổi mượt mà khi người dùng thay đổi Ngôn ngữ từ Header.

---

## 🔍 2. DANH SÁCH THÀNH PHẦN CẦN ĐỒNG NHẤT NGÔN NGỮ

| Phân Vùng UI | Component File | Hiện Trạng Cần Sửa | Phương Án Chuẩn Hóa i18n |
| :--- | :--- | :--- | :--- |
| **1. Site Header** | `web/src/components/site-header.tsx` | Menu navigation (Stays, Flights, Bus, Rent Car, Combo), nút Đăng nhập / Đăng ký, Currency Switcher | Chuyển toàn bộ Nav Items, Auth Modal text & Currency label qua dictionary key `t("nav_*", lang)`. |
| **2. Hero Banner & Search Bar** | `web/src/components/search-bar.tsx`<br>`web/src/components/home-interactive.tsx` | Các Tab tìm kiếm (Khách sạn, Vé xe khách, Thuê xe, Vé máy bay, Chuyến đi), Trust Badges (Deposit 30%, 24/7 Support) | Đồng bộ 100% nhãn Tab (`search_tab_stay`, `search_tab_bus`, `search_tab_ride`...), Trust badges qua `t("trust_*", lang)`. |
| **3. Section 1: Quick Stats** | `web/src/components/home-interactive.tsx` | Thống kê "12 Điểm đến", "1.100+ Khách sạn", "700+ Món ăn", "24/7 Hỗ trợ" | Đồng bộ các nhãn chỉ số qua `t("stat_*", lang)`. |
| **4. Section 2: 12 Quốc gia** | `web/src/components/countries-section.tsx`<br>`web/src/components/country-sliders.tsx` | Tiêu đề Section, Subtitle, Thẻ Quốc gia, Nút "Xem danh sách điểm đến" | Bổ sung dictionary key cho tên 12 quốc gia & mô tả ngắn theo ngôn ngữ được chọn. |
| **5. Section 3: Điểm đến Hot** | `web/src/components/destinations-section.tsx` | Tiêu đề "Vẻ Đẹp Thiên Nhiên & Điểm Đến Hot", Thẻ Card Điểm đến (Tên, Số lượng trải nghiệm, Đánh giá) | Đồng bộ dictionary keys `destinations_title`, `destinations_subtitle`, `destination_badge`. |
| **6. Section 4: Khách sạn Nổi bật** | `web/src/components/hotel-card.tsx`<br>`web/src/components/home-interactive.tsx` | Tabs lọc ("Tất cả", "Khách sạn", "Villa", "Căn hộ"), Hotel Card badges ("StayZ Pick", "Giá từ", "/ đêm", "sao") | Bổ sung dictionary keys trong `i18n.ts` cho `hotel_card_price_from`, `hotel_card_per_night`, `hotel_card_reviews`. |
| **7. Section 5: Ẩm thực Đặc sản** | `web/src/components/taste-section.tsx` | Tiêu đề "Ẩm Thực Đặc Sản", Thẻ Món ăn ("Địa chỉ gợi ý", "Đặc sản địa phương") | Đồng bộ dictionary keys `taste_title`, `taste_subtitle`, `taste_recommended_spot`. |
| **8. Section 6: Trải nghiệm & Check-in** | `web/src/components/experiences-section.tsx` | Tiêu đề "Trải Nghiệm & Điểm Sống Ảo", Thẻ Hoạt động ("Hot", "Trải nghiệm nên thử") | Đồng bộ dictionary keys `experiences_title`, `experiences_subtitle`, `experience_badge`. |
| **9. Footer** | `web/src/components/home-interactive.tsx` | Các cột Liên kết ("Về StayZ", "Điểm đến hot", "Hỗ trợ khách hàng"), Copyright notice, Currency / Language selector | Đồng bộ toàn bộ liên kết Footer & Copyright qua dictionary `footer_*`. |

---

## 🛠️ 3. KẾ HOẠCH BỔ SUNG DICTIONARY KEYS TRONG `web/src/lib/i18n.ts`

Bổ sung các nhóm từ điển còn thiếu cho 10 ngôn ngữ:

```typescript
export type Language = "vi" | "en" | "ko" | "ja" | "th" | "zh" | "fr" | "de" | "es" | "ru";
```

---

## 🧪 4. KẾ HOẠCH KIỂM THỬ VÀ XÁC MINH (VERIFICATION PLAN)

1. **Chạy Build Test Frontend**: `npm run build` tại thư mục `web/` để đảm bảo TypeScript check sạch 100% không còn lỗi missing props.
2. **Kiểm tra Chuyển đổi 10 Ngôn ngữ (Language Switcher Testing)**:
   - Chuyển ngôn ngữ sang bất kỳ ngôn ngữ nào trong 10 ngôn ngữ (`vi`, `en`, `ko`, `ja`, `th`, `zh`, `fr`, `de`, `es`, `ru`) $\rightarrow$ Tất cả Header, Search, Section Title, Cards, Footer phải khớp 100%.
   - Không có bất kỳ từ tiếng Việt/Anh hardcode lọt ra ngoài.
3. **Đồng bộ Luồng Nghiệp Vụ & Rules**:
   - Cập nhật luồng nghiệp vụ UI đa ngôn ngữ tại `docs/business_flows/huki_travel_master_flow.md`.

---

## ➕ 5. CẬP NHẬT ĐỀ XUẤT THÊM (NÂNG CẤP MỞ RỘNG 10 NGÔN NGỮ & RE-DESIGN HEADER SELECTOR)

### 🔹 A. Mở Rộng 10 Ngôn Ngữ Toàn Cầu:
| Mã Ngôn Ngữ (`Language`) | Tên Ngôn Ngữ | Cờ Quốc Gia / Biểu Tượng |
| :--- | :--- | :--- |
| `vi` | Tiếng Việt | 🇻🇳 Việt Nam |
| `en` | English | 🇬🇧 UK / 🇺🇸 US |
| `ko` | 한국어 | 🇰🇷 Hàn Quốc |
| `ja` | 日本語 | 🇯🇵 Nhật Bản |
| `th` | ไทย | 🇹🇭 Thái Lan |
| `zh` | 中文 (简体) | 🇨🇳 Trung Quốc |
| `fr` | Français | 🇫🇷 Pháp |
| `de` | Deutsch | 🇩🇪 Đức |
| `es` | Español | 🇪🇸 Tây Ban Nha |
| `ru` | Русский | 🇷🇺 Nga |

### 🔹 B. Thiết Kế & Tích Hợp Lại Ô Chọn Ngôn Ngữ Trên Site Header (`web/src/components/site-header.tsx`):
- **Giao diện Nút bấm Header**: Hiển thị Biểu tượng cờ quốc gia + Mã ngôn ngữ hiện tại (ví dụ: `🇻🇳 VI`, `🇬🇧 EN`, `🇰🇷 KO`) cùng icon mũi tên `ChevronDown`.
- **Dropdown Popover Cao Cấp**: 
  - Khung danh sách 10 Ngôn ngữ được chia lưới/danh sách cuộn mịn màng.
  - Mỗi mục ngôn ngữ có: **Cờ quốc gia + Tên tiếng bản địa (Native Name) + Dấu tích chọn active (`Check`)**.
  - Tự động đóng dropdown khi click chọn ngôn ngữ mới hoặc click ngoài màn hình (Outside Click Handler).
  - Tự động lưu lựa chọn vào `localStorage` key `stayz_lang` và phát event `onLangChange` re-render toàn bộ trang chủ mà không cần reload trang.

---

## ➕ 6. CẬP NHẬT ĐỀ XUẤT THÊM (MỞ RỘNG i18N 10 NGÔN NGỮ CHO TOÀN BỘ PHIÊN BẢN WEB APP)

### 🎯 Mục tiêu:
Mở rộng việc hỗ trợ 10 ngôn ngữ toàn cầu cho **TẤT CẢ CÁC TRANG CON / LUỒNG PHỤ** của Web Application (`web/src/app/`):
1. **Trang Tìm Kiếm & Lọc (`web/src/app/search/`)**:
   - Nhãn bộ lọc mức giá, xếp hạng sao, danh mục tiện ích (Bể bơi, Wifi, Sân bay, Spa...), sắp xếp giá tăng/giảm.
2. **Trang Chi Tiết Khách Sạn (`web/src/app/hotels/[city]/[slug]/`)**:
   - Nhãn nút "Đặt phòng ngay", mô tả chính sách cọc 30%, danh sách tiện nghi, đánh giá du khách, sơ đồ phòng trống.
3. **Trang Quy Trình Đặt Phòng & Thanh Toán (`web/src/app/booking/`)**:
   - Nhãn điền thông tin khách hàng, chọn phương thức VietQR/PayOS, nút "Xác nhận cọc 30%".
4. **Trang Hồ Sơ & Quản Lý Đặt Chỗ (`web/src/app/profile/`)**:
   - Nhãn danh sách đơn đặt phòng, trạng thái vé điện tử QR code, thông tin cá nhân.
5. **Trang Yêu Thích & So Sánh (`web/src/app/favorites/`)**:
   - Nhãn bộ sưu tập yêu thích, danh sách lưu tạm.
6. **Trang Quản Trị Hệ Thống (`web/src/app/admin/`)**:
   - Nhãn menu quản trị, thống kê tổng quan doanh thu, quản lý khách sạn.

---

> [!NOTE]
> **Tình trạng Proposal**: Đã bổ sung đề xuất mở rộng i18n cho toàn bộ các trang Web App vào `h-dexuat-0003.md`. Vẫn ở chế độ **`đề xuất thêm`**, **CHƯA SỬA CODE NGUỒN**.
> Bạn xem qua, nếu đồng ý triển khai mở rộng cho các trang con thì gõ **`h-thống nhất - @docs/dexuat/h-dexuat-0003.md`** nhé!
