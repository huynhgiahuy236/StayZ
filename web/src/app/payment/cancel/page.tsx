"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { XCircle, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { t, Language } from "@/lib/i18n";

export default function PaymentCancelPage() {
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
          <div className="payment-icon cancel" aria-hidden="true">
            <XCircle size={36} />
          </div>
          <h1>{t("Thanh toán bị hủy", lang)}</h1>
          <p>
            {t("Bạn đã hủy quá trình thanh toán. Đặt phòng của bạn vẫn còn ở trạng thái chờ thanh toán trong vòng 15 phút.", lang)}
          </p>
          <p style={{ marginTop: "var(--sp-4)", fontSize: 13, color: "var(--color-ink-3)" }}>
            {t("Bạn có thể quay lại để hoàn tất thanh toán bất cứ lúc nào.", lang)}
          </p>
          <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", marginTop: "var(--sp-8)", flexWrap: "wrap" }}>
            <Link href="/profile/bookings" className="btn-primary" style={{ textDecoration: "none" }}>
              {t("Xem đặt phòng của tôi", lang)}
            </Link>
            <Link href="/search" className="btn-outline" style={{ textDecoration: "none", color: "var(--navy)", border: "1.5px solid var(--navy)" }}>
              {t("Tìm khách sạn khác", lang)}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
