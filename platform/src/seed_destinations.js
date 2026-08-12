const mongoose = require("mongoose");
require("dotenv").config();

const Destination = require("./models/destinations.model");
const Property = require("./models/properties.model");
const { DATABASE_URL } = require("./constants/app.constant");

const primaryUrl = process.env.DATABASE_URL || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/stayz";
const localUrl = process.env.LOCAL_DATABASE_URL || "mongodb://127.0.0.1:27017/stayz";

const seedDestinations = [
  // --- QUỐC TẾ (INTERNATIONAL) ---
  {
    slug: "bali",
    name: { vi: "BALI", en: "BALI", ko: "발리", ja: "バリ島", th: "บาหลี" },
    country: { vi: "Indonesia", en: "Indonesia", ko: "인도네시아", ja: "インドネシア", th: "อินโดนีเซีย" },
    is_domestic: false,
    rating: 4.9,
    discount_badge: "66%",
    hero_image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85",
    ],
    summary: {
      vi: "Thiên đường nhiệt đới biển xanh ngọc, ruộng bậc thang Ubud và đền cổ.",
      en: "Tropical paradise with turquoise oceans, Ubud rice terraces, and temples.",
      ko: "에메랄드빛 바다와 우붓의 계단식 논, 신비로운 사원이 있는 열대 낙원.",
      ja: "エメラルドグリーンの海、ウブドの棚田、神秘的な寺院が広がる南国の paradise。",
      th: "สวรรค์เขตร้อนพร้อมทะเลสีมรกต นาขั้นบันไดอูบุด และวัดโบราณอันเงียบสงบ",
    },
    description: {
      vi: "Surrounded by rice fields, Villa Kayu Lama offers a peaceful retreat in Ubud. Guests can take a leisurely swim in the pool.",
      en: "Surrounded by rice fields, Villa Kayu Lama offers a peaceful retreat in Ubud. Guests can take a leisurely swim in the pool.",
      ko: "논으로 둘러싸인 우붓의 평화로운 휴식처에서 환상적인 풀빌라 라이프를 즐겨보세요.",
      ja: "ウブドの美しい田園風景に囲まれたリゾートで、贅沢なプライベートヴィラ滞在をお楽しみください。",
      th: "รีสอร์ทส่วนตัวท่ามกลางทุ่งนาอูบุด พร้อมสระว่ายน้ำส่วนตัวและบรรยากาศอันผ่อนคลาย",
    },
    foods: [
      {
        slug: "nasi-goreng",
        title: { vi: "Nasi Goreng & Satay", en: "Nasi Goreng & Satay", ko: "나시 고랭 & 사테", ja: "ナシゴレン & サテ", th: "นาซีโกเร็ง & ซาเตย์" },
        description: {
          vi: "Cơm chiên Indonesia cay nhẹ ăn kèm xiên thịt nướng sốt đậu xị.",
          en: "Indonesian fried rice served with grilled chicken skewers and peanut sauce.",
          ko: "고소한 땅콩 소스를 곁들인 인도네시아식 볶음밥과 닭꼬치 구이.",
          ja: "ピーナッツソースが香ばしいインドネシア風炒飯と焼き鳥串のセット。",
          th: "ข้าวผัดอินโดนีเซียพร้อมไก่ย่างเสียบไม้ซอสถั่วลิสงรสเข้มข้น",
        },
        image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=85",
        price_range: "50,000 - 150,000 IDR",
        recommended_spots: [{ vi: "Bebek Bengil Ubud", en: "Bebek Bengil Ubud", ko: "우붓 베벡 벵길", ja: "ウブド ベベック ベンギル", th: "เบเบก เบงกิล อูบุด" }],
      },
      {
        slug: "babi-guling",
        title: { vi: "Babi Guling & Hải Sản Biển", en: "Babi Guling & Seafood", ko: "바비 굴링 & 해산물", ja: "バビグリン & シーフード", th: "บาบี กูลึง & อาหารทะเล" },
        description: {
          vi: "Thịt heo quay giòn da kiểu Bali và tiệc hải sản nướng bơ tỏi ven biển Jimbaran.",
          en: "Balinese roasted suckling pork and fresh seafood BBQ at Jimbaran beach.",
          ko: "바삭한 바통 돼지구이와 짐바란 해변의 신선한 해산물 바비큐.",
          ja: "バリ島名物の豚の丸焼きとジンバランビーチでの海鮮バーベキュー。",
          th: "หมูหันสไตล์บาหลีพร้อมปาร์ตี้อาหารทะเลปิ้งย่างริมหาดจิมบารัน",
        },
        image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85",
        price_range: "100,000 - 350,000 IDR",
        recommended_spots: [{ vi: "Jimbaran Seafood Cafe", en: "Jimbaran Seafood Cafe", ko: "짐바란 씨푸드", ja: "ジンバラン シーフード", th: "จิมบารัน ซีฟู้ด คาเฟ่" }],
      },
    ],
    activities: [
      {
        slug: "bali-swing",
        title: { vi: "Xích đu Bali Swing & Ruộng Ubud", en: "Bali Swing & Ubud Rice Terraces", ko: "발리 스윙 & 우붓 계단식 논", ja: "バリスイング & ウブド棚田", th: "บาหลี สวิง & นาขั้นบันไดอูบุด" },
        description: {
          vi: "Trải nghiệm bay trên không giữa thung lũng rừng dừa và check-in ruộng bậc thang.",
          en: "Fly high over coconut jungles on the iconic swing and explore green rice terraces.",
          ko: "야자수 숲 위로 펼쳐지는 환상적인 발리 스윙과 우붓의 아름다운 계단식 논 탐방.",
          ja: "ヤシの木が広がる谷でブランコに乗る絶景体験と美しい棚田散策。",
          th: "นั่งชิงช้าลอยฟ้าเหนือป่ามะพร้าวและถ่ายรูปกับนาขั้นบันไดอันเขียวขจี",
        },
        image_url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=85",
        category: "checkin",
        location_name: { vi: "Ubud, Bali", en: "Ubud, Bali", ko: "발리 우붓", ja: "バリ島 ウブド", th: "อูบุด, บาหลี" },
      },
      {
        slug: "nusa-penida",
        title: { vi: "Lặn biển Nusa Penida & Beach Club", en: "Nusa Penida Diving & Beach Clubs", ko: "누사 페니다 다이빙 & 비치 클럽", ja: "ヌサペニダ ダイビング & ビーチクラブ", th: "ดำน้ำเกาะนูซา เปอนีดา & บีชคลับ" },
        description: {
          vi: "Khám phá sống lưng khủng long Kelingking và lặn biển ngắm cá đuối khổng lồ.",
          en: "Discover Kelingking T-Rex cliff and dive with giant manta rays.",
          ko: "켈링킹 공룡 능선 절벽을 탐험하고 대형 가오리와 함께 스노클링.",
          ja: "ケリンキングビーチの絶壁を散策し、マンタと一緒にダイビング。",
          th: "สำรวจผาไดโนเสาร์เกาะนูซา เปอนีดา และดำน้ำชมปลากระเบนแมนตา",
        },
        image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=85",
        category: "nature",
        location_name: { vi: "Nusa Penida, Bali", en: "Nusa Penida, Bali", ko: "누사 페니다", ja: "ヌサペニダ", th: "นูซา เปอนีดา" },
      },
    ],
  },

  {
    slug: "tokyo",
    name: { vi: "TOKYO", en: "TOKYO", ko: "도쿄", ja: "東京", th: "โตเกียว" },
    country: { vi: "Nhật Bản", en: "Japan", ko: "일본", ja: "日本", th: "ญี่ปุ่น" },
    is_domestic: false,
    rating: 4.9,
    discount_badge: "30%",
    hero_image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
    ],
    summary: {
      vi: "Thủ đô hiện đại bậc nhất hòa quyện cùng đền chùa Sensoji cổ kính.",
      en: "Ultra-modern capital blended with historic Sensoji temples.",
      ko: "화려한 최첨단 도시와 센소지 사원의 전통이 공존하는 일본의 수도.",
      ja: "最先端のトレンド都市と浅草寺など伝統文化が融合する日本のアジア誇る首都。",
      th: "มหานครล้ำสมัยที่ผสมผสานกับวัดเซนโซจิอันเก่าแก่ได้อย่างลงตัว",
    },
    description: {
      vi: "Tokyo thu hút du khách bởi giao lộ Shibuya nhộn nhịp, thiên đường mua sắm Shinjuku và ẩm thực Michelin đỉnh cao.",
      en: "Tokyo captures hearts with Shibuya crossing, Shinjuku nightlife, and world-class culinary experiences.",
      ko: "도쿄는 시부야 스크램블 교차로, 신주쿠의 쇼핑가, 세계 최고의 미식으로 여행자를 매료시킵니다.",
      ja: "渋谷のスクランブル交差点、新宿の繁華街、世界最高峰のグルメで世界中の人々を魅了します。",
      th: "โตเกียวดึงดูดนักท่องเที่ยวด้วยห้าแยกชิบุยะ ย่านช้อปปิ้งชินจูกุ และอาหารระดับโลก",
    },
    foods: [
      {
        slug: "tonkotsu-ramen",
        title: { vi: "Ramen Tonkotsu & Sushi", en: "Tonkotsu Ramen & Sushi", ko: "돈코츠 라멘 & 스시", ja: "豚骨ラーメン & 寿司", th: "ทงคตสึ ราเมง & ซูชิ" },
        description: {
          vi: "Mì Ramen nước dùng xương hầm béo ngậy và Sushi hải sản tươi sống làm tại chỗ.",
          en: "Rich pork bone broth ramen served alongside handcrafted fresh sushi.",
          ko: "진한 진국 돈코츠 라멘과 신선함이 자랑인 정통 스시.",
          ja: "濃厚な豚骨スープのラーメンと職人が握る新鮮な本格寿司。",
          th: "ราเมงน้ำซุปกระดูกหมูรสเข้มข้นพร้อมซูชิสดใหม่วัตถุดิบคุณภาพ",
        },
        image_url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85",
        price_range: "1,000 - 3,000 JPY",
        recommended_spots: [{ vi: "Ichiran Ramen Shinjuku", en: "Ichiran Ramen Shinjuku", ko: "이치란 라멘 신주쿠", ja: "一蘭 ラーメン 新宿", th: "อิจิรัน ราเมง ชินจูกุ" }],
      },
      {
        slug: "wagyu-bbq",
        title: { vi: "Wagyu A5 & Takoyaki", en: "A5 Wagyu Beef & Takoyaki", ko: "A5 와규 구이 & 타코야끼", ja: "A5 和牛焼肉 & たこ焼き", th: "เนื้อวากิว A5 & ทาโกะยากิ" },
        description: {
          vi: "Thịt bò Wagyu A5 nướng mềm tan trong miệng và bánh bạch tuộc nướng sốt đậm đà.",
          en: "Mouthwatering A5 Wagyu beef BBQ and crispy street octopus Takoyaki.",
          ko: "입안에서 입자마자 녹는 A5 와규 야키니쿠와 고소한 타코야끼.",
          ja: "口の中でとろける最高級A5ランク和牛焼肉と焼きたてたこ焼き。",
          th: "เนื้อวากิว A5 ปิ้งย่างนุ่มละลายในปากพร้อมทาโกะยากิราดซอสฉ่ำๆ",
        },
        image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
        price_range: "2,000 - 8,000 JPY",
        recommended_spots: [{ vi: "Gyukaku Roppongi", en: "Gyukaku Roppongi", ko: "규카쿠 롯폰기", ja: "牛角 六本木", th: "กิวกากุ รปปงงิ" }],
      },
    ],
    activities: [
      {
        slug: "sensoji-shibuya",
        title: { vi: "Đền Sensoji & Ngã tư Shibuya", en: "Sensoji Temple & Shibuya Crossing", ko: "센소지 사원 & 시부야 교차로", ja: "浅草寺 & 渋谷スクランブル交差点", th: "วัดเซนโซจิ & ห้าแยกชิบุยะ" },
        description: {
          vi: "Khám phá đền cổ Asakusa và sải bước qua giao lộ đông đúc nhất thế giới.",
          en: "Explore Asakusa historic shrine and cross the world famous intersection.",
          ko: "아사쿠사의 역사 깊은 센소지 사원을 둘러보고 세계에서 가장 붐비는 교차로 건너기.",
          ja: "浅草の歴史ある浅草寺を参拝し、世界で最も有名なスクランブル交差点を体験。",
          th: "ชมวัดเซนโซจิในย่านอาซากุสะและสัมผัสความคึกคักของห้าแยกชิบุยะ",
        },
        image_url: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=85",
        category: "culture",
        location_name: { vi: "Asakusa & Shibuya, Tokyo", en: "Asakusa & Shibuya, Tokyo", ko: "도쿄 아사쿠사 & 시부야", ja: "東京 浅草 & 渋谷", th: "อาซากุสะ & ชิบุยะ, โตเกียว" },
      },
      {
        slug: "skytree-fuji",
        title: { vi: "Skytree & Ngắm Núi Phú Sĩ", en: "Skytree & Mt. Fuji Day View", ko: "스카이트리 & 후지산 조망", ja: "スカイツリー & 富士山展望", th: "สกายทรี & วิวภูเขาไฟฟูจิ" },
        description: {
          vi: "Ngắm toàn cảnh Tokyo từ độ cao 634m và chuyến ngắm núi Phú Sĩ ngợp mắt.",
          en: "Panoramic Tokyo skyline from 634m Skytree and scenic Mt. Fuji day tour.",
          ko: "634m 높이의 스카이트리 전망대에서 보는 도쿄 전경과 후지산 일일 투어.",
          ja: "高さ634mのスカイツリーからの大パノラマと富士山の絶景ツアー。",
          th: "ชมวิวเมืองโตเกียว 360 องศาจากสกายทรี และทริปชมภูเขาไฟฟูจิอันงดงาม",
        },
        image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=85",
        category: "entertainment",
        location_name: { vi: "Tokyo Skytree & Mt. Fuji", en: "Tokyo Skytree & Mt. Fuji", ko: "도쿄 스카이트리 & 후지산", ja: "東京スカイツリー & 富士山", th: "โตเกียวสกายทรี & ฟูจิ" },
      },
    ],
  },

  {
    slug: "bangkok",
    name: { vi: "BANGKOK", en: "BANGKOK", ko: "방콕", ja: "バンコク", th: "กรุงเทพมหานคร" },
    country: { vi: "Thái Lan", en: "Thailand", ko: "태국", ja: "タイ", th: "ประเทศไทย" },
    is_domestic: false,
    rating: 4.8,
    discount_badge: "40%",
    hero_image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=85",
    ],
    summary: {
      vi: "Thủ đô nhộn nhịp với những ngôi chùa vàng rực rỡ và chợ đêm rực rỡ.",
      en: "Vibrant capital with golden shrines, floating markets, and nightlife.",
      ko: "황금빛 화려한 사원과 솟구치는 야시장으로 가득한 태국의 수도.",
      ja: "黄金の寺院、活気あふれる水上マーケット、夜市が魅力のタイの首都。",
      th: "เมืองหลวงอันมีชีวิตชีวาพร้อมวัดวาอารามสีทองและตลาดน้ำยามค่ำคืน",
    },
    description: {
      vi: "Bangkok làm say đắm du khách bởi vẻ đẹp lộng lẫy của chùa Wat Arun, các khu phố đêm sôi động và ẩm thực đường phố trứ danh.",
      en: "Bangkok captivates visitors with Wat Arun temple, bustling street markets, and famous spicy food.",
      ko: "방콕은 왓 아룬 사원의 야경, 활기찬 카오산 로드, 매콤한 스ตรี트 푸드로 유명합니다.",
      ja: "ワットアルンの夜景、カオサンロードの熱気、本場のタイ料理が楽しめます。",
      th: "กรุงเทพฯ เสน่ห์วัดอรุณราชวรมหาวิหาร ถนนข้าวสาร และสตรีทฟู้ดเลิศรส",
    },
    foods: [
      {
        slug: "tom-yum",
        title: { vi: "Tom Yum Goong & Pad Thai", en: "Tom Yum & Pad Thai", ko: "똠얌꿍 & 팟타이", ja: "トムヤムクン & パッタイ", th: "ต้มยำกุ้ง & ผัดไทย" },
        description: {
          vi: "Súp tôm chua cay béo thơm gia vị Thái và hủ tiếu xào tôm hải sản.",
          en: "Spicy & sour lemongrass shrimp soup alongside authentic Pad Thai noodles.",
          ko: "매콤새콤한 정통 똠얌꿍과 통통한 새우를 넣은 팟타이 볶음면.",
          ja: "スパイシーで酸味のあるトムヤムクンとエビのパッタイ。",
          th: "ต้มยำกุ้งน้ำข้นรสจัดจ้านและผัดไทยกุ้งสดรสเด็ด",
        },
        image_url: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=85",
        price_range: "80 - 250 THB",
        recommended_spots: [{ vi: "Thip Samai Pad Thai", en: "Thip Samai Pad Thai", ko: "팁싸마이 팟타이", ja: "ティップサマイ", th: "ทิพย์สมัย ผัดไทย" }],
      },
    ],
    activities: [
      {
        slug: "wat-arun",
        title: { vi: "Chùa Wat Arun & Hoàng Cung Grand Palace", en: "Wat Arun & Grand Palace", ko: "왓 아룬 & 왕궁", ja: "ワットアルン & 王宮", th: "วัดอรุณ & พระบรมมหาราชวัง" },
        description: {
          vi: "Đi thuyền sông Chao Phraya chiêm ngưỡng kiến trúc chùa dát vàng nguy nga.",
          en: "Cruise Chao Phraya river and admire ornate gold-plated temple spires.",
          ko: "짜오프라야 강 유람선을 타고 화려한 황금빛 왕궁과 왓 아룬 사원 관람.",
          ja: "チャオプラヤ川クルーズで黄金に輝く美しい王宮とワットアルンを散策。",
          th: "ล่องเรือแม่น้ำเจ้าพระยาชมความงามของพระบรมมหาราชวังและวัดอรุณฯ",
        },
        image_url: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=85",
        category: "culture",
        location_name: { vi: "Bangkok, Thailand", en: "Bangkok, Thailand", ko: "방콕 짜오프라야", ja: "バンコク チャオプラヤ", th: "กรุงเทพฯ, ไทย" },
      },
    ],
  },

  {
    slug: "singapore",
    name: { vi: "SINGAPORE", en: "SINGAPORE", ko: "싱가포르", ja: "シンガポール", th: "สิงคโปร์" },
    country: { vi: "Singapore", en: "Singapore", ko: "싱가포르", ja: "シンガポール", th: "สิงคโปร์" },
    is_domestic: false,
    rating: 4.9,
    discount_badge: "15%",
    hero_image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=85",
    ],
    summary: {
      vi: "Đảo quốc sư tử hiện đại xanh mát với Marina Bay Sands và Gardens by the Bay.",
      en: "Futuristic garden city with Marina Bay Sands and Gardens by the Bay.",
      ko: "마리나 베이 샌즈와 가든스 바이 더 베이가 돋보이는 미래형 정원 도시.",
      ja: "マリーナベイサンズとガーデンズ・バイ・ザ・ベイが誇る美しい未来型ガーデンシティ。",
      th: "เมืองท่าแห่งอนาคตพร้อมมารีน่าเบย์แซนด์สและการ์เดนส์บายเดอะเบย์",
    },
    description: {
      vi: "Singapore quyến rũ du khách bởi công viên siêu cây khổng lồ, sân bay ChangiJewel kỳ vĩ và khu nghỉ dưỡng đẳng cấp thế giới.",
      en: "Singapore amazes with Supertree Grove, Jewel Changi waterfall, and world-class luxury resorts.",
      ko: "싱가포르는 수퍼트리 그로브, 창이 공항 폭포, 최첨단 쇼핑몰로 최고의 만족감을 선사합니다.",
      ja: "スーパーツリーグローブ、ジュエル・チャンギの滝、高級リゾートが魅力の国。",
      th: "สิงคโปร์น่าตื่นตาตื่นใจด้วยสวนซูเปอร์ทรี น้ำตกสนามบินชางงี และรีสอร์ทหรู",
    },
    foods: [
      {
        slug: "chili-crab",
        title: { vi: "Cua Sốt Ớt & Cơm Gà Hải Nam", en: "Chili Crab & Hainanese Chicken Rice", ko: "칠리 크랩 & 하이난 치킨 라이스", ja: "チリクラブ & ハイナンチキンライス", th: "ปูผัดพริก & ข้าวมันไก่ไหหลำ" },
        description: {
          vi: "Cua sốt ớt đỏ đậm đà ăn kèm bánh bao chiên mần và dĩa cơm gà Hải Nam mềm mượt.",
          en: "Iconic Singaporean chili crab with fried mantou buns and tender chicken rice.",
          ko: "매콤달콤 특제 칠리 크랩과 튀긴 만두, 촉촉한 하이난 치킨 라이스.",
          ja: "甘辛の特製チリソースを絡めたチリクラブと柔らかいハイナンチキンライス。",
          th: "ปูผัดพริกซอสเข้มข้นพร้อมหมั่นโถวทอดและข้าวมันไก่สูตรต้นตำรับ",
        },
        image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85",
        price_range: "15 - 60 SGD",
        recommended_spots: [{ vi: "JUMBO Seafood East Coast", en: "JUMBO Seafood", ko: "점보 씨푸드", ja: "ジャンボ シーフード", th: "จัมโบ้ ซีฟู้ด" }],
      },
    ],
    activities: [
      {
        slug: "gardens-by-the-bay",
        title: { vi: "Gardens by the Bay & Marina Bay Sands", en: "Gardens by the Bay & Marina Bay Sands", ko: "가든스 바이 더 베이 & 마리나 베이 샌즈", ja: "ガーデンズ・バイ・ザ・ベイ & マリーナベイサンズ", th: "การ์เดนส์ บาย เดอะ เบย์ & มารีน่า เบย์ แซนด์ส" },
        description: {
          vi: "Dạo bước dưới dàn siêu cây khổng lồ phát sáng và ngắm toàn cảnh vịnh từ tháp quan sát.",
          en: "Stroll beneath glowing Supertrees and enjoy 360 bay views from Skypark.",
          ko: "빛나는 슈퍼트리 아래를 거닐고 스카이파크 전망대에서 싱가포르 야경 감상.",
          ja: "幻想的に光るスーパーツリーを散策し、スカイパークから夜景を一望。",
          th: "เดินชมซูเปอร์ทรีเรืองแสงยามค่ำคืนและชมวิวเมืองสิงคโปร์จากสกายพาร์ค",
        },
        image_url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=85",
        category: "entertainment",
        location_name: { vi: "Marina Bay, Singapore", en: "Marina Bay, Singapore", ko: "싱가포르 마리나 베이", ja: "シンガポール マリーナベイ", th: "มารีน่าเบย์, สิงคโปร์" },
      },
    ],
  },

  {
    slug: "seoul",
    name: { vi: "SEOUL", en: "SEOUL", ko: "서울", ja: "ソウル", th: "โซล" },
    country: { vi: "Hàn Quốc", en: "South Korea", ko: "대한민국", ja: "韓国", th: "เกาหลีใต้" },
    is_domestic: false,
    rating: 4.9,
    discount_badge: "25%",
    hero_image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=85",
    ],
    summary: {
      vi: "Thủ đô thời trang K-pop nhộn nhịp cùng cung điện cổ kính Gyeongbokgung.",
      en: "Trendy K-pop capital home to historic Gyeongbokgung Palace.",
      ko: "K-POP 트렌드의 중심이자 경복궁의 옛 미가 공존하는 한국의 수도.",
      ja: "K-POPのトレンド発信地であり、景福宮の歴史的建造物が残る韓国の首都。",
      th: "เมืองหลวงแห่งเทรนด์ K-Pop และพระราชวังเคียงบกกุงอันทรงเสน่ห์",
    },
    description: {
      vi: "Seoul chào đón bạn với không khí nhộn nhịp Myeongdong, Tháp N Seoul lãng mạn và ẩm thực nướng BBQ đường phố phong phú.",
      en: "Seoul welcomes visitors with Myeongdong shopping, romantic N Seoul Tower, and K-BBQ.",
      ko: "명동의 쇼핑 거리, 남산 서울타워의 로맨틱한 야경, 맛있는 삼겹살 구이.",
      ja: "明洞のショッピング街、Nソウルタワーのロマンチックな夜景、本格サムギョプサル。",
      th: "โซล ย่านช้อปปิ้งเมียงดง หอคอยเอ็นโซลสุดโรแมนติก และหมูย่างเกาหลี",
    },
    foods: [
      {
        slug: "samgyeopsal",
        title: { vi: "Tteokbokki & Samgyeopsal", en: "Tteokbokki & Samgyeopsal", ko: "떡볶이 & 삼겹살", ja: "トッポッキ & サムギョプサル", th: "ต็อกโบกี & สามชั้นย่าง" },
        description: {
          vi: "Thịt heo ba chỉ nướng cuốn kim chi lá gan và bánh gạo cay xốt đỏ.",
          en: "Sizzling Korean pork belly BBQ with kimchi and spicy rice cakes.",
          ko: "노릇노릇하게 구운 삼겹살과 묵은지 쌈, 매콤달콤 떡볶이.",
          ja: "ジューシーな豚三層肉のサムギョプサルと旨辛トッポッキ。",
          th: "หมูสามชั้นย่างกระทะร้อนห่อกิมจิพร้อมต็อกโบกีซอสเผ็ดเกาหลี",
        },
        image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
        price_range: "12,000 - 30,000 KRW",
        recommended_spots: [{ vi: "Hongdae BBQ Street", en: "Hongdae BBQ Street", ko: "홍대 고기골목", ja: "弘大 焼肉通り", th: "ย่านปิ้งย่างฮงแด" }],
      },
    ],
    activities: [
      {
        slug: "gyeongbokgung",
        title: { vi: "Cung Điện Gyeongbokgung & Myeongdong", en: "Gyeongbokgung Palace & Myeongdong", ko: "경복궁 & 명동", ja: "景福宮 & 明洞", th: "พระราชวังเคียงบกกุง & เมียงดง" },
        description: {
          vi: "Mặc áo Hanbok chụp ảnh tại Cung điện hoàng gia và quẩy shopping đường phố.",
          en: "Wear traditional Hanbok at Royal Palace and enjoy street shopping.",
          ko: "한복을 입고 경복궁을 인스타 인증샷 찍고 명동에서 쇼핑 즐기기.",
          ja: "韓服を着て景福宮で記念撮影し、明洞でコスメと服のショッピング。",
          th: "แต่งชุดฮันบกถ่ายรูป ณ พระราชวังและเพลิดเพลินกับการช้อปปิ้งเมียงดง",
        },
        image_url: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=85",
        category: "culture",
        location_name: { vi: "Jongno & Myeongdong, Seoul", en: "Seoul, Korea", ko: "서울 종로 & 명동", ja: "ソウル 鍾路 & 明洞", th: "โซล, เกาหลีใต้" },
      },
    ],
  },

  // --- TRONG NƯỚC (DOMESTIC) ---
  {
    slug: "da-nang",
    name: { vi: "ĐÀ NẴNG", en: "DA NANG", ko: "다낭", ja: "ダナン", th: "ดานัง" },
    country: { vi: "Việt Nam", en: "Vietnam", ko: "베트남", ja: "ベトナム", th: "เวียดนาม" },
    is_domestic: true,
    rating: 4.9,
    discount_badge: "25%",
    hero_image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    ],
    summary: {
      vi: "Thành phố biển bãi Mỹ Khê, Cầu Rồng phun lửa và Bà Nà Hills tiên cảnh.",
      en: "Coastal city with My Khe beach, Dragon Bridge, and Ba Na Hills.",
      ko: "미케 비치, 용다리, 바나힐이 펼쳐지는 베트남 최고의 휴양 도시.",
      ja: "ミーケービーチ、ドラゴン橋、バーナーヒルズが有名なベトナム屈指のリゾート都市。",
      th: "เมืองชายหาดพร้อมหาดมีเค สะพานมังกร และบานาฮิลล์อันสวยงาม",
    },
    description: {
      vi: "Đà Nẵng sở hữu bờ biển dài đẹp hàng đầu thế giới, khí hậu trong lành và các điểm tham quan hiện đại kết hợp văn hóa truyền thống.",
      en: "Da Nang boasts world-class white sand beaches, pleasant weather, and iconic landmarks like Golden Bridge.",
      ko: "다낭은 세계적인 흰 모래사장과 골든 브릿지 등 베트남 대표 관광지가 가득합니다.",
      ja: "ダナンは美しい白砂のビーチと神の手で知られるゴールデンブリッジなど魅力満載です。",
      th: "ดานังมีหาดทรายขาวระดับโลก พร้อมสถานที่ท่องเที่ยวอันโดดเด่นอย่างสะพานมือลอยฟ้า",
    },
    foods: [
      {
        slug: "mi-quang",
        title: { vi: "Mì Quảng & Bánh Tráng Thịt Heo", en: "Mi Quang & Pork Rice Paper Rolls", ko: "미꽝 & 돼지고기 라이스페이퍼 롤", ja: "ミークアン & 豚肉の生春巻き", th: "หมี่กวาง & เมี่ยงหมู" },
        description: {
          vi: "Mì Quảng đượm vị đậm đà kèm bánh tráng cuốn thịt heo hai đầu da mắm nêm.",
          en: "Savory local Quang noodles served with rolled pork and anchovy dipping sauce.",
          ko: "진한 육수의 미꽝 국수와 특제 생선 소스에 찍어먹는 돼지고기 라이스페이퍼 쌈.",
          ja: "濃厚なスープのミークアン麺と特製マムネムソースでいただく豚肉春巻き。",
          th: "บะหมี่หมี่กวางรสเข้มข้นพร้อมหมูห่อแผ่นแป้งจิ้มซอสปลาร้าสูตรพิเศษ",
        },
        image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=85",
        price_range: "30,000 - 80,000 VND",
        recommended_spots: [{ vi: "Mì Quảng Ếch Bếp Trang", en: "Bep Trang Mi Quang", ko: "뼙짱 미꽝", ja: "ベップチャン ミークアン", th: "เบ็ปจาง หมี่กวาง" }],
      },
    ],
    activities: [
      {
        slug: "ba-na-hills",
        title: { vi: "Bà Nà Hills & Cầu Vàng", en: "Ba Na Hills & Golden Bridge", ko: "바나힐 & 골든브릿지", ja: "バーナーヒルズ & ゴールデンブリッジ", th: "บานาฮิลล์ & สะพานมือลอยฟ้า" },
        description: {
          vi: "Đi cáp treo lên đỉnh núi tham quan Cầu Vàng đôi bàn tay khổng lồ và Làng Pháp.",
          en: "Take scenic cable cars to the giant hands Golden Bridge and French Village.",
          ko: "케이블카를 타고 손 모양의 골든 브릿지와 유럽풍 프랑스 마을 탐방.",
          ja: "ロープウェイで神の手のゴールデンブリッジとフレンチヴィレッジへ。",
          th: "นั่งกระเช้าลอยฟ้าไปยังสะพานมือลอยฟ้าและหมู่บ้านฝรั่งเศส",
        },
        image_url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=85",
        category: "entertainment",
        location_name: { vi: "Hòa Vang, Đà Nẵng", en: "Hoa Vang, Da Nang", ko: "다낭 화방", ja: "ダナン ホアヴァン", th: "ฮัววาง, ดานัง" },
      },
    ],
  },

  {
    slug: "da-lat",
    name: { vi: "ĐÀ LẠT", en: "DA LAT", ko: "달랏", ja: "ダラット", th: "ดาลัด" },
    country: { vi: "Việt Nam", en: "Vietnam", ko: "베트남", ja: "ベトナム", th: "เวียดนาม" },
    is_domestic: true,
    rating: 4.9,
    discount_badge: "20%",
    hero_image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    ],
    summary: {
      vi: "Thành phố sương mờ ngàn hoa với khí hậu se lạnh quanh năm.",
      en: "Mist-covered flower city with cool mountain pine breeze.",
      ko: "사계절 서늘한 기후와 꽃, 안개가 가득한 아름다운 베트남 고원 도시.",
      ja: "年間を通じて涼しい気候と花々、霧に包まれたロマンチックな高原都市。",
      th: "เมืองแห่งหมอกและดอกไม้พร้อมสายลมเย็นสบายบนยอดเขาตลอดปี",
    },
    description: {
      vi: "Đà Lạt quyến rũ bởi những đồi thông xanh mút tầm mắt, các homestay villa phong cách châu Âu và không khí săn mây đồi chè.",
      en: "Da Lat charms visitors with rolling pine hills, European villas, and morning cloud hunting.",
      ko: "달랏은 끝없이 펼쳐진 소나무 숲, 유럽풍 홈스테이 빌라, 운해 일출로 유명합니다.",
      ja: "松の木が広がる丘、ヨーロッパ風のヴィラ、雲海鑑賞が人気です。",
      th: "ดาลัดมีเสน่ห์ด้วยทิวเขาป่าสน สไตล์วิลล่าแบบยุโรป และการชมทะเลหมอกยามเช้า",
    },
    foods: [
      {
        slug: "lau-ga-la-e",
        title: { vi: "Lẩu Gà Lá É & Bánh Căn Hot", en: "Chicken Hotpot & Banh Can", ko: "닭고기 핫팟 & 바인깐", ja: "鶏肉鍋 & バンカン", th: "ชาบูไก่ใบอี๊ & ขนมครกเวียดนาม" },
        description: {
          vi: "Nồi lẩu gà lá é nóng hổi bắp chuối trong đêm se lạnh và bánh căn trứng béo ngậy.",
          en: "Hearty chicken hotpot with sour leaf greens and mini crispy rice egg pancakes.",
          ko: "쌀쌀한 밤에 먹는 따뜻한 닭고기 핫팟과 겉바속촉 계란 바인깐.",
          ja: "肌寒い夜にぴったりの温かい鶏肉鍋と香ばしいミニエッグパンケーキ。",
          th: "หม้อไฟไก่ใบอี๊ร้อนๆ ยามดึกพร้อมขนมครกไข่ข้นกรอบนอกนุ่มใน",
        },
        image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=85",
        price_range: "50,000 - 250,000 VND",
        recommended_spots: [{ vi: "Lẩu Gà Lá É Tao Ngộ", en: "Tao Ngo Chicken Hotpot", ko: "따오응오 닭고기 핫팟", ja: "タオンゴ 鶏肉鍋", th: "เต๋าโง หม้อไฟไก่" }],
      },
    ],
    activities: [
      {
        slug: "san-may-cau-dat",
        title: { vi: "Săn Mây Đồi Chè Cầu Đất", en: "Cloud Hunting at Cau Dat Tea Hill", ko: "까우닷 차밭 운해 감상", ja: "カウダット茶畑の雲海鑑賞", th: "ชมทะเลหมอกไร่ชาเกิวเดิ้ต" },
        description: {
          vi: "Dậy sớm đón bình minh săn biển mây bồng bềnh phủ qua những ngọn đồi chè xanh.",
          en: "Wake up early to catch stunning sunrise clouds drifting over green tea plantations.",
          ko: "이른 아침 일출과 함께 그린 차밭 위로 넘실거리는 구름 바다 관람.",
          ja: "早朝の朝日とともに緑の茶畑に広がる幻想的な雲海を鑑賞。",
          th: "ตื่นเช้าชมพระอาทิตย์ขึ้นและทะเลหมอกเหนือไร่ชาเขียวอันกว้างใหญ่",
        },
        image_url: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=85",
        category: "nature",
        location_name: { vi: "Cầu Đất, Đà Lạt", en: "Cau Dat, Da Lat", ko: "달랏 까우닷", ja: "ダラット カウダット", th: "เกิวเดิ้ต, ดาลัด" },
      },
    ],
  },

  {
    slug: "phu-quoc",
    name: { vi: "PHÚ QUỐC", en: "PHU QUOC", ko: "푸꾸옥", ja: "フーコック島", th: "ฟู้โกว๊ก" },
    country: { vi: "Việt Nam", en: "Vietnam", ko: "베트남", ja: "ベトナム", th: "เวียดนาม" },
    is_domestic: true,
    rating: 4.9,
    discount_badge: "35%",
    hero_image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85",
    ],
    summary: {
      vi: "Đảo ngọc biển xanh ngọc bích, cát trắng Bãi Sao và Sunset Sanato.",
      en: "Emerald pearl island with white sand beaches and romantic sunsets.",
      ko: "에메랄드빛 바다, 맑은 흰 모래사장, 로맨틱 일몰이 돋보이는 진주 섬.",
      ja: "エメラルドグリーンの海、白い砂浜、ロマンチックな夕日が広がる真珠の島。",
      th: "เกาะมุกมรกตพร้อมหาดทรายขาวและพระอาทิตย์ตกดินสุดโรแมนติก",
    },
    description: {
      vi: "Phú Quốc nổi tiếng với bãi biển hoang sơ, cáp treo Hòn Thơm vượt biển dài nhất thế giới và các resort 5 sao bờ biển.",
      en: "Phu Quoc features untouched beaches, world's longest sea cable car, and 5-star oceanfront resorts.",
      ko: "푸꾸옥은 세계 최장 해상 케이블카, 5성급 해변 리조트, 투명한 청정 바다로 가득합니다.",
      ja: "世界最長の海上ロープウェイ、5つ星オーシャンフロントリゾート、透明度の高い海が魅力。",
      th: "ฟู้โกว๊กมีหาดทรายธรรมชาติ กระเช้าลอยฟ้าข้ามทะเลยาวที่สุดในโลก และรีสอร์ท 5 ดาว",
    },
    foods: [
      {
        slug: "bun-quay",
        title: { vi: "Bún Quậy & Gỏi Cá Trích", en: "Bun Quay & Herring Salad", ko: "분꿔이 & 청어 샐러드", ja: "ブンクアイ & ニシンサラダ", th: "บุ้นเกวย & ยำปลาหลังเขียว" },
        description: {
          vi: "Tô bún quậy hải sản tươi ngon tự pha nước chấm và gỏi cá trích cuốn bánh tráng.",
          en: "Fresh seafood noodle soup with DIY sauce and raw herring coconut salad.",
          ko: "직접 만드는 특제 소스의 신선한 해산물 분꿔이 국수와 청어 회 무침.",
          ja: "自分でタレを作る新鮮な海鮮ブンクアイ麺とニシンの生春巻き。",
          th: "ขนมจีนน้ำใสอาหารทะเลปรุงซอสเองพร้อมยำปลาหลังเขียวห่อแผ่นแป้ง",
        },
        image_url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85",
        price_range: "50,000 - 120,000 VND",
        recommended_spots: [{ vi: "Bún Quậy Kiến Xây", en: "Kien Xay Bun Quay", ko: "끼엔세 분꿔이", ja: "キエンセイ ブンクアイ", th: "เกี๋ยนเซย บุ้นเกวย" }],
      },
    ],
    activities: [
      {
        slug: "cap-treo-hon-thom",
        title: { vi: "Cáp Treo Hòn Thơm & VinWonders", en: "Hon Thom Cable Car & VinWonders", ko: "혼똔 섬 케이블카 & 빈원더스", ja: "ホントム島ロープウェイ & ヴィンワンダーズ", th: "กระเช้าเกาะฮอนทอม & วินวันเดอร์ส" },
        description: {
          vi: "Trải nghiệm cáp treo 3 dây vượt biển dài nhất thế giới ngắm toàn cảnh các đảo nhỏ.",
          en: "Ride the world's longest 3-wire sea cable car for panoramic island views.",
          ko: "세계 최장 3선 해상 케이블카를 타고 아기자기한 섬 전경 감상.",
          ja: "世界最長の3線式海上ロープウェイから美しい島々を大パノラマ見学。",
          th: "นั่งกระเช้าลอยฟ้าข้ามทะเล 3 สายยาวที่สุดในโลกชมวิวหมู่เกาะจากมุมสูง",
        },
        image_url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85",
        category: "entertainment",
        location_name: { vi: "An Thới, Phú Quốc", en: "An Thoi, Phu Quoc", ko: "푸꾸옥 안터이", ja: "フーコック アントイ", th: "อันทอย, ฟู้โกว๊ก" },
      },
    ],
  },

  {
    slug: "ha-noi",
    name: { vi: "HÀ NỘI", en: "HANOI", ko: "하노이", ja: "ハノイ", th: "ฮานอย" },
    country: { vi: "Việt Nam", en: "Vietnam", ko: "베트남", ja: "ベトナム", th: "เวียดนาม" },
    is_domestic: true,
    rating: 4.8,
    discount_badge: "20%",
    hero_image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=85",
    ],
    summary: {
      vi: "Thủ đô ngàn năm văn hiến nét đẹp 36 phố phường và Hồ Gươm cổ kính.",
      en: "Thousand-year capital with historic 36 old streets and Hoan Kiem Lake.",
      ko: "천년의 역사를 품은 하노이 36거리와 호안끼엠 호수의 고풍스러운 멋.",
      ja: "千年の歴史を誇る36古街とホアンキエム湖の風情あるベトナムの首都。",
      th: "เมืองหลวงพันปีพร้อมย่านโบราณ 36 สายและทะเลสาบคืนดาบอันทรงคุณค่า",
    },
    description: {
      vi: "Hà Nội làm say lòng du khách bằng bát Phở gia truyền thơm nức, tách Cà Phê Trứng béo ngậy và nhịp sống phố cổ rộn ràng.",
      en: "Hanoi charms travelers with authentic Pho broth, rich egg coffee, and vibrant Old Quarter alleys.",
      ko: "하노이는 진한 전통 쌀국수 포, 부드러운 에그 커피, 활기찬 구시가지 거리로 사랑받습니다.",
      ja: "伝統のフォー、濃厚なエッグコーヒー、活気ある旧市街の路地が旅人を魅了します。",
      th: "ฮานอย ตรึงใจนักท่องเที่ยวด้วยเฝอสูตรโบราณ กาแฟไข่รสกลมกล่อม และย่านย่านเมืองเก่า",
    },
    foods: [
      {
        slug: "pho-ha-noi",
        title: { vi: "Phở Gia Truyền & Bún Chả", en: "Traditional Pho & Bun Cha", ko: "전통 쌀국수 포 & 분짜", ja: "伝統フォー & ブンチャー", th: "เฝอสูตรดั้งเดิม & บุ๋นจ๋า" },
        description: {
          vi: "Tô Phở bò nước dùng trong ngọt thanh và bún chả thịt nướng than hoa thơm lừng.",
          en: "Classic beef Pho broth and charcoal-grilled pork patties in sweet fish sauce.",
          ko: "맑고 진한 육수의 소고기 포와 숯불 돼지고기 분짜.",
          ja: " transparent でコクのある beef フォーと炭火焼き豚肉のブンチャー。",
          th: "เฝอเนื้อน้ำซุปกลมกล่อมและบุ๋นจ๋าหมูย่างเตาถ่านหอมฉุย",
        },
        image_url: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=85",
        price_range: "40,000 - 90,000 VND",
        recommended_spots: [{ vi: "Phở Thìn Bờ Hồ", en: "Pho Thin Lake", ko: "포틴 호수점", ja: "フォーティン ホアンキエム", th: "เฝอทิน ริมบึง" }],
      },
    ],
    activities: [
      {
        slug: "ho-guom-pho-co",
        title: { vi: "Hồ Gươm & 36 Phố Phường", en: "Hoan Kiem Lake & Old Quarter Walk", ko: "호안끼엠 호수 & 36 구시가지", ja: "ホアンキエム湖 & 36古街", th: "ทะเลสาบคืนดาบ & ย่านเมืองเก่า 36 สาย" },
        description: {
          vi: "Dạo bước quanh Hồ Hoàn Kiếm ngắm Đền Ngọc Sơn và thưởng thức ẩm thực vỉa hè.",
          en: "Stroll around Hoan Kiem Lake, visit Ngoc Son temple, and try street food.",
          ko: "호안끼엠 호숫가를 산책하고 응옥선 사원 관람 및 로컬 길거리 음식 탐방.",
          ja: "ホアンキエム湖畔を散策し、玉山祠の参拝とローカルな屋台グルメを楽しむ。",
          th: "เดินเล่นรอบทะเลสาบคืนดาบ ชมวัดหยก และชิมสตรีทฟู้ดริมทาง",
        },
        image_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=85",
        category: "culture",
        location_name: { vi: "Hoàn Kiếm, Hà Nội", en: "Hoan Kiem, Hanoi", ko: "하노이 호안끼엠", ja: "ハノイ ホアンキエム", th: "ฮว่านเกี๋ยม, ฮานอย" },
      },
    ],
  },
];

async function runSeed() {
  try {
    console.log(`Connecting to Primary MongoDB (${primaryUrl})...`);
    await mongoose.connect(primaryUrl, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to Primary MongoDB for Seeding!");
  } catch (err) {
    console.warn(`Primary MongoDB Atlas connection failed (${err.message}). Falling back to Local MongoDB at ${localUrl}...`);
    await mongoose.connect(localUrl, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to Local MongoDB for Seeding!");
  }

  for (const data of seedDestinations) {
    let saved = false;
    for (let retry = 1; retry <= 3; retry++) {
      try {
        await Destination.findOneAndUpdate({ slug: data.slug }, data, {
          upsert: true,
          returnDocument: "after",
        });
        console.log(`Seeded HD destination: ${data.slug} (${data.name.vi} / ${data.name.en})`);
        saved = true;
        break;
      } catch (err) {
        console.error(`Error seeding ${data.slug} (retry ${retry}/3): ${err.message}`);
        await new Promise((res) => setTimeout(res, 1500));
      }
    }
    if (!saved) console.error(`Skipped ${data.slug} due to connection error.`);
  }

  console.log("Seeding Destinations HD & 5-Language completed 100%!");
  process.exit(0);
}

runSeed();
