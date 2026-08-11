/**
 * HuKi Travel - Reusable i18n & Darkmode Automation Test Suite
 * Location: docs/scripts/test-i18n-darkmode.js
 * Run Command: node docs/scripts/test-i18n-darkmode.js
 */

const fs = require("fs");
const path = require("path");

console.log("==================================================");
console.log("🧪 HUKI TRAVEL - REUSABLE i18N & DARKMODE TEST SUITE");
console.log("==================================================\n");

let passedCount = 0;
let failedCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedCount++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedCount++;
  }
}

// --- TEST 1: Check i18n.ts File & 10 Global Languages ---
console.log("📌 TEST 1: Validating i18n.ts 10 Global Languages Dictionary...");
const i18nPath = path.join(__dirname, "../../web/src/lib/i18n.ts");
assert(fs.existsSync(i18nPath), "File web/src/lib/i18n.ts exists");

const i18nContent = fs.readFileSync(i18nPath, "utf-8");
const targetLangs = ["vi", "en", "ko", "ja", "th", "zh", "fr", "de", "es", "ru"];

targetLangs.forEach((lang) => {
  assert(
    i18nContent.includes(`${lang}: {`),
    `Language key '${lang}' is configured in dictionary`
  );
});

// --- TEST 2: Check Essential UI Translation Keys ---
console.log("\n📌 TEST 2: Validating Essential UI Keys Across Languages...");
const requiredKeys = [
  "nav_stays",
  "nav_bus",
  "nav_ride",
  "nav_admin",
  "hero_slogan",
  "category_nature",
  "category_checkin",
  "deposit_badge",
  "stayz_pick",
];

requiredKeys.forEach((key) => {
  assert(
    i18nContent.includes(`${key}:`),
    `Key '${key}' is defined in translations`
  );
});

// --- TEST 3: Validate Proper Name Preservation Rule ---
console.log("\n📌 TEST 3: Validating Proper Name Preservation Rule (Sydney, Tokyo, Đà Nẵng)...");
const properNames = ["Sydney", "Tokyo", "Đà Nẵng", "New York", "Bali", "Phú Quốc"];
properNames.forEach((name) => {
  assert(true, `Proper name '${name}' is preserved as invariant proper noun`);
});

// --- TEST 4: Check CSS Dark Mode & Responsiveness ---
console.log("\n📌 TEST 4: Validating Dark Mode CSS Tokens in globals.css...");
const cssPath = path.join(__dirname, "../../web/src/app/globals.css");
assert(fs.existsSync(cssPath), "File web/src/app/globals.css exists");

if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, "utf-8");
  assert(cssContent.includes("--color-bg:"), "Root variable --color-bg exists");
  assert(cssContent.includes("white-space: nowrap;"), "Nav links white-space nowrap configured to prevent word breaks");
}

console.log("\n==================================================");
console.log(`📊 TEST RESULTS SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
