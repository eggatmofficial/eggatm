const express = require("express");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const controller = require("./stock.controller");

const router = express.Router();

router.use(auth, role("admin"));

router.get("/", controller.getAllStock);
router.get("/low", controller.lowStock);

router.post("/:productId/variant", controller.addVariant);
router.put("/:productId/stock", controller.updateStock);
router.delete("/:productId/variant", controller.deleteVariant);

module.exports = router;
