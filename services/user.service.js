const User = require('../models/user.model');
const { USER_ROLE, USER_STATUS, STATUS} = require('../utils/constants');


const createUser = async (data) => {
  try {
    if(!data.userRole || data.userRole == USER_ROLE.customer) {
      if(data.userStatus && data.userStatus != USER_STATUS.approved) {
        throw {
          err: "We cannot set any other status for customer", 
          code: STATUS.BAD_REQUEST
        };
      }
    }
    if(data.userRole && data.userRole != USER_ROLE.customer) {
      data.userStatus = USER_STATUS.pending;
    }
    const response = await User.create(data);
    return response;
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach(key => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY, message: "Validation error while creating user" };
    }
    throw error;
  }
}

const getUserByEmail = async (email) => {
  try {
    const response = await User.findOne({ email: email });
    if (!response) {
      throw {
        err: "No user found with the given email",
        code: STATUS.NOT_FOUND
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getUserById = async (id) => {
  try {
    const response = await User.findById(id);
    if (!response) {
      throw {
        err: "No user found with the given id",
        code: STATUS.NOT_FOUND
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const updateUserRoleOrStatus = async (id, data) => {
  try {
    const updateQuery = {};
    if (data.userRole) {
      updateQuery.userRole = data.userRole;
    }
    if (data.userStatus) {
      updateQuery.userStatus = data.userStatus;
    }
    const response = await User.findOneAndUpdate(
      { _id: id },
      updateQuery,
      { returnDocument: 'after', runValidators: true }
    );
  
    if (!response) {
      throw {
        err: "No user found with the given id",
        code: STATUS.NOT_FOUND
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach(key => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY, message: "Validation error while updating user" };
    }
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserRoleOrStatus
}