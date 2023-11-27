/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/sambel.js';

export const sambelList: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    sambelOutput: [
      {
        id: 1,
        itemName: 'Sambel Matah',
        price: 1000
      },
      {
        id: 2,
        itemName: 'Sambel Ijo',
        price: 1000
      },
      {
        id: 3,
        itemName: 'Sambel Pedes',
        price: 2000
      }

    ]
  });
};
