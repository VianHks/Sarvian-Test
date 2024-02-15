/* eslint-disable linebreak-style */

import type { FetchURLOptions } from '@nxweb/core';

import { apiFetchNonAuth, apiURL } from '../base.js';

export const endpoint = `/foodbuyer/0.2/review/get-by-channel`;

export const getRating = async (channelId: string, options?: Readonly<FetchURLOptions>) => {
  const url = apiURL(`${endpoint}?id=${channelId}`, options);
  const { data } = await apiFetchNonAuth().get(url.toString());

  return data;
};
