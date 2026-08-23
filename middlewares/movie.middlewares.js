const { badRequestResponse } = require('../utils/responsebody');

/**
 * Middleware to validate the request for creating a new movie.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function.
 * @returns {void}
 */
const validateMovieCreateRequest = async (req, res, next) => {
  // validate the movie name
  if (!req?.body?.name) {
    badRequestResponse.err = "The name of the movie is not present in the request";
    return res.status(400).json(badRequestResponse);
  }

   // validate the movie description
  if (!req?.body?.description) {
    badRequestResponse.err = "The description of the movie is not present in the request"
    return res.status(400).json(badRequestResponse);
  }

  // validate the movie cast
  if (!req?.body?.cast || !(req?.body?.cast instanceof Array) || req?.body?.cast?.length <= 0) {
    badRequestResponse.err = "The cast of the movie is not present in the request"
    return res.status(400).json(badRequestResponse);
  }

  // validate the movie trailerUrl
  if (!req?.body?.trailerUrl) {
    badRequestResponse.err = "The trailerUrl of the movie is not present in the request"
    return res.status(400).json(badRequestResponse);
  }

  // validate the movie trailerUrl
  if (!req?.body?.trailerUrl) {
    badRequestResponse.err = "The trailerUrl of the movie is not present in the request"
    return res.status(400).json(badRequestResponse);
  }

  // validate the movie releaseData
  if (!req?.body?.releaseDate) {
    badRequestResponse.err = "The releaseDate of the movie is not present in the request"
    return res.status(400).json(badRequestResponse);
  }

  // validate the movie director
  if (!req?.body?.director) {
    badRequestResponse.err = "The director of the movie is not present in the request"
    return res.status(400).json(badRequestResponse);
  }

  next();
}

module.exports = {
  validateMovieCreateRequest
}