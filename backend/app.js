const express = require("express");
// const cors = require('cors');
const bodyParser = require("body-parser");
// const morgan = require('morgan');
// const { sequelize } = require('./models');
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

// Middleware
app.use(bodyParser.json());
// app.use(cors());
// app.use(morgan('dev'));

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://academind:ORlnOPLKvIH9M9hP@cluster0-ntrwp.mongodb.net/mern?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
