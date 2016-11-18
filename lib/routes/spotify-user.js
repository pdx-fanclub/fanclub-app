const spotifyApi = 'https://api.spotify.com/v1';

const oauthToken = 'BQDLIH0-iQ3QD7Lvt_NsE-lW3-Kh5oTY015BJjU48oy49FMoMRHMazlg1BObGsBOnpaifaqltn0a3JlLjd4uP6wCItyOeAXbHMHFYkRCehWh-e-Ymh-jpf1XZ9GDAISo68VNAv1f4GWIj7fB0gIZP87jZBU';

const router = require('express').Router();
const rp = require('request-promise');
const User = require('../models/user');

router
  .put('/:id', (req, res, next) => {
    rp(`${spotifyApi}/me?access_token=${oauthToken}`)
      .then(data =>
			{ var newUserInfo = {spotifyUserData:{}};
        const spotifyData = JSON.parse(data);
        newUserInfo.spotifyUserData.display_name = spotifyData.display_name;
        newUserInfo.spotifyUserData.email = spotifyData.email;
        newUserInfo.spotifyUserData.href = spotifyData.href;
        newUserInfo.spotifyUserData.id = spotifyData.id;
        // newUserInfo.spotifyUserData.images = spotifyData.images;
        User.findByIdAndUpdate(req.params.id, newUserInfo, {new: true})
            .then(saved => res.send(saved))
            .catch(next);
      });

  });

module.exports = router;
