import type { ProductsAction, ProductsModel } from './products/types.js';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootModel {
  products?: ProductsModel
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootAction = ProductsAction | {
  type: ''
};
