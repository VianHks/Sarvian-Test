/* eslint-disable linebreak-style */
import type { Command } from '@nxweb/core';

import { getUlasanRating } from '@api/clients/ulasan-rating.js';
import type { RootModel } from '@models/types.js';

import { HalamanRestoActionType } from './types.js';

import type { HalamanRestoAction, HalamanRestoModel } from './types.js';
import { getRekomendMenu } from '@api/clients/menu-rekomend.js';
import { getPaketHemat } from '@api/clients/paket-hemat.js';
import { getRestoRating } from '@api/clients/resto-rating.js';

const halamanRestoCommand = {
  ulasanRatingClear: (): HalamanRestoAction => {
    return {
      type: HalamanRestoActionType.UlasanAndRatingClear
    };
  },
  ulasanRatingLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getUlasanRating(token);

        if (res) {
          const value = res as HalamanRestoModel;

          dispatch({
            type: HalamanRestoActionType.UlasanAndRatingLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  menuRekomendClear: (): HalamanRestoAction => {
    return {
      type: HalamanRestoActionType.MenuRekomendClear
    };
  },
  menuRekomendLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getRekomendMenu(token);

        if (res) {
          const value = res as HalamanRestoModel;

          dispatch({
            type: HalamanRestoActionType.MenuRekomendLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  paketHematClear: (): HalamanRestoAction => {
    return {
      type: HalamanRestoActionType.PaketHematClear
    };
  },
  paketHematLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getPaketHemat(token);

        if (res) {
          const value = res as HalamanRestoModel;

          dispatch({
            type: HalamanRestoActionType.MenuRekomendLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  restoRatingClear: (): HalamanRestoAction => {
    return {
      type: HalamanRestoActionType.RestoRatingClear
    };
  },
  restoRatingLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getRestoRating(token);

        if (res) {
          const value = res as HalamanRestoModel;

          dispatch({
            type: HalamanRestoActionType.RestoRatingLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }

} satisfies Command<RootModel, HalamanRestoAction>;

export { halamanRestoCommand };
