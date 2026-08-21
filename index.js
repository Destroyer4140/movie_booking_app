const express = require('express');
const app = express(); //express object
const mongoose = require('mongoose');

// Load env during startup
const env = require('dotenv');
env.config();

const PORT = process.env.PORT

// // Event listener for successful connection
// mongoose.connection.on('connected', () => {
//   console.log('MongoDB connection status: Connected');
// });

// // Event listener for connection errors
// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });


app.get('/home', (req, res) => {
  return res.json({
    success: false
  });
});


app.listen(PORT,async () => {
  // this executed once server started successfully.
  console.log(`Server started on Port ${PORT}`);
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("successfully connected to mongo");
  } catch (err) {
    console.log("failed to connect mongo"+err);
  }
 });