// eslint-disable-next-line import/exports-last
export interface ChannelsDataModel {
  id: string
  isActive: boolean
  metafields: {
    address: string
    badgeVerification: string
    coordinate: string
    delivery: string
    dineIn: string
    hashtag: string
    isHalal: string
    media: string
    operationalTime: string
    pickUp: string
    preparationTime: string
    rating: string
    verified: string
  }
  name: string
  slug: string
}

// eslint-disable-next-line import/exports-last
export interface HomeRestoListDataModel {
  data: {
    channels: ChannelsDataModel[]
  }
}

interface MenuBeranda {
  id: number
  itemName: string
  itemPrice: number
  location: string
  orderMethode: string []
  restoName: string
  sold: number
  verified: string

}

interface Makanan {
  id: string
  photo: string
  title: string

}

interface RestoList {
  id: number
  location: string
  open: string
  orderMethode: string
  rating: string
  restoName: string
  verified: boolean
}

interface HomeModel {
  berandaRestoListOutput?: RestoList[]
  HomeRestoOutput?: HomeRestoListDataModel
  makananOutput?: Makanan[]
  menuBerandaOutput?: MenuBeranda[]
}

enum HomeActionType {
  HomeRestoListLoad = 'HomeRestoList-load',
  HomeRestoListClear = 'HomeRestoList-clear',
  MenuBerandaLoad = 'menuberanda-load',
  MenuBerandaClear = 'menuberanda-clear',
  MakananLoad = 'makanan-load',
  MakananClear = 'makanan-clear'

}

  type HomeAction = {
    data?: HomeModel
    type: HomeActionType.HomeRestoListLoad
  } | {
    type: HomeActionType.MakananClear
  } | {
    type: HomeActionType.MakananLoad
    value?: HomeModel
  } | {
    type: HomeActionType.MenuBerandaClear
  } | {
    type: HomeActionType.MenuBerandaLoad
    value?: HomeModel
  };

export { HomeActionType };
export type { HomeModel, HomeAction };
