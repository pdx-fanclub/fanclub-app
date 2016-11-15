const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },

  songs: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Song',
  }],

  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  taggedArtists: {
    type: Array,
    default: []
  },
  genres: {
    type: Array,
    default: []
  }
}
, {
  timestamps: true
});

module.exports = mongoose.model('Playlist', schema);
