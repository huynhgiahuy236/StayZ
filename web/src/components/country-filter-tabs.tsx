"use client";
import React from "react";
import { Language } from "@/lib/i18n";

export interface CountryFilterItem {
  code: string;
  flag: string;
  label: Record<string, string>;
}

export const GLOBAL_COUNTRY_FILTERS: CountryFilterItem[] = [
  { code: "all", flag: "🌐", label: { vi: "Tất cả", en: "All", ko: "전체", ja: "すべて", th: "ทั้งหมด", zh: "全部", fr: "Tous", de: "Alle", es: "Todos", ru: "Все" } },
  { code: "vn", flag: "🇻🇳", label: { vi: "Việt Nam", en: "Vietnam", ko: "베트남", ja: "ベトナム", th: "เวียดนาม", zh: "越南", fr: "Viêt Nam", de: "Vietnam", es: "Vietnam", ru: "Вьетнам" } },
  { code: "us", flag: "🇺🇸", label: { vi: "Mỹ", en: "USA", ko: "미국", ja: "アメリカ", th: "สหรัฐอเมริกา", zh: "美国", fr: "États-Unis", de: "USA", es: "EE. UU.", ru: "США" } },
  { code: "cn", flag: "🇨🇳", label: { vi: "Trung Quốc", en: "China", ko: "중국", ja: "中国", th: "จีน", zh: "中国", fr: "Chine", de: "China", es: "China", ru: "Китай" } },
  { code: "id", flag: "🇮🇩", label: { vi: "Indonesia", en: "Indonesia", ko: "인도네시아", ja: "インドネシア", th: "อินโดนีเซีย", zh: "印度尼西亚", fr: "Indonésie", de: "Indonesien", es: "Indonesia", ru: "Индонезия" } },
  { code: "ch", flag: "🇨🇭", label: { vi: "Thụy Sĩ", en: "Switzerland", ko: "스위스", ja: "スイス", th: "สวิตเซอร์แลนด์", zh: "瑞士", fr: "Suisse", de: "Schweiz", es: "Suiza", ru: "Швейцария" } },
  { code: "br", flag: "🇧🇷", label: { vi: "Brazil", en: "Brazil", ko: "브라질", ja: "ブラジル", th: "บราซิล", zh: "巴西", fr: "Brésil", de: "Brasilien", es: "Brasil", ru: "Бразилия" } },
  { code: "ar", flag: "🇦🇷", label: { vi: "Argentina", en: "Argentina", ko: "아르헨티나", ja: "アルゼンチン", th: "อาร์เจนตินา", zh: "阿根廷", fr: "Argentine", de: "Argentinien", es: "Argentina", ru: "Аргентина" } },
  { code: "au", flag: "🇦🇺", label: { vi: "Úc", en: "Australia", ko: "호주", ja: "オーストラリア", th: "ออสเตรเลีย", zh: "澳大利亚", fr: "Australie", de: "Australie", es: "Australia", ru: "Австралия" } },
  { code: "jp", flag: "🇯🇵", label: { vi: "Nhật Bản", en: "Japan", ko: "일본", ja: "日本", th: "ญี่ปุ่น", zh: "日本", fr: "Japon", de: "Japan", es: "Japón", ru: "Япония" } },
  { code: "kr", flag: "🇰🇷", label: { vi: "Hàn Quốc", en: "Korea", ko: "대한민국", ja: "韓国", th: "เกาหลีใต้", zh: "韩国", fr: "Corée du Sud", de: "Südkorea", es: "Corea del Sur", ru: "Южная Корея" } },
  { code: "th", flag: "🇹🇭", label: { vi: "Thái Lan", en: "Thailand", ko: "태국", ja: "タイ", th: "ประเทศไทย", zh: "泰国", fr: "Thaïlande", de: "Thailand", es: "Tailandia", ru: "Таиланд" } },
  { code: "sg", flag: "🇸🇬", label: { vi: "Singapore", en: "Singapore", ko: "싱가포르", ja: "シンガポール", th: "สิงคโปร์", zh: "新加坡", fr: "Singapour", de: "Singapur", es: "Singapur", ru: "Сингапур" } },
];

interface CountryFilterProps {
  selectedCode: string;
  onSelect: (code: string) => void;
  lang?: Language;
  hideAllOption?: boolean;
}

export function CountryFilterTabs({ selectedCode, onSelect, lang = "vi", hideAllOption = false }: CountryFilterProps) {
  const filters = hideAllOption
    ? GLOBAL_COUNTRY_FILTERS.filter((c) => c.code !== "all")
    : GLOBAL_COUNTRY_FILTERS;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        overflowX: "auto",
        paddingBottom: 10,
        marginBottom: 20,
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
      }}
      className="no-scrollbar"
    >
      {filters.map((c) => {
        const isActive = selectedCode === c.code;
        const labelText = c.label[lang] || c.label.vi || c.label.en;

        return (
          <button
            key={c.code}
            type="button"
            onClick={() => onSelect(c.code)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              border: isActive ? "1px solid #fbbf24" : "1px solid rgba(0, 0, 0, 0.08)",
              background: isActive
                ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
                : "#ffffff",
              color: isActive ? "#facc15" : "#334155",
              boxShadow: isActive ? "0 4px 12px rgba(15, 23, 42, 0.2)" : "none",
              transform: isActive ? "translateY(-1px)" : "none",
            }}
          >
            <span style={{ fontSize: 14 }}>{c.flag}</span>
            <span>{labelText}</span>
          </button>
        );
      })}
    </div>
  );
}
