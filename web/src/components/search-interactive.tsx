"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  SlidersHorizontal, 
  Building, 
  Star, 
  MapPin, 
  Sparkles, 
  X, 
  Check, 
  ArrowUpDown,
  Building2,
  Palmtree,
  Home,
  ShieldCheck,
  BadgeCheck,
  Grid,
  List
} from "lucide-react";
import type { Hotel } from "@/lib/types";
import { Language, t } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SearchBar } from "@/components/search-bar";
import { HotelCard } from "@/components/hotel-card";

interface SearchInteractiveProps {
  initialHotels: Hotel[];
  initialCity?: string;
  initialKeyword?: string;
  initialGuests?: string;
  initialType?: string;
}

const AMENITY_FILTERS = [
  { id: "outdoor_pool", label: "Hồ bơi ngoài trời" },
  { id: "free_wifi", label: "Wi-Fi miễn phí" },
  { id: "airport_shuttle", label: "Xe đưa đón sân bay" },
  { id: "breakfast", label: "Bữa sáng miễn phí" },
  { id: "gym", label: "Phòng Gym & Fitness" },
  { id: "spa", label: "Dịch vụ Spa & Massage" },
  { id: "restaurant", label: "Nhà hàng cao cấp" },
  { id: "free_parking", label: "Chỗ đậu xe miễn phí" },
];

const PRICE_PRESETS = [
  { id: "all", label: "Tất cả mức giá", min: 0, max: Infinity },
  { id: "under_1m", label: "Dưới 1.000.000 ₫", min: 0, max: 1000000 },
  { id: "1m_3m", label: "1.000.000 ₫ - 3.000.000 ₫", min: 1000000, max: 3000000 },
  { id: "3m_5m", label: "3.000.000 ₫ - 5.000.000 ₫", min: 3000000, max: 5000000 },
  { id: "over_5m", label: "Trên 5.000.000 ₫", min: 5000000, max: Infinity },
];

export function SearchInteractive({
  initialHotels,
  initialCity = "",
  initialKeyword = "",
  initialGuests = "",
  initialType = "",
}: SearchInteractiveProps) {
  const [lang, setLang] = useState<Language>("vi");
  const [keyword, setKeyword] = useState(initialKeyword);
  const [city, setCity] = useState(initialCity);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [selectedPricePreset, setSelectedPricePreset] = useState("all");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"featured" | "price_asc" | "price_desc" | "rating">("featured");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(saved);

    const handleLangChange = (e: CustomEvent<{ lang: Language }>) => {
      if (e.detail?.lang) setLang(e.detail.lang);
    };

    window.addEventListener("stayz_lang_changed" as any, handleLangChange as any);
    return () => window.removeEventListener("stayz_lang_changed" as any, handleLangChange as any);
  }, []);

  function handleLangChange(newLang: Language) {
    setLang(newLang);
    localStorage.setItem("stayz_lang", newLang);
  }

  function toggleAmenity(id: string) {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function resetFilters() {
    setKeyword("");
    setCity("");
    setSelectedType("");
    setSelectedStars(0);
    setSelectedPricePreset("all");
    setSelectedAmenities([]);
    setSortOrder("featured");
  }

  // Filter & Sort Pipeline
  const filteredHotels = useMemo(() => {
    return initialHotels.filter((hotel) => {
      // Keyword match
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const titleMatch = typeof hotel.title === "string" 
          ? hotel.title.toLowerCase().includes(q)
          : (hotel.title?.vi || "").toLowerCase().includes(q) || (hotel.title?.en || "").toLowerCase().includes(q);
        const cityMatch = (hotel.city || "").toLowerCase().includes(q);
        const addrMatch = (hotel.address || "").toLowerCase().includes(q);
        if (!titleMatch && !cityMatch && !addrMatch) return false;
      }

      // City match
      if (city && hotel.city !== city) {
        if (!hotel.city?.toLowerCase().includes(city.toLowerCase())) return false;
      }

      // Type match
      if (selectedType) {
        const type = (hotel.type || "").toLowerCase();
        if (selectedType === "hotel" && type !== "hotel" && type !== "business") return false;
        if (selectedType === "villa" && type !== "villa" && type !== "resort" && type !== "homestay") return false;
        if (selectedType === "apartment" && type !== "apartment" && type !== "hostel") return false;
      }

      // Star rating match
      if (selectedStars > 0) {
        const rating = hotel.rating || 0;
        if (rating < selectedStars) return false;
      }

      // Price preset match
      const preset = PRICE_PRESETS.find((p) => p.id === selectedPricePreset);
      if (preset && preset.id !== "all") {
        const price = hotel.price_from || hotel.price || 0;
        if (price < preset.min || price > preset.max) return false;
      }

      // Amenities match
      if (selectedAmenities.length > 0) {
        const hotelAmenities = hotel.amenities || [];
        const hasAll = selectedAmenities.every((a) => hotelAmenities.includes(a));
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.price_from || a.price || 0;
      const priceB = b.price_from || b.price || 0;
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;

      if (sortOrder === "price_asc") return priceA - priceB;
      if (sortOrder === "price_desc") return priceB - priceA;
      if (sortOrder === "rating") return ratingB - ratingA;
      return 0; // featured default
    });
  }, [initialHotels, keyword, city, selectedType, selectedStars, selectedPricePreset, selectedAmenities, sortOrder]);

  return (
    <main id="main-content" style={{ minHeight: "100vh", background: "var(--color-bg, #090d16)", color: "var(--color-fg, #f8fafc)" }}>
      <SiteHeader transparent={false} lang={lang} onLangChange={handleLangChange} />

      {/* Hero Header */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85') center/cover no-repeat",
          padding: "48px 0 36px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="shell" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ background: "rgba(251, 191, 36, 0.2)", color: "#fbbf24", border: "1px solid rgba(251, 191, 36, 0.4)", padding: "3px 12px", borderRadius: 100, fontSize: 11, fontWeight: 800 }}>
              🏨 {t("Khách Sạn & Villa Nổi Bật", lang)}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, marginBottom: 8, color: "#fff" }}>
            {t("Tìm kiếm khách sạn", lang)}
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: 15, maxWidth: 700, marginBottom: 28 }}>
            {t("Nơi lưu trú hạng sang được đánh giá cao bởi cộng đồng du khách", lang)}
          </p>

          <SearchBar initialCity={city} initialKeyword={keyword} lang={lang} />
        </div>
      </section>

      {/* Main Content Layout (Sidebar Filter + Hotel Grid) */}
      <div className="shell" style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 20px 80px" }}>
        {/* Top Controls Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setShowMobileFilter(true)}
              className="btn-mobile-filter"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 10,
                background: "rgba(30, 41, 59, 0.8)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <SlidersHorizontal size={16} />
              <span>{t("Bộ Lọc Tìm Kiếm", lang)}</span>
            </button>
            <p style={{ margin: 0, fontSize: 14, color: "#94a3b8" }}>
              {t("Hiển thị", lang)} <strong style={{ color: "#fbbf24" }}>{filteredHotels.length}</strong> {t("nơi lưu trú phù hợp", lang)}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Sort Order Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ArrowUpDown size={14} style={{ color: "#94a3b8" }} />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                style={{
                  background: "rgba(30, 41, 59, 0.8)",
                  color: "#f8fafc",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  padding: "8px 14px",
                  borderRadius: 10,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <option value="featured">{t("Nổi Bật Nhất", lang)}</option>
                <option value="price_asc">{t("Giá: Thấp đến Cao", lang)}</option>
                <option value="price_desc">{t("Giá: Cao đến Thấp", lang)}</option>
                <option value="rating">{t("Đánh Giá Cao Nhất", lang)}</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 32, alignItems: "start" }} className="search-layout-grid">
          {/* Desktop Glassmorphism Sticky Sidebar */}
          <aside
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 20,
              padding: 24,
              position: "sticky",
              top: 100,
            }}
            className="search-sidebar-desktop"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, display: "flex", alignItems: "center", gap: 8, color: "#fff" }}>
                <SlidersHorizontal size={18} style={{ color: "#fbbf24" }} />
                {t("Bộ Lọc Tìm Kiếm", lang)}
              </h3>
              <button
                onClick={resetFilters}
                style={{ background: "none", border: "none", color: "#fbbf24", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
              >
                {t("Đặt lại", lang)}
              </button>
            </div>

            {/* Filter by Property Type */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 1, color: "#94a3b8", marginBottom: 12 }}>
                {t("Loại Hình Lưu Trú", lang)}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { id: "", label: "Tất cả loại hình" },
                  { id: "hotel", label: "Khách sạn" },
                  { id: "villa", label: "Villa & Resort" },
                  { id: "apartment", label: "Căn hộ & Business" },
                ].map((typeItem) => (
                  <button
                    key={typeItem.id}
                    onClick={() => setSelectedType(typeItem.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: selectedType === typeItem.id ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.06)",
                      background: selectedType === typeItem.id ? "rgba(251, 191, 36, 0.12)" : "rgba(30, 41, 59, 0.4)",
                      color: selectedType === typeItem.id ? "#fbbf24" : "#cbd5e1",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span>{t(typeItem.label, lang)}</span>
                    {selectedType === typeItem.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Price Preset */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 1, color: "#94a3b8", marginBottom: 12 }}>
                {t("Khoảng Giá / Đêm", lang)}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PRICE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPricePreset(preset.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: selectedPricePreset === preset.id ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.06)",
                      background: selectedPricePreset === preset.id ? "rgba(251, 191, 36, 0.12)" : "rgba(30, 41, 59, 0.4)",
                      color: selectedPricePreset === preset.id ? "#fbbf24" : "#cbd5e1",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span>{t(preset.label, lang)}</span>
                    {selectedPricePreset === preset.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Star Rating */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 1, color: "#94a3b8", marginBottom: 12 }}>
                {t("Xếp Hạng Sao", lang)}
              </h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[0, 5, 4, 3].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSelectedStars(star)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 10,
                      border: selectedStars === star ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.08)",
                      background: selectedStars === star ? "rgba(251, 191, 36, 0.15)" : "rgba(30, 41, 59, 0.4)",
                      color: selectedStars === star ? "#fbbf24" : "#cbd5e1",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {star === 0 ? (
                      t("Tất cả", lang)
                    ) : (
                      <>
                        <span>{star}</span>
                        <Star size={12} fill="#fbbf24" style={{ color: "#fbbf24" }} />
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Amenities */}
            <div>
              <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 1, color: "#94a3b8", marginBottom: 12 }}>
                {t("Tiện Nghi Nổi Bật", lang)}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {AMENITY_FILTERS.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity.id);
                  return (
                    <label
                      key={amenity.id}
                      onClick={() => toggleAmenity(amenity.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 12px",
                        borderRadius: 8,
                        background: isChecked ? "rgba(251, 191, 36, 0.08)" : "transparent",
                        color: isChecked ? "#fbbf24" : "#cbd5e1",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ accentColor: "#fbbf24", cursor: "pointer" }}
                      />
                      <span>{t(amenity.label, lang)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Hotel Grid / List */}
          <div>
            {filteredHotels.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 24,
                }}
              >
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel._id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px dashed rgba(255,255,255,0.15)",
                  borderRadius: 20,
                  padding: "60px 20px",
                  textAlign: "center",
                }}
              >
                <Building size={48} style={{ color: "#64748b", marginBottom: 16 }} />
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
                  {t("Chưa tìm thấy nơi phù hợp", lang)}
                </h3>
                <p style={{ color: "#94a3b8", maxWidth: 440, margin: "0 auto 24px", fontSize: 14 }}>
                  {t("Thử một điểm đến khác hoặc bỏ bớt điều kiện tìm kiếm.", lang)}
                </p>
                <button
                  onClick={resetFilters}
                  style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                    color: "#0f172a",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  {t("Đặt lại bộ lọc", lang)}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
