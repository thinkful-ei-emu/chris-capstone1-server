require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helment');

const app = express();

const morganOption = (process.env.NODE_ENV === 'production')
  ? 'common'
  : 'tiny';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

module.exports = app;