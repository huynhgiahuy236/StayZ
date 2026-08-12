const fs = require("fs");
const path = require("path");

const WEB_SRC = path.join(__dirname, "../../web/src");

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith(".tsx") || filePath.endsWith(".ts")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(WEB_SRC);
const pages = [];
const components = [];
const modalsAndPopups = [];
const vietnameseRegex = /[\u0100-\u024F\u1EA0-\u1EF9]+/g; // Vietnamese diacritics matcher

console.log(`==================================================`);
console.log(`🔍 AUDITING ALL PAGES, COMPONENTS, POPUPS & MODALS IN WEB/SRC`);
console.log(`==================================================\n`);

let totalStringsFound = 0;
const auditResults = [];

allFiles.forEach((filePath) => {
  const relPath = path.relative(WEB_SRC, filePath).replace(/\\/g, "/");
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const hardcodedTexts = [];
  let hasModalOrPopup = false;
  const modalKeywords = ["modal", "popup", "dialog", "toast", "alert", "notification", "dropdown", "drawer", "banner", "overlay"];

  lines.forEach((line, idx) => {
    // Check if line contains modal/popup/toast keyword
    const lowerLine = line.toLowerCase();
    modalKeywords.forEach((kw) => {
      if (lowerLine.includes(kw)) {
        hasModalOrPopup = true;
      }
    });

    // Check for hardcoded Vietnamese strings in JSX or strings
    const matches = line.match(/["'>]([^"'>]*[\u0100-\u024F\u1EA0-\u1EF9]+[^"'<]*)/g);
    if (matches) {
      matches.forEach((m) => {
        const cleaned = m.replace(/^["'>]/, "").trim();
        if (cleaned.length > 2 && !cleaned.includes("import") && !cleaned.includes("//")) {
          hardcodedTexts.push({ line: idx + 1, text: cleaned });
        }
      });
    }
  });

  const isPage = relPath.startsWith("app/") && relPath.includes("page.tsx");
  const isComponent = relPath.startsWith("components/");

  if (isPage) pages.push(relPath);
  if (isComponent) components.push(relPath);
  if (hasModalOrPopup) modalsAndPopups.push(relPath);

  if (hardcodedTexts.length > 0) {
    totalStringsFound += hardcodedTexts.length;
    auditResults.push({
      file: relPath,
      isPage,
      isComponent,
      hasModalOrPopup,
      count: hardcodedTexts.length,
      samples: hardcodedTexts.slice(0, 5),
    });
  }
});

console.log(`📌 SUMMARY AUDIT RESULTS:`);
console.log(`  - Total Source Files Audited: ${allFiles.length}`);
console.log(`  - Total App Pages / Routes: ${pages.length}`);
console.log(`  - Total Components: ${components.length}`);
console.log(`  - Files Containing Modals/Popups/Toasts/Alerts: ${modalsAndPopups.length}`);
console.log(`  - Files Needing i18n Dictionary Keys: ${auditResults.length}`);
console.log(`  - Total Hardcoded Vietnamese Strings Identified: ${totalStringsFound}\n`);

console.log(`🗂️ DETAILED ROUTE & COMPONENT BREAKDOWN:`);
auditResults.forEach((res) => {
  console.log(`\n📄 [${res.file}] (${res.count} strings) - Popup/Modal: ${res.hasModalOrPopup ? "YES ⚠️" : "NO"}`);
  res.samples.forEach((s) => {
    console.log(`   L${s.line}: "${s.text.slice(0, 60)}"`);
  });
});
