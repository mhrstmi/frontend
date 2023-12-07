import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// import { getAuthStorage, setAuthStorage } from '@containers/auth';

const axiosInstance: AxiosInstance = axios.create({
  timeout: 150000,
  baseURL: import.meta.env['REACT_APP_API_URL'],
});

axiosInstance.interceptors.request.use(
  (config) => {
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
      ...(config?.headers || {}),
    };

    // const { accessToken = undefined } = getAuthStorage();
    // if (accessToken) {
    //   headers['Authorization'] = `Bearer ${accessToken}`;
    // }

    return Object.assign(config, { headers });
  },
  (error) => Promise.reject(error),
);
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if ([401].includes(error?.response?.status)) {
      // setAuthStorage(null);
      window.location.replace(`/account/login`);
    }


    const { error_description, message } = error?.response?.data || {};
    console.log(error?.response?.data);
    let errorText =
      error_description || message || (!error?.response ? 'Can not connect to server.' : 'An unknown error occurred.');

    return Promise.reject(errorText);
  },
);

const request = (config: AxiosRequestConfig) => axiosInstance.request(config);

export default request;
