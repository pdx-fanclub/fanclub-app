const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// const Playlists = require('../../lib/routes/playlists');

const app = require('../../lib/app');
const request = chai.request(app);

describe('Playlists Routes e2e', () => {
  // const playlists = new Playlists({
  //   name: 'test'
  // });

  let token = '';

  // 1st test case playlist object
  const testRockPlaylist = {
    name: 'MyFavorites',
    songs: ['Ace of Spades', 'Thunderstruck'],
    creator: 'Tom',
    taggedArtists: ['Motorhead', 'ACDC'],
    genres: 'Rock'
  };

  // 2nd test case playlist object
  const testSecretPlaylist = {
    name: 'MyAltFavorites',
    songs: ['Dancing Queen', 'Orinoco Flow'],
    creator: 'Tom',
    taggedArtists: ['ABBA', 'Enya'],
    genres: 'RussianRoulette'
  };

  it('/POST 1st test playlist', done => {
    request
      .post('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send(testRockPlaylist)
      .then(res => {
        const playlist = res.body;
        assert.ok(playlist._id);
        testRockPlaylist.__v = 0;
        testRockPlaylist._id = playlist._id;
        done();
      })
      .catch(done);
  });

  it('/POST 2nd test playlist', done => {
    request
      .post('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send(testSecretPlaylist)
      .then(res => {
        const playlist = res.body;
        assert.ok(playlist._id);
        testSecretPlaylist.__v = 0;
        testSecretPlaylist._id = playlist._id;
        done();
      })
      .catch(done);
  });

  it('/GET all playlists', done => {
    request
      .get('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .set('admin', 'super-user')
      .then(res => {
        assert.deepEqual(res.body, ['testRockPlaylist', 'testSecretPlaylist']);
        done();
      })
      .catch(done);
  });


  it('/GET playlist by id', done => {
    request
      .get(`/api/playlists/${testRockPlaylist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        const playlist = res.body;
        assert.deepEqual(playlist, testRockPlaylist);
        done();
      })
      .catch(done);
  });

  it('/PUT find playlist by id & mod playlist', done => {
    request
      .put(`/api/playlists/${testRockPlaylist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'MyFavorites',
        songs: ['Ace of Spades', 'Red Barchetta'],
        creator: 'Tom',
        taggedArtists: ['Motorhead', 'Rush'],
        genres: 'Rock'
      })
      .then(res => {
        const modplaylist = res.body;
        expect([modplaylist]).to.include('Red Barchetta');
        done();
      })
      .catch(done);
  });

  it('/PUT find playlist by song & mod playlist', done => {
    request
      .put(`/api/playlists/${testSecretPlaylist.Song}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'MyAltFavorites',
        songs: ['Dancing Queen', 'Orinoco Flow', 'Never Gonna Give You Up'],
        creator: 'Tom',
        taggedArtists: ['ABBA', 'Enya', 'Rick Astley'],
        genres: 'RussianRoulette'
      })
      .then(res => {
        const modplaylist = res.body;
        expect([modplaylist]).to.include('Never Gonna Give You Up');
        done();
      })
      .catch(done);
  });

  it('/DELETE playlist', done => {
    request
      .del(`/api/playlists/${testSecretPlaylist._id}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        const delplaylist = res.body;
        testSecretPlaylist.__v = 0;
        assert.deepEqual(delplaylist, testSecretPlaylist);
        done();
      })
      .catch(done);
  });

});
