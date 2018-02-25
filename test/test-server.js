const expect = require('chai').expect;
const request = require('request');
const { host } = require('../configuration.json');

it('GraphQL End Point', (done) => {
  request(`http://${host.ip}:${host.port}/graphql?query={hello}`, (error, response, body) => {
    expect(JSON.parse(body).data.hello).to.equal('Hello World');
    done();
  });
});
