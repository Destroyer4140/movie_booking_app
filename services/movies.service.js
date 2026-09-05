const Movie = require('../models/movie.model');
const { STATUS } = require('../utils/constants');


/** 
 * @param data -> object containing details of movie to be created.
 * @returns -> returns the new movie object created.
 */
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
      throw {
        err: err,
        code: STATUS.UNPROCESSABLE_ENTITY
      }
    } else {
      throw new error;
    }
  }
}

/**
 * 
 * @param id -> takes id as an request.
 * @returns -> returns the movies found with provided movieId.
 */
const getMovieById =  async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    throw {
      err: "No Movie Found for the provided movieId.",
      code: STATUS.NOT_FOUND,
    }
  }
  return movie;
}

/**
 * 
 * @param id -> Used to identify which movie needs to be deleted.
 * @returns -> object containing deleted movie.
 */
const deleteMovieById = async (id) => {
  const movie = await Movie.deleteOne(id);
  if (movie.deletedCount === 0) {
    throw {
      err: "No Movie Found for the provided movieId.",
      code: STATUS.NOT_FOUND,
    }
  }
  return movie;
}

/**
 * 
 * @param id  -> which used to identify movie needs to be updated.
 * @param data -> object that contains the actual data which needs to be updated in db.
 * @returns -> returns the new updated movie details.
 */
const updateMovieById = async (id, data) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true // Enables schema validation
    });

    if (!movie) {
      throw {
        err: "No Movie Found for the provided movieId.",
        code: STATUS.NOT_FOUND,
      };
    }

    return movie;
  } catch (error) {
    if (error.name === 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err, code: STATUS.UNPROCESSABLE_ENTITY };
    }
    throw error;
  }
};

/**
 * 
 * @param filter -> helps to filtering out data based on the filter conditions.
 * @returns -> returns the list movie object
 */
const fetchMovies = async (filter) => {
  let query = {};
  if (filter.name) {
    query.name = filter.name;
  }
  let movies = await Movie.find(query);
  if (!movies) {
    throw {
      err: "Not able to find the queries movies",
      code: STATUS.NOT_FOUND
    }
  }
  return movies
}

module.exports = {
  createMovie,
  getMovieById,
  deleteMovieById,
  updateMovieById,
  fetchMovies
}