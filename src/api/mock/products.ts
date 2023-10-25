import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/products.js';

export const products: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    output: [
      {
        id: 1,
        item_description: 'Professional soccer ball for matches.',
        item_key: 'SKU123',
        item_name: 'Soccer Ball'
      },
      {
        id: 2,
        item_description: 'Official size basketball for indoor and outdoor play.',
        item_key: 'SKU456',
        item_name: 'Basketball'
      },
      {
        id: 3,
        item_description: 'High-performance running shoes for athletes.',
        item_key: 'SKU789',
        item_name: 'Running Shoes'
      },
      {
        id: 4,
        item_description: 'Graphite tennis racket for advanced players.',
        item_key: 'SKU234',
        item_name: 'Tennis Racket'
      },
      {
        id: 5,
        item_description: 'Non-slip yoga mat for comfortable exercise.',
        item_key: 'SKU567',
        item_name: 'Yoga Mat'
      }
    ]
  });
};
