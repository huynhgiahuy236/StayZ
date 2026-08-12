"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { requestRegisterOtp, verifyRegisterOtp, register } from "@/lib/api";
import { t, Language } from "@/lib/i18n";

type Step = "email" | "otp" | "password";

export default function RegisterPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("vi");
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
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

  // Step 1: Request OTP
  async function handleEmailStep(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !fullName) { setError(t("Vui lòng nhập đầy đủ thông tin.", lang)); return; }
    setLoading(true);
    const { error: err } = await requestRegisterOtp(email);
    setLoading(false);
    if (err) { setError(err); return; }
    setStep("otp");
  }

  // Step 2: Verify OTP
  async function handleOtpStep(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < 6) { setError(t("Vui lòng nhập đầy đủ 6 chữ số OTP.", lang)); return; }
    setLoading(true);
    const { error: err } = await verifyRegisterOtp(email, code);
    setLoading(false);
    if (err) { setError(err); return; }
    setStep("password");
  }

  // Step 3: Register
  async function handlePasswordStep(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError(t("Mật khẩu phải ít nhất 6 ký tự.", lang)); return; }
    if (password !== confirmPw) { setError(t("Mật khẩu xác nhận không khớp.", lang)); return; }
    setLoading(true);
    const { data, error: err } = await register({ email, password, full_name: fullName });
    setLoading(false);
    if (err || !data) { setError(err ?? t("Đăng ký thất bại. Vui lòng thử lại.", lang)); return; }
    // Save tokens
    const maxAge30d = 60 * 60 * 24 * 30;
    document.cookie = `stayz_access_token=${data.accessToken}; max-age=${60 * 15}; path=/; samesite=lax`;
    document.cookie = `stayz_refresh_token=${data.refreshToken}; max-age=${maxAge30d}; path=/; samesite=lax`;
    document.cookie = `stayz_user=${encodeURIComponent(JSON.stringify(data.user))}; max-age=${maxAge30d}; path=/; samesite=lax`;
    router.push("/");
    router.refresh();
  }

  function handleOtpChange(idx: number, val: string) {
    const v = val.replace(/\D/, "").slice(-1);
    const next = [...otp];
    next[idx] = v;
    setOtp(next);
    if (v && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (!v && idx > 0) otpRefs.current[idx - 1]?.focus();
  }

  function handleOtpKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  }

  async function resendOtp() {
    setError("");
    setLoading(true);
    await requestRegisterOtp(email);
    setLoading(false);
    setOtp(["", "", "", "", "", ""]);
    otpRefs.current[0]?.focus();
  }

  const stepIndex = step === "email" ? 0 : step === "otp" ? 1 : 2;

  return (
    <main className="auth-page" id="main-content">
      <div className="auth-visual" aria-hidden="true">
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: t("Bắt đầu hành trình<br />của bạn ngay hôm nay", lang) }} />
          <p>{t("Đăng ký để lưu những nơi yêu thích và đặt phòng dễ dàng hơn bao giờ hết.", lang)}</p>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-form-wrap">
          <Link href="/" className="auth-logo">Stay<span className="z">Z</span></Link>

          {/* Step indicator */}
          <div className="step-indicator" aria-label={t("Tiến trình đăng ký", lang)} role="progressbar" aria-valuenow={stepIndex + 1} aria-valuemax={3}>
            {[t("Thông tin", lang), t("Xác thực", lang), t("Mật khẩu", lang)].map((label, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className={`step-dot ${i < stepIndex ? "done" : i === stepIndex ? "active" : ""}`} title={label} />
                <span style={{ fontSize: 11, color: i === stepIndex ? "var(--navy)" : "var(--color-ink-3)", fontWeight: i === stepIndex ? 700 : 400 }}>
                  {label}
                </span>
                {i < 2 && <span style={{ color: "var(--color-border)", margin: "0 4px" }}>—</span>}
              </div>
            ))}
          </div>

          {/* Step 1: Email + Name */}
          {step === "email" && (
            <>
              <h1 className="auth-title">{t("Tạo tài khoản", lang)}</h1>
              <p className="auth-sub">{t("Nhập thông tin để bắt đầu. Chúng tôi sẽ gửi mã xác thực qua email.", lang)}</p>
              <form onSubmit={handleEmailStep} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-name">{t("Họ và tên", lang)}</label>
                  <input id="reg-name" type="text" className="form-input" placeholder="Nguyễn Văn A" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">{t("Email", lang)}</label>
                  <input id="reg-email" type="email" className="form-input" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? <><Loader2 size={18} aria-hidden="true" /> {t("Đang gửi...", lang)}</> : t("Gửi mã xác thực", lang)}
                </button>
              </form>
            </>
          )}

          {/* Step 2: OTP */}
          {step === "otp" && (
            <>
              <h1 className="auth-title">{t("Xác thực email", lang)}</h1>
              <p className="auth-sub">{t("Nhập mã 6 chữ số đã gửi đến", lang)} <strong>{email}</strong></p>
              <form onSubmit={handleOtpStep} noValidate>
                <div className="otp-inputs" role="group" aria-label={t("Mã OTP 6 chữ số", lang)}>
                  {otp.map((v, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      className="otp-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={v}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      aria-label={`${t("Số", lang)} ${i + 1}`}
                    />
                  ))}
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? <><Loader2 size={18} aria-hidden="true" /> {t("Đang xác thực...", lang)}</> : t("Xác nhận mã", lang)}
                </button>
                <p style={{ textAlign: "center", marginTop: "var(--sp-5)", fontSize: 13, color: "var(--color-ink-3)" }}>
                  {t("Chưa nhận được?", lang)} <button type="button" className="resend-link" onClick={resendOtp} disabled={loading}>{t("Gửi lại", lang)}</button>
                </p>
              </form>
            </>
          )}

          {/* Step 3: Password */}
          {step === "password" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)", marginBottom: "var(--sp-5)" }}>
                <CheckCircle2 size={28} style={{ color: "var(--color-success)", flexShrink: 0 }} aria-hidden="true" />
                <div>
                  <h1 className="auth-title" style={{ marginBottom: 0 }}>{t("Email đã xác thực!", lang)}</h1>
                  <p style={{ fontSize: 13, color: "var(--color-ink-3)" }}>{t("Tạo mật khẩu để hoàn tất đăng ký.", lang)}</p>
                </div>
              </div>
              <form onSubmit={handlePasswordStep} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-pw">{t("Mật khẩu", lang)}</label>
                  <div style={{ position: "relative" }}>
                    <input id="reg-pw" type={showPw ? "text" : "password"} className="form-input" placeholder={t("Ít nhất 6 ký tự", lang)} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required style={{ paddingRight: 44 }} />
                    <button type="button" onClick={() => setShowPw((p) => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: 0, cursor: "pointer", color: "var(--color-ink-3)" }} aria-label={showPw ? t("Ẩn", lang) : t("Hiện", lang)}>
                      {showPw ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-confirm-pw">{t("Xác nhận mật khẩu", lang)}</label>
                  <input id="reg-confirm-pw" type="password" className="form-input" placeholder={t("Nhập lại mật khẩu", lang)} value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} autoComplete="new-password" required />
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? <><Loader2 size={18} aria-hidden="true" /> {t("Đang tạo tài khoản...", lang)}</> : t("Hoàn tất đăng ký", lang)}
                </button>
              </form>
            </>
          )}

          <p className="auth-alt">{t("Đã có tài khoản?", lang)} <Link href="/login">{t("Đăng nhập", lang)}</Link></p>
        </div>
      </div>
    </main>
  );
}
