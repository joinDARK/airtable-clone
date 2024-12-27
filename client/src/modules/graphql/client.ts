import { ApolloClient, InMemoryCache } from "@apollo/client";

const GQL_API = `${import.meta.env.VITE_API_URL}/graphql`;

export const client = new ApolloClient({
  uri: GQL_API,
  cache: new InMemoryCache()
})