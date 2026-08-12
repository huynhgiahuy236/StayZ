"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Headphones, ShieldCheck, Sparkles, Building, Home as HomeIcon, Palmtree, Hotel as HotelIcon } from "lucide-react";
import type { Hotel, Destination } from "@/lib/types";
import { Language, t } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SearchBar } from "@/components/search-bar";
import { CountriesSection } from "@/components/countries-section";
import { CountrySliders } from "@/components/country-sliders";
import { TasteSection } from "@/components/taste-section";
import { ExperiencesSection } from "@/components/experiences-section";
import { HotelCard } from "@/components/hotel-card";
import { TripComboWidget } from "@/components/trip-combo-widget";
import { BusSeatmapWidget } from "@/components/bus-seatmap-widget";
import { SplitbillCalculatorWidget } from "@/components/splitbill-calculator-widget";
import { CountryFilterTabs } from "@/components/country-filter-tabs";
import { getMasterDataForCountry } from "@/lib/master-data";

interface Props {
  initialHotels: Hotel[];
  initialDestinations: Destination[];
}

const HOTEL_TABS = [
  { id: "all", labelKey: "filter_all", icon: Building },
  { id: "hotel", labelKey: "filter_hotel", icon: HotelIcon },
  { id: "villa", labelKey: "filter_villa", icon: Palmtree },
  { id: "apartment", labelKey: "filter_apartment", icon: HomeIcon },
];

const HERO_COUNTRY_BACKGROUNDS: Record<Language, string> = {
  vi: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85", // 🇻🇳 Đà Nẵng / Việt Nam
  en: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&q=85", // 🇺🇸 New York / Mỹ
  ko: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=2000&q=85", // 🇰🇷 Seoul / Hàn Quốc
  ja: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2000&q=85", // 🇯🇵 Tokyo / Nhật Bản
  th: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2000&q=85", // 🇹🇭 Bangkok / Thái Lan
  zh: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2000&q=85", // 🇨🇳 Bắc Kinh / Trung Quốc
  fr: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=85", // 🇫🇷 Paris / Pháp
  de: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=2000&q=85", // 🇩🇪 Berlin / Đức
  es: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=2000&q=85", // 🇪🇸 Barcelona / Tây Ban Nha
  ru: "https://images.unsplash.com/photo-1513326718677-b964603b136b?auto=format&fit=crop&w=2000&q=85", // 🇷🇺 Điện Kremlin Matxcva / Nga
};

export function HomeInteractive({ initialHotels, initialDestinations }: Props) {
  const [lang, setLang] = useState<Language>("vi");
  const [activeHotelTab, setActiveHotelTab] = useState("all");
  const [activeHotelCountry, setActiveHotelCountry] = useState("all");
  const [selectedCountryCode, setSelectedCountryCode] = useState("vn");

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(saved);
  }, []);

  function handleLangChange(newLang: Language) {
    setLang(newLang);
    localStorage.setItem("stayz_lang", newLang);
  }

  // Dynamic 4K Background URL based on selected Language/Country
  const heroBgUrl = HERO_COUNTRY_BACKGROUNDS[lang] || HERO_COUNTRY_BACKGROUNDS.vi;

  // Filter Hotels based on selected country & type tab using Master Data Provider
  const countryHotels = getMasterDataForCountry(activeHotelCountry).hotels;
  const filteredHotels = countryHotels.filter((h) => {
    if (activeHotelTab === "all") return true;
    const type = (h.type || "").toLowerCase();
    if (activeHotelTab === "hotel") return type === "hotel" || type === "business";
    if (activeHotelTab === "villa") return type === "villa" || type === "resort" || type === "homestay";
    if (activeHotelTab === "apartment") return type === "apartment" || type === "hostel" || type === "business";
    return true;
  });

  // Limit to 8 hotel cards (4 per row x 2 rows)
  const displayHotels = filteredHotels.slice(0, 8);

  return (
    <main id="main-content">
      {/* ── 1. HERO BANNER & 5 SUPER-APP SEARCH TABS ─────────────── */}
      <section
        className="hero"
        aria-label="HuKi Travel Super-App Portal"
        style={{
          background: `linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 41, 59, 0.72) 50%, rgba(15, 23, 42, 0.9) 100%), url('${heroBgUrl}') center/cover no-repeat`,
          transition: "background 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <SiteHeader transparent lang={lang} onLangChange={handleLangChange} />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content shell" style={{ paddingTop: 24, paddingBottom: 48, maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ background: "rgba(251, 191, 36, 0.2)", color: "#fbbf24", border: "1px solid rgba(251, 191, 36, 0.4)", padding: "3px 10px", borderRadius: 100, fontSize: 10, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>
                🌐 {t("10 Ngôn Ngữ Toàn Cầu", lang)}
              </span>
            </div>
            <p className="eyebrow" style={{ letterSpacing: "1.5px", textTransform: "uppercase", textAlign: "left", marginBottom: 8 }}>
              {t("Nền tảng Tích hợp Du lịch · HuKi Travel Ecosystem", lang)}
            </p>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 900, marginBottom: 12, textAlign: "left", lineHeight: 1.15 }}>
              {t("Khám Phá Thế Giới", lang)}<br />
              <em style={{ color: "var(--gold, #fbbf24)", fontStyle: "normal" }}>{t("Trải Nghiệm Trọn Vẹn", lang)}</em>
            </h1>
            <p className="hero-copy" style={{ maxWidth: 720, margin: "0 0 28px 0", textAlign: "left", fontSize: 15, color: "#cbd5e1" }}>
              {t("Đặt phòng khách sạn, vé xe khách 2 tầng, thuê xe tự lái và gom chuyến đi tiết kiệm 10% tại 12 quốc gia.", lang)}
            </p>

            <SearchBar lang={lang} />

            <div className="trust-row" style={{ marginTop: 24, justifyContent: "flex-start", gap: 24 }}>
              <span><BadgeCheck size={15} style={{ color: "#fbbf24" }} aria-hidden="true" /> {t("Chính sách Cọc 30%", lang)}</span>
              <span><ShieldCheck size={15} style={{ color: "#34d399" }} aria-hidden="true" /> {t("Linh hoạt giữ chỗ - Hoàn tiền 100% khi hủy trước 48h", lang)}</span>
              <span><Headphones size={15} style={{ color: "#60a5fa" }} aria-hidden="true" /> {t("Hỗ Trợ 24/7 Toàn Cầu", lang)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. REAL-TIME ECOSYSTEM QUICK STATS BAR ──────────────── */}
      <section style={{ background: "var(--color-ink, #0f172a)", color: "#fff", padding: "28px 0" }}>
        <div className="shell" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--gold, #fbbf24)" }}>12</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{t("Điểm đến Toàn cầu", lang)}</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--gold, #fbbf24)" }}>1.100+</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{t("Khách sạn & Villa", lang)}</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--gold, #fbbf24)" }}>700+</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{t("Món ăn Đặc sản", lang)}</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--gold, #fbbf24)" }}>1.100+</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{t("Điểm Check-in Hot", lang)}</div>
          </div>
        </div>
      </section>

      {/* ── 3. HUKI TRIP COMBO BUNDLE WIDGET (Save 10% + 10m Timer) ── */}
      <TripComboWidget lang={lang} />

      {/* ── 4. WORLD COUNTRIES OVERVIEW (Render 12 Quốc gia) ────── */}
      <CountriesSection lang={lang} onSelectCountry={(code) => setSelectedCountryCode(code)} />

      {/* ── 5. COUNTRY DETAIL SLIDERS (8 items + Button Filter Quốc gia) ── */}
      <CountrySliders
        destinations={initialDestinations}
        lang={lang}
        selectedCountry={selectedCountryCode}
        onSelectCountry={(code) => setSelectedCountryCode(code)}
      />

      {/* ── 6. HUKI BUS - 2-DECK SLEEPER SEATMAP REAL-TIME DEMO ───── */}
      <BusSeatmapWidget lang={lang} />

      {/* ── 7. TASTE OF HUKI (8 items + Nút Xem thêm) ───────────── */}
      <TasteSection destinations={initialDestinations} lang={lang} />

      {/* ── 8. HUKI EXPERIENCES (8 items + Nút Xem thêm) ───────── */}
      <ExperiencesSection destinations={initialDestinations} lang={lang} />

      {/* ── 9. HUKI WALLET & SPLIT BILL CALCULATOR WIDGET ───────── */}
      <SplitbillCalculatorWidget lang={lang} />

      {/* ── 10. FEATURED HOTELS GRID (8 Items + 4 Filter Tabs) ──── */}
      <section className="section warm" aria-labelledby="featured-heading">
        <div className="shell">
          <div className="section-heading" style={{ marginBottom: 20 }}>
            <div>
              <p className="eyebrow dark">{t("HuKi Pick", lang)}</p>
              <h2 id="featured-heading">{t("Khách Sạn & Villa Nổi Bật", lang)}</h2>
              <p className="section-sub">{t("Nơi lưu trú hạng sang được đánh giá cao bởi cộng đồng du khách", lang)}</p>
            </div>
          </div>

          {/* Bộ chọn 12 Quốc gia lọc Khách sạn */}
          <CountryFilterTabs
            selectedCode={activeHotelCountry}
            onSelect={(code) => setActiveHotelCountry(code)}
            lang={lang}
          />

          {/* Bộ lọc 4 Tab Button Khách sạn */}
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            {HOTEL_TABS.map((tab) => {
              const isActive = activeHotelTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveHotelTab(tab.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "9px 18px",
                    borderRadius: 100,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: isActive ? "1px solid var(--color-gold)" : "1px solid rgba(0,0,0,0.1)",
                    background: isActive ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" : "#fff",
                    color: isActive ? "#facc15" : "var(--color-ink-1)",
                    boxShadow: isActive ? "0 4px 12px rgba(15,23,42,0.15)" : "none",
                  }}
                >
                  <TabIcon size={14} />
                  <span>{t(tab.labelKey, lang)}</span>
                </button>
              );
            })}
          </div>

          {/* Grid 8 Hotel Cards (4 items/row) */}
          {displayHotels.length ? (
            <div className="hotel-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {displayHotels.map((hotel) => (
                <HotelCard hotel={hotel} key={hotel._id} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>{t("Khách Sạn & Villa Nổi Bật", lang)}</h3>
              <p>{t("Nơi lưu trú hạng sang được đánh giá cao bởi cộng đồng du khách", lang)}</p>
            </div>
          )}

          {/* Nút Xem thêm */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
            <Link
              href="/search"
              className="btn-secondary"
              style={{
                padding: "12px 28px",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {t("Khám phá tất cả", lang)} ({filteredHotels.length}) <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. PROMISE FOOTER ───────────────────────────────── */}
      <section className="promise shell" aria-labelledby="promise-heading">
        <div>
          <span className="promise-icon" aria-hidden="true"><Sparkles size={22} /></span>
          <h3 id="promise-heading">{t("HuKi Pick", lang)}</h3>
          <p>{t("Nơi lưu trú hạng sang được đánh giá cao bởi cộng đồng du khách", lang)}</p>
        </div>
        <div>
          <span className="promise-icon" aria-hidden="true"><ShieldCheck size={22} /></span>
          <h3>{t("Chính sách Cọc 30%", lang)}</h3>
          <p>{t("Linh hoạt giữ chỗ - Hoàn tiền 100% khi hủy trước 48h", lang)}</p>
        </div>
        <div>
          <span className="promise-icon" aria-hidden="true"><Headphones size={22} /></span>
          <h3>{t("Hỗ Trợ 24/7 Toàn Cầu", lang)}</h3>
          <p>{t("Nền tảng tích hợp du lịch toàn diện: Đặt phòng + Vé xe + Thuê xe + Ẩm thực + Trải nghiệm.", lang)}</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="footer">
        <div className="shell footer-inner">
          <Link href="/" className="brand brand-light">HuKi<span className="z"> Travel</span></Link>
          <div className="footer-links">
            <Link href="/search">{t("Khách Sạn & Villa", lang)}</Link>
            <Link href="#search-banner">{t("Vé Xe Khách", lang)}</Link>
            <Link href="#search-banner">{t("Thuê Xe Tự Lái", lang)}</Link>
            <Link href="#taste-section">{t("Ẩm Thực Đặc Sản & Quán Ngon", lang).split("&")[0]}</Link>
            <Link href="#experiences-section">{t("Trải Nghiệm & Điểm Sống Ảo", lang).split("&")[0]}</Link>
            <Link href="/login">{t("Đăng Nhập", lang)}</Link>
            <Link href="/auth/register">{t("Đăng Ký", lang)}</Link>
          </div>
          <p>{t("Bản quyền thuộc về HuKi Travel Ecosystem.", lang)} · {t("Trụ sở: Tòa nhà HuKi Center, TP. Hồ Chí Minh, Việt Nam", lang)}</p>
        </div>
      </footer>
    </main>
  );
}
