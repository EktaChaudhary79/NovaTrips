const express = require("express");

const router = express.Router();

const {
addBooking,
getBookings,
getUserBookings,
updateBooking,
deleteBooking
} = require("../controllers/bookingController");

router.post("/add", addBooking);

router.get("/", getBookings);

router.get("/user/:userId", getUserBookings);

router.put("/update/:id", updateBooking);

router.delete("/delete/:id", deleteBooking);

module.exports = router;
