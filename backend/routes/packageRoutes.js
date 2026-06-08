const express = require("express");

const router = express.Router();

const {
  addPackage,
  getPackages,
  getPopularPackages,
  getPackageById,
  updatePackage,
  deletePackage
} = require("../controllers/packageController");

router.post("/add", addPackage);

router.get("/", getPackages);

router.get("/popular", getPopularPackages);

router.get("/:id", getPackageById);

router.put("/update/:id", updatePackage);

router.delete("/delete/:id", deletePackage);

module.exports = router;