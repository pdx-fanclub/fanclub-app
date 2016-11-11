const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },

  artist: {
    type: String,
    required: true
  },

  genre: {
    type: String,
  },

  playlists: {
    type: Array,
    default: [],
  },

  links: {
    type: Number,
    default: 0,
  }

}
, {
  timestamps: true
});

module.exports = mongoose.model('Song', schema);
