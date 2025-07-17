const express = require("express");
const router = express.Router();

const movies = require("../data/movies");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
const perPage = 10;

router.get("/most_popular", (req, res) => {
  const { query } = req;
  // get the page variable from the query string
  let page = query.page ? parseInt(query.page) : 1;

  let result = movies.filter((movie) => movie.most_popular);
  const indexStart = (page - 1) * perPage;
  return res.json({
    metadata: {
      currentPage: page,
      nextPage: page == 3 ? null : page + 1,
      pervPage: page == 1 ? null : page - 1,
      perPage,
      count: result.lengths,
    },
    data: {
      movies: result.slice(indexStart, indexStart + perPage - 1),
    },
  });
});

module.exports = router;
