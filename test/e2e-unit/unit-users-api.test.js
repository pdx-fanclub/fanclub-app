const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const assert = chai.assert;
chai.use( chaiHttp );
const morgan = require('morgan');  // eslint-disable-line

const connection = require( '../../lib/test-db-connection' ); // eslint-disable-line
const app = require( '../../lib/app' );

describe( 'users api', () => {

//clears database and ALL of its collections
  // before( done => {
  //   const drop = () => connection.db.dropDatabase( done );
  //   if ( connection.readyState === 1 ) drop();
  //   else connection.on( 'open', drop );
  // });

  const request = chai.request( app );
  let token = '';

  //unsure at this point what the token/password/auth situation is
  before(done => {
    request
			.post('/api/auth/signin')
			.send({ username: 'testuser', password: 'abc' })
			.then(res => assert.ok(token = res.body.token))
			.then(done, done);
  });

  const testUser = {
    username: 'John Doe',
    spotifyUserData: {},
    spotifyTokenData: {},
    roles: [],
    playlists: [],
    favoriteSongs: []
  };

  const testGroup = {
    groupName: 'Bieber Believers',
    description: 'Justin Bieber fans',
  };

  //all following also validate token effectiveness
  it( '/GET all', done => {
    request
			.get( '/api/users' )
      .set('authorization', `${token}`)
			.then( res => {
  assert.deepEqual( res.body, [] );
  done();
})
			.catch( done );
  });

  //again, unsure how new users are to be added
  it( '/POST', done => {
    request
			.post( '/api/users' )
      .set('authorization', `${token}`)
      .send( testUser )
			.then( res => {
  const user = res.body;
  assert.ok( user._id );
  user._id = user._id;
  done();
})
			.catch( done );

  });

  it( '/GET all after post', done => {
    request
			.get( '/api/users' )
      .set('authorization', `${token}`)
			.then( res => {
  assert.deepEqual( res.body, [ testUser ] );
  done();
})
			.catch( done );
  });

  it( '/GET by id', done => {
    request
			.get( `/api/users/${testUser._id}` )
      .set('authorization', `${token}`)
			.then( res => {
  const user = res.body;
  assert.deepEqual( user, testUser );
  done();
})
			.catch( done );
  });

  it( '/POST adding group for next test', done => {
    request
			.post( '/api/groups' )
      .set('authorization', `${token}`)
			.send( testGroup )
			.then( res => {
  const group = res.body;
  assert.ok( group._id );
  testGroup.__v = 0;
  testGroup._id = group._id;
  done();
})
			.catch( done );

  });

  it ('PUTs joins group ID into user data', done => {
    var testPath = '/api/groups/' + testGroup._id + '/users/' + testUser._id;
    request
			.put( testPath )
      .set('authorization', `${token}`)
			.then( res => {
  assert.equal( res.body.groupId, testGroup._id);
  done();
})
			.catch( done );
  });

});
