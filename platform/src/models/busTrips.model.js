const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNo: { type: String, required: true },
  deck: { type: Number, enum: [1, 2], default: 1 },
  status: {
    type: String,
    enum: ['AVAILABLE', 'LOCKED', 'BOOKED'],
    default: 'AVAILABLE'
  },
  lockedByUserId: { type: String, default: null },
  lockExpiresAt: { type: Date, default: null }
}, { _id: false });

const busTripSchema = new mongoose.Schema({
  busOperator: { type: String, required: true, trim: true },
  route: {
    from: { type: String, required: true },
    to: { type: String, required: true }
  },
  departureTime: { type: Date, required: true, index: true },
  arrivalTime: { type: Date, required: true },
  pricePerSeat: { type: Number, required: true },
  busType: {
    type: String,
    enum: ['SLEEPER_2_TIER', 'LIMOUSINE_VIP', 'SEATER'],
    default: 'SLEEPER_2_TIER'
  },
  seatMap: [seatSchema],
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: String, default: null }
}, {
  timestamps: true
});

busTripSchema.index({ 'route.from': 1, 'route.to': 1, departureTime: 1 });

module.exports = mongoose.model('BusTrip', busTripSchema);
