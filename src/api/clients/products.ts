import type { FetchURLOptions } from '@nxweb/core';

import { API, apiURL } from '../base.js';

export const endpoint = 'GetSportsProduct';

// TODO: Add a type for the data returned by this API

export const getSportsProduct = async (token: string, options?: Readonly<FetchURLOptions>) => {
  const url = apiURL(endpoint, options);
  const { data } = await API(
    token /* +uncomment to mock: , undefined, true */
  ).post(url.toString());

  return data;
};
