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
      var client_id = process.env.CLIENT_ID; // Your client id
      var client_secret = process.env.CLIENT_SECRET; // Your secret
      var redirect_uri = process.env.REDIRECT_URI; // Your redirect uri
      var state = genRandChars(16);
      res.cookie(statekey, state);
      res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }));
    });

    .get('/auth/callback', (req, rep) => {
      var code = req.query.code || null;
      var state = req.query.state || null;
      var storedState = req.cookies ? req.cookie[stateKey] : null;
      if(state === null || state !== storedState) {
        res.redirect('/#' + querystring.stringify({ error: 'State different that sent'}))
      } else {
        res.clearCookie(stateKey);
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
          },
          json: true
        };

        // from the spotify site
        request.post(authOptions, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            var access_token = body.access_token,
                refresh_token = body.refresh_token;
            var options = {
              url: 'https://api.spotify.com/v1/me',
              headers: { 'Authorization': 'Bearer ' + access_token },
              json: true
            };
            // use the access token to access the Spotify Web API
            request.get(options, function(error, response, body) {
              console.log(body);
            });
            // we can also pass the token to the browser to make requests from there
            res.redirect('/#' +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
              }));
          } else {
            res.redirect('/#' + querystring.stringify({ error: 'invalid_token'}));
          };
      });
    });

    .get('/auth/refresh', (req, res) => {

      var refresh_token = req.query.refresh_token;
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
          grant_type: 'refresh_token',
          refresh_token: refresh_token
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token;
          res.send({
            'access_token': access_token
          });
        }
      });
    });

module.exports = router;
