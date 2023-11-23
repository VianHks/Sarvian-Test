import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/faq.js';

export const faq: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    FAQOutput: [
      {
        description: 'Bagaimana jika banyak order cancel?',
        id: 1,
        title: 'Bagaimana jika banyak order cancel?'
      },
      {
        description: 'Pesanan saya',
        id: 2,
        title: 'Pesanan saya'
      }
    ]
  });
};
