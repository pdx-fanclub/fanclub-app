const User = require('../../lib/models/user');
const assert = require('chai').assert;

describe ('User model', () => {

  it('validates with username', done => {

    const user = new User({
      username: 'username'
      // password: 'abcd1234'
    });

    user.validate(err => {
      if(!err) done();
      else done(err);
    });

  });

  it('username is required', done => {
    const user = new User();
    user.password = 'abcd1234';

    user.validate(err => {
      assert.isOk(err, 'username should have been required');
      done();
    });

  });


  // it('password is required', done => {
  //   const user = new User();
  //   user.username = 'username';
  //
  //   user.validate(err => {
  //     assert.isOk(err, 'password should have been required');
  //     done();
  //   });
  //
  // });

// PROBLEMS WITH THIS TEST
  // it('username must be a string', done => {
  //   const user = new User();
  //   user.username = null;
  //   user.password = 'abcd1234';
  //
  //   user.validate(err => {
  //     assert.isOk(err, 'expected error - incorrect data type on username');
  //     done();
  //   });
  // });


});
