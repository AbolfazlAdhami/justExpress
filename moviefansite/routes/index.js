const express = require("express");
const axios_instance = require("../utils/axios");
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const { query } = req;
  if (query.page && query.page > 25) return res.redirect("/");
  try {
    const { data } = await axios_instance.get(query.page ? `/movies?page=${query.page}` : "/movies");
    return res.render("index", { data: data.data, metadata: data.metadata });
  } catch (error) {
    console.log(error);
  }
});

router.get("/movie/:movie_id", async (req, res, next) => {
  const { movie_id } = req.params;
  if (isNaN(movie_id))
    return res.status(403).render("error", {
      message: "Id is Invalid",
      error: {
        stack: "Not Valid ID",
        status: 404,
      },
    });
  if (parseInt(movie_id) > 250) return res.redirect("/");
  try {
    const { data } = await axios_instance.get(`/movies/${movie_id}`);
    return res.render("single-movie", { ...data });
  } catch (error) {
    console.log(error);
  }
});

router.post("/search", async (req, res) => {
  const { body } = req;
  const searchParams = encodeURI(body.movieSearch);
  try {
    const { data } = await axios_instance.get(`/movies?q=${searchParams}`);
    return res.render("index", { data: data.data, metadata: data.metadata });
  } catch (error) {
    console.log(error);
    return res.json({});
  }
});

module.exports = router;
