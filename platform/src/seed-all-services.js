/**
 * =============================================================================
 * HUKI TRAVEL - MASTER SEED ALL SERVICES
 * =============================================================================
 * Seed đầy đủ dữ liệu cho 14 destinations với 8 phân hệ:
 * 1. HuKi Stay (Hotels) - Properties, Rooms
 * 2. HuKi Bus (Routes) - BusTrips, Operators
 * 3. HuKi Ride (Rentals) - Vehicles
 * 4. HuKi Flight (Airlines) - Flight routes
 * 5. HuKi Taste (Foods) - Food spots per destination
 * 6. HuKi Experience (Check-in) - Experience spots per destination
 * 7. HuKi Trip (Combos) - Combo packages
 * 8. HuKi Pass (QR Tickets) - Ticket templates
 * =============================================================================
 */

require("dotenv").config();
const mongoose = require("mongoose");

// Models
const Destination = require("./models/destinations.model");
const Property = require("./models/properties.model");
const Room = require("./models/rooms.model");
const BusTrip = require("./models/busTrips.model");
const Ride = require("./models/rides.model");
const Trip = require("./models/trips.model");
const HuKiPass = require("./models/hukiPass.model");
const FoodSpot = require("./models/foodSpots.model");
const ExperienceSpot = require("./models/experienceSpots.model");
const Flight = require("./models/flights.model");

const { DATABASE_URL } = require("./constants/app.constant");
const localUrl = process.env.LOCAL_DATABASE_URL || "mongodb://127.0.0.1:27017/stayz";

// =============================================================================
// I18N STRING HELPER
// =============================================================================
const i18n = (vi, en, ko, ja, th) => ({
  vi: vi || en,
  en: en || vi,
  ko: ko || en || vi,
  ja: ja || en || vi,
  th: th || en || vi,
});

// =============================================================================
// 14 DESTINATIONS CONFIG
// =============================================================================
const DESTINATIONS = [
  // === TRONG NƯỚC (VIETNAM) ===
  {
    slug: "da-nang",
    name: i18n("ĐÀ NẴNG", "DA NANG", "다낭", "ダナン", "ดานัง"),
    country: i18n("Việt Nam", "Vietnam", "베트남", "ベトナム", "เวียดนาม"),
    flag: "vn",
    is_domestic: true,
    lat: 16.0544,
    lng: 108.2022,
  },
  {
    slug: "da-lat",
    name: i18n("ĐÀ LẠT", "DA LAT", "달랏", "ダラット", "ดาลัด"),
    country: i18n("Việt Nam", "Vietnam", "베트남", "ベトナム", "เวียดนาม"),
    flag: "vn",
    is_domestic: true,
    lat: 11.9404,
    lng: 108.4583,
  },
  {
    slug: "phu-quoc",
    name: i18n("PHÚ QUỐC", "PHU QUOC", "푸꾸옥", "フーコック島", "ฟู้โกว๊ก"),
    country: i18n("Việt Nam", "Vietnam", "베트남", "ベトナム", "เวียดนาม"),
    flag: "vn",
    is_domestic: true,
    lat: 10.2894,
    lng: 103.9841,
  },
  {
    slug: "ha-noi",
    name: i18n("HÀ NỘI", "HANOI", "하노이", "ハノイ", "ฮานอย"),
    country: i18n("Việt Nam", "Vietnam", "베트남", "ベトナム", "เวียดนาม"),
    flag: "vn",
    is_domestic: true,
    lat: 21.0285,
    lng: 105.8542,
  },
  // === QUỐC TẾ ===
  {
    slug: "bali",
    name: i18n("BALI", "BALI", "발리", "バリ島", "บาหลี"),
    country: i18n("Indonesia", "Indonesia", "인도네시아", "インドネシア", "อินโดนีเซีย"),
    flag: "id",
    is_domestic: false,
    lat: -8.3405,
    lng: 115.0920,
  },
  {
    slug: "tokyo",
    name: i18n("TOKYO", "TOKYO", "도쿄", "東京", "โตเกียว"),
    country: i18n("Nhật Bản", "Japan", "일본", "日本", "ญี่ปุ่น"),
    flag: "jp",
    is_domestic: false,
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    slug: "bangkok",
    name: i18n("BANGKOK", "BANGKOK", "방콕", "バンコク", "กรุงเทพมหานคร"),
    country: i18n("Thái Lan", "Thailand", "태국", "タイ", "ประเทศไทย"),
    flag: "th",
    is_domestic: false,
    lat: 13.7563,
    lng: 100.5018,
  },
  {
    slug: "singapore",
    name: i18n("SINGAPORE", "SINGAPORE", "싱가포르", "シンガポール", "สิงคโปร์"),
    country: i18n("Singapore", "Singapore", "싱가포르", "シンガポール", "สิงคโปร์"),
    flag: "sg",
    is_domestic: false,
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    slug: "seoul",
    name: i18n("SEOUL", "SEOUL", "서울", "ソウル", "โซล"),
    country: i18n("Hàn Quốc", "South Korea", "대한민국", "韓国", "เกาหลีใต้"),
    flag: "kr",
    is_domestic: false,
    lat: 37.5665,
    lng: 126.9780,
  },
  {
    slug: "kuala-lumpur",
    name: i18n("KUALA LUMPUR", "KUALA LUMPUR", "쿠알라룸푸르", "クアラルンプール", "กัวลาลัมเปอร์"),
    country: i18n("Malaysia", "Malaysia", "말레이시아", "マレーシア", "มาเลเซีย"),
    flag: "my",
    is_domestic: false,
    lat: 3.1390,
    lng: 101.6869,
  },
  {
    slug: "manila",
    name: i18n("MANILA", "MANILA", "마닐라", "マニラ", "มะนิลา"),
    country: i18n("Philippines", "Philippines", "필리핀", "フィリピン", "ฟิลิปปินส์"),
    flag: "ph",
    is_domestic: false,
    lat: 14.5995,
    lng: 120.9842,
  },
  {
    slug: "siem-reap",
    name: i18n("SIEM REAP", "SIEM REAP", "시엠리앗", "シェムリアップ", "เสียมเรียบ"),
    country: i18n("Cambodia", "Cambodia", "캄보디아", "カンボジア", "กัมพูชา"),
    flag: "kh",
    is_domestic: false,
    lat: 13.3633,
    lng: 103.8564,
  },
  {
    slug: "yangon",
    name: i18n("YANGON", "YANGON", "양곤", "ヤンゴン", "ย่างกุ้ง"),
    country: i18n("Myanmar", "Myanmar", "미얀마", "ミャンマー", "เมียนมาร์"),
    flag: "mm",
    is_domestic: false,
    lat: 16.8661,
    lng: 96.1951,
  },
  {
    slug: "beijing",
    name: i18n("BẮC KINH", "BEIJING", "베이징", "北京", "ปักกิ่ง"),
    country: i18n("Trung Quốc", "China", "중국", "中国", "จีน"),
    flag: "cn",
    is_domestic: false,
    lat: 39.9042,
    lng: 116.4074,
  },
  {
    slug: "sydney",
    name: i18n("SYDNEY", "SYDNEY", "시드니", "シドニー", "ซิดนีย์"),
    country: i18n("Úc", "Australia", "호주", "オーストラリア", "ออสเตรเลีย"),
    flag: "au",
    is_domestic: false,
    lat: -33.8688,
    lng: 151.2093,
  },
];

// =============================================================================
// HOTELS DATA PER DESTINATION (2-5 hotels each)
// =============================================================================
const generateHotels = (dest) => {
  const hotels = [
    {
      title: dest.is_domestic
        ? `${dest.name.vi} Grand Plaza Hotel`
        : `${dest.name.vi} International Hotel`,
      slug: `${dest.slug}-grand-plaza`,
      city: dest.slug,
      address: dest.is_domestic ? `123 Đường Nguyễn Huệ, ${dest.name.vi}` : `123 Main Street, ${dest.name.en}`,
      type: "hotel",
      latitude: dest.lat + 0.002,
      longitude: dest.lng + 0.001,
      base_price: dest.is_domestic ? 1500000 : 120,
      description: i18n(
        `Khách sạn 5 sao sang trọng tại ${dest.name.vi} với tầm nhìn tuyệt đẹp và dịch vụ đẳng cấp.`,
        `Luxurious 5-star hotel in ${dest.name.en} with stunning views and world-class service.`,
        `${dest.name.ko}의 세계적 수준의 서비스와 훌륭한 전망을 자랑하는 럭셔리 5성 호텔.`,
        `${dest.name.ja}を見渡す素晴らしい眺めとワールドクラスのサービスを誇る豪華な5つ星ホテル。`,
        `โรงแรมหรู 5 ดาวที่${dest.name.th} พร้อมวิวทิวทัศน์ที่สวยงามและบริการระดับโลก`
      ),
      is_preferred: true,
      amenities: {
        outdoor_pool: true,
        free_wifi: true,
        airport_shuttle: dest.is_domestic,
        non_smoking_room: true,
        room_service: true,
        restaurant: true,
        free_parking: dest.is_domestic,
        family_room: true,
        bar: true,
        breakfast: true,
      },
      rating: 4.8,
      main_image_url: `https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85`,
    },
    {
      title: dest.is_domestic
        ? `${dest.name.vi} Beach Resort & Spa`
        : `${dest.name.en} Oceanfront Resort`,
      slug: `${dest.slug}-beach-resort`,
      city: dest.slug,
      address: dest.is_domestic ? `456 Bãi Biển, ${dest.name.vi}` : `456 Beach Road, ${dest.name.en}`,
      type: "resort",
      latitude: dest.lat + 0.005,
      longitude: dest.lng + 0.003,
      base_price: dest.is_domestic ? 2800000 : 200,
      description: i18n(
        `Khu nghỉ dưỡng biển 5 sao tại ${dest.name.vi} với spa cao cấp và hồ bơi vô cực.`,
        `Beachfront 5-star resort in ${dest.name.en} with premium spa and infinity pool.`,
        `${dest.name.ko}의 프리미엄 스파와 인피니티 풀이 있는 해변 5성 리조트.`,
        `${dest.name.ja}のプレミアムスパとインフィニティプール付き海滨5つ星リゾート。`,
        `รีสอร์ทริมหาด 5 ดาวที่${dest.name.th} พร้อมสปาระดับพรีเมียมและสระว่ายน้ำไร้ขอบ`
      ),
      is_preferred: true,
      amenities: {
        outdoor_pool: true,
        free_wifi: true,
        airport_shuttle: dest.is_domestic,
        non_smoking_room: true,
        room_service: true,
        restaurant: true,
        free_parking: dest.is_domestic,
        family_room: true,
        bar: true,
        breakfast: true,
      },
      rating: 4.9,
      main_image_url: `https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85`,
    },
  ];

  // Add more hotels for international destinations
  if (!dest.is_domestic) {
    hotels.push({
      title: `${dest.name.en} Business Hotel`,
      slug: `${dest.slug}-business-hotel`,
      city: dest.slug,
      address: `789 Business District, ${dest.name.en}`,
      type: "hotel",
      latitude: dest.lat + 0.008,
      longitude: dest.lng + 0.006,
      base_price: 90,
      description: i18n(
        `Khách sạn business 4 sao tiện nghi cho khách công tác tại ${dest.name.vi}.`,
        `4-star business hotel for corporate travelers in ${dest.name.en}.`,
        `${dest.name.ko} 출장 고객을 위한 4성 비즈니스 호텔.`,
        `${dest.name.ja}の出張旅行者向け4つ星ビジネスホテル。`,
        `โรงแรมธุรกิจ 4 ดาวสำหรับนักธุรกิจที่${dest.name.th}`
      ),
      is_preferred: false,
      amenities: {
        outdoor_pool: false,
        free_wifi: true,
        airport_shuttle: true,
        non_smoking_room: true,
        room_service: true,
        restaurant: true,
        free_parking: false,
        family_room: false,
        bar: true,
        breakfast: true,
      },
      rating: 4.5,
      main_image_url: `https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85`,
    });
  }

  // Budget hostel for domestic
  if (dest.is_domestic) {
    hotels.push({
      title: `${dest.name.vi} Backpacker Hostel`,
      slug: `${dest.slug}-backpacker`,
      city: dest.slug,
      address: `11 Phố Du Lịch, ${dest.name.vi}`,
      type: "hostel",
      latitude: dest.lat + 0.001,
      longitude: dest.lng - 0.002,
      base_price: 180000,
      description: i18n(
        `Hostel tiết kiệm cho backpacker tại ${dest.name.vi} gần các điểm du lịch nổi tiếng.`,
        `Budget hostel for backpackers in ${dest.name.en} near famous tourist spots.`,
        `${dest.name.ko}의 유명 관광지 근처的大学生背囊旅旅行者을 위한 관광지 근처 저렴한 호스텔.`,
        `${dest.name.ja}の名所近くに佇めるバックパッカー向けBudget hostel.`,
        `โฮสเทลราคาประหยัดสำหรับแบ็คแพ็คเกอร์ที่${dest.name.th} ใกล้แหล่งท่องเที่ยวยอดนิยม`
      ),
      is_preferred: false,
      amenities: {
        outdoor_pool: false,
        free_wifi: true,
        airport_shuttle: false,
        non_smoking_room: true,
        room_service: false,
        restaurant: false,
        free_parking: false,
        family_room: false,
        bar: true,
        breakfast: true,
      },
      rating: 4.2,
      main_image_url: `https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1600&q=85`,
    });
  }

  return hotels;
};

// =============================================================================
// ROOMS DATA
// =============================================================================
const generateRooms = (propertyId, basePrice, currency = "VND") => {
  const roomTypes = [
    {
      name: "Standard Room",
      room_type: "standard_room",
      price: basePrice,
      original_price: Math.round(basePrice * 1.15),
      discount_percent: 15,
      capacity: 2,
      bed_info: "1 Queen Bed",
      area: 28,
      view: "City View",
    },
    {
      name: "Deluxe Room",
      room_type: "deluxe_room",
      price: Math.round(basePrice * 1.5),
      original_price: Math.round(basePrice * 1.8),
      discount_percent: 17,
      capacity: 2,
      bed_info: "1 King Bed",
      area: 35,
      view: "Ocean View",
    },
    {
      name: "Suite",
      room_type: "suite",
      price: Math.round(basePrice * 2.5),
      original_price: Math.round(basePrice * 3.0),
      discount_percent: 17,
      capacity: 3,
      bed_info: "1 King + 1 Sofa",
      area: 55,
      view: "Panoramic View",
    },
  ];

  return roomTypes.map((r) => ({
    ...r,
    property_id: propertyId,
    is_active: true,
    quantity: 5,
    amenities: {
      toiletries: true,
      shower: true,
      toilet: true,
      towels: true,
      socket_near_bed: true,
      sitting_area: r.room_type !== "standard_room",
      private_entrance: r.room_type === "suite",
      slippers: true,
      hair_dryer: true,
      fan: false,
      electric_kettle: true,
      wardrobe: true,
      clothes_rack: true,
      toilet_paper: true,
    },
    badges: {
      balcony: r.room_type === "suite",
      air_conditioning: true,
      private_bathroom: true,
      terrace: r.room_type === "suite",
      free_wifi: true,
      garden_view: false,
      courtyard_view: false,
    },
  }));
};

// =============================================================================
// BUS ROUTES DATA (Per destination)
// =============================================================================
const generateBusRoutes = (dest) => {
  if (dest.is_domestic) {
    return [
      {
        busOperator: "FUTA Bus Lines - Phương Trang",
        route: { from: dest.name.vi, to: "TP. Hồ Chí Minh" },
        busType: "SLEEPER_2_TIER",
        totalSeats: 36,
        pricePerSeat: dest.slug === "da-nang" ? 350000 : 450000,
      },
      {
        busOperator: "Sao Việt Express",
        route: { from: "Hà Nội", to: dest.name.vi },
        busType: "LIMOUSINE_VIP",
        totalSeats: 24,
        pricePerSeat: dest.slug === "da-lat" ? 380000 : 420000,
      },
    ];
  }
  return [
    {
      busOperator: `${dest.name.en} City Bus Service`,
      route: { from: dest.name.en, to: `${dest.name.en} Airport` },
      busType: "SEATER",
      totalSeats: 45,
      pricePerSeat: 15,
    },
  ];
};

// =============================================================================
// CAR RENTAL DATA
// =============================================================================
const generateRides = (dest) => {
  const rides = [
    {
      vehicleName: "Toyota Camry / Honda Accord",
      vehicleType: "CAR_4_SEAT",
      pricePerDay: dest.is_domestic ? 800000 : 65,
    },
    {
      vehicleName: "Toyota Fortuner / Ford Everest",
      vehicleType: "CAR_7_SEAT",
      pricePerDay: dest.is_domestic ? 1400000 : 95,
    },
    {
      vehicleName: "Honda Winner / Yamaha MT",
      vehicleType: "MOTORBIKE_MANUAL",
      pricePerDay: dest.is_domestic ? 150000 : 12,
    },
  ];

  if (!dest.is_domestic) {
    rides.push({
      vehicleName: "BMW 5 Series / Mercedes E-Class",
      vehicleType: "CAR_4_SEAT",
      pricePerDay: 180,
    });
  }

  return rides;
};

// =============================================================================
// FOOD SPOTS DATA (2-3 per destination)
// =============================================================================
const generateFoods = (dest) => {
  const foods = [
    {
      slug: `${dest.slug}-local-specialty-1`,
      title: i18n(
        `Đặc sản truyền thống ${dest.name.vi}`,
        `Traditional ${dest.name.en} Local Specialty`,
        `${dest.name.ko}의 전통 특색 요리`,
        `${dest.name.ja}の伝統名物料理`,
        `อาหารพื้นเมืองดั้งเดิมของ${dest.name.th}`
      ),
      description: i18n(
        "Món ăn đặc trưng địa phương được chế biến theo công thức gia truyền.",
        "Signature local dish prepared with traditional family recipe.",
        "전통 가족 레시피로 만든 대표 요리.",
        "伝統的な家族のレシピで作った代表料理。",
        "อาหารประจำท้องถิ่นทำตามสูตรดั้งเดิมของครอบครัว"
      ),
      price_range: dest.is_domestic ? "50,000 - 150,000 VND" : "$8 - $25",
      image_url: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=85`,
      recommended_spots: [
        i18n(
          `Nhà hàng ${dest.name.vi} Traditional`,
          `${dest.name.en} Traditional Restaurant`,
          `${dest.name.ko} 전통 식당`,
          `${dest.name.ja}伝統レストラン`,
          `ร้านอาหารดั้งเดิม${dest.name.th}`
        ),
      ],
    },
    {
      slug: `${dest.slug}-seafood-1`,
      title: i18n(
        `Hải sản tươi sống ${dest.name.vi}`,
        `Fresh Seafood at ${dest.name.en}`,
        `${dest.name.ko}의 신선한 해산물`,
        `${dest.name.ja}の新鮮なシーフード`,
        `อาหารทะเลสดใหม่ที่${dest.name.th}`
      ),
      description: i18n(
        "Hải sản tươi sống được chọn lựa trực tiếp tại bể chứa, chế biến theo yêu cầu.",
        "Live seafood selected directly from tanks, cooked to order.",
        "直接水槽から選んだ活きた海鲜,其場で調理.",
        " مباشرة水槽から選んだ活きたシーフード为其場で調理.",
        "อาหารทะเลสดเลือกจากตู้โดยตรง ปรุงสดตามสั่ง"
      ),
      price_range: dest.is_domestic ? "150,000 - 500,000 VND" : "$15 - $45",
      image_url: `https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=85`,
      recommended_spots: [
        i18n(
          `${dest.name.vi} Seafood Market`,
          `${dest.name.en} Seafood Market`,
          `${dest.name.ko}海鲜市場`,
          `${dest.name.ja}シーフードマーケット`,
          `ตลาดอาหารทะเล${dest.name.th}`
        ),
      ],
    },
  ];

  // Add street food for domestic
  if (dest.is_domestic) {
    foods.push({
      slug: `${dest.slug}-street-food-1`,
      title: i18n(
        `Đặc sản đường phố ${dest.name.vi}`,
        `${dest.name.en} Street Food Alley`,
        `${dest.name.ko}의 길거리 음식 골목`,
        `${dest.name.ja}の屋台料理通り`,
        `ถนนอาหารข้างทาง${dest.name.th}`
      ),
      description: i18n(
        "Khu phố ẩm thực đường phố với hàng trăm món ngon giá sinh viên.",
        "Street food alley with hundreds of delicious dishes at student prices.",
        "学生価格の美味しい料理が数百種類ある屋台料理通りです.",
        "学生価格の美味しい料理が数百種類ある屋台料理通りです.",
        "ถนนอาหารข้างทางพร้อมอาหารอร่อยนับร้อยเมนูในราคานักศึกษา"
      ),
      price_range: "20,000 - 80,000 VND",
      image_url: `https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85`,
      recommended_spots: [
        i18n(
          `${dest.name.vi} Night Market`,
          `${dest.name.en} Night Market`,
          `${dest.name.ko} 야시장`,
          `${dest.name.ja}夜市`,
          `ตลาดกลางคืน${dest.name.th}`
        ),
      ],
    });
  }

  return foods;
};

// =============================================================================
// EXPERIENCE SPOTS DATA (2-3 per destination)
// =============================================================================
const generateExperiences = (dest) => {
  const experiences = [
    {
      slug: `${dest.slug}-landmark-1`,
      title: i18n(
        `Địa điểm check-in nổi tiếng ${dest.name.vi}`,
        `Famous Check-in Spot at ${dest.name.en}`,
        `${dest.name.ko}의 유명 체크인 명소`,
        `${dest.name.ja}の有名チェックインスポット`,
        `จุดเช็คอินยอดนิยมที่${dest.name.th}`
      ),
      description: i18n(
        "Địa điểm check-in sống ảo với triệu lượt like trên mạng xã hội.",
        "Instagram-worthy photo spot with millions of social media likes.",
        "SNSで数百万のいいねを獲得したインスタ映えスポット.",
        "SNSで数百万のいいね，获得了するインスタ映えスポット.",
        "จุดถ่ายรูปยอดนิยมบนโซเชียลมีเดียที่มีไลค์หลายล้าน"
      ),
      image_url: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=85`,
      category: "checkin",
      location_name: i18n(
        dest.name.vi,
        dest.name.en,
        dest.name.ko,
        dest.name.ja,
        dest.name.th
      ),
    },
    {
      slug: `${dest.slug}-nature-1`,
      title: i18n(
        `Thiên nhiên tuyệt đẹp ${dest.name.vi}`,
        `Natural Beauty of ${dest.name.en}`,
        `${dest.name.ko}의 아름다운 자연`,
        `${dest.name.ja}の美しい自然`,
        `ความงามทางธรรมชาติของ${dest.name.th}`
      ),
      description: i18n(
        "Khám phá vẻ đẹp thiên nhiên hoang sơ của địa phương.",
        "Explore the pristine natural beauty of the local area.",
        "해당 지역의 손길 없는 아름다운 자연을 탐험하세요.",
        "その地域の 손길 없는美しい自然을 탐험하세요.",
        "สำรวจความงามทางธรรมชาติแบบนอกคอกของพื้นที่"
      ),
      image_url: `https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=85`,
      category: "nature",
      location_name: i18n(
        dest.name.vi,
        dest.name.en,
        dest.name.ko,
        dest.name.ja,
        dest.name.th
      ),
    },
    {
      slug: `${dest.slug}-culture-1`,
      title: i18n(
        `Di sản văn hóa ${dest.name.vi}`,
        `Cultural Heritage of ${dest.name.en}`,
        `${dest.name.ko}의 문화 유산`,
        `${dest.name.ja}の文化的遺産`,
        `มรดกทางวัฒนธรรมของ${dest.name.th}`
      ),
      description: i18n(
        "Trải nghiệm văn hóa đặc sắc và lịch sử lâu đời.",
        "Experience distinctive culture and ancient history.",
        "독특한 문화와 고대 역사를 경험하세요.",
        "独特な文化と古代歴史を経験してください.",
        "สัมผัสวัฒนธรรมที่โดดเด่นและประวัติศาสตร์โบราณ"
      ),
      image_url: `https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=85`,
      category: "culture",
      location_name: i18n(
        dest.name.vi,
        dest.name.en,
        dest.name.ko,
        dest.name.ja,
        dest.name.th
      ),
    },
  ];

  return experiences;
};

// =============================================================================
// SEED FUNCTIONS
// =============================================================================

async function seedHotelsAndRooms(dest) {
  const hotels = generateHotels(dest);
  for (const hotel of hotels) {
    const rooms = generateRooms(null, hotel.base_price, hotel.base_price > 500 ? "USD" : "VND");

    const prop = await Property.findOneAndUpdate(
      { slug: hotel.slug },
      {
        title: hotel.title,
        slug: hotel.slug,
        city: hotel.city,
        address: hotel.address,
        type: hotel.type,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        base_price: hotel.base_price,
        description: hotel.description.vi, // Vietnamese as master
        description_en: hotel.description.en, // English separately
        is_preferred: hotel.is_preferred,
        amenities: hotel.amenities,
        main_image_url: hotel.main_image_url,
        is_active: true,
      },
      { upsert: true, new: true }
    );

    // Seed rooms
    for (const room of rooms) {
      await Room.findOneAndUpdate(
        { property_id: prop._id, name: room.name },
        {
          ...room,
          property_id: prop._id,
        },
        { upsert: true, new: true }
      );
    }

    console.log(`  ✓ Hotel: ${hotel.title}`);
  }
}

async function seedRides(dest) {
  const rides = generateRides(dest);
  let plateCounter = 100;

  for (const ride of rides) {
    const plateNum = String(plateCounter++).padStart(4, "0");
    const plate = `${dest.flag.toUpperCase()}-${plateNum}`;

    await Ride.findOneAndUpdate(
      { licensePlate: plate },
      {
        vehicleName: ride.vehicleName,
        vehicleType: ride.vehicleType,
        licensePlate: plate,
        city: dest.slug,
        pricePerDay: ride.pricePerDay,
        depositAmount: Math.round(ride.pricePerDay * 3),
        deliveryOptions: ["STORE_PICKUP"],
        requiresKYC: true,
        status: "AVAILABLE",
        isDeleted: false,
      },
      { upsert: true, new: true }
    );
    console.log(`  🚗 Ride: ${ride.vehicleName} (${plate})`);
  }
}

async function seedFlights(dest) {
  // International destinations have flights
  if (dest.is_domestic) {
    console.log("  ✈️ Flights: Domestic (skipped - use bus)");
    return;
  }

  const airlines = [
    { name: "Vietnam Airlines", code: "VN" },
    { name: "VietJet Air", code: "VJ" },
    { name: "Jetstar Pacific", code: "BL" },
    { name: "Singapore Airlines", code: "SQ" },
    { name: "Thai Airways", code: "TG" },
    { name: "AirAsia", code: "AK" },
  ];

  const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];
  const flightNum = Math.floor(Math.random() * 900) + 100;

  // Flight from origin city to destination
  const departure = new Date();
  departure.setDate(departure.getDate() + Math.floor(Math.random() * 14) + 1);
  departure.setHours(6 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60), 0, 0);

  const durationMinutes = 60 + Math.floor(Math.random() * 180); // 1-4 hours
  const arrival = new Date(departure.getTime() + durationMinutes * 60000);

  const price = dest.slug === "tokyo" || dest.slug === "seoul" || dest.slug === "singapore" ? 3500000 : 2500000;

  await Flight.findOneAndUpdate(
    { flightNumber: `${randomAirline.code}${flightNum}`, "route.to": dest.name.en },
    {
      airline: randomAirline.name,
      airlineCode: randomAirline.code,
      flightNumber: `${randomAirline.code}${flightNum}`,
      route: {
        from: "TP. Hồ Chí Minh",
        to: dest.name.en,
      },
      departureTime: departure,
      arrivalTime: arrival,
      duration: durationMinutes,
      pricePerSeat: price,
      currency: "VND",
      seatClass: "ECONOMY",
      availableSeats: 20 + Math.floor(Math.random() * 80),
      aircraft: Math.random() > 0.5 ? "Boeing 737" : "Airbus A320",
      baggage: "20kg",
      is_active: true,
      is_deleted: false,
    },
    { upsert: true, new: true }
  );

  console.log(`  ✈️ Flight: ${randomAirline.code}${flightNum} (SGN → ${dest.name.en})`);
}

async function seedBusRoutes(dest) {
  const routes = generateBusRoutes(dest);
  for (const route of routes) {
    // Generate seat map
    const seatMap = [];
    for (let deck = 1; deck <= 2; deck++) {
      for (let row = 1; row <= Math.ceil(route.totalSeats / 4); row++) {
        for (let col = 1; col <= 4; col++) {
          const seatNo = `${String.fromCharCode(64 + deck)}${row}${String.fromCharCode(64 + col)}`;
          if (seatMap.length < route.totalSeats) {
            seatMap.push({
              seatNo,
              deck,
              status: "AVAILABLE",
              lockedByUserId: null,
              lockExpiresAt: null,
            });
          }
        }
      }
    }

    const departure = new Date();
    departure.setDate(departure.getDate() + Math.floor(Math.random() * 7) + 1);
    departure.setHours(6 + Math.floor(Math.random() * 14), 0, 0, 0);

    const arrival = new Date(departure);
    arrival.setHours(arrival.getHours() + 8);

    await BusTrip.findOneAndUpdate(
      { busOperator: route.busOperator, "route.from": route.route.from, "route.to": route.route.to },
      {
        busOperator: route.busOperator,
        route: route.route,
        departureTime: departure,
        arrivalTime: arrival,
        pricePerSeat: route.pricePerSeat,
        busType: route.busType,
        seatMap,
        isDeleted: false,
      },
      { upsert: true, new: true }
    );
    console.log(`  ✓ Bus: ${route.busOperator} (${route.route.from} → ${route.route.to})`);
  }
}

async function seedFoodsAndExperiences(dest) {
  const destDoc = await Destination.findOne({ slug: dest.slug });
  if (!destDoc) {
    console.log(`  ⚠ Destination ${dest.slug} not found, skipping foods/experiences`);
    return;
  }

  const foods = generateFoods(dest);
  const experiences = generateExperiences(dest);

  // Seed FoodSpots collection
  for (const food of foods) {
    await FoodSpot.findOneAndUpdate(
      { slug: food.slug },
      {
        slug: food.slug,
        name: food.title.vi,
        name_en: food.title.en,
        description: food.description.vi,
        description_en: food.description.en,
        category: "LOCAL_SPECIALTY",
        price_range: food.price_range,
        city: dest.slug,
        main_image_url: food.image_url,
        recommended_spots: food.recommended_spots.map((s) => ({
          name: s.vi || s.en,
        })),
        is_active: true,
        is_deleted: false,
      },
      { upsert: true, new: true }
    );
  }

  // Seed ExperienceSpots collection
  for (const exp of experiences) {
    await ExperienceSpot.findOneAndUpdate(
      { slug: exp.slug },
      {
        slug: exp.slug,
        name: exp.title.vi,
        name_en: exp.title.en,
        description: exp.description.vi,
        description_en: exp.description.en,
        category: exp.category.toUpperCase(),
        city: dest.slug,
        main_image_url: exp.image_url,
        is_active: true,
        is_deleted: false,
      },
      { upsert: true, new: true }
    );
  }

  // Also update destination document
  await Destination.findOneAndUpdate(
    { slug: dest.slug },
    {
      foods: foods.map((f) => ({
        slug: f.slug,
        title: f.title,
        description: f.description,
        image_url: f.image_url,
        price_range: f.price_range,
        recommended_spots: f.recommended_spots,
      })),
      activities: experiences.map((e) => ({
        slug: e.slug,
        title: e.title,
        description: e.description,
        image_url: e.image_url,
        category: e.category,
        location_name: e.location_name,
      })),
    }
  );

  console.log(`  ✓ Foods: ${foods.length}, Experiences: ${experiences.length}`);
}

// =============================================================================
// MAIN SEED FUNCTION
// =============================================================================

async function runSeed() {
  console.log("🚀 HUKI TRAVEL - MASTER SEED ALL SERVICES");
  console.log("=========================================\n");

  try {
    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(localUrl, { serverSelectionTimeoutMS: 5000 });
    console.log("✅ Connected to Local MongoDB!\n");

    for (const dest of DESTINATIONS) {
      console.log(`\n🌍 Seeding: ${dest.name.vi} (${dest.slug})`);

      // 1. Hotels & Rooms
      console.log("  📦 Hotels & Rooms...");
      await seedHotelsAndRooms(dest);

      // 2. Bus Routes
      console.log("  🚌 Bus Routes...");
      await seedBusRoutes(dest);

      // 3. Flights (international only)
      console.log("  ✈️ Flights...");
      await seedFlights(dest);

      // 4. Rides (Car/Motor rentals)
      console.log("  🚗 Rides...");
      await seedRides(dest);

      // 5. Foods & Experiences
      console.log("  🍜 Foods & Experiences...");
      await seedFoodsAndExperiences(dest);
    }

    console.log("\n=========================================");
    console.log("✅ SEED ALL SERVICES COMPLETED!");
    console.log("=========================================");
    console.log(`
📊 Summary:
- Destinations: ${DESTINATIONS.length}
- Hotels: ~${DESTINATIONS.length * 3} properties
- Bus Routes: ~${DESTINATIONS.filter(d => d.is_domestic).length * 2 + DESTINATIONS.filter(d => !d.is_domestic).length} routes
- Foods: ~${DESTINATIONS.length * 2.5} dishes
- Experiences: ~${DESTINATIONS.length * 3} spots
    `);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

runSeed();
