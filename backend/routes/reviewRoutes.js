const express = require("express");

const router = express.Router();

const {
  canReview,
  addReview,
  getPackageReviews,
  getReviews,
  approveReview,
  deleteReview
} = require("../controllers/reviewController");

router.get(
  "/can-review/:userId/:packageId",
  canReview
);

router.post(
  "/add",
  addReview
);

router.get(
  "/package/:packageId",
  getPackageReviews
);

router.get(
  "/",
  getReviews
);

router.put(
  "/approve/:id",
  approveReview
);

router.delete(
  "/delete/:id",
  deleteReview
);

module.exports = router;