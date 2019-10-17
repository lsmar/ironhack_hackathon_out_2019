const express = require("express");
const router = express.Router();
const ClientModel = require("../models/client");
//* Post to create new client
router.post("/new", (req, res, next) => {
  const { name, email, categories } = req.body;
  const client = new ClientModel({ name, email, categories });
  client
    .save()
    .then(client => res.json({ result: true }))
    .catch(err => {
      res.json({ result: false });
      next(err);
    });
});

module.exports = router;
