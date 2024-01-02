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

// NEW

interface linesDataModel {
  id: string
  metafields: {
    note: string
  }
  quantity: number
  totalPrice: {
    gross: {
      amount: number
      currency: string
    }
  }
  variant: {
    id: string
    name: string
    pricing: {
      price: {
        gross: {
          amount: number
          currency: string
        }
      }
    }
    product: {
      id: string
      name: string
      slug: string
      thumbnail: {
        alt: string
        url: string
      }
    }
  }
}

interface CartDataModel {
  data: {
    checkout: {
      channel: {
        id: string
        name: string
      }
      created: string
      id: string
      lines: linesDataModel[]
      totalPrice: {
        gross: {
          amount: number
          currency: string
        }
      }
    }
  }
}

interface OrderModel {
  cart?: CartDataModel
  orderOutput?: Order[]
}

enum OrderActionType {
  GetCart = '⌘➝Cart➝GetCart',
  OrderLoad = 'order-load',
  OrderClear = 'order-clear'
}

type OrderAction =
  {
    data: OrderModel
    type: OrderActionType.GetCart
  } | {
    type: OrderActionType.OrderClear
  } | {
    type: OrderActionType.OrderLoad
    value?: OrderModel
  };

export { OrderActionType };
export type { OrderModel, OrderAction, CartDataModel, linesDataModel };
