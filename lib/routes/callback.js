const router = require('express').Router();
const jsonParser = require('body-parser').json();
const url =  require('url');


router
    .get('/', (req, res) => {
        // verify if new user exists
        console.log('Coming in to the callback we have: ');
        console.log(req.protocol + '://' + req.get('host')), req.originalUrl);

        console.log('are we here? ');
        console.log(req.url);
        
        console.log(req.query.access_token);
        console.log(req.query.token_type);
        console.log(req.query.expires_in);
                
        // console.log(url.parse(req));

        res.send('success!');

    });

module.exports = router;