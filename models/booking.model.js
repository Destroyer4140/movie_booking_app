const mongoose = require('mongoose');
const {BOOKING_STATUS} = require('../utils/constants');

const bookingSchema = new mongoose.Schema({
  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theatre',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  timings: {
    type: String,
    required: true,
  },
  noOfSeats: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
    enum: {
      values: [BOOKING_STATUS.successfull, BOOKING_STATUS.cancelled, BOOKING_STATUS.processing, BOOKING_STATUS.expired],
      message: 'Invalid booking status',
    },
    default: BOOKING_STATUS.processing,
    required: true,
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;