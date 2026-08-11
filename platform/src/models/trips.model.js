const mongoose = require('mongoose');

const tripItemSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ['STAY', 'FLIGHT', 'BUS', 'RIDE', 'TOUR'],
    required: true
  },
  supplierRef: { type: String, required: true },
  details: { type: Object, default: {} },
  price: { type: Number, required: true, default: 0 }
}, { _id: true });

const tripMemberSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String, enum: ['OWNER', 'MEMBER'], default: 'MEMBER' },
  joinedAt: { type: Date, default: Date.now }
}, { _id: false });

const tripSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  tripName: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['HOLDING', 'PAID', 'COMPLETED', 'EXPIRED', 'CANCELLED'],
    default: 'HOLDING',
    index: true
  },
  holdExpiresAt: { type: Date, default: null, index: true },
  totalAmount: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  finalAmount: { type: Number, default: 0 },
  items: [tripItemSchema],
  members: [tripMemberSchema],
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: String, default: null }
}, {
  timestamps: true
});

tripSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('Trip', tripSchema);
