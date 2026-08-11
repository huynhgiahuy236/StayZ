"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogOut, User, Heart, Calendar, ChevronDown, ShieldCheck, ShieldAlert, Utensils, Compass, Check, Bus, Car, Ticket } from "lucide-react";
import type { User as UserType } from "@/lib/types";
import { Language, t } from "@/lib/i18n";

interface Props {
  transparent?: boolean;
  lang?: Language;
  onLangChange?: (newLang: Language) => void;
}

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: "vi", flag: "🇻🇳", label: "Tiếng Việt" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "th", flag: "🇹🇭", label: "ไทย" },
  { code: "zh", flag: "🇨🇳", label: "中文 (简体)" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
];

function getUserFromCookie(): UserType | null {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie.split("; ").find((c) => c.startsWith("stayz_user="));
    if (!match) return null;
    return JSON.parse(decodeURIComponent(match.split("=").slice(1).join("=")));
  } catch {
    return null;
  }
}

function getInitials(name?: string): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const COUNTRIES: { code: string; flag: string; label: string }[] = [
  { code: "vn", flag: "🇻🇳", label: "Việt Nam" },
  { code: "us", flag: "🇺🇸", label: "Mỹ" },
  { code: "cn", flag: "🇨🇳", label: "Trung Quốc" },
  { code: "id", flag: "🇮🇩", label: "Indonesia" },
  { code: "ch", flag: "🇨🇭", label: "Thụy Sĩ" },
  { code: "br", flag: "🇧🇷", label: "Brazil" },
  { code: "ar", flag: "🇦🇷", label: "Argentina" },
  { code: "au", flag: "🇦🇺", label: "Úc" },
  { code: "jp", flag: "🇯🇵", label: "Nhật Bản" },
  { code: "kr", flag: "🇰🇷", label: "Hàn Quốc" },
  { code: "th", flag: "🇹🇭", label: "Thái Lan" },
  { code: "sg", flag: "🇸🇬", label: "Singapore" },
];

export function SiteHeader({ transparent = false, lang = "vi", onLangChange }: Props) {
  const [user, setUser] = useState<UserType | null>(null);
  const [dropOpen, setDropOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(lang);
  const [solid, setSolid] = useState(true);

  const dropRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getUserFromCookie());
    const savedLang = (localStorage.getItem("stayz_lang") as Language) || lang || "vi";
    setCurrentLang(savedLang);
  }, [lang]);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleLogout() {
    document.cookie = "stayz_access_token=; Max-Age=0; path=/";
    document.cookie = "stayz_refresh_token=; Max-Age=0; path=/";
    document.cookie = "stayz_user=; Max-Age=0; path=/";
    setUser(null);
    setDropOpen(false);
    window.location.href = "/";
  }

  function changeLanguage(code: Language) {
    setCurrentLang(code);
    localStorage.setItem("stayz_lang", code);
    document.cookie = `stayz_lang=${code}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setLangOpen(false);
    if (onLangChange) onLangChange(code);
  }

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const isAdmin = user?.role === "admin";

  return (
    <header className={`site-header ${solid ? "solid" : "transparent"}`}>
      <nav className="nav shell" aria-label="Điều hướng chính">
        {/* Brand */}
        <Link href="/" className="brand" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span>HuKi<span className="z"> Travel</span></span>
          <span style={{ fontSize: 10, background: "rgba(251,191,36,0.25)", color: "var(--gold, #fbbf24)", padding: "2px 8px", borderRadius: 4, fontWeight: 800, letterSpacing: 0.5 }}>10 LANGUAGES</span>
        </Link>

        {/* Nav links */}
        <div className="nav-links" role="menubar">
          <Link href="/search" role="menuitem">{t("nav_stays", currentLang)}</Link>
          <Link href="#search-banner" role="menuitem" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Bus size={14} /> {t("nav_bus", currentLang)}
          </Link>
          <Link href="#search-banner" role="menuitem" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Car size={14} /> {t("nav_ride", currentLang)}
          </Link>
          <Link href="#taste-section" role="menuitem" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Utensils size={14} /> {t("taste_title", currentLang).split("&")[0]}
          </Link>
          <Link href="#experiences-section" role="menuitem" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Compass size={14} /> {t("experiences_title", currentLang).split("&")[0]}
          </Link>
          {isAdmin && (
            <Link href="/admin" role="menuitem" style={{ color: "var(--gold)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
              <ShieldAlert size={14} aria-hidden="true" /> Admin
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* 🌍 12-Country Selector Dropdown */}
          <div className="nav-dropdown" ref={countryRef} style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setCountryOpen((p) => !p)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "6px 12px",
                borderRadius: 100,
                color: "inherit",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
              aria-label="Chọn quốc gia"
            >
              <span>🌍</span>
              <span className="hide-mobile">12 Countries</span>
              <ChevronDown size={13} />
            </button>

            {countryOpen && (
              <div
                className="nav-dropdown-menu"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  marginTop: 8,
                  minWidth: 170,
                  maxHeight: 320,
                  overflowY: "auto",
                  background: "var(--color-bg, #fff)",
                  color: "var(--color-ink, #0f172a)",
                  borderRadius: 12,
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.25)",
                  padding: "6px",
                  zIndex: 100,
                }}
              >
                {COUNTRIES.map((c) => (
                  <Link
                    key={c.code}
                    href={`/country/${c.code}`}
                    onClick={() => setCountryOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 8,
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    <span>{c.flag}</span>
                    <span>{c.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 🌐 Re-Designed 10-Language Selector Dropdown */}
          <div className="nav-dropdown" ref={langRef} style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setLangOpen((p) => !p)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255, 255, 255, 0.18)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                padding: "6px 14px",
                borderRadius: 100,
                color: "inherit",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              aria-label="Chọn ngôn ngữ"
            >
              <span style={{ fontSize: 16 }}>{activeLangObj.flag}</span>
              <span>{activeLangObj.code.toUpperCase()}</span>
              <ChevronDown size={13} />
            </button>

            {langOpen && (
              <div
                className="nav-dropdown-menu"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  marginTop: 8,
                  width: 210,
                  maxHeight: 380,
                  overflowY: "auto",
                  background: "#ffffff",
                  color: "#0f172a",
                  borderRadius: 14,
                  boxShadow: "0 15px 35px -5px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
                  padding: "8px",
                  zIndex: 200,
                }}
              >
                <div style={{ padding: "6px 10px 8px 10px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#64748b", borderBottom: "1px solid #f1f5f9", marginBottom: 4 }}>
                  10 Languages / 10 Ngôn Ngữ
                </div>
                {LANGUAGES.map((langItem) => {
                  const isSelected = currentLang === langItem.code;
                  return (
                    <button
                      key={langItem.code}
                      onClick={() => changeLanguage(langItem.code)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: 8,
                        border: 0,
                        background: isSelected ? "#f1f5f9" : "transparent",
                        fontWeight: isSelected ? 700 : 500,
                        cursor: "pointer",
                        textAlign: "left",
                        color: isSelected ? "#0f172a" : "#334155",
                        fontSize: 13,
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 18 }}>{langItem.flag}</span>
                        <span>{langItem.label}</span>
                      </span>
                      {isSelected && <Check size={15} style={{ color: "#2563eb" }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Auth Menu */}
          {user ? (
            <div className="nav-dropdown" ref={dropRef}>
              <button
                className="nav-avatar-btn"
                onClick={() => setDropOpen((p) => !p)}
                aria-haspopup="true"
                aria-expanded={dropOpen}
                aria-label={`Tài khoản của ${user.full_name ?? user.email}`}
              >
                {user.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt={user.full_name ?? "Avatar"}
                    className="nav-avatar-img"
                  />
                ) : (
                  <span className="nav-avatar-initials" aria-hidden="true">
                    {getInitials(user.full_name)}
                  </span>
                )}
                <span style={{ maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.full_name?.split(" ").slice(-1)[0] ?? t("nav_account", currentLang)}
                </span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>

              {dropOpen && (
                <div className="nav-dropdown-menu" role="menu">
                  <Link href="/profile" className="nav-dropdown-item" role="menuitem" onClick={() => setDropOpen(false)}>
                    <User size={16} aria-hidden="true" /> Thông tin cá nhân
                  </Link>
                  <Link href="/profile/bookings" className="nav-dropdown-item" role="menuitem" onClick={() => setDropOpen(false)}>
                    <Calendar size={16} aria-hidden="true" /> Đặt phòng của tôi
                  </Link>
                  <Link href="/favorites" className="nav-dropdown-item" role="menuitem" onClick={() => setDropOpen(false)}>
                    <Heart size={16} aria-hidden="true" /> Yêu thích
                  </Link>
                  <Link href="/policy" className="nav-dropdown-item" role="menuitem" onClick={() => setDropOpen(false)}>
                    <ShieldCheck size={16} aria-hidden="true" /> Điều khoản & Chính sách
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="nav-dropdown-item" role="menuitem" onClick={() => setDropOpen(false)} style={{ color: "var(--gold)", fontWeight: 700 }}>
                      <ShieldAlert size={16} aria-hidden="true" /> Trang Quản trị (Admin)
                    </Link>
                  )}
                  <div className="nav-dropdown-divider" role="separator" />
                  <button className="nav-dropdown-item danger" role="menuitem" onClick={handleLogout}>
                    <LogOut size={16} aria-hidden="true" /> {t("nav_logout", currentLang)}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="btn-ghost">{t("nav_login", currentLang)}</Link>
              <Link href="/auth/register" className="btn-primary">{t("nav_signup", currentLang)}</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
