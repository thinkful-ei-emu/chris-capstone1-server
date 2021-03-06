require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const booksRouter = require('./books/books-router');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const ratingsRouter = require('./ratings/rating-router');

const app = express();

const { NODE_ENV } = require('./config');

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/ratings', ratingsRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;