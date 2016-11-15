const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../lib/app');
const request = chai.request(app);

describe('Groups Routes e2e', () => {

  let token = '';

  // 1st test case groups object
  const testRockGroup = {
    groupName: 'PDX Clubbers',
    description: 'Rock',
    memberId: ['Tom', 'Drew', 'AJ', 'Greg', 'Will']
  };

  // 2nd test case groups object
  const testSecretGroup = {
    groupName: 'Shipwrecked',
    description: 'RussianRoulette',
    memberId: ['Tom', 'AJ']
  };

  it('/POST 1st test group', done => {
    request
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send(testRockGroup)
      .then(res => {
        const group = res.body;
        assert.ok(group._id);
        testRockGroup.__v = 0;
        testRockGroup._id = group._id;
        done();
      })
      .catch(done);
  });

  it('/POST 2nd test group', done => {
    request
      .post('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .send(testSecretGroup)
      .then(res => {
        const group = res.body;
        assert.ok(group._id);
        testSecretGroup.__v = 0;
        testSecretGroup._id = group._id;
        done();
      })
      .catch(done);
  });

  it('/GET all groups', done => {
    request
      .get('/api/groups')
      .set('Authorization', `Bearer ${token}`)
      .set('admin', 'super-user')
      .then(res => {
        assert.deepEqual(res.body, ['testRockGroup', 'testSecretGroup']);
        done();
      })
      .catch(done);
  });


  it('/GET group by id', done => {
    request
      .get(`/api/groups/${testRockGroup._id}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        const group = res.body;
        assert.deepEqual(group, testRockGroup);
        done();
      })
      .catch(done);
  });

  it('/PUT find group by id & mod group', done => {
    request
      .put(`/api/groups/${testRockGroup._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        groupName: 'PDX Clubbers',
        description: 'Rock',
        memberId: ['Tom', 'Drew', 'AJ', 'Greg'] // deleted 'Will' from group
      })
      .then(res => {
        const modgroup = res.body;
        expect([modgroup]).to.not.include('Will');
        done();
      })
      .catch(done);
  });

  it('/PUT find group by memberId & mod group', done => {
    request
      .put(`/api/groups/${testSecretGroup.memberId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        groupName: 'Shipwrecked',
        description: 'RussianRoulette',
        memberId: ['Tom', 'AJ', 'Will'] // added 'Will' to group
      })
      .then(res => {
        const modgroup = res.body;
        expect([modgroup]).to.include('Will');
        done();
      })
      .catch(done);
  });

  it('/DELETE playlist', done => {
    request
      .del(`/api/groups/${testSecretGroup._id}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        const delgroup = res.body;
        testSecretGroup.__v = 0;
        assert.deepEqual(delgroup, testSecretGroup);
        done();
      })
      .catch(done);
  });

});
