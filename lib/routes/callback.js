const router = require('express').Router();
<<<<<<< HEAD
const jsonParser = require('body-parser').json();
// const url =  require('url');
const path = require('path');
=======
const jsonParser = require('body-parser').json(); // eslint-disable-line
>>>>>>> f9f615776a83f0caebbe2c4e5f3ddb3689d8dd94

// const queryString = require('query-string');

router
<<<<<<< HEAD
    .get('/', (req, res) => {
=======
    .get('/', (req, res) => { // eslint-disable-line
        // verify if new user exists
      console.log('Coming in to the callback we have: ');
      console.log('The query is: ',req.query);
>>>>>>> f9f615776a83f0caebbe2c4e5f3ddb3689d8dd94

        console.log('Authorization Request callback: ', req.get('host'), req.originalUrl, req.url);
        res.sendFile(path.join(__dirname, '../../public', 'callback.html'));

    });

module.exports = router;
