import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { Hotel } from "@/lib/types";
import { resolveImage } from "@/lib/api";
import { Language, t } from "@/lib/i18n";

import { getDistinctVisualImage } from "@/lib/unique-images";

interface Props {
  hotel: Hotel;
  lang?: Language;
}

export function HotelCard({ hotel, lang = "vi" }: Props) {
  const price = hotel.min_price ?? hotel.base_price;
  const imageSrc = getDistinctVisualImage("hotel", hotel.slug || hotel._id || hotel.title);
  const typeLabel = hotel.type ? t(`filter_${hotel.type.toLowerCase()}`, lang) : t("Khách sạn", lang);

  return (
    <Link href={`/hotels/${encodeURIComponent(hotel.city.toLowerCase().replace(/\s+/g, "-"))}/${hotel.slug}`} className="hotel-card" aria-label={`Xem ${hotel.title}`}>
      <div className="hotel-image-wrap">
        <Image
          src={imageSrc}
          alt={hotel.title}
          fill
          unoptimized
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="hotel-image"
          loading="lazy"
        />
        {hotel.is_preferred && (
          <div className="hotel-badge" aria-label="HuKi Pick">{t("HuKi Pick", lang)}</div>
        )}
      </div>
      <div className="hotel-meta">
        <span>{typeLabel || hotel.type}</span>
        {hotel.rating && (
          <span className="star-rating" aria-label={`Đánh giá ${hotel.rating} sao`}>
            <Star size={11} fill="currentColor" aria-hidden="true" />
            {hotel.rating.toFixed(1)}
            {hotel.review_count != null && (
              <span style={{ color: "var(--color-ink-3)", fontWeight: 400 }}>
                ({hotel.review_count} {t("đánh giá", lang)})
              </span>
            )}
          </span>
        )}
      </div>
      <h3>{hotel.title}</h3>
      <p className="hotel-location">
        <MapPin size={12} style={{ display: "inline", marginRight: 4 }} aria-hidden="true" />
        {hotel.address}
      </p>
      <div className="hotel-price">
        <strong>
          {price
            ? new Intl.NumberFormat("vi-VN").format(price) + " ₫"
            : "Liên hệ"}
        </strong>
        {price && <span>{t("/ đêm", lang)}</span>}
      </div>
    </Link>
  );
}
