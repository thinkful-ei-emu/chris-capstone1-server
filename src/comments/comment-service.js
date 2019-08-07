const xss = require('xss');

const CommentsService = {
  getById(db, id) {
    return db('bookshelf_comments AS comm')
      .select(
        'comm.id',
        'comm.rating',
        'comm.text',
        'comm.date_created',
        'comm.book_id',
        db.raw(
          `row_to_json(
                (SELECT tmp FROM (
                    SELECT
                    usr.id,
                    usr.user_name,
                    usr.full_name,
                    usr.email,
                    usr.date_created,
                    usr.date_modified
                ) tmp)
                ) AS "user"`
        )
      )
      .leftJoin(
        'bookshelf_users AS usr',
        'comm.poster_id',
        'usr.id'
      )
      .where('comm.id', id)
      .first();
  },

  insertComment(db, newComment) {
    return db('bookshelf_comments')
      .insert(newComment)
      .returning('*')
      .then(([comment]) => comment)
      .then(comment => CommentsService.getById(db, comment.id)
      );
  },

  serializeComment(comment) {
    return {
      id: comment.id,
      rating: comment.rating,
      text: xss(comment.text),
      book_id: comment.book_id,
      date_created: comment.date_created,
      user: comment.user || {}
    };
  }
};

module.exports = CommentsService;