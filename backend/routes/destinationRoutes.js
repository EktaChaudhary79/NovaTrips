const express = require("express");

const router = express.Router();

const {
  addDestination,
  getDestinations,
  updateDestination,
  deleteDestination,
  getDestinationById,
  getPackagesByDestination,
  
} = require("../controllers/destinationController");

router.post("/add", addDestination);

router.get("/", getDestinations);

router.put("/update/:id", updateDestination);

router.delete("/delete/:id", deleteDestination);
router.get("/:id", getDestinationById);
router.get("/:id/packages", getPackagesByDestination);

module.exports = router;