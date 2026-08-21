const express = require('express');
const app = express(); //express object
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const MovieRoutes = require("./routes/movie.routes");

// Load env during startup
const env = require('dotenv');
env.config();

const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

MovieRoutes(app); //invoking the movie routes.


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