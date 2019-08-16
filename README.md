# Mobile Bookshelf API

Mobile Bookshelf is an full-stack application that allows users to compile information on
all of the books that they are reading across various mediums (print, ebook,
website, etc) in one database. Along with providing a digital bookshelf, there is also
a shared space where you can explore what other users are reading and have read.

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