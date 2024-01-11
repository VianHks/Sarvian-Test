/* eslint-disable linebreak-style */
import { RatingActionType } from './types';

import type { RatingAction, RatingModel } from './types';

const RatingReducer = (
  state: RatingModel = {},
  action: Readonly<RatingAction>
): RatingModel => {
  switch (action.type) {
    case RatingActionType.RatingLoad:
      return { ...state, ...action.value };
    case RatingActionType.RatingClear:
      return {};

    default:
      return state;
  }
};

export { RatingReducer };
