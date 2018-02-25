// TODO Use strict mode
// 'use strict';

const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const config = require('./configuration.json');

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

app.listen(config.host.port, () =>
  console.log(`Browse to http://${config.host.ip}:${config.host.port}/graphql`));
