const spotifyApi = 'https://api.spotify.com/v1';
const oauthToken = 'BQBD9mb1zDZrZ1VfxSlGt4wRNrki5_eIc2exmIBJVbICRQBwHSHCFXosEhm07QTPoEmOBNCI7k9AyARt4DDSslG_pnm0hQqF2RH1iXTG4HhBs7OmWqTAUiq4-meer-dPrUhyJTEk3WsJ7__dzbVVSk_GwfGWTxI';
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