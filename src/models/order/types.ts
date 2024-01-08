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

interface CheckoutDetailsDataModel {
  data: {
    checkout: {
      channel: {
        id: string
        metadata: {
          key: string
          value: string
        }[]
        name: string
      }
      created: string
      id: string
      lines: {
        id: string
        metadata: {
          key: string
          value: string
        }[]
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
      }[]
      totalPrice: {
        gross: {
          amount: number
          currency: string
        }
      }
      user: {
        addresses: {
          city: string
          countryArea: string
          id: string
          postalCode: string
          streetAddress1: string
        }[]
        firstName: string
        id: string
        lastName: string
      }
    }
  }
}

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
      user: {
        addresses: {
          city: string
          countryArea: string
          id: string
          postalCode: number
          streetAddress1: string
        }[]
        firstName: string
        id: string
        lastName: string
      }
    }
  }
}

interface OrderDataModel {
  channel: {
    id: string
    isActive: boolean
    metadata: {
      key: string
      value: string
    }[]
    name: string
    slug: string
  }
  deliveryMethod: {
    __typename: string
    id: string
    name: string
  }
  id: string
  isPaid: boolean
  lines: {
    id: string
    metadata: {
      key: string
      value: string
    }[]
    productName: string
    quantity: number
    thumbnail: {
      url: string
    }
    totalPrice: {
      gross: {
        amount: number
        currency: string
      }
      net: {
        amount: number
        currency: string
      }
    }
    unitPrice: {
      gross: {
        amount: number
        currency: string
      }
      net: {
        amount: number
        currency: string
      }
    }
  }[]
  metafields: {
    buyer: string
    conversation_id_buyer: string
    conversation_id_driver: string
    conversation_id_seller: string
    driver: string
    estimation: string
    is_ready: string
    note: string
    order_type: string
    seller: string
  }
  number: string
  paymentStatus: string
  status: string
  user: {
    addresses: {
      city: string
      countryArea: string
      postalCode: string
      streetAddress1: string
    }[]
    email: string
    firstName: string
    id: string
    lastName: string
  }
  userEmail: string
}

interface OrderDetailsDataModel {
  data: {
    order: OrderDataModel
  }
}

interface OrderModel {
  cart?: CartDataModel
  checkoutDetails?: CheckoutDetailsDataModel
  orderDetails?: OrderDetailsDataModel
  orderOutput?: Order[]
}

enum OrderActionType {
  GetCart = '⌘➝Cart➝GetCart',
  GetCheckoutDetails = '⌘➝Cart➝GetCheckoutDetails',
  GetOrderDetails = '⌘➝Order➝GetOrderDetails',
  OrderLoad = 'order-load',
  OrderClear = 'order-clear'
}

type OrderAction =
  {
    data: OrderModel
    type: OrderActionType.GetCart
  } | {
    data: OrderModel
    type: OrderActionType.GetCheckoutDetails
  } | {
    data: OrderModel
    type: OrderActionType.GetOrderDetails
  } | {
    type: OrderActionType.OrderClear
  } | {
    type: OrderActionType.OrderLoad
    value?: OrderModel
  };

export { OrderActionType };
export type { OrderModel, OrderAction, CartDataModel, linesDataModel, OrderDetailsDataModel, OrderDataModel, CheckoutDetailsDataModel };
