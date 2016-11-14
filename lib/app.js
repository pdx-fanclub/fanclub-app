const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');

const auth = require('./routes/auth');
// const groups = require('./routes/groups');
// const playlists = require('./routes/playlists');
// const songs = require('./routes/songs');
// const users = require('./routes/users');


// const checkAuth = require('./auth/check-auth')();  //middleware, no parameters
// const checkRoles = require('./auth/check-roles');  //middleware, needs parameters

app.use(morgan('dev'));

app.use('/api/auth', auth);
app.use('/api/groups', auth);
app.use('/api/playlists', auth);
app.use('/api/songs', auth);
app.use('/api/users', auth);

app.use(errorHandler);

module.exports = app;