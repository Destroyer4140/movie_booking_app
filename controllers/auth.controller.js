const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const { STATUS } = require('../utils/constants');


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
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const signin = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    const isValidPassword = await user.isValidPassword(req.body.password);
    if (!isValidPassword) {
      throw {
        err: "Invalid password for the given email",
        code: STATUS.UNAUTHORIZED
      };
    }
    const token = jwt.sign
      (
      { id: user._id, email: user.email },
      process.env.AUTH_KEY,
      { expiresIn: '1h' }
    );
    successResponseBody.message = 'Successfully signed in';
    successResponseBody.data = {
      email: user.email,
      role: user.userRole,
      status: user.userStatus,
      token: token
    };
    res.status(STATUS.NOT_FOUND).json(successResponseBody);
  } catch (error) {
    if(error.err) {
      errorResponseBody.err = error.err;
      errorResponseBody.message = "Failed to signin";
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.message = 'Internal server error';
    errorResponseBody.err = error;
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const resetPassword = async (req, res) => {
  try {
        const userId = await req.user;
        const user = await userService.getUserById(userId);
        const isOldPasswordCorrect = await user.isValidPassword(req.body.oldPassword);
        if(!isOldPasswordCorrect) {
            throw {err: 'Invalid old password, please write the correct old password', code: STATUS.FORBIDDEN};
        }
        user.password = req.body.newPassword;
        await user.save();
        successResponseBody.data = user;
        successResponseBody.message = 'Successfully updated the password for the given user';
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
  signup,
  signin,
  resetPassword
}