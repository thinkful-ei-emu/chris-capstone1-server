# Mobile Bookshelf API

This server was built for the Mobile Bookshelf application. Mobile Bookshelf allows users to compile information on all of the books that they are reading across various mediums (print, ebook, website, etc) in one database.

The server currently accepts 4 routes:<br />
**api/auth**<br />
    (POST '/' - creating login credentials)<br />
**api/users/**<br />
    (POST '/' - checking and authenticating login credentials)<br />
**api/books**<br />
    (GET '/' - all books)<br />
    (GET '/user/books' - user specific books)<br />
    (POST '/user/books' - user specific book)<br />
    (GET '/user/books/:id' - specific book)<br />
    (PATCH '/user/books/:id' - update book)<br />
    (DELETE '/user/books/:id' - delete book)<br />
    (GET '/user/books/:book_id/rating - rating for a specific book)<br />
**api/ratings**<br />
    (GET '/' - all ratings on a users books)<br />
    (POST '/' - add a new rating to a book)<br />
    (DELETE '/:id' - delete rating)<br />

Functions for each route are stored in the controllers folder in their respective files.

Database communications are in the services' files.

Below is a link to the live client.

## Live API: 
https://chris-mobile-bookshelf-app.now.shhttps://nameless-dusk-62231.herokuapp.com/

## Tech Stack:

**FrontEnd**: HTML, CSS, JavaScrypt, React

**Back-End**: NodeJS, Express

**Testing**: Jest, Enzyme, Chai, Mocha, Supertest

**Security**: JWT, XSS, Bcrypt

**Database System**: PostgreSQL

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
