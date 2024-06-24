const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.userSignup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err){
                next(err);
                }else{
                req.flash("success", "Welcome to WanderLust");
                res.redirect("/listings");
            }
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/Signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.loginSuccess = async(req, res)=>{
    req.flash("success", "You have logged in successfully!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logoutSuccess = (req, res, next)=>{
    req.logout((err)=>{
        if (err) {
            return next(err);
        }else{
            req.flash("error", "You have logged out successfully!");
            res.redirect("/listings");
        }
    })
}