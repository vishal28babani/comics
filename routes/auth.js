const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require("../models/user")

router.get("/signup", (req,res)=>{
    res.render("signup")
})

router.post("/signup", async (req,res)=>{
    try {
        const newUser = await User.register(new User({
            email: req.body.email,
            username: req.body.username
        }), req.body.password)

        req.flash("success", `Signed up as ${req.body.username}`)

        passport.authenticate('local')(req,res,()=>{
            res.redirect("/comics")
        })

    } catch (error) {
        // console.log(error)
        req.flash("error", error.message)
        res.redirect("back")
    }
})

router.get("/login", (req,res)=>{
    res.render("login")
})

router.post("/login",passport.authenticate('local',{
    successRedirect: "/comics",
    successFlash: "Logged in successfully",
    failureRedirect: "/login",
    failureFlash: true
})
)

router.get("/logout", (req,res)=>{
    req.logout()
    req.flash("success", `Logged you out!`)
    res.redirect("/comics")
})

module.exports = router