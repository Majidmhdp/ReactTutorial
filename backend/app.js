const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const { sequelize } = require('./models');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// Middleware
app.use(bodyParser.json());
// app.use(cors());
// app.use(morgan('dev'));

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});