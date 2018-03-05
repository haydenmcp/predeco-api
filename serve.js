// TODO Use strict mode
// 'use strict';

const { buildSchema } = require('graphql');
const cors = require('cors');
const express = require('express');
const graphqlHttp = require('express-graphql');

const { host } = require('./configuration.json');

const schema = buildSchema(`
  type Datum {
    x: Int,
    y: Int,
    radius: Int,
    color: String
  },

  type Query {
    items: [Datum]
  }
`);

const rootValue = { items: () => [{
  x: 30,
  y: 30,
  radius: 20,
  color: 'red'
},{
  x: 70,
  y: 70,
  radius: 20,
  color: 'green'
},{
  x: 110,
  y: 100,
  radius: 20,
  color: 'blue'
},{
  x: 50,
  y: 50,
  radius: 20,
  color: 'yellow'
}]};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHttp({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(host.port, () =>
  console.log(`Browse to http://${host.ip}:${host.port}/graphql`));
