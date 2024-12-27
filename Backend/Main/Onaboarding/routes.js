const {register,login,GoogleLogin}= require("./controller");
const passport= require("passport");
const express= require("express");
const router= express.Router();

router.post("/register",register);

router.post("/login",login);

router.get("/login/google",passport.authenticate("google",{scope:['profile','email']}));

router.get("/login/google/callback",GoogleLogin);

module.exports= router