const express = require("express");
const router = express.Router();
const ClientModel = require("../models/client");
//* Post to create new client
router.post("/new", (req, res, next) => {
  const { name, email, categories, childrens, adults } = req.body;
  const client = new ClientModel({ name, email, categories, childrens, adults });
  client
    .save()
    .then(client => res.json({ result: true }))
    .catch(err => {
      if (err.code === 11000) {
        res.json({ result: false, erro: "duplicated email", code: 11000 });
      }
      next(err);
    });
});

module.exports = router;
