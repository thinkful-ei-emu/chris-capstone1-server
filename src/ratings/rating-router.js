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
// .patch(jsonParser, (req, res, next) => {
//   const { rating } = req.body;
//   const updatedRating = { rating };
//   const numberOfValues = Object.values(updatedRating).filter(Boolean).length;
//   if(numberOfValues === 0) {
//     return res.status(400).json({
//       error: {
//         message: 'Request body must contain a new rating'
//       }
//     });
//   }
//   RatingService.updateRating(
//     req.app.get('db'),
//     req.params.id,
//     updatedRating
//   )
//     .then(updated => {
//       res.status(204).end();
//     })
//     .catch(next);
// })


module.exports = ratingsRouter;