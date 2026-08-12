"use client";
import Link from "next/link";
import { Utensils } from "lucide-react";
import type { Destination } from "@/lib/types";
import { Language, t } from "@/lib/i18n";
import { useState } from "react";
import { getDistinctVisualImage } from "@/lib/unique-images";
import { getMasterDataForCountry } from "@/lib/master-data";
import { CountryFilterTabs } from "@/components/country-filter-tabs";

interface Props {
  destinations: Destination[];
  lang?: Language;
}

function getI18nText(field: unknown, lang: Language, fallback: string): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    const obj = field as Record<string, string>;
    return obj[lang] || obj.vi || obj.en || fallback;
  }
  return fallback;
}

export function TasteSection({ destinations, lang = "vi" }: Props) {
  const [selectedCountry, setSelectedCountry] = useState("all");

  const masterData = getMasterDataForCountry(selectedCountry);
  const allFoods = masterData.foods;
  const displayFoods = allFoods.slice(0, 8); // 8 items (4 per row)

  return (
    <section className="section shell" id="taste-section" aria-labelledby="taste-heading" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="section-heading" style={{ marginBottom: 16 }}>
        <div>
          <p className="eyebrow dark" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Utensils size={14} className="text-gold" /> {t("TASTE OF STAYZ", lang)}
          </p>
          <h2 id="taste-heading">{t("Ẩm Thực Đặc Sản & Quán Ngon", lang)}</h2>
          <p className="section-sub">{t("Hương vị truyền thống địa phương chuẩn vị khó cưỡng", lang)}</p>
        </div>
      </div>

      {/* 12 Country Filter Tab Bar */}
      <CountryFilterTabs
        selectedCode={selectedCountry}
        onSelect={(code) => setSelectedCountry(code)}
        lang={lang}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginTop: 24,
        }}
        className="taste-grid-4-cols"
      >
        {displayFoods.map((food, idx) => {
          const title = getI18nText(food.title, lang, "Món ngon đặc sản");
          const desc = getI18nText(food.description, lang, "Trải nghiệm hương vị chuẩn vị.");
          const spots = (food.recommended_spots || []).map((s) => getI18nText(s, lang, ""));
          const img = getDistinctVisualImage("food", food.slug || title || `food-${idx}`, idx);

          return (
            <div
              key={food.slug || idx}
              style={{
                background: "var(--color-card-bg, #ffffff)",
                border: "1px solid var(--color-border, #e2e8f0)",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", height: 170, overflow: "hidden" }}>
                <img
                  src={img}
                  alt={title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: "rgba(15, 23, 42, 0.8)",
                    backdropFilter: "blur(6px)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 100,
                  }}
                >
                  📍 {(food as any).cityName || "Đặc sản"}
                </span>

                {food.price_range && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      background: "rgba(251, 191, 36, 0.95)",
                      color: "#000",
                      fontSize: 11,
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: 100,
                    }}
                  >
                    💰 {food.price_range}
                  </span>
                )}
              </div>

              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1, justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: "var(--color-ink, #0f172a)" }}>{title}</h3>
                  <p style={{ fontSize: 12, color: "var(--color-ink-2, #64748b)", marginTop: 4, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{desc}</p>
                </div>

                {spots.length > 0 && spots[0] !== "" && (
                  <div style={{ borderTop: "1px solid var(--color-border, #f1f5f9)", paddingTop: 10, marginTop: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "var(--gold, #d97706)", textTransform: "uppercase" }}>
                      {t("Địa chỉ gợi ý", lang)}:
                    </span>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-ink, #1e293b)", marginTop: 2 }}>
                      🏠 {spots.slice(0, 2).join(" • ")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Nút Xem thêm */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
        <Link
          href="/search?category=food"
          className="btn-secondary"
          style={{
            padding: "12px 28px",
            borderRadius: 100,
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          {t("Xem thêm", lang)} ({allFoods.length})
        </Link>
      </div>
    </section>
  );
}
