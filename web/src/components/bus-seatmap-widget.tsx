"use client";

import { useState } from "react";
import { Bus } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface Props {
  lang?: Language;
}

export function BusSeatmapWidget({ lang = "vi" }: Props) {
  const [deck, setDeck] = useState<1 | 2>(1);
  const [selectedSeat, setSelectedSeat] = useState<string | null>("A05");

  const upperSeats = [
    { id: "B01", status: "booked" }, { id: "B02", status: "available" }, { id: "B03", status: "locked" },
    { id: "B04", status: "available" }, { id: "B05", status: "available" }, { id: "B06", status: "booked" },
    { id: "B07", status: "available" }, { id: "B08", status: "booked" }, { id: "B09", status: "available" },
  ];

  const lowerSeats = [
    { id: "A01", status: "booked" }, { id: "A02", status: "booked" }, { id: "A03", status: "available" },
    { id: "A04", status: "available" }, { id: "A05", status: "selected" }, { id: "A06", status: "available" },
    { id: "A07", status: "booked" }, { id: "A08", status: "available" }, { id: "A09", status: "available" },
  ];

  const currentSeats = deck === 1 ? lowerSeats : upperSeats;

  return (
    <section className="section shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div
        style={{
          background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.98) 100%), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2560&q=80') center/cover no-repeat",
          border: "1px solid rgba(251, 191, 36, 0.3)",
          borderRadius: 24,
          padding: "36px",
          color: "#fff",
          boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32,
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              background: "rgba(251, 191, 36, 0.2)",
              color: "#fbbf24",
              fontSize: 12,
              fontWeight: 800,
              padding: "6px 14px",
              borderRadius: 100,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Bus size={14} /> HUKI BUS · REAL-TIME SEATMAP
          </span>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: "12px 0 8px 0", color: "#ffffff" }}>
            {t("Sơ Đồ Ghế Giường Nằm 2 Tầng Tự Động Khóa Chỗ", lang)}
          </h2>
          <p style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.6, margin: 0 }}>
            Hệ thống sơ đồ ghế giường nằm 2 tầng trực quan mô phỏng real-time via WebSocket. Khóa giữ vị trí tức thì trong 10 phút chống overbooking.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={() => setDeck(1)}
              style={{
                padding: "10px 20px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                border: 0,
                background: deck === 1 ? "#fbbf24" : "rgba(255,255,255,0.15)",
                color: deck === 1 ? "#0f172a" : "#ffffff",
                cursor: "pointer",
              }}
            >
              {t("Tầng Dưới (Deck 1)", lang)}
            </button>
            <button
              onClick={() => setDeck(2)}
              style={{
                padding: "10px 20px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                border: 0,
                background: deck === 2 ? "#fbbf24" : "rgba(255,255,255,0.15)",
                color: deck === 2 ? "#0f172a" : "#ffffff",
                cursor: "pointer",
              }}
            >
              {t("Tầng Trên (Deck 2)", lang)}
            </button>

            {/* CTA Button jump to dedicated Bus page */}
            <a
              href="/bus"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                color: "#fff",
                fontWeight: 800,
                fontSize: 13,
                padding: "10px 22px",
                borderRadius: 100,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 4px 15px rgba(37,99,235,0.4)"
              }}
            >
              Đặt Vé Xe Khách Giường Nằm →
            </a>
          </div>
        </div>

        {/* SeatMap Interactive Demo */}
        <div style={{ background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(12px)", padding: 24, borderRadius: 20, border: "1px solid rgba(255,255,255,0.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fbbf24" }}>SEATMAP {deck === 1 ? "DECK 1" : "DECK 2"}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#34d399" }}>● LIVE WEBSOCKET</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {currentSeats.map((seat) => {
              const isSelected = selectedSeat === seat.id;
              const isBooked = seat.status === "booked";
              const isLocked = seat.status === "locked";

              let bg = "rgba(255,255,255,0.1)";
              let color = "#ffffff";
              let border = "1px solid rgba(255,255,255,0.2)";

              if (isBooked) { bg = "rgba(148,163,184,0.2)"; color = "#64748b"; border = "1px solid rgba(148,163,184,0.3)"; }
              else if (isLocked) { bg = "rgba(245,158,11,0.3)"; color = "#fbbf24"; border = "1px solid #f59e0b"; }
              else if (isSelected) { bg = "#2563eb"; color = "#ffffff"; border = "1px solid #60a5fa"; }

              return (
                <button
                  key={seat.id}
                  onClick={() => !isBooked && setSelectedSeat(seat.id)}
                  disabled={isBooked}
                  style={{
                    padding: "14px 10px",
                    borderRadius: 12,
                    background: bg,
                    color: color,
                    border: border,
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: isBooked ? "not-allowed" : "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    boxShadow: isSelected ? "0 4px 12px rgba(37,99,235,0.4)" : "none",
                  }}
                >
                  <span>{seat.id}</span>
                  <span style={{ fontSize: 10, fontWeight: 500 }}>
                    {isBooked ? "Booked" : isLocked ? "Locked" : isSelected ? "Selected" : "Free"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
