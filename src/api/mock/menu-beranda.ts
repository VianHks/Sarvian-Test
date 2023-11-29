/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/menu-beranda.js';

export const menuBeranda: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    menuBerandaOutput: [
      {
        id: 1,
        itemName: 'Ayam Goreng Pisan',
        itemPrice: 100000,
        location: 1.5,
        orderMethode: 'Pesan Antar, Pick Up',
        restoName: 'Resto Sunda Gila 1',
        sold: 24,
        verified: true
      },
      {
        id: 2,
        itemName: 'Bubur Sumsum',
        itemPrice: 120000,
        location: 1.5,
        orderMethode: 'Pesan Antar, Pick Up, Dine In',
        restoName: 'Dapur Pak Raden',
        sold: 24,
        verified: false
      },
      {
        id: 3,
        itemName: 'Ayam Goreng Kemarin',
        itemPrice: 130000,
        location: 1.5,
        orderMethode: 'Dine In',
        restoName: 'Kedai Nyonyah',
        sold: 24,
        verified: true
      },
      {
        id: 4,
        itemName: 'Bebek Bubuk',
        itemPrice: 130000,
        location: 1.5,
        orderMethode: 'Dine In',
        restoName: 'Warung Gusti',
        sold: 24,
        verified: true
      },
      {
        id: 5,
        itemName: 'Gorengan Rebus',
        itemPrice: 130000,
        location: 1.5,
        orderMethode: 'Dine In',
        restoName: 'Warung Cak Waluh',
        sold: 24,
        verified: true
      },
      {
        id: 4,
        itemName: 'Kopi Paste',
        itemPrice: 130000,
        location: 1.5,
        orderMethode: 'Dine In',
        restoName: 'Warung Kopas',
        sold: 24,
        verified: true
      }
    ]
  });
};
