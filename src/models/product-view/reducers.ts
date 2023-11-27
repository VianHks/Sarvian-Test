/* eslint-disable linebreak-style */
import { ProductViewsActionType } from './types.js';

import type { ProductViewsAction, ProductViewsModel } from './types.js';

const ProductViewReducer = (
  state: ProductViewsModel = {},
  action: Readonly<ProductViewsAction>
): ProductViewsModel => {
  switch (action.type) {
    case ProductViewsActionType.NasiLoad:
      return { ...state, ...action.value };
    case ProductViewsActionType.NasiClear:
      return {};
    case ProductViewsActionType.AyamLoad:
      return { ...state, ...action.value };
    case ProductViewsActionType.AyamClear:
      return {};
    case ProductViewsActionType.SambelLoad:
      return { ...state, ...action.value };
    case ProductViewsActionType.SambelClear:
      return {};
    case ProductViewsActionType.MenuLoad:
      return { ...state, ...action.value };
    case ProductViewsActionType.MenuClear:
      return {};

    default:
      return state;
  }
};

export { ProductViewReducer };
