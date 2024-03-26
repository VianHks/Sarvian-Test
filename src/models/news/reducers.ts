/* eslint-disable linebreak-style */
import { apiFetchNews } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types';

import { NewsActionType } from './types.js';

import type { NewsAction, NewsAppleList, NewsModel } from './types.js';

const DefaultNewApplesList: NewsAppleList = {
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
  ],
  status: '',
  totalResults: 0
};

const ChannelDefault: NewsModel = {
  newsAppleList: DefaultNewApplesList
};
const NewsReducer = (
  state: NewsModel = ChannelDefault,
  action: NewsAction
): NewsModel => {
  switch (action.type) {
    case NewsActionType.NewsAppleList:
      return { ...state, ...action.data };
    case NewsActionType.ClearNews:
      return ChannelDefault;

    default:
      return state;
  }
};

export const ChannelCommand = {
  getAppleNews: (endpointKey: string): TAction<NewsAction, void> => {
    return (dispatch: TDispatch<NewsAction>) => {
      dispatch({
        type: NewsActionType.ClearNews
      });

      return apiFetchNews()
        .get(`${endpointKey}`)
        .then((response: any) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const filteredArticles = response?.data?.articles.filter((article: any) => article.source.name !== '[Removed]');

              const newsappleList: NewsModel = {
                newsAppleList: {
                  ...response.data,
                  articles: filteredArticles
                }
              };

              dispatch({
                data: newsappleList,
                type: NewsActionType.NewsAppleList
              });
            } else {
              dispatch({
                data: ChannelDefault,
                type: NewsActionType.NewsAppleList
              });
            }
          }
        });
    };
  },
  clearNews: (): TAction<NewsAction, void> => {
    return (dispatch: TDispatch<NewsAction>): Promise<void> => {
      return new Promise<void>((resolve) => {
        dispatch({
          type: NewsActionType.ClearNews
        });
        resolve();
      });
    };
  }

};

export { NewsReducer, ChannelDefault };
