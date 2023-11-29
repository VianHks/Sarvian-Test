/* eslint-disable linebreak-style */

interface DetailOrder {
  COMMENT: string
  ITEM: number
  PHOTO: string
  PRICE: number
  TITLE: string
}

interface Order {
  DELIVERY_STATUS: string
  NO_ORDER: number
  ORDER_DATE: string
  ORDER_ITEM: DetailOrder[]
  ORDER_STATUS: string
  RESTO_NAME: string
  SINGLE_ORDER: boolean
}

interface OrderModel {

  //   ProductviewOutput?: ProductView[]
  orderOutput?: Order[]

}

enum OrderActionType {
  OrderLoad = 'order-load',
  OrderClear = 'order-clear'
}

  type OrderAction = {

    type: OrderActionType.OrderLoad
    value?: OrderModel

  } | {
    type: OrderActionType.OrderClear

  };

export { OrderActionType };
export type { OrderModel, OrderAction };
