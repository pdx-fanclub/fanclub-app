const spotifyApi = 'https://api.spotify.com/v1';
const oauthToken = 'you oauth token';
const router = require('express').Router();
const rp = require('request-promise');
const spotifyUser = 'spotify';

router
  .get('/get-playlists', (req, res, next) => {
    rp(`${spotifyApi}/users/${spotifyUser}/playlists?access_token=${oauthToken}`)
      .then(data => res.send(data))
      .catch(next);
  })
  .get('/get-playlist-tracks', (req, res, next) => {
    rp(`${spotifyApi}/users/${spotifyUser}/playlists/59ZbFPES4DQwEjBpWHzrtC/tracks?access_token=${oauthToken}`)
      .then(data => res.send(data))
      .catch(next);
  });

module.exports = router;
