"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Star, 
  ArrowLeft, 
  Users, 
  Bed, 
  Wifi, 
  Car, 
  Utensils, 
  Tv, 
  Coffee, 
  Sparkles, 
  ShieldCheck, 
  BadgeCheck, 
  X,
  Maximize2
} from "lucide-react";
import { FavoriteButton } from "@/components/hotel/FavoriteButton";
import { RoomCard } from "@/components/hotel/RoomCard";
import { ReviewCard } from "@/components/hotel/ReviewCard";
import { resolveImage } from "@/lib/api";
import { t, Language } from "@/lib/i18n";
import type { Room, Review } from "@/lib/types";

interface HotelDetailInteractiveProps {
  hotel: any;
  city: string;
  slug: string;
  rooms: Room[];
  reviews: Review[];
  images: string[];
  price: number | null;
  enabledAmenities: string[];
  avgRating: string | null;
  activeRooms: Room[];
}

const AMENITY_ICONS: Record<string, any> = {
  outdoor_pool: Sparkles,
  indoor_pool: Sparkles,
  free_wifi: Wifi,
  airport_shuttle: Car,
  restaurant: Utensils,
  free_parking: Car,
  breakfast: Coffee,
  gym: Maximize2,
  spa: Sparkles,
};

const AMENITY_LABELS: Record<string, string> = {
  outdoor_pool: "amenity_outdoor_pool",
  indoor_pool: "amenity_indoor_pool",
  free_wifi: "amenity_free_wifi",
  airport_shuttle: "amenity_airport_shuttle",
  non_smoking_room: "amenity_non_smoking_room",
  room_service: "amenity_room_service",
  restaurant: "amenity_restaurant",
  free_parking: "amenity_free_parking",
  family_room: "amenity_family_room",
  bar: "amenity_bar",
  breakfast: "amenity_breakfast",
  gym: "amenity_gym",
  spa: "amenity_spa",
  concierge: "amenity_concierge",
};

export function HotelDetailInteractive({
  hotel,
  city,
  slug,
  reviews,
  images,
  price,
  enabledAmenities,
  avgRating,
  activeRooms,
}: HotelDetailInteractiveProps) {
  const [lang, setLang] = useState<Language>("vi");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(saved);

    const handleLangChange = (e: CustomEvent<{ lang: Language }>) => {
      if (e.detail?.lang) {
        setLang(e.detail.lang);
      }
    };

    window.addEventListener("stayz_lang_changed" as any, handleLangChange as any);
    return () => window.removeEventListener("stayz_lang_changed" as any, handleLangChange as any);
  }, []);

  const getLangText = (obj: any) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.vi || obj.en || "";
  };

  const getAmenityLabel = (key: string) => {
    const rawLabel = AMENITY_LABELS[key] || key;
    return t(rawLabel, lang);
  };

  const hotelTitle = getLangText(hotel.title) || hotel.title;
  const hotelDescription = getLangText(hotel.description) || hotel.description;

  return (
    <div className="shell detail-shell">
      {/* Back button */}
      <Link href="/search" className="back-link" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
        <ArrowLeft size={16} aria-hidden="true" /> {t("Quay lại tìm kiếm", lang)}
      </Link>

      {/* Header title row */}
      <div className="detail-title">
        <div>
          <p className="eyebrow dark" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ background: "#fbbf24", color: "#0f172a", padding: "2px 8px", borderRadius: 4, fontWeight: 800, fontSize: 11 }}>
              {hotel.type ?? t("Khách sạn", lang)}
            </span>
            <span>· {hotel.city}</span>
          </p>
          <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, marginTop: 4 }}>{hotelTitle}</h1>
          <p style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-ink-2)", fontSize: 14 }}>
            <MapPin size={15} style={{ color: "#ef4444" }} aria-hidden="true" /> {hotel.address}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          {hotel.rating || avgRating ? (
            <div className="star-rating" style={{ fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
              <Star size={18} fill="#fbbf24" style={{ color: "#fbbf24" }} aria-hidden="true" />
              <span>{hotel.rating?.toFixed(1) ?? avgRating}</span>
              <span style={{ color: "var(--color-ink-3)", fontWeight: 400 }}>
                · {hotel.review_count ?? reviews.length} {t("đánh giá", lang)}
              </span>
            </div>
          ) : (
            <span style={{ fontSize: 13, color: "var(--color-ink-3)" }}>{t("Mới trên HuKi Travel", lang)}</span>
          )}
        </div>
      </div>

      {/* Interactive Gallery */}
      <div className="detail-gallery" style={{ marginTop: 20 }}>
        <div 
          style={{ position: "relative", cursor: "pointer", borderRadius: 16, overflow: "hidden" }}
          onClick={() => setSelectedPhotoIndex(0)}
        >
          <Image src={resolveImage(images[0])} alt={hotelTitle} fill sizes="70vw" priority style={{ objectFit: "cover" }} />
          <FavoriteButton propertyId={hotel._id} />
        </div>
        <div 
          style={{ position: "relative", cursor: "pointer", borderRadius: 16, overflow: "hidden" }}
          onClick={() => setSelectedPhotoIndex(1)}
        >
          <Image src={resolveImage(images[1] ?? images[0])} alt={`Space at ${hotelTitle}`} fill sizes="30vw" style={{ objectFit: "cover" }} />
          {images.length > 2 && (
            <div 
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                background: "rgba(15, 23, 42, 0.85)",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 700,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)"
              }}
            >
              📷 +{images.length} {t("Xem tất cả ảnh", lang)}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 44,
              height: 44,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={24} />
          </button>
          <div style={{ position: "relative", width: "90vw", height: "80vh", maxWidth: 1200 }}>
            <Image
              src={resolveImage(images[selectedPhotoIndex] || images[0])}
              alt="Photo preview"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}

      {/* Main content + Sticky booking sidebar */}
      <div className="detail-copy" style={{ marginTop: 32 }}>
        {/* Left: Description + Amenities */}
        <div>
          <p className="eyebrow dark">{t("Về nơi lưu trú này", lang)}</p>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "8px 0 16px" }}>{t("Một kỳ nghỉ đáng nhớ đang chờ bạn", lang)}</h2>
          <p style={{ lineHeight: 1.7, fontSize: 15, color: "var(--color-ink-2)" }}>{hotelDescription}</p>

          {enabledAmenities.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{t("Tiện Nghi Nổi Bật", lang)}</h3>
              <div className="amenities" aria-label="Amenities" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {enabledAmenities.map((key) => {
                  const IconComp = AMENITY_ICONS[key] || Sparkles;
                  return (
                    <span 
                      className="amenity" 
                      key={key} 
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        gap: 6,
                        background: "rgba(251, 191, 36, 0.1)",
                        border: "1px solid rgba(251, 191, 36, 0.2)",
                        color: "var(--color-fg, #0f172a)",
                        padding: "8px 14px",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600
                      }}
                    >
                      <IconComp size={14} style={{ color: "#d97706" }} />
                      {getAmenityLabel(key)}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick hotel info */}
          <div style={{ display: "flex", gap: 32, marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--color-border)" }}>
            {hotel.max_capacity && (
              <div style={{ textAlign: "center" }}>
                <Users size={24} style={{ color: "#d97706", margin: "0 auto 4px" }} aria-hidden="true" />
                <p style={{ fontSize: 12, color: "var(--color-ink-3)", margin: 0 }}>{t("Sức chứa phòng", lang)}</p>
                <strong style={{ fontSize: 20 }}>{hotel.max_capacity}</strong>
                <p style={{ fontSize: 12, color: "var(--color-ink-3)", margin: 0 }}>{t("khách tối đa", lang)}</p>
              </div>
            )}
            {hotel.available_rooms != null && (
              <div style={{ textAlign: "center" }}>
                <Bed size={24} style={{ color: "#d97706", margin: "0 auto 4px" }} aria-hidden="true" />
                <p style={{ fontSize: 12, color: "var(--color-ink-3)", margin: 0 }}>{t("Tồn kho phòng", lang)}</p>
                <strong style={{ fontSize: 20 }}>{hotel.available_rooms}</strong>
                <p style={{ fontSize: 12, color: "var(--color-ink-3)", margin: 0 }}>{t("phòng trống", lang)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Booking card */}
        <aside className="booking-card" aria-label="Booking info" style={{ borderRadius: 20, padding: 24 }}>
          <div style={{ background: "rgba(251, 191, 36, 0.15)", color: "#b45309", padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 800, display: "inline-block", marginBottom: 12 }}>
            ⚡ {t("Chính sách Cọc 30%", lang)}
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "var(--color-ink-3)" }}>{t("Giá từ", lang)}</p>
          <strong style={{ fontSize: 28, color: "var(--navy, #0f172a)", display: "block" }}>
            {price ? new Intl.NumberFormat("vi-VN").format(price) + " ₫" : t("Liên hệ", lang)}
          </strong>
          {price && <span style={{ display: "block", marginBottom: 12, fontSize: 13, color: "var(--color-ink-3)" }}>{t("/ đêm", lang)} ({t("Đã bao gồm thuế & phí", lang)})</span>}

          {price && (
            <div style={{ background: "rgba(30, 41, 59, 0.05)", borderRadius: 12, padding: 12, marginBottom: 16, border: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span>{t("Tiền cọc giữ chỗ (30%):", lang)}</span>
                <strong style={{ color: "#d97706" }}>{new Intl.NumberFormat("vi-VN").format(Math.round(price * 0.3))} ₫</strong>
              </div>
              <p style={{ fontSize: 11, color: "var(--color-ink-3)", margin: 0 }}>
                {t("Linh hoạt giữ chỗ - Hoàn tiền 100% khi hủy trước 48h", lang)}
              </p>
            </div>
          )}

          {activeRooms.length > 0 ? (
            <a
              href="#rooms"
              className="booking-button"
              aria-label={t("Chọn loại phòng ngay", lang)}
              style={{ textAlign: "center", display: "block", borderRadius: 12, padding: "14px", fontWeight: 800 }}
            >
              {t("Chọn loại phòng ngay", lang)}
            </a>
          ) : (
            <Link href="/login" className="booking-button" style={{ textAlign: "center", display: "block", borderRadius: 12, padding: "14px", fontWeight: 800 }}>
              {t("Đăng Nhập", lang)}
            </Link>
          )}
        </aside>
      </div>

      {/* Rooms section */}
      {activeRooms.length > 0 && (
        <section className="rooms-section" id="rooms" aria-labelledby="rooms-heading" style={{ marginTop: 48 }}>
          <h2 id="rooms-heading" style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>{t("Chọn Loại Phòng Phù Hợp", lang)}</h2>
          <div className="room-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {activeRooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
                propertyCity={city}
                propertySlug={slug}
              />
            ))}
          </div>
        </section>
      )}

      {/* Reviews section */}
      <section className="reviews-section" id="reviews" style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>{t("đánh giá", lang)} ({reviews.length})</h2>
        {reviews.length > 0 ? (
          <div className="review-list" style={{ display: "grid", gap: 16 }}>
            {reviews.map((r) => (
              <ReviewCard key={r._id} review={r} />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--color-ink-3)", marginTop: 12, fontSize: 14 }}>
            {t("Chưa có đánh giá nào từ du khách", lang)}
          </p>
        )}
      </section>
    </div>
  );
}
