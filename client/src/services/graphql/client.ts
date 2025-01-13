import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const GQL_API = `${import.meta.env.VITE_API_URL}/graphql`;

const httpLink = createHttpLink({
  uri: GQL_API, // URL вашего GraphQL API
});

const authLink = setContext((_, { headers }) => {
  // Получаем токен из локального хранилища или другого источника
  const token = localStorage.getItem('jwt');

  // Возвращаем заголовки с токеном
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})