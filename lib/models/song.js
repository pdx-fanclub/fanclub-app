const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },

  artists: [{
    type: String,
    required: true
  }],

  genre: {
    type: String,
    default: '',
  },

  playlists: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Playlist',
  }],

  links: {
    type: Number,
    default: 0,
  }

}
, {
  timestamps: true
});

module.exports = mongoose.model('Song', schema);
