const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Song = require('../models/song');

router
//List of song name, artist, genre, playlist creator
    .get('/', (req, res, next) => {
      Song.find()
            .select('name artists spotifySongId playlists links')
            .populate({
              path: 'playlists',
              select: 'name creator'
            })
            .lean()
            .then(songs => res.send(songs ))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
      Song.findById(req.params.id)
        .select('name artists spotifySongId playlists links')
        .populate({
          path: 'playlists',
          select: 'name creator'
        })
        .lean()
        .then(song => res.send(song))
        .catch(next);
    })
    .post('/', jsonParser, (req, res, next) => {
      new Song(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
    })
    .put('/:id', jsonParser, (req, res, next) => {
      Song.findByIdAndUpdate(req.params.id, req.body, {new : true})
        .then(updated => res.send(updated))
        .catch(next);
    })
    .put('/:songId/playlists/:playlistId', (req, res, next) => {
      Song.findById(req.params.songId)
        .then(song => {
          song.playlists.push(req.params.playlistId);
          return song.save();
        })
        .then(saved => res.send(saved))
        .catch(next);
    })
    .delete('/:id', (req, res, next) => {
      Song.removeById(req.params.id)
        .then(() => res.send('Song deleted from DB'))
        .catch(next);
    })
    // YOLO!
    .delete('/', (req, res, next) => {
      Song.remove()
      .then(() => res.send('All songs deleted!'))
      .catch(next);
    });

module.exports = router;
