const fs = require("fs");
const path = require("path");

const oldI18nDir = path.join(__dirname, "../../web/src/lib/i18n");
const dictDir = path.join(__dirname, "../../web/src/lib/i18n/dict");

if (!fs.existsSync(dictDir)) {
  fs.mkdirSync(dictDir, { recursive: true });
}

const languages = ["vi", "en", "ko", "ja", "th", "zh", "fr", "de", "es", "ru"];

// Load VI old file to build master keyAliasToViText map
const viFilePath = path.join(oldI18nDir, "vi.ts");
const viContent = fs.readFileSync(viFilePath, "utf-8");

const keyAliasToViText = {};
viContent.split("\n").forEach((line) => {
  const match = line.match(/^\s*([a-zA-Z0-9_]+):\s*"([^"]+)"/);
  if (match) {
    keyAliasToViText[match[1]] = match[2];
  }
});

// Build 10 No-Key Dictionary files
languages.forEach((lang) => {
  const langFilePath = path.join(oldI18nDir, `${lang}.ts`);
  const content = fs.existsSync(langFilePath) ? fs.readFileSync(langFilePath, "utf-8") : "";

  const langKeyToText = {};
  content.split("\n").forEach((line) => {
    const match = line.match(/^\s*([a-zA-Z0-9_]+):\s*"([^"]+)"/);
    if (match) {
      langKeyToText[match[1]] = match[2];
    }
  });

  const noKeyDict = {};
  Object.keys(keyAliasToViText).forEach((key) => {
    const viText = keyAliasToViText[key];
    const targetText = langKeyToText[key] || viText;
    noKeyDict[viText] = targetText;
  });

  let fileContent = `// ============================================================================\n`;
  fileContent += `// NO-KEY DOM TRANSLATION DICTIONARY - ${lang.toUpperCase()} (${lang}.ts)\n`;
  fileContent += `// Master Key = Cụm Tiếng Việt Gốc | Value = Bản Dịch Bản Xứ\n`;
  fileContent += `// ============================================================================\n\n`;
  fileContent += `export const ${lang}Dict: Record<string, string> = {\n`;

  Object.keys(noKeyDict).forEach((viText) => {
    const escapedVi = viText.replace(/"/g, '\\"');
    const escapedTarget = noKeyDict[viText].replace(/"/g, '\\"');
    fileContent += `  "${escapedVi}": "${escapedTarget}",\n`;
  });

  fileContent += `};\n`;

  fs.writeFileSync(path.join(dictDir, `${lang}.ts`), fileContent, "utf-8");
  console.log(`🎉 Generated No-Key Dict web/src/lib/i18n/dict/${lang}.ts (${Object.keys(noKeyDict).length} keys)`);
});

// Update i18n.ts with FULL keyAliasToViText map
let i18nContent = `import { viDict } from "./i18n/dict/vi";
import { enDict } from "./i18n/dict/en";
import { koDict } from "./i18n/dict/ko";
import { jaDict } from "./i18n/dict/ja";
import { thDict } from "./i18n/dict/th";
import { zhDict } from "./i18n/dict/zh";
import { frDict } from "./i18n/dict/fr";
import { deDict } from "./i18n/dict/de";
import { esDict } from "./i18n/dict/es";
import { ruDict } from "./i18n/dict/ru";

export type Language = "vi" | "en" | "ko" | "ja" | "th" | "zh" | "fr" | "de" | "es" | "ru";

export const noKeyTranslations: Record<Language, Record<string, string>> = {
  vi: viDict,
  en: enDict,
  ko: koDict,
  ja: jaDict,
  th: thDict,
  zh: zhDict,
  fr: frDict,
  de: deDict,
  es: esDict,
  ru: ruDict,
};

export const translations = noKeyTranslations;

const keyAliasToViText: Record<string, string> = {\n`;

Object.keys(keyAliasToViText).forEach((key) => {
  const escapedVi = keyAliasToViText[key].replace(/"/g, '\\"');
  i18nContent += `  ${key}: "${escapedVi}",\n`;
});

i18nContent += `};\n\n`;

i18nContent += `export function t(textOrKey: string, lang: Language = "vi"): string {
  if (!textOrKey) return "";
  const dict = noKeyTranslations[lang] || noKeyTranslations.vi;
  
  // 1. Direct No-Key lookup (using Vietnamese string as Key)
  if (dict[textOrKey]) {
    return dict[textOrKey];
  }
  
  // 2. Lookup via legacy key alias
  const viText = keyAliasToViText[textOrKey];
  if (viText && dict[viText]) {
    return dict[viText];
  }
  
  // 3. Fallback to original input string
  return textOrKey;
}
`;

fs.writeFileSync(path.join(oldI18nDir, "i18n.ts"), i18nContent, "utf-8");
console.log(`✅ Updated web/src/lib/i18n.ts with complete keyAliasToViText map (${Object.keys(keyAliasToViText).length} key aliases)`);
