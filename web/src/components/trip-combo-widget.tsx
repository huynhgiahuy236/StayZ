"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Clock, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface Props {
  lang?: Language;
}

export function TripComboWidget({ lang = "vi" }: Props) {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <section className="shell" style={{ margin: "48px auto" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: 24,
          padding: "36px 40px",
          color: "#fff",
          boxShadow: "0 20px 40px -10px rgba(15,23,42,0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span
                style={{
                  background: "rgba(251, 191, 36, 0.2)",
                  color: "#fbbf24",
                  fontSize: 12,
                  fontWeight: 800,
                  padding: "6px 14px",
                  borderRadius: 100,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Sparkles size={14} /> HUKI TRIP COMBO BUNDLE (-10%)
              </span>

              {/* 10-Minute Global Countdown Timer Badge */}
              <span
                style={{
                  background: "rgba(239, 68, 68, 0.2)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  color: "#f87171",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: 100,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Clock size={14} /> Hold Timer: <strong>{timeFormatted}</strong>
              </span>
            </div>

            <h2 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 12px 0", color: "#ffffff", lineHeight: 1.3 }}>
              {t("combo_widget_title", lang)}
            </h2>

            <p style={{ fontSize: 14, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
              {t("combo_widget_desc", lang)}
            </p>

            <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, color: "#cbd5e1" }}>
                <CheckCircle2 size={15} style={{ color: "#10b981" }} /> {t("combo_feature_lock", lang)}
              </span>
              <span style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, color: "#cbd5e1" }}>
                <CheckCircle2 size={15} style={{ color: "#10b981" }} /> {t("combo_feature_refund", lang)}
              </span>
              <span style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, color: "#cbd5e1" }}>
                <CheckCircle2 size={15} style={{ color: "#10b981" }} /> {t("combo_feature_pass", lang)}
              </span>
            </div>
          </div>

          <Link
            href="/search?tab=combo"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
              color: "#000000",
              fontWeight: 800,
              fontSize: 15,
              padding: "16px 32px",
              borderRadius: 100,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 6px 20px rgba(251, 191, 36, 0.4)",
              transition: "transform 0.2s ease",
            }}
          >
            {t("combo_button", lang)} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
