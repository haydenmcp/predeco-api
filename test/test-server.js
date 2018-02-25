const expect = require('chai').expect;
const request = require('request');
const config = require('../configuration.json');

it('Main Page Content', (done) => {
  request(`http://${config.host.ip}:${config.host.port}`, (error, response, body) => {
    expect(body).to.equal('Hello World');
    done();
  });
});
