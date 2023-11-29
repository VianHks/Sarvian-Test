/* eslint-disable linebreak-style */
import type { Command } from '@nxweb/core';

import { getMakanan } from '@api/clients/makanan.js';
import { getBerandaMenu } from '@api/clients/menu-beranda.js';
import type { RootModel } from '@models/types.js';

import { BerandaActionType } from './types.js';

import type { BerandaAction, BerandaModel } from './types.js';
import { getBerandaListResto } from '@api/clients/restolist-beranda.js';

const berandaCommand = {
  menuBerandaClear: (): BerandaAction => {
    return {
      type: BerandaActionType.MenuBerandaClear
    };
  },
  menuBerandaLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getBerandaMenu(token);

        if (res) {
          const value = res as BerandaModel;

          dispatch({
            type: BerandaActionType.MenuBerandaLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  makananClear: (): BerandaAction => {
    return {
      type: BerandaActionType.MakananClear
    };
  },
  makananLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getMakanan(token);

        if (res) {
          const value = res as BerandaModel;

          dispatch({
            type: BerandaActionType.MakananLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  restoListClear: (): BerandaAction => {
    return {
      type: BerandaActionType.RestoListClear
    };
  },
  restoListLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getBerandaListResto(token);

        if (res) {
          const value = res as BerandaModel;

          dispatch({
            type: BerandaActionType.RestoListLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }

} satisfies Command<RootModel, BerandaAction>;

export { berandaCommand };
