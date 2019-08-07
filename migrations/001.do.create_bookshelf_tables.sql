CREATE TABLE bookshelf_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  date_created  TIMESTAMPTZ NOT NULL DEFAULT now(),
  date_modified  TIMESTAMPTZ
);

CREATE TYPE bookshelf_list AS ENUM (
  'wishlist',
  'reading',
  'read'
);

CREATE TYPE source_type AS ENUM (
  'Print',
  'Kindle',
  'Nook',
  'Website',
  'Magazine',
  'Journel',
  'Audiobook',
  'Other eBook Source',
  'Other'
);

CREATE TYPE book_genre AS ENUM (
  'Action and Adventure',
  'Alternate history',
  'Anthology',
  'Childrens book',
  'Comic book',
  'Coming-of-age',
  'Crime',
  'Drama',
  'Fairytale',
  'Fantasy',
  'Graphic novel',
  'Historical fiction',
  'Horror',
  'Mystery',
  'Paranormal romance',
  'Picture book',
  'Poetry',
  'Political thriller',
  'Romance',
  'Satire',
  'Science fiction',
  'Short story',	
  'Suspense',
  'Thriller',
  'Young adult',
  'Art',
  'Autobiography',
  'Biography',
  'Book review',
  'Cookbook',
	'Diary',
  'Dictionary',
  'Encyclopedia',
  'Guide',
  'Health',
  'History',
  'Journal',
  'Math',
  'Memoir',
  'Prayer',
  'Religion, spirituality, and new age',
  'Textbook',
	'Review',
  'Science',
  'Self help',
  'Travel',
  'True crime'
);

CREATE TABLE bookshelf_books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  list bookshelf_list NOT NULL,
  book_source source_type NOT NULL,
  genre book_genre NOT NULL,
  book_report TEXT,
  image TEXT,
  rating integer,
  likes integer DEFAULT 0,
  dislikes integer DEFAULT 0,
  recommended boolean DEFAULT false,
  poster_rating integer,
  poster_report text,
  poster_id INTEGER
    REFERENCES bookshelf_users(id) ON DELETE CASCADE,
  date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id INTEGER
        REFERENCES bookshelf_users(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE bookshelf_comments (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  rating INTEGER,
  book_id INTEGER
    REFERENCES bookshelf_books(id) ON DELETE CASCADE NOT NULL,
  poster_id INTEGER
    REFERENCES bookshelf_users(id) ON DELETE CASCADE NOT NULL,
  date_created  TIMESTAMPTZ NOT NULL DEFAULT now()
);