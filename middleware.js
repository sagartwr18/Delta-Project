const Listing = require("./models/listings.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create new listings");
        return res.redirect("/login");
    }else{
        next();
    }
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.ifLoggedInEdit = (req, res, next)=>{
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to edit Listing");
        return res.redirect("/login");
    }else{
        next();
    }
}
module.exports.ifLoggedInDelete = (req, res, next)=>{
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to Delete Listing");
        return res.redirect("/login");
    }else{
        next();
    }
}
module.exports.ifLoggedInReviewAdd = (req, res, next)=>{
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to add new Reviews");
        return res.redirect("/login");
    }else{
        next();
    }
}
module.exports.ifLoggedInReviewDelete = (req, res, next)=>{
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to delete Reviews");
        return res.redirect("/login");
    }else{
        next();
    }
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "Sorry! you are not the owner of this listing")
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "Sorry! you are not the author of this review")
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports.validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}