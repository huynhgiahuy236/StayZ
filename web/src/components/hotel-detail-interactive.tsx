"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowLeft, Users, Bed } from "lucide-react";
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

  const amenityKeyMap: Record<string, string> = {
    outdoor_pool: "amenity_outdoor_pool",
    indoor_pool: "amenity_indoor_pool",
    free_wifi: "amenity_free_wifi",
    airport_shuttle: "amenity_airport_shuttle",
    non_smoking_room: "amenity_non_smoking",
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

  const getAmenityLabel = (key: string) => {
    const i18nKey = amenityKeyMap[key];
    if (i18nKey) return t(i18nKey, lang);
    return key;
  };

  const hotelTitle = getLangText(hotel.title) || hotel.title;
  const hotelDescription = getLangText(hotel.description) || hotel.description;

  return (
    <div className="shell detail-shell">
      <Link href="/search" className="back-link">
        <ArrowLeft size={14} aria-hidden="true" /> {t("back_search", lang)}
      </Link>

      {/* Title row */}
      <div className="detail-title">
        <div>
          <p className="eyebrow dark">{hotel.type ?? t("Khách sạn", lang)} · {hotel.city}</p>
          <h1>{hotelTitle}</h1>
          <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={14} aria-hidden="true" /> {hotel.address}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "var(--sp-3)" }}>
          {hotel.rating || avgRating ? (
            <div className="star-rating" style={{ fontSize: 14 }}>
              <Star size={16} fill="currentColor" aria-hidden="true" />
              <span>{hotel.rating?.toFixed(1) ?? avgRating}</span>
              <span style={{ color: "var(--color-ink-3)", fontWeight: 400 }}>
                · {hotel.review_count ?? reviews.length} {t("đánh giá", lang)}
              </span>
            </div>
          ) : (
            <span style={{ fontSize: 13, color: "var(--color-ink-3)" }}>{t("new_on_stayz", lang)}</span>
          )}
        </div>
      </div>

      {/* Gallery */}
      <div className="detail-gallery">
        <div style={{ position: "relative" }}>
          <Image src={resolveImage(images[0])} alt={hotelTitle} fill sizes="70vw" priority style={{ objectFit: "cover" }} />
          <FavoriteButton propertyId={hotel._id} />
        </div>
        <div style={{ position: "relative" }}>
          <Image src={resolveImage(images[1] ?? images[0])} alt={`Space at ${hotelTitle}`} fill sizes="30vw" style={{ objectFit: "cover" }} />
        </div>
      </div>

      {/* Main content + booking card */}
      <div className="detail-copy">
        {/* Left: Description + Amenities */}
        <div>
          <p className="eyebrow dark">{t("about_stay", lang)}</p>
          <h2>{t("memorable_stay_waiting", lang)}</h2>
          <p>{hotelDescription}</p>
          {enabledAmenities.length > 0 && (
            <div className="amenities" aria-label="Amenities">
              {enabledAmenities.map((key) => (
                <span className="amenity" key={key}>✓ {getAmenityLabel(key)}</span>
              ))}
            </div>
          )}

          {/* Quick hotel info */}
          <div style={{ display: "flex", gap: "var(--sp-8)", marginTop: "var(--sp-8)", paddingTop: "var(--sp-6)", borderTop: "1px solid var(--color-border)" }}>
            {hotel.max_capacity && (
              <div style={{ textAlign: "center" }}>
                <Users size={22} style={{ color: "var(--navy)", margin: "0 auto var(--sp-2)" }} aria-hidden="true" />
                <p style={{ fontSize: 12, color: "var(--color-ink-3)" }}>{t("room_capacity", lang)}</p>
                <strong style={{ fontSize: 18 }}>{hotel.max_capacity}</strong>
                <p style={{ fontSize: 12, color: "var(--color-ink-3)" }}>{t("guests_label", lang)}</p>
              </div>
            )}
            {hotel.available_rooms != null && (
              <div style={{ textAlign: "center" }}>
                <Bed size={22} style={{ color: "var(--navy)", margin: "0 auto var(--sp-2)" }} aria-hidden="true" />
                <p style={{ fontSize: 12, color: "var(--color-ink-3)" }}>{t("room_beds", lang)}</p>
                <strong style={{ fontSize: 18 }}>{hotel.available_rooms}</strong>
                <p style={{ fontSize: 12, color: "var(--color-ink-3)" }}>rooms</p>
              </div>
            )}
          </div>
        </div>

        {/* Booking card */}
        <aside className="booking-card" aria-label="Booking info">
          <p>{t("Giá từ", lang)}</p>
          <strong>
            {price ? new Intl.NumberFormat("vi-VN").format(price) + " ₫" : "Contact"}
          </strong>
          {price && <span style={{ display: "block", marginBottom: "var(--sp-4)" }}>{t("per_night_tax_inc", lang)}</span>}
          <p style={{ fontSize: 12, color: "var(--color-ink-3)", marginBottom: "var(--sp-6)" }}>
            {hotel.available_rooms ?? 0} rooms available
          </p>
          {activeRooms.length > 0 ? (
            <a
              href="#rooms"
              className="booking-button"
              aria-label={t("select_room_btn", lang)}
              style={{ textAlign: "center", display: "block" }}
            >
              {t("select_room_btn", lang)}
            </a>
          ) : (
            <Link href="/login" className="booking-button" style={{ textAlign: "center", display: "block" }}>
              {t("Đăng Nhập", lang)}
            </Link>
          )}
        </aside>
      </div>

      {/* Rooms section */}
      {activeRooms.length > 0 && (
        <section className="rooms-section" id="rooms" aria-labelledby="rooms-heading">
          <h2 id="rooms-heading">{t("select_your_room", lang)}</h2>
          <div className="room-grid">
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
      <section className="reviews-section" id="reviews">
        <h2>{t("đánh giá", lang)} ({reviews.length})</h2>
        {reviews.length > 0 ? (
          <div className="review-list">
            {reviews.map((r) => (
              <ReviewCard key={r._id} review={r} />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--color-ink-3)", marginTop: "var(--sp-4)" }}>
            No reviews yet.
          </p>
        )}
      </section>
    </div>
  );
}
