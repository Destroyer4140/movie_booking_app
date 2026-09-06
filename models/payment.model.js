const mongoose = require('mongoose');
const { PAYMENT_STATUS} = require('../utils/constants');

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: [PAYMENT_STATUS.failed, PAYMENT_STATUS.success, PAYMENT_STATUS.pending],
      message: 'Invalid payment status',
    },
    default: PAYMENT_STATUS.pending,
    required: true,
  },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;