"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Destination } from "@/lib/types";
import { Language, t } from "@/lib/i18n";

interface Props {
  destinations: Destination[];
  lang?: Language;
  selectedCountry?: string;
  onSelectCountry?: (code: string) => void;
}

const COUNTRY_FILTERS = [
  { code: "vn", flag: "🇻🇳", label: { vi: "Việt Nam", en: "Vietnam", ko: "베트남", ja: "ベトナム", th: "เวียดนาม" } },
  { code: "us", flag: "🇺🇸", label: { vi: "Mỹ", en: "USA", ko: "미국", ja: "アメリカ", th: "สหรัฐอเมริกา" } },
  { code: "cn", flag: "🇨🇳", label: { vi: "Trung Quốc", en: "China", ko: "중국", ja: "中国", th: "จีน" } },
  { code: "id", flag: "🇮🇩", label: { vi: "Indonesia", en: "Indonesia", ko: "인도네시아", ja: "インドネシア", th: "อินโดนีเซีย" } },
  { code: "ch", flag: "🇨🇭", label: { vi: "Thụy Sĩ", en: "Switzerland", ko: "스위스", ja: "スイス", th: "สวิตเซอร์แลนด์" } },
  { code: "br", flag: "🇧🇷", label: { vi: "Brazil", en: "Brazil", ko: "브라질", ja: "ブラジル", th: "บราซิล" } },
  { code: "ar", flag: "🇦🇷", label: { vi: "Argentina", en: "Argentina", ko: "아르헨티나", ja: "アルゼンチン", th: "อาร์เจนตินา" } },
  { code: "au", flag: "🇦🇺", label: { vi: "Úc", en: "Australia", ko: "호주", ja: "オーストラリア", th: "ออสเตรเลีย" } },
  { code: "jp", flag: "🇯🇵", label: { vi: "Nhật Bản", en: "Japan", ko: "일본", ja: "日本", th: "ญี่ปุ่น" } },
  { code: "kr", flag: "🇰🇷", label: { vi: "Hàn Quốc", en: "Korea", ko: "대한민국", ja: "韓国", th: "เกาหลีใต้" } },
  { code: "th", flag: "🇹🇭", label: { vi: "Thái Lan", en: "Thailand", ko: "태국", ja: "タイ", th: "ประเทศไทย" } },
  { code: "sg", flag: "🇸🇬", label: { vi: "Singapore", en: "Singapore", ko: "싱가포르", ja: "シンガポール", th: "สิงคโปร์" } },
];

function getI18nText(field: unknown, lang: Language, fallback: string): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    const obj = field as Record<string, string>;
    return obj[lang] || obj.vi || obj.en || fallback;
  }
  return fallback;
}

const CITY_SLUG_MAP: Record<string, string[]> = {
  vn: ["da-nang", "da-lat", "ha-noi", "phu-quoc", "ho-chi-minh", "vung-tau", "ha-long", "hoi-an"],
  us: ["new-york", "los-angeles", "las-vegas", "san-francisco", "hawaii", "miami", "chicago", "washington-dc"],
  cn: ["beijing", "shanghai", "chengdu", "guangzhou", "chongqing", "xian", "hangzhou", "guilin"],
  id: ["bali", "ubud", "seminyak", "canggu", "nusa-penida", "kuta", "uluwatu", "lombok"],
  ch: ["zurich", "geneva", "lucerne", "interlaken", "zermatt", "lausanne", "basel", "st-moritz"],
  br: ["rio-de-janeiro", "sao-paulo", "salvador", "foz-do-iguacu", "florianopolis", "manaus", "recife", "brasilia"],
  ar: ["buenos-aires", "bariloche", "mendoza", "ushuaia", "el-calafate", "salta", "cordoba", "puerto-iguazu"],
  au: ["sydney", "melbourne", "brisbane", "perth", "gold-coast", "adelaide", "cairns", "hobart"],
  jp: ["tokyo", "kyoto", "osaka", "fuji", "hokkaido", "nara", "hiroshima", "okinawa"],
  kr: ["seoul", "busan", "jeju", "incheon", "gyeongju", "gangwon", "jeonju", "daegu"],
  th: ["bangkok", "phuket", "chiang-mai", "pattaya", "koh-samui", "hua-hin", "krabi", "ayutthaya"],
  sg: ["marina-bay", "sentosa", "chinatown-sg", "little-india", "orchard", "bugis", "clarke-quay", "changi"],
};

function isDestinationInCountry(d: Destination, countryCode: string): boolean {
  if (!d) return false;
  if (countryCode === "vn" && d.is_domestic) return true;

  const filter = COUNTRY_FILTERS.find((c) => c.code === countryCode);
  if (filter) {
    const validNames = Object.values(filter.label).map((n) => n.toLowerCase());
    if (typeof d.country === "string" && validNames.includes(d.country.toLowerCase())) return true;
    if (typeof d.country === "object" && d.country !== null) {
      const namesInObj = Object.values(d.country as Record<string, string>).map((v) => String(v).toLowerCase());
      if (namesInObj.some((n) => validNames.includes(n))) return true;
    }
  }

  const allowedSlugs = CITY_SLUG_MAP[countryCode] || [];
  return allowedSlugs.some((s) => d.slug === s || d.slug.includes(s) || s.includes(d.slug));
}

export function CountrySliders({ destinations, lang: initialLang = "vi", selectedCountry: externalSelectedCountry, onSelectCountry }: Props) {
  const [lang, setLang] = useState<Language>("vi");
  const [internalCountry, setInternalCountry] = useState("vn");
  const [visibleLimit, setVisibleLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || initialLang;
    setLang(saved);
  }, [initialLang]);

  const activeCountry = externalSelectedCountry || internalCountry;

  function handleCountryChange(code: string) {
    if (onSelectCountry) onSelectCountry(code);
    else setInternalCountry(code);
    setVisibleLimit(8);
    setCurrentPage(1);
  }

  // Filter destinations by active country
  const filtered = destinations.filter((d) => isDestinationInCountry(d, activeCountry));

  const totalPages = Math.ceil(filtered.length / visibleLimit);
  const startIndex = (currentPage - 1) * visibleLimit;
  const displayItems = filtered.slice(startIndex, startIndex + visibleLimit);

  return (
    <section className="shell" style={{ padding: "40px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
        <div>
          <p className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--color-gold, #d97706)", fontSize: 13, fontWeight: 700 }}>
            <Compass size={14} /> {t("12 Quốc Gia Toàn Cầu", lang)}
          </p>
          <Link href="/destinations" style={{ textDecoration: "none", color: "inherit" }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: "var(--color-ink)" }}>
              {t("Điểm Đến Nổi Bật Theo Quốc Gia", lang)}
            </h2>
          </Link>
        </div>
        <Link href="/destinations" style={{ color: "var(--color-gold, #d97706)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
          {t("Xem tất cả", lang)} ({destinations.length}) →
        </Link>
      </div>

      {/* Filter Buttons Quốc gia */}
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          paddingBottom: 12,
          marginBottom: 20,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="no-scrollbar"
      >
        {COUNTRY_FILTERS.map((c) => {
          const isActive = activeCountry === c.code;
          const label = c.label[lang] || c.label.vi;
          return (
            <button
              key={c.code}
              onClick={() => handleCountryChange(c.code)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
                border: isActive ? "1px solid var(--color-gold)" : "1px solid rgba(0,0,0,0.08)",
                background: isActive ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" : "#fff",
                color: isActive ? "#facc15" : "var(--color-ink-1)",
                boxShadow: isActive ? "0 4px 12px rgba(15,23,42,0.15)" : "none",
              }}
            >
              <span>{c.flag}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid Items (8 hoặc 12 items/trang) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {displayItems.map((dest) => {
          const name = getI18nText(dest.name, lang, "Điểm đến");
          const summary = getI18nText(dest.summary, lang, "Kỳ nghỉ ấn tượng tuyệt vời");
          const bgImg = dest.hero_image || dest.gallery?.[0] || "/hotel-placeholder.svg";

          return (
            <Link
              href={`/search?city=${encodeURIComponent(dest.slug)}`}
              key={dest.slug || dest._id}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.85) 100%), url("${bgImg}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 16,
                minHeight: 260,
                padding: 18,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                color: "#fff",
                textDecoration: "none",
                transition: "transform 0.3s ease, boxShadow 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
              className="country-hover-card"
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(6px)", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 100 }}>
                  📍 {dest.slug.toUpperCase()}
                </span>
                {dest.discount_badge && (
                  <span style={{ background: "#ef4444", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 8px", borderRadius: 100 }}>
                    -{dest.discount_badge}
                  </span>
                )}
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#fff" }}>{name}</h3>
                  {dest.rating && (
                    <span style={{ fontSize: 12, color: "#facc15", display: "inline-flex", alignItems: "center", gap: 2, fontWeight: 600 }}>
                      <Star size={12} fill="#facc15" /> {dest.rating}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 12, opacity: 0.85, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {summary}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Điều hướng Mở rộng 8 -> 12 & Phân trang */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 28 }}>
        {visibleLimit === 8 && filtered.length > 8 && (
          <button
            type="button"
            onClick={() => setVisibleLimit(12)}
            className="btn-secondary"
            style={{
              padding: "12px 28px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {t("Xem thêm 12 điểm đến", lang)} ({filtered.length - 8} {t("thêm", lang)})
          </button>
        )}

        {totalPages > 1 && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #cbd5e1", background: "#fff", cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              {t("Trang trước", lang)}
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: currentPage === idx + 1 ? "none" : "1px solid #cbd5e1",
                  background: currentPage === idx + 1 ? "#0f172a" : "#fff",
                  color: currentPage === idx + 1 ? "#fbbf24" : "#0f172a",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {idx + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #cbd5e1", background: "#fff", cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              {t("Trang sau", lang)}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
