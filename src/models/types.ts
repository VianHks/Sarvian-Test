import type { CheckoutAction, CheckoutModel } from './checkout/types.js';
import type { FAQAction, FAQModel } from './faq/types.js';
import type { HalamanRestoAction, HalamanRestoModel } from './halaman-resto/types.js';
import type { PersonalizedRecAction, PersonalizedRecModel } from './personalized-recomendation/types.js';
import type { ProductViewsAction, ProductViewsModel } from './product-view/types.js';
import type { ProductsAction, ProductsModel } from './products/types.js';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootModel {
  faq?: FAQModel
  products?: ProductsModel
  productView?: ProductViewsModel
  halamanResto?: HalamanRestoModel
  checkout?: CheckoutModel
  personalizedRec?: PersonalizedRecModel
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootAction = CheckoutAction | FAQAction | HalamanRestoAction | PersonalizedRecAction | ProductsAction | ProductViewsAction | {
  type: ''
};
