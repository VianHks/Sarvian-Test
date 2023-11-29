/* eslint-disable linebreak-style */

interface commentDetail {

}
interface UlasanAndRating {
  id: number
  userName: string
  rating: string
  commentTag: string
  tagDetail: string []
  commentDetail: string
  tanggal: string

}
interface MenuRekomend {
  id: number
  count: number
  foto: string
  harga: number
  title: string
  terjual: number
  customized: boolean
  stok: number
}

interface PaketHemat {
  id: number
  count: number
  foto: string
  harga: number
  title: string
  terjual: number
  customized: boolean
  stok: number
}
interface RestoRating {
  id: number
  location: string
  open: string
  orderMethode: string
  rating: string
  restoName: string
  verified: boolean
  foto: string
}

interface HalamanRestoModel {

  ulasanRatingOutput?: UlasanAndRating[]
  menuRekomendOutput?: MenuRekomend[]
  paketHematOutput?: PaketHemat[]
  restoRatingOutput?: RestoRating[]
}

enum HalamanRestoActionType {
  UlasanAndRatingLoad = 'ulasanandrating-load',
  UlasanAndRatingClear = 'ulasanandrating-clear',
  MenuRekomendLoad = 'menurekomend-load',
  MenuRekomendClear = 'menurekomend-clear',
  PaketHematLoad = 'pakethemat-load',
  PaketHematClear = 'pakethemat-clear',
  RestoRatingLoad = 'restorating-load',
  RestoRatingClear = 'restorating-clear'

}

  type HalamanRestoAction = {

    type: HalamanRestoActionType.UlasanAndRatingLoad
    value?: HalamanRestoModel
  } | {
    type: HalamanRestoActionType.MenuRekomendClear
  } | {
    type: HalamanRestoActionType.MenuRekomendLoad
    value?: HalamanRestoModel
  } | {
    type: HalamanRestoActionType.PaketHematClear
  } | {
    type: HalamanRestoActionType.PaketHematLoad
    value?: HalamanRestoModel
  } | {
    type: HalamanRestoActionType.RestoRatingClear
  } | {
    type: HalamanRestoActionType.RestoRatingLoad
    value?: HalamanRestoModel
  } | {
    type: HalamanRestoActionType.UlasanAndRatingClear
  };

export { HalamanRestoActionType };
export type { HalamanRestoModel, HalamanRestoAction };
