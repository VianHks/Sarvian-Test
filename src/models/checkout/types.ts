/* eslint-disable linebreak-style */

interface MenuCheckout {
  id: number
  count: number
  detail: string
  foto: string
  harga: number
  title: string

}

interface CheckoutModel {

  checkoutMenuOutput?: MenuCheckout[]

}

enum CheckoutActionType {
  CheckoutMenuLoad = 'checkoutmenu-load',
  CheckoutMenuClear = 'checkoutmenu-clear'

}

  type CheckoutAction = {

    type: CheckoutActionType.CheckoutMenuLoad
    value?: CheckoutModel
  } | {
    type: CheckoutActionType.CheckoutMenuClear

  };

export { CheckoutActionType };
export type { CheckoutModel, CheckoutAction };
