import { ProductsActionType } from './types.js';

import type { ProductsAction, ProductsModel } from './types.js';

const productsReducer = (
  state: ProductsModel = {},
  action: Readonly<ProductsAction>
): ProductsModel => {
  switch (action.type) {
    case ProductsActionType.Load:
      return { ...state, ...action.value };
    case ProductsActionType.Clear:
      return {};

    default:
      return state;
  }
};

export { productsReducer };
