const AuthService = require('../auth/auth-service');
const path = require('path');
const UsersService = require('../users/users-services');

const authHelpers = {
  createLoginAuth(req, res, next) {
    const { user_name, password } = req.body;
    const loginUser = { user_name, password };
      
    if(!user_name || !password)
      return res.status(400).json({
        error: 'Incorrect user_name or password'
      });
      
    AuthService.getUserWithName(
      req.app.get('db'),
      loginUser.user_name
    )
      .then(dbUser => {
        if(!dbUser)
          return res.status(400).json({
            error: 'Incorrect user_name or password'
          });
      
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch => {
            if(!compareMatch)
              return res.status(400).json({
                error: 'Incorrect user_name or password'
              });
            const sub = dbUser.user_name;
            const payload = { user_id: dbUser.id };
            res.json({
              authToken: AuthService.createJwt(sub, payload)
            });
          });
      })
      .catch(next);
  },
  checkLogin(req, res, next) {
    const { password, user_name, full_name, email } = req.body;
    for(const field of ['full_name', 'user_name', 'password'])
      if(!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });
      
    const passwordError = UsersService.validatePassword(password);
    if(passwordError)
      return res.status(400).json({ error: passwordError });
      
    UsersService.hasUserWithUserName(
      req.app.get('db'),
      user_name
    )
      .then(hasUserWithUserName => {
        if(hasUserWithUserName)
          return res.status(400).json({ error: 'Username already taken' });
        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_name,
              password: hashedPassword,
              full_name,
              email,
              date_created: 'now()'
            };
      
            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res.status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              });
          });
      })
      .catch(next);
  }
};

module.exports = authHelpers;