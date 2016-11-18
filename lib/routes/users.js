const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bodyParser = require('body-parser').json();

router
//List of users with their groups (unsure how favoriteSongs from song.js is created? Could add here?)
    .get('/', (req, res, next) => {
      User.find()
            .select()
            .populate({
              path: 'groupId',
              select: 'groupName'
            })
            .lean()
            .then(users => res.send(users ))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
      User.findById(req.params.id)
       .select('username groupId')
            .populate({
              path: 'groupId',
              select: 'groupName'
            })
            .lean()
            .then(user => res.send(user ))
            .catch(next);
    })

    // .delete('/:id', (req, res, next) => {
    //   User.removeById(req.params.id)
    //         .then(deleted => res.send(deleted ))
    //         .catch(next);
    // })

    .put('/:id', bodyParser, (req, res, next) => {
      User.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;
