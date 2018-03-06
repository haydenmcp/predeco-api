const { buildSchema } = require('graphql');
const cors = require('cors');
const express = require('express');
const graphqlHttp = require('express-graphql');
const jwt = require('express-jwt');
const { host, graphql } = require('./configuration.json');



// Service clients
// TODO auth client will provide express middleware that automatically fetches
// auth information from the service and appends the information to the graphql
// context if valid. Otherwise the middleware will redirect or something to force
// sign in.
const { auth } = require('predeco-auth-client');

const schema = buildSchema(`
  type Circle {
    x: Int,
    y: Int,
    radius: Int,
    color: String
  },

  type Rectangle {
    x: Int,
    y: Int,
    width: Int,
    height: Int,
    color: String
  },

  type Query {
    circles: [Circle],
    rectangles: [Rectangle]
  }
`);

const rootValue = {
  circles: () => [{
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
    }],
  rectangles: () => [{
    x: 10,
    y: 10,
    height: 10,
    width: 10,
    color: 'cyan'
  },{
    x: 20,
    y: 20,
    height: 10,
    width: 10,
    color: 'green'
  },{
    x: 30,
    y: 30,
    height: 10,
    width: 10,
    color: 'magenta'
  }]};

const app = express();
app.use(cors());
app.use(jwt({
  secret: 'magical'
}));
app.use(authenticate());
app.use('/graphql', graphqlHttp({
  schema,
  rootValue,
  graphiql: (graphql || {}).graphiql || false
}));

app.listen(host.port, () => console.log(`Browse to http://${host.ip}:${host.port}/graphql`));
