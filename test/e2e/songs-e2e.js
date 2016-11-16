const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../lib/app');
const request = chai.request(app);

describe('Songs Routes e2e', () => {

  let token = '';

  // 1st test case song object
  const testRockSong1 = {
    name: 'Shoot That Poison Arrow',
    artist: 'ABC',
    genre: '80sRock',
    playlists: ['PDX Clubbers'],
    links: 0
  };

  // 2nd test case song object
  const testRockSong2 = {
    name: 'Gold',
    artist: 'Spandau Ballet',
    genre: '80sRock',
    playlists: ['PDX Clubbers'],
    links: 0
  };

  it('/POST 1st test song', done => {
    request
      .post('/api/songs')
      .set('Authorization', `Bearer ${token}`)
      .send(testRockSong1)
      .then(res => {
        const song = res.body;
        assert.ok(song._id);
        testRockSong1.__v = 0;
        testRockSong1._id = song._id;
        done();
      })
      .catch(done);
  });

  it('/POST 2nd test song', done => {
    request
      .post('/api/songs')
      .set('Authorization', `Bearer ${token}`)
      .send(testRockSong2)
      .then(res => {
        const song = res.body;
        assert.ok(song._id);
        testRockSong2.__v = 0;
        testRockSong2._id = song._id;
        done();
      })
      .catch(done);
  });

  it('/GET all songs', done => {
    request
      .get('/api/songs')
      .set('Authorization', `Bearer ${token}`)
      .set('admin', 'super-user')
      .then(res => {
        assert.deepEqual(res.body, ['testRockSong1', 'testRockSong2']);
        done();
      })
      .catch(done);
  });

  it('/GET song by id', done => {
    request
      .get(`/api/songs/${testRockSong1._id}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        const song = res.body;
        assert.deepEqual(song, testRockSong1);
        done();
      })
      .catch(done);
  });

  it('/PUT find song by id & replace song', done => {
    request
      .put(`/api/songs/${testRockSong2._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gold - remix', // replace song
        artist: 'Spandau Ballet',
        genre: '80sRock',
        playlists: ['PDX Clubbers'],
        links: 0
      })
      .then(res => {
        const modsong = res.body;
        expect([modsong]).to.include('Gold - remix');
        done();
      })
      .catch(done);
  });

  it('/PUT /:songId/playlists/:playlistId ... find song by id & add to playlist', done => {
    request
      .put(`/api/songs/${testRockSong2._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gold', // reverted back to original song
        artist: 'Spandau Ballet',
        genre: '80sRock',
        playlists: ['PDX Clubbers'],
        links: 0
      })
      .then(res => {
        const modsong = res.body;
        expect([modsong]).to.not.include('Gold - remix');
        done();
      })
      .catch(done);
  });

  it('/DELETE song', done => {
    request
      .del(`/api/songs/${testRockSong2._id}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        const delsong = res.body;
        testRockSong2.__v = 0;
        assert.deepEqual(delsong, testRockSong2);
        done();
      })
      .catch(done);
  });

});
