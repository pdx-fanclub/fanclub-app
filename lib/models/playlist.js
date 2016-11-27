const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
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
  },
  spotify: {
    id: String,
    songIds: {
      type: Array,
      default: []
    },
    owner: String
  }
}
, {
  timestamps: true
});

schema.query.byGenre = function(genreName) {
  return this.find({'genres' : genreName});
};

schema.query.byArtist = function(artistName) {
  return this.find({'taggedArtists' : artistName});
};

module.exports = mongoose.model('Playlist', schema);
