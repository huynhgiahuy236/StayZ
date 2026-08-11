"use client";

import { useState } from "react";
import { Wallet, Calculator, CheckCircle2 } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface Props {
  lang?: Language;
}

export function SplitbillCalculatorWidget({ lang = "vi" }: Props) {
  const [totalExpense, setTotalExpense] = useState(3600000);
  const [memberCount, setMemberCount] = useState(4);

  const perPerson = Math.round(totalExpense / memberCount);

  return (
    <section className="section shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
          borderRadius: 24,
          padding: "36px",
          color: "#ffffff",
          boxShadow: "0 10px 30px rgba(15,23,42,0.3)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32,
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              background: "rgba(168, 85, 247, 0.2)",
              color: "#c084fc",
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
            <Wallet size={14} /> HUKI WALLET & SPLIT BILL
          </span>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: "12px 0 8px 0", color: "#ffffff" }}>
            {t("splitbill_widget_title", lang)}
          </h2>
          <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
            {t("footer_desc", lang)}
          </p>

          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#cbd5e1" }}>
              <CheckCircle2 size={16} style={{ color: "#c084fc" }} /> AI Split Bill Engine
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#cbd5e1" }}>
              <CheckCircle2 size={16} style={{ color: "#c084fc" }} /> Dynamic VietQR Settlement Link
            </div>
          </div>
        </div>

        {/* Calculator Interactive Demo */}
        <div style={{ background: "rgba(255, 255, 255, 0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: 20, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, color: "#fbbf24", fontWeight: 700, fontSize: 13 }}>
            <Calculator size={16} /> SPLIT BILL CALCULATOR DEMO
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, opacity: 0.8, marginBottom: 6 }}>Total Expense (VNĐ):</label>
            <input
              type="number"
              step={100000}
              value={totalExpense}
              onChange={(e) => setTotalExpense(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(0,0,0,0.3)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, opacity: 0.8, marginBottom: 6 }}>Group Members:</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setMemberCount(num)}
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    borderRadius: 8,
                    border: 0,
                    background: memberCount === num ? "#fbbf24" : "rgba(255,255,255,0.1)",
                    color: memberCount === num ? "#000" : "#fff",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(251, 191, 36, 0.15)", border: "1px solid rgba(251, 191, 36, 0.3)", borderRadius: 14, padding: 16, textAlign: "center" }}>
            <span style={{ fontSize: 12, color: "#fbbf24", fontWeight: 600 }}>{t("splitbill_per_person", lang)}:</span>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              {new Intl.NumberFormat("vi-VN").format(perPerson)} ₫
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
