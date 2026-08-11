const express = require("express");
const rideController = require("../controllers/ride.controller");

const rideRouter = express.Router();

rideRouter.get("/vehicles", rideController.getVehicles);
rideRouter.post("/rent", rideController.rentVehicle);

module.exports = rideRouter;
