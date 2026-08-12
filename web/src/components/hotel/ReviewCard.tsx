"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import type { Review, User } from "@/lib/types";
import { resolveImage } from "@/lib/api";
import { t, Language } from "@/lib/i18n";

interface Props {
  review: Review;
}

function getInitials(name?: string) {
  if (!name) return "U";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(dateStr?: string, lang: Language = "vi") {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "vi-VN", { year: "numeric", month: "long" }).format(new Date(dateStr));
}

export function ReviewCard({ review }: Props) {
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

  const user = typeof review.user_id === "object" ? (review.user_id as User) : null;
  const avatarUrl = user?.avatar?.url;

  return (
    <div className="review-card">
      <div className="review-header">
        {avatarUrl ? (
          <img
            src={resolveImage(avatarUrl)}
            alt={user?.full_name ?? t("Khách", lang)}
            className="reviewer-avatar"
          />
        ) : (
          <div className="reviewer-avatar-initials" aria-hidden="true">
            {getInitials(user?.full_name)}
          </div>
        )}
        <div>
          <p className="reviewer-name">{user?.full_name ?? t("Khách ẩn danh", lang)}</p>
          <p className="review-date">{formatDate(review.createdAt, lang)}</p>
        </div>
      </div>

      <div className="review-stars" aria-label={t("Đánh giá", lang) + ` ${review.rating} ` + t("sao", lang)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < review.rating ? "var(--gold)" : "none"}
            stroke={i < review.rating ? "var(--gold)" : "var(--color-ink-3)"}
            aria-hidden="true"
          />
        ))}
      </div>

      {review.comment && (
        <p className="review-comment">{review.comment}</p>
      )}
    </div>
  );
}
