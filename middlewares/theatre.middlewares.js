const { badRequestResponse } = require('../utils/responsebody');

/**
 * Middleware to validate the request for creating a new theatre.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function.
 * @returns {void}
 */
const validateTheatreCreateRequest = async (req, res, next) => {
  // validate the theatre name
  if (!req?.body?.name || req?.body?.name.length < 5) {
    badRequestResponse.err = "The name of the theatre is either empty or length of name is smaller.";
    return res.status(400).json(badRequestResponse);
  }

   // validate the theatre city
  if (!req?.body?.city) {
    badRequestResponse.err = "The city of the movie is not present in the request"
    return res.status(400).json(badRequestResponse);
  }

  // validate the movie pincode
  if (!req?.body?.pincode) {
    badRequestResponse.err = "The pincode of the movie is not present in the request"
    return res.status(400).json(badRequestResponse);
  }
  next();
}


/**
 * Middleware to validate the request for updating movies in a theatre.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns {void}
 */
const validateUpdateMovieRequest = async (req, res, next) => {

  // Check if the movieIds field is present and is an array
  if (!req?.body?.movieIds || !Array.isArray(req.body.movieIds)) {
    badRequestResponse.err = "The movieIds field is either missing or not an array.";
    return res.status(400).json(badRequestResponse);
  }

  // Check if the insert field is present and is a boolean
  if (typeof req.body.insert !== 'boolean') {
    badRequestResponse.err = "The insert field is either missing or not a boolean.";
    return res.status(400).json(badRequestResponse);
  }

  // Check if the movieIds array is empty
  if (req.body.movieIds.length <= 0) {
    badRequestResponse.err = "The movieIds array is empty.";
    return res.status(400).json(badRequestResponse);
  }

  next();
}

module.exports = {
  validateTheatreCreateRequest,
  validateUpdateMovieRequest
}