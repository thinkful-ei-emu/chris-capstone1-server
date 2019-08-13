const express = require('express');
const RatingService = require('./rating-service');
const requireAuth = require('../middleware/jwt-auth');
const ratingsRouter = express.Router();
const jsonParser = express.json();

ratingsRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    RatingService.getAllRatings(req.app.get('db'))
      .then(res => res.filter(rating =>
        req.user.id === rating.poster_id))
      .then(ratings => {
        res.json(RatingService.serializeRatings(ratings));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { rating, book_id } = req.body;
    const newRating = { rating, book_id };
    for (const [key, value] of Object.entries(newRating))
      if(value == null)
        return res.status(401).json({
          error: `Missing '${key}' in request body`
        });
    
    newRating.poster_id = req.user.id;
    
    RatingService.getAllRatings(req.app.get('db'))
      .then(ratings => ratings.filter(rating =>
        req.user.id === rating.poster_id))
      .then(ratings => {
        if(ratings.find(rating => newRating.book_id === rating.book_id)) 
          return res.status(401).json({
            error: 'Rating already exists'
          });
        
        RatingService.insertRating(
          req.app.get('db'),
          newRating
        )
          .then(rating => {
            res.status(201)
              .json(RatingService.serializeRating(rating));
          })
          .catch(next)
      })
      .catch(next);
  });

ratingsRouter
  .route('/:id')
  .all(requireAuth)
  .all(checkRatingExists)
  .all(userAuth)
  .delete((req, res, next) => {
    const { id } = req.params;
    RatingService.deleteRating(
      req.app.get('db'),
      id
    )
      .then(() => res.status(204).end())
      .catch(next);
  });
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

  async function checkRatingExists(req, res, next) {
    try {
        const rating = await RatingService.getById(
            req.app.get('db'),
            req.params.id
        )

        if(!rating)
        return res.status(404).json({
            error: 'Rating doesn\'t exist'
        })

        res.rating = rating;
        next();
    } catch(error) {
        next(error)
    }
}

function userAuth(req, res, next) {
  try {
    if(res.rating.poster_id !== req.user.id)
      return res.status(404).json({ error: 'Unauthorized request' });
    next();
  }
  catch(error) {
    next(error);
  }
}

module.exports = ratingsRouter;