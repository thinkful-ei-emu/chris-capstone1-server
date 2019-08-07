const xss = require('xss');
const Treeize = require('treeize');

const BooksService = {
  getAllBooks(db) {
    return db('bookshelf_books AS book')
      .select(
        'book.id',
        'book.title',
        'book.author',
        'book.list',
        'book.date_created',
        'book.book_source',
        'book.image',
        'book.rating',
        'book.likes',
        'book.dislikes',
        'book.recommended',
        ...userFields,
        ...posterFields,
        db.raw(
          'count(DISTINCT comm) AS number_of_comments'
        ),
        db.raw(
          'AVG(comm.rating) AS average_review_rating'
        )
      )
      .leftJoin(
        'bookshelf_comments AS comm',
        'book.id',
        'comm.book_id'
      )
      .leftJoin(
        'bookshelf_users AS usr',
        'book.user_id',
        'usr.id'
      )
      .leftJoin(
        'bookshelf_users AS ptr',
        'book.poster_id',
        'ptr.id'
      )
      .groupBy('book.id', 'usr.id', 'ptr.id');
  },

  getUserBooks(db, user_id) {
    return db('bookshelf_books AS book')
      .select(
        'book.id',
        'book.title',
        'book.author',
        'book.list',
        'book.date_created',
        'book.book_source',
        'book.image',
        'book.rating',
        'book.likes',
        'book.dislikes',
        'book.recommended',
        ...userFields,
        ...posterFields,
        db.raw(
          'count(DISTINCT comm) AS number_of_comments'
        ),
        db.raw(
          'AVG(comm.rating) AS average_review_rating'
        )
      )
      .where('usr.id', user_id)
      .leftJoin(
        'bookshelf_comments AS comm',
        'book.id',
        'comm.book_id'
      )
      .leftJoin(
        'bookshelf_users AS usr',
        'book.user_id',
        'usr.id'
      )
      .leftJoin(
        'bookshelf_users AS ptr',
        'book.poster_id',
        'ptr.id'
      )
      .groupBy('book.id', 'usr.id', 'ptr.id');
  },

  getById(db, id) {
    return BooksService.getAllBooks(db)
      .where('book.id', id)
      .first();
  },

  getBookComments(db, book_id) {
    return db('bookshelf_comments AS comm')
      .select(
        'comm.id',
        'comm.rating',
        'comm.text',
        'comm.date_created',
        ...userFields
      )
      .where('comm.book_id', book_id)
      .leftJoin(
        'bookshelf_users AS usr',
        'comm.poster_id',
        'usr.id'
      )
      .groupBy('comm.id', 'usr.id');
  },
  insertBook(db, newBook) {
    return db('bookshelf_books')
      .insert(newBook)
      .returning('*')
      .then(res => res[0]);
  },
  deleteBook(db, id) {
    return db('bookshelf_books')
      .where({ id })
      .delete();
  },
  updateBook(db, id, newBookInfo) {
    return db('bookshelf_books')
      .where({ id })
      .update(newBookInfo);
  },
  serializeBooks(books) {
    return books.map(this.serializeBook);
  },
  serializeBook(book) {
    const bookTree = new Treeize();

    const bookdata = bookTree.grow([ book ]).getData()[0];

    const report = bookdata.poster ? xss(bookdata.poster.poster_report) : null;
    
    return{
      id: bookdata.id,
      title: xss(bookdata.title),
      author: xss(bookdata.author),
      list: bookdata.list,
      date_created: bookdata.date_created,
      book_source: bookdata.book_source,
      image: bookdata.image,
      rating: bookdata.rating,
      likes: bookdata.likes,
      dislikes: bookdata.dislikes,
      recommended: bookdata.recommended,
      user: bookdata.user || {},
      poster: { 
        ...bookdata.poster, 
        poster_report: report
      } || {},
      number_of_comments: Number(bookdata.number_of_comments) || 0,
      average_review_rating: Number(bookdata.average_review_rating) || 0
    };
  },

  serilaizeBookComments(comments) {
    return comments.map(this.serializeBookComment);
  },

  serializeBookComment(comment) {
    const commentTree = new Treeize();

    const commentData = commentTree.grow([ comment ]).getData()[0];

    return {
      id: commentData.id,
      rating: commentData.rating,
      text: commentData.text,
      date_created: commentData.date_created,
      user: commentData.user || {}
    };
  }
};
const posterFields = [
  'ptr.id AS poster:id',
  'ptr.user_name AS poster:user_name',
  'ptr.full_name AS poster:full_name',
  'ptr.email AS poster:email',
  'ptr.date_created AS poster:date_created',  
  'book.poster_rating AS poster:poster_rating',
  'book.poster_report AS poster:poster_report'
];

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.email AS user:email',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified'
];

module.exports = BooksService;