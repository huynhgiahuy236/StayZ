"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Compass, Star, Utensils, Camera, ArrowLeft } from "lucide-react";
import { t, Language } from "@/lib/i18n";

interface CountryInteractiveProps {
  countryInfo: {
    name: string;
    flag: string;
    slogan: string;
    hero: string;
  };
  destinations: any[];
  hotels: any[];
  foods: any[];
  activities: any[];
}

export function CountryDetailInteractive({
  countryInfo,
  destinations,
  hotels,
  foods,
  activities,
}: CountryInteractiveProps) {
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(saved);

    const handleLangChange = (e: CustomEvent<{ lang: Language }>) => {
      if (e.detail?.lang) {
        setLang(e.detail.lang);
      }
    };

    window.addEventListener("stayz_lang_changed" as any, handleLangChange as any);
    return () => window.removeEventListener("stayz_lang_changed" as any, handleLangChange as any);
  }, []);

  const getLangText = (obj: any) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.vi || obj.en || "";
  };

  return (
    <>
      {/* Hero Banner */}
      <section
        style={{
          position: "relative",
          minHeight: 380,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          padding: "80px 20px 40px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${countryInfo.hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.55)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 800 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#fbbf24",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 16,
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> {t("back_home", lang)}
          </Link>
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: 800,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span>{countryInfo.flag}</span>
            <span>{countryInfo.name}</span>
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.9, marginBottom: 24, lineHeight: 1.6 }}>
            {countryInfo.slogan}
          </p>
          <div
            style={{
              display: "inline-flex",
              gap: 20,
              background: "rgba(15,23,42,0.6)",
              backdropFilter: "blur(10px)",
              padding: "12px 24px",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span>
              📍 <strong>{destinations.length}</strong> {t("stat_destinations", lang)}
            </span>
            <span>
              🏨 <strong>{hotels.length || 8}</strong> {t("hotels_5star", lang)}
            </span>
            <span>
              🍲 <strong>{foods.length || 8}</strong> {t("specialty_dishes", lang)}
            </span>
            <span>
              📸 <strong>{activities.length || 12}</strong> {t("hot_checkins", lang)}
            </span>
          </div>
        </div>
      </section>

      <div className="shell" style={{ paddingTop: 40, paddingBottom: 60 }}>
        {/* DESTINATIONS SECTION */}
        <section style={{ marginBottom: 50 }}>
          <div style={{ marginBottom: 20 }}>
            <p
              className="eyebrow"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "#d97706",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <Compass size={14} /> {t("csdl_level", lang)}
            </p>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>
              {t("destinations_in_country", lang)} {countryInfo.name}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {destinations.map((d) => {
              const nameText = getLangText(d.name);
              const noteText = getLangText(d.summary);
              return (
                <Link href={`/search?city=${d.slug}`} key={d._id || d.slug} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div style={{ height: 180, position: "relative" }}>
                      <img
                        src={d.hero_image}
                        alt={nameText}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "rgba(15,23,42,0.8)",
                          color: "#fbbf24",
                          padding: "4px 8px",
                          borderRadius: 100,
                          fontSize: 12,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Star size={12} fill="#fbbf24" /> {d.rating || 4.9}
                      </div>
                    </div>
                    <div style={{ padding: 16 }}>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
                        {nameText}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.4 }}>
                        {noteText || "Amazing Destination"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FOODS SECTION */}
        {foods.length > 0 && (
          <section style={{ marginBottom: 50 }}>
            <div style={{ marginBottom: 20 }}>
              <p
                className="eyebrow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#d97706",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                <Utensils size={14} /> {t("taste_title", lang)}
              </p>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>
                {t("taste_subtitle", lang)}
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
              {foods.map((food, idx) => {
                const foodName = getLangText(food.name);
                const foodDesc = getLangText(food.description);
                return (
                  <div
                    key={idx}
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      padding: 16,
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                      {foodName}
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#64748b" }}>{foodDesc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ACTIVITIES SECTION */}
        {activities.length > 0 && (
          <section>
            <div style={{ marginBottom: 20 }}>
              <p
                className="eyebrow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#d97706",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                <Camera size={14} /> {t("experiences_title", lang)}
              </p>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>
                {t("experiences_subtitle", lang)}
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
              {activities.map((act, idx) => {
                const actName = getLangText(act.name);
                const actDesc = getLangText(act.description);
                return (
                  <div
                    key={idx}
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      padding: 16,
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
                      {actName}
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#64748b" }}>{actDesc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
