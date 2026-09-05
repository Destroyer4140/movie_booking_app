const userService = require('../services/user.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const { STATUS } = require('../utils/constants');

const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await userService.updateUserRoleOrStatus(userId, updateData);
    successResponseBody.message = "User updated successfully";
    successResponseBody.data = updatedUser;
    res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      errorResponseBody.message = error.message;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    errorResponseBody.message = "Internal server error";
    res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

module.exports = {
  update
}
