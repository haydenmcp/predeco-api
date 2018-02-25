// TODO Use strict mode
// 'use strict';

const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const { host } = require('./configuration.json');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = { hello: () => 'Hello World' };

console.log('Configuration ', config);

const app = express();
app.use('/graphql', graphqlHttp({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(host.port, () =>
  console.log(`Browse to http://${host.ip}:${host.port}/graphql`));
