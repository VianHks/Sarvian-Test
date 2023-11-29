/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/menu-rekomend.js';
import Bakar from '@assets/images/Bakar.png';
import Pisan from '@assets/images/Pisan.png';

export const rekomendMenuList: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    menuRekomendOutput: [
      {
        id: 1,
        count: 0,
        foto: `${Bakar}`,
        harga: 24000,
        title: 'Ayam Goreng Pisan',
        terjual: 4,
        customized: true,
        stok: 5
      },
      {
        id: 2,
        count: 0,
        foto: `${Pisan}`,
        harga: 22000,
        title: 'Ayam Bakar',
        terjual: 3,
        customized: false,
        stok: 3
      }
    ]
  });
};
