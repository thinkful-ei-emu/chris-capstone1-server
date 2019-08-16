BEGIN;

TRUNCATE
  bookshelf_bookrating,
  bookshelf_books,
  bookshelf_users
  RESTART IDENTITY CASCADE;

INSERT INTO bookshelf_users (user_name, full_name, email, password)
VALUES
  ('dunder', 'Dunder Mifflin', 'dunder@gmail.com', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  ('b.deboop', 'Bodeep Deboop', 'Bo@gmail.com', '$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie@gmail.com', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK'),
  ('s.smith', 'Sam Smith', 'Sam@gmail.com', '$2a$12$/4P5/ylaB7qur/McgrEKwuCy.3JZ6W.cRtqxiJsYCdhr89V4Z3rp.'),
  ('lexlor', 'Alex Taylor', 'Lex@gmail.com', '$2a$12$Hq9pfcWWvnzZ8x8HqJotveRHLD13ceS7DDbrs18LpK6rfj4iftNw.'),
  ('wippy', 'Ping Won In', 'Ping@gmail.com', '$2a$12$ntGOlTLG5nEXYgDVqk4bPejBoJP65HfH2JEMc1JBpXaVjXo5RsTUu');

INSERT INTO bookshelf_books   (title, author, list, book_source, image, rating,  recommended, poster_rating, poster_report, poster_id, user_id, genre)

VALUES
  ('Disappearing Earth', 'Julia Phillips', 'wishlist', 'Print', 
  'https://media.vanityfair.com/photos/5d1662c85f741a0008ed05e1/master/w_800%2Cc_limit/best-books-of-2019-Disappearing-Earth.jpg', 13,  false, null, null, null, 4, 'Fairytale'),
  ('All That You Leave Behind', 'Erin Lee Carr', 'read', 'Kindle', 
  'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d9/master/w_800%2Cc_limit/best-books-2019-All-That-You-Leave-Behind.jpg', 79, true, 94, 'Best book Ever!!', 2, 1, 'Fairytale'),
  ('Go Ahead in the Rain: Notes to A Tribe Called Quest', 'Hanif Abdurraqib', 'reading', 'Print', 
  'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d8/master/w_800%2Cc_limit/best-books-2019-Go-Ahead-in-the-Rain.jpg', 97, true, 94, 'Best time you will have with a book', 2, 3, 'Fairytale'),
  ('The Dragonfly Sea', 'Yvonne Adhiambo Owuor', 'wishlist', 'Kindle', 
  '', 45, false, null, null, null, 5, 'Fairytale'),
  ('The National Team: The Inside Story of the Women Who Changed Soccer', 'Caitlin Murray', 'reading', 'Website', 
  'https://media.vanityfair.com/photos/5d1662c65f741a0008ed05dd/master/w_800%2Cc_limit/best-books-2019-The-National-Team.jpg', 65, true, 94, 'Best in my lifetime!!', 4, 3, 'Fairytale'),
  ('The New Me', 'Halle Butler', 'wishlist', 'Audiobook', 
  '', 82, false, null, null, null , 6, 'Fairytale'),
  ('Disappearing Earth', 'Julia Phillips', 'wishlist', 'Print', 
  'https://media.vanityfair.com/photos/5d1662c85f741a0008ed05e1/master/w_800%2Cc_limit/best-books-of-2019-Disappearing-Earth.jpg', 13, false, null, null, null, 3, 'Fairytale'),
  ('All That You Leave Behind', 'Erin Lee Carr', 'read', 'Kindle', 
  'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d9/master/w_800%2Cc_limit/best-books-2019-All-That-You-Leave-Behind.jpg', 79, true, 94, 'Best book Ever!!', 6, 5, 'Fairytale'),
  ('Go Ahead in the Rain: Notes to A Tribe Called Quest', 'Hanif Abdurraqib', 'reading', 'Print', 
  'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d8/master/w_800%2Cc_limit/best-books-2019-Go-Ahead-in-the-Rain.jpg', 97, true, 94, 'Best time you will have with a book', 3, 5, 'Fairytale'),
  ('The Dragonfly Sea', 'Yvonne Adhiambo Owuor', 'wishlist', 'Kindle', 
  '', 45, false, null, null, null, 1, 'Fairytale'),
  ('The National Team: The Inside Story of the Women Who Changed Soccer', 'Caitlin Murray', 'reading', 'Website', 
  'https://media.vanityfair.com/photos/5d1662c65f741a0008ed05dd/master/w_800%2Cc_limit/best-books-2019-The-National-Team.jpg', 65, true, 94, 'Best in my lifetime!!', 1, 2, 'Fairytale'),
  ('The New Me', 'Halle Butler', 'wishlist', 'Audiobook', 
  '', 82, false, null, null, null, 2, 'Fairytale'),
  ('Disappearing Earth', 'Julia Phillips', 'wishlist', 'Print', 
  'https://media.vanityfair.com/photos/5d1662c85f741a0008ed05e1/master/w_800%2Cc_limit/best-books-of-2019-Disappearing-Earth.jpg', 13, false, null, null, null, 5, 'Fairytale'),
  ('All That You Leave Behind', 'Erin Lee Carr', 'read', 'Kindle', 
  'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d9/master/w_800%2Cc_limit/best-books-2019-All-That-You-Leave-Behind.jpg', 79, true, 94, 'Best book Ever!!', 'Fairytale'),
  ('Go Ahead in the Rain: Notes to A Tribe Called Quest', 'Hanif Abdurraqib', 'reading', 'Print', 
  'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d8/master/w_800%2Cc_limit/best-books-2019-Go-Ahead-in-the-Rain.jpg', 97, true, 94, 'Best time you will have with a book', 3, 4, 'Fairytale'),
  ('The Dragonfly Sea', 'Yvonne Adhiambo Owuor', 'wishlist', 'Kindle', 
  '', 45, false, null, null, null, 3, 'Fairytale'),
  ('The National Team: The Inside Story of the Women Who Changed Soccer', 'Caitlin Murray', 'reading', 'Website', 
  'https://media.vanityfair.com/photos/5d1662c65f741a0008ed05dd/master/w_800%2Cc_limit/best-books-2019-The-National-Team.jpg', 65, true, 94, 'Best in my lifetime!!', 5, 6, 'Fairytale'),
  ('The New Me', 'Halle Butler', 'wishlist', 'Audiobook', 
  '', 82, false, null, null, null, 4, 'Fairytale');

INSERT INTO bookshelf_bookrating (rating, book_id, poster_id) VALUES
(82, 1, 1),
(82, 1, 2),
(95, 1, 3),
(45, 1, 5),
(45, 1, 6),
(45, 2, 2),
(50, 2, 6),
(50, 3, 4),
(50, 4, 2),
(55, 5, 2),
(95, 3, 1),
(95, 4, 5),
(95, 5, 3),
(95, 6, 5),
(95, 7, 6),
(55, 2, 5),
(55, 2, 4),
(60, 3, 2),
(60, 4, 1),
(90, 8, 1),
(90, 9, 2),
(90, 10, 3),
(90, 11, 5),
(90, 12, 6),
(85, 13, 1),
(85, 14, 2),
(85, 15, 3),
(85, 16, 5),
(97, 17, 6),
(97, 18, 1),
(60, 10, 2),
(60, 11, 4),
(70, 12, 5),
(70, 13, 2),
(70, 14, 1),
(40, 15, 2),
(40, 16, 4),
(40, 17, 5);
  

COMMIT;
