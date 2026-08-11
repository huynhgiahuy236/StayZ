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
          background: "var(--color-card-bg, #ffffff)",
          border: "1px solid var(--color-border, #e2e8f0)",
          borderRadius: 24,
          padding: "36px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32,
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              background: "rgba(37, 99, 235, 0.1)",
              color: "#2563eb",
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
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: "12px 0 8px 0", color: "var(--color-ink, #0f172a)" }}>
            {t("bus_widget_title", lang)}
          </h2>
          <p style={{ fontSize: 14, color: "var(--color-ink-2, #64748b)", lineHeight: 1.6, margin: 0 }}>
            {t("combo_widget_desc", lang)}
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <button
              onClick={() => setDeck(1)}
              style={{
                padding: "8px 18px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                border: 0,
                background: deck === 1 ? "#0f172a" : "#f1f5f9",
                color: deck === 1 ? "#fbbf24" : "#475569",
                cursor: "pointer",
              }}
            >
              {t("bus_deck_lower", lang)}
            </button>
            <button
              onClick={() => setDeck(2)}
              style={{
                padding: "8px 18px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                border: 0,
                background: deck === 2 ? "#0f172a" : "#f1f5f9",
                color: deck === 2 ? "#fbbf24" : "#475569",
                cursor: "pointer",
              }}
            >
              {t("bus_deck_upper", lang)}
            </button>
          </div>
        </div>

        {/* SeatMap Interactive Demo */}
        <div style={{ background: "#f8fafc", padding: 24, borderRadius: 20, border: "1px dashed #cbd5e1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>SEATMAP {deck === 1 ? "DECK 1" : "DECK 2"}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#16a34a" }}>● LIVE WEBSOCKET</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {currentSeats.map((seat) => {
              const isSelected = selectedSeat === seat.id;
              const isBooked = seat.status === "booked";
              const isLocked = seat.status === "locked";

              let bg = "#ffffff";
              let color = "#1e293b";
              let border = "1px solid #cbd5e1";

              if (isBooked) { bg = "#e2e8f0"; color = "#94a3b8"; border = "1px solid #cbd5e1"; }
              else if (isLocked) { bg = "#fef3c7"; color = "#d97706"; border = "1px solid #f59e0b"; }
              else if (isSelected) { bg = "#2563eb"; color = "#ffffff"; border = "1px solid #1d4ed8"; }

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
                    boxShadow: isSelected ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
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
