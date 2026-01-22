const express = require("express");
const controller = require("./user.controller");
const { createUserValidation } = require("./user.validation");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();


router.post("/create",authMiddleware,roleMiddleware("admin"),controller.createUser);

router.get("/list",authMiddleware,roleMiddleware("admin"),controller.getUsers);

router.put("/update/:id",authMiddleware,roleMiddleware("admin","user"),controller.updateUsers);

router.delete("/delete/:id",authMiddleware,roleMiddleware("admin"),controller.deleteUser);

router.patch("/:id/status",authMiddleware,roleMiddleware("admin"),controller.toggleUserStatus);

router.get("/me",authMiddleware,controller.getMyProfile);

module.exports = router;
