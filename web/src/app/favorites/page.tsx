"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Loader2, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { HotelCard } from "@/components/hotel-card";
import { getMyFavorites, removeFavorite } from "@/lib/api";
import type { Favorite, Hotel } from "@/lib/types";
import { Language, t } from "@/lib/i18n";

function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.split("; ").find((c) => c.startsWith("stayz_access_token="));
  return m ? m.split("=").slice(1).join("=") : null;
}

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(saved);
    const token = getToken();
    if (!token) { router.replace("/login?redirect=/favorites"); return; }
    getMyFavorites(token).then((data) => {
      setFavorites(data);
      setLoading(false);
    });
  }, []);

  async function handleRemove(propertyId: string) {
    const token = getToken();
    if (!token) return;
    setRemoving(propertyId);
    await removeFavorite(token, propertyId);
    setFavorites((prev) => prev.filter((f) => {
      const pid = typeof f.property_id === "object" ? (f.property_id as Hotel)._id : f.property_id;
      return pid !== propertyId;
    }));
    setRemoving(null);
  }

  const hotels = favorites
    .map((f) => (typeof f.property_id === "object" ? (f.property_id as Hotel) : null))
    .filter(Boolean) as Hotel[];

  if (loading) return (
    <main id="main-content" className="favorites-page">
      <SiteHeader lang={lang} onLangChange={setLang} />
      <div style={{ display: "flex", justifyContent: "center", padding: "var(--sp-24)" }}>
        <Loader2 size={32} style={{ animation: "spin .7s linear infinite", color: "var(--navy)" }} />
      </div>
    </main>
  );

  return (
    <main id="main-content" className="favorites-page">
      <SiteHeader lang={lang} onLangChange={setLang} />
      <div className="favorites-hero">
        <div className="shell">
          <h1>{t("Nơi lưu trú yêu thích", lang)}</h1>
          <p style={{ opacity: .8, fontSize: 14 }}>{hotels.length} {t("Khách sạn & Villa", lang)}</p>
        </div>
      </div>

      <div className="shell" style={{ paddingTop: "var(--sp-10)", paddingBottom: "var(--sp-24)" }}>
        {hotels.length === 0 ? (
          <div className="empty-state" style={{ marginTop: "var(--sp-10)" }}>
            <Heart size={40} style={{ color: "var(--color-ink-3)", margin: "0 auto var(--sp-4)" }} aria-hidden="true" />
            <h3>{t("Chưa có nơi lưu trú yêu thích", lang)}</h3>
            <p>{t("Nơi lưu trú hạng sang được đánh giá cao bởi cộng đồng du khách", lang)}</p>
            <Link href="/search" className="btn-primary" style={{ display: "inline-flex", marginTop: "var(--sp-6)", textDecoration: "none" }}>
              {t("Khám phá tất cả", lang)}
            </Link>
          </div>
        ) : (
          <div className="hotel-grid">
            {hotels.map((hotel) => {
              return (
                <div key={hotel._id} style={{ position: "relative" }}>
                  <HotelCard hotel={hotel} lang={lang} />
                  <button
                    onClick={() => handleRemove(hotel._id)}
                    disabled={removing === hotel._id}
                    aria-label={`Xóa ${hotel.title} khỏi yêu thích`}
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      zIndex: 10,
                      width: 36,
                      height: 36,
                      border: 0,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,.92)",
                      cursor: "pointer",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--color-destructive)",
                      transition: "background var(--t-fast)",
                    }}
                  >
                    {removing === hotel._id
                      ? <Loader2 size={16} style={{ animation: "spin .7s linear infinite" }} aria-hidden="true" />
                      : <Trash2 size={16} aria-hidden="true" />}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="shell footer-inner">
          <Link href="/" className="brand brand-light">HuKi<span className="z"> Travel</span></Link>
          <p>{t("Nền tảng tích hợp du lịch toàn diện: Đặt phòng + Vé xe + Thuê xe + Ẩm thực + Trải nghiệm.", lang)}</p>
          <p>{t("Bản quyền thuộc về HuKi Travel Ecosystem.", lang)}</p>
        </div>
      </footer>
    </main>
  );
}
