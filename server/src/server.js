require('./config/env.js');
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema.js');
const { PORT } = require('./config/app.config.js');
const root = require('./graphql/resolvers.js')

const app = express();
app.use(cors());


const { associateModels } = require('./db/associations.js');
associateModels();


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});

