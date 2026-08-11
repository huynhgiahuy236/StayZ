"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect, Suspense } from "react";
import { Search } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface Props {
  initialCity?: string;
  initialKeyword?: string;
  lang?: Language;
}

const CITIES = [
  { value: "", labelKey: "filter_all" },
  { value: "da-nang", label: "Đà Nẵng" },
  { value: "da-lat", label: "Đà Lạt" },
  { value: "ha-noi", label: "Hà Nội" },
  { value: "vung-tau", label: "Vũng Tàu" },
  { value: "hoi-an", label: "Hội An" },
  { value: "nha-trang", label: "Nha Trang" },
  { value: "ho-chi-minh", label: "TP. Hồ Chí Minh" },
  { value: "phu-quoc", label: "Phú Quốc" },
];

function SearchBarInner({ initialCity, initialKeyword, lang = "vi" }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const keywordRef = useRef<HTMLInputElement>(null);
  const [city, setCity] = useState(initialCity ?? sp.get("city") ?? "");
  const [keyword, setKeyword] = useState(initialKeyword ?? sp.get("keyword") ?? "");
  const [guests, setGuests] = useState(sp.get("guests") ?? "");
  const [type, setType] = useState(sp.get("type") ?? "");
  const [currentLang, setCurrentLang] = useState<Language>(lang);

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || lang || "vi";
    setCurrentLang(saved);
  }, [lang]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams();
    if (keyword) q.set("keyword", keyword);
    if (city) q.set("city", city);
    if (guests) q.set("guests", guests);
    if (type) q.set("type", type);
    router.push(`/search?${q.toString()}`);
  }

  return (
    <form className="search-bar" id="search-banner" onSubmit={handleSubmit} role="search" aria-label="Tìm kiếm">
      <div className="search-field">
        <label htmlFor="sb-keyword">{t("search_button", currentLang).split(" ")[0]}</label>
        <input
          id="sb-keyword"
          ref={keywordRef}
          type="text"
          placeholder={t("search_destination_placeholder", currentLang)}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoComplete="off"
        />
      </div>
      <div className="search-field">
        <label htmlFor="sb-city">{t("stat_destinations", currentLang).split(" ")[0]}</label>
        <select
          id="sb-city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="Chọn điểm đến"
        >
          {CITIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.labelKey ? t(c.labelKey, currentLang) : c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="search-field">
        <label htmlFor="sb-type">{t("filter_all", currentLang)}</label>
        <select
          id="sb-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Chọn loại hình"
        >
          <option value="">{t("filter_all", currentLang)}</option>
          <option value="resort">{t("filter_villa", currentLang)}</option>
          <option value="hotel">{t("filter_hotel", currentLang)}</option>
          <option value="apartment">{t("filter_apartment", currentLang)}</option>
        </select>
      </div>
      <div className="search-field" style={{ borderRight: 0 }}>
        <label htmlFor="sb-guests">{t("search_guests", currentLang)}</label>
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
        {t("search_button", currentLang)}
      </button>
    </form>
  );
}

export function SearchBar(props: Props) {
  return (
    <Suspense fallback={<div className="search-bar" style={{ height: 62, borderRadius: "var(--r-md)" }} />}>
      <SearchBarInner {...props} />
    </Suspense>
  );
}
