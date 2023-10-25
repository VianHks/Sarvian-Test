import type { Command, FetchURLOptions } from '@nxweb/core';

import { getSportsProduct  } from '@api/clients/products.js';
import type { RootModel } from '@models/types.js';

import { ProductsActionType } from './types.js';

import type { ProductsAction, ProductsModel } from './types.js';

const productsCommand = {
  clear: (): ProductsAction => {
    return {
      type: ProductsActionType.Clear
    };
  },
  load: (token: string, options?: Readonly<FetchURLOptions>) => {
    return async (dispatch) => {
      try {
        const res = await getSportsProduct(token, options);

        if (res) {
          const value = res as ProductsModel;

          dispatch({
            type: ProductsActionType.Load,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }
} satisfies Command<RootModel, ProductsAction>;

export { productsCommand };
