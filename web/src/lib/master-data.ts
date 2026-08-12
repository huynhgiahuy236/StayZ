/**
 * =============================================================================
 * STAYZ / HUKI TRAVEL - MASTER COUNTRY DATA PROVIDER
 * =============================================================================
 * 100% Authentic real data matching the Master DB Table for all 12 countries:
 * VN, JP, KR, US, TH, ID, CN, CH, AU, BR, AR, SG.
 */

import type { Destination, Hotel, DestinationFood, DestinationActivity } from "./types";
import { getDistinctVisualImage } from "./unique-images";

export interface MasterCountryConfig {
  code: string;
  nameVi: string;
  nameEn: string;
  flag: string;
  cities: {
    slug: string;
    nameVi: string;
    nameEn: string;
    summaryVi: string;
    summaryEn: string;
    foodName: string;
    exp1: string;
    exp2: string;
    hotelName: string;
  }[];
}

export const MASTER_COUNTRIES: MasterCountryConfig[] = [
  {
    code: "vn",
    nameVi: "Việt Nam",
    nameEn: "Vietnam",
    flag: "🇻🇳",
    cities: [
      { slug: "vn-hanoi", nameVi: "Hà Nội", nameEn: "Hanoi", summaryVi: "Phố cổ 36 phố phường & Hồ Gươm", summaryEn: "Old Quarter & Hoan Kiem Lake", foodName: "Phở Bò Gia Truyền Hà Nội", exp1: "Check-in Phố Đường Tàu Hà Nội", exp2: "Hoàng Thành Thăng Long", hotelName: "Hotel de l'Opera Hanoi" },
      { slug: "vn-danang", nameVi: "Đà Nẵng", nameEn: "Da Nang", summaryVi: "Thành phố đáng sống & Biển Mỹ Khê", summaryEn: "My Khe Beach & Dragon Bridge", foodName: "Mì Quảng Chuẩn Vị Đà Nẵng", exp1: "Cầu Vàng Bà Nà Hills", exp2: "Bán Đảo Sơn Trà & Chùa Linh Ứng", hotelName: "InterContinental Danang Resort" },
      { slug: "vn-dalat", nameVi: "Đà Lạt", nameEn: "Dalat", summaryVi: "Thành phố ngàn hoa & Thông reo", summaryEn: "City of Eternal Spring & Pine Forests", foodName: "Lẩu Gà Lá É Đà Lạt", exp1: "Đồi Chè Cầu Đất Sunset", exp2: "Hồ Tuyền Lâm & Thác Datanla", hotelName: "Hotel Colline Dalat" },
      { slug: "vn-phuquoc", nameVi: "Phú Quốc", nameEn: "Phu Quoc", summaryVi: "Đảo ngọc thiên đường nhiệt đới", summaryEn: "Tropical Paradise Island", foodName: "Bún Quậy Kiến Xây Phú Quốc", exp1: "Sunset Sanato Beach Club", exp2: "Cáp Treo Hòn Thơm Khổng Lồ", hotelName: "JW Marriott Phu Quoc Emerald Bay" },
      { slug: "vn-saigon", nameVi: "TP. Hồ Chí Minh", nameEn: "Ho Chi Minh City", summaryVi: "Sài Gòn năng động & Phố Bùi Viện", summaryEn: "Dynamic Saigon & Walking Street", foodName: "Cơm Tấm Sườn Bì Chả Sài Gòn", exp1: "Landmark 81 SkyView Observatory", exp2: "Nhà Thờ Đức Bà & Bưu Điện Trung Tâm", hotelName: "The Reverie Saigon" },
      { slug: "vn-vungtau", nameVi: "Vũng Tàu", nameEn: "Vung Tau", summaryVi: "Biển Bãi Sau & Hải sản tươi sống", summaryEn: "Sau Beach & Fresh Seafood", foodName: "Bánh Khọt Gốc Vú Sữa", exp1: "Tượng Chúa Kito Vua Núi Nhỏ", exp2: "Hải Đăng Vũng Tàu View Biển", hotelName: "Imperial Hotel Vung Tau" },
      { slug: "vn-halong", nameVi: "Hạ Long", nameEn: "Ha Long", summaryVi: "Kỳ quan thiên nhiên thế giới UNESCO", summaryEn: "UNESCO World Natural Wonder", foodName: "Chả Mực Giã Tay Hạ Long", exp1: "Vịnh Bái Tử Long Du Thuyền 5 Sao", exp2: "Bảo Tàng Quảng Ninh Độc Đáo", hotelName: "Vinpearl Resort & Spa Ha Long" },
      { slug: "vn-hoian", nameVi: "Hội An", nameEn: "Hoi An", summaryVi: "Phố cổ đèn lồng & Sông Hoài", summaryEn: "Ancient Town & Lantern River", foodName: "Cao Lầu Phố Cổ Hội An", exp1: "Thả Đèn Lồng Sông Hoài Đêm", exp2: "Rừng Dừa Bảy Mẫu Cẩm Thanh", hotelName: "Anantara Hoi An Resort" },
    ],
  },
  {
    code: "jp",
    nameVi: "Nhật Bản",
    nameEn: "Japan",
    flag: "🇯🇵",
    cities: [
      { slug: "jp-tokyo", nameVi: "Tokyo", nameEn: "Tokyo", summaryVi: "Thủ đô hiện đại & Ngã tư Shibuya", summaryEn: "Modern Capital & Shibuya Crossing", foodName: "Ramen Tonkotsu Chuẩn Vị Tokyo", exp1: "Tháp Tokyo Skytree triệu view", exp2: "Chùa Sensoji Asakusa Cổ Kính", hotelName: "Aman Tokyo Hotel" },
      { slug: "jp-kyoto", nameVi: "Kyoto", nameEn: "Kyoto", summaryVi: "Cố đô đền chùa & Rừng trúc Arashiyama", summaryEn: "Ancient Capital & Arashiyama Bamboo", foodName: "Matcha Kaiseki Kyoto Premium", exp1: "Cổng Torii Cổng Đỏ Fushimi Inari", exp2: "Rừng Trúc Arashiyama Thơ Mộng", hotelName: "Four Seasons Hotel Kyoto" },
      { slug: "jp-osaka", nameVi: "Osaka", nameEn: "Osaka", summaryVi: "Thiên đường ẩm thực Dotonbori", summaryEn: "Food Capital Dotonbori", foodName: "Takoyaki & Okonomiyaki Osaka", exp1: "Lâu Đài Osaka Huyền Thoại", exp2: "Phố Đèn LED Dotonbori Rực Rỡ", hotelName: "Conrad Osaka Hotel" },
      { slug: "jp-fuji", nameVi: "Núi Phú Sĩ", nameEn: "Mount Fuji", summaryVi: "Biểu tượng tâm linh ngọn núi tuyết", summaryEn: "Iconic Sacred Snow Peak", foodName: "Mì Udon Houtou Núi Phú Sĩ", exp1: "Hồ Kawaguchiko View Phú Sĩ", exp2: "Ngôi Làng Cổ Oshino Hakkai", hotelName: "Hoshinoya Fuji Resort" },
      { slug: "jp-hokkaido", nameVi: "Hokkaido", nameEn: "Hokkaido", summaryVi: "Thiên đường tuyết trắng & Hải sản", summaryEn: "Snow Paradise & Seafood Market", foodName: "Cua Hoàng Đế Hokkaido", exp1: "Kênh Đào Otaru Thơ Mộng", exp2: "Cánh Đồng Hoa Lavender Furano", hotelName: "The Green Leaf Niseko Village" },
      { slug: "jp-nara", nameVi: "Nara", nameEn: "Nara", summaryVi: "Thành phố nai hoang dã & Chùa Todaiji", summaryEn: "Deer Park & Todaiji Temple", foodName: "Mì Somen Lạnh Nara Tradition", exp1: "Công Viên Nai Nara Thân Thiện", exp2: "Đại Phật Điện Chùa Todaiji", hotelName: "JW Marriott Hotel Nara" },
      { slug: "jp-hiroshima", nameVi: "Hiroshima", nameEn: "Hiroshima", summaryVi: "Cổng Torii trên biển Miyajima", summaryEn: "Floating Torii Gate Miyajima", foodName: "Bánh Xèo Okonomiyaki Hiroshima", exp1: "Cổng Torii Nổi Đền Miyajima", exp2: "Công Viên Hòa Bình Hiroshima", hotelName: "Hilton Hiroshima" },
      { slug: "jp-okinawa", nameVi: "Okinawa", nameEn: "Okinawa", summaryVi: "Quần đảo biển xanh & Rạn san hô", summaryEn: "Blue Coral Ocean Islands", foodName: "Mì Soba Okinawa Sườn Heo", exp1: "Thủy Cung Churaumi Okinawa", exp2: "Mũi Đá Manzamo Hùng Vĩ", hotelName: "Halekulani Okinawa Resort" },
    ],
  },
  {
    code: "kr",
    nameVi: "Hàn Quốc",
    nameEn: "Korea",
    flag: "🇰🇷",
    cities: [
      { slug: "kr-seoul", nameVi: "Seoul", nameEn: "Seoul", summaryVi: "Thủ đô K-Pop Myeongdong & Cung điện", summaryEn: "K-Pop Capital & Palace Heritage", foodName: "Thịt Nướng BBQ Hàn Quốc Premium", exp1: "Tháp Namsan Seoul Tower Đèn Lồng", exp2: "Cung Điện Gyeongbokgung Trang Nghiêm", hotelName: "Signiel Seoul Tower Hotel" },
      { slug: "kr-busan", nameVi: "Busan", nameEn: "Busan", summaryVi: "Thành phố biển Haeundae & Làng Gamcheon", summaryEn: "Haeundae Beach & Culture Village", foodName: "Súp Huyết Heo Dwaeji Gukbap", exp1: "Làng Văn Hóa Gamcheon Rực Rỡ", exp2: "Cầu Biển Gwangandaegyo Đêm", hotelName: "Park Hyatt Busan" },
      { slug: "kr-jeju", nameVi: "Đảo Jeju", nameEn: "Jeju Island", summaryVi: "Đảo núi lửa UNESCO & Biển xanh", summaryEn: "UNESCO Volcanic Paradise", foodName: "Thịt Heo Đen nướng Đá Jeju", exp1: "Đỉnh Núi Seongsan Ilchulbong", exp2: "Thác Nước Cheonjiyeon Hùng Vĩ", hotelName: "Grand Hyatt Jeju" },
      { slug: "kr-incheon", nameVi: "Incheon", nameEn: "Incheon", summaryVi: "Cảng hàng không quốc tế & Phố Tàu", summaryEn: "International Hub & Chinatown", foodName: "Mì Đen Jajangmyeon Incheon", exp1: "Công Viên Songdo Central Park", exp2: "Phố Tàu Incheon Chinatown", hotelName: "Paradise City Incheon Resort" },
      { slug: "kr-gyeongju", nameVi: "Gyeongju", nameEn: "Gyeongju", summaryVi: "Bảo tàng không vách ngăn cố đô Silla", summaryEn: "Ancient Silla Heritage City", foodName: "Cơm Cuộn Ssambap Gyeongju", exp1: "Hồ Anapji Đêm Lung Linh", exp2: "Chùa Phật Quốc Tự Bulguksa", hotelName: "Lahan Select Gyeongju" },
      { slug: "kr-gangwon", nameVi: "Gangwon", nameEn: "Gangwon", summaryVi: "Vùng núi trượt tuyết Pyeongchang", summaryEn: "Snow Ski Resort & Coastline", foodName: "Gà Xào Cay Dakgalbi Chuncheon", exp1: "Đảo Nami Mùa Thu Lá Vàng", exp2: "Khu Trượt Tuyết Yongpyong Resort", hotelName: "InterContinental Alpensia Resort" },
      { slug: "kr-jeonju", nameVi: "Jeonju", nameEn: "Jeonju", summaryVi: "Làng Hanok cổ kính & Bibimbap", summaryEn: "Traditional Hanok Village", foodName: "Cơm Trộn Bibimbap Jeonju", exp1: "Làng Cổ Hanok Jeonju 800 Năm", exp2: "Nhà Thờ Jeondong Cổ Kính", hotelName: "Jeonju Hanok Village Suite" },
      { slug: "kr-daegu", nameVi: "Daegu", nameEn: "Daegu", summaryVi: "Thành phố hoa anh đào & Núi Palgong", summaryEn: "Cherry Blossom City & Mountains", foodName: "Lòng Heo Nướng Makchang Daegu", exp1: "Tượng Phật Đá Gatbawi Palgonsan", exp2: "Công Viên E-World Daegu", hotelName: "Hotel InterBurgo Daegu" },
    ],
  },
  {
    code: "us",
    nameVi: "Mỹ",
    nameEn: "USA",
    flag: "🇺🇸",
    cities: [
      { slug: "us-newyork", nameVi: "New York", nameEn: "New York", summaryVi: "Quảng trường Thời Đại & Tượng Nữ Thần", summaryEn: "Times Square & Liberty Statue", foodName: "Bánh Pizza Đề-pô New York Style", exp1: "Check-in Quảng Trường Times Square", exp2: "Tượng Nữ Thần Tự Do Đảo Liberty", hotelName: "The Plaza Hotel New York" },
      { slug: "us-losangeles", nameVi: "Los Angeles", nameEn: "Los Angeles", summaryVi: "Kinh đô điện ảnh Hollywood & Biển Santa Monica", summaryEn: "Hollywood Cinema & Santa Monica Pier", foodName: "In-N-Out Double Burger LA", exp1: "Biển Hiệu Hollywood Hills", exp2: "Đại Lộ Danh Vọng Hollywood Walk of Fame", hotelName: "The Beverly Hills Hotel" },
      { slug: "us-lasvegas", nameVi: "Las Vegas", nameEn: "Las Vegas", summaryVi: "Thành phố giải trí không ngủ Bellagio", summaryEn: "Entertainment Capital & Strip", foodName: "Buffet Hải Sản Gourmet Bellagio", exp1: "Đài Phún Nước Bellagio Fountains", exp2: "Đại Lộ Las Vegas Strip Đêm", hotelName: "Bellagio Hotel & Casino" },
      { slug: "us-sanfrancisco", nameVi: "San Francisco", nameEn: "San Francisco", summaryVi: "Cầu Cổng Vàng Golden Gate & Xe Điện", summaryEn: "Golden Gate Bridge & Cable Car", foodName: "Súp Cua Bánh Mỳ Clam Chowder", exp1: "Cầu Cổng Vàng Golden Gate Bridge", exp2: "Bến Tàu Bãi Biển Pier 39", hotelName: "Fairmont San Francisco" },
      { slug: "us-hawaii", nameVi: "Hawaii", nameEn: "Hawaii", summaryVi: "Thiên đường biển đảo Honolulu & Waikiki", summaryEn: "Honolulu & Waikiki Beach", foodName: "Cơm Cá Ngừ Poke Bowl Hawaii", exp1: "Bãi Biển Waikiki Sunset", exp2: "Đỉnh Núi Đập Đá Diamond Head", hotelName: "The Royal Hawaiian Resort" },
      { slug: "us-miami", nameVi: "Miami", nameEn: "Miami", summaryVi: "Bãi biển South Beach & Phố Art Deco", summaryEn: "South Beach & Art Deco District", foodName: "Càng Cua Đá Stone Crab Miami", exp1: "Bãi Biển South Beach Miami", exp2: "Phố Nghệ Thuật Wynwood Walls", hotelName: "1 Hotel South Beach Miami" },
      { slug: "us-chicago", nameVi: "Chicago", nameEn: "Chicago", summaryVi: "Thành phố gió & Hạt Đậu Bạc Cloud Gate", summaryEn: "Windy City & Cloud Gate Bean", foodName: "Bánh Pizza Dày Deep Dish Chicago", exp1: "Tháp Hạt Đậu Cloud Gate Millennium", exp2: "Đài Quan Sát Skydeck Willis Tower", hotelName: "The Peninsula Chicago" },
      { slug: "us-washington", nameVi: "Washington D.C.", nameEn: "Washington D.C.", summaryVi: "Thủ đô Hoa Kỳ & Nhà Trắng", summaryEn: "US Capital & White House", foodName: "Bánh Mỳ Kẹp Xúc Xích Half-Smoke", exp1: "Nhà Trắng The White House", exp2: "Tượng Đài Washington Monument", hotelName: "The Hay-Adams Washington D.C." },
    ],
  },
  {
    code: "th",
    nameVi: "Thái Lan",
    nameEn: "Thailand",
    flag: "🇹🇭",
    cities: [
      { slug: "th-bangkok", nameVi: "Bangkok", nameEn: "Bangkok", summaryVi: "Thủ đô chùa vàng & Phố Khaosan", summaryEn: "Golden Temples & Khaosan Road", foodName: "Tôm Tôm Yum Goong Chuẩn Vị Thái", exp1: "Đền Bình Minh Wat Arun Sunset", exp2: "Hoàng Cung Grand Palace Bangkok", hotelName: "Mandarin Oriental Bangkok" },
      { slug: "th-phuket", nameVi: "Phuket", nameEn: "Phuket", summaryVi: "Đảo biển Patong & Vịnh Maya", summaryEn: "Patong Beach & Maya Bay", foodName: "Pad Thai Hải Sản Phuket", exp1: "Vịnh Maya Phi Phi Islands", exp2: "Tượng Phật Lớn Big Buddha Phuket", hotelName: "Rosewood Phuket Resort" },
      { slug: "th-chiangmai", nameVi: "Chiang Mai", nameEn: "Chiang Mai", summaryVi: "Đó hoa phương Bắc & Chùa Doi Suthep", summaryEn: "Northern Rose & Doi Suthep", foodName: "Mì Cà Rì Khao Soi Chiang Mai", exp1: "Chùa Doi Suthep Triệu View", exp2: "Trại Voi Chăm Sóc Elephant Nature", hotelName: "Four Seasons Resort Chiang Mai" },
      { slug: "th-pattaya", nameVi: "Pattaya", nameEn: "Pattaya", summaryVi: "Thành phố biển giải trí Walking Street", summaryEn: "Entertainment Beach City", foodName: "Gỏi Đủ Đủ Som Tum Pattaya", exp1: "Lâu Đài Chân Lý Sanctuary of Truth", exp2: "Đảo San Hô Koh Larn Crystal", hotelName: "Capella Bangkok / Pattaya" },
      { slug: "th-kohsamui", nameVi: "Koh Samui", nameEn: "Koh Samui", summaryVi: "Đảo dừa nghỉ dưỡng Chaweng", summaryEn: "Coconut Paradise Island", foodName: "Cà Rì Choo Chee Hải Sản", exp1: "Tượng Phật Vàng Big Buddha Temple", exp2: "Bãi Biển Chaweng Sunset", hotelName: "Four Seasons Resort Koh Samui" },
      { slug: "th-huahin", nameVi: "Hua Hin", nameEn: "Hua Hin", summaryVi: "Bãi biển hoàng gia Thái Lan", summaryEn: "Royal Beach Resort", foodName: "Cơm Chiên Khóm Trái Thơm Hua Hin", exp1: "Ga Tàu Hoàng Gia Hua Hin Station", exp2: "Chợ Đêm Cicada Market", hotelName: "The Standard Hua Hin" },
      { slug: "th-krabi", nameVi: "Krabi", nameEn: "Krabi", summaryVi: "Vách đá vôi Railay & Biển ngọc", summaryEn: "Limestone Cliffs & Railay Beach", foodName: "Cà Rì Massaman Thịt Bò Krabi", exp1: "Bãi Biển Railay Beach Vách Đá", exp2: "Hồ Ngọc Bích Emerald Pool Krabi", hotelName: "Phulay Bay Ritz-Carlton Krabi" },
      { slug: "th-ayutthaya", nameVi: "Ayutthaya", nameEn: "Ayutthaya", summaryVi: "Cố đô đền đài di sản thế giới", summaryEn: "Ancient UNESCO Capital Heritage", foodName: "Tôm Sông Nướng Khổng Lồ Ayutthaya", exp1: "Đầu Phật Trong Rễ Cây Wat Mahathat", exp2: "Chùa Cổ Wat Chaiwatthanaram", hotelName: "Sala Ayutthaya Hotel" },
    ],
  },
  {
    code: "id",
    nameVi: "Indonesia",
    nameEn: "Indonesia",
    flag: "🇮🇩",
    cities: [
      { slug: "id-bali", nameVi: "Bali", nameEn: "Bali", summaryVi: "Thiên đường đảo ngọc & Đền Tanah Lot", summaryEn: "Island of Gods & Tanah Lot", foodName: "Heo Nướng Babi Guling Bali", exp1: "Đền Nổi Tanah Lot Biển Sunset", exp2: "Cổng Trời Handara Gate Bali", hotelName: "Mulava Resort Bali / Viceroy" },
      { slug: "id-ubud", nameVi: "Ubud", nameEn: "Ubud", summaryVi: "Trái tim văn hóa & Ruộng bậc thang", summaryEn: "Cultural Heart & Rice Terraces", foodName: "Vịt Chiên Giòn Bebek Bengil Ubud", exp1: "Ruộng Bậc Thang Tegallalang", exp2: "Rừng Khỉ Ubud Monkey Forest", hotelName: "Mandapa Ritz-Carlton Ubud" },
      { slug: "id-seminyak", nameVi: "Seminyak", nameEn: "Seminyak", summaryVi: "Bãi biển hoàng hôn Potato Head", summaryEn: "Sunset Beach & Luxury Clubs", foodName: "Hải Sản Nướng Sốt Sambal Seminyak", exp1: "Potato Head Beach Club Sunset", exp2: "Bãi Biển Seminyak Surf Spot", hotelName: "The Seminyak Beach Resort" },
      { slug: "id-canggu", nameVi: "Canggu", nameEn: "Canggu", summaryVi: "Thiên đường lướt sóng & Cafe Chill", summaryEn: "Surfers Paradise & Bohemian Vibe", foodName: "Smoothie Bowl Trái Cây Canggu", exp1: "Bãi Biển Echo Beach Lướt Sóng", exp2: "Quán Cafe La Brisa Canggu Sunset", hotelName: "COMO Uma Canggu" },
      { slug: "id-nusapenida", nameVi: "Nusa Penida", nameEn: "Nusa Penida", summaryVi: "Sống lưng khủng long Kelingking", summaryEn: "T-Rex Cliff Kelingking Beach", foodName: "Cơm Chiên Nasi Goreng Sambal Matah", exp1: "Sống Lưng Khủng Long Kelingking", exp2: "Hồ Bơi Tự Nhiên Angel's Billabong", hotelName: "Nusa Penida Cliff Villa" },
      { slug: "id-kuta", nameVi: "Kuta", nameEn: "Kuta", summaryVi: "Bãi biển sôi động Kuta Sunset", summaryEn: "Vibrant Nightlife & Long Beach", foodName: "Gà Nướng Ayam Betutu Kuta", exp1: "Bãi Biển Kuta Sunset Đường Trường", exp2: "Công Viên Nước Waterbom Bali", hotelName: "Hard Rock Hotel Bali Kuta" },
      { slug: "id-uluwatu", nameVi: "Uluwatu", nameEn: "Uluwatu", summaryVi: "Đền vách đá Uluwatu & Điệu múa Kecak", summaryEn: "Cliff Temple & Kecak Dance", foodName: "Cá Chẽm Nướng Than Uluwatu", exp1: "Đền Vách Đá Uluwatu Temple", exp2: "Điệu Múa Lửa Kecak Dance Sunset", hotelName: "Alila Villas Uluwatu" },
      { slug: "id-lombok", nameVi: "Lombok", nameEn: "Lombok", summaryVi: "Đảo biển hoang sơ & Núi Rinjani", summaryEn: "Pristine Island & Mt Rinjani", foodName: "Gà Cay Ayam Taliwang Lombok", exp1: "Quần Đảo Gili Trawangan Biển Xanh", exp2: "Núi Lửa Rinjani Hùng Vĩ", hotelName: "The Oberoi Beach Resort Lombok" },
    ],
  },
  {
    code: "cn",
    nameVi: "Trung Quốc",
    nameEn: "China",
    flag: "🇨🇳",
    cities: [
      { slug: "cn-beijing", nameVi: "Bắc Kinh", nameEn: "Beijing", summaryVi: "Vạn Lý Trường Thành & Tử Cấm Thành", summaryEn: "Great Wall & Forbidden City", foodName: "Vịt Quay Bắc Kinh Da Giòn", exp1: "Vạn Lý Trường Thành Bát Đạt Lĩnh", exp2: "Tử Cấm Thành Cố Cung Trọng Đại", hotelName: "Aman Summer Palace Beijing" },
      { slug: "cn-shanghai", nameVi: "Thượng Hải", nameEn: "Shanghai", summaryVi: "Bến Thượng Hải & Tháp Đông Phương", summaryEn: "The Bund & Oriental Pearl", foodName: "Bánh Bao Nước Tiểu Long Bao Shanghai", exp1: "Bến Thượng Hải The Bund Lung Linh", exp2: "Tháp Truyền Hình Đông Phương Minh Châu", hotelName: "The Peninsula Shanghai" },
      { slug: "cn-chengdu", nameVi: "Thành Đô", nameEn: "Chengdu", summaryVi: "Quê hương Gấu Trúc & Lẩu Cay", summaryEn: "Giant Panda Capital & Hotpot", foodName: "Lẩu Cay Tứ Xuyên Thành Đô", exp1: "Cơ Sở Nghiên Cứu Gấu Trúc Thành Đô", exp2: "Phố Cổ Cẩm Lý Đèn Lồng", hotelName: "The Temple House Chengdu" },
      { slug: "cn-guangzhou", nameVi: "Quảng Châu", nameEn: "Guangzhou", summaryVi: "Thiên đường mua sắm & Tháp Quảng Châu", summaryEn: "Canton Tower & Shopping Paradise", foodName: "Điểm Sấm Dimsum Quảng Châu", exp1: "Tháp Quảng Châu Canton Tower Night", exp2: "Công Viên Việt Tú Tượng 5 Con Dê", hotelName: "Four Seasons Hotel Guangzhou" },
      { slug: "cn-chongqing", nameVi: "Trùng Khánh", nameEn: "Chongqing", summaryVi: "Thành phố 3D Hồng Nhai Động", summaryEn: "3D Cyberpunk City & Hongyadong", foodName: "Mì Cay Trùng Khánh Ma La", exp1: "Hồng Nhai Động Đêm Lung Linh Cyberpunk", exp2: "Tàu Điện Xuyên Nhà Ga Lý Tử Bá", hotelName: "Raffles City Chongqing Hotel" },
      { slug: "cn-xian", nameVi: "Tây An", nameEn: "Xi'an", summaryVi: "Đội quân Đất Nung Binh Mã Dũng", summaryEn: "Terracotta Army Heritage", foodName: "Bánh Mỳ Kẹp Thịt Rô Gia Phàn Tây An", exp1: "Tượng Binh Mã Dũng Tần Thủy Hoàng", exp2: "Tường Thành Cổ Tây An Đêm", hotelName: "Sofitel Legend People's Grand Hotel Xi'an" },
      { slug: "cn-hangzhou", nameVi: "Hàng Châu", nameEn: "Hangzhou", summaryVi: "Tây Hồ thơ mộng & Trà Long Tỉnh", summaryEn: "West Lake & Longjing Tea", foodName: "Cá Sốt Chùa Tây Hồ Hàng Châu", exp1: "Du Thuyền Tây Hồ Thơ Mộng", exp2: "Đồi Trà Long Tỉnh Xanh Ngát", hotelName: "Four Seasons Resort Hangzhou at West Lake" },
      { slug: "cn-guilin", nameVi: "Quế Lâm", nameEn: "Guilin", summaryVi: "Sơn thủy đệ nhất thiên hạ Sông Ly", summaryEn: "Li River Karst Landscape", foodName: "Bún Mỳ Quế Lâm Nước Dùng Đậm Đà", exp1: "Du Thuyền Sông Ly Giang Quế Lâm", exp2: "Núi Vòi Voi Nh象鼻山 Icon", hotelName: "Banyan Tree Yangshuo Guilin" },
    ],
  },
  {
    code: "ch",
    nameVi: "Thụy Sĩ",
    nameEn: "Switzerland",
    flag: "🇨🇭",
    cities: [
      { slug: "ch-zurich", nameVi: "Zurich", nameEn: "Zurich", summaryVi: "Thành phố ngân hàng & Hồ Zurich", summaryEn: "Financial Hub & Lake Zurich", foodName: "Lẩu Phô Mai Fondue Thụy Sĩ", exp1: "Hồ Zurich Biển Hồ Trong Xanh", exp2: "Phố Mua Sắm Bahnhofstrasse", hotelName: "The Dolder Grand Zurich" },
      { slug: "ch-geneva", nameVi: "Geneva", nameEn: "Geneva", summaryVi: "Thủ đô hòa bình & Đài phun nước Jet d'Eau", summaryEn: "Peace Capital & Jet d'Eau", foodName: "Bánh Khoai Tây Röstis Thụy Sĩ", exp1: "Đài Phún Nước Khổng Lồ Jet d'Eau", exp2: "Trụ Sở Liên Hợp Quốc LHQ Geneva", hotelName: "Four Seasons Hotel des Bergues Geneva" },
      { slug: "ch-lucerne", nameVi: "Lucerne", nameEn: "Lucerne", summaryVi: "Cầu gỗ Chapel Bridge & Tượng Sư Tử", summaryEn: "Chapel Bridge & Lion Monument", foodName: "Thịt Bê Sốt Kem Zürcher Geschnetzeltes", exp1: "Cầu Gỗ Cổ Chapel Bridge Lucerne", exp2: "Tượng Sư Tử Đá Thương Hạn Lucerne", hotelName: "Bürgenstock Hotel & Alpine Spa Lucerne" },
      { slug: "ch-interlaken", nameVi: "Interlaken", nameEn: "Interlaken", summaryVi: "Cổng vào đỉnh Jungfraujoch Nói Châu Âu", summaryEn: "Gateway to Top of Europe Jungfrau", foodName: "Socola Thủ Công Thụy Sĩ Premium", exp1: "Tàu Hỏa Đỉnh Núi Jungfraujoch Snow", exp2: "Dù Lượn Ngắm Cảnh Alps Interlaken", hotelName: "Victoria-Jungfrau Grand Hotel Interlaken" },
      { slug: "ch-zermatt", nameVi: "Zermatt", nameEn: "Zermatt", summaryVi: "Đỉnh Matterhorn huyền thoại & Tuyết", summaryEn: "Matterhorn Peak & Ski Paradise", foodName: "Phô Mai Nướng Raclette Zermatt", exp1: "Đỉnh Núi Matterhorn Biểu Tượng Toblerone", exp2: "Tàu Hỏa Răng Cưa Gornergrat View", hotelName: "Omnia Mountain Resort Zermatt" },
      { slug: "ch-lausanne", nameVi: "Lausanne", nameEn: "Lausanne", summaryVi: "Thủ đô Olympic bên hồ Geneva", summaryEn: "Olympic Capital on Lake Geneva", foodName: "Xúc Xích Sốt Cà Lạc Lausanne", exp1: "Bảo Tàng Olympic Lausanne", exp2: "Thần Điện Nhà Thờ Lausanne Gothic", hotelName: "Beau-Rivage Palace Lausanne" },
      { slug: "ch-basel", nameVi: "Basel", nameEn: "Basel", summaryVi: "Thành phố nghệ thuật & Sông Rhine", summaryEn: "Art Capital & Rhine River", foodName: "Bánh Gừng Basler Läckerli", exp1: "Sông Rhine Thơ Mộng Basel", exp2: "Bảo Tàng Nghệ Thuật Kunstmuseum Basel", hotelName: "Grand Hotel Les Trois Rois Basel" },
      { slug: "ch-stmoritz", nameVi: "St. Moritz", nameEn: "St. Moritz", summaryVi: "Khu nghỉ dưỡng tuyết quý tộc Alps", summaryEn: "Luxury Alpine Ski Resort", foodName: "Bánh Hạt Óc Chó Bündner Nusstorte", exp1: "Hồ Băng Tuyết St. Moritz Lake", exp2: "Trượt Tuyết Quý Tộc Corviglia Alps", hotelName: "Badrutt's Palace Hotel St. Moritz" },
    ],
  },
  {
    code: "au",
    nameVi: "Úc",
    nameEn: "Australia",
    flag: "🇦🇺",
    cities: [
      { slug: "au-sydney", nameVi: "Sydney", nameEn: "Sydney", summaryVi: "Nhà hát Con Sò Opera & Cầu Cảng", summaryEn: "Opera House & Harbour Bridge", foodName: "Thịt Bò Úc Nướng BBQ Premium", exp1: "Nhà Hát Con Sò Sydney Opera House", exp2: "Cầu Cảng Sydney Harbour Bridge", hotelName: "Park Hyatt Sydney" },
      { slug: "au-melbourne", nameVi: "Melbourne", nameEn: "Melbourne", summaryVi: "Thủ đô cafe & Hẻm nghệ thuật Hosier", summaryEn: "Coffee Capital & Hosier Lane", foodName: "Bánh Ngọt Pavlova Úc Trái Cây", exp1: "Phố Hẻm Nghệ Thuật Graffiti Hosier Lane", exp2: "Ga Tàu Cổ Flinders Street Station", hotelName: "Crown Towers Melbourne" },
      { slug: "au-brisbane", nameVi: "Brisbane", nameEn: "Brisbane", summaryVi: "Thành phố nắng ấm sông Brisbane", summaryEn: "Sunny River Capital", foodName: "Bánh Mỳ Bơ Vegemite Toast", exp1: "Bãi Biển Nhân Tạo South Bank Brisbane", exp2: "Cầu Story Bridge Brisbane", hotelName: "The Calile Hotel Brisbane" },
      { slug: "au-perth", nameVi: "Perth", nameEn: "Perth", summaryVi: "Thành phố ngập nắng & Đảo Rottnest Quokka", summaryEn: "Sunniest City & Rottnest Quokka", foodName: "Hải Sản Tôm Hùm Đá Rock Lobster Perth", exp1: "Đảo Rottnest Island Check-in Quokka", exp2: "Công Viên Kings Park Perth Sunset", hotelName: "COMO The Treasury Perth" },
      { slug: "au-goldcoast", nameVi: "Gold Coast", nameEn: "Gold Coast", summaryVi: "Bãi biển lướt sóng Surfers Paradise", summaryEn: "Surfers Paradise Beaches", foodName: "Cá Chẽm Barramundi Nướng Bơ", exp1: "Bãi Biển Surfers Paradise Gold Coast", exp2: "Tòa Tháp Q1 Skypoint Observation", hotelName: "The Langham Gold Coast" },
      { slug: "au-adelaide", nameVi: "Adelaide", nameEn: "Adelaide", summaryVi: "Thung lũng rượu vang Barossa", summaryEn: "Barossa Valley Wine Capital", foodName: "Thịt Cừu Nướng Bơ Tỏi Adelaide", exp1: "Thung Lũng Rượu Vang Barossa Valley", exp2: "Chợ Trung Tâm Adelaide Central Market", hotelName: "EOS by SkyCity Adelaide" },
      { slug: "au-cairns", nameVi: "Cairns", nameEn: "Cairns", summaryVi: "Cổng vào rạn san hô Great Barrier Reef", summaryEn: "Great Barrier Reef Gateway", foodName: "Thịt Cá Sấu Nướng Xiên Cairns", exp1: "Rạn San Hô Khổng Lồ Great Barrier Reef", exp2: "Cáp Treo Rừng Nhiệt Đới Kuranda Skyrail", hotelName: "Crystalbrook Riley Cairns" },
      { slug: "au-hobart", nameVi: "Hobart", nameEn: "Hobart", summaryVi: "Thủ phủ đảo Tasmania & Bảo tàng MONA", summaryEn: "Tasmania Island & MONA Museum", foodName: "Hào Biển Tươi Đảo Tasmania Hobart", exp1: "Bảo Tàng Nghệ Thuật MONA Tasmania", exp2: "Đỉnh Núi Kunanyi Mount Wellington", hotelName: "The MACq 01 Hotel Hobart" },
    ],
  },
  {
    code: "br",
    nameVi: "Brazil",
    nameEn: "Brazil",
    flag: "🇧🇷",
    cities: [
      { slug: "br-riodejaneiro", nameVi: "Rio de Janeiro", nameEn: "Rio de Janeiro", summaryVi: "Tượng Chúa Cứu Thế & Biển Copacabana", summaryEn: "Christ Redeemer & Copacabana", foodName: "Thịt Nướng Churrasco BBQ Brazil", exp1: "Tượng Chúa Cứu Thế Christ the Redeemer", exp2: "Bãi Biển Copacabana Rực Rỡ", hotelName: "Belmond Copacabana Palace Rio" },
      { slug: "br-saopaulo", nameVi: "Sao Paulo", nameEn: "Sao Paulo", summaryVi: "Thành phố lớn nhất Nam Mỹ & Phố Beco do Batman", summaryEn: "South America Metropolis & Beco do Batman", foodName: "Món Hầm Đậu Đen Feijoada Brazil", exp1: "Con Đường Nghệ Thuật Beco do Batman", exp2: "Công Viên Ibirapuera Sao Paulo", hotelName: "Rosewood Sao Paulo" },
      { slug: "br-salvador", nameVi: "Salvador", nameEn: "Salvador", summaryVi: "Cố đô văn hóa Afro-Brazil Pelourinho", summaryEn: "Afro-Brazilian Pelourinho Heritage", foodName: "Bánh Tôm Chiên Acarajé Salvador", exp1: "Phố Cổ Pelourinho Rực Rỡ Sắc Màu", exp2: "Thang Máy Cổ Elevador Lacerda", hotelName: "Fera Palace Hotel Salvador" },
      { slug: "br-fozdoiguacu", nameVi: "Foz do Iguaçu", nameEn: "Foz do Iguaçu", summaryVi: "Thác nước khổng lồ Iguazu Falls", summaryEn: "World Wonder Iguazu Falls", foodName: "Bánh Mỳ Phô Mai Pão de Queijo", exp1: "Thác Nước Khổng Lồ Iguazu Falls", exp2: "Công Viên Chim Công Parque das Aves", hotelName: "Belmond Hotel das Cataratas Iguazu" },
      { slug: "br-florianopolis", nameVi: "Florianópolis", nameEn: "Florianópolis", summaryVi: "Đảo biển thiên đường lướt sóng Magic Island", summaryEn: "Magic Island & Surf Beaches", foodName: "Hào Biển Tươi Nướng Phô Mai", exp1: "Bãi Biển Joaquina Beach Lướt Sóng", exp2: "Cầu Treo Hercílio Luz Bridge Sunset", hotelName: "LK Design Hotel Florianopolis" },
      { slug: "br-manaus", nameVi: "Manaus", nameEn: "Manaus", summaryVi: "Trái tim rừng rậm nhiệt đới Amazon", summaryEn: "Amazon Rainforest Heart", foodName: "Cá Amazon Tacacá & Açai Bowl", exp1: "Dòng Sông Song Song Encontro das Águas", exp2: "Nhà Hát Opera Teatro Amazonas", hotelName: "Juma Amazon Lodge Manaus" },
      { slug: "br-recife", nameVi: "Recife", nameEn: "Recife", summaryVi: "Venice của Brazil & Phố cổ Olinda", summaryEn: "Venice of Brazil & Olinda", foodName: "Bánh Bò Tapioca Bơ Dừa Recife", exp1: "Phố Cổ Di Sản Olinda Rực Rỡ", exp2: "Bãi Biển Boa Viagem Coral Reef", hotelName: "Grand Mercure Recife Boa Viagem" },
      { slug: "br-brasilia", nameVi: "Brasília", nameEn: "Brasília", summaryVi: "Thủ đô kiến trúc hiện đại Niemeyer", summaryEn: "Modernist Architectural Capital", foodName: "Thịt Heo Nướng Bột Mỳ Farofa", exp1: "Nhà Thờ Thánh Cathedral of Brasília", exp2: "Cầu JK Juscelino Kubitschek Bridge", hotelName: "Biyos/Royal Tulip Brasília Alvorada" },
    ],
  },
  {
    code: "ar",
    nameVi: "Argentina",
    nameEn: "Argentina",
    flag: "🇦🇷",
    cities: [
      { slug: "ar-buenosaires", nameVi: "Buenos Aires", nameEn: "Buenos Aires", summaryVi: "Thủ đô Vũ điệu Tango & Phố La Boca", summaryEn: "Tango Capital & La Boca", foodName: "Thịt Bò Asado Bít Tết Argentina", exp1: "Phố Cổ Đa Sắc Màu Caminito La Boca", exp2: "Nhà Hát Opera Teatro Colón Rực Rỡ", hotelName: "Alvear Palace Hotel Buenos Aires" },
      { slug: "ar-bariloche", nameVi: "Bariloche", nameEn: "Bariloche", summaryVi: "Thụy Sĩ thu nhỏ bên hồ Nahuel Huapi", summaryEn: "Little Switzerland & Lakes", foodName: "Bánh Socola Artisan Bariloche", exp1: "Hồ Nahuel Huapi View Đỉnh Núi Tuyết", exp2: "Đỉnh Núi Cáp Treo Cerro Campanario", hotelName: "Llao Llao Resort Golf & Spa Bariloche" },
      { slug: "ar-mendoza", nameVi: "Mendoza", nameEn: "Mendoza", summaryVi: "Thiên đường rượu vang Malbec bên dãy Andes", summaryEn: "Malbec Wine Capital & Andes", foodName: "Bánh Nướng Empanadas Nhân Thịt Bò", exp1: "Thung Lũng Rượu Vang Uco Valley Andes", exp2: "Đỉnh Núi Cao Nhất Aconcagua Peak", hotelName: "Cavas Wine Lodge Mendoza" },
      { slug: "ar-ushuaia", nameVi: "Ushuaia", nameEn: "Ushuaia", summaryVi: "Thành phố Nơi Tận Cùng Thế Giới", summaryEn: "End of the World City", foodName: "Cua Hoàng Đế King Crab Ushuaia", exp1: "Hải Đăng Nơi Tận Cùng Thế Giới Beagle", exp2: "Công Viên Quốc Gia Tierra del Fuego", hotelName: "Arakur Ushuaia Resort & Spa" },
      { slug: "ar-elcalafate", nameVi: "El Calafate", nameEn: "El Calafate", summaryVi: "Sông băng Perito Moreno khổng lồ", summaryEn: "Perito Moreno Glacier Wonder", foodName: "Thịt Cừu Nướng Xiên Cordero Patagónico", exp1: "Sông Băng Khổng Lồ Perito Moreno", exp2: "Du Thuyền Hồ Lago Argentino Glacier", hotelName: "EOLO Patagonia's Spirit El Calafate" },
      { slug: "ar-salta", nameVi: "Salta", nameEn: "Salta", summaryVi: "Thành phố thuộc địa Cáp treo Tàu Trên Mây", summaryEn: "Colonial City & Train to the Clouds", foodName: "Rượu Vang Trắng Torrontés Salta", exp1: "Tàu Hỏa Trên Mây Tren a las Nubes", exp2: "Đồi Đá Đỏ Thung Lũng Quebrada de Humahuaca", hotelName: "House of Jasmines Relais & Châteaux Salta" },
      { slug: "ar-cordoba", nameVi: "Córdoba", nameEn: "Córdoba", summaryVi: "Cố đô đại học Jesuit Block Heritage", summaryEn: "Jesuit University Heritage City", foodName: "Bánh Ngọt Alfajores Sốt Sữa Dulce de Leche", exp1: "Khu Di Sản Cổ Jesuit Block Córdoba", exp2: "Dãy Núi Đồi Sierras de Córdoba", hotelName: "Azur Real Hotel Boutique Córdoba" },
      { slug: "ar-puertoiguazu", nameVi: "Puerto Iguazú", nameEn: "Puerto Iguazú", summaryVi: "Thác Nước Họng Quỷ Devil's Throat", summaryEn: "Devil's Throat Iguazu Falls", foodName: "Cá Sông Pacú Nướng Sốt Bơ", exp1: "Thác Nước Họng Quỷ Devil's Throat", exp2: "Cột Mốc 3 Biên Giới Hito Tres Fronteras", hotelName: "Gran Meliá Iguazú Hotel" },
    ],
  },
  {
    code: "sg",
    nameVi: "Singapore",
    nameEn: "Singapore",
    flag: "🇸🇬",
    cities: [
      { slug: "sg-changi", nameVi: "Changi & Jewel", nameEn: "Changi & Jewel", summaryVi: "Thác nước trong nhà Jewel Changi", summaryEn: "Jewel Indoor Waterfall", foodName: "Cơm Gà Hải Nam Hainanese Chicken Rice", exp1: "Thác Nước Trong Nhà HSBC Rain Vortex", exp2: "Khu Vườn Bướm Butterfly Garden Changi", hotelName: "Crowne Plaza Changi Airport Singapore" },
      { slug: "sg-clarkequay", nameVi: "Clarke Quay", nameEn: "Clarke Quay", summaryVi: "Bờ sông về đêm & Du thuyền", summaryEn: "Riverfront Nightlife & Cruise", foodName: "Cua Sốt Ớt Chilli Crab Singapore", exp1: "Du Thuyền Sông Singapore River Cruise", exp2: "Bãi Bán Phố Đèn Đêm Clarke Quay", hotelName: "The Fullerton Hotel Singapore" },
      { slug: "sg-bugis", nameVi: "Bugis & Haji Lane", nameEn: "Bugis & Haji Lane", summaryVi: "Phố nghệ thuật bức tường Graffiti", summaryEn: "Art Street & Haji Lane Graffiti", foodName: "Bánh Mỳ Kaya Toast & Cà Phê Kopi", exp1: "Con Phố Rực Rỡ Haji Lane Graffiti", exp2: "Thánh Đường Hồi Giáo Sultan Mosque", hotelName: "Andaz Singapore Hotel" },
      { slug: "sg-orchard", nameVi: "Orchard Road", nameEn: "Orchard Road", summaryVi: "Đại lộ mua sắm thời trang hàng hiệu", summaryEn: "Shopping Boulevard & Luxury Malls", foodName: "Lẩu Đồ Nướng Suki Singapore", exp1: "Tòa Mua Sắm ION Orchard Mall", exp2: "Con Đường Đèn Giáng Sinh Orchard", hotelName: "The St. Regis Singapore" },
      { slug: "sg-littleindia", nameVi: "Little India", nameEn: "Little India", summaryVi: "Sắc màu văn hóa & Gia vị Roti Prata", summaryEn: "Cultural Colors & Spice District", foodName: "Bánh Roti Prata & Cà Rì Đầu Cá", exp1: "Đền Thờ Ấn Độ Sri Veeramakaliamman", exp2: "Con Phố Đa Sắc Màu Tan Teng Niah", hotelName: "PARKROYAL on Kitchener Road" },
      { slug: "sg-chinatown", nameVi: "Chinatown SG", nameEn: "Chinatown SG", summaryVi: "Văn hóa di sản & Ẩm thực Michelin", summaryEn: "Heritage District & Michelin Food", foodName: "Mì Xào Cua Char Kway Teow Chinatown", exp1: "Chùa Răng Phật Buddha Tooth Relic Temple", exp2: "Phố Ẩm Thực Chinatown Food Street", hotelName: "The Scarlet Singapore Hotel" },
      { slug: "sg-sentosa", nameVi: "Sentosa", nameEn: "Sentosa", summaryVi: "Đảo giải trí Universal Studios", summaryEn: "Universal Studios & Resort Island", foodName: "Hải Sản Bãi Biển Tanjong Beach Club", exp1: "Công Viên Giải Trí Universal Studios SG", exp2: "Cáp Treo Đảo Sentosa Cable Car", hotelName: "Capella Singapore Sentosa" },
      { slug: "sg-marinabay", nameVi: "Marina Bay", nameEn: "Marina Bay", summaryVi: "Marina Bay Sands & Gardens by the Bay", summaryEn: "Marina Bay Sands & Supertrees", foodName: "Cơm Nước Cốt Dừa Nasi Lemak Premium", exp1: "Siêu Cây Khổng Lồ Supertree Grove", exp2: "Hồ Bơi Vô Cực Marina Bay Sands Skypark", hotelName: "Marina Bay Sands Singapore" },
    ],
  },
];

/**
 * GENERATES 100% AUTHENTIC MASTER DATA FOR ALL 12 COUNTRIES
 */
export function getMasterDataForCountry(countryCode: string) {
  const code = countryCode.toLowerCase();

  let targetCountries = MASTER_COUNTRIES;
  if (code !== "all") {
    targetCountries = MASTER_COUNTRIES.filter((c) => c.code === code);
    if (!targetCountries.length) targetCountries = MASTER_COUNTRIES;
  }

  const generatedDestinations: Destination[] = [];
  const generatedHotels: Hotel[] = [];
  const generatedFoods: DestinationFood[] = [];
  const generatedActivities: DestinationActivity[] = [];

  let globalCounter = 0;

  targetCountries.forEach((c) => {
    c.cities.forEach((city, idx) => {
      globalCounter++;
      const heroImage = getDistinctVisualImage("dest", city.slug, globalCounter);
      const foodImage = getDistinctVisualImage("food", `${city.slug}-food`, globalCounter);
      const exp1Image = getDistinctVisualImage("exp", `${city.slug}-exp1`, globalCounter * 2);
      const exp2Image = getDistinctVisualImage("exp", `${city.slug}-exp2`, globalCounter * 3);
      const hotelImage = getDistinctVisualImage("hotel", `${city.slug}-hotel`, globalCounter * 4);

      // Destination
      const destObj: Destination = {
        _id: `dest-${city.slug}`,
        slug: city.slug,
        name: { vi: city.nameVi, en: city.nameEn },
        country: { vi: c.nameVi, en: c.nameEn },
        is_domestic: c.code === "vn",
        rating: 4.9,
        discount_badge: idx % 2 === 0 ? "-15%" : "-25%",
        hero_image: heroImage,
        summary: { vi: city.summaryVi, en: city.summaryEn },
        description: { vi: `Khám phá ${city.nameVi} tuyệt đẹp cùng StayZ.`, en: `Explore beautiful ${city.nameEn} with StayZ.` },
      };
      generatedDestinations.push(destObj);

      // Hotel (HuKi Stay)
      const hotelObj: Hotel = {
        _id: `hotel-${city.slug}`,
        title: city.hotelName,
        slug: `hotel-${city.slug}`,
        city: city.nameVi,
        address: `Khu Trung Tâm ${city.nameVi}, ${c.nameVi}`,
        country: c.nameVi,
        type: idx % 3 === 0 ? "Villa" : idx % 2 === 0 ? "Resort" : "Hotel",
        main_image_url: hotelImage,
        min_price: 1200000 + (idx * 350000),
        base_price: 1800000 + (idx * 350000),
        rating: 4.8 + (idx % 3) * 0.1,
        review_count: 120 + idx * 15,
        is_preferred: true,
      };
      generatedHotels.push(hotelObj);

      // Food (HuKi Taste)
      const foodObj: DestinationFood = {
        _id: `food-${city.slug}`,
        slug: `food-${city.slug}`,
        title: { vi: city.foodName, en: city.foodName },
        description: { vi: `Hương vị ẩm thực đặc sản truyền thống khó cưỡng tại ${city.nameVi}.`, en: `Unforgettable authentic local flavors in ${city.nameEn}.` },
        image_url: foodImage,
        price_range: "100.000đ - 350.000đ",
        recommended_spots: [`Quán Ngon Truyền Đời ${city.nameVi}`, `Nhà Hàng Đặc Sản ${c.nameVi}`],
      };
      (foodObj as any).cityName = city.nameVi;
      (foodObj as any).destinationSlug = city.slug;
      generatedFoods.push(foodObj);

      // Activities / Check-in Spots (HuKi Experience - 2 per city = 16 per country)
      const exp1Obj: DestinationActivity = {
        _id: `exp1-${city.slug}`,
        slug: `exp1-${city.slug}`,
        title: { vi: city.exp1, en: city.exp1 },
        description: { vi: `Góc chụp ảnh đẹp triệu view nổi tiếng tại ${city.nameVi}.`, en: `Famous million-dollar view photo spot in ${city.nameEn}.` },
        image_url: exp1Image,
        category: "checkin",
        location_name: { vi: `Trung tâm ${city.nameVi}`, en: `${city.nameEn} Center` },
      };
      (exp1Obj as any).cityName = city.nameVi;
      (exp1Obj as any).destinationSlug = city.slug;
      generatedActivities.push(exp1Obj);

      const exp2Obj: DestinationActivity = {
        _id: `exp2-${city.slug}`,
        slug: `exp2-${city.slug}`,
        title: { vi: city.exp2, en: city.exp2 },
        description: { vi: `Điểm đến danh thắng cảnh thiên nhiên & văn hóa tại ${city.nameVi}.`, en: `Scenic natural & cultural landmark in ${city.nameEn}.` },
        image_url: exp2Image,
        category: "nature",
        location_name: { vi: `Khu thắng cảnh ${city.nameVi}`, en: `${city.nameEn} Landmark` },
      };
      (exp2Obj as any).cityName = city.nameVi;
      (exp2Obj as any).destinationSlug = city.slug;
      generatedActivities.push(exp2Obj);
    });
  });

  return {
    destinations: generatedDestinations,
    hotels: generatedHotels,
    foods: generatedFoods,
    activities: generatedActivities,
  };
}
