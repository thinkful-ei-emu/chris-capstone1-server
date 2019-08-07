BEGIN;

TRUNCATE
  bookshelf_comments,
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
  -- ('dunder', 'Dunder Mifflin', null, 'password'),
  -- ('b.deboop', 'Bodeep Deboop', 'Bo', 'bo-password'),
  -- ('c.bloggs', 'Charlie Bloggs', 'Charlie', 'charlie-password'),
  -- ('s.smith', 'Sam Smith', 'Sam', 'sam-password'),
  -- ('lexlor', 'Alex Taylor', 'Lex', 'lex-password'),
  -- ('wippy', 'Ping Won In', 'Ping', 'ping-password');

INSERT INTO bookshelf_books   (title, author, list, book_source, image, rating, likes, dislikes, recommended, poster_rating, poster_report, poster_id, user_id)

VALUES
  ('Disappearing Earth', 'Julia Phillips', 'wishlist', 'Print', 
    'https://media.vanityfair.com/photos/5d1662c85f741a0008ed05e1/master/w_800%2Cc_limit/best-books-of-2019-Disappearing-Earth.jpg', 13, 2, 33, false, null, null, null, 4),
  ('All That You Leave Behind', 'Erin Lee Carr', 'read', 'Kindle', 
    'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d9/master/w_800%2Cc_limit/best-books-2019-All-That-You-Leave-Behind.jpg', 79, 1, 88, true, 94, 'Best book Ever!!', 2, 1),
  ('Go Ahead in the Rain: Notes to A Tribe Called Quest', 
    'Hanif Abdurraqib', 'reading', 'Print', 'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d8/master/w_800%2Cc_limit/best-books-2019-Go-Ahead-in-the-Rain.jpg', 97, 0, 1, true, 94, 'Best time you will have with a book', 2, 3),
  ('The Dragonfly Sea', 'Yvonne Adhiambo Owuor', 'wishlist', 'Kindle', '', 45, 28, 3, false, null, null, null, 5),
  ('The National Team: The Inside Story of the Women Who Changed Soccer', 'Caitlin Murray', 'reading', 'Website', 'https://media.vanityfair.com/photos/5d1662c65f741a0008ed05dd/master/w_800%2Cc_limit/best-books-2019-The-National-Team.jpg', 65, 5, 0, true, 94, 'Best in my lifetime!!', 4, 3),
  ('The New Me', 'Halle Butler', 'wishlist', 'Audiobook', '', 82, 33, 36, false, null, null, null , 6),
  ('Disappearing Earth', 'Julia Phillips', 'wishlist', 'Print', 'https://media.vanityfair.com/photos/5d1662c85f741a0008ed05e1/master/w_800%2Cc_limit/best-books-of-2019-Disappearing-Earth.jpg', 13, 2, 33, false, null, null, null, 3),
  ('All That You Leave Behind', 'Erin Lee Carr', 'read', 'Kindle', 'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d9/master/w_800%2Cc_limit/best-books-2019-All-That-You-Leave-Behind.jpg', 79, 1, 88, true, 94, 'Best book Ever!!', 6, 5),
  ('Go Ahead in the Rain: Notes to A Tribe Called Quest', 'Hanif Abdurraqib', 'reading', 'Print', 'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d8/master/w_800%2Cc_limit/best-books-2019-Go-Ahead-in-the-Rain.jpg', 97, 0, 1, true, 94, 'Best time you will have with a book', 3, 5),
  ('The Dragonfly Sea', 'Yvonne Adhiambo Owuor', 'wishlist', 'Kindle', '', 45, 28, 3, false, null, null, null, 1),
  ('The National Team: The Inside Story of the Women Who Changed Soccer', 'Caitlin Murray', 'reading', 'Website', 'https://media.vanityfair.com/photos/5d1662c65f741a0008ed05dd/master/w_800%2Cc_limit/best-books-2019-The-National-Team.jpg', 65, 5, 0, true, 94, 'Best in my lifetime!!', 1, 2),
  ('The New Me', 'Halle Butler', 'wishlist', 'Audiobook', '', 82, 33, 36, false, null, null, null, 2),
  ('Disappearing Earth', 'Julia Phillips', 'wishlist', 'Print', 'https://media.vanityfair.com/photos/5d1662c85f741a0008ed05e1/master/w_800%2Cc_limit/best-books-of-2019-Disappearing-Earth.jpg', 13, 2, 33, false, null, null, null, 5),
  ('All That You Leave Behind', 'Erin Lee Carr', 'read', 'Kindle', 'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d9/master/w_800%2Cc_limit/best-books-2019-All-That-You-Leave-Behind.jpg', 79, 1, 88, true, 94, 'Best book Ever!!', 4, 3),
  ('Go Ahead in the Rain: Notes to A Tribe Called Quest', 'Hanif Abdurraqib', 'reading', 'Print', 'https://media.vanityfair.com/photos/5d1662c45f741a0008ed05d8/master/w_800%2Cc_limit/best-books-2019-Go-Ahead-in-the-Rain.jpg', 97, 0, 1, true, 94, 'Best time you will have with a book', 3, 4),
  ('The Dragonfly Sea', 'Yvonne Adhiambo Owuor', 'wishlist', 'Kindle', '', 45, 28, 3, false, null, null, null, 3),
  ('The National Team: The Inside Story of the Women Who Changed Soccer', 'Caitlin Murray', 'reading', 'Website', 'https://media.vanityfair.com/photos/5d1662c65f741a0008ed05dd/master/w_800%2Cc_limit/best-books-2019-The-National-Team.jpg', 65, 5, 0, true, 94, 'Best in my lifetime!!', 5, 6),
  ('The New Me', 'Halle Butler', 'wishlist', 'Audiobook', '', 82, 33, 36, false, null, null, null, 4);

INSERT INTO bookshelf_comments (
  text,
  rating,
  book_id,
  poster_id
) VALUES
  (
    'This thing is amazing.',
    4,
    1,
    2
  ),
  (
    'Put a bird on it!',
    4,
    1,
    3
  ),
  (
    'All the other reviewers are obviously insane, but this thing is actually pretty amazing.',
    5,
    1,
    4
  ),
  (
    'When life gives you lemons, trade them for this thing.',
    4,
    1,
    5
  ),
  (
    'This cured my psoriasis, but left me unable to tell the difference between the taste of squash and the concept of increasing.',
    3,
    2,
    6
  ),
  (
    'I think I swallowed a bug.',
    1,
    2,
    1
  ),
  (
    'I have not used it or even seen it, and I do not actually know what it is. I do not know why I am writing this review, how I got here, or what my name is. Three stars!',
    3,
    2,
    3
  ),
  (
    'Ew.',
    1,
    4,
    6
  ),
  (
    'I heard about this one time at band camp.',
    3,
    4,
    4
  ),
  (
    'big time many goodness!!!',
    5,
    10,
    3
  ),
  (
    'Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam!',
    2,
    10,
    5
  ),
  (
    'There are some better things. There are also some worse things.',
    3,
    7,
    1
  ),
  (
    'Great holiday present for extraterrestrials (only the kind with the lightbulb heads).',
    4,
    7,
    2
  ),
  (
    'It does not say this on the label, but this thing can be used to summon rain on the spring equinox with the proper incantation.',
    3,
    7,
    3
  ),
  (
    'Do not believe the hype!',
    1,
    7,
    4
  ),
  (
    'I would rather have a shoulder rub.',
    3,
    9,
    6
  ),
  (
    'I heard this has lead in it! Run! RRUUUUUUNNNN!',
    1,
    6,
    5
  ),
  (
    'This would not fit inside the cabin of my horse-and-buggy, but it was a useful bribe after the string cheese incident.',
    4,
    6,
    1
  ),
  (
    'Slightly better than waking up deep in the forests of Madagascar and having no idea how you got there, but not THAT much better.',
    3,
    8,
    2
  ),
  (
    'Octopii give it eight tentacles up!',
    5,
    8,
    4
  );

COMMIT;
