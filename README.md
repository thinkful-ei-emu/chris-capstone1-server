# Mobile Bookshelf API

This server was built for the Mobile Bookshelf application. Mobile Bookshelf allows users to compile information on all of the books that they are reading across various mediums (print, ebook, website, etc) in one database.

The server currently accepts 4 routes:
api/auth
    (POST '/' - creating login credentials)
api/users/
    (POST '/' - checking and authenticating login credentials)
api/books
    (GET '/' - all books)
    (GET '/user/books' - user specific books)
    (POST '/user/books' - user specific book)
    (GET '/user/books/:id' - specific book)
    (PATCH '/user/books/:id' - update book)
    (DELETE '/user/books/:id' - delete book)
    (GET '/user/books/:book_id/rating - rating for a specific book)
api/ratings
    (GET '/' - all ratings on a users books)
    (POST '/' - add a new rating to a book)
    (DELETE '/:id' - delete rating)

Functions for each route are stored in the controllers folder in their respective files.

Database communications are in the services' files.

Below is a link to the live client.

## Live Client: 
https://chris-mobile-bookshelf-app.now.sh

## Tech Stack:
FrontEnd: HTML, CSS, JavaScrypt, React
Back-End: NodeJS, Express
Testing: Jest, Enzyme, Chai, Mocha, Supertest
Security: JWT, XSS, Bcrypt
Database System: PostgreSQL

## Screenshots:
LandingPage:
![ScreenShot](https://github.com/thinkful-ei-emu/chris-capstone1-client/blob/master/screenshots/MB_Landing.png)
HomePage: ![ScreenShot](https://github.com/thinkful-ei-emu/chris-capstone1-client/blob/master/screenshots/userhome.png)
SharedHomePage: ![ScreenShot](https://github.com/thinkful-ei-emu/chris-capstone1-client/blob/master/screenshots/sharedhome.png)
BookPage: ![ScreenShot](https://github.com/thinkful-ei-emu/chris-capstone1-client/blob/master/screenshots/bookpage.png)
AddBook: ![ScreenShot](https://github.com/thinkful-ei-emu/chris-capstone1-client/blob/master/screenshots/addbook.png)
Login: ![ScreenShot](https://github.com/thinkful-ei-emu/chris-capstone1-client/blob/master/screenshots/Login_page.png)
Register: ![ScreenShot](https://github.com/thinkful-ei-emu/chris-capstone1-client/blob/master/screenshots/Register_Page.png)

## Scripts:

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.