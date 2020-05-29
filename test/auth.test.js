let mongoose = require('mongoose');
let User = require('../models/User');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach(done => {
    User.deleteMany({}, err => {
      done();
    });
  });
  /*
   * Test the login route
   */
  describe('/POST Login', () => {
    it('it should not login the user that does not exist', done => {
      let user = {
        password: '195441',
        avatar: 'AvatarDylan'
      };
      chai
        .request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  /*
   * Test the register POST route
   */
  describe('/POST user', () => {
    it('it should POST a user correctly formatted', done => {
      let user = {
        name: 'Dylan',
        email: 'dylan.ahteck@gmail.com',
        password: '195441',
        avatar: 'AvatarDylan'
      };
      chai
        .request(server)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          done();
        });
    });
  });
});
