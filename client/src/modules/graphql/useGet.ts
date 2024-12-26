import { TableKey } from '../../shared/types/TableKey';
import { client } from './client'
import { useQuery } from 'react-query';
import queryConfig from './queryConfig';

type ReqType = TableKey

export default function useGet(type: ReqType) {
    return useQuery(
        type, 
        async () => {
            const data = await client.request(`query { ${queryConfig[type]} }`);
            return data;
        },
        {
            staleTime: 5 * 60 * 1000, // данные считаются актуальными в течение 5 минут
            cacheTime: 10 * 60 * 1000, // данные остаются в кэше 10 минут
        }
    );
}