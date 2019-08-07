const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function makeBooksArray(users) {
  return [
    {
, , , )

      id: 1,
      title: 'Disappearing Earth',
      author,
      list,
      book_source,
      image: 'http://placehold.it/500x500',
      rating,
      likes,
      dislikes, 
      recommended, 
      poster_rating, 
      poster_report, 
      poster_id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    ('Disappearing Earth', 'Julia Phillips', 'wishlist', 'Print', 
    'https://media.vanityfair.com/photos/5d1662c85f741a0008ed05e1/master/w_800%2Cc_limit/best-books-of-2019-Disappearing-Earth.jpg', 13, 2, 33, false, null, null, null, 4),

  ];
}