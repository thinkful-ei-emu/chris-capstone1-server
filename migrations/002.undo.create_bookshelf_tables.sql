DROP TABLE IF EXISTS bookshelf_bookrating;
DROP TYPE IF EXISTS ldbutton;

CREATE TABLE IF NOT EXISTS bookshelf_comments (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL,
  book_id INTEGER
    REFERENCES bookshelf_books(id) ON DELETE CASCADE NOT NULL,
  poster_id INTEGER
    REFERENCES bookshelf_users(id) ON DELETE CASCADE NOT NULL,
  date_created  TIMESTAMPTZ NOT NULL DEFAULT now()
);