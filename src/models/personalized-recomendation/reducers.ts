/* eslint-disable linebreak-style */
import { apiFetch } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types.js';

import { PersonalizedRecActionType } from './types.js';

import Bubur from '@assets/images/Bubur.png';
import Chinese from '@assets/images/Chinese.png';
import Dessert from '@assets/images/Dessert.png';
import Jajanan from '@assets/images/Jajanan.png';
import Kopi from '@assets/images/Kopi.png';
import MieBaso from '@assets/images/MieBaso.png';
import Minuman from '@assets/images/Minuman.png';
import Nasi from '@assets/images/Nasi.png';
import Padang from '@assets/images/Padang.png';
import Roti from '@assets/images/Roti.png';
import Sate from '@assets/images/Sate.png';
import Sunda from '@assets/images/Sunda.png';

import type { PersonalizedRecAction, PersonalRecomendationModel } from './types.js';

const PERSONALIZE_RECOMENDATION = [
  {
    id: '0',
    photo: `${Minuman}`,
    title: 'Minuman'
  },
  {
    id: '1',
    photo: `${Nasi}`,
    title: 'Aneka Nasi'
  },
  {
    id: '2',
    photo: `${Roti}`,
    title: 'Roti'
  },
  {
    id: '3',
    photo: `${Jajanan}`,
    title: 'Jajanan'
  },
  {
    id: '4',
    photo: `${Kopi}`,
    title: 'Kopi'
  },
  {
    id: '5',
    photo: `${MieBaso}`,
    title: 'Mie & Bakso'
  },
  {
    id: '6',
    photo: `${Dessert}`,
    title: 'Desert'
  },
  {
    id: '7',
    photo: `${Sunda}`,
    title: 'Sunda'
  },
  {
    id: '8',
    photo: `${Chinese}`,
    title: 'Chinese'
  },
  {
    id: '9',
    photo: `${Padang}`,
    title: 'Padang'
  },
  {
    id: '10',
    photo: `${Sate}`,
    title: 'Sate'
  },
  {
    id: '11',
    photo: `${Bubur}`,
    title: 'Bubur'
  }
];

const PersonalRecomendationDefault: PersonalRecomendationModel = {
  recomendationList: []
};

const PersonalizedRecReducer = (
  state: PersonalRecomendationModel = PersonalRecomendationDefault,
  action: PersonalizedRecAction
): PersonalRecomendationModel => {
  switch (action.type) {
    case PersonalizedRecActionType.GetPersonalizedRecomendation:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

export const PersonalizedRecomendationCommand = {
  getPersonalizeRecomendation: (): TAction<PersonalizedRecAction, void> => {
    return (dispatch: TDispatch<PersonalizedRecAction>) => {
      return Promise.resolve().then(() => {
        const personalizeRecomendation: PersonalRecomendationModel = {
          recomendationList: PERSONALIZE_RECOMENDATION
        };

        dispatch({
          data: personalizeRecomendation,
          type: PersonalizedRecActionType.GetPersonalizedRecomendation
        });
      });
    };
  },
  postPersonalizeRecomendation: (payload: unknown, token: string): Promise<string> => {
    return apiFetch(token).post(`/foodbuyer/0.1/personalize-recomendation`, payload)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        if (response.status === 200) {
          return 'ok';
        }

        return 'err';
      }).catch(() => {
        return 'err';
      });
  }
};

export { PersonalizedRecReducer, PersonalRecomendationDefault };
