const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn, ifLoggedInEdit, ifLoggedInDelete, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })


// Index Route and Create Route
router.route("/")
    .get(WrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, WrapAsync(listingController.createListing));
    
// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


// Show, Update and Delete Route
router.route("/:id")
    .get(WrapAsync(listingController.showListing))
    .put(isOwner, isLoggedIn, upload.single('listing[image]'), validateListing, WrapAsync(listingController.updateListing))
    .delete(isOwner, ifLoggedInDelete, WrapAsync(listingController.destroyListing));

// Edit Route
router.get("/:id/edit", isOwner, ifLoggedInEdit, WrapAsync(listingController.renderEditForm));


module.exports = router;