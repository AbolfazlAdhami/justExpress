const express = require("express");
const axios_instance = require("../utils/axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data } = await axios_instance.get("/genres");
    console.log(data);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:genre_id", async (req, res) => {
  const { genre_id } = req.params;

  try {
    const { data } = await axios_instance.get(`/genres/${parseInt(genre_id)}`);
    console.log(data, genre_id);
    return res.json(data);
  } catch (error) {}
});

module.exports = router;

// movies?page={page}
