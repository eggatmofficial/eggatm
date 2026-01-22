const express = require("express");
const controller = require("./auth.controller");
const { loginValidation } = require("./auth.validation");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

router.post("/login", loginValidation, controller.login);

router.get("/dashboard-stats",authMiddleware,roleMiddleware("admin"),controller.getDashboardStats);


module.exports = router;
