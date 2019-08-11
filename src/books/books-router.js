const express = require('express');
const BooksService = require('./books-service');
const requireAuth = require('../middleware/jwt-auth');
const path = require('path');
const booksRouter = express.Router();
const jsonParser = express.json();

booksRouter
  .route('/')
  .get((req, res, next) => {
    BooksService.getAllBooks(req.app.get('db'))
      .then(books => {
        res.json(BooksService.serializeBooks(books));
      })
      .catch(next);
  });
  
// Router
// .get('/users/:id','gives you a specific user')
// .get('/users/:id/books', 'gets that users books')
// .get('/users/:id/books/:bookId', 'gives a specific book')

booksRouter
  .route('/user/books/')
  .all(requireAuth)
  .get( (req, res, next) => {
    BooksService.getUserBooks(
      req.app.get('db'), 
      req.user.id
    )
      .then(books => res.json(BooksService.serializeBooks(books))
      )
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, author, list, book_source, genre, book_report, image, rating } = req.body;
    const newBook = { title, author, list, book_source, genre };
    for (const [key, value] of Object.entries(newBook))
      if(value == null)
        return res.status(401).json({
          error: `Missing '${key}' in request body`
        });
  
    newBook.user_id = req.user.id;
    newBook.book_report = book_report;
    newBook.image = image;
    newBook.rating = rating;
  
    BooksService.insertBook(
      req.app.get('db'),
      newBook
    )
      .then(book => {
        res.status(201)
          .location(path.posix.join(req.originalUrl, `/${book.id}`))
          .json(BooksService.serializeBook(book));
      })
      .catch(next);
  });

booksRouter
  .route('/user/books/:book_id')
  .all(requireAuth)
  .all(checkBookExists)
  .all(userAuth)
  .get((req, res) => {
    res.json(BooksService.serializeBook(res.book));
  })
  .delete((req, res, next) => {
    const { book_id } = req.params;
    BooksService.deleteBook(
      req.app.get('db'),
      book_id
    )
      .then(() => res.status(204).end())
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, author, list, book_source, genre, book_report, image, rating } = req.body;
    const updatedBook = { title, author, list, book_source, genre, book_report, image, rating };
    const numberOfValues = Object.values(updatedBook).filter(Boolean).length;
    if(numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: 'Request body must contain information fields'
        }
      });
    }
    BooksService.updateBook(
      req.app.get('db'),
      req.params.book_id,
      updatedBook
    )
      .then(updated => {
        res.status(204).end();
      })
      .catch(next);
  });

booksRouter
  .route('/:book_id/ratings/')
  .all(requireAuth)
  .all(checkBookExists)
  .get((req, res, next) => {
    BooksService.getBookRatings(
      req.app.get('db'),
      req.params.book_id
    )
      .then(ratings => {
        res.json(BooksService.serializeRatings(ratings));
      })
      .catch(next);
  });

async function checkBookExists(req, res, next) {
    try {
        const book = await BooksService.getById(
            req.app.get('db'),
            req.params.book_id
        )

        if(!book)
        return res.status(404).json({
            error: 'Book doesn\'t exist'
        })

        res.book = book;
        next();
    } catch(error) {
        next(error)
    }
}

function userAuth(req, res, next) {
    try {
      if(res.book['user:id'] !== req.user.id)
    return res.status(404).json({ error: 'Unauthorized request' })
    next()
    }
    catch(error) {
      next(error)
  }
}

module.exports = booksRouter;