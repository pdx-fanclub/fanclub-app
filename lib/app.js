const express = require('express');
const app = express();
const errorHandler = require('./error-handler');

const callback = require('./routes/callback');

const auth = require('./routes/auth');
const groups = require('./routes/groups');
const playlists = require('./routes/playlists');
const songs = require('./routes/songs');
const users = require('./routes/users');
const syncSpotify = require('./routes/sync-spotify');
const spotifyUser = require('./routes/spotify-user');
const spotifySong = require('./routes/spotify-song');

// NOT USED, remove!
//middleware, no parameters 
const checkAuth = require('./auth/check-auth')();  // eslint-disable-line

app.use('/', express.static('public'));

app.use('/callback', callback);

app.use('/api/auth', auth);
app.use('/api/groups', groups);
app.use('/api/playlists', playlists);
app.use('/api/songs', songs);
app.use('/api/users', users);
// Put spotify api's together, under '/api/spotify/'
app.use('/api/sync-spotify', syncSpotify);
app.use('/api/spotify-user', spotifyUser);
app.use('/api/spotify-song', spotifySong);

app.use(errorHandler);

module.exports = app;
