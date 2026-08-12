import { viDict } from "./i18n/dict/vi";
import { enDict } from "./i18n/dict/en";
import { koDict } from "./i18n/dict/ko";
import { jaDict } from "./i18n/dict/ja";
import { thDict } from "./i18n/dict/th";
import { zhDict } from "./i18n/dict/zh";
import { frDict } from "./i18n/dict/fr";
import { deDict } from "./i18n/dict/de";
import { esDict } from "./i18n/dict/es";
import { ruDict } from "./i18n/dict/ru";

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
  from_price: "Giá từ",
  card_book_now: "Đặt Ngay",
  card_reviews: "đánh giá",
  deposit_badge: "Chính sách Cọc 30%",
  destinations_title: "Vẻ Đẹp Thiên Nhiên & Điểm Đến Hot",
  destinations_subtitle: "Chọn quốc gia để khám phá 8 điểm đến tuyệt vời nhất",
  hotels_title: "Khách Sạn & Villa Nổi Bật",
  hotels_subtitle: "Nơi lưu trú hạng sang được đánh giá cao bởi cộng đồng du khách",
  taste_title: "Ẩm Thực Đặc Sản & Quán Ngon",
  taste_subtitle: "Hương vị truyền thống địa phương chuẩn vị khó cưỡng",
  experiences_title: "Trải Nghiệm & Điểm Sống Ảo",
  experiences_subtitle: "Những hoạt động & góc chụp hình triệu view không thể bỏ qua",
};

export function t(textOrKey: string, lang: Language = "vi"): string {
  if (!textOrKey) return "";
  const dict = noKeyTranslations[lang] || noKeyTranslations.vi;
  
  if (dict[textOrKey]) {
    return dict[textOrKey];
  }
  
  const viText = keyAliasToViText[textOrKey];
  if (viText && dict[viText]) {
    return dict[viText];
  }
  
  return textOrKey;
}
