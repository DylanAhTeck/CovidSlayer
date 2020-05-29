let mongoose = require('mongoose');
let User = require('../models/User');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach(done => {
    User.remove({}, err => {
      done();
    });
  });
  /*
   * Test the /POST route
   */
  describe('/POST user', () => {
    it('it should not POST a user without an avatar field', done => {
      let user = {
        name: 'Dylan',
        email: 'dylan.ahteck@gmail.com',
        password: '195441'
      };
      chai
        .request(server)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('pages');
          res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });
  });
});
