/* eslint-disable linebreak-style */
import type { FetchURLOptions } from '@nxweb/core';

import { API, apiURL } from '../base.js';

export const endpoint = 'GetMakanan';

export const getMakanan = async (token: string, options?: Readonly<FetchURLOptions>) => {
  const url = apiURL(endpoint, options);
  const { data } = await API(
    token,
    'Bearer',
    true
  ).post(url.toString());

  return data;
};
