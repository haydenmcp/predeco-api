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
    circles: [Datum]
  }
`);

const rootValue = { circles: () => [{
  x: 30,
  y: 30,
  radius: 20,
  color: 'red'
},{
  x: 70,
  y: 70,
  radius: 30,
  color: 'green'
},{
  x: 110,
  y: 100,
  radius: 5,
  color: 'blue'
},{
  x: 50,
  y: 50,
  radius: 10,
  color: 'purple'
},{
  x: 205,
  y: 100,
  radius: 10,
  color: 'magenta'
},{
  x: 55,
  y: 300,
  radius: 15,
  color: 'yellow'
},{
  x: 400,
  y: 250,
  radius: 50,
  color: 'grey'
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
