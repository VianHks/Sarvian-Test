/* eslint-disable linebreak-style */
import { BerandaActionType } from './types.js';

import type { BerandaAction, BerandaModel } from './types.js';

const BerandaReducer = (
  state: BerandaModel = {},
  action: Readonly<BerandaAction>
): BerandaModel => {
  switch (action.type) {
    case BerandaActionType.MenuBerandaLoad:
      return { ...state, ...action.value };
    case BerandaActionType.MenuBerandaClear:
      return {};
    case BerandaActionType.MakananLoad:
      return { ...state, ...action.value };
    case BerandaActionType.MakananClear:
      return {};
    case BerandaActionType.RestoListLoad:
      return { ...state, ...action.value };
    case BerandaActionType.RestoListClear:
      return {};

    default:
      return state;
  }
};

export { BerandaReducer };
