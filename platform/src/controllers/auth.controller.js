const authService = require("../services/auth.service");
const { CLIENT_URL, WEB_CLIENT_URL } = require("../constants/app.constant");
const prisma = require("../config/prisma.config");

const buildRefreshCookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
});

const authController = {
  googleCallback: async (req, res, next) => {
    try {
      const data = await authService.loginGoogle(req.user);
      const isWebLogin = req.query.state === "web";
      const clientUrl = isWebLogin ? WEB_CLIENT_URL : CLIENT_URL;
      if (!clientUrl) {
        throw new Error(
          isWebLogin
            ? "WEB_CLIENT_URL chua duoc cau hinh"
            : "CLIENT_URL chua duoc cau hinh",
        );
      }

      res.cookie("refreshToken", data.refreshToken, buildRefreshCookieOptions());

      const redirectUrl =
        `${clientUrl.replace(/\/$/, "")}/login-success` +
        `?accessToken=${encodeURIComponent(data.accessToken)}` +
        `&refreshToken=${encodeURIComponent(data.refreshToken)}` +
        `&userId=${encodeURIComponent(data.user._id ? data.user._id.toString() : data.user.id)}` +
        `&email=${encodeURIComponent(data.user.email)}` +
        `&name=${encodeURIComponent(data.user.full_name)}` +
        `&role=${encodeURIComponent(data.user.role || "user")}` +
        `&avatar=${encodeURIComponent(data.user.avatar_url || "")}`;

      res.redirect(redirectUrl);
    } catch (err) {
      next(err);
    }
  },

  updateKYC: async (req, res, next) => {
    try {
      const userId = req.user?.id || req.body.userId;
      const { identityCardNumber, passportNumber, driverLicenseNumber, driverLicenseImageUrl } = req.body;

      if (!userId) {
        return res.status(400).json({ success: false, message: "UserId là bắt buộc" });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          identity_card_number: identityCardNumber || undefined,
          passport_number: passportNumber || undefined,
          driver_license_number: driverLicenseNumber || undefined,
          driver_license_image_url: driverLicenseImageUrl || undefined,
          kyc_status: "PENDING"
        }
      });

      res.status(200).json({
        success: true,
        message: "Cập nhật thông tin KYC thành công. Hồ sơ đang được xác minh.",
        data: updatedUser
      });
    } catch (err) {
      next(err);
    }
  },

  getKYCStatus: async (req, res, next) => {
    try {
      const userId = req.params.userId || req.user?.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          full_name: true,
          email: true,
          kyc_status: true,
          identity_card_number: true,
          passport_number: true,
          driver_license_number: true,
          driver_license_image_url: true
        }
      });

      if (!user) {
        return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
      }

      res.status(200).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = authController;
