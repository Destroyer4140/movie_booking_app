const {errorResponseBody } = require('../utils/responsebody');

const validateUpdateUserRequest = (req, res, next) => {
  const { userRole, userStatus } = req.body;

  // Validate user role and status in the request body
  if (!userRole && !userStatus) {
    errorResponseBody.err = 'User role or status is not provided in request body';
    errorResponseBody.message = 'Malformed request, cannot process the request';
    return res.status(400).json(errorResponseBody);
  }
  next();
}

module.exports = {
  validateUpdateUserRequest
}