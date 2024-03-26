/* eslint-disable linebreak-style */
import { apiFetch, apiFetchNews } from '@api/base.js';
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

import type { CustomerProfile, NewsList, PersonalizedRecAction, PersonalRecomendationModel, RecMenu } from './types.js';

const DefaultMenuRec: RecMenu = {
  data: [
    {
      id: '',
      photo: '',
      title: ''
    }
  ]
};

const DefaultNewsList: NewsList = {
  status: '',
  totalResults: 0,
  articles: [
    {
      source: {
        id: null,
        name: ''
      },
      author: '',
      title: '',
      description: '',
      url: '',
      urlToImage: null,
      publishedAt: '',
      content: ''
    }
  ]
};

const DefaultCustProfile: CustomerProfile = {
  data: {
    user: {
      dateJoined: '',
      defaultBillingAddress: {
        city: '',
        cityArea: '',
        companyName: '',
        country: {
          code: '',
          country: ''
        },
        countryArea: '',
        firstName: '',
        id: '',
        lastName: '',
        phone: '',
        postalCode: '',
        streetAddress1: '',
        streetAddress2: ''
      },
      defaultShippingAddress: {
        city: '',
        cityArea: '',
        companyName: '',
        country: {
          code: '',
          country: ''
        },
        countryArea: '',
        firstName: '',
        id: '',
        lastName: '',
        phone: '',
        postalCode: '',
        streetAddress1: '',
        streetAddress2: ''
      },
      email: '',
      firstName: '',
      id: '',
      isActive: false,
      lastName: '',
      lastPlacedOrder: {
        edges: [
          {
            node: {
              created: '',
              id: ''
            }
          }
        ]
      },
      metadata: [
        {
          key: '',
          value: ''
        }
      ],
      note: '',
      orders: {
        edges: [
          {
            node: {
              created: '',
              id: '',
              number: '',
              paymentStatus: '',
              total: {
                gross: {
                  amount: 0,
                  currency: ''
                }
              }
            }
          }
        ]
      }
    }
  },
  extensions: {
    cost: {
      maximumAvailable: 0,
      requestedQueryCost: 0
    }
  }
};

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
  recomendationList: [],
  recomendationMenu: DefaultMenuRec,
  customerProfile: DefaultCustProfile,
  newsList: DefaultNewsList
};

const PersonalizedRecReducer = (
  state: PersonalRecomendationModel = PersonalRecomendationDefault,
  action: PersonalizedRecAction
): PersonalRecomendationModel => {
  switch (action.type) {
    case PersonalizedRecActionType.GetPersonalizedRecomendation:
      return { ...state, ...action.data };
    case PersonalizedRecActionType.GetRecomendationMenu:
      return { ...state, ...action.data };
    case PersonalizedRecActionType.GetCustomerProfile:
      return { ...state, ...action.data };
    case PersonalizedRecActionType.GetListNews:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

export const PersonalizedRecomendationCommand = {
  getNews: (): TAction<PersonalizedRecAction, void> => {
    return (dispatch: TDispatch<PersonalizedRecAction>) => {
      return apiFetchNews()
        .get(`https://newsapi.org/v2/everything?q=apple&from=2024-03-24&to=2024-03-24&sortBy=popularity&apiKey=157526369f7f4408aec5ceb566f3309b`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const newsList: PersonalRecomendationModel = {
                newsList: response.data as NewsList
              };

              dispatch({
                data: newsList,
                type: PersonalizedRecActionType.GetListNews
              });
            } else {
              dispatch({
                data: PersonalRecomendationDefault,
                type: PersonalizedRecActionType.GetListNews
              });
            }
          }
        });
    };
  },
  getMenuRecomendation: (token: string): TAction<PersonalizedRecAction, void> => {
    return (dispatch: TDispatch<PersonalizedRecAction>) => {
      return apiFetch(token)
        .get(`/menu-recomendation`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const recMenu: PersonalRecomendationModel = {
                recomendationMenu: response.data as RecMenu
              };

              dispatch({
                data: recMenu,
                type: PersonalizedRecActionType.GetRecomendationMenu
              });
            } else {
              dispatch({
                data: PersonalRecomendationDefault,
                type: PersonalizedRecActionType.GetRecomendationMenu
              });
            }
          }
        });
    };
  },
  getCustomerProfile: (token: string, tokenKey: unknown): TAction<PersonalizedRecAction, void> => {
    return (dispatch: TDispatch<PersonalizedRecAction>) => {
      return apiFetch(token)
        .post(`/customer`, tokenKey)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const custProfile: PersonalRecomendationModel = {
                customerProfile: response.data as CustomerProfile
              };

              dispatch({
                data: custProfile,
                type: PersonalizedRecActionType.GetCustomerProfile
              });
            } else {
              dispatch({
                data: PersonalRecomendationDefault,
                type: PersonalizedRecActionType.GetCustomerProfile
              });
            }
          }
        });
    };
  },
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
    return apiFetch(token).post(`/personalize-recomendation`, payload)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        if (response.status === 200) {
          return 'ok';
        }

        return 'err';
      }).catch(() => {
        return 'err';
      });
  },
  isEmailRegistered: (token: string): Promise<boolean> => {
    return (
      apiFetch(token)
        .post(`/customer/isregistered`, { token })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          const { isRegistered } = response.data;

          if (response.status === 200) {
            return isRegistered;
          }

          return 'err';
        })
        .catch(() => {
          return 'err';
        })
    );
  }
};

export { PersonalizedRecReducer, PersonalRecomendationDefault };
