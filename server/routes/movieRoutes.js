const express = require("express");
const {
  getAllMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const router = express.Router();

router
  .get("/", getAllMovies)
  .get("/:movieId", getMovie)
  .post("/", addMovie)
  .post("/delete/:id", deleteMovie)
  .patch("/:id", updateMovie);

module.exports = router;
