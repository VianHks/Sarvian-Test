/* eslint-disable @typescript-eslint/member-ordering */
import type { Action } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import type { CheckoutAction, CheckoutModel } from './checkout/types.js';
import type { FAQAction, FAQModel } from './faq/types.js';
import type { HalamanRestoAction, HalamanRestoModel } from './halaman-resto/types.js';
import type { HomeAction, HomeModel } from './home/types.js';
import type { OrderAction, OrderModel } from './order/types.js';
import type { PersonalizedRecAction, PersonalRecomendationModel } from './personalized-recomendation/types.js';
import type { ProductViewsAction, ProductViewsModel } from './product-view/types.js';
import type { ProductsAction, ProductsModel } from './products/types.js';
import type { RatingAction, RatingModel } from './rating/types.js';
import type { RegisterAction, RegisterModel } from './register/types.js';
import type { UserAction, UserModel } from './user-profile/types.js';

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
  /*
   * Checkout?: CheckoutModel
   * halamanResto?: HalamanRestoModel
   */
  home?: HomeModel
  /*
   * Order?: OrderModel
   * personalizedRec?: PersonalizedRecModel
   */
  faq?: FAQModel
  products?: ProductsModel
  productView?: ProductViewsModel
  halamanResto?: HalamanRestoModel
  checkout?: CheckoutModel
  personalizedRec?: PersonalRecomendationModel
  // Beranda?: BerandaModel
  order?: OrderModel
  rating?: RatingModel
  profile?: UserModel
  registration?: UserModel
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootAction = CheckoutAction | FAQAction | HalamanRestoAction | HomeAction | OrderAction | PersonalizedRecAction | ProductsAction | ProductViewsAction | RatingAction | RegisterAction | UserAction | {
  type: ''
};
export type TAction<A extends Action, R> = ThunkAction<Promise<R>, RootModel, unknown, A>;
export type TDispatch<A extends Action> = ThunkDispatch<RootModel, unknown, A>;
