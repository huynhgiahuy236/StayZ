const express = require("express");
const tripController = require("../controllers/trip.controller");

const tripRouter = express.Router();

tripRouter.post("/create", tripController.createTrip);
tripRouter.get("/user/:userId", tripController.getUserTrips);
tripRouter.post("/:tripId/add-item", tripController.addItemToTrip);

module.exports = tripRouter;
