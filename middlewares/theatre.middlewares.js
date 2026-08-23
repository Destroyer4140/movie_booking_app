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

module.exports = {
  validateTheatreCreateRequest
}