import { GraphQLClient } from 'graphql-request'
import { useQuery } from 'react-query';

const GQL_API = "https://0f94d502607d728a05a2702f33ad2782.serveo.net/graphql"

const client = new GraphQLClient(GQL_API, {
  headers: {
    "User-Agent": "Developer",
    "bypass-tunnel-reminder": "12234",
    "Connection": "keep-alive",
  }
});

const GQL_TEST_QUERY = `
  query {
    managers {
      id
      name
      tel
      date
      orders {
        id
      }
      review_table {
        id
      }
    }
  }
`

type ReqType = "managers" | "orders"

export const useGraphQL = (type: ReqType) => {
  return useQuery(
    type, 
    async () => {
      const data = await client.request(GQL_TEST_QUERY)
      return data;
    },
    {
      staleTime: 5 * 60 * 1000, // данные считаются актуальными в течение 5 минут
      cacheTime: 10 * 60 * 1000, // данные остаются в кэше 10 минут
    }
  );
};