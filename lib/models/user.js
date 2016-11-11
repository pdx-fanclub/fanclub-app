const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema ({

  username: {
    type: String,
    // 'username' is currently not required, we'll need to update this when we've established the app's 'auth' routes
    // required: true
  },
  password: {
    type: String,
    // 'password' is currently not required, we'll need to update this when we've established the app's 'auth' routes
    // required: true
  },
  roles: [ String ],
  playlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Playlist'
  }],
  favoriteSongs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }],
  groupId: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],
});


// User sign up - hash is generated from the password supplied by new user
userSchema.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
};

// User sign in - the user's supplied password is compared to the stored hash
userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
