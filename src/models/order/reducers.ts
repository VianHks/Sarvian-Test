/* eslint-disable linebreak-style */
import { apiFetch } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types.js';

import { OrderActionType } from './types.js';

import type { CartDataModel, CheckoutDetailsDataModel, OrderAction, OrderDetailsDataModel, OrderModel } from './types.js';

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

const DEFAULT_CHECKOUT_DETAILS = {
  data: {
    checkout: {
      channel: {
        id: '',
        metadata: [],
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
      },
      user: {
        addresses: [],
        firstName: '',
        id: '',
        lastName: ''
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

const DEFAULT_ORDER_DETAILS = {
  data: {
    order: {
      channel: {
        id: '',
        isActive: false,
        metadata: [],
        name: '',
        slug: ''
      },
      deliveryMethod: {
        __typename: '',
        id: '',
        name: ''
      },
      id: '',
      isPaid: false,
      lines: [],
      metafields: {
        buyer: '',
        conversation_id_buyer: '',
        conversation_id_driver: '',
        conversation_id_seller: '',
        driver: '',
        estimation: '',
        is_ready: '',
        order_type: '',
        seller: ''
      },
      number: '',
      paymentStatus: '',
      status: '',
      user: {
        addresses: [],
        email: '',
        firstName: '',
        id: '',
        lastName: ''
      },
      userEmail: ''
    }
  }
};

const OrderDefault: OrderModel = {
  cart: DEFAULT_CART,
  checkoutDetails: DEFAULT_CHECKOUT_DETAILS,
  orderDetails: DEFAULT_ORDER_DETAILS
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
    case OrderActionType.GetOrderDetails:
      return { ...state, ...action.data };
    case OrderActionType.GetCheckoutDetails:
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
  getCheckoutDetails: (checkoutId: string, token: string): TAction<OrderAction, void> => {
    return (dispatch: TDispatch<OrderAction>) => {
      return apiFetch(token).get(`/foodbuyer/0.1/checkout/details/${checkoutId}`).then((response) => {
        if (response.status === 200) {
          if (response.data !== null) {
            const order: OrderModel = {
              checkoutDetails: (response.data as CheckoutDetailsDataModel)
            };

            dispatch({
              data: order,
              type: OrderActionType.GetCheckoutDetails
            });
          } else {
            dispatch({
              data: OrderDefault,
              type: OrderActionType.GetCheckoutDetails
            });
          }
        }
      });
    };
  },
  getOrderDetails: (orderId: string, token: string): TAction<OrderAction, void> => {
    return (dispatch: TDispatch<OrderAction>) => {
      return apiFetch(token).get(`/foodbuyer/0.1/order/${orderId}`).then((response) => {
        if (response.status === 200) {
          if (response.data !== null) {
            const order: OrderModel = {
              orderDetails: (response.data as OrderDetailsDataModel)
            };

            dispatch({
              data: order,
              type: OrderActionType.GetOrderDetails
            });
          } else {
            dispatch({
              data: OrderDefault,
              type: OrderActionType.GetOrderDetails
            });
          }
        }
      });
    };
  },
  postCheckoutCustomerDetach: (payload: unknown, token: string): Promise<string> => {
    return apiFetch(token).post(`/foodbuyer/0.1/checkout/detach`, payload)
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

export { OrderReducer, OrderCommand, OrderDefault, DEFAULT_CART, DEFAULT_LINES, DEFAULT_ORDER_DETAILS };
