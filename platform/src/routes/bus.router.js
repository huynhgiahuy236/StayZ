const express = require("express");
const busController = require("../controllers/bus.controller");

const busRouter = express.Router();

busRouter.get("/search", busController.searchBusTrips);
busRouter.get("/:tripId/seatmap", busController.getSeatMap);
busRouter.post("/:tripId/lock-seat", busController.lockSeat);

module.exports = busRouter;
