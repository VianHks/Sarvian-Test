import type { Action } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import type { BerandaAction, BerandaModel } from './beranda/types.js';
import type { CheckoutAction, CheckoutModel } from './checkout/types.js';
import type { FAQAction, FAQModel } from './faq/types.js';
import type { HalamanRestoAction, HalamanRestoModel } from './halaman-resto/types.js';
import type { OrderAction, OrderModel } from './order/types.js';
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
  beranda?: BerandaModel
  order?: OrderModel
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootAction = BerandaAction | CheckoutAction | FAQAction | HalamanRestoAction | OrderAction | PersonalizedRecAction | ProductsAction | ProductViewsAction;

export type TAction<A extends Action, R> = ThunkAction<Promise<R>, RootModel, unknown, A>;
export type TDispatch<A extends Action> = ThunkDispatch<RootModel, unknown, A>;
