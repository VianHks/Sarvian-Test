/* eslint-disable linebreak-style */

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

interface BerandaModel {

  menuBerandaOutput?: MenuBeranda[]
  makananOutput?: Makanan[]
  berandaRestoListOutput?: RestoList[]

}

enum BerandaActionType {
  MenuBerandaLoad = 'menuberanda-load',
  MenuBerandaClear = 'menuberanda-clear',
  MakananLoad = 'makanan-load',
  MakananClear = 'makanan-clear',
  RestoListLoad = 'restolist-load',
  RestoListClear = 'restolist-clear'

}

  type BerandaAction = {

    type: BerandaActionType.MenuBerandaLoad
    value?: BerandaModel
  } | {
    type: BerandaActionType.MakananClear
  } | {
    type: BerandaActionType.MakananLoad
    value?: BerandaModel
  } | {
    type: BerandaActionType.MenuBerandaClear
  } | {
    type: BerandaActionType.RestoListClear
  } | {
    type: BerandaActionType.RestoListLoad
    value?: BerandaModel
  };

export { BerandaActionType };
export type { BerandaModel, BerandaAction };
