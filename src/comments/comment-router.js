const express = require('express');
const path = require('path');
const CommentsService = require('./comment-service');

const commentRouter = express.Router();
const jsonParser = express.json();

commentRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    const { book_id, rating, text } = req.body;
    const newComment = { book_id, rating, text };

    for (const [key, value] of Object.entries(newComment))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newComment.poster_id = req.user.id;

    CommentsService.insertComment(
      req.app.get('db'),
      newComment
    )
      .then(comment => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${comment.id}`))
          .json(CommentsService.serializeComment(comment));
      })
      .catch(next);
  });

module.exports = commentRouter;