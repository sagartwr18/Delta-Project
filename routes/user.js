const express = require("express");
const router = express.Router();

const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

// SignUp Route GET and POST
router.route("/Signup")
    .get(userController.renderSignupForm)
    .post(WrapAsync(userController.userSignup));


// Login Route GET and POST
router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), userController.loginSuccess);

router.get("/logout", userController.logoutSuccess);


module.exports = router;
