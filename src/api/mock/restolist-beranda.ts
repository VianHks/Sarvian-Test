/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/restolist-beranda.js';

export const berandaRestoList: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    berandaRestoListOutput: [
      {
        id: 1,
        location: 1.5,
        open: '9.00 - 12.00 WIB',
        orderMethode: 'Pesan Antar, Pick Up',
        rating: '4.9',
        restoName: 'Resto Sunda Gila 1',
        verified: true
      },
      {
        id: 2,
        location: 1.5,
        open: '9.00 - 12.00 WIB',
        orderMethode: 'Pesan Antar, Pick Up, Dine In',
        rating: '4.8',
        restoName: 'Dapur Pak Raden',
        verified: false
      },
      {
        id: 3,
        location: 1.5,
        open: '9.00 - 12.00 WIB',
        orderMethode: 'Dine In',
        rating: '5.0',
        restoName: 'Kedai Nyonyah',
        verified: true
      },
      {
        id: 4,
        location: 1.5,
        open: '9.00 - 12.00 WIB',
        orderMethode: 'Pick Up',
        rating: '3.1',
        restoName: 'Warung Gusti',
        verified: true
      },
      {
        id: 5,
        location: 1.5,
        open: '9.00 - 12.00 WIB',
        orderMethode: 'Dine In',
        rating: '1.4',
        restoName: 'Warung Cak Waluh',
        verified: false
      },
      {
        id: 6,
        location: 1.5,
        open: '9.00 - 12.00 WIB',
        orderMethode: 'Pesan Antar, Dine In',
        rating: '2.6',
        restoName: 'Warung Kopas',
        verified: true
      }
    ]
  });
};
