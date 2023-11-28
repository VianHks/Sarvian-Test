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

    default:
      return state;
  }
};

export { CheckoutReducer };
