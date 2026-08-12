const fs = require("fs");
const path = require("path");

const oldI18nDir = path.join(__dirname, "../../web/src/lib/i18n");
const dictDir = path.join(__dirname, "../../web/src/lib/i18n/dict");

if (!fs.existsSync(dictDir)) {
  fs.mkdirSync(dictDir, { recursive: true });
}

const languages = ["vi", "en", "ko", "ja", "th", "zh", "fr", "de", "es", "ru"];

// Load VI old keys as the reference key map (key -> Vietnamese String)
const viFilePath = path.join(oldI18nDir, "vi.ts");
const viContent = fs.readFileSync(viFilePath, "utf-8");

const viKeyToText = {};
const lines = viContent.split("\n");
lines.forEach((line) => {
  const match = line.match(/^\s*([a-zA-Z0-9_]+):\s*"([^"]+)"/);
  if (match) {
    viKeyToText[match[1]] = match[2];
  }
});

// For each language, build a dictionary where Vietnamese String IS THE KEY
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
  Object.keys(viKeyToText).forEach((key) => {
    const viText = viKeyToText[key];
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
  console.log(`🎉 Built No-Key Dictionary web/src/lib/i18n/dict/${lang}.ts (${Object.keys(noKeyDict).length} Vietnamese keys)`);
});
