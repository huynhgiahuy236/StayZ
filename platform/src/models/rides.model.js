const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true, trim: true },
  vehicleType: {
    type: String,
    enum: ['MOTORBIKE_SCOOTER', 'MOTORBIKE_MANUAL', 'CAR_4_SEAT', 'CAR_7_SEAT'],
    required: true,
    index: true
  },
  licensePlate: { type: String, required: true, unique: true },
  city: { type: String, required: true, index: true },
  pricePerDay: { type: Number, required: true },
  depositAmount: { type: Number, default: 0 },
  deliveryOptions: [{ type: String }], // HOME_DELIVERY, AIRPORT_PICKUP, STORE_PICKUP
  requiresKYC: { type: Boolean, default: true },
  status: {
    type: String,
    enum: ['AVAILABLE', 'RENTED', 'MAINTENANCE'],
    default: 'AVAILABLE',
    index: true
  },
  images: [{ type: String }],
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: String, default: null }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ride', rideSchema);
