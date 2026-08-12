"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Clock, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface Props {
  lang?: Language;
}

export function TripComboWidget({ lang: initialLang = "vi" }: Props) {
  const [lang, setLang] = useState<Language>(initialLang);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || initialLang || "vi";
    setLang(saved);

    const handleLangChange = (e: CustomEvent<{ lang: Language }>) => {
      if (e.detail?.lang) {
        setLang(e.detail.lang);
      }
    };

    window.addEventListener("stayz_lang_changed" as any, handleLangChange as any);
    return () => window.removeEventListener("stayz_lang_changed" as any, handleLangChange as any);
  }, [initialLang]);

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
          background: "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,41,59,0.96) 100%), url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2560&q=80') center/cover no-repeat",
          borderRadius: 24,
          padding: "40px",
          color: "#fff",
          boxShadow: "0 20px 40px -10px rgba(15,23,42,0.45)",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(251, 191, 36, 0.3)"
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <span
                style={{
                  background: "rgba(251, 191, 36, 0.25)",
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
                  background: "rgba(239, 68, 68, 0.3)",
                  border: "1px solid rgba(239, 68, 68, 0.5)",
                  color: "#fca5a5",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: 100,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Clock size={14} /> {t("Thời gian giữ chỗ", lang)}: <strong>{timeFormatted}</strong>
              </span>
            </div>

            <h2 style={{ fontSize: 32, fontWeight: 900, margin: "8px 0 12px 0", color: "#ffffff", lineHeight: 1.2 }}>
              {t("Gom Chuyến Đi Đa Dịch Vụ · Tiết Kiệm Ngay 10%", lang)}
            </h2>

            <p style={{ fontSize: 14, color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>
              {t("Kết hợp Vé máy bay/Xe khách + Khách sạn + Thuê xe tự lái vào 1 chuyến đi duy nhất. Khóa giữ chỗ 10 phút.", lang)}
            </p>

            <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, color: "#f8fafc" }}>
                <CheckCircle2 size={16} style={{ color: "#34d399" }} /> {t("Tự động khóa chỗ 10 phút", lang)}
              </span>
              <span style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, color: "#f8fafc" }}>
                <CheckCircle2 size={16} style={{ color: "#34d399" }} /> {t("Hoàn 100% cọc hủy trước 48h", lang)}
              </span>
              <span style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, color: "#f8fafc" }}>
                <CheckCircle2 size={16} style={{ color: "#34d399" }} /> {t("Ví vé QR Code Động 30s", lang)}
              </span>
            </div>

            <div style={{ marginTop: 32 }}>
              <Link
                href="/trip-combo"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                  color: "#000000",
                  fontWeight: 800,
                  fontSize: 15,
                  padding: "16px 36px",
                  borderRadius: 100,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: "0 8px 25px rgba(251, 191, 36, 0.45)",
                  transition: "all 0.2s ease",
                }}
              >
                {t("Tạo Chuyến Đi Combo", lang)} <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Right: Interactive 3-Step Infographic Card */}
          <div style={{
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: 20,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>
            <h4 style={{ margin: 0, fontSize: 14, textTransform: "uppercase", letterSpacing: 1, color: "#fbbf24", fontWeight: 800 }}>
              💡 {t("Quy Trình Gom Chuyến Tự Động", lang)}
            </h4>

            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: 12 }}>
              <span style={{ background: "#fbbf24", color: "#0f172a", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>1</span>
              <div>
                <strong style={{ fontSize: 14, display: "block", color: "#fff" }}>{t("Chọn Phương Tiện Di Chuyển", lang)}</strong>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{t("Vé máy bay hoặc Xe khách 2 tầng", lang)}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", background: "rgba(255,255,255,0.06)", borderRadius: 12 }}>
              <span style={{ background: "#fbbf24", color: "#0f172a", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>2</span>
              <div>
                <strong style={{ fontSize: 14, display: "block", color: "#fff" }}>{t("Thêm Nơi Lưu Trú & Xe Tự Lái", lang)}</strong>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{t("Khách sạn 4-5 sao hoặc Xe máy/Ô tô", lang)}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 12 }}>
              <span style={{ background: "#10b981", color: "#fff", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>✓</span>
              <div>
                <strong style={{ fontSize: 14, display: "block", color: "#fbbf24" }}>{t("Nhận Giảm Giá 10% Tức Thì", lang)}</strong>
                <span style={{ fontSize: 12, color: "#e2e8f0" }}>{t("Tự động giữ chỗ 10 phút & Xuất Vé QR", lang)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
