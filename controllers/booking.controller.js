const bookingService = require('../services/booking.service');
const { STATUS } = require('../utils/constants');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

/**
 * This api 
 * @param req 
 * @param res 
 * @returns 
 */
const createBooking = async (req, res) => {
  try {
    const userId = await req.user; // Assuming the user ID is available in the request object after authentication
    console.log("UserId :- ", userId);
    const response = await bookingService.createBooking({ ...req.body, userId: userId });
    successResponseBody.data = response;
    successResponseBody.message = "Successfully created a booking!!";
    return res.status(STATUS.CREATED).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      errorResponseBody.message = "Failed to validate ";
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    errorResponseBody.message = "Internal server error while creating a bokking.";
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    successResponseBody.data = bookings;
    successResponseBody.message = "Successfully fetched all the bookings";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    errorResponseBody.message = "Internal Server Error, Failed to fetch the bookings.";
    return res.status(500).json({ error: error.message });
  }
};

const getBookingByUserId = async (req, res) => {
  try {
    const userId = await req.user;
    const booking = await bookingService.getBookings(userId);
    successResponseBody.data = booking;
    successResponseBody.message = "Successfull fetched the bookings.";
    res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    errorResponseBody.message = "Internal Serval Error, failed to fetch the bookings.";
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const userId = await req.user;
    const response = await bookingService.getBookingById(req.params.id, userId._id);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully found the bookings for logged in user.";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      errorResponseBody.message = "Failed to retrive bookings.";
      return res.status(error.code).json(errorResponseBody);
    }
      errorResponseBody.err = error;
      errorResponseBody.message = "Internal server error, Failed to retrive bookings.";
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const updateBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updatedData = req.body;
    const updatedBooking = await bookingService.updateBookingById(bookingId, updatedData);
    successResponseBody.data = updatedBooking;
    successResponseBody.message = "Successfully updated the bookings.";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      errorResponseBody.message = "Failed booking updation.";
      return res.status(error.code).json(errorResponseBody)
    }
      errorResponseBody.err = error;
      errorResponseBody.message = "Internal Server Error, Failed to update.";
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};


module.exports = {
  createBooking,
  getAllBookings,
  getBookingByUserId,
  updateBookingById,
  getBookingById
};