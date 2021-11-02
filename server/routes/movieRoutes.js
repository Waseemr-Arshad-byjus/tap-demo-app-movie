const express = require("express");
const {
  getAllMovies,
  getMovie,
  addMovie,
  updateMovie,
} = require("../controllers/movieController");

const router = express.Router();

router
  .get("/", getAllMovies)
  .get("/:movieId", getMovie)
  .post("/", addMovie)
  .patch("/:id", updateMovie);

module.exports = router;
