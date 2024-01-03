/* eslint-disable linebreak-style */
import { apiFetch } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types.js';

import { OrderActionType } from './types.js';

import type { CartDataModel, OrderAction, OrderModel } from './types.js';

const DEFAULT_CART = {
  data: {
    checkout: {
      channel: {
        id: '',
        name: ''
      },
      created: '',
      id: '',
      lines: [],
      totalPrice: {
        gross: {
          amount: 0,
          currency: ''
        }
      }
    }
  }
};

const DEFAULT_LINES = [
  {
    id: '',
    metafields: {
      note: ''
    },
    quantity: 0,
    totalPrice: {
      gross: {
        amount: 0,
        currency: ''
      }
    },
    variant: {
      id: '',
      name: '',
      pricing: {
        price: {
          gross: {
            amount: 0,
            currency: ''
          }
        }
      },
      product: {
        id: '',
        name: '',
        slug: '',
        thumbnail: {
          alt: '',
          url: ''
        }
      }
    }
  }
];

const OrderDefault: OrderModel = {
  cart: DEFAULT_CART
};

const OrderReducer = (
  state: OrderModel = OrderDefault,
  action: OrderAction
): OrderModel => {
  switch (action.type) {
    case OrderActionType.OrderLoad:
      return { ...state, ...action.value };
    case OrderActionType.OrderClear:
      return {};
    case OrderActionType.GetCart:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

const OrderCommand = {
  deleteCheckoutLines: (checkoutId: string, linesIds: string[], token: string): Promise<string> => {
    return fetch(`https://apigateway-dev.tokrum.com:8081/foodbuyer/0.1/checkout/${checkoutId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({ checkoutId, linesIds })
    })
      .then((response) => {
        if (response.status === 200) {
          return 'ok';
        }

        return 'err';
      }).catch(() => {
        return 'err';
      });
  },
  getCart: (checkoutId: string, token: string): TAction<OrderAction, void> => {
    return (dispatch: TDispatch<OrderAction>) => {
      return apiFetch(token).get(`/foodbuyer/0.1/checkout/${checkoutId}`).then((response) => {
        if (response.status === 200) {
          if (response.data !== null) {
            const order: OrderModel = {
              cart: (response.data as CartDataModel)
            };

            dispatch({
              data: order,
              type: OrderActionType.GetCart
            });
          } else {
            dispatch({
              data: OrderDefault,
              type: OrderActionType.GetCart
            });
          }
        }
      });
    };
  },
  postCreateOrder: (payload: unknown, token: string): Promise<string> => {
    return apiFetch(token).post(`/foodbuyer/0.1/order`, payload)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        const id: string = response?.data?.orderId;

        if (response.status === 200) {
          return id;
        }

        return 'err';
      }).catch(() => {
        return 'err';
      });
  }
};

export { OrderReducer, OrderCommand, OrderDefault, DEFAULT_CART, DEFAULT_LINES };
