const BusTrip = require("../models/busTrips.model");

const busController = {
  searchBusTrips: async (req, res, next) => {
    try {
      const { from, to, date } = req.query;
      const query = { isDeleted: false };
      if (from) query['route.from'] = new RegExp(from, 'i');
      if (to) query['route.to'] = new RegExp(to, 'i');

      const busTrips = await BusTrip.find(query).sort({ departureTime: 1 });
      res.status(200).json({ success: true, data: busTrips });
    } catch (err) {
      next(err);
    }
  },

  getSeatMap: async (req, res, next) => {
    try {
      const { tripId } = req.params;
      const busTrip = await BusTrip.findById(tripId);
      if (!busTrip) {
        return res.status(404).json({ success: false, message: "Không tìm thấy chuyến xe khách" });
      }
      res.status(200).json({ success: true, data: busTrip.seatMap });
    } catch (err) {
      next(err);
    }
  },

  lockSeat: async (req, res, next) => {
    try {
      const { tripId } = req.params;
      const { seatNo, userId } = req.body;

      const busTrip = await BusTrip.findById(tripId);
      if (!busTrip) {
        return res.status(404).json({ success: false, message: "Không tìm thấy chuyến xe" });
      }

      const seat = busTrip.seatMap.find(s => s.seatNo === seatNo);
      if (!seat) {
        return res.status(404).json({ success: false, message: "Không tìm thấy ghế này" });
      }

      if (seat.status === 'BOOKED') {
        return res.status(400).json({ success: false, message: "Ghế này đã được bán" });
      }

      if (seat.status === 'LOCKED' && seat.lockedByUserId !== userId && seat.lockExpiresAt > new Date()) {
        return res.status(400).json({ success: false, message: "Ghế này đang được người khác giữ chỗ" });
      }

      seat.status = 'LOCKED';
      seat.lockedByUserId = userId;
      seat.lockExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // Tạm khóa 10 phút

      await busTrip.save();
      res.status(200).json({ success: true, message: `Khóa ghế ${seatNo} thành công (10 phút)`, data: seat });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = busController;
