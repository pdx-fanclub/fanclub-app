const router = require('express').Router();
const jsonParser = require('body-parser').json();
const User = require('../models/user');


router
    .get('/', (req, res) => {
        // verify if new user exists
        console.log('Coming in to the callback we have: ');
        console.log('The query is: ', this.location);
        console.log('Here is the HASH: ', this.location.hash);
       // console.log(res);
       res.send('succees');
        // console.log('attempt token: ',req.token);
        // console.log('attempt refreshToken: ',req.refresh);
        // console.log('attempt token: ',req.expire);

    });

module.exports = router;