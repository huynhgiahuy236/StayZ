import { viDict } from "./dict/vi";
import { enDict } from "./dict/en";
import { koDict } from "./dict/ko";
import { jaDict } from "./dict/ja";
import { thDict } from "./dict/th";
import { zhDict } from "./dict/zh";
import { frDict } from "./dict/fr";
import { deDict } from "./dict/de";
import { esDict } from "./dict/es";
import { ruDict } from "./dict/ru";

export type Language = "vi" | "en" | "ko" | "ja" | "th" | "zh" | "fr" | "de" | "es" | "ru";

export const noKeyTranslations: Record<Language, Record<string, string>> = {
  vi: viDict,
  en: enDict,
  ko: koDict,
  ja: jaDict,
  th: thDict,
  zh: zhDict,
  fr: frDict,
  de: deDict,
  es: esDict,
  ru: ruDict,
};

export const translations = noKeyTranslations;

const keyAliasToViText: Record<string, string> = {
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
  auth_email_required: "Vui lòng nhập email của bạn.",
  auth_otp_required: "Vui lòng nhập đầy đủ 6 chữ số OTP.",
  auth_password_min: "Mật khẩu phải ít nhất 6 ký tự.",
  auth_password_mismatch: "Mật khẩu xác nhận không khớp.",
  auth_login_failed: "Đăng nhập thất bại. Vui lòng thử lại.",
  auth_register_failed: "Đăng ký thất bại. Vui lòng thử lại.",
  auth_welcome_back: "Chào mừng trở lại",
  auth_enter_email: "Nhập email của bạn để tiếp tục.",
  auth_reset_success: "Đặt lại mật khẩu thành công.",
  auth_google_error: "Dữ liệu đăng nhập Google không hợp lệ.",
  booking_select_room_required: "Vui lòng chọn loại phòng.",
  booking_select_dates_required: "Vui lòng chọn ngày nhận và trả phòng.",
  booking_checkout_after_checkin: "Ngày trả phòng phải sau ngày nhận phòng.",
  booking_create_failed: "Không thể tạo đặt phòng.",
  booking_loading: "Đang xử lý...",
  booking_confirm_pass_qr: "Vé Điện Tử Nhận Phòng Khách Sạn - Xuất trình mã QR tại quầy Lễ tân",
  booking_status_pending: "Chờ thanh toán",
  booking_status_confirmed: "Đã xác nhận",
  booking_status_completed: "Đã hoàn thành",
  booking_status_cancelled: "Đã hủy",
  admin_confirm_delete_property: "Bạn có chắc muốn xóa khách sạn này không?",
  profile_avatar_change: "Đổi ảnh đại diện",
  profile_full_name: "Họ và tên",
  profile_save_failed: "Lưu thất bại. Vui lòng thử lại.",
  fav_removed: "Đã xóa khỏi danh sách yêu thích",
  api_general_error: "Đã có lỗi xảy ra. Vui lòng thử lại.",
  api_upload_error: "Tải ảnh lên thất bại.",
  footer_desc: "Nền tảng tích hợp du lịch toàn diện: Đặt phòng + Vé xe + Thuê xe + Ẩm thực + Trải nghiệm.",
  footer_company: "Về HuKi Travel",
  footer_destinations: "Điểm Đến Hot",
  footer_support: "Hỗ Trợ Khách Hàng",
  footer_rights: "Bản quyền thuộc về HuKi Travel Ecosystem.",
  footer_address: "Trụ sở: Tòa nhà HuKi Center, TP. Hồ Chí Minh, Việt Nam",
  back_home: "Quay lại Trang Chủ",
  back_search: "Quay lại danh sách",
  destinations_in_country: "Nơi Du Lịch Nổi Bật Tại",
  hotels_5star: "Khách sạn 5-sao",
  specialty_dishes: "Món đặc sản",
  hot_checkins: "Check-in hot",
  csdl_level: "Cấp Bậc 1 & 2 CSDL",
  about_stay: "VỀ NƠI LƯU TRÚ",
  memorable_stay_waiting: "Một kỳ nghỉ đáng nhớ đang chờ bạn",
  per_night_tax_inc: "/ đêm - đã bao gồm thuế",
  select_your_room: "Chọn phòng của bạn",
  select_room_btn: "Chọn phòng",
  new_on_stayz: "Mới trên StayZ",
  amenity_outdoor_pool: "Hồ bơi ngoài trời",
  amenity_indoor_pool: "Hồ bơi trong nhà",
  amenity_free_wifi: "Wi-Fi miễn phí",
  amenity_airport_shuttle: "Đưa đón sân bay",
  amenity_non_smoking: "Phòng không hút thuốc",
  amenity_room_service: "Dịch vụ phòng",
  amenity_restaurant: "Nhà hàng",
  amenity_free_parking: "Bãi đỗ xe miễn phí",
  amenity_family_room: "Phòng gia đình",
  amenity_bar: "Quầy bar",
  amenity_breakfast: "Bữa sáng",
  amenity_gym: "Phòng gym",
  amenity_spa: "Spa & Massage",
  amenity_concierge: "Lễ tân 24/7",
  room_capacity: "Sức chứa",
  room_beds: "Giường",
  room_area: "Diện tích",
  room_view: "Tầm nhìn",
  room_ac: "Điều hòa",
  guests_label: "khách",
  king_bed_label: "Giường đôi King Size",
  nav_profile: "Thông tin cá nhân",
  nav_my_bookings: "Đặt phòng của tôi",
  nav_favorites: "Yêu thích",
  nav_policy: "Điều khoản & Chính sách",
  nav_admin_panel: "Trang Quản trị (Admin)",
};

export function t(textOrKey: string, lang: Language = "vi"): string {
  if (!textOrKey) return "";
  const dict = noKeyTranslations[lang] || noKeyTranslations.vi;
  
  // 1. Direct No-Key lookup (using Vietnamese string as Key)
  if (dict[textOrKey]) {
    return dict[textOrKey];
  }
  
  // 2. Lookup via legacy key alias
  const viText = keyAliasToViText[textOrKey];
  if (viText && dict[viText]) {
    return dict[viText];
  }
  
  // 3. Fallback to original input string
  return textOrKey;
}
