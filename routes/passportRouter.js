const express = require("express");
const passportRouter = express.Router();
const Admin = require("../models/admin");
const Client = require("../models/client");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

passportRouter.get("/login", (req, res, next) => {
  res.render("login", { message: req.flash("error") });
});

passportRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
    passReqToCallback: true
  })
);

passportRouter.get("/admin", ensureLogin.ensureLoggedIn(), (req, res) => {
  Client.find()
    .then(clients => {
      const allClients = clients.map(el => {
        el.prefs = {
          vegetarian: el.categories.includes("vegetariano") ? true : false,
          vegan: el.categories.includes("vegan") ? true : false,
          low: el.categories.includes("low") ? true : false
        };
        return el;
      });
      const stats = allClients.reduce(
        (acc, el) => {
          if (el.categories.includes("vegetariano")) acc.prefs.vegetarian += 1;
          if (el.categories.includes("vegan")) acc.prefs.vegan += 1;
          if (el.categories.includes("low")) acc.prefs.low += 1;
          acc.adults += el.adults;
          acc.childrens += el.childrens;
          acc.total += 1;
          return acc;
        },
        { total: 0, prefs: { vegan: 0, vegetarian: 0, low: 0 }, adults: 0, childrens: 0 }
      );
      console.log(stats);
      stats.adults = Math.round((stats.adults / stats.total) * 10) / 10;
      stats.childrens = Math.round((stats.childrens / stats.total) * 10) / 10;

      res.render("admin", { user: req.user, clients: allClients, stats });
    })

    .catch(err => console.log(err));
});

module.exports = passportRouter;
