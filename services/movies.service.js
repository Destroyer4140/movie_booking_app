const Movie = require('../models/movie.model');


const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    if (error.name === 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return {
        err: err,
        code: 422
      }
    } else {
      throw new error;
    }
  }
}

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

const updateMovieById = async (id, data) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true // Enables schema validation
    });

    if (!movie) {
      return {
        err: "No Movie Found for the provided movieId.",
        code: 404,
      };
    }

    return movie;
  } catch (error) {
    if (error.name === 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { err, code: 422 };
    }
    throw error;
  }
};

module.exports = {
  createMovie,
  getMovieById,
  deleteMovieById,
  updateMovieById
}