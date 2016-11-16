const router = require('express').Router();
const jsonParser = require('body-parser').json(); // eslint-disable-line


router
    .get('/', (req, res) => { // eslint-disable-line
        // verify if new user exists
      console.log('Coming in to the callback we have: ');
      console.log('The query is: ',req.query);

        // console.log('attempt token: ',req.token);
        // console.log('attempt refreshToken: ',req.refresh);
        // console.log('attempt token: ',req.expire);

    });

module.exports = router;
