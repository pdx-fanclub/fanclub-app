const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser').json();
const Song = require('../models/song');

router
//List of song name, artist, genre, playlist creator
    .get('/', (req, res, next) => {
      Song.find()
            .select('name artist genre playlists')
            .populate({
              path: 'playlists',
              select: 'creator'
            })
            .lean()
            .then(songs => res.send(songs ))
            .catch(next);
    });

module.exports = router;