import type { Command } from '@nxweb/core';

import { getMakanan } from '@api/clients/makanan.js';
import { getBerandaMenu } from '@api/clients/menu-beranda.js';
import { getBerandaListResto } from '@api/clients/restolist-beranda.js';
import type { RootModel } from '@models/types.js';

import { HomeActionType } from './types.js';

import type { HomeAction, HomeModel } from './types.js';

const homeCommand = {
  menuBerandaClear: (): HomeAction => {
    return {
      type: HomeActionType.MenuBerandaClear
    };
  },
  menuBerandaLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getBerandaMenu(token);

        if (res) {
          const value = res as HomeModel;

          dispatch({
            type: HomeActionType.MenuBerandaLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  makananClear: (): HomeAction => {
    return {
      type: HomeActionType.MakananClear
    };
  },
  makananLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getMakanan(token);

        if (res) {
          const value = res as HomeModel;

          dispatch({
            type: HomeActionType.MakananLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }

} satisfies Command<RootModel, HomeAction>;

export { homeCommand };
