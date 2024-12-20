require("./config/env.js");

const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const { graphqlHTTP } = require("express-graphql");

const requestLogger = require("./middleware/requestLogger.js");
const errorHandler = require("./middleware/errorHandler.js");
const authMiddleware = require("./middleware/authMiddleware.js");

const winston = require("./utils/logger.js");
const schema = require("./graphql/schema.js");
const root = require("./graphql/resolvers.js");
const routes = require("./restAPI/routes");
const { associateModels } = require("./db/seeders/associations.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan('combined', { stream: winston.stream }));
app.use(requestLogger);
app.use(errorHandler);

app.use("/api", routes);

associateModels();

app.use(
  "/graphql",
  authMiddleware,
  graphqlHTTP((req) => ({
    graphiql: true,
    schema,
    rootValue: root,
    context: {
      user: req.user,
    },
  }))
);

module.exports = app;
