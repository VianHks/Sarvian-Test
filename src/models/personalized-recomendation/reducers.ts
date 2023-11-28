/* eslint-disable linebreak-style */
import { PersonalizedRecActionType } from './types.js';

import type { PersonalizedRecAction, PersonalizedRecModel } from './types.js';

const PersonalizedRecReducer = (
  state: PersonalizedRecModel = {},
  action: Readonly<PersonalizedRecAction>
): PersonalizedRecModel => {
  switch (action.type) {
    case PersonalizedRecActionType.PersonalizedRecLoad:
      return { ...state, ...action.value };
    case PersonalizedRecActionType.PersonalizedRecClear:
      return {};

    default:
      return state;
  }
};

export { PersonalizedRecReducer };
