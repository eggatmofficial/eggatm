const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");
const controller = require("./product.controller");

const router = express.Router();

router.post("/create",authMiddleware,roleMiddleware("admin"),upload.fields([
    { name: "images", maxCount: 4 },
    { name: "mainImage", maxCount: 1 } ]),
    controller.createProduct);

router.get("/getAllProducts",authMiddleware,roleMiddleware("user","admin"),controller.getAllProducts);

router.get("/getProducts/:id",authMiddleware,roleMiddleware("user"),controller.getProduct);

router.put("/Products/:id",authMiddleware,roleMiddleware("admin"),
upload.fields([
    { name: 'images', maxCount: 4 },
    { name: 'mainImage', maxCount: 1 }
  ]),controller.updateProduct);


router.delete("/Products/:id",authMiddleware,roleMiddleware("admin"),controller.deleteProduct);

router.patch("/Products/:id/status",authMiddleware,roleMiddleware("admin"),controller.toggleProductStatus);

router.patch("/Products/:id/discount",authMiddleware,roleMiddleware("admin"),controller.addOrUpdateDiscount);

router.get("/products", authMiddleware, controller.getProducts);



module.exports = router;
