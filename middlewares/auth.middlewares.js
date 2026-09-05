const {errorResponseBody} = require('../utils/responseBody');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const { USER_ROLE, USER_STATUS } = require('../utils/constants');
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

/**
 * Middleware to check if user is authenticated
 * @param req -> Request object containing headers with x-access-token
 * @param res -> Response object to send error response if authentication fails
 * @param next -> Next middleware function to call if authentication passes
 * @returns -> Calls next() if authentication passes, otherwise sends error response
 */
const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      errorResponseBody.err = 'No token provided';
      errorResponseBody.message = 'Authentication failed, due to missing token';
      return res.status(403).json(errorResponseBody);
    }
    const response = jwt.verify(token, process.env.AUTH_KEY);
    if (!response) {
      errorResponseBody.err = 'Failed to authenticate token';
      errorResponseBody.message = 'Authentication failed, due to invalid token';
      return res.status(401).json(errorResponseBody);
    }
    const user = userService.getUserById(response.id);
    req.user = user;
    next();
  } catch (error) {
    if (error.code && error.code == 404) {
      errorResponseBody.err = 'User not found';
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    errorResponseBody.message = 'Authentication failed, due to invalid token';
    return res.status(500).json(errorResponseBody);
  }
}

const validateResetPasswordRequest = (req, res, next) => {
  const { newPassword, oldPassword } = req.body; 

  // Validate new password of the user.
  if (!newPassword) {
    errorResponseBody.err = 'New password is not provided in request body';
    errorResponseBody.message = 'Something went wrong, can not process the request'
    return res.status(400).json(errorResponseBody);
  }

  // Validate old password of the user.
  if (!oldPassword) {
    errorResponseBody.err = 'Old password is not provided in request body';
    errorResponseBody.message = 'Something went wrong, can not process the request'
    return res.status(400).json(errorResponseBody);
  }

  next();
}

const isAdmin = async (req, res, next) => {
  const userId = await req.user;
  const user = await userService.getUserById(userId);

  if (user.userRole !== USER_ROLE.admin) {
    errorResponseBody.err = 'User is not authorized to perform this action';
    errorResponseBody.message = 'Authorization failed, user does not have admin privileges';
    return res.status(403).json(errorResponseBody);
  }

  next();
}

const isClient = async (req, res, next) => {
  const userId = await req.user;
  const user = await userService.getUserById(userId);

  if (user.userRole !== USER_ROLE.client) {
    errorResponseBody.err = 'User is not authorized to perform this action';
    errorResponseBody.message = 'Authorization failed, user does not have client privileges';
    return res.status(403).json(errorResponseBody);
  }

  next();
}

const isAdminOrClient = async (req, res, next) => {
  const userId = await req.user;
  const user = await userService.getUserById(userId);

  if (user.userRole !== USER_ROLE.admin && user.userRole !== USER_ROLE.client) {
    errorResponseBody.err = 'User is not authorized to perform this action';
    errorResponseBody.message = 'Authorization failed, user does not have admin or client privileges';
    return res.status(403).json(errorResponseBody);
  }

  next();
}


module.exports = {
  validateSignupRequest,
  validateSigninRequest,
  isAuthenticated,
  validateResetPasswordRequest,
  isAdmin,
  isClient,
  isAdminOrClient
};
