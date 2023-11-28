/* eslint-disable linebreak-style */

interface MenuCheckout {
  id: number
  count: number
  detail: string
  foto: string
  harga: number
  title: string

}
interface Dana {
  id: number
  jumlah: number

}
interface RestoList {
  id: number
  restoName: string
  status: boolean
  detail: string
  foto: string

}

interface CheckoutModel {

  checkoutMenuOutput?: MenuCheckout[]
  restoListOutput?: RestoList[]
  danaOutput?: Dana[]
}

enum CheckoutActionType {
  CheckoutMenuLoad = 'checkoutmenu-load',
  CheckoutMenuClear = 'checkoutmenu-clear',
  RestoListLoad = 'restolist-load',
  RestoListClear = 'restolist-clear',
  DanaLoad = 'dana-load',
  DanaClear = 'dana-clear'

}

  type CheckoutAction = {

    type: CheckoutActionType.CheckoutMenuLoad
    value?: CheckoutModel
  } | {
    type: CheckoutActionType.CheckoutMenuClear
  } | {
    type: CheckoutActionType.DanaClear
  } | {
    type: CheckoutActionType.DanaLoad
    value?: CheckoutModel
  } | {
    type: CheckoutActionType.RestoListClear
  } | {
    type: CheckoutActionType.RestoListLoad
    value?: CheckoutModel
  };

export { CheckoutActionType };
export type { CheckoutModel, CheckoutAction };
