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
 *  updateMovieInTheatre is a function that updates the list of movies associated with a specific theatre. It can either add new movie IDs to the theatre's list or remove existing ones based on the 'insert' flag.
 * @param  theatreId  -> The ID of the theatre to be updated.
 * @param  movieId -> An array of movie IDs to be added or removed from the theatre's list.
 * @param  insert -> A boolean flag indicating whether to add (true) or remove (false) the specified movie IDs.
 * @returns -> returns the updated theatre object.
 */
const updateMovieInTheatre = async (theatreId, movieId, insert) => {
  try {
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      return {
        err: "No Theatre Found for the provided TheatreId",
        code: 404
      }
    }
    if (insert) {
      // Add the movieId to the theatre's movies array if it doesn't already exist
      movieId.forEach(id => {
        if (!theatre.movies.includes(id)) {
          theatre.movies.push(id);
        }
      });
    } else {
      // Remove the movieId from the theatre's movies array
      theatre.movies = theatre.movies.filter(id => !movieId.includes(id.toString()));
    }
    const updatedTheatre = await theatre.save();
    return updatedTheatre.populate('movies'); // Populate the movies field with movie details
  } catch (error) {
    throw error;
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
  getAllTheTheatres,
  updateMovieInTheatre
}