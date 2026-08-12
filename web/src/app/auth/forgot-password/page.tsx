"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { requestPasswordReset, verifyResetCode, resetPasswordWithCode } from "@/lib/api";
import { t, Language } from "@/lib/i18n";

type Step = "email" | "otp" | "password" | "done";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("vi");
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stayz_lang") as Language | null;
      if (saved) setLang(saved);
    }
  }, []);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email) { setError(t("Vui lòng nhập email của bạn.", lang)); return; }
    setLoading(true);
    const { error: err } = await requestPasswordReset(email);
    setLoading(false);
    if (err) { setError(err); return; }
    setStep("otp");
  }

  async function handleOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < 6) { setError(t("Nhập đủ 6 chữ số.", lang)); return; }
    setLoading(true);
    const { error: err } = await verifyResetCode(email, code);
    setLoading(false);
    if (err) { setError(err); return; }
    setStep("password");
  }

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError(t("Mật khẩu phải ít nhất 6 ký tự.", lang)); return; }
    if (password !== confirmPw) { setError(t("Mật khẩu xác nhận không khớp.", lang)); return; }
    setLoading(true);
    const { error: err } = await resetPasswordWithCode(email, otp.join(""), password);
    setLoading(false);
    if (err) { setError(err); return; }
    setStep("done");
  }

  function handleOtpChange(idx: number, val: string) {
    const v = val.replace(/\D/, "").slice(-1);
    const next = [...otp]; next[idx] = v; setOtp(next);
    if (v && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (!v && idx > 0) otpRefs.current[idx - 1]?.focus();
  }

  return (
    <main className="auth-page" id="main-content">
      <div className="auth-visual" aria-hidden="true">
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: t("Đặt lại mật khẩu<br />an toàn & nhanh chóng", lang) }} />
          <p>{t("Chúng tôi sẽ gửi mã xác thực đến email của bạn.", lang)}</p>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-form-wrap">
          <Link href="/" className="auth-logo">Stay<span className="z">Z</span></Link>

          {step === "email" && (
            <>
              <h1 className="auth-title">{t("Quên mật khẩu?", lang)}</h1>
              <p className="auth-sub">{t("Nhập email của bạn để nhận mã đặt lại mật khẩu.", lang)}</p>
              <form onSubmit={handleEmail} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="fp-email">{t("Email", lang)}</label>
                  <input id="fp-email" type="email" className="form-input" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? <><Loader2 size={18} aria-hidden="true" /> {t("Đang gửi...", lang)}</> : t("Gửi mã đặt lại", lang)}
                </button>
              </form>
            </>
          )}

          {step === "otp" && (
            <>
              <h1 className="auth-title">{t("Nhập mã xác thực", lang)}</h1>
              <p className="auth-sub">{t("Mã 6 chữ số đã gửi đến", lang)} <strong>{email}</strong></p>
              <form onSubmit={handleOtp} noValidate>
                <div className="otp-inputs" role="group" aria-label={t("Mã OTP 6 chữ số", lang)}>
                  {otp.map((v, i) => (
                    <input key={i} ref={(el) => { otpRefs.current[i] = el; }} className="otp-input" type="text" inputMode="numeric" maxLength={1} value={v} onChange={(e) => handleOtpChange(i, e.target.value)} aria-label={`${t("Số", lang)} ${i + 1}`} />
                  ))}
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? <><Loader2 size={18} aria-hidden="true" /> {t("Đang xác thực...", lang)}</> : t("Xác nhận", lang)}
                </button>
              </form>
            </>
          )}

          {step === "password" && (
            <>
              <h1 className="auth-title">{t("Mật khẩu mới", lang)}</h1>
              <p className="auth-sub">{t("Tạo mật khẩu mới cho tài khoản của bạn.", lang)}</p>
              <form onSubmit={handlePassword} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="fp-pw">{t("Mật khẩu mới", lang)}</label>
                  <div style={{ position: "relative" }}>
                    <input id="fp-pw" type={showPw ? "text" : "password"} className="form-input" placeholder={t("Ít nhất 6 ký tự", lang)} value={password} onChange={(e) => setPassword(e.target.value)} required style={{ paddingRight: 44 }} />
                    <button type="button" onClick={() => setShowPw((p) => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: 0, cursor: "pointer", color: "var(--color-ink-3)" }} aria-label={showPw ? t("Ẩn", lang) : t("Hiện", lang)}>
                      {showPw ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="fp-confirm">{t("Xác nhận mật khẩu", lang)}</label>
                  <input id="fp-confirm" type="password" className="form-input" placeholder={t("Nhập lại mật khẩu", lang)} value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} required />
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? <><Loader2 size={18} aria-hidden="true" /> {t("Đang cập nhật...", lang)}</> : t("Cập nhật mật khẩu", lang)}
                </button>
              </form>
            </>
          )}

          {step === "done" && (
            <div style={{ textAlign: "center", paddingTop: "var(--sp-8)" }}>
              <CheckCircle2 size={56} style={{ color: "var(--color-success)", margin: "0 auto var(--sp-5)" }} aria-hidden="true" />
              <h1 className="auth-title">{t("Đặt lại thành công!", lang)}</h1>
              <p className="auth-sub">{t("Mật khẩu của bạn đã được cập nhật. Hãy đăng nhập lại.", lang)}</p>
              <Link href="/login" className="form-submit" style={{ display: "flex", textDecoration: "none", justifyContent: "center", marginTop: "var(--sp-8)" }}>
                {t("Đăng nhập ngay", lang)}
              </Link>
            </div>
          )}

          <p className="auth-alt"><Link href="/login">{t("← Quay lại đăng nhập", lang)}</Link></p>
        </div>
      </div>
    </main>
  );
}
