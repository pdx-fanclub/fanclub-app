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
      console.log(query);
      Promise.all([
        Playlist.find()
          .select('name creator genres taggedArtists')
          .populate({
            path: 'creator',
            select: 'username'
          })
          .lean(),
        Playlist.find({genres: query.genre})
          .select('name creator genres taggedArtists')
          .populate({
            path: 'creator',
            select: 'username'
          })
          .lean(),
        Playlist.find({taggedArtists: query.artist})
            .select('name creator genres taggedArtists')
            .populate({
              path: 'creator',
              select: 'username'
            })
            .lean(),
      ])
            .then(([all, byGenre, byArtist]) => {
              if(query.genre) res.send(byGenre);
              if(query.artist) res.send(byArtist);
              else res.send(all);
            })
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
    .delete('/:id', (req, res, next) => {
      Playlist.remove({_id : req.params.id})
        .then(() => res.send('playlist deleted'))
        .catch(next);
    });

module.exports = router;
