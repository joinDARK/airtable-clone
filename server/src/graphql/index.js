const queryResolvers = require("./resolvers/Query");
const mutationResolvers = require("./resolvers/Mutation");

// схема вида:
// type Query { ... }
// type Mutation { ... }
// то обычно конечная структура выглядит так:
module.exports = {
  ...queryResolvers,

  ...mutationResolvers,
};
