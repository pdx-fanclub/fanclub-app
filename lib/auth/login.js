var express = require('express'); // eslint-disable-line
// eslint-disable-next-line
var client_id = env.process.CLIENT_ID; // Your client id
// eslint-disable-next-line
var client_secret = env.process.CLIENT_SECRET; // Your secret
// eslint-disable-next-line
var redirect_uri = env.process.REDIRECT_URI; // Your redirect uri



module.exports = function loginAuth(req, res) {

  var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  var state = generateRandomString(16);
  res.cookie(stateKey, state); // eslint-disable-line

    // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({ // eslint-disable-line
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }));
};
