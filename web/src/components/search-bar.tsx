"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect, Suspense } from "react";
import { Search, Hotel, Bus, Car, Plane, Package, Sparkles } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface Props {
  initialCity?: string;
  initialKeyword?: string;
  lang?: Language;
}

const SERVICE_TABS = [
  { id: "stay", labelKey: "Khách Sạn", icon: Hotel },
  { id: "bus", labelKey: "Xe Khách 2 Tầng", icon: Bus },
  { id: "ride", labelKey: "Thuê Xe Tự Lái", icon: Car },
  { id: "flight", labelKey: "Vé Máy Bay", icon: Plane },
  { id: "combo", labelKey: "Combo Chuyến Đi", icon: Package, badge: "-10%" },
];

const CITIES = [
  { value: "", labelKey: "Tất cả điểm đến (12 Quốc gia)" },
  // 🇻🇳 Việt Nam
  { value: "da-nang", labelKey: "Đà Nẵng, Việt Nam" },
  { value: "da-lat", labelKey: "Đà Lạt, Việt Nam" },
  { value: "ha-noi", labelKey: "Hà Nội, Việt Nam" },
  { value: "ho-chi-minh", labelKey: "TP. Hồ Chí Minh, Việt Nam" },
  { value: "phu-quoc", labelKey: "Phú Quốc, Việt Nam" },
  { value: "nha-trang", labelKey: "Nha Trang, Việt Nam" },
  { value: "hoi-an", labelKey: "Hội An, Việt Nam" },
  // 🇯🇵 Nhật Bản
  { value: "tokyo", labelKey: "Tokyo, Nhật Bản" },
  { value: "kyoto", labelKey: "Kyoto, Nhật Bản" },
  { value: "osaka", labelKey: "Osaka, Nhật Bản" },
  // 🇰🇷 Hàn Quốc
  { value: "seoul", labelKey: "Seoul, Hàn Quốc" },
  { value: "busan", labelKey: "Busan, Hàn Quốc" },
  { value: "jeju", labelKey: "Đảo Jeju, Hàn Quốc" },
  // 🇺🇸 Mỹ
  { value: "new-york", labelKey: "New York, Mỹ" },
  { value: "los-angeles", labelKey: "Los Angeles, Mỹ" },
  { value: "san-francisco", labelKey: "San Francisco, Mỹ" },
  { value: "las-vegas", labelKey: "Las Vegas, Mỹ" },
  { value: "hawaii", labelKey: "Hawaii, Mỹ" },
  // 🇹🇭 Thái Lan
  { value: "bangkok", labelKey: "Bangkok, Thái Lan" },
  { value: "phuket", labelKey: "Phuket, Thái Lan" },
  { value: "chiang-mai", labelKey: "Chiang Mai, Thái Lan" },
  // 🇨🇳 Trung Quốc
  { value: "shanghai", labelKey: "Thượng Hải, Trung Quốc" },
  { value: "beijing", labelKey: "Bắc Kinh, Trung Quốc" },
  // 🇮🇩 Indonesia
  { value: "bali", labelKey: "Bali, Indonesia" },
  { value: "jakarta", labelKey: "Jakarta, Indonesia" },
  // 🇨🇭 Thụy Sĩ
  { value: "zurich", labelKey: "Zurich, Thụy Sĩ" },
  { value: "geneva", labelKey: "Geneva, Thụy Sĩ" },
  // 🇦🇺 Úc
  { value: "sydney", labelKey: "Sydney, Úc" },
  { value: "melbourne", labelKey: "Melbourne, Úc" },
  // 🇧🇷 Brazil
  { value: "rio-de-janeiro", labelKey: "Rio de Janeiro, Brazil" },
  // 🇦🇷 Argentina
  { value: "buenos-aires", labelKey: "Buenos Aires, Argentina" },
  // 🇸🇬 Singapore
  { value: "singapore", labelKey: "Singapore" },
];

function SearchBarInner({ initialCity, initialKeyword, lang = "vi" }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const keywordRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState(sp.get("tab") || "stay");
  const [city, setCity] = useState(initialCity ?? sp.get("city") ?? "");
  const [keyword, setKeyword] = useState(initialKeyword ?? sp.get("keyword") ?? "");
  const [guests, setGuests] = useState(sp.get("guests") ?? "");
  const [type, setType] = useState(sp.get("type") ?? "");
  const [currentLang, setCurrentLang] = useState<Language>(lang);

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || lang || "vi";
    setCurrentLang(saved);

    const handleLangChange = (e: CustomEvent<{ lang: Language }>) => {
      if (e.detail?.lang) {
        setCurrentLang(e.detail.lang);
      }
    };

    window.addEventListener("stayz_lang_changed" as any, handleLangChange as any);
    return () => window.removeEventListener("stayz_lang_changed" as any, handleLangChange as any);
  }, [lang]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams();
    q.set("tab", activeTab);
    if (keyword) q.set("keyword", keyword);
    if (city) q.set("city", city);
    if (guests) q.set("guests", guests);
    if (type) q.set("type", type);
    router.push(`/search?${q.toString()}`);
  }

  return (
    <div style={{ width: "100%", maxWidth: 1400, margin: "0 auto" }}>
      {/* 5 Super-App Service Search Tabs */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 16,
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {SERVICE_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                borderRadius: 100,
                fontSize: 13.5,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                background: isActive ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" : "rgba(15, 23, 42, 0.65)",
                color: isActive ? "#fbbf24" : "#f8fafc",
                backdropFilter: "blur(16px)",
                border: isActive ? "1.5px solid #fbbf24" : "1px solid rgba(255, 255, 255, 0.22)",
                boxShadow: isActive ? "0 8px 24px rgba(15,23,42,0.4)" : "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <TabIcon size={16} style={{ color: isActive ? "#fbbf24" : "#cbd5e1" }} />
              <span>{t(tab.labelKey, currentLang)}</span>
              {tab.badge && (
                <span
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 800,
                    padding: "2px 7px",
                    borderRadius: 100,
                    letterSpacing: 0.5,
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Search Form Bar */}
      <form className="search-bar" id="search-banner" onSubmit={handleSubmit} role="search" aria-label="Tìm kiếm">
        <div className="search-field">
          <label htmlFor="sb-keyword">{t("Tìm kiếm ngay", currentLang).split(" ")[0]}</label>
          <input
            id="sb-keyword"
            ref={keywordRef}
            type="text"
            placeholder={t("Bạn muốn đi đâu? (Đà Nẵng, Tokyo, New York, Bali...)", currentLang)}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="search-field">
          <label htmlFor="sb-city">{t("Điểm đến Toàn cầu", currentLang).split(" ")[0]}</label>
          <select
            id="sb-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="Chọn điểm đến"
          >
            {CITIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.labelKey ? t(c.labelKey, currentLang) : ""}
              </option>
            ))}
          </select>
        </div>
        <div className="search-field">
          <label htmlFor="sb-type">{t("Tất cả", currentLang)}</label>
          <select
            id="sb-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Chọn loại hình"
          >
            <option value="">{t("Tất cả", currentLang)}</option>
            <option value="resort">{t("Villa & Resort", currentLang)}</option>
            <option value="hotel">{t("Khách sạn", currentLang)}</option>
            <option value="apartment">{t("Căn hộ & Business", currentLang)}</option>
          </select>
        </div>
        <div className="search-field" style={{ borderRight: 0 }}>
          <label htmlFor="sb-guests">{t("Số khách & Phòng", currentLang)}</label>
          <input
            id="sb-guests"
            type="number"
            placeholder="1+"
            min={1}
            max={20}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <button type="submit" className="search-btn" aria-label="Tìm kiếm">
          <Search size={16} aria-hidden="true" />
          {t("Tìm kiếm ngay", currentLang)}
        </button>
      </form>
    </div>
  );
}

export function SearchBar(props: Props) {
  return (
    <Suspense fallback={<div className="search-bar" style={{ height: 62, borderRadius: "var(--r-md)" }} />}>
      <SearchBarInner {...props} />
    </Suspense>
  );
}
