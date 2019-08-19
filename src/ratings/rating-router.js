const express = require('express');
const requireAuth = require('../middleware/jwt-auth');
const RatingController = require('../controllers/ratings-controller');
const ratingsRouter = express.Router();
const jsonParser = express.json();

ratingsRouter
  .route('/')
  .all(requireAuth)
  .get(RatingController.getRatings)
  .post(jsonParser, RatingController.postRating);

ratingsRouter
  .route('/:id')
  .all(requireAuth)
  .all(RatingController.checkRatingExists)
  .all(RatingController.userAuth)
  .delete(RatingController.deleteRating);


module.exports = ratingsRouter;