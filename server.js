const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = { hello: () => 'hello world' };

const app = express();
app.use('/graphql', graphqlHttp({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(4000, () => console.log('Browse to http://localhost:4000/graphql'));
