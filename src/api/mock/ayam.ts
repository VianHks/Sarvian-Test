/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/ayam.js';

export const ayamList: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    ayamOutput: [
      {
        id: 1,
        itemName: 'Ayam Bumbu',
        price: 23000
      },
      {
        id: 2,
        itemName: 'Ayam Goreng',
        price: 25000
      },
      {
        id: 3,
        itemName: 'Ayam Bakar',
        price: 30000
      }
    ]
  });
};
