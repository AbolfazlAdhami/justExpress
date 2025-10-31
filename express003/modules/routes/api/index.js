const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.json("Wellcome to Api");
});

module.exports = router;
