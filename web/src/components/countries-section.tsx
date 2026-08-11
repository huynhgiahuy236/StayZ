"use client";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Language, t } from "@/lib/i18n";

export const COUNTRIES_DATA = [
  {
    code: "vn",
    name: { vi: "Việt Nam", en: "Vietnam", ko: "베트남", ja: "ベトナム", th: "เวียดนาม" },
    flag: "🇻🇳",
    count: "8 Điểm đến",
    note: "Phố cổ, biển xanh & núi rừng",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "us",
    name: { vi: "Mỹ", en: "United States", ko: "미국", ja: "アメリカ", th: "สหรัฐอเมริกา" },
    flag: "🇺🇸",
    count: "8 Điểm đến",
    note: "New York, Hollywood & Las Vegas",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "cn",
    name: { vi: "Trung Quốc", en: "China", ko: "중국", ja: "中国", th: "จีน" },
    flag: "🇨🇳",
    count: "8 Điểm đến",
    note: "Tử Cấm Thành, Vạn Lý Trường Thành",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "id",
    name: { vi: "Indonesia (Bali)", en: "Indonesia", ko: "인도네시아", ja: "インドネシア", th: "อินโดนีเซีย" },
    flag: "🇮🇩",
    count: "8 Điểm đến",
    note: "Thiên đường nhiệt đới & biển ngọc",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "ch",
    name: { vi: "Thụy Sĩ", en: "Switzerland", ko: "스위스", ja: "スイス", th: "สวิตเซอร์แลนด์" },
    flag: "🇨🇭",
    count: "8 Điểm đến",
    note: "Đỉnh núi tuyết Matterhorn & Alps",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "br",
    name: { vi: "Brazil", en: "Brazil", ko: "브라질", ja: "ブラジル", th: "บราซิล" },
    flag: "🇧🇷",
    count: "8 Điểm đến",
    note: "Tượng Chúa Cứu Thế & biển Copacabana",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "ar",
    name: { vi: "Argentina", en: "Argentina", ko: "아르헨티나", ja: "アルゼンチン", th: "อาร์เจนตินา" },
    flag: "🇦🇷",
    count: "8 Điểm đến",
    note: "Tango Buenos Aires & sông băng",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "au",
    name: { vi: "Úc", en: "Australia", ko: "호주", ja: "オーストラリア", th: "ออสเตรเลีย" },
    flag: "🇦🇺",
    count: "8 Điểm đến",
    note: "Nhà hát Con Sò Sydney & rạn san hô",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "jp",
    name: { vi: "Nhật Bản", en: "Japan", ko: "일본", ja: "日本", th: "ญี่ปุ่น" },
    flag: "🇯🇵",
    count: "8 Điểm đến",
    note: "Tokyo, Kyoto & Núi Phú Sĩ",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "kr",
    name: { vi: "Hàn Quốc", en: "South Korea", ko: "대한민국", ja: "韓国", th: "เกาหลีใต้" },
    flag: "🇰🇷",
    count: "8 Điểm đến",
    note: "Seoul, Đảo Jeju & Busan",
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "th",
    name: { vi: "Thái Lan", en: "Thailand", ko: "태국", ja: "タイ", th: "ประเทศไทย" },
    flag: "🇹🇭",
    count: "8 Điểm đến",
    note: "Bangkok, Phuket & Chiang Mai",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=85",
  },
  {
    code: "sg",
    name: { vi: "Singapore", en: "Singapore", ko: "싱가포르", ja: "シンガポール", th: "สิงคโปร์" },
    flag: "🇸🇬",
    count: "8 Điểm đến",
    note: "Marina Bay Sands & Changi",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=85",
  },
];

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
            <Globe size={14} className="text-gold" /> StayZ Global
          </p>
          <h2 id="countries-heading">{t("countries_title", lang)}</h2>
          <p className="section-sub">{t("countries_subtitle", lang)}</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, marginTop: 20 }}>
        {COUNTRIES_DATA.map((c) => {
          const cName = c.name[lang] || c.name.vi;
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
                  {c.count}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: 19, fontWeight: 700, margin: 0, color: "#fff" }}>{cName}</h3>
                <p style={{ fontSize: 12, opacity: 0.85, margin: "4px 0 0 0" }}>{c.note}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
