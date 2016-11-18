const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema ({

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  spotifyUserData: {
    display_name: {
      type: String
    },
    email: {
      type: String
    },
    href: {
      type: String
    },
    id: {
      type: String
    },
    // images: [{
    //   height: {
    //     type: String
    //   },
    //   url: {
    //     type: String
    //   },
    //   width: {
    //     type: String
    //   }
    // }]
  },
  spotifyTokenData: {
    access_token: {
      type: String
    },
    token_type: {
      type: String
    },
    scope: {
      type: String
    },
    expires_in: {
      type: Number
    },
    refresh_token: {
      type: String
    }
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
