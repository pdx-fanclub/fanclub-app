const spotifyApi = 'https://api.spotify.com/v1';
const oauthToken = 'BQD8IMCt-dAKKPYw6S-LwIyn2HBnjmOXSmgryUy1B4UUR9-2cjXtmHKwK8SqSmTShr3sdQ4MAgLeoLGzqMLqG3E3u4_fzWjfDQijCLrgLKPje_AEXVmmsqEX5kXhvQhRcQYLQ3v1s6Berwek';
const router = require('express').Router();
const rp = require('request-promise');
const spotifyUser = 'spotify';
const userPlaylists = [];

router
  .get('/get-playlists', (req, res, next) => {
    rp(`${spotifyApi}/users/${spotifyUser}/playlists?access_token=${oauthToken}`)
      .then(data => {
        data = JSON.parse(data);
        data['items'].forEach(playlist => {
          userPlaylists.push(playlist['id']);
        });
        console.log(userPlaylists);
        res.send(data['items']);
      })
      .catch(next);
  })
  .get('/get-playlist-tracks', (req, res, next) => {
    rp(`${spotifyApi}/users/${spotifyUser}/playlists/59ZbFPES4DQwEjBpWHzrtC/tracks?access_token=${oauthToken}`)
      .then(data => res.send(data))
      .catch(next);
  });

module.exports = router;
