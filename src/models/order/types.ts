/* eslint-disable import/exports-last */
/* eslint-disable linebreak-style */

export interface OrderListDetail {
  data: {
    order: {
      Typename: string
      channel: {
        Typename: string
        id: string
        isActive: boolean
        name: string
        slug: string
      }
      deliveryMethod: {
        Typename: string
        clickAndCollectOption: string
        id: string
      }
      id: string
      isPaid: boolean
      lines: [
        {
          Typename: string
          id: string
          isShippingRequired: boolean
          metadata: [
            {
              key: string
              value: string
            }
          ]
          productName: string
          quantity: number
          quantityFulfilled: number
          thumbnail: {
            Typename: string
            url: string
          }
          totalPrice: {
            Typename: string
            gross: {
              Typename: string
              amount: number
              currency: string
            }
            net: {
              Typename: string
              amount: number
              currency: string
            }
          }
          unitPrice: {
            Typename: string
            gross: {
              Typename: string
              amount: number
              currency: string
            }
            net: {
              Typename: string
              amount: number
              currency: string
            }
          }
        }
      ]
      metafields: {
        buyer: string
        conversationIdBuyer: number
        conversationIdDriver: number
        conversationIdSeller: number
        driver: string
        isReady: boolean
        orderType: string
        seller: string
      }
      number: number
      paymentStatus: string
      status: string
      user: {
        Typename: string
        email: string
        firstName: string
        id: string
        lastName: string
      }
      userEmail: string
    }
  }
}
interface DetailOrder {
  COMMENT: string
  ITEM: number
  PHOTO: string
  PRICE: number
  TITLE: string
}

export interface Order {
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
  orderOutput?: Order
  orderDetailOutput?: OrderListDetail

}

enum OrderActionType {
  OrderLoad = 'order-load',
  OrderClear = 'order-clear',
  OrderDetailLoad = 'orderdetail-load'
}

  type OrderAction = {

    data: OrderModel
    type: OrderActionType.OrderLoad

  } | {
    data: OrderModel
    type: OrderActionType.OrderDetailLoad
  } | {
    type: OrderActionType.OrderClear

  };

export { OrderActionType };
export type { OrderModel, OrderAction };
