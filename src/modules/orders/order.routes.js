// const express = require("express");
// const authMiddleware = require("../middlewares/auth.middleware");
// const controller = require("./order.controller");
// const { cartCheckoutValidation,buyNowValidation } = require("./order.validation");
// const roleMiddleware = require("../middlewares/role.middleware");


// const router = express.Router();

// router.post("/cart/checkout",authMiddleware,cartCheckoutValidation,controller.cartCheckout);

// router.post("/buy-now",authMiddleware,buyNowValidation,controller.buyNow);

// router.get("/my-orders", authMiddleware, controller.getMyOrders);

// router.get("/:id", authMiddleware, controller.getMyOrderById);

// router.get("/admin/all", authMiddleware, roleMiddleware("admin"), controller.getAllOrders);

// router.get("/admin/:id", authMiddleware, roleMiddleware("admin"), controller.getOrderById);

// router.put("/admin/:id/status", authMiddleware, roleMiddleware("admin"), controller.updateOrderStatus);




// module.exports = router;













const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require("./order.controller");
const { cartCheckoutValidation, buyNowValidation } = require("./order.validation");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

/* ================= USER ================= */

router.post(
  "/cart/checkout",
  authMiddleware,
  cartCheckoutValidation,
  controller.cartCheckout
);

router.post(
  "/buy-now",
  authMiddleware,
  buyNowValidation,
  controller.buyNow
);

router.get(
  "/my-orders",
  authMiddleware,
  controller.getMyOrders
);

/* ================= ADMIN – TRANSPORT ================= */

router.get(
  "/transport",
  authMiddleware,
  roleMiddleware("admin"),
  controller.getTransportOrders
);

router.put(
  "/transport/:id/assign-bus",
  authMiddleware,
  roleMiddleware("admin"),
  controller.assignBus
);

router.put(
  "/transport/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  controller.updateTransportStatus
);

/* ================= ADMIN – COURIER ================= */

router.get(
  "/courier",
  authMiddleware,
  roleMiddleware("admin"),
  controller.getCourierOrders
);

router.put(
  "/admin/:id/assign-courier",
  authMiddleware,
  roleMiddleware("admin"),
  controller.assignCourier
);

router.put(
  "/courier/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  controller.updateCourierStatus
);

/* ================= ADMIN – GENERAL ================= */

router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware("admin"),
  controller.getAllOrders
);

router.get(
  "/admin/:id",
  authMiddleware,
  roleMiddleware("admin"),
  controller.getOrderById
);

router.put(
  "/admin/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  controller.updateOrderStatus
);

/* ================= COMMON (KEEP LAST) ================= */

router.get(
  "/:id",
  authMiddleware,
  controller.getMyOrderById
);

module.exports = router;
