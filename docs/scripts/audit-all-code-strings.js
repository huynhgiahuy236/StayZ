const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "../..");
const WEB_SRC = path.join(ROOT_DIR, "web/src");
const PLATFORM_DIR = path.join(ROOT_DIR, "platform");

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === "node_modules" || file === ".next" || file === "dist" || file === ".git") continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (/\.(tsx|ts|js|jsx)$/.test(file)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = [...getAllFiles(WEB_SRC), ...getAllFiles(PLATFORM_DIR)];

const vnRegex = /[\u0100-\u024F\u1EA0-\u1EF9]+/g;
const stats = {
  ui: [],
  modals: [],
  forms: [],
  descriptions: [],
  seedData: [],
};

let totalVnStrings = 0;

allFiles.forEach((filePath) => {
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((line, idx) => {
    if (line.includes("import ") || line.includes("require(") || line.trim().startsWith("//")) return;

    const matches = line.match(/["'`>]([^"'`<]*[\u0100-\u024F\u1EA0-\u1EF9]+[^"'`<]*)/g);
    if (matches) {
      matches.forEach((m) => {
        const cleaned = m.replace(/^["'`>]/, "").trim();
        if (cleaned.length > 1) {
          totalVnStrings++;
          const lower = line.toLowerCase();
          const rec = { file: relPath, line: idx + 1, text: cleaned };

          if (relPath.includes("seed") || relPath.includes("platform/")) {
            if (lower.includes("desc") || lower.includes("overview") || lower.includes("tagline") || lower.includes("content")) {
              stats.descriptions.push(rec);
            } else {
              stats.seedData.push(rec);
            }
          } else if (lower.includes("modal") || lower.includes("popup") || lower.includes("toast") || lower.includes("alert") || lower.includes("confirm")) {
            stats.modals.push(rec);
          } else if (lower.includes("placeholder") || lower.includes("error") || lower.includes("required") || lower.includes("nhập") || lower.includes("vui lòng")) {
            stats.forms.push(rec);
          } else if (lower.includes("desc") || lower.includes("mô tả") || lower.includes("giới thiệu")) {
            stats.descriptions.push(rec);
          } else {
            stats.ui.push(rec);
          }
        }
      });
    }
  });
});

console.log(`==================================================`);
console.log(`📊 MASTER CODEBASE VIETNAMESE & SEED STRING AUDIT`);
console.log(`==================================================`);
console.log(`- Total Files Audited: ${allFiles.length}`);
console.log(`- Total Vietnamese Strings Found: ${totalVnStrings}`);
console.log(`- UI Buttons, Labels, Tabs & Headers: ${stats.ui.length}`);
console.log(`- Popups, Modals, Toasts & Alert Dialogs: ${stats.modals.length}`);
console.log(`- Form Placeholders & Validation Hints: ${stats.forms.length}`);
console.log(`- Entity Descriptions, Overviews & Taglines: ${stats.descriptions.length}`);
console.log(`- Platform Seed Data Strings (MongoDB/Postgres): ${stats.seedData.length}`);
