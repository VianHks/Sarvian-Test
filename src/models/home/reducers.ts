import { apiFetch } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types';

import { HomeActionType } from './types.js';

import type { HomeAction, HomeModel, HomeRestoListDataModel, SearchResultDataModel } from './types.js';

const DEFAULT_HOME_MENU = {
  data: {
    channels: []
  }
};

const HomeMenuDefault: HomeModel = {
  HomeRestoOutput: DEFAULT_HOME_MENU
};

const searchResultDefault: HomeModel = {
  searchResultOutput: {
    data: [],
    totalCount: 0
  }
};

const HomeReducer = (
  state: HomeModel = HomeMenuDefault,
  action: HomeAction
): HomeModel => {
  switch (action.type) {
    case HomeActionType.HomeRestoListLoad:
      return { ...state, ...action.data };
    case HomeActionType.MenuBerandaLoad:
      return { ...state, ...action.value };
    case HomeActionType.MenuBerandaClear:
      return {};
    case HomeActionType.MakananLoad:
      return { ...state, ...action.value };
    case HomeActionType.MakananClear:
      return {};
    case HomeActionType.SearchResultLoad:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

export const homeCommands = {
  getHomeMenu: (token: string): TAction<HomeAction, void> => {
    return (dispatch: TDispatch<HomeAction>) => {
      return apiFetch(token).post(`/channels`).then((response) => {
        if (response.status === 200) {
          if (response.data !== null) {
            const homeMenu: HomeModel = {
              HomeRestoOutput: (response.data as HomeRestoListDataModel)
            };

            dispatch({
              data: homeMenu,
              type: HomeActionType.HomeRestoListLoad
            });
          } else {
            dispatch({
              data: HomeMenuDefault,
              type: HomeActionType.HomeRestoListLoad
            });
          }
        }
      });
    };
  },
  searchResult: (params: unknown, token: string): TAction<HomeAction, void> => {
    return (dispatch: TDispatch<HomeAction>) => {
      return apiFetch(token).post(`/products`, params).then((response) => {
        if (response.status === 200) {
          if (response.data !== null) {
            const searchResult: HomeModel = {
              searchResultOutput: (response.data as SearchResultDataModel)
            };

            dispatch({
              data: searchResult,
              type: HomeActionType.SearchResultLoad
            });
          } else {
            dispatch({
              data: searchResultDefault,
              type: HomeActionType.SearchResultLoad
            });
          }
        }
      });
    };
  }
};

export { HomeReducer };
