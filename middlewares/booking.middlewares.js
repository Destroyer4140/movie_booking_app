const { STATUS, USER_ROLE, BOOKING_STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;
const theatreService = require('../services/theatre.service');
const userService = require('../services/user.service');

const validateBookingCreateRequest = async (req, res, next) => {
  
  // Validate the theatreId presence
  if (!req.body.theatreId) {
    errorResponseBody.err = "No TheatreId provided.";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate the theatre id formate
  if (!ObjectId.isValid(req.body.theatreId)) {
    errorResponseBody.err = "Invalid theatreId provided";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate the theatre exist or not in database
  const theatre = await theatreService.getTheatre(req.body.theatreId);
  if (!theatre) {
    errorResponseBody.err = "No theatre exist for provided theatreId";
    return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
  }

    // Validate the movie id presence
  if (!req.body.movieId) {
    errorResponseBody.err = "No movieId provided.";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate the movie id formate
  if (!ObjectId.isValid(req.body.movieId)) {
    errorResponseBody.err = "Invalid movieId provided";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate the movie exist or not in the theatre
  if (!theatre.movies.includes(req.body.movieId)) {
    errorResponseBody.err = "No movie exist for provided movieId in given theatreId";
    return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
  }

  // validate presence of timing
  if (!req.body.timings) {
    errorResponseBody.err = "No movie timing provided.";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  } 

  // validate the no of seats presence
  if (!req.body.noOfSeats) {
    errorResponseBody.err = "No seat provided.";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  next();
}

const canChangeStatus = async (req, res, next) => {
  const userId = req.user;
  const user = await userService.getUserById(userId);
  if (user.userRole === USER_ROLE.customer && req.body.status && req.body.status !== BOOKING_STATUS.cancelled) {
    errorResponseBody.err = "You are not allowed to change the booking status";
    return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
  }
  next();
}

module.exports = {
  validateBookingCreateRequest,
  canChangeStatus
}