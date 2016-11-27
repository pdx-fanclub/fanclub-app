const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Playlist = require('../models/playlist');
const Song = require('../models/song');

router

    .get('/', (req, res, next) => {
      const query = {};

      if(req.query.genre) {
        query.genre = req.query.genre;
      }
      if(req.query.artist) {
        query.artist = req.query.artist;
      }
      // Your code is running three queries every time,
      // (and one of those queries gets all the data)
      // just pass in the query object:
      Playlist.find(query)
        .select('name creator genres taggedArtists')
        .populate({
          path: 'creator',
          select: 'username'
        })
        .lean()
        .then(playlists => res.send(playlists))
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
    })
    .put('/:playlistId/songs/:songId', (req, res, next) => {
      Song.findById(req.params.songId)
      .then(song => {
        song.playlists.push(req.params.playlistId);
        return song.save();
      })
      .then(song => res.send(song))
      .catch(next);
    })
    .delete('/:id', (req, res, next) => {
      Playlist.remove({_id : req.params.id})
        // don't send back text in a JSON API!
        .then(() => res.send({ success: true }))
        .catch(next);
    });

module.exports = router;
