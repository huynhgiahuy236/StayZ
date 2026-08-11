const mongoose = require('mongoose');

const hukiPassSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  bookingId: { type: String, required: true, index: true },
  ticketCode: { type: String, required: true, unique: true },
  qrDynamicToken: { type: String, required: true },
  serviceDetails: { type: Object, required: true },
  status: {
    type: String,
    enum: ['VALID', 'USED', 'EXPIRED', 'REVOKED'],
    default: 'VALID',
    index: true
  },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: String, default: null }
}, {
  timestamps: true
});

module.exports = mongoose.model('HukiPass', hukiPassSchema);
