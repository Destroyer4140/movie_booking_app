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
    console.error('Error during signup:', error);
    errorResponseBody.message = 'Internal server error';
    errorResponseBody.err = error;
    res.status(500).json(errorResponseBody);
  }
}

module.exports = {
  signup
}