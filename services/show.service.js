const Show = require('../models/show.model');
const { STATUS } = require('../utils/constants');
const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');

/**
 * 
 * @param data  :- Containing details of the show to be created.
 * @returns -> Object with the new show details.
 */
const createShow = async (data) => {
  try {
    const theatre = await Theatre.findById(data.theatreId);
    if (!theatre) {
      throw {
        err: "No theatre found",
        code: STATUS.NOT_FOUND
      }
    }
  
    if (!theatre.movies.includes(data.movieId)) {
      throw {
        err: "No movie found",
        code: STATUS.NOT_FOUND
      }
    }

    const response = await Show.create(data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach(key => err[key] = error.errors[key].message);
      throw {
        err: err,
        code: STATUS.UNPROCESSABLE_ENTITY
      }
    }
    throw error;
  }
}

module.exports = {
  createShow
}