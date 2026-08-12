const fs = require("fs");
const path = require("path");

const i18nDir = path.join(__dirname, "../../web/src/lib/i18n");
const languages = ["vi", "en", "ko", "ja", "th", "zh", "fr", "de", "es", "ru"];

const userDropdownKeys = {
  nav_profile: {
    vi: "Thông tin cá nhân", en: "My Profile", ko: "내 프로필", ja: "マイプロフィール", th: "โปรไฟล์ของฉัน", zh: "个人资料", fr: "Mon Profil", de: "Mein Profil", es: "Mi Perfil", ru: "Мой профиль"
  },
  nav_my_bookings: {
    vi: "Đặt phòng của tôi", en: "My Bookings", ko: "내 예약 목록", ja: "私の予約", th: "การจองของฉัน", zh: "我的预订", fr: "Mes Réservations", de: "Meine Buchungen", es: "Mis Reservas", ru: "Мои бронирования"
  },
  nav_favorites: {
    vi: "Yêu thích", en: "Favorite Stays", ko: "위시리스트", ja: "お気に入り", th: "รายการโปรด", zh: "我的收藏", fr: "Mes Favoris", de: "Meine Favoriten", es: "Mis Favoritos", ru: "Избранное"
  },
  nav_policy: {
    vi: "Điều khoản & Chính sách", en: "Terms & Policies", ko: "이용약관 및 방침", ja: "利用規約と方針", th: "ข้อกำหนดและนโยบาย", zh: "条款与政策", fr: "Conditions & Politiques", de: "AGB & Richtlinien", es: "Términos y Políticas", ru: "Условия и правила"
  },
  nav_admin_panel: {
    vi: "Trang Quản trị (Admin)", en: "Admin Dashboard", ko: "관리자 패널", ja: "管理者パネル", th: "แผงควบคุมผู้ดูแล", zh: "管理后台", fr: "Tableau de Bord Admin", de: "Admin-Dashboard", es: "Panel de Control", ru: "Панель администратора"
  }
};

languages.forEach((lang) => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, "utf-8");

  let newEntries = `\n  // ── 10. USER DROPDOWN MENU ───────────────────────────────────────────────────\n`;
  Object.keys(userDropdownKeys).forEach((key) => {
    if (!content.includes(`  ${key}:`)) {
      const val = userDropdownKeys[key][lang] || userDropdownKeys[key].en;
      newEntries += `  ${key}: "${val}",\n`;
    }
  });

  const insertIdx = content.lastIndexOf("};");
  if (insertIdx !== -1) {
    content = content.slice(0, insertIdx) + newEntries + "};\n";
    fs.writeFileSync(filePath, content, "utf-8");
  }
  console.log(`✅ Appended user dropdown keys to web/src/lib/i18n/${lang}.ts`);
});
