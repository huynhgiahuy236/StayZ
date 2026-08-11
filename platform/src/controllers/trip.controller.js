const Trip = require("../models/trips.model");

const tripController = {
  createTrip: async (req, res, next) => {
    try {
      const { userId, tripName, items, holdMinutes } = req.body;
      if (!userId || !tripName) {
        return res.status(400).json({ success: false, message: "UserId và TripName là bắt buộc" });
      }

      const holdExpiresAt = new Date(Date.now() + (holdMinutes || 15) * 60 * 1000);
      let totalAmount = 0;
      if (items && Array.isArray(items)) {
        totalAmount = items.reduce((sum, item) => sum + (item.price || 0), 0);
      }

      const discountAmount = items && items.length >= 3 ? Math.round(totalAmount * 0.1) : 0; // Combo 3+ dịch vụ giảm 10%
      const finalAmount = totalAmount - discountAmount;

      const newTrip = await Trip.create({
        userId,
        tripName,
        status: "HOLDING",
        holdExpiresAt,
        totalAmount,
        discountAmount,
        finalAmount,
        items: items || [],
        members: [{ userId, role: "OWNER" }]
      });

      res.status(201).json({ success: true, message: "Tạo chuyến đi thành công", data: newTrip });
    } catch (err) {
      next(err);
    }
  },

  getUserTrips: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const trips = await Trip.find({ userId, isDeleted: false }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: trips });
    } catch (err) {
      next(err);
    }
  },

  addItemToTrip: async (req, res, next) => {
    try {
      const { tripId } = req.params;
      const { itemType, supplierRef, details, price } = req.body;

      const trip = await Trip.findById(tripId);
      if (!trip) {
        return res.status(404).json({ success: false, message: "Không tìm thấy chuyến đi" });
      }

      trip.items.push({ itemType, supplierRef, details, price: price || 0 });
      trip.totalAmount = trip.items.reduce((sum, i) => sum + (i.price || 0), 0);
      trip.discountAmount = trip.items.length >= 3 ? Math.round(trip.totalAmount * 0.1) : 0;
      trip.finalAmount = trip.totalAmount - trip.discountAmount;

      await trip.save();
      res.status(200).json({ success: true, message: "Đã thêm dịch vụ vào chuyến đi", data: trip });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = tripController;
