const express = require('express');
const AuthController = require('../controllers/auth-controller');

const authRouter = express.Router();
const jsonParser = express.json();

authRouter
  .post('/login', jsonParser, AuthController.createLoginAuth);



module.exports = authRouter;