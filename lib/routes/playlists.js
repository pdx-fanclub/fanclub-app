const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Playlist = require('../models/playlist');
const Song = require('../models/song');

router
//List of playlists with their creators
    .get('/', (req, res, next) => {
      Playlist.find()
            .select('name songs creator')
            .populate({
              path: 'creator',
              select: 'username'
            })
            .lean()
            .then(playlists => res.send(playlists ))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
      const playlistId = req.params.id;
      Promise.all([
        Playlist.findById(playlistId)
          .select('name songs creator')
          .lean(),
        Song.find({playlists: playlistId})
          .select('name artist')
          .lean()
      ])
        .then(([playlist, songs]) => {
          playlist.songs = songs;
          res.send(playlist);
        })
        .catch(next);
    })
    .post('/', jsonParser, (req, res, next) => {
      new Playlist(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
    })
    .put('/:id', jsonParser, (req, res, next) => {
      Playlist.findByIdAndUpdate(req.params.id, req.body, {new : true})
      .then(updated => res.send(updated))
      .catch(next);
    });

module.exports = router;
