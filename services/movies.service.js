const Movie = require('../models/movie.model');

const getMovieById =  async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    return {
      err: "No Movie Found for the provided movieId.",
      code: 404,
    }
  }
  return movie;
}

const deleteMovieById = async (id) => {
  const movie = await Movie.deleteOne(id);
  if (movie.deletedCount === 0) {
    return {
      err: "No Movie Found for the provided movieId.",
      code: 404,
    }
  }
  return movie;
}

module.exports = {
  getMovieById,
  deleteMovieById
}