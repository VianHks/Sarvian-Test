/* eslint-disable linebreak-style */
import type { Command } from '@nxweb/core';

import { getAyam } from '@api/clients/ayam.js';
import { getNasi } from '@api/clients/nasi.js';
import { getSambel } from '@api/clients/sambel.js';
import type { RootModel } from '@models/types.js';

import { ProductViewsActionType } from './types.js';

import type { ProductViewsAction, ProductViewsModel } from './types.js';
import { getMenu } from '@api/clients/menu.js';

const productviewCommand = {
  nasiClear: (): ProductViewsAction => {
    return {
      type: ProductViewsActionType.NasiClear
    };
  },
  nasiLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getNasi(token);

        if (res) {
          const value = res as ProductViewsModel;

          dispatch({
            type: ProductViewsActionType.NasiLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  ayamClear: (): ProductViewsAction => {
    return {
      type: ProductViewsActionType.AyamClear
    };
  },
  ayamLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getAyam(token);

        if (res) {
          const value = res as ProductViewsModel;

          dispatch({
            type: ProductViewsActionType.AyamLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  sambelClear: (): ProductViewsAction => {
    return {
      type: ProductViewsActionType.SambelClear
    };
  },
  sambelLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getSambel(token);

        if (res) {
          const value = res as ProductViewsModel;

          dispatch({
            type: ProductViewsActionType.SambelLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  menuClear: (): ProductViewsAction => {
    return {
      type: ProductViewsActionType.MenuClear
    };
  },
  menuLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getMenu(token);

        if (res) {
          const value = res as ProductViewsModel;

          dispatch({
            type: ProductViewsActionType.MenuLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }

} satisfies Command<RootModel, ProductViewsAction>;

export { productviewCommand };
