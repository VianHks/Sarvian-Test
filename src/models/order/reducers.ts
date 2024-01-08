/* eslint-disable linebreak-style */
import { apiFetch } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types';

import { OrderActionType } from './types.js';

import type { Order, OrderAction, OrderList, OrderListDetail, OrderModel } from './types.js';

const DefaultOrderList: OrderList = {
  data: [
    {
      billingAddress: {
        city: '',
        cityArea: '',
        companyName: '',
        country: {
          code: '',
          country: ''
        },
        countryArea: '',
        firstName: '',
        id: '',
        lastName: '',
        phone: '',
        postalCode: '',
        streetAddress1: '',
        streetAddress2: ''
      },
      created: '',
      id: '',
      channel: {
        name: ''
      },
      lines: [
        {
          id: '',
          isShippingRequired: '',
          metafields: {
            note: ''
          },
          productName: '',
          quantity: '',
          quantityFulfilled: '',
          thumbnail: {
            url: ''
          },
          totalPrice: {
            gross: {
              amount: '',
              currency: ''
            },
            net: {
              amount: '',
              currency: ''
            }
          },
          unitPrice: {
            gross: {
              amount: '',
              currency: ''
            },
            net: {
              amount: '',
              currency: ''
            }
          }
        }
      ],
      number: '',
      paymentStatus: '',
      status: '',
      total: {
        gross: {
          amount: 0,
          currency: ''
        }
      },
      userEmail: ''
    }
  ],
  pageInfo: {
    endCursor: '',
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: ''
  }
};
const DefaultOrderDetail: OrderListDetail = {
  data: {
    order: {
      Typename: '',
      channel: {
        Typename: '',
        id: '',
        isActive: false,
        name: '',
        slug: ''
      },
      deliveryMethod: {
        Typename: '',
        clickAndCollectOption: '',
        id: ''
      },
      id: '',
      isPaid: false,
      lines: [
        {
          Typename: '',
          id: '',
          isShippingRequired: false,
          metadata: [
            {
              key: '',
              value: ''
            }
          ],
          productName: '',
          quantity: 0,
          quantityFulfilled: 0,
          thumbnail: {
            Typename: '',
            url: ''
          },
          totalPrice: {
            Typename: '',
            gross: {
              Typename: '',
              amount: 0,
              currency: ''
            },
            net: {
              Typename: '',
              amount: 0,
              currency: ''
            }
          },
          unitPrice: {
            Typename: '',
            gross: {
              Typename: '',
              amount: 0,
              currency: ''
            },
            net: {
              Typename: '',
              amount: 0,
              currency: ''
            }
          }
        }
      ],
      metafields: {
        buyer: '',
        conversationIdBuyer: 0,
        conversationIdDriver: 0,
        conversationIdSeller: 0,
        driver: '',
        isReady: false,
        orderType: '',
        seller: ''
      },
      number: 0,
      paymentStatus: '',
      status: '',
      user: {
        Typename: '',
        email: '',
        firstName: '',
        id: '',
        lastName: ''
      },
      userEmail: ''
    }
  }
};

const DefaultOrder: Order = {
  DELIVERY_STATUS: '',
  NO_ORDER: 0,
  ORDER_DATE: '',
  ORDER_ITEM: [],
  ORDER_STATUS: '',
  RESTO_NAME: '',
  SINGLE_ORDER: false
};

const OrderDefault: OrderModel = {
  orderOutput: DefaultOrder,
  orderDetailOutput: DefaultOrderDetail,
  orderListOutput: DefaultOrderList
};

const OrderReducer = (
  state: OrderModel = OrderDefault,
  action: OrderAction
): OrderModel => {
  switch (action.type) {
    case OrderActionType.OrderLoad:
      return { ...state, ...action.data };
    case OrderActionType.OrderDetailLoad:
      return { ...state, ...action.data };
    case OrderActionType.OrderList:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

export const OrderCommand = {
  getOrderList: (params: unknown, token: string): TAction<OrderAction, void> => {
    return (dispatch: TDispatch<OrderAction>) => {
      return apiFetch(token)
        .post(`/foodbuyer/0.1/orders`, params)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const orderlist: OrderModel = {
                orderListOutput: response.data as OrderList
              };

              dispatch({
                data: orderlist,
                type: OrderActionType.OrderList
              });
            } else {
              dispatch({
                data: OrderDefault,
                type: OrderActionType.OrderList
              });
            }
          }
        });
    };
  },
  getOrderDetail: (id: string, token: string): TAction<OrderAction, void> => {
    return (dispatch: TDispatch<OrderAction>) => {
      return apiFetch(token)
        .get(`/foodbuyer/0.1/order/${id}`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const order: OrderModel = {
                orderDetailOutput: response.data as OrderListDetail
              };

              dispatch({
                data: order,
                type: OrderActionType.OrderDetailLoad
              });
            } else {
              dispatch({
                data: OrderDefault,
                type: OrderActionType.OrderDetailLoad
              });
            }
          }

          console.log('cekres', response);
        });
    };
  }

};

export { OrderReducer };
