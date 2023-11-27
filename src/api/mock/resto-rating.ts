/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/resto-rating.js';
import RestoFoto from '@assets/images/RestoFoto.svg';

export const restoRatingList: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    restoRatingOutput: [
      {
        id: 1,
        location: '1.5',
        open: '9.00 - 12.00 WIB',
        orderMethode: 'Pesan Antar, Pick Up',
        rating: '4.9',
        restoName: 'Resto Sunda Gila',
        verified: true,
        foto: `${RestoFoto}`
      }
    ]
  });
};
