/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/menu-checkout';

import Bakar from '@assets/images/Bakar.png';
import Pisan from '@assets/images/Pisan.png';

export const listCheckoutMenu: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    checkoutMenuOutput: [
      {
        id: 1,
        count: 1,
        detail: 'Nasi di pisah',
        foto: `${Pisan}`,
        harga: 100000,
        title: 'Ayam Goreng Pisan'
      },
      {
        id: 2,
        count: 1,
        detail: 'Jangan terlalu gosong',
        foto: `${Bakar}`,
        harga: 50000,
        title: 'Ayam Bakar'
      }
    ]
  });
};
