const assert = require('chai').assert;
const Playlist = require('../../lib/models/playlist');

describe('Playlist model', () => {
  const playlist = new Playlist({
    name: 'test'
  });

  const badPlaylist = new Playlist({});

  it('validates playlist with a title', done => {
    playlist.validate(err => {
      if(!err) done();
      else done(err);
    });
  });

  it('requires a playlists to have a name', done => {
    badPlaylist.validate(err => {
      assert.isOk(err);
      done();
    });
  });

});
