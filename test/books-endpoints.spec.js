/*global supertest, expect */

const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Books Endpoints', function() {
  let db;
  
  const {
    testUsers,
    testBooks
  } = helpers.makeBooksFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });
  
  after('disconnect from db', () => db.destroy());
  
  before('cleanup', () => helpers.cleanTables(db));
  
  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/books/', () => {
    context('Given no books', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/books')
          .expect(200, []);
      });
    });
    context('Given there are things in the database', () => {
      beforeEach('insert books', () =>
        helpers.seedBooksTables(
          db,
          testUsers,
          testBooks
        ));
      it('responds with 200 and all of the books', () => {
        const expectedBooks = testBooks.map(book =>
          helpers.makeExpectedBook(
            testUsers,
            book
          ));
        return supertest(app)
          .get('/api/books')
          .expect(200, expectedBooks);
      });
    });

    context('Given an XSS attack book', () => {
      const testUser = helpers.makeUsersArray()[1];
      const {
        maliciousBook,
        expectedBook
      } = helpers.makeMaliciousBook(testUser);

      beforeEach('insert malicious thing', () => {
        return helpers.seedMaliciousBook(
          db,
          testUser,
          maliciousBook
        );
      });

      it('removes XSS attack content', () => {
        return supertest(app)
          .get('/api/books')
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedBook.title);
            expect(res.body[0].content).to.eql(expectedBook.content);
          });
      });
    });
  });

  describe('GET /api/books/user/books/', () => {
    context('Given no books', () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/books/user/books/')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });
    context('Given there are things in the database', () => {
      beforeEach('insert books', () =>
        helpers.seedBooksTables(
          db,
          testUsers,
          testBooks
        ));
      it('responds with 200', () => {
        return supertest(app)
          .get('/api/books/user/books/')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200);
      });
    });
  
    context('Given an XSS attack book', () => {
      const testUser = helpers.makeUsersArray()[1];
      const {
        maliciousBook,
        expectedBook
      } = helpers.makeMaliciousBook(testUser);
  
      beforeEach('insert malicious thing', () => {
        return helpers.seedMaliciousBook(
          db,
          testUser,
          maliciousBook
        );
      });
  
      it('removes XSS attack content', () => {
        return supertest(app)
          .get('/api/books/user/books/')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedBook.title);
            expect(res.body[0].content).to.eql(expectedBook.content);
          });
      });
    });
  });
  describe('POST /api/books/user/books', () => {
    beforeEach(() => helpers.seedUsers(db, testUsers));
    it('creates a new book, responding with 201 and the book', () => {
      const testUser = testUsers[3];
      const newBook = {
        title: 'test book 5',
        author: 'test author 5',
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
        poster_id: null
      };
      return supertest(app)
        .post('/api/books/user/books')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newBook)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id');
          expect(res.body.rating).to.eql(newBook.rating);
          expect(res.body.author).to.eql(newBook.author);
          expect(res.body.title).to.eql(newBook.title);
          expect(res.headers.location).to.eql(`/api/books/user/books/${res.body.id}`);
        })
        .expect(res =>
          db
            .from('bookshelf_books')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.title).to.eql(newBook.title);
              expect(row.rating).to.eql(newBook.rating);
              expect(row.author).to.eql(newBook.author);
            })
        );
    });
  });
  describe('GET /api/books/user/books/:book_id', () => {
    context('Given no books', () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));
      it('responds with 404', () => {
        return supertest(app)
          .get('/api/books/user/books/1')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: 'Book doesn\'t exist' });
      });
    });
    context('Given there are things in the database', () => {
      beforeEach('insert books', () =>
        helpers.seedBooksTables(
          db,
          testUsers,
          testBooks
        ));
      it('responds with 404 when the book isn\'t that users\' book', () => {
        return supertest(app)
          .get('/api/books/user/books/1')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404);
      });
      it('responds with 200 when the book is that users\' book', () => {
        return supertest(app)
          .get('/api/books/user/books/3')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200);
      });
    });
    context('Given an XSS attack thing', () => {
      const testUser = helpers.makeUsersArray()[1];
      const {
        maliciousBook,
        expectedBook,
      } = helpers.makeMaliciousBook(testUser);
  
      beforeEach('insert malicious book', () => {
        return helpers.seedMaliciousBook(
          db,
          testUser,
          maliciousBook
        );
      });
  
      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/books/user/books/${maliciousBook.id}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedBook.title);
            expect(res.body.content).to.eql(expectedBook.content);
          });
      });
    });  
  });
  describe('DELETE /api/books/user/books/:book_id', () => {
    context('Given no books', () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));
      it('responds with 404', () => {
        return supertest(app)
          .delete('/api/books/user/books/1')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: 'Book doesn\'t exist' });
      });
    });
    context('Given there are things in the database', () => {
      beforeEach('insert books', () =>
        helpers.seedBooksTables(
          db,
          testUsers,
          testBooks
        ));
      it('responds with 404 when the book isn\'t that users\' book', () => {
        return supertest(app)
          .delete('/api/books/user/books/1')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404);
      });
      it('responds with 204 when the book is that users\' book', () => {
        return supertest(app)
          .delete('/api/books/user/books/3')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(204);
      });
    });
  });
  describe('PATCH /api/books/user/books/:book_id',() => {
    context('Given no books', () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));
      it('returns a 404', () => {
        return supertest(app)
          .patch('/api/books/user/books/1')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: 'Book doesn\'t exist' });
      });
    });
    context('Given there are books', () => {
      beforeEach('insert books', () =>
        helpers.seedBooksTables(
          db,
          testUsers,
          testBooks
        ));
      it('responds with a 204 and updated book', () => {
        const testUser = testUsers[0];
        const idToUpdate = testBooks[2].id;
        const updatedBook = {
          title: 'test book 5',
          author: 'test author 5',
          list: 'wishlist',
          book_source: 'Print',
          genre: 'Fantasy',
          book_report: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
        };
        const expectedBook = {
          ...testBooks[2],
          ...updatedBook
        };
        return supertest(app)
          .patch('/api/books/user/books/3')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(updatedBook)
          .expect(204)
          .then(res =>
            supertest(app)
              .get('/api/books/user/books/3')
              .set('Authorization', helpers.makeAuthHeader(testUser))
              .expect(200));
      });
      it('responds with 400 when no required fields are added', () => {
        const testUser = testUsers[0];
        return supertest(app)
          .patch('/api/books/user/books/3')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send({ nothing: 'nobody' })
          .expect(400, { error: { message: 'Request body must contain information fields' }});
      });
    });
  });
});