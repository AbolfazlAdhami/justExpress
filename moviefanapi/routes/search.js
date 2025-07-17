const express = require("express");
const router = express.Router();
const movies = require("../data/movies");
const people = require("../data/people");

const { queryRequired } = require("../middleware/index");
router.use(queryRequired);

//  GET /search/movie
router.get("/movie", (req, res) => {
  const searchTerm = req.query.query.toLocaleLowerCase();
  const movieList = movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm) || movie.overview.toLowerCase().includes(searchTerm));
  return res.status(200).json({ data: movieList });
});

//  GET /search/person
router.get("/people", (req, res) => {
  const searchTerm = req.query.query.toLocaleLowerCase();
  const peopleList = people.filter((item) => item.name.toLowerCase().includes(searchTerm));
  return res.status(200).json({
    data: peopleList,
  });
});

module.exports = router;
