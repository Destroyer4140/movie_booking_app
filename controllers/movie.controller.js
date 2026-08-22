const Movie = require('../models/movie.model');
const movieService = require('../services/movies.service');
const {successResponseBody, errorResponseBody} = require('../utils/responsebody')

/**
 * Controller function to create a new movie
 * @param {*} req {name, description, ....}
 * @param {*} res {name, description, ....}
 * @returns movie created
 */
const createMovie = async (req, res) => {
  try {
    const response = await movieService.createMovie(req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Validation failed for few parameters of the request body."
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response
    successResponseBody.message = "Successfully created a new movie.";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log(err);
    errorResponseBody.err = err;
    return res.status(500).json(errorResponseBody);
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteMovie = async (req, res) => {
  try {
    const response = await movieService.deleteMovieById({
      _id: req.params.id
    });
  
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully deleted the movie";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log(err);
    errorResponseBody.err = err;
    errorResponseBody.message = "Something went wrong, Failed to  delete the movie";
    return res.status(500).json(errorResponseBody);
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getMovie =  async (req, res) => {

  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (movie.err) {
      errorResponseBody.err = movie.err;
      return res.status(movie.code).json(errorResponseBody);
    }
    successResponseBody.data = movie
    return res.status(200).json(successResponseBody);

  } catch (err) {
    console.log(err);
    errorResponseBody.err = err;
    return res.status(200).json(errorResponseBody);
  }
}

const updateMovie = async (req, res) => {
  try {
    const response = await movieService.updateMovieById(req?.params?.id, req?.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Updates trying to apply doesn't validate the schema."
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated the movies.";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log(err);
    errorResponseBody.err = err;
    errorResponseBody.message = "Failed to updated the movies.";
    return res.status(500).json(errorResponseBody);
  }
}

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie
}