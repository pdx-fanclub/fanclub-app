const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser').json();
const User = require('../models/user');

router
//List of users with their groups (unsure how favoriteSongs from song.js is created? Could add here?)
    .get('/', (req, res, next) => {
      User.find()
            .select('username groupId')
            .populate({
              path: 'groupId',
              select: 'groupName'
            })
            .lean()
            .then(users => res.send(users ))
            .catch(next);
    });

module.exports = router;