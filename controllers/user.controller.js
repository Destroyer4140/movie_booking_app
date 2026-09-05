const userService = require('../services/user.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await userService.updateUserRoleOrStatus(userId, updateData);
    successResponseBody.message = "User updated successfully";
    successResponseBody.data = updatedUser;
    res.status(200).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      errorResponseBody.message = error.message;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    errorResponseBody.message = "Internal server error";
    res.status(500).json(errorResponseBody);
  }
}

module.exports = {
  update
}
