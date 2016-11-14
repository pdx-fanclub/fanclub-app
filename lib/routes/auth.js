const router = require('express').Router();
const jsonParser = require('body-parser').json();
const User = require('../models/user');
const token = require('../auth/token');
const checkAuth = require('../auth/check-auth')();
// const checkRoles = require('../auth/check-roles');

router
  .post('/validate', checkAuth, (req, res, next) => { //eslint-disable-line
    res.send({validAuth: true});
  })
  .post('/signup', jsonParser, (req, res, next) => {
    const username = req.body.username;
    console.log('USERNAME', username);
    if(!username) {
      return next({
        code: 400,
        message: 'username required'
      });
    }

    User.find({username})
      .count()
      .then(count => {
        if(count > 0) throw {code: 400, message: `${username} is taken`};
        const user = new User(req.body);
        return(user.save);
      })
      .then(user => token.sign(user))
      .then(token => res.send({token}))
      .catch(next);
  })
  .post('/signin', jsonParser, (req, res, next) => {
    const {username} = req.body;
    User.findOne({username})
      .then(user => {
        if(!user) {
          throw({code: 400, message: 'invalid username'});
        }
        return token.sign(user);
      })
      .then(token => res.send({token}))
      .catch(next);
  });

module.exports = router;
