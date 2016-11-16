const spotifyApi = 'https://api.spotify.com/v1';
const oauthToken = 'BQBjkLaPY5PkuSPUWB6rNaQY5MQGrP1an_zaf6Cl2tpzY0vkXpWNEegrYf8HTUnjgWshaH2r90j0ZATyIYi6ROENIM0Kd5B0G6ewZR4aTda2aQA7dYUsyKVieH3t1VYW9mQ5fIrwS2DGaktcZrINMs2EIBWk6-Gkag';
const router = require('express').Router();
const rp = require('request-promise');
const Song = require('../models/song');

router
  // .get('/get-song', (req, res, next) => {
  //   rp(`${spotifyApi}/tracks/6lFfwR8W6Ha4cA7kvmclcv?access_token=${oauthToken}`)
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
  .get('/get-song/:id', (req, res, next) => {
    rp(`${spotifyApi}/tracks/6lFfwR8W6Ha4cA7kvmclcv?access_token=${oauthToken}`)
      .then(data => {
        var songData = new Song();
        const spotifyData = JSON.parse(data);
        songData.name = spotifyData.name;
        songData.artists = [];
        spotifyData.artists.forEach(artists => {
          songData.artists.push(artists.name);
        });
        songData.save();
        console.log(songData);
        res.send(songData);

      })
      .catch(next);
  });


module.exports = router;
