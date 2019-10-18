const express = require("express");
const passportRouter = express.Router();
const Admin = require("../models/admin");
const Client = require("../models/client");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");



passportRouter.get("/login",  (req, res, next) => {
  res.render("login",{"message": req.flash("error")});
  });

passportRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/login",
  passReqToCallback: true
}));

passportRouter.get("/admin", ensureLogin.ensureLoggedIn(), (req, res) => {
  Admin.find()
  .then(clients => {
 
    res.render("admin", { user: req.user,clients})
})

  .catch(err => console.log(err))
  
   

});

 



module.exports = passportRouter;