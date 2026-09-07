const { STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;

const validateCreateShowRequest = async (req, res, next) => {
  // validate theate Id
  if (!req.body.theatreId) {
    errorResponseBody.err = "No Theatre provided.";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  
  if (!ObjectId.isValid(req.body.theatreId)) {
    errorResponseBody.err = "Invalid theatreId provided.";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  
  // validate movie presence
  if (!req.body.movieId) {
    errorResponseBody.err = "No movie provided.";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

   if (!ObjectId.isValid(req.body.movieId)) {
    errorResponseBody.err = "Invalid movieId provided.";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate timing presence
  if (!req.body.timing) {
    errorResponseBody.err = "No timing provided.";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate noOfSeats info
  if (!req.body.noOfSeats) {
    errorResponseBody.err = "No seats info provided.";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate price presence
  if (!req.body.price) {
    errorResponseBody.err = "No price info provided.";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }
  next();
}

const validateShowUpdateRequest = async (req, res, next) => {
    if(req.body.theatreId || req.body.movieId) {
        errorResponseBody.err = "We cannot update theatre or movie for an already added show";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}


module.exports = {
  validateCreateShowRequest,
  validateShowUpdateRequest
}