const express = require("express");
const destinationsController = require("../controllers/destinations.controller");
const protect = require("../middlewares/protect.middleware");

const router = express.Router();

// Public routes (Xem danh sách & chi tiết nơi du lịch)
router.get("/", destinationsController.getAll);
router.get("/:slug", destinationsController.getBySlug);

// Protected routes (Admin tạo, sửa, xóa nơi du lịch)
router.post("/", protect, destinationsController.create);
router.put("/:slug", protect, destinationsController.update);
router.delete("/:slug", protect, destinationsController.delete);

module.exports = router;
