const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      email: '1@gmail.com',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      email: 'TU2@gmail.com',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      email: 'TU3@gmail.com',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      email: 'TU4@gmail.com',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function makeBooksArray(users) {
  return [
    {
      id: 1,
      title: 'Disappearing Earth',
      author: 'Julia Phillips',
      list: 'wishlist',
      book_source: 'Print',
      genre: 'Fantasy',
      book_report: 'Nothing to see here',
      image: 'http://placehold.it/500x500',
      rating: 13,
      likes: 2,
      dislikes: 33, 
      recommended: false, 
      poster_rating: null, 
      poster_report: null, 
      poster_id: null,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      title: 'test book 2',
      author: 'test author 2',
      list: 'wishlist',
      book_source: 'Print',
      genre: 'Fantasy',
      book_report: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      image: 'http://placehold.it/500x500',
      rating: 13,
      likes: 2,
      dislikes: 33, 
      recommended: false, 
      poster_rating: null, 
      poster_report: null, 
      poster_id: null,
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      title: 'test book 3',
      author: 'test author 3',
      list: 'wishlist',
      book_source: 'Print',
      genre: 'Fantasy',
      book_report: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      image: 'http://placehold.it/500x500',
      rating: 13,
      likes: 2,
      dislikes: 33, 
      recommended: false, 
      poster_rating: null, 
      poster_report: null, 
      poster_id: null,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      title: 'test book 4',
      author: 'test author 4',
      list: 'wishlist',
      book_source: 'Print',
      genre: 'Fantasy',
      book_report: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      image: 'http://placehold.it/500x500',
      rating: 13,
      likes: 2,
      dislikes: 33, 
      recommended: false, 
      poster_rating: null, 
      poster_report: null, 
      poster_id: null,
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function makeRatingsArray(users, books) {
  return [
    {
      id: 1, 
      rating: 85, 
      book_id: books[0].id, 
      poster_id: users[0].id
    },
    {
      id: 2, 
      rating: 85, 
      book_id: books[0].id, 
      poster_id: users[1].id
    },
    {
      id: 3, 
      rating: 85, 
      book_id: books[0].id, 
      poster_id: users[2].id
    },
    {
      id: 4, 
      rating: 85, 
      book_id: books[0].id, 
      poster_id: users[3].id
    },
    {
      id: 5, 
      rating: 85, 
      book_id: books[1].id, 
      poster_id: users[0].id
    },
    {
      id: 6, 
      rating: 85, 
      book_id: books[2].id, 
      poster_id: users[1].id
    },
    {
      id: 7, 
      rating: 85, 
      book_id: books[3].id, 
      poster_id: users[2].id
    },
    {
      id: 8, 
      rating: 85, 
      book_id: books[1].id, 
      poster_id: users[3].id
    },
  ];
}

function makeExpectedBook(users, book, ratings=[]) {
  const user = users
    .find(user => user.id === book.user_id);

  const bookRatings = ratings
    .filter(rating => rating.book_id === book.id);
  
  const number_of_ratings = bookRatings.length;
  const average_rating = calculateAverageRating(bookRatings);
    
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    list: book.list,
    date_created: book.date_created,
    book_source : book.book_source,
    image : book.image,
    book_report : book.book_report,
    rating : book.rating,
    genre: book.genre,
    recommended : book.recommended,
    user : {
      id : user.id,
      user_name : user.user_name,
      full_name : user.full_name,
      email : user.email,
      date_created : user.date_created
    },
    poster: {
      poster_report: book.poster_report
    },
    number_of_ratings,
    average_rating
  };
}

function calculateAverageRating(ratings) {
  if(!ratings.length) return 0;

  const sum = ratings
    .map(rating => rating.rating)
    .reduce((a, b) => a + b);

  return Math.round(sum / rating.length);
}

function makeExpectedBookRating(users, bookId, ratings) {
  const expectedRatings = ratings
    .filter(rating => rating.book_id === bookId);
  
  return expectedRatings.map(rating => {
    const ratingUser = users.find(user => user.id === rating.poster_id);
    return {
      id: rating.id,
      rating: rating.rating,
      book_id: rating.book_id,
      poster_id: rating.poster_id,
      user: {
        id: ratingUser.id,
        user_name: ratingUser.user_name,
        full_name: ratingUser.full_name,
        nickname: ratingUser.nickname,
        date_created: ratingUser.date_created,
      },
      date_created: rating.date_created,
    };
  });
}

function makeMaliciousBook(user) {
  const maliciousBook = {
    id: 2,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    author: 'Naughty naughty very naughty <script>alert("xss");</script>',
    list: 'wishlist',
    book_source: 'Print',
    genre: 'Fantasy',
    book_report: 'Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.',
    image: 'http://placehold.it/500x500',
    rating: 13,
    likes: 2,
    dislikes: 33, 
    recommended: false, 
    poster_rating: null, 
    poster_report: null, 
    poster_id: null,
    user_id: user.id,
    date_created: '2029-01-22T16:28:32.615Z',
  };

  const expectedBook = {
    ...makeExpectedBook([user], maliciousBook),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    author: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    book_report: 'Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.',
  };

  return {
    maliciousBook,
    expectedBook
  };
}

function makeBooksFixtures() {
  const testUsers = makeUsersArray();
  const testBooks = makeBooksArray(testUsers);
  const testRatings = makeRatingsArray(testUsers, testBooks)
  return { testUsers, testBooks, testRatings };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      bookshelf_books,
      bookshelf_users,
      bookshelf_bookrating
      RESTART IDENTITY CASCADE`
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db.into('bookshelf_users').insert(preppedUsers)
    .then(() =>
      db.raw(
        'SELECT setval(\'bookshelf_users_id_seq\', ?)',
        [users[users.length - 1].id]
      )
    );
}

function seedBooksTables(db, users, books, ratings=[]) {
  return seedUsers(db, users)
    .then(() =>
      db
        .into('bookshelf_books')
        .insert(books)
    )
    .then(() =>
      ratings.length && db.into('bookshelf_bookrating').insert(ratings)
    );
}

function seedMaliciousBook(db, user, book) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('bookshelf_books')
        .insert([book])
    );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256'
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeBooksArray,
  makeExpectedBook,
  makeExpectedBookRating,
  makeMaliciousBook,
  makeRatingsArray,
  makeBooksFixtures,
  seedBooksTables,
  cleanTables,
  seedUsers,
  seedMaliciousBook,
  makeAuthHeader
};