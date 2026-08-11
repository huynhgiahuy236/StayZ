const express = require("express");
const splitBillController = require("../controllers/splitbill.controller");

const splitBillRouter = express.Router();

splitBillRouter.post("/expense", splitBillController.addExpense);
splitBillRouter.get("/trip/:tripId", splitBillController.getTripBalances);

module.exports = splitBillRouter;
