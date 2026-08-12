"use client";
import Link from "next/link";
import { Compass, Camera, Trees, Landmark, Sparkles } from "lucide-react";
import type { Destination } from "@/lib/types";
import { Language, t } from "@/lib/i18n";

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

const CATEGORY_MAP: Record<string, { labelKey: string; icon: any; color: string }> = {
  nature: { labelKey: "Thiên nhiên", icon: Trees, color: "#10b981" },
  culture: { labelKey: "Văn hóa", icon: Landmark, color: "#8b5cf6" },
  entertainment: { labelKey: "Giải trí", icon: Sparkles, color: "#f59e0b" },
  checkin: { labelKey: "Sống ảo", icon: Camera, color: "#ec4899" },
};

export function ExperiencesSection({ destinations, lang = "vi" }: Props) {
  const allActivities = destinations.flatMap((d) => {
    const cityName = getI18nText(d.name, lang, "");
    return (d.activities || []).map((a) => ({
      ...a,
      cityName,
      destinationSlug: d.slug,
    }));
  });

  if (!allActivities.length) return null;
  const displayActivities = allActivities.slice(0, 8); // 8 items (4 per row)

  return (
    <section className="section warm" id="experiences-section" aria-labelledby="exp-heading" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Compass size={14} className="text-gold" /> {t("HUKI EXPERIENCE", lang)}
            </p>
            <h2 id="exp-heading">{t("Trải Nghiệm & Điểm Sống Ảo", lang)}</h2>
            <p className="section-sub">{t("Những hoạt động & góc chụp hình triệu view không thể bỏ qua", lang)}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginTop: 24 }}>
          {displayActivities.map((act, idx) => {
            const title = getI18nText(act.title, lang, "Trải nghiệm du lịch");
            const desc = getI18nText(act.description, lang, "Khám phá địa danh độc đáo.");
            const loc = getI18nText(act.location_name, lang, act.cityName);
            const img = act.image_url || "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=85";
            const catInfo = CATEGORY_MAP[act.category || "checkin"] || CATEGORY_MAP.checkin;
            const CatIcon = catInfo.icon;
            const categoryLabel = t(catInfo.labelKey, lang);

            return (
              <div
                key={act.slug || idx}
                style={{
                  background: "#ffffff",
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
                      background: catInfo.color,
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 100,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <CatIcon size={12} /> {categoryLabel}
                  </span>
                </div>

                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1, justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: "var(--color-ink, #0f172a)" }}>{title}</h3>
                    <p style={{ fontSize: 12, color: "var(--color-ink-2, #64748b)", marginTop: 4, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{desc}</p>
                  </div>

                  <div style={{ borderTop: "1px solid var(--color-border, #f1f5f9)", paddingTop: 10, marginTop: 6, fontSize: 11, color: "var(--color-ink-2, #475569)" }}>
                    📍 <strong>{loc}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nút Xem thêm */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <Link
            href="/search?category=activity"
            className="btn-secondary"
            style={{
              padding: "12px 28px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {t("Xem thêm", lang)} ({allActivities.length})
          </Link>
        </div>
      </div>
    </section>
  );
}
