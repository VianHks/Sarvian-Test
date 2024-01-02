/* eslint-disable linebreak-style */
import type { Command } from '@nxweb/core';

import { getListOrder } from '@api/clients/order.js';
import type { RootModel } from '@models/types.js';

import { OrderActionType } from './types.js';

import type { OrderAction, OrderModel } from './types.js';

const orderCommand = {
  orderClear: (): OrderAction => {
    return {
      type: OrderActionType.OrderClear
    };
  }
  // orderLoad: (token: string) => {
  //   return async (dispatch) => {
  //     try {
  //       const res = await getListOrder(token);

  //       if (res) {
  //         const value = res as OrderModel;

  //         dispatch({
  //           type: OrderActionType.OrderLoad,
  //           value
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  // }

} satisfies Command<RootModel, OrderAction>;

export { orderCommand };
