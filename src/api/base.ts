import { compact, createFetch, createFetchURL } from '@nxweb/core';
import type { FetchURLOptions } from '@nxweb/core';

export const getApiURL = () => `${window.NX?.env?.API_URL}/${window.NX?.env?.API_FOOD_BUYER}`;
export const getApiNews = () => 'https://newsapi.org/v2/everything?';

export const apiURL = (endpoint: string, options: Readonly<FetchURLOptions> = {}) => {
  return createFetchURL(
    endpoint,
    compact({
      ...options,
      get baseURL() {
        return options.baseURL ?? window.NX.env.API_URL;
      }
    })
  );
};

export const API = (token: string, type: string = 'Bearer' as const) => {
  const fetch = createFetch({
    get baseURL() {
      return window.NX.env.API_URL;
    },
    headers: compact({
      authorization: [type, token].filter(Boolean).join(' ')
    })
  });

};

export const apiFetchNonAuth = () => createFetch({
  baseURL: getApiURL()
});

export const apiFetch = (token: string) => createFetch({
  baseURL: getApiURL(),
  headers: {
    Authorization: token
  }
});

export const apiFetchNews = () => createFetch({
  baseURL: getApiNews()
});
