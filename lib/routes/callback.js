const router = require('express').Router();
const jsonParser = require('body-parser').json();
// const url =  require('url');
const path = require('path');

// const queryString = require('query-string');

router
    .get('/', (req, res) => {

        console.log('Authorization Request callback: ', req.get('host'), req.originalUrl, req.url);
        res.sendFile(path.join(__dirname, '../../public', 'callback.html'));

    });

module.exports = router;