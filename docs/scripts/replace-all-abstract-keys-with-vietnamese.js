const fs = require("fs");
const path = require("path");

const webSrcDir = path.join(__dirname, "../../web/src");

// Key to real Vietnamese No-Key Text mapping
const keyToViText = {
  nav_stays: "Khách Sạn & Villa",
  nav_bus: "Vé Xe Khách",
  nav_ride: "Thuê Xe Tự Lái",
  nav_flight: "Vé Máy Bay",
  nav_combo: "Combo Chuyến Đi",
  nav_guide: "Cẩm Nang Du Lịch",
  nav_login: "Đăng Nhập",
  nav_signup: "Đăng Ký",
  nav_account: "Tài Khoản HuKi",
  nav_logout: "Đăng Xuất",
  nav_admin: "Quản Trị Admin",
  nav_countries: "Quốc Gia",
  lang_dropdown_title: "10 Ngôn Ngữ Toàn Cầu",

  hero_slogan: "Nền tảng Tích hợp Du lịch · HuKi Travel Ecosystem",
  hero_title_1: "Khám Phá Thế Giới",
  hero_title_2: "Trải Nghiệm Trọn Vẹn",
  hero_subtitle: "Đặt phòng khách sạn, vé xe khách 2 tầng, thuê xe tự lái và gom chuyến đi tiết kiệm 10% tại 12 quốc gia.",
  search_destination_placeholder: "Bạn muốn đi đâu? (Đà Nẵng, Tokyo, New York, Bali...)",
  search_checkin: "Nhận phòng",
  search_checkout: "Trả phòng",
  search_guests: "Số khách & Phòng",
  search_button: "Tìm kiếm ngay",
  search_tab_stay: "Khách Sạn",
  search_tab_bus: "Xe Khách 2 Tầng",
  search_tab_ride: "Thuê Xe Tự Lái",
  search_tab_flight: "Vé Máy Bay",
  search_tab_combo: "Combo Chuyến Đi",
  deposit_badge: "Chính sách Cọc 30%",
  deposit_desc: "Linh hoạt giữ chỗ - Hoàn tiền 100% khi hủy trước 48h",
  trust_support: "Hỗ Trợ 24/7 Toàn Cầu",

  combo_widget_title: "Gom Chuyến Đi Đa Dịch Vụ · Tiết Kiệm Ngay 10%",
  combo_widget_desc: "Kết hợp Vé máy bay/Xe khách + Khách sạn + Thuê xe tự lái vào 1 chuyến đi duy nhất. Khóa giữ chỗ 10 phút.",
  combo_feature_lock: "Tự động khóa chỗ 10 phút",
  combo_feature_refund: "Hoàn 100% cọc hủy trước 48h",
  combo_feature_pass: "Ví vé QR Code Động 30s",
  combo_button: "Tạo Chuyến Đi Combo",

  bus_widget_title: "Sơ Đồ Ghế Giường Nằm 2 Tầng Tự Động Khóa Chỗ",
  bus_deck_lower: "Tầng Dưới (Deck 1)",
  bus_deck_upper: "Tầng Trên (Deck 2)",

  splitbill_widget_title: "Quản Lý Chi Tiêu Nhóm & Hạch Toán Nợ Chéo Tự Động",
  splitbill_per_person: "MỖI THÀNH VIÊN CẦN THANH TOÁN",

  stat_destinations: "Điểm đến Toàn cầu",
  stat_properties: "Khách sạn & Villa",
  stat_foods: "Món ăn Đặc sản",
  stat_activities: "Điểm Check-in Hot",
  countries_title: "Khám Phá 12 Quốc Gia Du Lịch",
  countries_subtitle: "Hành trình xuyên lục địa từ Đông Nam Á đến Châu Mỹ & Châu Âu",
  destinations_title: "Vẻ Đẹp Thiên Nhiên & Điểm Đến Hot",
  destinations_subtitle: "Chọn quốc gia để khám phá 8 điểm đến tuyệt vời nhất",
  hotels_title: "Khách Sạn & Villa Nổi Bật",
  hotels_subtitle: "Nơi lưu trú hạng sang được đánh giá cao bởi cộng đồng du khách",
  taste_title: "Ẩm Thực Đặc Sản & Quán Ngon",
  taste_subtitle: "Hương vị truyền thống địa phương chuẩn vị khó cưỡng",
  experiences_title: "Trải Nghiệm & Điểm Sống Ảo",
  experiences_subtitle: "Những hoạt động & góc chụp hình triệu view không thể bỏ qua",

  category_nature: "Thiên nhiên",
  category_culture: "Văn hóa",
  category_entertainment: "Giải trí",
  category_checkin: "Sống ảo",
  filter_all: "Tất cả",
  filter_hotel: "Khách sạn",
  filter_villa: "Villa & Resort",
  filter_apartment: "Căn hộ & Business",
  view_more: "Xem thêm",
  view_all: "Khám phá tất cả",
  stayz_pick: "HuKi Pick",
  per_night: "/ đêm",
  rating_unit: "sao",
  from_price: "Giá từ",
  recommended_spot: "Địa chỉ gợi ý",
  card_book_now: "Đặt Ngay",
  card_reviews: "đánh giá",
  favorites_title: "Nơi lưu trú yêu thích",
  favorites_empty: "Chưa có nơi lưu trú yêu thích",

  footer_desc: "Nền tảng tích hợp du lịch toàn diện: Đặt phòng + Vé xe + Thuê xe + Ẩm thực + Trải nghiệm.",
  footer_company: "Về HuKi Travel",
  footer_destinations: "Điểm Đến Hot",
  footer_support: "Hỗ Trợ Khách Hàng",
  footer_rights: "Bản quyền thuộc về HuKi Travel Ecosystem.",
  footer_address: "Trụ sở: Tòa nhà HuKi Center, TP. Hồ Chí Minh, Việt Nam"
};

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = getAllFiles(webSrcDir);
let totalReplaced = 0;

allFiles.forEach((filePath) => {
  if (filePath.includes("dict") || filePath.endsWith("i18n.ts")) return;

  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  Object.keys(keyToViText).forEach((key) => {
    const viText = keyToViText[key];
    const escapedVi = viText.replace(/"/g, '\\"');
    
    // Replace t("key_name", ...) or t('key_name', ...) with t("ViText", ...)
    const regex1 = new RegExp(`t\\(["']${key}["']`, "g");
    if (regex1.test(content)) {
      content = content.replace(regex1, `t("${escapedVi}"`);
      modified = true;
      totalReplaced++;
    }

    // Replace labelKey: "key_name" or titleKey: "key_name"
    const regex2 = new RegExp(`(labelKey|titleKey|subtitleKey):\\s*["']${key}["']`, "g");
    if (regex2.test(content)) {
      content = content.replace(regex2, `$1: "${escapedVi}"`);
      modified = true;
      totalReplaced++;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ Replaced abstract keys with No-Key Vietnamese text in ${path.relative(webSrcDir, filePath)}`);
  }
});

console.log(`🎉 Total replacements made across codebase: ${totalReplaced}`);
