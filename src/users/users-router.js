const express = require('express');
const AuthController = require('../controllers/auth-controller');

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter
  .post('/', jsonParser, AuthController.checkLogin);



module.exports = usersRouter;