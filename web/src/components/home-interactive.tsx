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

export function HomeInteractive({ initialHotels, initialDestinations }: Props) {
  const [lang, setLang] = useState<Language>("vi");
  const [activeHotelTab, setActiveHotelTab] = useState("all");
  const [selectedCountryCode, setSelectedCountryCode] = useState("vn");

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(saved);
  }, []);

  function handleLangChange(newLang: Language) {
    setLang(newLang);
    localStorage.setItem("stayz_lang", newLang);
  }

  // Filter Hotels based on selected tab
  const filteredHotels = initialHotels.filter((h) => {
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
      {/* ── 1. HERO BANNER & SEARCH BAR ────────────────────────── */}
      <section className="hero" aria-label="HuKi Travel Homepage">
        <SiteHeader transparent lang={lang} onLangChange={handleLangChange} />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content shell">
          <p className="eyebrow" style={{ letterSpacing: "1.5px", textTransform: "uppercase" }}>
            {t("hero_slogan", lang)}
          </p>
          <h1>
            {t("hero_title_1", lang)}<br />
            <em>{t("hero_title_2", lang)}</em>
          </h1>
          <p className="hero-copy">
            {t("hero_subtitle", lang)}
          </p>

          <SearchBar lang={lang} />

          <div className="trust-row">
            <span><BadgeCheck size={14} aria-hidden="true" /> {t("deposit_badge", lang)}</span>
            <span><ShieldCheck size={14} aria-hidden="true" /> {t("deposit_desc", lang)}</span>
            <span><Headphones size={14} aria-hidden="true" /> {t("trust_support", lang)}</span>
          </div>
        </div>
      </section>

      {/* ── 2. QUICK STATS BAR ────────────────────────────────── */}
      <section style={{ background: "var(--color-ink, #0f172a)", color: "#fff", padding: "28px 0" }}>
        <div className="shell" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--gold, #fbbf24)" }}>12</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{t("stat_destinations", lang)}</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--gold, #fbbf24)" }}>1.100+</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{t("stat_properties", lang)}</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--gold, #fbbf24)" }}>700+</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{t("stat_foods", lang)}</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--gold, #fbbf24)" }}>1.100+</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>{t("stat_activities", lang)}</div>
          </div>
        </div>
      </section>

      {/* ── 3. WORLD COUNTRIES OVERVIEW (Render 12 Quốc gia) ────── */}
      <CountriesSection lang={lang} onSelectCountry={(code) => setSelectedCountryCode(code)} />

      {/* ── 4. COUNTRY DETAIL SLIDERS (8 items + Button Filter Quốc gia) ── */}
      <CountrySliders
        destinations={initialDestinations}
        lang={lang}
        selectedCountry={selectedCountryCode}
        onSelectCountry={(code) => setSelectedCountryCode(code)}
      />

      {/* ── 5. TASTE OF HUKI (8 items + Nút Xem thêm) ───────────── */}
      <TasteSection destinations={initialDestinations} lang={lang} />

      {/* ── 6. HUKI EXPERIENCES (8 items + Nút Xem thêm) ───────── */}
      <ExperiencesSection destinations={initialDestinations} lang={lang} />

      {/* ── 7. EXCLUSIVE 30% DEPOSIT OFFER BANNER ──────────────── */}
      <section className="shell" style={{ margin: "40px auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            borderRadius: 24,
            padding: "36px 40px",
            color: "#fff",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            boxShadow: "0 10px 30px -5px rgba(15,23,42,0.3)",
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <span
              style={{
                background: "rgba(251, 191, 36, 0.2)",
                color: "var(--gold, #fbbf24)",
                fontSize: 12,
                fontWeight: 700,
                padding: "6px 14px",
                borderRadius: 100,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              🔥 HuKi Exclusive
            </span>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: "12px 0 8px 0", color: "#fff" }}>
              {t("deposit_badge", lang)}
            </h2>
            <p style={{ fontSize: 14, opacity: 0.85, margin: 0, lineHeight: 1.6 }}>
              {t("deposit_desc", lang)}
            </p>
          </div>

          <Link
            href="/search"
            style={{
              background: "var(--gold, #fbbf24)",
              color: "#000",
              fontWeight: 800,
              fontSize: 15,
              padding: "14px 28px",
              borderRadius: 100,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 15px rgba(251, 191, 36, 0.4)",
            }}
          >
            {t("search_button", lang)} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── 8. FEATURED HOTELS GRID (8 Items + 4 Filter Tabs + Nút Xem thêm) ── */}
      <section className="section warm" aria-labelledby="featured-heading">
        <div className="shell">
          <div className="section-heading" style={{ marginBottom: 20 }}>
            <div>
              <p className="eyebrow dark">{t("stayz_pick", lang)}</p>
              <h2 id="featured-heading">{t("hotels_title", lang)}</h2>
              <p className="section-sub">{t("hotels_subtitle", lang)}</p>
            </div>
          </div>

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
            <div className="hotel-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {displayHotels.map((hotel) => (
                <HotelCard hotel={hotel} key={hotel._id} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>{t("hotels_title", lang)}</h3>
              <p>{t("hotels_subtitle", lang)}</p>
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
              {t("view_all", lang)} ({filteredHotels.length}) <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. TESTIMONIALS & PROMISE FOOTER ──────────────────── */}
      <section className="promise shell" aria-labelledby="promise-heading">
        <div>
          <span className="promise-icon" aria-hidden="true"><Sparkles size={22} /></span>
          <h3 id="promise-heading">{t("stayz_pick", lang)}</h3>
          <p>{t("hotels_subtitle", lang)}</p>
        </div>
        <div>
          <span className="promise-icon" aria-hidden="true"><ShieldCheck size={22} /></span>
          <h3>{t("deposit_badge", lang)}</h3>
          <p>{t("deposit_desc", lang)}</p>
        </div>
        <div>
          <span className="promise-icon" aria-hidden="true"><Headphones size={22} /></span>
          <h3>{t("trust_support", lang)}</h3>
          <p>{t("footer_desc", lang)}</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="footer">
        <div className="shell footer-inner">
          <Link href="/" className="brand brand-light">HuKi<span className="z"> Travel</span></Link>
          <div className="footer-links">
            <Link href="/search">{t("nav_stays", lang)}</Link>
            <Link href="#search-banner">{t("nav_bus", lang)}</Link>
            <Link href="#search-banner">{t("nav_ride", lang)}</Link>
            <Link href="#taste-section">{t("taste_title", lang).split("&")[0]}</Link>
            <Link href="#experiences-section">{t("experiences_title", lang).split("&")[0]}</Link>
            <Link href="/login">{t("nav_login", lang)}</Link>
            <Link href="/auth/register">{t("nav_signup", lang)}</Link>
          </div>
          <p>{t("footer_rights", lang)} · {t("footer_address", lang)}</p>
        </div>
      </footer>
    </main>
  );
}
