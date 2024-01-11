/* eslint-disable linebreak-style */
interface Rating {
  channelId: string
  createdAt: string
  customerId: number
  id: string
  media: []
  productId: string
  rating: number
  review: string
  updatedAt: string
  orderType: string
  orderNumber: string
}

interface RatingModel {
  data?: Rating[]
}

enum RatingActionType {
  RatingLoad = 'Rating-load',
  RatingClear = 'Rating-clear'
}

  type RatingAction = {
    type: RatingActionType.RatingClear
  } | {
    type: RatingActionType.RatingLoad
    value?: RatingModel
  };

export { RatingActionType };
export type { RatingModel, RatingAction };
