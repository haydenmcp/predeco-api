const expect = require('chai').expect;
const request = require('request');
const { host } = require('../config/server.json');

describe('graphql services', () => {
  // TODO Modify tests to actually cover required cases.
  it('should provide access to economic data', (done) => {
    request(`http://${host.ip}:${host.port}/graphql?query={hello}`, (error, response, body) => {
      expect(JSON.parse(body).data.hello).to.equal('Hello World');
      done();
    });
  });
});
