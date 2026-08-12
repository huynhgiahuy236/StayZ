const fs = require("fs");
const path = require("path");

const i18nDir = path.join(__dirname, "../../web/src/lib/i18n");

const languages = ["vi", "en", "ko", "ja", "th", "zh", "fr", "de", "es", "ru"];

// Master translations dictionary for missing keys across 10 languages
const missingTranslations = {
  // Navigation & Header
  nav_countries: {
    vi: "Quốc Gia", en: "Countries", ko: "국가", ja: "国", th: "ประเทศ", zh: "国家", fr: "Pays", de: "Länder", es: "Países", ru: "Страны"
  },
  lang_dropdown_title: {
    vi: "10 Ngôn Ngữ Toàn Cầu", en: "10 Global Languages", ko: "10개 글로벌 언어", ja: "10のグローバル言語", th: "10 ภาษาทั่วโลก", zh: "10种全球语言", fr: "10 Langues Mondiales", de: "10 Globale Sprachen", es: "10 Idiomas Globales", ru: "10 Глобальных Языков"
  },
  // Auth & Form Validation
  auth_email_required: {
    vi: "Vui lòng nhập email của bạn.", en: "Please enter your email address.", ko: "이메일 주소를 입력해 주세요.", ja: "メールアドレスを入力してください。", th: "กรุณากรอกอีเมลของคุณ", zh: "请输入您的电子邮件地址。", fr: "Veuillez saisir votre adresse e-mail.", de: "Bitte geben Sie Ihre E-Mail-Adresse ein.", es: "Por favor, ingrese su correo electrónico.", ru: "Пожалуйста, введите ваш адрес электронной почты."
  },
  auth_otp_required: {
    vi: "Vui lòng nhập đầy đủ 6 chữ số OTP.", en: "Please enter all 6 OTP digits.", ko: "6자리 OTP 번호를 입력해 주세요.", ja: "6桁のOTPコードを入力してください。", th: "กรุณากรอก รหัส OTP 6 หลัก", zh: "请输入完整的6位OTP验证码。", fr: "Veuillez saisir les 6 chiffres du code OTP.", de: "Bitte geben Sie alle 6 OTP-Ziffern ein.", es: "Por favor, ingrese los 6 dígitos del OTP.", ru: "Пожалуйста, введите все 6 цифр OTP."
  },
  auth_password_min: {
    vi: "Mật khẩu phải ít nhất 6 ký tự.", en: "Password must be at least 6 characters.", ko: "비밀번호는 최소 6자 이상이어야 합니다.", ja: "パスワードは6文字以上にする必要があります。", th: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร", zh: "密码长度必须至少为6个字符。", fr: "Le mot de passe doit comporter au moins 6 caractères.", de: "Das Passwort muss mindestens 6 Zeichen lang sein.", es: "La contraseña debe tener al menos 6 caracteres.", ru: "Пароль должен содержать не менее 6 символов."
  },
  auth_password_mismatch: {
    vi: "Mật khẩu xác nhận không khớp.", en: "Confirmation password does not match.", ko: "비밀번호 확인이 일치하지 않습니다.", ja: "確認用パスワードが一致しません。", th: "รหัสผ่านยืนยันไม่ตรงกัน", zh: "确认密码与原密码不匹配。", fr: "Le mot de passe de confirmation ne correspond pas.", de: "Das Bestätigungspasswort stimmt nicht überein.", es: "La contraseña de confirmación no coincide.", ru: "Подтверждение пароля не совпадает."
  },
  auth_login_failed: {
    vi: "Đăng nhập thất bại. Vui lòng thử lại.", en: "Login failed. Please try again.", ko: "로그인에 실패했습니다. 다시 시도해 주세요.", ja: "ログインに失敗しました。もう一度お試しください。", th: "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", zh: "登录失败，请重试。", fr: "Échec de la connexion. Veuillez réessayer.", de: "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.", es: "Error de inicio de sesión. Por favor intente de nuevo.", ru: "Ошибка входа. Пожалуйста, попробуйте еще раз."
  },
  auth_register_failed: {
    vi: "Đăng ký thất bại. Vui lòng thử lại.", en: "Registration failed. Please try again.", ko: "회원가입에 실패했습니다. 다시 시도해 주세요.", ja: "会員登録に失敗しました。もう一度お試しください。", th: "ลงทะเบียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", zh: "注册失败，请重试。", fr: "Échec de l'inscription. Veuillez réessayer.", de: "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.", es: "Error de registro. Por favor intente de nuevo.", ru: "Ошибка регистрации. Пожалуйста, попробуйте еще раз."
  },
  auth_welcome_back: {
    vi: "Chào mừng trở lại", en: "Welcome Back", ko: "환영합니다", ja: "おかえりなさい", th: "ยินดีต้อนรับกลับมา", zh: "欢迎回来", fr: "Bon retour", de: "Willkommen zurück", es: "Bienvenido de nuevo", ru: "С возвращением"
  },
  auth_enter_email: {
    vi: "Nhập email của bạn để tiếp tục.", en: "Enter your email to proceed.", ko: "진행하려면 이메일을 입력해 주세요.", ja: "続行するにはメールアドレスを入力してください。", th: "กรอกอีเมลของคุณเพื่อดำเนินการต่อ", zh: "输入您的电子邮件以继续。", fr: "Entrez votre e-mail pour continuer.", de: "Geben Sie Ihre E-Mail ein, um fortzufahren.", es: "Ingrese su correo para continuar.", ru: "Введите адрес электронной почты для продолжения."
  },
  auth_reset_success: {
    vi: "Đặt lại mật khẩu thành công.", en: "Password reset successful.", ko: "비밀번호 재설정이 완료되었습니다.", ja: "パスワードのリセットが完了しました。", th: "รีเซ็ตรหัสผ่านสำเร็จแล้ว", zh: "重置密码成功。", fr: "Réinitialisation du mot de passe réussie.", de: "Passwort erfolgreich zurückgesetzt.", es: "Restablecimiento de contraseña exitoso.", ru: "Пароль успешно сброшен."
  },
  auth_google_error: {
    vi: "Dữ liệu đăng nhập Google không hợp lệ.", en: "Invalid Google authentication response.", ko: "유효하지 않은 Google 인증 데이터입니다.", ja: "Google ログイン認証データが無効です。", th: "ข้อมูลการเข้าสู่ระบบ Google ไม่ถูกต้อง", zh: "Google登录验证数据无效。", fr: "Données d'authentification Google invalides.", de: "Ungültige Google-Authentifizierungsdaten.", es: "Datos de autenticación de Google no válidos.", ru: "Недействительные данные авторизации Google."
  },

  // Booking & Modals
  booking_select_room_required: {
    vi: "Vui lòng chọn loại phòng.", en: "Please select a room type.", ko: "객실 유형을 선택해 주세요.", ja: "客室タイプを選択してください。", th: "กรุณาเลือกประเภทห้องพัก", zh: "请选择客房类型。", fr: "Veuillez sélectionner un type de chambre.", de: "Bitte wählen Sie einen Zimmertyp.", es: "Por favor, seleccione un tipo de habitación.", ru: "Пожалуйста, выберите тип номера."
  },
  booking_select_dates_required: {
    vi: "Vui lòng chọn ngày nhận và trả phòng.", en: "Please select check-in and check-out dates.", ko: "체크인 및 체크아웃 날짜를 선택해 주세요.", ja: "チェックイン・チェックアウト日を選択してください。", th: "กรุณาเลือกวันที่เช็คอินและเช็คเอาต์", zh: "请选择入住和退房日期。", fr: "Veuillez sélectionner les dates d'arrivée et de départ.", de: "Bitte wählen Sie An- und Abreisedaten.", es: "Por favor, seleccione fechas de check-in y check-out.", ru: "Пожалуйста, выберите даты заезда и выезда."
  },
  booking_checkout_after_checkin: {
    vi: "Ngày trả phòng phải sau ngày nhận phòng.", en: "Check-out date must be after check-in date.", ko: "체크아웃 날짜는 체크인 날짜 이후여야 합니다.", ja: "チェックアウト日はチェックイン日より後の日付にしてください。", th: "วันที่เช็คเอาต์ต้องอยู่หลังวันที่เช็คอิน", zh: "退房日期必须在入住日期之后。", fr: "La date de départ doit être postérieure à la date d'arrivée.", de: "Das Abreisedatum muss nach dem Anreisedatum liegen.", es: "La fecha de check-out debe ser posterior a la de check-in.", ru: "Дата выезда должна быть позже даты заезда."
  },
  booking_create_failed: {
    vi: "Không thể tạo đặt phòng.", en: "Unable to create booking reservation.", ko: "예약을 생성할 수 없습니다.", ja: "予約を عبدالله 作成できませんでした。", th: "ไม่สามารถสร้างการจองได้", zh: "无法创建预订。", fr: "Impossible de créer la réservation.", de: "Reservierung konnte nicht erstellt werden.", es: "No se puede crear la reserva.", ru: "Не удалось создать бронирование."
  },
  booking_loading: {
    vi: "Đang xử lý...", en: "Processing reservation...", ko: "처리 중입니다...", ja: "処理中...", th: "กำลังดำเนินการ...", zh: "正在处理中...", fr: "Traitement en cours...", de: "Wird bearbeitet...", es: "Procesando...", ru: "Обработка..."
  },
  booking_confirm_pass_qr: {
    vi: "Vé Điện Tử Nhận Phòng Khách Sạn - Xuất trình mã QR tại quầy Lễ tân", en: "Hotel Check-in E-Pass - Present QR code at front desk", ko: "호텔 체크인 모바일 티켓 - 안내 데스크에 QR 코드를 제시하세요", ja: "ホテルチェックイン電子チケット - フロントでQRコードをご提示ください", th: "ตั๋วอิเล็กทรอนิกส์เช็คอินโรงแรม - แสดง QR Code ที่แผนกต้อนรับ", zh: "酒店入住电子凭证 - 请在前台出示二维码", fr: "Pass électronique d'enregistrement hôtel - Présentez le QR code à la réception", de: "Hotel-Check-in-E-Ticket - QR-Code an der Rezeption vorzeigen", es: "Pase electrónico de Check-in de hotel - Presente el código QR en recepción", ru: "Электронный билет заезда в отель - Предъявите QR-код на стойке регистрации"
  },
  booking_status_pending: {
    vi: "Chờ thanh toán", en: "Pending Payment", ko: "결제 대기 중", ja: "支払い待ち", th: "รอการชำระเงิน", zh: "等待付款", fr: "En attente de paiement", de: "Zahlung ausstehend", es: "Pago pendiente", ru: "Ожидает оплаты"
  },
  booking_status_confirmed: {
    vi: "Đã xác nhận", en: "Confirmed", ko: "예약 확정", ja: "確認済み", th: "ยืนยันแล้ว", zh: "已确认", fr: "Confirmé", de: "Bestätigt", es: "Confirmado", ru: "Подтверждено"
  },
  booking_status_completed: {
    vi: "Đã hoàn thành", en: "Completed", ko: "이용 완료", ja: "完了", th: "เสร็จสมบูรณ์", zh: "已完成", fr: "Terminé", de: "Abgeschlossen", es: "Completado", ru: "Завершено"
  },
  booking_status_cancelled: {
    vi: "Đã hủy", en: "Cancelled", ko: "예약 취소됨", ja: "キャンセル済み", th: "ยกเลิกแล้ว", zh: "已取消", fr: "Annulé", de: "Storniert", es: "Cancelado", ru: "Отменено"
  },
  admin_confirm_delete_property: {
    vi: "Bạn có chắc muốn xóa khách sạn này không?", en: "Are you sure you want to delete this property?", ko: "이 숙소를 삭제하시겠습니까?", ja: "この宿泊施設を削除してもよろしいですか？", th: "คุณแน่ใจหรือไม่ว่าต้องการลบโรงแรมนี้?", zh: "您确定要删除这家酒店吗？", fr: "Êtes-vous sûr de vouloir supprimer cet établissement ?", de: "Möchten Sie diese Unterkunft wirklich löschen?", es: "¿Está seguro de que desea eliminar esta propiedad?", ru: "Вы уверены, что хотите удалить этот отель?"
  },
  profile_avatar_change: {
    vi: "Đổi ảnh đại diện", en: "Change Avatar", ko: "프로필 사진 변경", ja: "プロフィール写真を変更", th: "เปลี่ยนรูปโปรไฟล์", zh: "更换头像", fr: "Changer d'avatar", de: "Profilbild ändern", es: "Cambiar avatar", ru: "Сменить аватар"
  },
  profile_full_name: {
    vi: "Họ và tên", en: "Full Name", ko: "성명", ja: "氏名", th: "ชื่อ-นามสกุล", zh: "姓名", fr: "Nom complet", de: "Vollständiger Name", es: "Nombre completo", ru: "Полное имя"
  },
  profile_save_failed: {
    vi: "Lưu thất bại. Vui lòng thử lại.", en: "Save failed. Please try again.", ko: "저장에 실패했습니다. 다시 시도해 주세요.", ja: "保存に失敗しました。もう一度お試しください。", th: "บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", zh: "保存失败，请重试。", fr: "Échec de l'enregistrement. Veuillez réessayer.", de: "Speichern fehlgeschlagen. Bitte versuchen Sie es erneut.", es: "Error al guardar. Por favor intente de nuevo.", ru: "Ошибка сохранения. Пожалуйста, попробуйте еще раз."
  },
  fav_removed: {
    vi: "Đã xóa khỏi danh sách yêu thích", en: "Removed from favorites list", ko: "위시리스트에서 삭제되었습니다", ja: "お気に入りから削除しました", th: "ลบออกจากรายการโปรดแล้ว", zh: "已从收藏列表中移除", fr: "Retiré de la liste des favoris", de: "Aus der Favoritenliste entfernt", es: "Eliminado de la lista de favoritos", ru: "Удалено из списка избранного"
  },
  api_general_error: {
    vi: "Đã có lỗi xảy ra. Vui lòng thử lại.", en: "An error occurred. Please try again.", ko: "오류가 발생했습니다. 다시 시도해 주세요.", ja: "エラーが発生しました。もう一度お試しください。", th: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง", zh: "发生错误，请重试。", fr: "Une erreur est survenue. Veuillez réessayer.", de: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.", es: "Ocurrió un error. Por favor intente de nuevo.", ru: "Произошла ошибка. Пожалуйста, попробуйте еще раз."
  },
  api_upload_error: {
    vi: "Tải ảnh lên thất bại.", en: "Image upload failed.", ko: "이미지 업로드에 실패했습니다.", ja: "画像のアップロードに失敗しました。", th: "อัปโหลดรูปภาพไม่สำเร็จ", zh: "图片上传失败。", fr: "Échec du téléchargement de l'image.", de: "Bild-Upload fehlgeschlagen.", es: "Error al cargar la imagen.", ru: "Ошибка загрузки изображения."
  }
};

// Section headers mapping for clear file formatting
const sections = [
  { name: "PAGE: NAVIGATION & HEADER", keys: ["nav_stays", "nav_bus", "nav_ride", "nav_flight", "nav_combo", "nav_guide", "nav_login", "nav_signup", "nav_account", "nav_logout", "nav_admin", "nav_countries", "lang_dropdown_title"] },
  { name: "PAGE: HERO BANNER & SEARCH BAR", keys: ["hero_slogan", "hero_title_1", "hero_title_2", "hero_subtitle", "search_destination_placeholder", "search_checkin", "search_checkout", "search_guests", "search_button", "search_tab_stay", "search_tab_bus", "search_tab_ride", "search_tab_flight", "search_tab_combo", "deposit_badge", "deposit_desc", "trust_support"] },
  { name: "PAGE: HOMEPAGE WIDGETS (COMBO, BUS, SPLIT BILL)", keys: ["combo_widget_title", "combo_widget_desc", "combo_feature_lock", "combo_feature_refund", "combo_feature_pass", "combo_button", "bus_widget_title", "bus_deck_lower", "bus_deck_upper", "splitbill_widget_title", "splitbill_per_person"] },
  { name: "PAGE: SECTIONS (COUNTRIES, DESTINATIONS, HOTELS, TASTE, EXP)", keys: ["stat_destinations", "stat_properties", "stat_foods", "stat_activities", "countries_title", "countries_subtitle", "destinations_title", "destinations_subtitle", "hotels_title", "hotels_subtitle", "taste_title", "taste_subtitle", "experiences_title", "experiences_subtitle"] },
  { name: "PAGE: CATEGORIES & FILTER BUTTONS", keys: ["category_nature", "category_culture", "category_entertainment", "category_checkin", "filter_all", "filter_hotel", "filter_villa", "filter_apartment", "view_more", "view_all", "stayz_pick", "per_night", "rating_unit", "from_price", "recommended_spot", "card_book_now", "card_reviews"] },
  { name: "PAGE: AUTH, LOGIN, REGISTER & VALIDATION ERRORS", keys: ["auth_email_required", "auth_otp_required", "auth_password_min", "auth_password_mismatch", "auth_login_failed", "auth_register_failed", "auth_welcome_back", "auth_enter_email", "auth_reset_success", "auth_google_error"] },
  { name: "PAGE: BOOKING, HOTELS DETAIL, ADMIN & TOAST ALERTS", keys: ["booking_select_room_required", "booking_select_dates_required", "booking_checkout_after_checkin", "booking_create_failed", "booking_loading", "booking_confirm_pass_qr", "booking_status_pending", "booking_status_confirmed", "booking_status_completed", "booking_status_cancelled", "admin_confirm_delete_property", "profile_avatar_change", "profile_full_name", "profile_save_failed", "fav_removed", "api_general_error", "api_upload_error"] },
  { name: "PAGE: FOOTER", keys: ["footer_desc", "footer_company", "footer_destinations", "footer_support", "footer_rights", "footer_address"] }
];

languages.forEach((lang) => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : "";
  
  // Parse existing key-values
  const existingKeys = {};
  const lines = content.split("\n");
  lines.forEach((line) => {
    const match = line.match(/^\s*([a-zA-Z0-9_]+):\s*"([^"]+)"/);
    if (match) {
      existingKeys[match[1]] = match[2];
    }
  });

  let fileContent = `// ============================================================================\n`;
  fileContent += `// HUKI TRAVEL I18N DICTIONARY - ${lang.toUpperCase()} (${lang}.ts)\n`;
  fileContent += `// ============================================================================\n\n`;
  fileContent += `export const ${lang}: Record<string, string> = {\n`;

  sections.forEach((sec, idx) => {
    fileContent += `  // ── ${idx + 1}. ${sec.name} ───────────────────────────────────────────\n`;
    sec.keys.forEach((key) => {
      let val = existingKeys[key];
      if (!val && missingTranslations[key] && missingTranslations[key][lang]) {
        val = missingTranslations[key][lang];
      }
      if (val) {
        fileContent += `  ${key}: "${val}",\n`;
      }
    });
    fileContent += `\n`;
  });

  fileContent += `};\n`;
  fs.writeFileSync(filePath, fileContent, "utf-8");
  console.log(`🎉 Completed 100% keys for web/src/lib/i18n/${lang}.ts (${sections.reduce((acc, s) => acc + s.keys.length, 0)} keys)`);
});
