const router = require('express').Router();
const path = require('path');
const jsonParser = require('body-parser').json(); // eslint-disable-line

// const queryString = require('query-string');

router
    .get('/', (req, res) => { // eslint-disable-line
        console.log('Authorization Request callback: ', req.get('host'), req.originalUrl, req.url);
        res.sendFile(path.join(__dirname, '../../public', 'callback.html'));
    });

module.exports = router;
