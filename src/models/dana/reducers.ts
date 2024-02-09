import { apiFetch } from '@api/base.js';

import type { DANAAction, DANAModel } from './types.js';

const DANAMenuDefault: DANAModel = {
  empty: ''
};

const DANAReducer = (
  state: DANAModel = DANAMenuDefault,
  action: DANAAction
): DANAModel => {
  switch (action.type) {
    default:
      return state;
  }
};

export const DanaCommands = {
  getBindingURL: (params: unknown, token: string): string => {
    apiFetch(token).post(`/foodbuyer/0.1/dana/get-binding-url`, params).then((response: any) => {
      if (response.status === 200) {
        if (response.data !== null) {
          const url = (response.data.url as string);

          return url;
        }
      }

      return '';
    }).catch((error) => {
      console.error(error);

      return '';
    });

    return '';
  }
};

export { DANAReducer };
