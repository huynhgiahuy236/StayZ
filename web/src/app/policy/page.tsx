"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck, Lock, FileText, CreditCard, RefreshCw } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { t, Language } from "@/lib/i18n";

export default function PolicyPage() {
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(saved);
  }, []);

  return (
    <main id="main-content" style={{ background: "var(--color-bg)", minHeight: "100dvh" }}>
      <SiteHeader />
      <section className="hero-policy" style={{ background: "linear-gradient(135deg, var(--navy), var(--navy-light))", color: "white", padding: "var(--sp-16) 0" }}>
        <div className="shell">
          <p className="eyebrow" style={{ color: "#e5b66d" }}>StayZ Policy & Terms</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-.04em" }}>
            {t("Chính sách & Điều khoản dịch vụ", lang)}
          </h1>
          <p style={{ opacity: .8, fontSize: 16, maxWidth: 600 }}>
            {t("Cam kết minh bạch về quyền lợi, quy định đặt hủy phòng và bảo mật dữ liệu khách hàng.", lang)}
          </p>
        </div>
      </section>

      <div className="shell" style={{ padding: "var(--sp-12) 0 var(--sp-24)", display: "grid", gridTemplateColumns: "1fr", gap: "var(--sp-8)", maxWidth: 900 }}>
        {/* Section 1 */}
        <div className="book-section">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", marginBottom: "var(--sp-3)" }}>
            <FileText size={24} style={{ color: "var(--navy)" }} aria-hidden="true" />
            <h2 style={{ borderBottom: 0, paddingBottom: 0, margin: 0 }}>{t("1. Quy định đặt phòng", lang)}</h2>
          </div>
          <p style={{ color: "var(--color-ink-2)", fontSize: 15, lineHeight: 1.7 }}>
            {t("Khách hàng có thể tìm kiếm và thực hiện đặt phòng trực tuyến thông qua nền tảng StayZ. Khi hoàn tất đặt phòng, thông tin booking sẽ được ghi nhận vào hệ thống và mã nhận phòng sẽ được tạo tự động. Quý khách vui lòng cung cấp đúng số lượng người lưu trú theo quy định của từng loại phòng.", lang)}
          </p>
        </div>

        {/* Section 2 */}
        <div className="book-section">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", marginBottom: "var(--sp-3)" }}>
            <RefreshCw size={24} style={{ color: "var(--navy)" }} aria-hidden="true" />
            <h2 style={{ borderBottom: 0, paddingBottom: 0, margin: 0 }}>{t("2. Chính sách hủy phòng & Hoàn tiền", lang)}</h2>
          </div>
          <ul style={{ color: "var(--color-ink-2)", fontSize: 15, lineHeight: 1.8, paddingLeft: 20 }}>
            <li><strong>{t("Hủy trước 7 ngày check-in:", lang)}</strong> {t("Hoàn tiền 100% số tiền đã thanh toán.", lang)}</li>
            <li><strong>{t("Hủy từ 3 - 7 ngày trước check-in:", lang)}</strong> {t("Hoàn tiền 50% số tiền đã thanh toán.", lang)}</li>
            <li><strong>{t("Hủy trong vòng 3 ngày hoặc không đến (No-show):", lang)}</strong> {t("Không áp dụng hoàn tiền.", lang)}</li>
            <li>{t("Mọi yêu cầu hủy phòng được thực hiện trực tiếp trên trang Đặt phòng của tôi.", lang)}</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="book-section">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", marginBottom: "var(--sp-3)" }}>
            <CreditCard size={24} style={{ color: "var(--navy)" }} aria-hidden="true" />
            <h2 style={{ borderBottom: 0, paddingBottom: 0, margin: 0 }}>{t("3. Phương thức thanh toán", lang)}</h2>
          </div>
          <p style={{ color: "var(--color-ink-2)", fontSize: 15, lineHeight: 1.7 }}>
            {t("StayZ hỗ trợ cổng thanh toán bảo mật PayOS (Mã QR VietQR, thẻ ATM nội địa, thẻ quốc tế). Khách hàng có thể lựa chọn:", lang)}
          </p>
          <ul style={{ color: "var(--color-ink-2)", fontSize: 15, lineHeight: 1.8, paddingLeft: 20, marginTop: 10 }}>
            <li><strong>{t("Thanh toán 100%:", lang)}</strong> {t("Xác nhận ngay lập tức.", lang)}</li>
            <li><strong>{t("Đặt cọc 30%:", lang)}</strong> {t("Giữ phòng và thanh toán 70% còn lại khi làm thủ tục nhận phòng tại khách sạn.", lang)}</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="book-section">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", marginBottom: "var(--sp-3)" }}>
            <Lock size={24} style={{ color: "var(--navy)" }} aria-hidden="true" />
            <h2 style={{ borderBottom: 0, paddingBottom: 0, margin: 0 }}>{t("4. Bảo mật thông tin cá nhân", lang)}</h2>
          </div>
          <p style={{ color: "var(--color-ink-2)", fontSize: 15, lineHeight: 1.7 }}>
            {t("StayZ cam kết bảo vệ dữ liệu cá nhân của người dùng. Mật khẩu được mã hóa an toàn, mã OTP xác thực email được giới hạn thời gian và số lần gửi. Thông tin thanh toán được xử lý thông qua đối tác thanh toán đạt chuẩn PCI-DSS.", lang)}
          </p>
        </div>
      </div>

      <footer className="footer">
        <div className="shell footer-inner">
          <Link href="/" className="brand brand-light">Stay<span className="z">Z</span></Link>
          <p>© 2026 StayZ · Stay somewhere unforgettable.</p>
        </div>
      </footer>
    </main>
  );
}
