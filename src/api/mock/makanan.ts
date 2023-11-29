/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/makanan.js';

import Bubur from '@assets/images/Bubur.png';
import Chinese from '@assets/images/Chinese.png';
import Dessert from '@assets/images/Dessert.png';
import Jajanan from '@assets/images/Jajanan.png';
import Kopi from '@assets/images/Kopi.png';
import MieBaso from '@assets/images/MieBaso.png';
import Minuman from '@assets/images/Minuman.png';
import Nasi from '@assets/images/Nasi.png';
import Padang from '@assets/images/Padang.png';
import Roti from '@assets/images/Roti.png';
import Sate from '@assets/images/Sate.png';
import Sunda from '@assets/images/Sunda.png';

export const makanan: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    makananOutput: [
      {
        id: '0',
        photo: `${Minuman}`,
        title: 'Minuman'
      },
      {
        id: '1',
        photo: `${Nasi}`,
        title: 'Aneka Nasi'
      },
      {
        id: '2',
        photo: `${Roti}`,
        title: 'Roti'
      },
      {
        id: '3',
        photo: `${Jajanan}`,
        title: 'Jajanan'
      },
      {
        id: '4',
        photo: `${Kopi}`,
        title: 'Kopi'
      },
      {
        id: '5',
        photo: `${MieBaso}`,
        title: 'Mie & Bakso'
      },
      {
        id: '6',
        photo: `${Dessert}`,
        title: 'Desert'
      },
      {
        id: '7',
        photo: `${Sunda}`,
        title: 'Sunda'
      },
      {
        id: '8',
        photo: `${Chinese}`,
        title: 'Chinese'
      },
      {
        id: '9',
        photo: `${Padang}`,
        title: 'Padang'
      },
      {
        id: '10',
        photo: `${Sate}`,
        title: 'Sate'
      },
      {
        id: '11',
        photo: `${Bubur}`,
        title: 'Bubur'
      }
    ]
  });
};
