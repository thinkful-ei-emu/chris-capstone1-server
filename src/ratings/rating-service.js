const Treeize = require('treeize');

const RatingService = {
  getAllRatings(db) {
    return db('bookshelf_bookrating AS rat')
      .select(
        'rat.id',
        'rat.poster_id',
        'rat.book_id',
        'rat.rating',
        'rat.date_created',
        ...userFields
      )
      .leftJoin(
        'bookshelf_users AS usr',
        'rat.poster_id',
        'usr.id'
      )
      .groupBy('rat.poster_id', 'rat.book_id', 'usr.id','rat.id','rat.rating','rat.date_created');
  },
  insertRating(db, newRating) {
    return db('bookshelf_bookrating')
      .insert(newRating)
      .returning('*')
      .then(res => res[0]);
  },
  updateRating(db, id, updateRating) {
    return db('bookshelf_bookrating')
      .where({ id })
      .update(updateRating);
  },
  deleteRating(db, id) {    
    return db('bookshelf_bookrating')
      .where({ id })
      .delete();
  },
  getById(db, id) {
    return RatingService.getAllRatings(db)
      .where('rat.id', id)
      .first();
  },
  serializeRatings(ratings) {
    return ratings.map(this.serializeRating);
  },

  serializeRating(rating) {
    const ratingTree = new Treeize();
    const ratingData = ratingTree.grow([ rating ]).getData()[0];

    return {
      id: ratingData.id,
      rating: ratingData.rating,
      book_id: ratingData.book_id,
      poster_id: ratingData.poster_id,
      user: ratingData.user || {},
      date_created: ratingData.date_created,
    };
  },
};

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.email AS user:email',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified'
];
  
module.exports = RatingService;