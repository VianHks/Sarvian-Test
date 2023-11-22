import type { Command } from '@nxweb/core';

import { getFAQ } from '@api/clients/faq';
import type { RootModel } from '@models/types.js';

import { FAQActionType } from './types';

import type { FAQAction, FAQModel } from './types';

const FAQCommand = {
  FAQClear: (): FAQAction => {
    return {
      type: FAQActionType.FAQClear
    };
  },
  FAQLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getFAQ(token);

        if (res) {
          const value = res as FAQModel;

          dispatch({
            type: FAQActionType.FAQLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }
} satisfies Command<RootModel, FAQAction>;

export { FAQCommand };
