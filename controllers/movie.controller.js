const Movie = require('../models/movie.model');
const movieService = require('../services/movies.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody')
const { STATUS } = require('../utils/constants');

/**
 * Controller function to create a new movie
 * @param {*} req {name, description, ....}
 * @param {*} res {name, description, ....}
 * @returns movie created
 */
const createMovie = async (req, res) => {
  try {
    const response = await movieService.createMovie(req.body);
    successResponseBody.data = response
    successResponseBody.message = "Successfully created a new movie.";
    return res.status(STATUS.CREATED).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "Validation failed, please check the request body.";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.err = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

/**
 * Controller to delete a movie by ID.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {Promise<void>}
 */
const deleteMovie = async (req, res) => {
  try {
    const response = await movieService.deleteMovieById({
      _id: req.params.id
    });
  
    successResponseBody.data = response;
    successResponseBody.message = "Successfully deleted the movie";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "No Movie found with provided MovieId.";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.err = err;
    errorResponseBody.message = "Something went wrong, Failed to  delete the movie";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

/**
 * Controller to get a movie by ID.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {Promise<void>}
 */
const getMovie =  async (req, res) => {

  try {
    const movie = await movieService.getMovieById(req.params.id);
    successResponseBody.data = movie
    return res.status(STATUS.OK).json(successResponseBody);

  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "No Movie found with provided MovieId.";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.err = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

/**
 * Controller to update a movie by ID.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {Promise<void>}
 */
const updateMovie = async (req, res) => {
  try {
    const response = await movieService.updateMovieById(req?.params?.id, req?.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated the movies.";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      errorResponseBody.message = "Updates trying to apply doesn't validate the schema.";
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.err = err;
    errorResponseBody.message = "Failed to updated the movies.";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

/**
 * Controller to get all movies.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {Promise<void>}
 */
const getMovies = async (req, res) => {
  try {
    const response = await movieService.fetchMovies(req.query);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched the list of movies.";
    return res.status(STATUS.OK).json(successResponseBody);

  } catch (err) {
    if (err.err) {
      errorResponseBody.err = err.err;
      return res.status(err.code).json(errorResponseBody);
    }
    errorResponseBody.err = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

/**
 * Exporting the controller functions for movie operations.
 */
module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
  getMovies
}