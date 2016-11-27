const Group = require('../../lib/models/group');
const assert = require('chai').assert;

describe ('Group model', () => {

  it('validates with groupName and description', done => {

    const group = new Group({
      groupName: 'groupName',
      description: 'jazz'
    });

    // no need to wrap in function 
    group.validate(done);

  });

  it('groupName is required', done => {
    const group = new Group();
    group.description = 'jazz';

    group.validate(err => {
      assert.isOk(err, 'groupName should have been required');
      done();
    });

  });


  it('description is required', done => {
    const group = new Group();
    group.groupName = 'groupName';

    group.validate(err => {
      assert.isOk(err, 'description should have been required');
      done();
    });

  });


});
