const mongoose = require("mongoose");

// Schema đối tượng chuỗi đa ngôn ngữ (5 thứ tiếng: VN, EN, KR, JP, TH)
const I18nStringSchema = new mongoose.Schema(
  {
    vi: { type: String, required: true }, // 🇻🇳 Tiếng Việt
    en: { type: String, default: "" },     // 🇬🇧 English
    ko: { type: String, default: "" },     // 🇰🇷 한국어 (Tiếng Hàn)
    ja: { type: String, default: "" },     // 🇯🇵 日本語 (Tiếng Nhật)
    th: { type: String, default: "" },     // 🇹🇭 ไทย (Tiếng Thái)
  },
  { _id: false },
);

// 1. Sub-Schema: Ẩm thực & Món ngon (Foods Collection con)
const DestinationFoodSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  title: I18nStringSchema,             // Tên món ăn (5 thứ tiếng)
  description: I18nStringSchema,       // Mô tả món ăn (5 thứ tiếng)
  image_url: { type: String, default: "" },
  price_range: { type: String, default: "" },
  recommended_spots: [I18nStringSchema],      // Gợi ý quán ăn ngon (5 thứ tiếng)
});

// 2. Sub-Schema: Cảnh quan & Hoạt động (Activities Collection con)
const DestinationActivitySchema = new mongoose.Schema({
  slug: { type: String, required: true },
  title: I18nStringSchema,             // Tên cảnh quan/hoạt động (5 thứ tiếng)
  description: I18nStringSchema,       // Mô tả trải nghiệm (5 thứ tiếng)
  image_url: { type: String, default: "" },
  category: {
    type: String,
    enum: ["nature", "culture", "entertainment", "checkin"],
    default: "checkin",
  },
  location_name: I18nStringSchema,     // Vị trí địa danh (5 thứ tiếng)
});

// 3. Main Schema: Nơi Du Lịch (Destinations Collection)
const destinationSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true }, // vd: "bali", "da-nang", "tokyo"
    name: I18nStringSchema,            // Tên điểm đến (5 thứ tiếng)
    country: I18nStringSchema,         // Quốc gia (5 thứ tiếng)
    is_domestic: { type: Boolean, default: true, index: true }, // true: Trong nước | false: Quốc tế
    rating: { type: Number, default: 4.9 },
    discount_badge: { type: String, default: "20%" },
    hero_image: { type: String, default: "" },
    gallery: [{ type: String }],
    summary: I18nStringSchema,         // Tóm tắt ngắn (5 thứ tiếng)
    description: I18nStringSchema,     // Mô tả chi tiết (5 thứ tiếng)

    // Collection con bên trong
    foods: [DestinationFoodSchema],
    activities: [DestinationActivitySchema],

    // Liên kết danh sách Khách sạn thuộc Nơi du lịch này
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],

    is_active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Destination", destinationSchema);
