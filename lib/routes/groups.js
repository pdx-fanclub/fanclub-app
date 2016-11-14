const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser').json();
const Group = require('../models/group');

router
//List of groups with their description and members
    .get('/', (req, res, next) => {
      Group.find()
            .select('groupName description memberId')
            .populate({
              path: 'memberId',
              select: 'username'
            })
            .lean()
            .then(groups => res.send(groups ))
            .catch(next);
    });

module.exports = router;