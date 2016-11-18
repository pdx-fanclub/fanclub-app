const spotifyApi = 'https://api.spotify.com/v1';
const oauthToken = 'BQD5L7ZXfBsGvB9XMTxaIeLuPPGjF8_JGzROL1zcvsZIZv6izUG_RkzTA8Lt0J666ewhklyRYPnR-d1pvuFjTNyd4m4xR22Rcpts7pX8ZFJs6lvKru-vBWeCVq5PPTlwNE5Pk3v7qiiqywOi';
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
    Playlist.find().select('spotify')   // Check into if .select('spotify') is new or old.
      .then(array => {
        playlists = array;
        return Promise.all(array.map(obj => {
          return rp(`${spotifyApi}/users/${spotifyUser}/playlists/${obj['spotify']['id']}/tracks?access_token=${oauthToken}`);
        }));
      })
      .then(data => {
        const spotifyArray = [];
        data.forEach(song => spotifyArray.push(JSON.parse(song)));
        return spotifyArray;
      })
      .then(spotifyArray => {
        Promise.all(
          spotifyArray.map(playlist => {
            let playlistId = playlist['href'].split('playlists/');
            playlistId = playlistId[1].split('/tracks');
            playlistId = playlistId[0];

            let songIds = [];
            playlist['items'].forEach(item => songIds.push(item['track']['id']));
            const currPlaylist = playlists.find(obj => obj.spotify.id === playlistId);
            currPlaylist.spotify.songIds = songIds;
            currPlaylist.save();
            return currPlaylist;
          }));
      })
      .then(() => Playlist.find())
      .then(data => res.send(data))
      .catch(next);
  })

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

module.exports = router;
