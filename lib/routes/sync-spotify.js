const spotifyApi = 'https://api.spotify.com/v1';
const oauthToken = 'BQD8IMCt-dAKKPYw6S-LwIyn2HBnjmOXSmgryUy1B4UUR9-2cjXtmHKwK8SqSmTShr3sdQ4MAgLeoLGzqMLqG3E3u4_fzWjfDQijCLrgLKPje_AEXVmmsqEX5kXhvQhRcQYLQ3v1s6Berwek';
const router = require('express').Router();
const rp = require('request-promise');
const spotifyUser = 'spotify';
const userPlaylists = [ '5FJXhjdILmRA2z5bvz4nzf',
  '5yolys8XG4q7YfjYGl5Lff',
  '1GQLlzxBxKTb6tJsD4RxHI',
  '16BpjqQV1Ey0HeDueNDSYz',
  '48NHEPmr0oOahbhYcAeNcj' ];

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
  //we now have an array of all user playlist ids
  .get('/get-playlist-tracks', (req, res, next) => {
    Promise.all(userPlaylists.map(playlistId => {
      return rp(`${spotifyApi}/users/${spotifyUser}/playlists/${playlistId}/tracks?access_token=${oauthToken}`);
    }))
      .then(data => {
        let arr = [];
        data.forEach(playlist => {
          arr.push(JSON.parse(playlist));
        });
        res.send(arr[0]['items']);
      })
      .catch(next);
  });

module.exports = router;
