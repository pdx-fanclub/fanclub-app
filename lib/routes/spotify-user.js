const spotifyApi = 'https://api.spotify.com/v1';
const oauthToken = 'BQDs28qXk4ynfn2P7Hdvw-UB5uM0H1wtNvIFhIhv2NBu3xDyPvjua4w_lzO8wzDrkrr4lgqx72uKDOpKyEJ6xW-l83OkvdjWyOVrtcLp_7hPP1BWItukvL4xLMxf1l_sQrGAqK7RIEP3SYeZZVQDwIO5quGu9G1Nag';
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
        User.findByIdAndUpdate(req.params.id, newUserInfo, {new: true})
            .then(saved => res.send(saved))
            .catch(next);
      });

  });

module.exports = router;
