/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/restolist.js';

import RestoFoto from '@assets/images/RestoFoto.svg';

export const restoList: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    restoListOutput: [
      {
        id: 1,
        restoName: 'Resto Bundo Gilo',
        status: false,
        detail: 'Pesanan dikonfirmasi resto',
        foto: `${RestoFoto}`
      }
    ]
  });
};
