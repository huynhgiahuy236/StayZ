"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { t, Language } from "@/lib/i18n";

export default function PaymentReturnPage() {
  const [lang, setLang] = useState<Language>("vi");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(saved);
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main id="main-content">
        <SiteHeader />
        <div className="payment-page">
          <div className="payment-card">
            <div style={{ display: "flex", justifyContent: "center", padding: "var(--sp-24)" }}>
              <Loader2 size={32} style={{ animation: "spin .7s linear infinite", color: "var(--navy)" }} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content">
      <SiteHeader lang={lang} onLangChange={setLang} />
      <div className="payment-page">
        <div className="payment-card">
          <div className="payment-icon success" aria-hidden="true">
            <CheckCircle2 size={36} />
          </div>
          <h1>{t("Thanh toán thành công!", lang)}</h1>
          <p>
            {t("Đặt phòng của bạn đã được xác nhận. Thông tin vé điện tử và mã QR Check-in đã được khởi tạo.", lang)}
          </p>

          {/* Digital Booking Pass E-Ticket */}
          <div style={{
            margin: "24px 0",
            padding: "20px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
            color: "#fff",
            textAlign: "center",
            boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
            border: "1px solid rgba(251, 191, 36, 0.4)"
          }}>
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#fbbf24", fontWeight: 800 }}>
              {t("STAYZ DIGITAL BOOKING PASS", lang)}
            </span>
            <h3 style={{ margin: "8px 0 4px", fontSize: 18, color: "#fff" }}>{t("Vé Điện Tử Nhận Phòng Khách Sạn", lang)}</h3>
            <p style={{ fontSize: 12, opacity: 0.8, margin: "0 0 16px" }}>{t("Vui lòng xuất trình mã QR này tại quầy Lễ tân", lang)}</p>

            {/* QR Placeholder / Pass Code Box */}
            <div style={{
              background: "#fff",
              color: "#0f172a",
              padding: "16px",
              borderRadius: "12px",
              display: "inline-block",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}>
              <div style={{ fontSize: 40, margin: "0 0 8px" }}>📱 QR</div>
              <strong style={{ fontSize: 16, fontFamily: "monospace", letterSpacing: 1, color: "#1e3a8a" }}>
                STAYZ-CHECKIN:OK
              </strong>
            </div>

            <p style={{ fontSize: 12, color: "#fbbf24", marginTop: 12, margin: 0 }}>
              ✓ {t("Quét mã check-in tức thì không cần chờ làm thủ tục", lang)}
            </p>
          </div>

          <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginTop: "var(--sp-6)", flexWrap: "wrap" }}>
            <Link href="/profile/bookings" className="btn-primary" style={{ textDecoration: "none" }}>
              {t("Xem đặt phòng của tôi", lang)}
            </Link>
            <Link href="/" className="btn-outline" style={{ textDecoration: "none", color: "var(--navy)", border: "1.5px solid var(--navy)" }}>
              {t("Về trang chủ", lang)}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
