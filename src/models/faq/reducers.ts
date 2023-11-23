import { FAQActionType } from './types';

import type { FAQAction, FAQModel } from './types';

const FAQReducer = (
  state: FAQModel = {},
  action: Readonly<FAQAction>
): FAQModel => {
  switch (action.type) {
    case FAQActionType.FAQLoad:
      return { ...state, ...action.value };
    case FAQActionType.FAQClear:
      return {};

    default:
      return state;
  }
};

export { FAQReducer };
