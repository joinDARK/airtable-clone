require('./config/env.js');

const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./graphql/schema.js');
const root = require('./graphql/resolvers.js');
const routes = require('./restAPI/routes');
const { associateModels } = require('./db/seeders/associations.js');

const app = express();

app.use(cors());
app.use('/api', routes);

associateModels();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}));

module.exports = app;
