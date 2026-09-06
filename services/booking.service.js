const Booking = require("../models/booking.model");
const { STATUS } = require('../utils/constants');

/**
 * 
 * @param bookingData 
 * @returns 
 */
const createBooking = async (data) => {
  try {
    const response = await Booking.create(data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.name == 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach(key => err[key] = error.errors[key].message);
      throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
    }
    throw error;
  }
};

const getAllBookings = async () => {
  try {
    const response = await Booking.find();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getBookings = async (data) => {
  try {
    console.log(data);
    const response = await Booking.find({
      userId: data
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getBookingById = async (id, userId) => {
  try {
    const response = await Booking.findById(id);
    if (!response) {
      throw {
        err: "No Booking records found for the id.",
        code: STATUS.NOT_FOUND
      };
    }
    
    if (response.userId.toString() !== userId.toString()) {
      throw {
        err: "Not able to access the booking.",
        code: STATUS.UNAUTHORISED
      }
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const updateBookingById = async (bookingId, updatedData) => {
  try {
    const response = await Booking.findByIdAndUpdate(bookingId, updatedData, { new: true, runValidators: true });
    if (!response) {
      throw {
        err: "No booking found for the given id",
        code: STATUS.NOT_FOUND
      }
    }
    return response;
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach(key => err[key] = error.errors[key].message);
      throw {
        err: err,
        code: STATUS.UNPROCESSABLE_ENTITY
      };
    }
    throw error;
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookings,
  updateBookingById,
  getBookingById
};