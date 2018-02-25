const expect = require('chai').expect;
const request = require('request');
const config = require('../configuration.json');

it('GraphQL End Point', (done) => {
  request(`http://${config.host.ip}:${config.host.port}/graphql?query={hello}`, (error, response, body) => {
    expect(JSON.parse(body).data.hello).to.equal('Hello World');
    done();
  });
});
