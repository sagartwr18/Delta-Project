const express = require("express");
const router = express.Router({mergeParams: true});
const WrapAsync = require("../utils/WrapAsync.js");
const { ifLoggedInReviewAdd, ifLoggedInReviewDelete, validateReview, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");


// Review Route (Post route)
router.post("/", ifLoggedInReviewAdd, validateReview, WrapAsync(reviewController.addReview));

// Delete Review Route
router.delete("/:reviewId", ifLoggedInReviewDelete, isReviewAuthor, WrapAsync(reviewController.destroyReview));

module.exports = router;