const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser').json();
const Playlist = require('../models/playlist');

router
//List of playlists with their creators
    .get('/', (req, res, next) => {
      Playlist.find()
            .select('name creator')
            .populate({
              path: 'creator',
              select: 'username'
            })
            .lean()
            .then(playlists => res.send(playlists ))
            .catch(next);
    });

module.exports = router;