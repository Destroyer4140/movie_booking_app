const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

/**
 * Controller to create a new theatre.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @returns {Promise<void>}
 */
const createTheatre = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Failed on schema validation.";
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Successfully created the theatre";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = err;
    errorResponseBody.message = "failed to create the theatre";
    return res.status(500).json(errorResponseBody);
  }
}

/**
 * Controller to delete a theatre by ID.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @returns {Promise<void>}
 */
const destroy = async (req, res) => {
  try {
    const response = await theatreService.deleteTheatre({ _id: req?.params?.id });
    if (response.err) {
          errorResponseBody.err = response.err;
          errorResponseBody.message = "No theatre found."
          return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the theatre";
        return res.status(200).json(successResponseBody);
  } catch (err) {
    errorResponseBody.err = err;
    errorResponseBody.message = "failed to delete the theatre";
    return res.status(500).json(errorResponseBody);
  }
}

/**
 * Controller to get a theatre by ID.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @returns {Promise<void>}
 */
const getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req?.params?.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "No Theatre found with provided TheatreId.";
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched the theatre.";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    errorResponseBody.err = err;
    errorResponseBody.message = "Failed to get the theatre.";
    return res.status(500).json(errorResponseBody);
  }
}

/**
 * Controller to update a theatre by ID.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @returns {Promise<void>}
 */
const updateTheatre = async (req, res) => {
  try {
    const response = await theatreService.updateTheatre(req.params.id, req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "No Theatre found with provided TheatreId. Hence updation failed.";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated the theatre.";
    return res.status(200).json(successResponseBody);
  } catch (err) {
      errorResponseBody.err = err;
      errorResponseBody.message = "Failed to update the theatre.";
      return res.status(500).json(errorResponseBody);
  }
}

/**
 * Controller to get all theatres.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {Promise<void>}
 */
const getAllTheatres = async (req, res) => {
  try {
    const response = await theatreService.getAllTheTheatres(req.query);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched the theatre list.";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    errorResponseBody.err = err;
    errorResponseBody.message = "Failed to get all the theatre.";
    return res.status(500).json(errorResponseBody);
  }
}

/**
 * Controller to update movies in a theatre.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {Promise<void>}
 */
const updateMovieInTheatre = async (req, res) => {
  try {
    const response = await theatreService.updateMovieInTheatre(req.params.id, req.body.movieIds, req.body.insert);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "No Theatre found with provided TheatreId. Hence updation failed.";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated the movie in the theatre.";
    return res.status(200).json(successResponseBody);
  } catch (err) {
      errorResponseBody.err = err;
      errorResponseBody.message = "Failed to update the movie in the theatre.";
      return res.status(500).json(errorResponseBody);
  }
}

const getMoviesInATheatre = async (req, res) => {
  try {
    console.log("Fetching movies in theatre with ID:", req.params.id);
    const response = await theatreService.getMoviesInATheatre(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "No Theatre found with provided TheatreId.";
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched movies in the theatre.";
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.error("Error fetching movies in theatre:", err);
    errorResponseBody.err = err;
    errorResponseBody.message = "Failed to get movies in the theatre.";
    return res.status(500).json(errorResponseBody);
  }
}

module.exports = {
  createTheatre,
  destroy,
  getTheatre,
  getMoviesInATheatre,
  updateTheatre,
  getAllTheatres,
  updateMovieInTheatre
}