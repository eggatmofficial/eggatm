const express = require("express");
const controller = require("./shipping.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

router.post("/", authMiddleware,roleMiddleware("admin"), controller.createShippingPrice);
router.get("/", authMiddleware,roleMiddleware("admin"), controller.getShippingPrices);
router.put("/:id", authMiddleware,roleMiddleware("admin"), controller.updateShippingPrice);
router.delete("/:id", authMiddleware,roleMiddleware("admin"), controller.deleteShippingPrice);
// USER SIDE (PUBLIC)
router.post("/estimate", controller.estimateShipping);


module.exports = router;
