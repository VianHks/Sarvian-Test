import type { Action } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import type { CheckoutAction, CheckoutModel } from './checkout/types.js';
import type { FAQAction, FAQModel } from './faq/types.js';
import type { HalamanRestoAction, HalamanRestoModel } from './halaman-resto/types.js';
import type { HomeAction, HomeModel } from './home/types.js';
import type { OrderAction, OrderModel } from './order/types.js';
import type { PersonalizedRecAction, PersonalizedRecModel } from './personalized-recomendation/types.js';
import type { ProductViewsAction, ProductViewsModel } from './product-view/types.js';
import type { ProductsAction, ProductsModel } from './products/types.js';

export type SortDirection = 'asc' | 'desc';

export interface PagingInfo {
  number?: number
  size?: number
  sort?: {
    column?: string
    direction?: SortDirection
  }
}

export interface PagedModel<T> {
  data?: T[]
  meta?: {
    limit?: number
    offset?: number
    total?: number
  }
}

export interface RootModel {
  checkout?: CheckoutModel
  faq?: FAQModel
  halamanResto?: HalamanRestoModel
  home?: HomeModel
  order?: OrderModel
  personalizedRec?: PersonalizedRecModel
  products?: ProductsModel
  productView?: ProductViewsModel
}

export type RootAction = CheckoutAction | FAQAction | HalamanRestoAction | HomeAction | OrderAction | PersonalizedRecAction | ProductsAction | ProductViewsAction;

export type TAction<A extends Action, R> = ThunkAction<Promise<R>, RootModel, unknown, A>;
export type TDispatch<A extends Action> = ThunkDispatch<RootModel, unknown, A>;
