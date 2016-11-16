const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');  // eslint-disable-line
const callback = require('./routes/callback');

const auth = require('./routes/auth');
// const groups = require('./routes/groups');
const playlists = require('./routes/playlists');
const songs = require('./routes/songs');
// const users = require('./routes/users');
const syncSpotify = require('./routes/sync-spotify');


const checkAuth = require('./auth/check-auth')();  //middleware, no parameters
// const checkRoles = require('./auth/check-roles');  //middleware, needs parameters

// app.use(morgan('dev'));

app.use('/', express.static('public'));

app.use('/callback', callback);

app.use('/api/auth', auth);
app.use('/api/groups', checkAuth);
app.use('/api/playlists', checkAuth, playlists);
app.use('/api/songs', checkAuth, songs);
app.use('/api/users', checkAuth);
app.use('/api/sync-spotify', syncSpotify);

app.use(errorHandler);

module.exports = app;
