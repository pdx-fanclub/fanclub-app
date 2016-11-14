const assert = require('chai').assert;//eslint-disable-line
const Song = require('../../lib/models/song');

describe('song model', () => {
  const song = new Song({
    name: 'this is',
    artist: 'a test',
  });

  const badSong = new Song({
    links: 5
  });

  it('validates song with proper schema', done => {
    song.validate(err => {
      if(!err) done();
      else done(err);
    });
  });

  it('defaults "genre" to ""', done => {
    assert.deepEqual(song.genre, '');
    done();
  });

  it('defaults "links" to 0', done => {
    assert.deepEqual(song.links, 0);
    done();
  });

  it('requires title and artist', done => {
    badSong.validate(err => {
      assert.isOk(err);
      done();
    });
  });

  it('requires links to be a number', done => {
    song.links = 'cat',
    song.validate(err => {
      assert.isOk(err);
      done();
    });
  });
});
