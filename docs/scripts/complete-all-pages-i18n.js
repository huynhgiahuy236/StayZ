const fs = require("fs");
const path = require("path");

const i18nDir = path.join(__dirname, "../../web/src/lib/i18n");
const languages = ["vi", "en", "ko", "ja", "th", "zh", "fr", "de", "es", "ru"];

const newPageKeys = {
  // Country & Search Page
  back_home: { vi: "Quay lại Trang Chủ", en: "Back to Home", ko: "홈으로 돌아가기", ja: "ホームに戻る", th: "กลับสู่หน้าหลัก", zh: "返回首页", fr: "Retour à l'accueil", de: "Zurück zur Startseite", es: "Volver al Inicio", ru: "Назад на главную" },
  back_search: { vi: "Quay lại danh sách", en: "Back to list", ko: "목록으로 돌아가기", ja: "一覧に戻る", th: "กลับสู่รายการ", zh: "返回列表", fr: "Retour à la liste", de: "Zurück zur Liste", es: "Volver a la lista", ru: "Назад к списку" },
  destinations_in_country: { vi: "Nơi Du Lịch Nổi Bật Tại", en: "Top Destinations in", ko: "인기 여행지:", ja: "人気観光地：", th: "สถานที่ท่องเที่ยวยอดนิยมใน", zh: "热门旅游目的地：", fr: "Top Destinations à", de: "Beliebte Reiseziele in", es: "Principales Destinos en", ru: "Популярные направления в" },
  hotels_5star: { vi: "Khách sạn 5-sao", en: "5-star Hotels", ko: "5성급 호텔", ja: "5つ星ホテル", th: "โรงแรม 5 ดาว", zh: "五星级酒店", fr: "Hôtels 5 étoiles", de: "5-Sterne-Hotels", es: "Hoteles 5 estrellas", ru: "5-звездочные отели" },
  specialty_dishes: { vi: "Món đặc sản", en: "Specialty Dishes", ko: "특색 요리", ja: "名物料理", th: "อาหารจานเด็ด", zh: "特色美食", fr: "Spécialités locales", de: "Lokale Spezialitäten", es: "Platos típicos", ru: "Фирменные блюда" },
  hot_checkins: { vi: "Check-in hot", en: "Hot Check-in Spots", ko: "핫 핫스팟", ja: "人気スポット", th: "จุดเช็คอินฮิต", zh: "热门打卡点", fr: "Spots photo populaires", de: "Beliebte Fotospots", es: "Lugares populares", ru: "Популярные места" },
  csdl_level: { vi: "Cấp Bậc 1 & 2 CSDL", en: "CSDL Level 1 & 2", ko: "데이터베이스 1 & 2단계", ja: "データベース レベル1 & 2", th: "ระดับฐานข้อมูล 1 & 2", zh: "数据库 1 & 2 级", fr: "Base de données Niveau 1 & 2", de: "Datenbank Stufe 1 & 2", es: "Nivel de BD 1 y 2", ru: "База данных Уровень 1 и 2" },

  // Hotel Detail Page
  about_stay: { vi: "VỀ NƠI LƯU TRÚ", en: "ABOUT THIS STAY", ko: "숙소 정보", ja: "宿泊施設について", th: "เกี่ยวกับที่พักนี้", zh: "关于此住宿", fr: "À PROPOS DE CET HÉBERGEMENT", de: "ÜBER DIESE UNTERKUNFT", es: "ACERCA DE ESTE ALOJAMIENTO", ru: "ОБ ЭТОМ ОБЪЕКТЕ" },
  memorable_stay_waiting: { vi: "Một kỳ nghỉ đáng nhớ đang chờ bạn", en: "A memorable stay awaits you", ko: "기억에 남을 휴가가 기다리고 있습니다", ja: "思い出に残る滞在があなたを待っています", th: "การเข้าพักที่น่าจดจำรอคุณอยู่", zh: "难忘的入住体验在此等待着您", fr: "Un séjour mémorable vous attend", de: "Ein unvergesslicher Aufenthalt erwartet Sie", es: "Una estancia memorable le espera", ru: "Вас ждет незабываемый отдых" },
  per_night_tax_inc: { vi: "/ đêm - đã bao gồm thuế", en: "/ night - taxes included", ko: "/ 박 - 세금 포함", ja: "/ 泊 - 税込", th: "/ คืน - รวมภาษีแล้ว", zh: "/ 晚 - 含税", fr: "/ nuit - taxes incluses", de: "/ Nacht - inkl. Steuern", es: "/ noche - impuestos incluidos", ru: "/ ночь - включая налоги" },
  select_your_room: { vi: "Chọn phòng của bạn", en: "Select your room", ko: "객실을 선택하세요", ja: "お部屋を選択してください", th: "เลือกห้องพักของคุณ", zh: "选择您的客房", fr: "Choisissez votre chambre", de: "Wählen Sie Ihr Zimmer", es: "Seleccione su habitación", ru: "Выберите ваш номер" },
  select_room_btn: { vi: "Chọn phòng", en: "Select room", ko: "객실 선택", ja: "部屋を選択", th: "เลือกห้อง", zh: "选择客房", fr: "Choisir la chambre", de: "Zimmer wählen", es: "Elegir habitación", ru: "Выбрать номер" },
  new_on_stayz: { vi: "Mới trên StayZ", en: "New on StayZ", ko: "StayZ 신규 숙소", ja: "StayZに新登場", th: "ใหม่บน StayZ", zh: "StayZ 新上线", fr: "Nouveau sur StayZ", de: "Neu auf StayZ", es: "Nuevo en StayZ", ru: "Новинка на StayZ" },

  // Amenities
  amenity_outdoor_pool: { vi: "Hồ bơi ngoài trời", en: "Outdoor pool", ko: "야외 수영장", ja: "屋外プール", th: "สระว่ายน้ำกลางแจ้ง", zh: "室外游泳池", fr: "Piscine extérieure", de: "Außenpool", es: "Piscina al aire libre", ru: "Открытый бассейн" },
  amenity_indoor_pool: { vi: "Hồ bơi trong nhà", en: "Indoor pool", ko: "실내 수영장", ja: "屋内プール", th: "สระว่ายน้ำในร่ม", zh: "室内游泳池", fr: "Piscine couverte", de: "Hallenbad", es: "Piscina cubierta", ru: "Крытый бассейн" },
  amenity_free_wifi: { vi: "Wi-Fi miễn phí", en: "Free Wi-Fi", ko: "무료 Wi-Fi", ja: "無料Wi-Fi", th: "ฟรี Wi-Fi", zh: "免费 Wi-Fi", fr: "Wi-Fi gratuit", de: "Kostenloses WLAN", es: "Wi-Fi gratis", ru: "Бесплатный Wi-Fi" },
  amenity_airport_shuttle: { vi: "Đưa đón sân bay", en: "Airport shuttle", ko: "공항 셔틀", ja: "空港送迎", th: "บริการรับ-ส่งสนามบิน", zh: "机场接送", fr: "Navette aéroport", de: "Flughafentransfer", es: "Traslado al aeropuerto", ru: "Трансфер от/до аэропорта" },
  amenity_non_smoking: { vi: "Phòng không hút thuốc", en: "Non-smoking room", ko: "금연 객실", ja: "禁煙ルーム", th: "ห้องพักปลอดบุหรี่", zh: "禁烟客房", fr: "Chambre non-fumeurs", de: "Nichtraucherzimmer", es: "Habitación para no fumadores", ru: "Номера для некурящих" },
  amenity_room_service: { vi: "Dịch vụ phòng", en: "Room service", ko: "룸서비스", ja: "ルームサービス", th: "รูมเซอร์วิส", zh: "客房服务", fr: "Service d'étage", de: "Zimmerservice", es: "Servicio de habitaciones", ru: "Обслуживание номеров" },
  amenity_restaurant: { vi: "Nhà hàng", en: "Restaurant", ko: "레스토랑", ja: "レストラン", th: "ร้านอาหาร", zh: "餐厅", fr: "Restaurant", de: "Restaurant", es: "Restaurante", ru: "Ресторан" },
  amenity_free_parking: { vi: "Bãi đỗ xe miễn phí", en: "Free parking", ko: "무료 주차", ja: "無料駐車場", th: "ที่จอดรถฟรี", zh: "免费停车场", fr: "Parking gratuit", de: "Kostenloser Parkplatz", es: "Aparcamiento gratuito", ru: "Бесплатная парковка" },
  amenity_family_room: { vi: "Phòng gia đình", en: "Family room", ko: "패밀리룸", ja: "ファミリールーム", th: "ห้องสำหรับครอบครัว", zh: "家庭房", fr: "Chambre familiale", de: "Familienzimmer", es: "Habitación familiar", ru: "Семейный номер" },
  amenity_bar: { vi: "Quầy bar", en: "Bar", ko: "바", ja: "バー", th: "บาร์", zh: "酒吧", fr: "Bar", de: "Bar", es: "Bar", ru: "Бар" },
  amenity_breakfast: { vi: "Bữa sáng", en: "Breakfast", ko: "조식", ja: "朝食", th: "อาหารเช้า", zh: "早餐", fr: "Petit-déjeuner", de: "Frühstück", es: "Desayuno", ru: "Завтрак" },
  amenity_gym: { vi: "Phòng gym", en: "Fitness gym", ko: "피트니스 센터", ja: "フィットネスジム", th: "ฟิตเนส", zh: "健身房", fr: "Salle de sport", de: "Fitnessstudio", es: "Gimnasio", ru: "Фитнес-центр" },
  amenity_spa: { vi: "Spa & Massage", en: "Spa & Massage", ko: "스파 & 마사지", ja: "スパ＆マッサージ", th: "สปาและนวด", zh: "水疗与按摩", fr: "Spa & Massage", de: "Spa & Massage", es: "Spa y masaje", ru: "Спа и массаж" },
  amenity_concierge: { vi: "Lễ tân 24/7", en: "24/7 Front desk", ko: "24시간 프런트 데스크", ja: "24時間対応フロント", th: "แผนกต้อนรับ 24 ชม.", zh: "24小时前台", fr: "Réception 24h/24", de: "24-Stunden-Rezeption", es: "Recepción 24h", ru: "Круглосуточная стойка" },

  // Room Specs
  room_capacity: { vi: "Sức chứa", en: "Capacity", ko: "수용 인원", ja: "定員", th: "ความจุ", zh: "容纳人数", fr: "Capacité", de: "Kapazität", es: "Capacidad", ru: "Вместимость" },
  room_beds: { vi: "Giường", en: "Beds", ko: "침대", ja: "ベッド", th: "เตียง", zh: "床型", fr: "Lits", de: "Betten", es: "Camas", ru: "Кровати" },
  room_area: { vi: "Diện tích", en: "Room size", ko: "객실 면적", ja: "広さ", th: "ขนาดห้อง", zh: "客房面积", fr: "Superficie", de: "Zimmergröße", es: "Tamaño", ru: "Площадь" },
  room_view: { vi: "Tầm nhìn", en: "View", ko: "전망", ja: "眺望", th: "วิว", zh: "景观", fr: "Vue", de: "Aussicht", es: "Vistas", ru: "Вид" },
  room_ac: { vi: "Điều hòa", en: "Air conditioning", ko: "에어컨", ja: "エアコン", th: "เครื่องปรับอากาศ", zh: "空调", fr: "Climatisation", de: "Klimaanlage", es: "Aire acondicionado", ru: "Кондиционер" },
  guests_label: { vi: "khách", en: "guests", ko: "명", ja: "名", th: "คน", zh: "人", fr: "personnes", de: "Gäste", es: "huéspedes", ru: "гостей" },
  king_bed_label: { vi: "Giường đôi King Size", en: "King Double Bed", ko: "킹 사이즈 더블 침대", ja: "キングサイズダブルベッド", th: "เตียงคิงไซส์", zh: "特大双人床", fr: "Grand lit King Size", de: "King-Size-Doppelbett", es: "Cama doble King Size", ru: "Двуспальная кровать King Size" }
};

languages.forEach((lang) => {
  const filePath = path.join(i18nDir, `${lang}.ts`);
  let content = fs.readFileSync(filePath, "utf-8");

  // Insert before closing };
  let newEntries = `\n  // ── 9. PAGE: COUNTRY DETAIL, HOTEL DETAIL & ROOM SPECS ────────────────────\n`;
  Object.keys(newPageKeys).forEach((key) => {
    if (!content.includes(`  ${key}:`)) {
      const val = newPageKeys[key][lang] || newPageKeys[key].en;
      newEntries += `  ${key}: "${val}",\n`;
    }
  });

  const insertIdx = content.lastIndexOf("};");
  if (insertIdx !== -1) {
    content = content.slice(0, insertIdx) + newEntries + "};\n";
    fs.writeFileSync(filePath, content, "utf-8");
  }
  console.log(`✅ Appended all page keys to web/src/lib/i18n/${lang}.ts`);
});
