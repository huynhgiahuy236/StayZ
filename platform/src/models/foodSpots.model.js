const mongoose = require('mongoose');

const recommendedSpotSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  rating: { type: Number, default: 0 },
});

const foodSpotSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  name_en: { type: String, default: "" },
  description: { type: String, default: "" },
  description_en: { type: String, default: "" },
  category: {
    type: String,
    enum: ['STREET_FOOD', 'RESTAURANT', 'CAFE', 'BAR', 'FINE_DINING', 'LOCAL_SPECIALTY'],
    default: 'LOCAL_SPECIALTY'
  },
  price_range: { type: String, default: "" },
  price_min: { type: Number, default: 0 },
  price_max: { type: Number, default: 0 },
  currency: { type: String, default: "VND" },
  city: { type: String, required: true, index: true },
  address: { type: String, default: "" },
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
  main_image_url: { type: String, default: "" },
  gallery_images: [{ type: String }],
  recommended_spots: [recommendedSpotSchema],
  opening_hours: { type: String, default: "" },
  is_featured: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model('FoodSpot', foodSpotSchema);
