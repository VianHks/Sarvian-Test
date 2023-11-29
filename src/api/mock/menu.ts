/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/menu.js';

export const menuList: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    menuOutput: [
      {
        id: 1,
        itemName: 'Paket Ayam Bakar',
        price: 23000,
        terjual: 24
      }
    ]
  });
};
