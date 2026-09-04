const {errorResponseBody} = require('../utils/responseBody');

/**
 * Middleware to validate signup request
 * @param  req -> { username, email, password }
 * @param  res -> Response object to send error response if validation fails
 * @param  next -> Next middleware function to call if validation passes
 * @returns -> Calls next() if validation passes, otherwise sends error response
 */
const validateSignupRequest = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate user name of the user.
  if (!username) {
    errorResponseBody.err = 'Username is not provided in request body';
    errorResponseBody.message = 'Something went wrong, can not process the request'
    return res.status(400).json(errorResponseBody);
  }

  // Validate email of the user.
  if (!email) {
    errorResponseBody.err = 'Email is not provided in request body';
    errorResponseBody.message = 'Something went wrong, can not process the request'
    return res.status(400).json(errorResponseBody);
  }

  // Validate password of the user.
  if (!password) {
    errorResponseBody.err = 'Password is not provided in request body';
    errorResponseBody.message = 'Something went wrong, can not process the request'
    return res.status(400).json(errorResponseBody);
  }

  next();
}

/**
 * Middleware to validate signin request
 * @param req -> { email, password }
 * @param res -> Response object to send error response if validation fails
 * @param next -> Next middleware function to call if validation passes
 * @returns -> Calls next() if validation passes, otherwise sends error response
 */
const validateSigninRequest = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email of the user.
  if (!email) {
    errorResponseBody.err = 'Email is not provided in request body';
    errorResponseBody.message = 'Something went wrong, can not process the request'
    return res.status(400).json(errorResponseBody);
  }

  // Validate password of the user.
  if (!password) {
    errorResponseBody.err = 'Password is not provided in request body';
    errorResponseBody.message = 'Something went wrong, can not process the request'
    return res.status(400).json(errorResponseBody);
  }

  next();
}


module.exports = {
  validateSignupRequest,
  validateSigninRequest
};
