const spotifyApi = 'https://api.spotify.com/v1';

const oauthToken = 'BQAWDINzVdsMakrjDsqc8W0e7w5-zzip6gMAvtiAxnJ7Qc0NYIungblQsZ0tQkArZAgGWFnE0zX7IYduV3w4_-LDlIgw_RPG4bLHqEQatWu8LIoSklq7RfUxyhbiPe7dzc8BJijTseeNAO6CVhhftss0GFBi7NEV3GgzHWxUPtwDhgyCP7I4XxCu28BLZau5w8nri0k';

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
