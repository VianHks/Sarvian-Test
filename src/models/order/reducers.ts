/* eslint-disable sort-keys */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import { apiFetch } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types';

import { OrderActionType } from './types.js';

import type { CartDataModel, CheckoutDetailsDataModel, OrderAction, OrderDetailsDataModel, OrderList, OrderListDetail, OrderModel } from './types.js';

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
        note: '',
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


const OrderDefault: OrderModel = {
  cart: DEFAULT_CART,
  checkoutDetails: DEFAULT_CHECKOUT_DETAILS,
  orderDetails: DEFAULT_ORDER_DETAILS,

  orderDetailOutput: DefaultOrderDetail,
  orderListOutput: DefaultOrderList
};

const OrderReducer = (
  state: OrderModel = OrderDefault,
  action: OrderAction
): OrderModel => {
  switch (action.type) {
    // case OrderActionType.OrderLoad:
    //   return { ...state, ...action.type };
    case OrderActionType.OrderClear:
      return {};
    case OrderActionType.GetCart:
      return { ...state, ...action.data };
    case OrderActionType.GetOrderDetails:
      return { ...state, ...action.data };
    case OrderActionType.GetCheckoutDetails:
      return { ...state, ...action.data };
    case OrderActionType.OrderDetailLoad:
      return { ...state, ...action.data };
    case OrderActionType.OrderList:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

// export const OrderCommand = {
//   deleteCheckoutLines: (checkoutId: string, linesIds: string[], token: string): Promise<string> => {
//     return fetch(`https://apigateway-dev.tokrum.com:8081/foodbuyer/0.1/checkout/${checkoutId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token
//       },
//       body: JSON.stringify({ checkoutId, linesIds })
//     })
//       .then((response: Response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         return response.json();
//       })
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .then((data: any) => {
//         const id: string = data?.checkoutId;

//         if (id) {
//           return 'ok';
//         }

//         return 'err';
//       })
//       .catch(() => {
//         return 'err';
//       });
//   },
//   getCart: (checkoutId: string, token: string): TAction<OrderAction, void> => {
//     return (dispatch: TDispatch<OrderAction>) => {
//       return apiFetch(token).get(`/foodbuyer/0.1/checkout/${checkoutId}`).then((response) => {
//         if (response.status === 200) {
//           if (response.data !== null) {
//             const order: OrderModel = {
//               cart: (response.data as CartDataModel)
//             };

//             dispatch({
//               data: order,
//               type: OrderActionType.GetCart
//             });
//           } else {
//             dispatch({
//               data: OrderDefault,
//               type: OrderActionType.GetCart
//             });
//           }
//         }
//       });
//     };
//   },
//   getCheckoutDetails: (checkoutId: string, token: string): TAction<OrderAction, void> => {
//     return (dispatch: TDispatch<OrderAction>) => {
//       return apiFetch(token).get(`/foodbuyer/0.1/checkout/details/${checkoutId}`).then((response) => {
//         if (response.status === 200) {
//           if (response.data !== null) {
//             const order: OrderModel = {
//               checkoutDetails: (response.data as CheckoutDetailsDataModel)
//             };

//             dispatch({
//               data: order,
//               type: OrderActionType.GetCheckoutDetails
//             });
//           } else {
//             dispatch({
//               data: OrderDefault,
//               type: OrderActionType.GetCheckoutDetails
//             });
//           }
//         }
//       });
//     };
//   },
//   getOrderDetails: (orderId: string, token: string): TAction<OrderAction, void> => {
//     return (dispatch: TDispatch<OrderAction>) => {
//       return apiFetch(token).get(`/foodbuyer/0.1/order/${orderId}`).then((response) => {
//         if (response.status === 200) {
//           if (response.data !== null) {
//             const order: OrderModel = {
//               orderDetails: (response.data as OrderDetailsDataModel)
//             };

//             dispatch({
//               data: order,
//               type: OrderActionType.GetOrderDetails
//             });
//           } else {
//             dispatch({
//               data: OrderDefault,
//               type: OrderActionType.GetOrderDetails
//             });
//           }
//         }
//       });
//     };
//   },
//   postCancelOrder: (payload: unknown, token: string): Promise<string> => {
//     return apiFetch(token).post(`/foodbuyer/0.1/order/cancel`, payload)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .then((response: any) => {
//         const id: string = response?.data?.orderId;

//         if (response.status === 200) {
//           return id;
//         }

//         return 'err';
//       }).catch(() => {
//         return 'err';
//       });
//   },
//   postCheckoutCustomerDetach: (payload: unknown, token: string): Promise<string> => {
//     return apiFetch(token).post(`/foodbuyer/0.1/checkout/detach`, payload)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .then((response: any) => {
//         const id: string = response?.data?.orderId;

//         if (response.status === 200) {
//           return id;
//         }

//         return 'err';
//       }).catch(() => {
//         return 'err';
//       });
//   },
//   postCreateOrder: (payload: unknown, token: string): Promise<string> => {
//     return apiFetch(token).post(`/foodbuyer/0.1/order`, payload)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .then((response: any) => {
//         const id: string = response?.data?.orderId;

//         if (response.status === 200) {
//           return id;
//         }

//         return 'err';
//       }).catch(() => {
//         return 'err';
//       });
//   },
//   getOrderList: (params: unknown, token: string): TAction<OrderAction, void> => {
//     return (dispatch: TDispatch<OrderAction>) => {
//       return apiFetch(token)
//         .post(`/foodbuyer/0.1/orders`, params)
//         .then((response) => {
//           if (response.status === 200) {
//             if (response.data !== null) {
//               const orderlist: OrderModel = {
//                 orderListOutput: response.data as OrderList
//               };

//               dispatch({
//                 data: orderlist,
//                 type: OrderActionType.OrderList
//               });
//             } else {
//               dispatch({
//                 data: OrderDefault,
//                 type: OrderActionType.OrderList
//               });
//             }
//           }
//         });
//     };
//   },
//   getOrderDetail: (id: string, token: string): TAction<OrderAction, void> => {
//     return (dispatch: TDispatch<OrderAction>) => {
//       return apiFetch(token)
//         .get(`/foodbuyer/0.1/order/${id}`)
//         .then((response) => {
//           if (response.status === 200) {
//             if (response.data !== null) {
//               const order: OrderModel = {
//                 orderDetailOutput: response.data as OrderListDetail
//               };

//               dispatch({
//                 data: order,
//                 type: OrderActionType.OrderDetailLoad
//               });
//             } else {
//               dispatch({
//                 data: OrderDefault,
//                 type: OrderActionType.OrderDetailLoad
//               });
//             }
//           }

//           console.log('cekres', response);
//         });
//     };
//   }

// };

export const OrderCommand = {
  deleteCheckoutLines: (checkoutId: string, linesIds: string[], token: string): Promise<string> => {
    return fetch(`https://apigateway-dev.tokrum.com:8081/foodbuyer/0.1/checkout/${checkoutId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({ checkoutId, linesIds })
    })
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any) => {
        const id: string = data?.checkoutId;

        if (id) {
          return 'ok';
        }

        return 'err';
      })
      .catch(() => {
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
  postCancelOrder: (payload: unknown, token: string): Promise<string> => {
    return apiFetch(token).post(`/foodbuyer/0.1/order/cancel`, payload)
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
  },
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

// const OrderCommand = {
//   deleteCheckoutLines: (checkoutId: string, linesIds: string[], token: string): Promise<string> => {
//     return fetch(`https://apigateway-dev.tokrum.com:8081/foodbuyer/0.1/checkout/${checkoutId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token
//       },
//       body: JSON.stringify({ checkoutId, linesIds })
//     })
//       .then((response: Response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         return response.json();
//       })
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .then((data: any) => {
//         const id: string = data?.checkoutId;

//         if (id) {
//           return 'ok';
//         }

//         return 'err';
//       })
//       .catch(() => {
//         return 'err';
//       });
//   },
//   getCart: (checkoutId: string, token: string): TAction<OrderAction, void> => {
//     return (dispatch: TDispatch<OrderAction>) => {
//       return apiFetch(token).get(`/foodbuyer/0.1/checkout/${checkoutId}`).then((response) => {
//         if (response.status === 200) {
//           if (response.data !== null) {
//             const order: OrderModel = {
//               cart: (response.data as CartDataModel)
//             };

//             dispatch({
//               data: order,
//               type: OrderActionType.GetCart
//             });
//           } else {
//             dispatch({
//               data: OrderDefault,
//               type: OrderActionType.GetCart
//             });
//           }
//         }
//       });
//     };
//   },
//   getCheckoutDetails: (checkoutId: string, token: string): TAction<OrderAction, void> => {
//     return (dispatch: TDispatch<OrderAction>) => {
//       return apiFetch(token).get(`/foodbuyer/0.1/checkout/details/${checkoutId}`).then((response) => {
//         if (response.status === 200) {
//           if (response.data !== null) {
//             const order: OrderModel = {
//               checkoutDetails: (response.data as CheckoutDetailsDataModel)
//             };

//             dispatch({
//               data: order,
//               type: OrderActionType.GetCheckoutDetails
//             });
//           } else {
//             dispatch({
//               data: OrderDefault,
//               type: OrderActionType.GetCheckoutDetails
//             });
//           }
//         }
//       });
//     };
//   },
//   getOrderDetails: (orderId: string, token: string): TAction<OrderAction, void> => {
//     return (dispatch: TDispatch<OrderAction>) => {
//       return apiFetch(token).get(`/foodbuyer/0.1/order/${orderId}`).then((response) => {
//         if (response.status === 200) {
//           if (response.data !== null) {
//             const order: OrderModel = {
//               orderDetails: (response.data as OrderDetailsDataModel)
//             };

//             dispatch({
//               data: order,
//               type: OrderActionType.GetOrderDetails
//             });
//           } else {
//             dispatch({
//               data: OrderDefault,
//               type: OrderActionType.GetOrderDetails
//             });
//           }
//         }
//       });
//     };
//   },
//   postCancelOrder: (payload: unknown, token: string): Promise<string> => {
//     return apiFetch(token).post(`/foodbuyer/0.1/order/cancel`, payload)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .then((response: any) => {
//         const id: string = response?.data?.orderId;

//         if (response.status === 200) {
//           return id;
//         }

//         return 'err';
//       }).catch(() => {
//         return 'err';
//       });
//   },
//   postCheckoutCustomerDetach: (payload: unknown, token: string): Promise<string> => {
//     return apiFetch(token).post(`/foodbuyer/0.1/checkout/detach`, payload)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .then((response: any) => {
//         const id: string = response?.data?.orderId;

//         if (response.status === 200) {
//           return id;
//         }

//         return 'err';
//       }).catch(() => {
//         return 'err';
//       });
//   },
//   postCreateOrder: (payload: unknown, token: string): Promise<string> => {
//     return apiFetch(token).post(`/foodbuyer/0.1/order`, payload)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       .then((response: any) => {
//         const id: string = response?.data?.orderId;

//         if (response.status === 200) {
//           return id;
//         }

//         return 'err';
//       }).catch(() => {
//         return 'err';
//       });
//   }

// };

export { OrderReducer, OrderDefault, DEFAULT_CART, DEFAULT_LINES, DEFAULT_ORDER_DETAILS };
