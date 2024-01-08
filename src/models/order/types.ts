/* eslint-disable import/exports-last */
/* eslint-disable linebreak-style */
export interface OrderList {
  data: [
    {
      billingAddress: {
        city: string
        cityArea: string
        companyName: string
        country: {
          code: string
          country: string
        }
        countryArea: string
        firstName: string
        id: string
        lastName: string
        phone: string
        postalCode: string
        streetAddress1: string
        streetAddress2: string
      }
      created: string
      id: string
      channel: {
        name: string
      }
      lines: [
        {
          id: string
          isShippingRequired: string
          metafields: {
            note: string
          }
          productName: string
          quantity: string
          quantityFulfilled: string
          thumbnail: {
            url: string
          }
          totalPrice: {
            gross: {
              amount: string
              currency: string
            }
            net: {
              amount: string
              currency: string
            }
          }
          unitPrice: {
            gross: {
              amount: string
              currency: string
            }
            net: {
              amount: string
              currency: string
            }
          }
        }
      ]
      number: string
      paymentStatus: string
      status: string
      total: {
        gross: {
          amount: number
          currency: string
        }
      }
      userEmail: string
    }
  ]
  pageInfo: {
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
  }

}

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
  orderListOutput?: OrderList

}

enum OrderActionType {
  OrderLoad = 'order-load',
  OrderClear = 'order-clear',
  OrderDetailLoad = 'orderdetail-load',
  OrderList = 'orderlist-load'
}

  type OrderAction = {

    data: OrderModel
    type: OrderActionType.OrderLoad

  } | {
    data: OrderModel
    type: OrderActionType.OrderDetailLoad
  } | {
    data: OrderModel
    type: OrderActionType.OrderList
  } | {
    type: OrderActionType.OrderClear

  };

export { OrderActionType };
export type { OrderModel, OrderAction };
