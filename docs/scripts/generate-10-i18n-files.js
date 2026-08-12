const fs = require("fs");
const path = require("path");

const i18nFilePath = path.join(__dirname, "../../web/src/lib/i18n.ts");
const outputDir = path.join(__dirname, "../../web/src/lib/i18n");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const content = fs.readFileSync(i18nFilePath, "utf-8");

const languages = ["vi", "en", "ko", "ja", "th", "zh", "fr", "de", "es", "ru"];
const dictionaries = {};

// Parse i18n.ts
languages.forEach((lang) => {
  const startIdx = content.indexOf(`  ${lang}: {`);
  if (startIdx === -1) return;
  const nextLang = languages[languages.indexOf(lang) + 1];
  const endIdx = nextLang ? content.indexOf(`  ${nextLang}: {`) : content.lastIndexOf("  },");
  
  const block = content.slice(startIdx, endIdx !== -1 ? endIdx : undefined);
  const dict = {};
  
  const lines = block.split("\n");
  lines.forEach((line) => {
    const match = line.match(/^\s*([a-zA-Z0-9_]+):\s*"([^"]+)"/);
    if (match) {
      dict[match[1]] = match[2];
    }
  });
  dictionaries[lang] = dict;
});

// Category mapping for clean comments
const sections = {
  navigation: ["nav_stays", "nav_bus", "nav_ride", "nav_flight", "nav_combo", "nav_guide", "nav_login", "nav_signup", "nav_account", "nav_logout", "nav_admin", "nav_countries", "lang_dropdown_title"],
  hero: ["hero_slogan", "hero_title_1", "hero_title_2", "hero_subtitle", "search_destination_placeholder", "search_checkin", "search_checkout", "search_guests", "search_button", "search_tab_stay", "search_tab_bus", "search_tab_ride", "search_tab_flight", "search_tab_combo", "deposit_badge", "deposit_desc", "trust_support"],
  widgets: ["combo_widget_title", "combo_widget_desc", "combo_feature_lock", "combo_feature_refund", "combo_feature_pass", "combo_button", "bus_widget_title", "bus_deck_lower", "bus_deck_upper", "splitbill_widget_title", "splitbill_per_person"],
  sections: ["stat_destinations", "stat_properties", "stat_foods", "stat_activities", "countries_title", "countries_subtitle", "destinations_title", "destinations_subtitle", "hotels_title", "hotels_subtitle", "taste_title", "taste_subtitle", "experiences_title", "experiences_subtitle"],
  categoriesAndFilters: ["category_nature", "category_culture", "category_entertainment", "category_checkin", "filter_all", "filter_hotel", "filter_villa", "filter_apartment", "view_more", "view_all", "stayz_pick", "per_night", "rating_unit", "from_price", "recommended_spot", "card_book_now", "card_reviews"],
  authAndValidation: ["auth_email_required", "auth_otp_required", "auth_password_min", "auth_password_mismatch", "auth_login_failed", "auth_register_failed", "auth_welcome_back", "auth_enter_email", "auth_reset_success", "auth_google_error"],
  bookingAndModals: ["booking_select_room_required", "booking_select_dates_required", "booking_checkout_after_checkin", "booking_create_failed", "booking_loading", "booking_confirm_pass_qr", "booking_status_pending", "booking_status_confirmed", "booking_status_completed", "booking_status_cancelled", "admin_confirm_delete_property", "profile_avatar_change", "profile_full_name", "profile_save_failed", "fav_removed", "api_general_error", "api_upload_error"],
  footer: ["footer_desc", "footer_company", "footer_destinations", "footer_support", "footer_rights", "footer_address"]
};

languages.forEach((lang) => {
  const dict = dictionaries[lang] || {};
  let fileContent = `// ============================================================================\n`;
  fileContent += `// HUKI TRAVEL I18N DICTIONARY - ${lang.toUpperCase()} (${lang}.ts)\n`;
  fileContent += `// ============================================================================\n\n`;
  fileContent += `export const ${lang}: Record<string, string> = {\n`;

  fileContent += `  // ── 1. PAGE: NAVIGATION & HEADER ───────────────────────────────────────────\n`;
  sections.navigation.forEach((key) => {
    if (dict[key]) fileContent += `  ${key}: "${dict[key]}",\n`;
  });

  fileContent += `\n  // ── 2. PAGE: HERO BANNER & SEARCH BAR ──────────────────────────────────────\n`;
  sections.hero.forEach((key) => {
    if (dict[key]) fileContent += `  ${key}: "${dict[key]}",\n`;
  });

  fileContent += `\n  // ── 3. PAGE: HOMEPAGE WIDGETS (COMBO, BUS, SPLIT BILL) ───────────────────────\n`;
  sections.widgets.forEach((key) => {
    if (dict[key]) fileContent += `  ${key}: "${dict[key]}",\n`;
  });

  fileContent += `\n  // ── 4. PAGE: SECTIONS (COUNTRIES, DESTINATIONS, HOTELS, TASTE, EXP) ─────────\n`;
  sections.sections.forEach((key) => {
    if (dict[key]) fileContent += `  ${key}: "${dict[key]}",\n`;
  });

  fileContent += `\n  // ── 5. PAGE: CATEGORIES & FILTER BUTTONS ────────────────────────────────────\n`;
  sections.categoriesAndFilters.forEach((key) => {
    if (dict[key]) fileContent += `  ${key}: "${dict[key]}",\n`;
  });

  fileContent += `\n  // ── 6. PAGE: AUTH, LOGIN, REGISTER & VALIDATION ERRORS ──────────────────────\n`;
  sections.authAndValidation.forEach((key) => {
    if (dict[key]) fileContent += `  ${key}: "${dict[key]}",\n`;
  });

  fileContent += `\n  // ── 7. PAGE: BOOKING, HOTELS DETAIL, ADMIN & TOAST ALERTS ───────────────────\n`;
  sections.bookingAndModals.forEach((key) => {
    if (dict[key]) fileContent += `  ${key}: "${dict[key]}",\n`;
  });

  fileContent += `\n  // ── 8. PAGE: FOOTER ─────────────────────────────────────────────────────────\n`;
  sections.footer.forEach((key) => {
    if (dict[key]) fileContent += `  ${key}: "${dict[key]}",\n`;
  });

  fileContent += `};\n`;

  fs.writeFileSync(path.join(outputDir, `${lang}.ts`), fileContent, "utf-8");
  console.log(`✅ Generated web/src/lib/i18n/${lang}.ts (${Object.keys(dict).length} keys)`);
});
