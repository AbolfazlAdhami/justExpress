const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Wellcome to Home Page");
});

router.get("/about", (req, res) => {
  return res.json("Wellcome to About Page");
});

module.exports = router;
