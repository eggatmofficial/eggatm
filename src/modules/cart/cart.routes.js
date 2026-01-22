const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const controller = require("./cart.controller");
const { addToCartValidation } = require("./cart.validation");


const router = express.Router();

router.use(authMiddleware);


router.post("/add", addToCartValidation, controller.addToCart);

router.get("/", controller.getCart);

router.put("/update", controller.updateCartItem);

router.delete("/remove", controller.removeItem);

router.delete("/clear", controller.clearCart);




module.exports = router;
