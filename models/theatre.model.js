const mongoose = require('mongoose');

/**
 * Defines the schema of theatre resource to be stored in the db.
 */

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5
  },
  description: String,
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  address: String
}, { timestamps: true });

/**
 * Creates a Mongoose model for the theatre schema.
 * This model will be used to interact with the 'theatres' collection in the MongoDB database.
 */
const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;