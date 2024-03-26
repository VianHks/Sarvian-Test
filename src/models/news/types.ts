/* eslint-disable import/exports-last */
/* eslint-disable linebreak-style */
export interface NewsList {
  status: string
  totalResults: number
  articles: [
    {
      source: {
        id: null
        name: string
      }
      author: string
      title: string
      description: string
      url: string
      urlToImage: null
      publishedAt: string
      content: string
    }
  ]
}

interface NewsModel {
  newsList?: NewsList

}

enum NewsActionType {

  NewsList = 'newslist-load'
}

  type NewsAction = {

    data?: NewsModel
    type: NewsActionType.NewsList

  };

export { NewsActionType };
export type { NewsModel, NewsAction };
