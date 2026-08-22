const Theatre = require('../models/theatre.model');

const createTheatre = async (data) => {
  try {
    const theatre = await Theatre.create(data);
    return theatre;
  } catch (err) {
    console.log(err);
    throw new err;
  }
}

module.exports = {
  createTheatre
}