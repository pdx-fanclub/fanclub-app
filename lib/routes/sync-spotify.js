const spotifyApi = 'https://api.spotify.com/v1';
const oauthToken =  process.env.TOKENME;
const router = require('express').Router();
const rp = require('request-promise');
const spotifyUser = process.env.SPOTID; //insert spotify user id from db once its hooked up
const Playlist = require('../models/playlist');

router
  .get('/get-curr-user-playlists', (req, res, next) => {
    rp(`${spotifyApi}/me/playlists?access_token=${oauthToken}`)
      .then(data => {
        data = JSON.parse(data);
        res.send(data['items']);
      })
      .catch(next);
  })
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
        });
        res.send(data['items']);
      })
      .catch(next);
  })
  .post('/post-playlist/:playlistId/:userId', (req, res, next) => {
    rp(`${spotifyApi}/users/${req.params.userId}/playlists/${req.params.playlistId}?access_token=${oauthToken}`)
      .then(playlist => {
        playlist = JSON.parse(playlist);
        return new Playlist({
          name: playlist['name'],
          spotify: {
            id: playlist['id'],
            owner: playlist['owner']['id']
          }
        }).save();
      })
      .then(playlist => {
        return Playlist.findOne({_id: playlist.id});
      })
      .then(data => res.send(data))
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
        res.send(currPlaylist);
      })
      .catch(next);
  })
  .get('/create-playlist/:id', (req, res, next) => {
    let songs = [];
    Playlist.findOne({_id: req.params.id})
      .then(playlist => {
        songs = playlist.spotify.songIds;
        console.log(songs);
        const options = {
          method: 'POST',
          uri: `${spotifyApi}/users/${spotifyUser}/playlists?access_token=${oauthToken}`,
          body: {
            name: playlist.name,
            public: true,
            collaborative: false
          },
          json: true
        };

        return rp(options);
      })
      .then(data => data['id'])
      .then(newPlalistId => {
        let uris = [];
        for(var i = 0; i < songs.length; i++) {
          uris.push(`spotify:track:${songs[i]}`);
        }
        console.log('uris', uris);
        const options = {
          method: 'POST',
          uri: `${spotifyApi}/users/${spotifyUser}/playlists/${newPlalistId}/tracks?access_token=${oauthToken}`,
          body: {
            uris: uris,
          },
          json: true
        };
        return rp(options);
      })
      .then(data => res.send(data))
      .catch(next);
  });

module.exports = router;
