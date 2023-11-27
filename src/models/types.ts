import type { FAQAction, FAQModel } from './faq/types.js';
import type { HalamanRestoAction, HalamanRestoModel } from './halaman-resto/types.js';
import type { ProductViewsAction, ProductViewsModel } from './product-view/types.js';
import type { ProductsAction, ProductsModel } from './products/types.js';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootModel {
  faq?: FAQModel
  products?: ProductsModel
  productView?: ProductViewsModel
  halamanResto?: HalamanRestoModel
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootAction = FAQAction | HalamanRestoAction | ProductsAction | ProductViewsAction | {
  type: ''
};
