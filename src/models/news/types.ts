/* eslint-disable import/exports-last */
/* eslint-disable linebreak-style */
export interface NewsAppleList {
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
  status: string
  totalResults: number

}

interface NewsModel {

  newsAppleList?: NewsAppleList

}

enum NewsActionType {
  ClearNews = 'clear-news',
  NewsAppleList = 'newsapplelist-load'
}

type NewsAction =
{
  data?: NewsModel
  type: NewsActionType.NewsAppleList
} | {
  type: NewsActionType.ClearNews
};

export { NewsActionType };
export type { NewsModel, NewsAction };
