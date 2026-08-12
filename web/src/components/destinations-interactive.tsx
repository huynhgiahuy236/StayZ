"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Compass, Star } from "lucide-react";
import { t, Language } from "@/lib/i18n";

interface Props {
  countries: { code: string; label: string }[];
  currentCountry: string;
  destinations: any[];
  currentPage: number;
  totalPages: number;
}

export function DestinationsInteractive({
  countries,
  currentCountry,
  destinations,
  currentPage,
  totalPages,
}: Props) {
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
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#fff", padding: "60px 20px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ color: "#fbbf24", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            <Compass size={14} style={{ display: "inline-block", verticalAlign: "middle" }} /> StayZ Destinations Portal
          </p>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 12 }}>{t("destinations_title", lang)}</h1>
          <p style={{ opacity: 0.85, fontSize: "1.05rem" }}>
            {t("destinations_subtitle", lang)}
          </p>
        </div>
      </section>

      <div className="shell" style={{ paddingTop: 36, paddingBottom: 60 }}>
        {/* Filter buttons */}
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 16, marginBottom: 30 }} className="no-scrollbar">
          {countries.map((c) => (
            <Link
              key={c.code}
              href={`/destinations?country=${c.code}`}
              style={{
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 600,
                whiteSpace: "nowrap",
                background: currentCountry === c.code ? "#0f172a" : "#fff",
                color: currentCountry === c.code ? "#fbbf24" : "#475569",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
              }}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {/* Destination grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginBottom: 40 }}>
          {destinations.map((d) => {
            const nameText = getLangText(d.name);
            const noteText = getLangText(d.summary);
            return (
              <Link href={`/search?city=${d.slug}`} key={d._id || d.slug} style={{ textDecoration: "none" }}>
                <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                  <div style={{ height: 180, position: "relative" }}>
                    <img src={d.hero_image} alt={nameText} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(15,23,42,0.8)", color: "#fbbf24", padding: "4px 8px", borderRadius: 100, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      <Star size={12} fill="#fbbf24" /> {d.rating || 4.9}
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>{nameText}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.4 }}>{noteText || "Amazing location"}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/destinations?country=${currentCountry}&page=${p}`}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  background: currentPage === p ? "#0f172a" : "#fff",
                  color: currentPage === p ? "#fbbf24" : "#475569",
                  border: "1px solid #cbd5e1",
                }}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
