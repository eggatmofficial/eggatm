const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require("./payment.controller");
const webhookHandler = require("./payment.webhook");

const router = express.Router();

router.post("/initiate",authMiddleware,controller.initiatePayment);

router.post("/verify", authMiddleware, controller.verifyPayment);

router.post("/webhook",express.raw({ type: "application/json" }), webhookHandler );

module.exports = router;
