/*global supertest, expect*/
const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Books Endpoints', function() {
  let db;
  
  const {
    testUsers,
    TestBooks,
    TestComments,
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

  describe('Protected endpoints', () => {
    beforeEach('insert books', () =>
      helpers.seedBooksTables(
        db,
        testUsers,
        TestBooks,
        TestComments
      )
    );
    
    const protectedEndpoints = [
      {
        name: 'GET /api/books/user/books/',
        path: '/api/books/user/books',
        method: supertest(app).get
      },
      {
        name: 'POST /api/books/user/books/',
        path: '/api/books/user/books/',
        method: supertest(app).post
      },
      {
        name: 'GET /api/books/user/books/:book_id',
        path: '/api/books/user/books/:book_id',
        method: supertest(app).get
      },
      {
        name: 'DELETE /api/books/user/books/:book_id',
        path: '/api/books/user/books/:book_id',
        method: supertest(app).delete
      },
      {
        name: 'PATCH /api/books/user/books/:book_id',
        path: '/api/books/user/books/:book_id',
        method: supertest(app).patch
      }
    ];
  
    protectedEndpoints.forEach(endpoint => {
      describe(endpoint.name, () => {
        it('responds with 401 \'Missing bearer token\' when no bearer token', () => {
          return endpoint.method(endpoint.path)
            .expect(401, { error: 'Missing bearer token' });
        });
     
  
        it('responds 401 \'Unauthorized request\' when invalid JWT secret', () => {
          const validUser = testUsers[0];
          const invalidSecret = 'bad-secret';
          return endpoint.method(endpoint.path)
            .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
            .expect(401, { error: 'Unauthorized request' });
        });
  
        it('responds 401 \'Unauthorized request\' when invalid sub in payload', () => {
          const invalidUser = { user_name: 'user-not-existy', id: 1 };
          return endpoint.method(endpoint.path)
            .set('Authorization', helpers.makeAuthHeader(invalidUser))
            .expect(401, { error: 'Unauthorized request' });
        });
      });
    });
  });
});