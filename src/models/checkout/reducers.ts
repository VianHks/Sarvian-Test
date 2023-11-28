/* eslint-disable linebreak-style */
import { CheckoutActionType } from './types.js';

import type { CheckoutAction, CheckoutModel } from './types.js';

const CheckoutReducer = (
  state: CheckoutModel = {},
  action: Readonly<CheckoutAction>
): CheckoutModel => {
  switch (action.type) {
    case CheckoutActionType.CheckoutMenuLoad:
      return { ...state, ...action.value };
    case CheckoutActionType.CheckoutMenuClear:
      return {};
    case CheckoutActionType.RestoListLoad:
      return { ...state, ...action.value };
    case CheckoutActionType.RestoListClear:
      return {};
    case CheckoutActionType.DanaLoad:
      return { ...state, ...action.value };
    case CheckoutActionType.DanaClear:
      return {};

    default:
      return state;
  }
};

export { CheckoutReducer };
