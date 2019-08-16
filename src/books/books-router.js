const express = require('express');
const requireAuth = require('../middleware/jwt-auth');
const booksController = require('../controllers/books-controller');
const booksRouter = express.Router();
const jsonParser = express.json();

booksRouter
  .route('/')
  .all(requireAuth)
  .get(booksController.getBooks);

booksRouter
  .route('/user/books/')
  .all(requireAuth)
  .get(booksController.getUserBooks)
  .post(jsonParser, booksController.postUserBooks);

booksRouter
  .route('/user/books/:book_id')
  .all(requireAuth)
  .all(booksController.checkBookExists)
  .all(booksController.userAuth)
  .get(booksController.getBook)
  .delete(booksController.deleteBook)
  .patch(jsonParser, booksController.patchBook);

booksRouter
  .route('/:book_id/ratings/')
  .all(requireAuth)
  .all(booksController.checkBookExists)
  .get(booksController.getBookRatings);


module.exports = booksRouter;