const spotifyApi = 'https://api.spotify.com/v1';
const oauthToken = 'BQDzgvxW4SucPo7ILByNgkHM0Q6HZM3-Xwq1JFqA36F-KXAOtEu_mVR7JvK7iI3bOSzXfAdzEjMlSXQUuGFMIUyfS9efmzGf8yRjFP7lLKmn8CivcHw0I8aDruCOoHGeCTqij76iYH55ds5f';
const router = require('express').Router();
const rp = require('request-promise');
const spotifyUser = 'spotify';
const Playlist = require('../models/playlist');
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
          new Playlist({
            name: playlist['name'],
            spotify: {
              id: playlist['id'],
              owner: playlist['owner']['id']
            }
          }).save();
          userPlaylists.push(playlist['id']);
        });
        console.log(userPlaylists);
        res.send(data['items']);
      })
      .catch(next);
  })
  .get('/get-all-playlist-tracks', (req, res, next) => {
    var playlists = []; // eslint-disable-line
    Playlist.find().select('spotify')
      .then(array => {
        playlists = array;
        return Promise.all(array.map(obj => {
          return rp(`${spotifyApi}/users/${spotifyUser}/playlists/${obj['spotify']['id']}/tracks?access_token=${oauthToken}`);
        }));
      })
      .then(data => {
        const arr = [];
        data.forEach(song => arr.push(JSON.parse(song)));
        return arr;
      })
      .then(data => res.send(data))
      .catch(next);
  })
  //we now have an array of all user playlist ids
  .get('/get-playlist-tracks/:id', (req, res, next) => {
    let currPlaylist = {};
    Playlist.findOne({_id: req.params.id})
      .then(playlist => {
        currPlaylist = playlist;
        console.log(currPlaylist);
        const playlistId = playlist.spotify.id;
        return rp(`${spotifyApi}/users/${spotifyUser}/playlists/${playlistId}/tracks?access_token=${oauthToken}`);
      })
      .then(data => {
        const playlistsItems = JSON.parse(data)['items'];
        playlistsItems.forEach(song => {
          currPlaylist.spotify.songIds.push(song['track']['id']);
        });
        currPlaylist.save();
        res.send(playlistsItems);
      })
      .catch(next);
  });
  // .get('/get-playlist-tracks', (req, res, next) => {
  //   Promise.all(userPlaylists.map(playlistId => {
  //     return rp(`${spotifyApi}/users/${spotifyUser}/playlists/${playlistId}/tracks?access_token=${oauthToken}`);
  //   }))
  //     .then(data => {
  //       console.log('data', data);
  //       let arr = [];
  //       data.forEach(playlist => {
  //         arr.push(JSON.parse(playlist));
  //       });
  //       res.send(arr[0]['items']);
  //     })
  //     .catch(next);
  // });

module.exports = router;
