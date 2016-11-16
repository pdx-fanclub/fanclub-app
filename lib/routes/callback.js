const router = require('express').Router();
const jsonParser = require('body-parser').json();
const url =  require('url');


router
    .get('/', (req, res) => {
        // verify if new user exists
        console.log('Coming in to the callback we have: ');
        console.log(req.protocol);
        console.log(req.url);

        
        res.send('hello world');

    });

module.exports = router;