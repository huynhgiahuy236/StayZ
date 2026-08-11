"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Globe, MapPin, Star } from "lucide-react";
import type { Destination } from "@/lib/types";

interface Props {
  destinations: Destination[];
}

function getI18nText(field: unknown, fallback: string): string {
  if (!field) return fallback;
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    const obj = field as Record<string, string>;
    return obj.vi || obj.en || fallback;
  }
  return fallback;
}

export function DestinationsSection({ destinations }: Props) {
  const [filter, setFilter] = useState<"all" | "domestic" | "international">("all");

  const filtered = destinations.filter((dest) => {
    if (filter === "domestic") return dest.is_domestic === true;
    if (filter === "international") return dest.is_domestic === false;
    return true;
  });

  return (
    <section className="section shell" aria-labelledby="destinations-heading">
      <div className="section-heading" style={{ flexWrap: "wrap", gap: 16 }}>
        <div>
          <p className="eyebrow dark" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Globe size={14} className="text-gold" /> Điểm đến mơ ước
          </p>
          <h2 id="destinations-heading">Khám phá thế giới cùng StayZ</h2>
        </div>

        {/* Tab filters */}
        <div style={{ display: "flex", gap: 8, background: "var(--color-bg-alt, #f5f5f7)", padding: 4, borderRadius: 100 }}>
          <button
            onClick={() => setFilter("all")}
            className={`btn-tab ${filter === "all" ? "active" : ""}`}
            style={{
              padding: "6px 16px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              border: 0,
              cursor: "pointer",
              background: filter === "all" ? "var(--color-ink, #0f172a)" : "transparent",
              color: filter === "all" ? "#fff" : "var(--color-ink-2, #475569)",
              transition: "all 0.2s ease",
            }}
          >
            Tất cả ({destinations.length})
          </button>
          <button
            onClick={() => setFilter("domestic")}
            className={`btn-tab ${filter === "domestic" ? "active" : ""}`}
            style={{
              padding: "6px 16px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              border: 0,
              cursor: "pointer",
              background: filter === "domestic" ? "var(--color-ink, #0f172a)" : "transparent",
              color: filter === "domestic" ? "#fff" : "var(--color-ink-2, #475569)",
              transition: "all 0.2s ease",
            }}
          >
            🇻🇳 Trong nước
          </button>
          <button
            onClick={() => setFilter("international")}
            className={`btn-tab ${filter === "international" ? "active" : ""}`}
            style={{
              padding: "6px 16px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              border: 0,
              cursor: "pointer",
              background: filter === "international" ? "var(--color-ink, #0f172a)" : "transparent",
              color: filter === "international" ? "#fff" : "var(--color-ink-2, #475569)",
              transition: "all 0.2s ease",
            }}
          >
            🌏 Quốc tế
          </button>
        </div>
      </div>

      <div className="destination-grid" style={{ marginTop: 24 }}>
        {filtered.map((dest, index) => {
          const name = getI18nText(dest.name, "Điểm đến");
          const country = getI18nText(dest.country, dest.is_domestic ? "Việt Nam" : "Quốc tế");
          const summary = getI18nText(dest.summary, "Trải nghiệm lưu trú tuyệt vời cùng StayZ.");
          const bgImg = dest.hero_image || dest.gallery?.[0] || "/hotel-placeholder.svg";

          return (
            <Link
              href={`/search?city=${encodeURIComponent(dest.slug)}`}
              className={`destination-card destination-${(index % 4) + 1}`}
              key={dest.slug || dest._id}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.85) 100%), url("${bgImg}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden",
                borderRadius: 16,
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 24,
                color: "#fff",
                textDecoration: "none",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
              }}
              aria-label={`Khám phá ${name}`}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    background: dest.is_domestic ? "rgba(255, 255, 255, 0.2)" : "rgba(234, 179, 8, 0.9)",
                    backdropFilter: "blur(8px)",
                    color: dest.is_domestic ? "#fff" : "#000",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 100,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {dest.is_domestic ? "🇻🇳 Việt Nam" : `🌏 ${country}`}
                </span>

                {dest.discount_badge && (
                  <span
                    style={{
                      background: "#ef4444",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: 100,
                    }}
                  >
                    -{dest.discount_badge}
                  </span>
                )}
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#fff" }}>{name}</h3>
                  {dest.rating && (
                    <span style={{ fontSize: 13, color: "#facc15", display: "inline-flex", alignItems: "center", gap: 2, fontWeight: 600 }}>
                      <Star size={13} fill="#facc15" /> {dest.rating}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, opacity: 0.9, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {summary}
                </p>
              </div>

              <span
                className="round-arrow"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 20,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <ArrowUpRight size={18} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
