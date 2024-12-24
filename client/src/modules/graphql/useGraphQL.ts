import { GraphQLClient } from 'graphql-request'
import { useQuery } from 'react-query';
import queryConfig from './queryConfig';
import { ITableNames } from '../../shared/types';

const GQL_API = "https://grumpy-planets-march.loca.lt/graphql";

const client = new GraphQLClient(GQL_API, {
  headers: {
    "User-Agent": "Developer",
    "bypass-tunnel-reminder": "12234",
    "Connection": "keep-alive",
  }
});

type ReqType = ITableNames

export const useGraphQL = (type: ReqType) => {
  return useQuery(
    type, 
    async () => {
      const data = await client.request(`query { ${ queryConfig[type] } }`);
      return data;
    },
    {
      staleTime: 5 * 60 * 1000, // данные считаются актуальными в течение 5 минут
      cacheTime: 10 * 60 * 1000, // данные остаются в кэше 10 минут
    }
  );
};