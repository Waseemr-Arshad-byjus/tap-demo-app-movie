const { Op } = require("sequelize");

const { Movie } = require("../models");

const getAllMovies = async (req, res) => {
  const { searchText } = req.query;

  try {
    const conditions = searchText
      ? {
          where: {
            title: {
              [Op.iRegexp]: searchText,
            },
          },
        }
      : {};
    const movies = await Movie.findAll(conditions);
    return res.json(movies);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const getMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findOne({
      where: {
        id: Number(movieId),
      },
    });
    if (!movie) throw new Error("Movie Not Found");
    res.json({
      message: "Movie Found",
      movie,
    });
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
};

const addMovie = async (req, res) => {
  const { title, poster, rating } = req.body;

  try {
    const createdMovie = await Movie.create({
      title,
      rating,
      poster,
    });
    return res.json({
      message: "Movie Created",
      movie: createdMovie,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, rating, poster } = req.body;

  try {
    const updateMovie = await Movie.update(
      {
        title,
        rating,
        poster,
      },
      { where: { id } }
    );

    return res.json({
      message: "Movie updated succesfully",
      movie: updateMovie,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const deletemovie = await Movie.destroy({ where: { id } });

    return res.json({
      message: "Movie deleted ",
      movie: deletemovie,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
