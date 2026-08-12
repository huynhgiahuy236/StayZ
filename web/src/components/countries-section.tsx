"use client";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Language, t } from "@/lib/i18n";

export const COUNTRIES_DATA = [
  {
    code: "vn",
    name: { vi: "Việt Nam", en: "Vietnam", ko: "베트남", ja: "ベトナム", th: "เวียดนาม" },
    flag: "🇻🇳",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "Phố cổ, biển xanh & núi rừng", en: "Old Quarter, Beaches & Mountains", ko: "올드쿼터, 해변 & 산", ja: "古镇、ビーチ＆山", th: "ย่านเมืองเก่า, ชายหาด & ภูเขา" },
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "us",
    name: { vi: "Mỹ", en: "United States", ko: "미국", ja: "アメリカ", th: "สหรัฐอเมริกา" },
    flag: "🇺🇸",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "New York, Hollywood & Las Vegas", en: "New York, Hollywood & Las Vegas", ko: "뉴욕, 할리우드 & 라스베이거스", ja: "ニューヨーク, ハリウッド & ラスベガス", th: "นิวยอร์ก, ฮอลลีวูด & ลาสเวกัส" },
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "cn",
    name: { vi: "Trung Quốc", en: "China", ko: "중국", ja: "中国", th: "จีน" },
    flag: "🇨🇳",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "Tử Cấm Thành, Vạn Lý Trường Thành", en: "Forbidden City, Great Wall", ko: "자금성, 만리장성", ja: "紫禁城、万里の長城", th: "พระราชวังต้องห้าม, กำแพงเมืองจีน" },
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "id",
    name: { vi: "Indonesia (Bali)", en: "Indonesia", ko: "인도네시아", ja: "インドネシア", th: "อินโดนีเซีย" },
    flag: "🇮🇩",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "Thiên đường nhiệt đới & biển ngọc", en: "Tropical Paradise & Crystal Waters", ko: "열대 낙원 & 수정처럼 맑은 바다", ja: "トロピカルパラダイス＆エメラルドビーチ", th: "สวรรค์ร้อนเมือง & ทะเลใส" },
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "ch",
    name: { vi: "Thụy Sĩ", en: "Switzerland", ko: "스위스", ja: "スイス", th: "สวิตเซอร์แลนด์" },
    flag: "🇨🇭",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "Đỉnh núi tuyết Matterhorn & Alps", en: "Matterhorn & Alpine Peaks", ko: "마터호른 & 알프스 산맥", ja: "マッターホルン＆アルプス山脈", th: "ยอดเขามัทเทอร์ฮอร์น & แอลป์ส" },
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "br",
    name: { vi: "Brazil", en: "Brazil", ko: "브라질", ja: "ブラジル", th: "บราซิล" },
    flag: "🇧🇷",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "Tượng Chúa Cứu Thế & biển Copacabana", en: "Christ Redeemer & Copacabana", ko: "구세주 성상 & 코파카바나", ja: "コルコバードとコパカバーナ", th: "พระคริสต์ผู้ไถ่ & คอปาคาบานา" },
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "ar",
    name: { vi: "Argentina", en: "Argentina", ko: "아르헨티나", ja: "アルゼンチン", th: "อาร์เจนตินา" },
    flag: "🇦🇷",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "Tango Buenos Aires & sông băng", en: "Tango Buenos Aires & Glaciers", ko: "탱고 부에노스아이레스 & 빙하", ja: "タンゴブエノスアイ레스 & 氷河", th: "ตังโก้บัวโนสไอเรส & ธารน้ำแข็ง" },
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "au",
    name: { vi: "Úc", en: "Australia", ko: "호주", ja: "호주", th: "ออสเตรเลีย" },
    flag: "🇦🇺",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "Nhà hát Con Sò Sydney & rạn san hô", en: "Sydney Opera House & Reef", ko: "시드니 오페라 하우스 & 산호초", ja: "シドニーオペラハウス & サンゴ礁", th: "ออเปร่าซิดนีย์ & แนวปะการัง" },
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "jp",
    name: { vi: "Nhật Bản", en: "Japan", ko: "일본", ja: "日本", th: "ญี่ปุ่น" },
    flag: "🇯🇵",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "Tokyo, Kyoto & Núi Phú Sĩ", en: "Tokyo, Kyoto & Mt. Fuji", ko: "도쿄, 교토 & 후지산", ja: "東京、京都 & 富士山", th: "โตเกียว, เกียวโต & ภูเขาฟูจิ" },
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "kr",
    name: { vi: "Hàn Quốc", en: "South Korea", ko: "대한민국", ja: "韓国", th: "เกาหลีใต้" },
    flag: "🇰🇷",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "Seoul, Đảo Jeju & Busan", en: "Seoul, Jeju Island & Busan", ko: "서울, 제주도 & 부산", ja: "ソウル、チェジュ島 & プサン", th: "โซล, เกาะเชจู & ปูซาน" },
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "th",
    name: { vi: "Thái Lan", en: "Thailand", ko: "태국", ja: "タイ", th: "ประเทศไทย" },
    flag: "🇹🇭",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "Bangkok, Phuket & Chiang Mai", en: "Bangkok, Phuket & Chiang Mai", ko: "방콕, 푸켓 & 치앙마이", ja: "バンコク、プーケット & チェンマイ", th: "กรุงเทพฯ, ภูเก็ต & เชียงใหม่" },
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "sg",
    name: { vi: "Singapore", en: "Singapore", ko: "싱가포르", ja: "シンガポール", th: "สิงคโปร์" },
    flag: "🇸🇬",
    count: { vi: "8 Điểm đến", en: "8 Destinations", ko: "8 여행지", ja: "8 目的地", th: "8 จุดหมาย" },
    note: { vi: "Marina Bay Sands & Changi", en: "Marina Bay Sands & Changi", ko: "마리나 베이 샌즈 & 창이", ja: "マリーナベイサンズ & チャンギ", th: "มารีน่าเบย์แซนด์ส & ชางĮ" },
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=85",
  },
];

interface CountryInfo {
  code: string;
  name: Record<string, string>;
  flag: string;
  count: Record<string, string>;
  note: Record<string, string>;
  image: string;
}

function getI18nField(field: unknown, lang: Language, fallback: string): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    const obj = field as Record<string, string>;
    return obj[lang] || obj.vi || obj.en || fallback;
  }
  return fallback;
}

interface Props {
  lang?: Language;
  onSelectCountry?: (countryCode: string) => void;
}

export function CountriesSection({ lang = "vi", onSelectCountry }: Props) {
  return (
    <section className="section shell" aria-labelledby="countries-heading" style={{ paddingTop: 40, paddingBottom: 20 }}>
      <div className="section-heading">
        <div>
          <p className="eyebrow dark" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Globe size={14} className="text-gold" /> {t("StayZ Global", lang)}
          </p>
          <h2 id="countries-heading">{t("Khám Phá 12 Quốc Gia Du Lịch", lang)}</h2>
          <p className="section-sub">{t("Hành trình xuyên lục địa từ Đông Nam Á đến Châu Mỹ & Châu Âu", lang)}</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginTop: 20,
        }}
        className="country-grid-4-cols"
      >
        {COUNTRIES_DATA.map((c) => {
          const cData = c as CountryInfo;
          const cName = getI18nField(cData.name, lang, cData.name.vi);
          const cCount = getI18nField(cData.count, lang, cData.count.vi);
          const cNote = getI18nField(cData.note, lang, cData.note.vi);
          return (
            <div
              key={c.code}
              onClick={() => onSelectCountry && onSelectCountry(c.code)}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.88) 100%), url("${c.image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 16,
                minHeight: 180,
                padding: 18,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              className="country-hover-card"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 28 }}>{c.flag}</span>
                <span style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 100 }}>
                  {cCount}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: 19, fontWeight: 700, margin: 0, color: "#fff" }}>{cName}</h3>
                <p style={{ fontSize: 12, opacity: 0.85, margin: "4px 0 0 0" }}>{cNote}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
