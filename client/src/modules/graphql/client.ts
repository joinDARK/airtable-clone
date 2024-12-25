import { GraphQLClient } from 'graphql-request'

const GQL_API = `${import.meta.env.VITE_API_URL}/graphql`;

export const client = new GraphQLClient(GQL_API, {
  headers: {
    "User-Agent": "Developer",
    "bypass-tunnel-reminder": "12234",
    "Connection": "keep-alive",
  }
});