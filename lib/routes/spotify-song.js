const spotifyApi = 'https://api.spotify.com/v1';
const oauthToken = process.env.TOKENME;
const router = require('express').Router();
// prefer descriptive name over abreviating npm package name
const request = require('request-promise');
const Song = require('../models/song');
// const Playlist = require('../models/playlist');


router
  // .get('/get-song', (req, res, next) => {
    // request(`${spotifyApi}/tracks/6lFfwR8W6Ha4cA7kvmclcv?access_token=${oauthToken}`)
  //     .then(data => {
  //       var songData = new Song();
  //       const spotifyData = JSON.parse(data);
  //       songData.name = spotifyData.name;
  //       songData.artists = [];
  //       spotifyData.artists.forEach(artists => {
  //         songData.artists.push(artists.name);
  //       });
  //       songData.save();
  //       console.log(songData);
  //       res.send(songData);
  //
  //     })
  //     .catch(next);
  // });

  // "get" is already in the http method, so don't put in your url
  .get('/get-song/:id', (req, res, next) => {
    request(`${spotifyApi}/tracks/${req.params.id}?access_token=${oauthToken}`)
      .then(data => {
        var songData = new Song();
        const spotifyData = JSON.parse(data);
        songData.name = spotifyData.name;
        songData.spotifySongId = spotifyData.id;
        songData.artists = spotifyData.artists.map(artist => artist.name);
        songData.save();
        res.send(songData);
      })
      .catch(next);
  });
  // .get('get-songs/playlists/', (req, res, next) => {
  //   Playlist.find()
  //     .select()
  //     .then(playlist => res.send(playlist))
  //     .catch(next);
  // });
  //


module.exports = router;
