/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/order.js';

import Bakar from '@assets/images/Bakar.png';

export const listOrder: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    orderOutput: [
      {
        DELIVERY_STATUS: 'Pickup',
        NO_ORDER: 1,
        ORDER_DATE: '2 Aug 2023',
        ORDER_ITEM: [
          {
            COMMENT: 'Gg. Jalanin Dulu Aja No.171',
            ITEM: 2,
            PHOTO: `${Bakar}`,
            PRICE: 25000,
            TITLE: 'Paket Ayam Bakar'
          },
          {
            COMMENT: 'Gg. Jalanin Dulu Aja No.1711',
            ITEM: 2,
            PHOTO: `${Bakar}`,
            PRICE: 27000,
            TITLE: 'Paket Ayam Bakar2'
          }
        ],
        ORDER_STATUS: 'Diproses',
        RESTO_NAME: 'Resto Bunda Gila',
        SINGLE_ORDER: false
      },
      {
        DELIVERY_STATUS: 'Delivery Order',
        NO_ORDER: 2,
        ORDER_DATE: '2 Aug 2023',
        ORDER_ITEM: [
          {
            COMMENT: 'Gg. Jalan jalan hati ku senang.172',
            ITEM: 2,
            PHOTO: `${Bakar}`,
            PRICE: 25000,
            TITLE: 'Paket Ayam Bakar'
          },
          {
            COMMENT: 'Gg. Jalan jalan hati ku senang.172',
            ITEM: 2,
            PHOTO: `${Bakar}`,
            PRICE: 27000,
            TITLE: 'Paket Ayam Bakar2'
          }
        ],
        ORDER_STATUS: 'Diproses',
        RESTO_NAME: 'Resto Bunda Gila',
        SINGLE_ORDER: true
      }
    ]
  });
};
