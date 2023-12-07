import { paths } from '@_types/serverTypes';
import { AxiosRequestConfig } from 'axios';
import { UseMutationOptions, UseQueryOptions } from 'react-query';
import {
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationResult,
  UseQueryResult,
} from 'react-query/types/react/types';

export type ApiError = string;
export type ApiMethod<TEndpoint extends keyof paths> = keyof paths[TEndpoint];

export type ApiBodies<TEndpoint extends keyof paths, TMethod extends ApiMethod<TEndpoint>> = NeverToUndefined<
  // @ts-ignore
  ValueOf<paths[TEndpoint][TMethod]['requestBody']['content']>
>;

export type ApiBody<TEndpoint extends keyof paths, TMethod extends ApiMethod<TEndpoint>> =
  // @ts-ignore
  undefined extends paths[TEndpoint][TMethod]['requestBody']['content']['multipart/form-data']
    ? ApiBodies<TEndpoint, TMethod>
    : ApiBodies<TEndpoint, TMethod> | typeof FormData;

export type ApiParam<
  TEndpoint extends keyof paths,
  TMethod extends ApiMethod<TEndpoint>,
  // @ts-ignore
> = paths[TEndpoint][TMethod]['parameters']['path'];

export type ApiQuery<TEndpoint extends keyof paths, TMethod extends ApiMethod<TEndpoint>> =
  // @ts-ignore
  paths[TEndpoint][TMethod]['parameters']['query'];

export type ApiConfig<
  TEndpoint extends keyof paths,
  TMethod extends ApiMethod<TEndpoint>,
  TInfinite extends boolean,
> = {
  key?: UseQueryOptions['queryKey'] | UseMutationOptions['mutationKey'];
  headers?: AxiosRequestConfig['headers'];
  axiosRequestConfig?: Omit<AxiosRequestConfig, 'url' | 'method' | 'params' | 'data' | 'headers'>;
  reactQueryOptions?: 'get' extends TMethod
    ? { infinite?: TInfinite } & (false extends UndefinedToFalse<TInfinite>
        ? Omit<UseQueryOptions<ApiResponse<TEndpoint, TMethod>, unknown>, 'queryFn'>
        : Omit<UseInfiniteQueryOptions<ApiResponse<TEndpoint, TMethod>, unknown>, 'queryFn'>)
    : Omit<UseMutationOptions<ApiResponse<TEndpoint, TMethod>, ApiError>, 'mutationFn'>;
} & (undefined extends ApiQuery<TEndpoint, TMethod> ? {} : { query: ApiQuery<TEndpoint, TMethod> }) &
  (undefined extends ApiParam<TEndpoint, TMethod> ? {} : { param: ApiParam<TEndpoint, TMethod> });

export type ApiResponse<TEndpoint extends keyof paths, TMethod extends ApiMethod<TEndpoint>> = ValueOf<
  // @ts-ignore
  ValueOf<ValueOf<paths[TEndpoint][TMethod]['responses']>>
>;

export type ApiUseRequest<
  TEndpoint extends keyof paths,
  TMethod extends ApiMethod<TEndpoint>,
  TInfinite extends boolean,
> = (
  ...args
) => 'get' extends TMethod
  ? false extends UndefinedToFalse<TInfinite>
    ? UseQueryResult<ApiResponse<TEndpoint, TMethod>, ApiError>
    : UseInfiniteQueryResult<ApiResponse<TEndpoint, TMethod>, ApiError>
  : UseMutationResult<
      ApiResponse<TEndpoint, TMethod>,
      ApiError,
      undefined extends ApiBodies<TEndpoint, TMethod> ? unknown : ApiBody<TEndpoint, TMethod>,
      unknown
    >;
