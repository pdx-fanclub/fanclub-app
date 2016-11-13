const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');

const groups = require('./routes/groups');
const playlists = require('./routes/playlists');
const songs = require('./routes/songs');
const users = require('./routes/users');
const authCallback = require('./auth/callback')

const checkAuth = require('./auth/check-auth')();  //middleware, no parameters
const checkRoles = require('./auth/check-roles');  //middleware, needs parameters

app.use(morgan('dev'));


app.use('/auth', auth);
app.use('/callback', authCallback);
app.use('/api/groups', groups);
app.use('/api/playlists', playlists);
app.use('/api/songs', songs);
app.use('/api/users', users);

app.use(errorHandler);

// const auth = require('./routes/auth');
// app.use('/api/auth', auth);

module.exports = app;