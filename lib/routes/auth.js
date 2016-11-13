const router = require('express').Router();
const jsonParser = require('body-parser').json();
const User = require('../models/user');
// const token = require('../auth/token');
// const checkAuth = require('../auth/check-auth')();
// const checkRoles = require('../auth/check-roles');
var cookieParser = require('cookie-parser');

var genRandChars = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.Random() * possible.length));
    }
    return text;
};
var stateKey = 'spotify_auth_state';
var spotifyScopes = 'user-read-email playlist-read-private playlist-read-public playlist-read-collaborative	user-follow-modify user-follow-read user-library-read	user-read-birthdate';

router
    .get('/auth/login', (req, res) => {
      var client_id = env.process.CLIENT_ID; // Your client id
      var client_secret = env.process.CLIENT_SECRET; // Your secret
      var redirect_uri = env.process.REDIRECT_URI; // Your redirect uri
      var state = genRandChars(16);
      res.cookie(statekey, state);

    })


module.exports = router;
