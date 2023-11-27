/* eslint-disable linebreak-style */
import { HalamanRestoActionType } from './types.js';

import type { HalamanRestoAction, HalamanRestoModel } from './types.js';

const HalamanRestoReducer = (
  state: HalamanRestoModel = {},
  action: Readonly<HalamanRestoAction>
): HalamanRestoModel => {
  switch (action.type) {
    case HalamanRestoActionType.UlasanAndRatingLoad:
      return { ...state, ...action.value };
    case HalamanRestoActionType.UlasanAndRatingClear:
      return {};
    case HalamanRestoActionType.MenuRekomendLoad:
      return { ...state, ...action.value };
    case HalamanRestoActionType.MenuRekomendClear:
      return {};
    case HalamanRestoActionType.PaketHematLoad:
      return { ...state, ...action.value };
    case HalamanRestoActionType.PaketHematClear:
      return {};
    case HalamanRestoActionType.RestoRatingLoad:
      return { ...state, ...action.value };
    case HalamanRestoActionType.RestoRatingClear:
      return {};

    default:
      return state;
  }
};

export { HalamanRestoReducer };
