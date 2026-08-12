const mongoose = require('mongoose');

const flightRouteSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  airlineCode: { type: String, required: true },
  flightNumber: { type: String, required: true },
  route: {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  duration: { type: Number, required: true }, // minutes
  pricePerSeat: { type: Number, required: true },
  currency: { type: String, default: 'VND' },
  seatClass: {
    type: String,
    enum: ['ECONOMY', 'BUSINESS', 'FIRST_CLASS'],
    default: 'ECONOMY'
  },
  availableSeats: { type: Number, default: 30 },
  aircraft: { type: String, default: 'Boeing 737' },
  baggage: { type: String, default: '20kg' },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
}, {
  timestamps: true
});

flightRouteSchema.index({ 'route.from': 1, 'route.to': 1 });
flightRouteSchema.index({ departureTime: 1 });

module.exports = mongoose.model('Flight', flightRouteSchema);
