/*global supertest, expect */

const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Books Endpoints', function() {
  let db;
  
  const {
    testUsers,
    testBooks,
    testRatings,
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

  describe('GET /api/ratings/', () => {
    context('Given no ratings', () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/ratings')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200,[]);
      });
    });
    context('Given there are things in the database', () => {
      beforeEach('insert everthing', () =>
        helpers.seedBooksTables(
          db,
          testUsers,
          testBooks,
          testRatings
        ));
      it('responds with 200', () => {
        return supertest(app)
          .get('/api/ratings')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200);
      });
    });
  });
  describe('POST /api/ratings/', () => {
    beforeEach('insert everthing', () =>
      helpers.seedBooksTables(
        db,
        testUsers,
        testBooks,
        testRatings
      ));
    it('responds with 400 when the user has already rated', () => {
      const newRating = {
        rating: 85,
        book_id: 1
      };
      return supertest(app)
        .post('/api/ratings')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newRating)
        .expect(401, {error:'Rating already exists'});
    });
    it('responds with 200 and the rating', () => {
      const newRating = {
        rating: 85,
        book_id: 4
      };
      return supertest(app)
        .post('/api/ratings')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newRating)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id');
          expect(res.body.rating).to.eql(newRating.rating);
        });
    });
  });
  describe('GET /api/ratings/:id', () => {
    context('Given no books', () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/ratings/1')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404,{ error: 'Rating doesn\'t exist' });
      });
    });
    context('Given there is stuff in the database', () => {
      beforeEach('insert everthing', () =>
        helpers.seedBooksTables(
          db,
          testUsers,
          testBooks,
          testRatings
        ));
      it('responds with a 404 when the rating isn\'t the users', () => {
        return supertest(app)
          .get('/api/ratings/1')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404);
      });
    });
  });
  describe('PATCH /api/ratings/:id',() => {

  });
  describe('DELETE /api/ratings/:id', () => {
    context('Given no ratings', () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .delete('/api/ratings/1')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, {error: 'Rating doesn\'t exist'});
      });
    });
    context('Given there are things in the database', () => {
      beforeEach('insert everthing', () =>
        helpers.seedBooksTables(
          db,
          testUsers,
          testBooks,
          testRatings
        ));
      it('resonds with a 404 when the rating isn\'t that users', () => {
        return supertest(app)
          .delete('/api/ratings/7')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404);
      });
      it('responds with 204', () => {
        return supertest(app)
          .delete('/api/ratings/1')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(204);
      });
    });
  });
});