const router = require('express').Router();
const jsonParser = require('body-parser').json();
// const url =  require('url');

const queryString = require('query-string');

router
    .get('/', (req, res) => {
        // verify if new user exists
        console.log('Coming in to the callback we have: ');

        console.log(req.get('host'));
        console.log(req.originalUrl);
        console.log(req.url);

        console.log('are we here? ');

        const parsed = queryString.parse(location.search);
        console.log(parsed);
        
        // console.log(req.query);
        // console.log(req.query.token_type);
        // console.log(req.query.expires_in);
        // console.log(url.parse(req));

        res.send('success!');

    });

module.exports = router;