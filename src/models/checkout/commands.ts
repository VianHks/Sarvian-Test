/* eslint-disable linebreak-style */
import type { Command } from '@nxweb/core';

import { getCheckoutMenu } from '@api/clients/menu-checkout.js';
import type { RootModel } from '@models/types.js';

import { CheckoutActionType } from './types.js';

import type { CheckoutAction, CheckoutModel } from './types.js';
import { getListResto } from '@api/clients/restolist.js';
import { getDana } from '@api/clients/dana.js';

const checkoutCommand = {
  clearCheckoutMenu: (): CheckoutAction => {
    return {
      type: CheckoutActionType.CheckoutMenuClear
    };
  },
  loadCheckoutMenu: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getCheckoutMenu(token);

        if (res) {
          const value = res as CheckoutModel;

          dispatch({
            type: CheckoutActionType.CheckoutMenuLoad,
            value
          });

          console.log('masuk sini', value);
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  clearRestoList: (): CheckoutAction => {
    return {
      type: CheckoutActionType.RestoListClear
    };
  },
  loadRestoList: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getListResto(token);

        if (res) {
          const value = res as CheckoutModel;

          dispatch({
            type: CheckoutActionType.RestoListLoad,
            value
          });

          console.log('masuk sini', value);
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  clearDana: (): CheckoutAction => {
    return {
      type: CheckoutActionType.DanaClear
    };
  },
  loadDana: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getDana(token);

        if (res) {
          const value = res as CheckoutModel;

          dispatch({
            type: CheckoutActionType.DanaLoad,
            value
          });

          console.log('masuk sini', value);
        }
      } catch (err) {
        console.error(err);
      }
    };
  }

} satisfies Command<RootModel, CheckoutAction>;

export { checkoutCommand };
