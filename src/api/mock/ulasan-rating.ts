/* eslint-disable linebreak-style */
import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/ulasan-rating.js';

export const ulasanAndRating: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.API_URL);

  adapter.onPost(url).reply(200, {
    ulasanRatingOutput: [
      {
        id: 1,
        userName: 'Jatnika',
        rating: '4',
        commentTag: 'Ngenah weh pokokna mah',
        tagDetail: [
          'Harga Sesuai',
          'Kemasan Bagus'
        ],
        commentDetail: 'Kurang suka sama sambelnya terlalu pedes. Ayamnya enak garing sampe ketulang-tulang. Lorem ipsum dolor sit amet consectectur.',
        tanggal: '25 Agustus 2023'
      },
      {
        id: 2,
        userName: 'Rere',
        rating: '2',
        commentTag: 'Endol',
        tagDetail: [
        ],
        commentDetail: 'Kurang suka sama sambelnya terlalu pedes. Ayamnya enak garing sampe ketulang-tulang. Lorem ipsum dolor sit amet consectectur.',
        tanggal: '25 Agustus 2023'
      },
      {
        id: 3,
        userName: 'Udin',
        rating: '4',
        commentTag: 'Enak banget',
        tagDetail: [

        ],
        commentDetail: 'Kurang suka sama sambelnya terlalu pedes. Ayamnya enak garing sampe ketulang-tulang. Lorem ipsum dolor sit amet consectectur.',
        tanggal: '25 Agustus 2023'
      },
      {
        id: 1,
        userName: 'Jatnika',
        rating: '5',
        commentTag: 'Mantab',
        tagDetail: [

        ],
        commentDetail: 'Kurang suka sama sambelnya terlalu pedes. Ayamnya enak garing sampe ketulang-tulang. Lorem ipsum dolor sit amet consectectur.',
        tanggal: '25 Agustus 2023'
      },
      {
        id: 4,
        userName: 'Retno',
        rating: '3',
        commentTag: 'Kurang enak g ada rasa',
        tagDetail: [

        ],
        commentDetail: 'Kurang suka sama sambelnya terlalu pedes. Ayamnya enak garing sampe ketulang-tulang. Lorem ipsum dolor sit amet consectectur.',
        tanggal: '25 Agustus 2023'
      }
    ]
  });
};
