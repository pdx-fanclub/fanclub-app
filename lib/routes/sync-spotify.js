const spotifyApi = 'https://api.spotify.com/v1';
const oauthToken =  process.env.TOKENME;
const router = require('express').Router();
const rp = require('request-promise');
const spotifyUser = process.env.SPOTID; //insert spotify user id from db once its hooked up
const Playlist = require('../models/playlist');

router
  // verb already in http method, don't put in url
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
      .then(data => JSON.parse(data))
      .then(({items}) => {
        const savePlaylists = items.map(playlist => {
          return new Playlist({
            name: playlist['name'],
            spotify: {
              id: playlist['id'],
              owner: playlist['owner']['id']
            }
          }).save();
        });

        return Promise
          .all(savePlaylists)
          .then(() => res.send(items));
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
        // why refetch? You just saved this object
        return Playlist.findOne({_id: playlist.id});
      })
      .then(data => res.send(data))
      .catch(next);
  })
  .get('/get-all-playlist-tracks', (req, res, next) => {
    var playlists = null; // eslint-disable-line
    Playlist.find() /*.select('spotify')*/   // Check into if .select('spotify') is new or old.
      .then(array => {
        playlists = array;
        return Promise.all(array.map(obj => {
          return rp(`${spotifyApi}/users/${spotifyUser}/playlists/${obj.spotify.id}/tracks?access_token=${oauthToken}`);
        }));
      })
      .then(data => {
        return data.map(song => JSON.parse(song));
      })
      //describe what it is, not the data type
      .then(spotifyPlaylists => {
        // you forgot to return the Promise.all...
        return Promise.all(
          spotifyPlaylists.map((playlist, index) => {
            // isn't this data returned as properties on the playlist object?
            // in any case, use the index and you don't need this...
            // let playlistId = playlist.href.split('playlists/');
            // playlistId = playlistId[1].split('/tracks');
            // playlistId = playlistId[0];

            const songIds = playlist.items.map(item => item.track.id);
            // Playlists are in same order as spotify playlists
            // avoid O(n^2) in favor of O(1) by using the index to correlate:
            const currPlaylist = playlists[index];
            currPlaylist.spotify.songIds = songIds;
            currPlaylist.save();
            return currPlaylist;
          }));
      })
      // I'm guessing is why you did a refetch here either because
      // you forgot the return on the above .then, or 
      // you need the rest of the fields. 
      // If the later, better to get the data once at the start
      // by expanding the .select fields
      // .then(() => Playlist.find())
      .then(playlists => res.send(playlists))
      .catch(next);
  })
  .get('/get-playlist-tracks/:id', (req, res, next) => {
    let currPlaylist = null;
    Playlist.findById(req.params.id)
      .then(playlist => {
        currPlaylist = playlist;
        console.log(currPlaylist);
        const playlistId = playlist.spotify.id;
        return rp(`${spotifyApi}/users/${spotifyUser}/playlists/${playlistId}/tracks?access_token=${oauthToken}`);
      })
      .then(data => JSON.parse(data).items)
      .then(songs => {
        currPlaylist.spotify.songIds = songs.map(song => song.track.id);
        return currPlaylist.save();
      })
      .then(saved => res.send(saved))
      .catch(next);
  })
  .get('/create-playlist/:id', (req, res, next) => {
    let songs = null;
    Playlist.findById(req.params.id)
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
      .then(data => data.id)
      .then(newPlaylistId => {
        
        const options = {
          method: 'POST',
          uri: `${spotifyApi}/users/${spotifyUser}/playlists/${newPlaylistId}/tracks?access_token=${oauthToken}`,
          body: {
            uris: songs.map(song => `spotify:track:${song}`),
          },
          json: true
        };
        return rp(options);
      })
      // should this return the playlist object?
      .then(data => res.send(data))
      .catch(next);
  });

module.exports = router;
