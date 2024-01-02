/* eslint-disable linebreak-style */
import { OrderActionType } from './types.js';
import { apiFetch } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types';

import type { Order, OrderAction, OrderListDetail, OrderModel } from './types.js';

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

const DefaultOrder: Order ={
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
  orderDetailOutput: DefaultOrderDetail

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

    default:
      return state;
  }
};

export const OrderCommand = {
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
