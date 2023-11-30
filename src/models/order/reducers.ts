/* eslint-disable linebreak-style */
import { OrderActionType } from './types.js';

import type { OrderAction, OrderModel } from './types.js';

const OrderReducer = (
  state: OrderModel = {},
  action: Readonly<OrderAction>
): OrderModel => {
  switch (action.type) {
    case OrderActionType.OrderLoad:
      return { ...state, ...action.value };
    case OrderActionType.OrderClear:
      return {};

    default:
      return state;
  }
};

export { OrderReducer };
