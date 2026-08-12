"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Bed, Users, Maximize2, Eye, Wind } from "lucide-react";
import type { Room } from "@/lib/types";
import { resolveImage } from "@/lib/api";
import { t, Language } from "@/lib/i18n";

interface Props {
  room: Room;
  propertyCity: string;
  propertySlug: string;
}

const roomTypeLabels: Record<string, string> = {
  standard_room: "room_type_standard",
  deluxe_room: "room_type_deluxe",
  suite: "room_type_suite",
};

export function RoomCard({ room, propertyCity, propertySlug }: Props) {
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

  const imageSrc = resolveImage(room.main_image_url);

  return (
    <div className="room-card">
      <div className="room-card-img">
        <Image
          src={imageSrc}
          alt={room.name}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
      </div>
      <div className="room-card-body">
        <span className="room-type-badge">
          {t(roomTypeLabels[room.room_type] ?? room.room_type, lang)}
        </span>
        <p className="room-name">{room.name}</p>
        <div className="room-details">
          <span className="room-detail" title={t("room_capacity", lang)}>
            <Users size={13} aria-hidden="true" /> {room.capacity} {t("guests_label", lang)}
          </span>
          <span className="room-detail" title={t("room_beds", lang)}>
            <Bed size={13} aria-hidden="true" /> {room.bed_info}
          </span>
          {room.area ? (
            <span className="room-detail" title={t("room_area", lang)}>
              <Maximize2 size={13} aria-hidden="true" /> {room.area} m²
            </span>
          ) : null}
          {room.view ? (
            <span className="room-detail" title={t("room_view", lang)}>
              <Eye size={13} aria-hidden="true" /> {room.view}
            </span>
          ) : null}
          {room.badges?.air_conditioning && (
            <span className="room-detail" title={t("room_ac", lang)}>
              <Wind size={13} aria-hidden="true" /> {t("room_ac", lang)}
            </span>
          )}
        </div>

        <div className="room-price-row">
          <div className="room-price">
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              {room.discount_percent > 0 && (
                <>
                  <span className="room-original-price">
                    {new Intl.NumberFormat("vi-VN").format(room.original_price)} ₫
                  </span>
                  <span className="room-discount-badge">-{room.discount_percent}%</span>
                </>
              )}
            </div>
            <strong>{new Intl.NumberFormat("vi-VN").format(room.price)} ₫</strong>
            <span style={{ marginLeft: 4 }}>{t("/ đêm", lang)}</span>
          </div>
          <a
            href={`/hotels/${encodeURIComponent(propertyCity)}/${propertySlug}/book?roomId=${room._id}`}
            className="btn-book"
            aria-label={`${t("Đặt Ngay", lang)} ${room.name}`}
          >
            {t("Đặt Ngay", lang)}
          </a>
        </div>
      </div>
    </div>
  );
}
