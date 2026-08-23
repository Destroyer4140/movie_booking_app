const mongoose = require('mongoose');

/**
 * Define the schema of the movie resource to be stored in the db.
 */

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2
  },
  description: {
    type: String,
    required: true,
    minLength: 5
  },
  cast: {
    type: [String],
    required: true
  },
  trailerUrl: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    default: "English"
  },
  releaseDate: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  releaseStatus: {
    type: String,
    required: true,
    default: "RELEASED"
  },
  
}, { timestamps: true });


/**
 * Creates a Mongoose model for the movie schema.
 * This model will be used to interact with the 'movies' collection in the MongoDB database.
 */
const Movie = mongoose.model('Movie', movieSchema); //create a new model

module.exports = Movie; //returning the model