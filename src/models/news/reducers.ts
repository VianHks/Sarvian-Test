/* eslint-disable linebreak-style */
import { apiFetchNews } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types';

import { NewsActionType } from './types.js';

import type { NewsAction, NewsList, NewsModel } from './types.js';

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

const ChannelDefault: NewsModel = {
  newsList: DefaultNewsList
};
const HalamanRestoReducer = (
  state: NewsModel = ChannelDefault,
  action: NewsAction
): NewsModel => {
  switch (action.type) {
    case NewsActionType.NewsList:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

export const ChannelCommand = {
  getNews: (): TAction<NewsAction, void> => {
    return (dispatch: TDispatch<NewsAction>) => {
      return apiFetchNews()
        .get(`https://newsapi.org/v2/everything?q=apple&from=2024-03-24&to=2024-03-24&sortBy=popularity&apiKey=157526369f7f4408aec5ceb566f3309b`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const newsList: NewsModel = {
                newsList: response.data as NewsList
              };

              dispatch({
                data: newsList,
                type: NewsActionType.NewsList
              });
            } else {
              dispatch({
                data: ChannelDefault,
                type: NewsActionType.NewsList
              });
            }
          }
        });
    };
  }
};

export { HalamanRestoReducer, ChannelDefault };
