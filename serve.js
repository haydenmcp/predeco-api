const cors = require('cors');
const express = require('express');
const graphqlHttp = require('express-graphql');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { host, graphql } = require('./config/server.json');
const { rootValue, schema } = require('./schema/schema');

const app = express();
app.use(cors());
app.use(jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 500,
    jwksUri: "https://thinkdeep-tech.auth0.com/.well-known/jwks.json"
  }),
  aud: 'predeco-api',
  issuer: "https://thinkdeep-tech.auth0.com/",
  algorithms: ['RS256']
}));
app.use('/graphql', graphqlHttp({
schema,
rootValue,
graphiql: (graphql || {}).graphiql || false
}));

app.listen(host.port || 4000, () => console.log(`Browse to http://${host.ip}:${host.port}/graphql`));
