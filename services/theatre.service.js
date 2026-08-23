const Theatre = require('../models/theatre.model');

/**
 * 
 * @param  data -> object containing details of theatre to be created.
 * @returns -> returns the new theatre object created.
 */
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

/**
 * 
 * @param id -> takes id as an request.
 * @returns -> returns deleted theatre as an object.
 */
const deleteTheatre = async (id) => {
  const theatre = await Theatre.deleteOne(id);
  if (theatre.deletedCount === 0) {
    return {
      err: "No Movie Found for the provided theatreId.",
      code: 404,
    }
  }
  return theatre;
}

/**
 * 
 * @param {*} id -> Used to identify which theatre needs to be fetched.
 * @returns -> returns the theatre object if found, otherwise an error object.
 */
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

/**
 * 
 * @param {*} id -> Used to identify which theatre needs to be updated.
 * @param {*} data -> Contains the updated details of the theatre.
 * @returns -> returns the updated theatre object if successful, otherwise an error object.
 */
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

/**
 * 
 * @param filter -> An object containing filter criteria for fetching theatres. Currently not used in the implementation.
 * @returns -> returns an array of all theatre objects.
 */
const getAllTheTheatres = async (filter) => {
  try {
    const response = await Theatre.find({});
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * Exporting the service functions for use in other parts of the application.
 */
module.exports = {
  createTheatre,
  deleteTheatre,
  getTheatre,
  updateTheatre,
  getAllTheTheatres
}