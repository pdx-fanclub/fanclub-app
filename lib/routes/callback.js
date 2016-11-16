const router = require('express').Router();
const jsonParser = require('body-parser').json();
// const url =  require('url');
const path = require('path');

// const queryString = require('query-string');

router
    .get('/', (req, res) => {
        // verify if new user exists
        console.log('Coming in to the callback we have: ');

        console.log(req.get('host'), req.originalUrl, req.url);
        // console.log(req.originalUrl);
        // console.log(req.url);
        res.sendFile(path.join(__dirname, '../../public', 'callback.html'));

    });

module.exports = router;