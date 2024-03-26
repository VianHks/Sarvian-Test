import { compact, createFetch, createFetchURL } from '@nxweb/core';
import type { FetchURLOptions } from '@nxweb/core';

import { apiMock } from './mock.js';

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

export const API = (token: string, type: string = 'Bearer' as const, mocked: boolean = false) => {
  const fetch = createFetch({
    get baseURL() {
      return window.NX.env.API_URL;
    },
    headers: compact({
      authorization: [type, token].filter(Boolean).join(' ')
    })
  });

  return mocked ? apiMock(fetch) : fetch;
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
  // q: 'apple',
  // from: '2024-03-24',
  // to: '2024-03-24',
  // sortBy: 'popularity',
  // apiKey: '157526369f7f4408aec5ceb566f3309b'
});
