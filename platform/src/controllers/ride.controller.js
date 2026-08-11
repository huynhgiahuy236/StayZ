const Ride = require("../models/rides.model");
const prisma = require("../config/prisma.config");

const rideController = {
  getVehicles: async (req, res, next) => {
    try {
      const { city, vehicleType } = req.query;
      const query = { isDeleted: false, status: 'AVAILABLE' };
      if (city) query.city = city;
      if (vehicleType) query.vehicleType = vehicleType;

      const vehicles = await Ride.find(query);
      res.status(200).json({ success: true, data: vehicles });
    } catch (err) {
      next(err);
    }
  },

  rentVehicle: async (req, res, next) => {
    try {
      const { vehicleId, userId, startDate, endDate } = req.body;

      // Kiểm tra KYC bằng lái xe GPLX
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { kyc_status: true, driver_license_number: true }
      });

      if (!user || !user.driver_license_number) {
        return res.status(403).json({
          success: false,
          code: 'KYC_REQUIRED',
          message: 'Bạn chưa cập nhật bằng lái xe (GPLX). Vui lòng xác thực KYC trên HuKi ID trước khi thuê phương tiện!'
        });
      }

      const vehicle = await Ride.findById(vehicleId);
      if (!vehicle || vehicle.status !== 'AVAILABLE') {
        return res.status(400).json({ success: false, message: 'Phương tiện này hiện không sẵn sàng để thuê' });
      }

      vehicle.status = 'RENTED';
      await vehicle.save();

      res.status(200).json({
        success: true,
        message: 'Đặt thuê phương tiện thành công! Đã xác thực GPLX trên HuKi ID.',
        data: vehicle
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = rideController;
