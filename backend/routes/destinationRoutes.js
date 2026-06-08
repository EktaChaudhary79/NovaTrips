const express = require("express");

const router = express.Router();

const {
  addDestination,
  getDestinations,
  updateDestination,
  deleteDestination
} = require("../controllers/destinationController");

router.post("/add", addDestination);

router.get("/", getDestinations);

router.put("/update/:id", updateDestination);

router.delete("/delete/:id", deleteDestination);

module.exports = router;