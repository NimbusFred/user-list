import axios, { AxiosRequestConfig } from 'axios';
import Keys from './keys';

const instance = axios.create({
  baseURL: 'https://am-api.inqubi.eu/api/v1/',
});

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const getAuthHeader = () => {
  if (window.localStorage) {
    const token = window.localStorage.getItem(Keys.ACCESS_TOKEN) ?? null;
    if (token) {
      return {
        Authorization: `Bearer ${token.replaceAll('"', '')}`,
      };
    }
  }
  return {};
};

export const httpGet = async <T>(url: string, config?: AxiosRequestConfig<T>) => {
  const requestConfig = { headers: { ...defaultHeaders, ...getAuthHeader() }, ...config };
  const response = await instance.get(url, requestConfig);
  return response;
};

export const httpPost = async <T>(url: string, data: T, config?: AxiosRequestConfig<T>) => {
  const requestConfig = { headers: { ...defaultHeaders, ...getAuthHeader() }, ...config };
  const response = await instance.post(url, data, requestConfig);
  return response;
};

export const httpPut = async <T>(url: string, data: T, config?: AxiosRequestConfig) => {
  const requestConfig = { headers: { ...defaultHeaders, ...getAuthHeader() }, ...config };
  const response = await instance.put(url, data, requestConfig);
  return response;
};

export const httpDelete = async <T>(url: string, config?: AxiosRequestConfig<T>) => {
  const requestConfig = { headers: { ...defaultHeaders, ...getAuthHeader() }, ...config };
  const response = await instance.delete(url, requestConfig);
  return response;
};
