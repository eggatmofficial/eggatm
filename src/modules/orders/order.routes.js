const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require("./order.controller");
const { cartCheckoutValidation,buyNowValidation } = require("./order.validation");
const roleMiddleware = require("../middlewares/role.middleware");


const router = express.Router();

router.post("/cart/checkout",authMiddleware,cartCheckoutValidation,controller.cartCheckout);

router.post("/buy-now",authMiddleware,buyNowValidation,controller.buyNow);

router.get("/my-orders", authMiddleware, controller.getMyOrders);

router.get("/:id", authMiddleware, controller.getMyOrderById);

router.get("/admin/all", authMiddleware, roleMiddleware("admin"), controller.getAllOrders);

router.get("/admin/:id", authMiddleware, roleMiddleware("admin"), controller.getOrderById);

router.put("/admin/:id/status", authMiddleware, roleMiddleware("admin"), controller.updateOrderStatus);




module.exports = router;
