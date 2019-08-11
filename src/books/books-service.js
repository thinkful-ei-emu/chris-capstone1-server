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
        'book.book_report',
        'book.rating',
        'book.genre',
        'book.recommended',
        ...userFields,
        ...posterFields,
        db.raw(
          'count(DISTINCT rat) AS number_of_ratings'
        ),
        db.raw(
          'AVG(rat.rating) AS average_rating'
        )
      )
      .leftJoin(
        'bookshelf_bookrating AS rat',
        'book.id',
        'rat.book_id'
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
        'book.book_report',
        'book.rating',
        'book.genre',
        'book.recommended',
        ...userFields,
        ...posterFields,
        db.raw(
          'count(DISTINCT rat) AS number_of_ratings'
        ),
        db.raw(
          'AVG(rat.rating) AS average_rating'
        )
      )
      .where('usr.id', user_id)
      .leftJoin(
        'bookshelf_bookrating AS rat',
        'book.id',
        'rat.book_id'
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

  getBookRatings(db, book_id) {
    return db('bookshelf_bookrating AS rat')
      .select(
        'rat.id',
        'rat.poster_id',
        'rat.rating',
        'rat.date_created',
        ...userFields
      )
      .where('rat.book_id', book_id)
      .leftJoin(
        'bookshelf_users AS usr',
        'rat.poster_id',
        'usr.id'
      )
      .groupBy('rat.poster_id', 'usr.id','rat.id','rat.rating','rat.date_created');
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
      image: xss(bookdata.image),
      book_report: xss(bookdata.book_report),
      rating: bookdata.rating,
      genre: bookdata.genre,
      recommended: bookdata.recommended,
      user: bookdata.user || {},
      poster: { 
        ...bookdata.poster, 
        poster_report: report
      } || {},
      number_of_ratings: Number(bookdata.number_of_ratings) || 0,
      average_rating: Number(bookdata.average_rating) || 0
    };
  },
  serializeRatings(ratings) {
    return ratings.map(this.serializeRating)
  },

  serializeRating(rating) {
    const ratingTree = new Treeize()
    const ratingData = ratingTree.grow([ rating ]).getData()[0]

    return {
      id: ratingData.id,
      rating: ratingData.rating,
      book_id: ratingData.book_id,
      user: ratingData.user || {},
      date_created: ratingData.date_created,
    }
  },
};
const posterFields = [
  'ptr.id AS poster:id',
  'ptr.user_name AS poster:user_name',
  'ptr.full_name AS poster:full_name',
  'ptr.email AS poster:email',
  'ptr.date_created AS poster:date_created',  
  'book.poster_rating AS poster:poster_rating'
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