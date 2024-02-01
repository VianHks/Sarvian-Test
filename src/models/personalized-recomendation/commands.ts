/* eslint-disable linebreak-style */
import type { Command } from '@nxweb/core';

import { getPersonalizedRecMenu } from '@api/clients/personalized-recomendation.js';
import type { RootModel } from '@models/types.js';

import { PersonalizedRecActionType } from './types.js';

import type { PersonalizedRecAction, PersonalRecomendationModel } from './types.js';

const personalizedRecCommand = {
  personalizedRecLoad: (token: string) => {
    return async (dispatch) => {
      try {
        const res = await getPersonalizedRecMenu(token);

        if (res) {
          const value = res as PersonalRecomendationModel;

          dispatch({
            type: PersonalizedRecActionType.GetPersonalizedRecomendation,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }

} satisfies Command<RootModel, PersonalizedRecAction>;

export { personalizedRecCommand };
