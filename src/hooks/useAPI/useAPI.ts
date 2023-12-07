import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import request from '@utils/request';
import { paths } from '@_types/serverTypes';
import { ApiConfig, ApiMethod, ApiUseRequest } from './useAPI.types';

const useAPI = <TEndpoint extends keyof paths, TMethod extends ApiMethod<TEndpoint>, TInfinite extends boolean>(
  endpoint: TEndpoint,
  method: TMethod,
  config: ApiConfig<TEndpoint, TMethod, TInfinite>,
) => {
  const { param, query, headers, axiosRequestConfig = {}, reactQueryOptions = {} } = config as any;

  const key = config?.key ?? [endpoint, method, param, query].filter(Boolean);
  const isMutation: boolean = (method as string).toLowerCase() !== 'get';
  const isInfinite: boolean = !isMutation && reactQueryOptions?.infinite;

  const useRequest: ApiUseRequest<TEndpoint, TMethod, TInfinite> = (
    isMutation ? useMutation : isInfinite ? useInfiniteQuery : useQuery
  ) as ApiUseRequest<TEndpoint, TMethod, TInfinite>;

  return useRequest(
    key,
    async (variables: any = undefined) => {
      const _param = variables?.pageParam?.param || param;
      const url: string = Object.keys(_param || {}).reduce((url: string, key: string) => {
        return url.replace(new RegExp(`{${key}}`, 'g'), `${_param[key]}`);
      }, endpoint);

      return request({
        url,
        method: method as string,
        params: { ...(query || {}), ...(variables?.pageParam?.query || {}) },
        data: variables,
        headers,
        ...axiosRequestConfig,
      });
    },
    reactQueryOptions,
  );
};

export default useAPI;
