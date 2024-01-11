/* eslint-disable linebreak-style */
import type { Command } from '@nxweb/core';
// import { params } from '@nxweb/core/expression/plugins';

import { getRating } from '@api/clients/rating';
import type { RootModel } from '@models/types.js';

import { RatingActionType } from './types';

import type { RatingAction, RatingModel } from './types';

const RatingCommand = {
  RatingClear: (): RatingAction => {
    return {
      type: RatingActionType.RatingClear
    };
  },
  RatingLoad: (channelId: string) => {
    return async (dispatch) => {
      try {
        const res = await getRating(channelId);

        if (res) {
          const value = res as RatingModel;

          dispatch({
            type: RatingActionType.RatingLoad,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }

} satisfies Command<RootModel, RatingAction>;

export { RatingCommand };
