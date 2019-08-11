DROP TABLE IF EXISTS bookshelf_comments;

CREATE TABLE bookshelf_bookrating (
  id SERIAL,
  rating INTEGER NOT NULL,
  book_id INTEGER
    REFERENCES bookshelf_books(id) ON DELETE CASCADE NOT NULL,
  poster_id INTEGER
    REFERENCES bookshelf_users(id) ON DELETE CASCADE NOT NULL,
  date_created  TIMESTAMPTZ NOT NULL DEFAULT now(),
  primary key (poster_id, book_id)
);