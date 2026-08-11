const Destination = require("../models/destinations.model");
const Property = require("../models/properties.model");
const { NotFoundError } = require("../helpers/error.helper");

const resolveI18n = (obj, lang) => {
  if (!obj || typeof obj !== "object") return obj;
  if (!lang || lang === "all") return obj;
  return obj[lang] || obj["en"] || obj["vi"] || "";
};

const formatDestination = (doc, lang) => {
  const item = doc.toObject ? doc.toObject() : doc;

  const formatted = {
    _id: item._id,
    slug: item.slug,
    name: resolveI18n(item.name, lang),
    country: resolveI18n(item.country, lang),
    is_domestic: item.is_domestic,
    rating: item.rating,
    discount_badge: item.discount_badge,
    hero_image: item.hero_image,
    gallery: item.gallery || [],
    summary: resolveI18n(item.summary, lang),
    description: resolveI18n(item.description, lang),
    raw_name: item.name,
    raw_country: item.country,
    foods: (item.foods || []).map((f) => ({
      _id: f._id,
      slug: f.slug,
      title: resolveI18n(f.title, lang),
      description: resolveI18n(f.description, lang),
      image_url: f.image_url,
      price_range: f.price_range,
      recommended_spots: (f.recommended_spots || []).map((s) =>
        resolveI18n(s, lang),
      ),
      raw_title: f.title,
    })),
    activities: (item.activities || []).map((a) => ({
      _id: a._id,
      slug: a.slug,
      title: resolveI18n(a.title, lang),
      description: resolveI18n(a.description, lang),
      image_url: a.image_url,
      category: a.category,
      location_name: resolveI18n(a.location_name, lang),
      raw_title: a.title,
    })),
    properties: item.properties || [],
  };

  return formatted;
};

const destinationsService = {
  getAll: async ({ is_domestic, lang }) => {
    const query = { is_active: true };
    if (is_domestic !== undefined && is_domestic !== null && is_domestic !== "") {
      query.is_domestic = String(is_domestic) === "true";
    }

    const docs = await Destination.find(query)
      .populate("properties", "title slug city type price min_price imageUrls rating reviewCount")
      .sort({ rating: -1 });

    return docs.map((doc) => formatDestination(doc, lang));
  },

  getBySlug: async (slug, lang) => {
    const doc = await Destination.findOne({ slug, is_active: true }).populate(
      "properties",
      "title slug city type price min_price imageUrls rating reviewCount",
    );

    if (!doc) {
      throw new NotFoundError("Không tìm thấy thông tin nơi du lịch");
    }

    // Nếu thuộc tính properties chưa được liên kết thủ công, tự động query khách sạn theo city slug
    const formatted = formatDestination(doc, lang);
    if (!formatted.properties || formatted.properties.length === 0) {
      const cityHotels = await Property.find({
        city: slug,
        is_active: { $ne: false },
      }).select("title slug city type price min_price imageUrls rating reviewCount");
      formatted.properties = cityHotels;
    }

    return formatted;
  },

  create: async (data) => {
    const newDestination = await Destination.create(data);
    return newDestination;
  },

  update: async (slug, data) => {
    const updated = await Destination.findOneAndUpdate({ slug }, data, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundError("Không tìm thấy nơi du lịch để cập nhật");
    }
    return updated;
  },

  delete: async (slug) => {
    const deleted = await Destination.findOneAndUpdate(
      { slug },
      { is_active: false },
      { new: true },
    );
    if (!deleted) {
      throw new NotFoundError("Không tìm thấy nơi du lịch để xóa");
    }
    return deleted;
  },
};

module.exports = destinationsService;
