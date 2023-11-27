/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/nasi.js';

export const nasiList: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    nasiOutput: [
      {
        id: 1,
        checked: false,
        itemName: 'Nasi Putih',
        price: 0
      },
      {
        id: 2,
        checked: false,
        itemName: 'Nasi Coklat',
        price: 1000
      },
      {
        id: 3,
        checked: false,
        itemName: 'Nasi Gosong',
        price: 2000
      }

    ]
  });
};
