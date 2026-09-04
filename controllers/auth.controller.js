const userService = require('../services/user.service');
const {successResponseBody, errorResponseBody } = require('../utils/responsebody');


const signup = async (req, res) => {
  try {
    const userData = req.body;
    const response = await userService.createUser(userData);
    successResponseBody.message = 'Successfully registered User';
    successResponseBody.data = response;
    res.status(201).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      errorResponseBody.message = "Failed to signup";
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.message = 'Internal server error';
    errorResponseBody.err = error;
    res.status(500).json(errorResponseBody);
  }
}

module.exports = {
  signup
}