import { vi } from "./i18n/vi";
import { en } from "./i18n/en";
import { ko } from "./i18n/ko";
import { ja } from "./i18n/ja";
import { th } from "./i18n/th";
import { zh } from "./i18n/zh";
import { fr } from "./i18n/fr";
import { de } from "./i18n/de";
import { es } from "./i18n/es";
import { ru } from "./i18n/ru";

export type Language = "vi" | "en" | "ko" | "ja" | "th" | "zh" | "fr" | "de" | "es" | "ru";

export const translations: Record<Language, Record<string, string>> = {
  vi,
  en,
  ko,
  ja,
  th,
  zh,
  fr,
  de,
  es,
  ru,
};

export function t(key: string, lang: Language = "vi"): string {
  const dict = translations[lang] || translations.vi;
  return dict[key] || translations.vi[key] || key;
}
