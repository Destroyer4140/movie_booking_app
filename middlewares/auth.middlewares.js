const {errorResponseBody} = require('../utils/responseBody');

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


module.exports = {
  validateSignupRequest,
};
