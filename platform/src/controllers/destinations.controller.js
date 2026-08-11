const destinationsService = require("../services/destinations.service");
const { responseSuccess } = require("../helpers/response.helper");

const destinationsController = {
  getAll: async (req, res, next) => {
    try {
      const { is_domestic, lang } = req.query;
      const data = await destinationsService.getAll({ is_domestic, lang });
      const response = responseSuccess(
        data,
        "Lấy danh sách Nơi Du Lịch thành công",
        200,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  getBySlug: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { lang } = req.query;
      const data = await destinationsService.getBySlug(slug, lang);
      const response = responseSuccess(
        data,
        "Lấy thông tin Nơi Du Lịch thành công",
        200,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const data = await destinationsService.create(req.body);
      const response = responseSuccess(
        data,
        "Tạo Nơi Du Lịch mới thành công",
        201,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const data = await destinationsService.update(slug, req.body);
      const response = responseSuccess(
        data,
        "Cập nhật Nơi Du Lịch thành công",
        200,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const data = await destinationsService.delete(slug);
      const response = responseSuccess(
        data,
        "Xóa Nơi Du Lịch thành công",
        200,
      );
      res.status(response.code).json(response);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = destinationsController;
