const express = require("express");
const router = express.Router();

const {
  createFranchise,
  updateFranchise,
  getAllFranchises,
  getActiveFranchises,
  toggleFranchiseStatus,
  deleteFranchise
} = require("./franchise.controller");


// 🧑‍💼 Admin
router.post("/create", createFranchise);
router.put("/:id", updateFranchise);
router.patch("/:id/toggle", toggleFranchiseStatus);
router.get("/admin", getAllFranchises);
router.delete("/:id", deleteFranchise);

// 🌍 User
router.get("/", getActiveFranchises);

module.exports = router;
