import type { FAQAction, FAQModel } from './faq/types.js';
import { ProductViewsAction, ProductViewsModel } from './product-view/types.js';
import type { ProductsAction, ProductsModel } from './products/types.js';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootModel {
  faq?: FAQModel
  products?: ProductsModel
  productView?: ProductViewsModel
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootAction = FAQAction | ProductsAction | ProductViewsAction | {
  type: ''
};
