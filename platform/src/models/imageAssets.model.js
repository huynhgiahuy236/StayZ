/**
 * =============================================================================
 * HuKi Travel Ecosystem - ImageAsset Metadata Model
 * Standard: promt.img.md Section 11 — Database Image Metadata Standard
 * =============================================================================
 * Fields match the unified metadata blueprint:
 *   entity_type, entity_id, image_role, source_type, source_url,
 *   source_image_url, cloudinary_public_id, cloudinary_url, width, height,
 *   aspect_ratio, is_primary, score, approval_status, perceptual_hash,
 *   created_at
 * =============================================================================
 */

const mongoose = require("mongoose");

/**
 * Role constants — matches image_role enum across the system
 */
const IMAGE_ROLES = [
  "cover",    // Primary entity cover / hero
  "hero",     // Full-width hero banner
  "banner",   // Secondary banner
  "thumbnail",// Small preview
  "gallery",  // Gallery item
  "interior", // Interior shot (room, cabin)
  "exterior", // Exterior shot
  "room",     // Room-specific image
  "avatar",   // Profile avatar / logo
  "logo",     // Brand logo
  "map",      // Map static image
];

/**
 * Source type constants
 */
const SOURCE_TYPES = [
  "UNSPLASH",        // Sourced from Unsplash CDN
  "PEXELS",          // Sourced from Pexels CDN
  "AI_GENERATED",    // Generated via AI image model
  "USER_UPLOADED",   // Uploaded by user
  "CLOUDINARY_GEN",  // Generated via Cloudinary AI
  "OTHER",           // Other source
];

/**
 * Approval status constants — per Section 6 promt.img.md
 */
const APPROVAL_STATUSES = [
  "APPROVED",     // Score >= 85, eligible for Cloudinary ingest
  "NEED_REVIEW",  // Score 70-84, requires manual verification
  "REJECTED",     // Score < 70, discard candidate
  "PENDING",      // Not yet scored
  "PENDING_RETRY",// Cloudinary upload failed, queued for retry
];

const imageAssetSchema = new mongoose.Schema(
  {
    // ── Entity relationship ──────────────────────────────────────────────────
    entity_type: {
      type: String,
      required: true,
      enum: [
        "HOTEL", "ROOM", "BUS", "RIDE", "FLIGHT",
        "FOOD", "DESTINATION", "EXPERIENCE", "BUSINESS",
        "USER", "TRIP", "PASS", "VEHICLE",
      ],
      index: true,
    },
    entity_id: {
      type: String,
      required: true,
      index: true,
    },
    // Allows fast lookup: is_primary image for any entity
    _entityUnique: {
      type: String,
      unique: true,
      sparse: true,
    },

    // ── Role & positioning ────────────────────────────────────────────────────
    image_role: {
      type: String,
      required: true,
      enum: IMAGE_ROLES,
      index: true,
    },
    is_primary: {
      type: Boolean,
      default: false,
      index: true,
    },
    gallery_index: {
      type: Number,
      default: null, // null = not a gallery item
    },

    // ── Source provenance ─────────────────────────────────────────────────────
    source_type: {
      type: String,
      required: true,
      enum: SOURCE_TYPES,
      default: "UNSPLASH",
    },
    source_url: {
      type: String,
      default: "", // Original discovery page URL
    },
    source_image_url: {
      type: String,
      default: "", // Raw CDN candidate URL before Cloudinary ingest
    },
    source_image_id: {
      type: String,
      default: "", // e.g. "Unsplash photo ID" to detect duplicates
      index: true,
    },

    // ── Cloudinary ───────────────────────────────────────────────────────────
    cloudinary_public_id: {
      type: String,
      default: "",
      index: true,
    },
    cloudinary_url: {
      type: String,
      default: "",
    },
    cloudinary_url_hero: {
      type: String,
      default: "", // w_1920 transformation
    },
    cloudinary_url_card: {
      type: String,
      default: "", // w_800 transformation
    },
    cloudinary_url_thumb: {
      type: String,
      default: "", // w_400 transformation
    },

    // ── Technical metadata ───────────────────────────────────────────────────
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    aspect_ratio: {
      type: String,
      default: "", // e.g. "16:9", "4:3", "1:1"
    },
    file_size_bytes: {
      type: Number,
      default: null,
    },
    format: {
      type: String,
      default: "", // jpg, png, webp, avif
    },

    // ── Scoring & approval ───────────────────────────────────────────────────
    score: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },
    score_breakdown: {
      relevance:    { type: Number, default: null }, // 0-40
      resolution:   { type: Number, default: null }, // 0-15
      quality:      { type: Number, default: null }, // 0-15
      aspect_fit:   { type: Number, default: null }, // 0-10
      cleanliness:  { type: Number, default: null }, // 0-10
      uniqueness:   { type: Number, default: null }, // 0-10
    },
    approval_status: {
      type: String,
      enum: APPROVAL_STATUSES,
      default: "PENDING",
      index: true,
    },

    // ── Uniqueness & deduplication ──────────────────────────────────────────
    perceptual_hash: {
      type: String,
      default: "",
      index: true,
    },
    pixel_hash: {
      type: String,
      default: "", // Alternative: average-hash or dhash
    },

    // ── Subject relevance ────────────────────────────────────────────────────
    subject_match_score: {
      type: Number,
      default: null, // 0-40, Subject Relevance dimension
    },
    subject_description: {
      type: String,
      default: "",
    },
    rejection_reason: {
      type: String,
      default: "",
    },

    // ── Service domain for filtering ────────────────────────────────────────
    service_domain: {
      type: String,
      enum: ["HuKi Stay", "HuKi Bus", "HuKi Ride", "HuKi Flight",
             "HuKi Taste", "HuKi Experience", "HuKi Trip", "HuKi Pass", "Other"],
      default: "Other",
      index: true,
    },

    // ── Soft delete & audit ─────────────────────────────────────────────────
    is_deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    deleted_by: {
      type: String,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
      index: true,
    },

    // ── Search keywords used for sourcing ───────────────────────────────────
    search_keywords: {
      type: String,
      default: "",
    },

    // ── Multi-language alt text ──────────────────────────────────────────────
    alt_text: {
      vi: { type: String, default: "" },
      en: { type: String, default: "" },
      ko: { type: String, default: "" },
      ja: { type: String, default: "" },
      th: { type: String, default: "" },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Compound indexes ────────────────────────────────────────────────────────
imageAssetSchema.index({ entity_type: 1, entity_id: 1, image_role: 1 });
imageAssetSchema.index({ entity_type: 1, entity_id: 1, is_primary: 1 });
imageAssetSchema.index({ approval_status: 1, service_domain: 1 });
imageAssetSchema.index({ perceptual_hash: 1, entity_type: 1 });
imageAssetSchema.index({ cloudinary_public_id: 1, is_deleted: 1 });

// ── Virtual: unique entity image key ────────────────────────────────────────
imageAssetSchema.virtual("uniqueKey").get(function () {
  return `${this.entity_type}::${this.entity_id}::${this.image_role}`;
});

// ── Pre-save: build _entityUnique ────────────────────────────────────────────
imageAssetSchema.pre("save", function (next) {
  if (this.isPrimary !== false && this.is_primary) {
    this._entityUnique = `${this.entity_type}::${this.entity_id}::${this.image_role}`;
  }
  next();
});

// ── Static: get primary image for an entity ─────────────────────────────────
imageAssetSchema.statics.getPrimaryImage = async function (entityType, entityId) {
  return this.findOne({
    entity_type: entityType.toUpperCase(),
    entity_id: entityId,
    is_primary: true,
    is_deleted: false,
    is_active: true,
  }).lean();
};

// ── Static: get all gallery images for an entity ────────────────────────────
imageAssetSchema.statics.getGalleryImages = async function (entityType, entityId) {
  return this.find({
    entity_type: entityType.toUpperCase(),
    entity_id: entityId,
    image_role: "gallery",
    is_deleted: false,
    is_active: true,
  })
    .sort({ gallery_index: 1 })
    .lean();
};

// ── Static: find near-duplicates by perceptual hash ─────────────────────────
imageAssetSchema.statics.findNearDuplicates = async function (perceptualHash, threshold = 5) {
  return this.find({
    perceptual_hash: { $ne: "" },
    is_deleted: false,
  }).lean();
};

// ── Static: audit by service domain ────────────────────────────────────────
imageAssetSchema.statics.auditByDomain = async function () {
  const pipeline = [
    { $match: { is_deleted: false } },
    {
      $group: {
        _id: {
          service_domain: "$service_domain",
          entity_type: "$entity_type",
          image_role: "$image_role",
        },
        count: { $sum: 1 },
        approved: {
          $sum: { $cond: [{ $eq: ["$approval_status", "APPROVED"] }, 1, 0] },
        },
        pending: {
          $sum: { $cond: [{ $eq: ["$approval_status", "PENDING"] }, 1, 0] },
        },
        rejected: {
          $sum: { $cond: [{ $eq: ["$approval_status", "REJECTED"] }, 1, 0] },
        },
        unique_sources: { $addToSet: "$source_image_id" },
      },
    },
    { $sort: { "_id.service_domain": 1, "_id.entity_type": 1 } },
  ];
  return this.aggregate(pipeline);
};

// ── Static: uniqueness report ───────────────────────────────────────────────
imageAssetSchema.statics.uniquenessReport = async function () {
  const pipeline = [
    { $match: { is_deleted: false, source_image_id: { $ne: "" } } },
    {
      $group: {
        _id: "$source_image_id",
        used_by_entities: { $addToSet: "$entity_id" },
        usage_count: { $sum: 1 },
        entity_types: { $addToSet: "$entity_type" },
        roles: { $addToSet: "$image_role" },
        assets: { $push: "$$ROOT._id" },
      },
    },
    { $match: { usage_count: { $gt: 1 } } }, // Only duplicated sources
    { $sort: { usage_count: -1 } },
  ];
  return this.aggregate(pipeline);
};

module.exports = mongoose.model("ImageAsset", imageAssetSchema);
