const express = require("express");
const { createOrder, verifyOrder } = require("../controllers/paymentControllers");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();

router.post("/createOrder", requireAuth, createOrder);

router.post("/verifyOrder", requireAuth, verifyOrder);

module.exports = router;