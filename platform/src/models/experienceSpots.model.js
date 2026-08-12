const mongoose = require('mongoose');

const experienceSpotSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  name_en: { type: String, default: "" },
  description: { type: String, default: "" },
  description_en: { type: String, default: "" },
  category: {
    type: String,
    enum: ['NATURE', 'CULTURE', 'ENTERTAINMENT', 'CHECKIN', 'ADVENTURE', 'WELLNESS'],
    default: 'CHECKIN'
  },
  city: { type: String, required: true, index: true },
  address: { type: String, default: "" },
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
  ticket_price: { type: Number, default: 0 },
  ticket_price_en: { type: Number, default: 0 },
  currency: { type: String, default: "VND" },
  opening_hours: { type: String, default: "" },
  best_time: { type: String, default: "" },
  duration: { type: String, default: "" },
  main_image_url: { type: String, default: "" },
  gallery_images: [{ type: String }],
  is_featured: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
}, {
  timestamps: true
});

// 2dsphere index for geospatial queries
experienceSpotSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('ExperienceSpot', experienceSpotSchema);
