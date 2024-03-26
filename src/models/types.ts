/* eslint-disable @typescript-eslint/member-ordering */
import type { Action } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import type { NewsAction, NewsModel } from './news/types.js';

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

  halamanResto?: NewsModel
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootAction = NewsAction | {
  type: ''
};
export type TAction<A extends Action, R> = ThunkAction<Promise<R>, RootModel, unknown, A>;
export type TDispatch<A extends Action> = ThunkDispatch<RootModel, unknown, A>;
