"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Camera, Loader2, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getUserById, updateUser, uploadAvatar } from "@/lib/api";
import { resolveImage } from "@/lib/api";
import type { User as UserType } from "@/lib/types";
import { t, Language } from "@/lib/i18n";

function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.split("; ").find((c) => c.startsWith("stayz_access_token="));
  return m ? m.split("=").slice(1).join("=") : null;
}
function getStoredUser(): UserType | null {
  if (typeof document === "undefined") return null;
  try {
    const m = document.cookie.split("; ").find((c) => c.startsWith("stayz_user="));
    if (!m) return null;
    return JSON.parse(decodeURIComponent(m.split("=").slice(1).join("=")));
  } catch { return null; }
}
function saveUserCookie(u: UserType) {
  document.cookie = `stayz_user=${encodeURIComponent(JSON.stringify(u))}; max-age=${60 * 60 * 24 * 30}; path=/; samesite=lax`;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"" | "male" | "female" | "other">("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    const savedLang = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(savedLang);
    const token = getToken();
    if (!token) { router.replace("/login?redirect=/profile"); return; }
    const stored = getStoredUser();
    if (!stored) { router.replace("/login?redirect=/profile"); return; }
    getUserById(token, stored._id).then((u) => {
      if (u) {
        setUser(u);
        setFullName(u.full_name ?? "");
        setPhone(u.phone_number ?? "");
        setGender((u.gender ?? "") as typeof gender);
        setAddress(u.home_address ?? "");
        setDob(u.date_of_birth ? u.date_of_birth.slice(0, 10) : "");
      }
      setLoading(false);
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSaved(false);
    const token = getToken();
    if (!token || !user) return;
    setSaving(true);
    const { data: updated, error: err } = await updateUser(token, user._id, {
      full_name: fullName,
      phone_number: phone,
      gender,
      home_address: address,
      date_of_birth: dob || undefined,
    });
    setSaving(false);
    if (err || !updated) { setError(err ?? t("Lưu thất bại.", lang)); return; }
    setUser(updated);
    saveUserCookie(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = getToken();
    if (!token || !user) return;
    setUploading(true);
    const form = new FormData();
    form.append("avatar", file);
    const { data: updated } = await uploadAvatar(token, form);
    setUploading(false);
    if (updated) {
      setUser(updated);
      saveUserCookie(updated);
    }
  }

  if (loading) return (
    <main id="main-content" className="profile-page">
      <SiteHeader lang={lang} onLangChange={setLang} />
      <div style={{ display: "flex", justifyContent: "center", padding: "var(--sp-24)" }}>
        <Loader2 size={32} style={{ animation: "spin .7s linear infinite", color: "var(--navy)" }} />
      </div>
    </main>
  );

  return (
    <main id="main-content" className="profile-page">
      <SiteHeader lang={lang} onLangChange={setLang} />
      <div className="profile-hero">
        <div className="shell">
          <div className="profile-avatar-wrap">
            {uploading ? (
              <div className="profile-avatar" style={{ display: "grid", placeItems: "center", background: "var(--color-muted)" }}>
                <Loader2 size={24} style={{ animation: "spin .7s linear infinite" }} />
              </div>
            ) : user?.avatar?.url ? (
              <img src={resolveImage(user.avatar.url)} alt="Avatar" className="profile-avatar" />
            ) : (
              <div className="profile-avatar" style={{ display: "grid", placeItems: "center", background: "rgba(255,255,255,.2)" }}>
                <User size={40} aria-hidden="true" />
              </div>
            )}
            <label className="profile-avatar-change" htmlFor="avatar-upload" aria-label={t("Đổi ảnh đại diện", lang)} style={{ cursor: "pointer" }}>
              <Camera size={14} aria-hidden="true" />
              <input id="avatar-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
            </label>
          </div>
          <h1>{user?.full_name ?? user?.email ?? t("Tài khoản", lang)}</h1>
          <p style={{ opacity: .8, fontSize: 14 }}>{user?.email}</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="shell">
          <div className="profile-grid">
            {/* Sidebar nav */}
            <nav className="profile-nav" aria-label={t("Thông tin cá nhân", lang)}>
              <Link href="/profile" className="profile-nav-item active">
                <User size={16} aria-hidden="true" /> {t("Thông tin cá nhân", lang)}
              </Link>
              <Link href="/profile/bookings" className="profile-nav-item">
                📅 {t("Đặt phòng của tôi", lang)}
              </Link>
              <Link href="/favorites" className="profile-nav-item">
                ❤️ {t("Yêu thích", lang)}
              </Link>
            </nav>

            {/* Profile form */}
            <div className="profile-card">
              <h2>{t("Thông tin cá nhân", lang)}</h2>
              <form onSubmit={handleSave} noValidate>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-5)" }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="p-name">{t("Họ và tên", lang)}</label>
                    <input id="p-name" type="text" className="form-input" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="p-phone">{t("Số điện thoại", lang)}</label>
                    <input id="p-phone" type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="0901234567" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="p-gender">{t("Giới tính", lang)}</label>
                    <select id="p-gender" className="form-input" value={gender} onChange={(e) => setGender(e.target.value as typeof gender)}>
                      <option value="">{t("Không xác định", lang)}</option>
                      <option value="male">{t("Nam", lang)}</option>
                      <option value="female">{t("Nữ", lang)}</option>
                      <option value="other">{t("Khác", lang)}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="p-dob">{t("Ngày sinh", lang)}</label>
                    <input id="p-dob" type="date" className="form-input" value={dob} onChange={(e) => setDob(e.target.value)} max={new Date().toISOString().split("T")[0]} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="p-address">{t("Địa chỉ", lang)}</label>
                  <input id="p-address" type="text" className="form-input" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" placeholder={t("Số nhà, đường, thành phố...", lang)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" value={user?.email ?? ""} disabled style={{ opacity: .6, cursor: "not-allowed" }} aria-label={t("Email không thể thay đổi.", lang)} />
                  <p style={{ fontSize: 12, color: "var(--color-ink-3)", marginTop: 4 }}>{t("Email không thể thay đổi.", lang)}</p>
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                {saved && (
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", color: "var(--color-success)", fontSize: 14, marginBottom: "var(--sp-3)" }}>
                    <CheckCircle2 size={16} aria-hidden="true" /> {t("Đã lưu thành công!", lang)}
                  </div>
                )}
                <button type="submit" className="form-submit" style={{ maxWidth: 200 }} disabled={saving} aria-busy={saving}>
                  {saving ? <><Loader2 size={16} aria-hidden="true" /> {t("Đang lưu...", lang)}</> : t("Lưu thay đổi", lang)}
                </button>
              </form>

              {/* KYC & Identity Section */}
              <div style={{ marginTop: "var(--sp-8)", paddingTop: "var(--sp-6)", borderTop: "1px solid var(--color-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--sp-4)" }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>🪪 {t("Xác thực Sinh trắc học & Giấy tờ (HuKi ID KYC)", lang)}</h3>
                  <span style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    background: user?.kyc_status === "VERIFIED" ? "rgba(16, 185, 129, 0.15)" : user?.kyc_status === "PENDING" ? "rgba(245, 158, 11, 0.15)" : "rgba(239, 68, 68, 0.15)",
                    color: user?.kyc_status === "VERIFIED" ? "#10b981" : user?.kyc_status === "PENDING" ? "#f59e0b" : "#ef4444"
                  }}>
                    {user?.kyc_status === "VERIFIED" ? "✓ " + t("Đã xác thực", lang) : user?.kyc_status === "PENDING" ? "⏳ " + t("Đang chờ duyệt", lang) : "⚠️ " + t("Chưa xác thực", lang)}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--color-ink-3)", marginBottom: "var(--sp-4)" }}>
                  {t("Xác thực bằng lái xe (GPLX) bắt buộc để sử dụng dịch vụ thuê xe tự lái HuKi Ride.", lang)}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-4)" }}>
                  <div className="form-group">
                    <label className="form-label">{t("Số CCCD / CMND", lang)}</label>
                    <input type="text" className="form-input" placeholder="03609..." value={user?.identity_card_number || ""} readOnly disabled style={{ opacity: 0.8 }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("Số Giấy phép lái xe (GPLX)", lang)}</label>
                    <input type="text" className="form-input" placeholder="79012..." value={user?.driver_license_number || ""} readOnly disabled style={{ opacity: 0.8 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
