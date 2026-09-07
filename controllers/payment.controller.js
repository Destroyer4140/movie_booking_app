const paymentService = require('../services/payment.service');
const { STATUS, BOOKING_STATUS, PAYMENT_STATUS } = require('../utils/constants');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const create = async (req, res) => {
  try {
    const response = await paymentService.createPayment(req.body);
    if (response.status === BOOKING_STATUS.expired) {
      errorResponseBody.err = 'The payment took more than 5 minutes to get completed. Hence this payment session got expired.'
      errorResponseBody.data = response;
      return res.status(STATUS.GONE).json(errorResponseBody);
    }
    if (response.status === BOOKING_STATUS.cancelled) {
      errorResponseBody.message = 'The payment failed dur to some reason, booking was not successfull, please try again.'
      errorResponseBody.data = response;
      return res.status(STATUS.PAYMENT_REQUIRED).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = 'Booking completed successfully!';
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    errorResponseBody.message = 'Internal Server Error';
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

module.exports = {
  create
}