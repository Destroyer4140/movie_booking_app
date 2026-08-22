const Theatre = require('../models/theatre.model');

const createTheatre = async (data) => {
  try {
    const theatre = await Theatre.create(data);
    return theatre;
  } catch (error) {
    if (error.name === 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return {
        err: err,
        code: 422
      }
    } else {
      throw new error;
    }
  }
}

const deleteTheatre = async (id) => {
  const theatre = await Theatre.deleteOne(id);
  console.log("count -> " + theatre);
  if (theatre.deletedCount === 0) {
    return {
      err: "No Movie Found for the provided theatreId.",
      code: 404,
    }
  }
  return theatre;
}

const getTheatre = async (id) => {
  const theatre = await Theatre.findById(id);
  if (!theatre) {
    return {
      err: "No Theatre Found for the provided theatreId.",
      code: 404,
    }
  }
  return theatre;
}

const updateTheatre = async (id, data) => {
  try {
    const updatedTheatreResp = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if (!updatedTheatreResp) {
      return {
        err: "No Theatre Found for the provided TheatreId",
        code: 404
      }
    }
    return updatedTheatreResp;
  } catch (error) {
    if (error.name === 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { err, code: 422 };
    }
    throw error;
  }
}

module.exports = {
  createTheatre,
  deleteTheatre,
  getTheatre,
  updateTheatre
}