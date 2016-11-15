const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Group = require('../models/group');
const User = require('.../models/user');

router
//List of groups with their description and members (or just one)
    .get('/', (req, res, next) => {
      const query = {};

      if(req.query.groupName) query.groupName = req.query.groupName;
      Group.find(query)
            .select('groupName description memberId')
            .populate({
              path: 'memberId',
              select: 'username'
            })
            .lean()
            .then(groups => res.send(groups ))
            .catch(next);
    })
    //id's throughout are Mongo id's
    .get('/:id', (req, res, next) => {
      Group.findById(req.params.id)
            .then(group => res.send(group ))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
      Group.removeById(req.params.id)
            .then(deleted => res.send(deleted ))
            .catch(next);
    })
    .post('/', bodyParser, (req, res, next) => {
      new Group(req.body).save()
            .then(saved => res.send(saved ))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
      Group.findByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
    })

  //"joins" user with group
  .put('/:groupId/users/:userId', bodyParser, (req, res, next) => {
    User.findById(req.params.userId)
            .then(user => {
              user.groupId = req.params.groupId;
              return user.save();
            })
            .then(user => res.send(user))
            .catch(next);
  });

module.exports = router;
