const express = require("express");
const router = express.Router();
const movieDetails = require("../data/movieDetails");
const movie = require("../data/movies");
const perPage = 20;

const { requireJSON } = require("../middleware/index");

/* GET movie page. */

// GET /movie
router.get("", (req, res) => {
  res.json(movie);
});

//   GET /movie/top_rated
router.get("/top_rated", (req, res) => {
  const { query } = req;

  const page = query.page ? parseInt(query.page) : 1;
  const results = movieDetails.sort((a, b) => b.vote_average - a.vote_average);
  const indexStart = (page - 1) * perPage;

  return res.json({
    metadata: {
      currentPage: page,
      nextPage: page == 3 ? null : page + 1,
      pervPage: page == 1 ? null : page - 1,
      perPage,
      count: results.lengths,
    },
    data: {
      movies: results.slice(indexStart, indexStart + perPage - 1),
    },
  });
});

// GET /movie/movieId
// This one needs to come last of all /ONETHING
router.get("/:movie_id", (req, res) => {
  const { movie_id } = req.params;
  const result = movieDetails.find((movie) => movie.id === parseInt(movie_id));

  if (!result) return res.status(404).json({ msg: "Movie ID is not found" });

  return res.json({ data: { ...result } });
});

//   POST /movie/{movie_id}/rating
router.post("/:movieId/rating", requireJSON, (req, res) => {
  const { body, params } = req;
  const { movieId } = params;
  const userRating = parseInt(body.value);

  if (isNaN(userRating)) return res.status(402).json({ msg: "Value Not Found" });
  if (userRating < 0.5 || userRating > 10) return res.status(402).json({ msg: "Rating must be between .5 and 10" });

  let movie = movieDetails.find((movie) => movie.id == movieId);
  if (!movie) return res.status(404).json({ msg: "Movie NOT Found Id is Inavalid" });
  const { vote_average, vote_count } = movie;

  if (vote_average && vote_count) {
    return res
      .status(200)
      .json({ msg: "Thank you for submitting your rating.", movie: { ...movie, vote_count: vote_count + 1, vote_average: Math.floor((vote_average + userRating / vote_count) * 10) / 10 } });
  }
  return res.status(200).json({ msg: "Thank you for submitting your rating." });
});

// DELETE /movie/{movie_id}
router.delete("/:movieId", (req, res) => {
  const movieId = parseInt(req.params.movieId);

  const movie = movieDetails.find((movie) => movie.id === movieId);
  if (!movie) return res.status(404).json({ msg: "Movie NOT Found, Id is Inavalid" });

  const movieList = movieDetails.filter((item) => item.id !== movieId);
  return res.status(200).json({ msg: "Thank you for submitting your rating.", movie: movieList });
});

// TODO: // DELETE /movie/{movie_id}/rating
router.delete("/:movieId/rating", requireJSON, (req, res) => {
  const { body, params } = req;
  const { movieId } = params;
  const userRating = parseInt(body.value);

  if (isNaN(userRating)) return res.status(402).json({ msg: "Value Not Found" });
  if (userRating < 0.5 || userRating > 10) return res.status(402).json({ msg: "Rating must be between .5 and 10" });

  let movie = movieDetails.find((movie) => movie.id == movieId);
  if (!movie) return res.status(404).json({ msg: "Movie NOT Found Id is Inavalid" });
  let { vote_average, vote_count } = movie;

  if (vote_average && vote_count) {
    return res
      .status(200)
      .json({ msg: "Thank you for submitting your rating.", movie: { ...movie, vote_count: --vote_count, vote_average: Math.floor((vote_average - userRating / vote_count) * 10) / 10 } });
  }
  return res.status(200).json({ msg: "Thank you for submitting your rating." });
});

module.exports = router;
