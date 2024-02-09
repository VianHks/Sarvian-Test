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

interface LinesModel {
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
          amount: 0
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

interface CheckoutsDataModel {
  channel: {
    id: string
    name: string
  }
  created: string
  id: string
  lines: LinesModel[]
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
    }[]
    email: string
    firstName: string
    id: string
    lastName: string
  }
}

interface CheckoutsModel {
  data: CheckoutsDataModel[]
  pageInfo: {
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
  }
  totalCount: number
}

interface OrderModel {
  cart?: CartDataModel
  checkoutDetails?: CheckoutDetailsDataModel
  checkouts?: CheckoutsModel
  orderDetailOutput?: OrderListDetail
  orderDetails?: OrderDetailsDataModel
  orderListOutput?: OrderList
  orderOutput?: Order[]

}

enum OrderActionType {
  GetCart = '⌘➝Cart➝GetCart',
  GetCheckoutDetails = '⌘➝Cart➝GetCheckoutDetails',
  GetCheckouts = '⌘➝Cart➝GetCheckouts',
  GetOrderDetails = '⌘➝Order➝GetOrderDetails',
  OrderLoad = 'order-load',
  OrderClear = 'order-clear',
  OrderDetailLoad = 'orderdetail-load',
  OrderList = 'orderlist-load'
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
    type: OrderActionType.GetCheckoutDetails
  } | {
    data: OrderModel
    type: OrderActionType.GetCheckouts
  } | {
    data: OrderModel
    type: OrderActionType.GetOrderDetails

  } | {
    data: OrderModel
    type: OrderActionType.GetOrderDetails
  } | {
    data: OrderModel
    type: OrderActionType.OrderDetailLoad
  } | {
    data: OrderModel
    type: OrderActionType.OrderList
  } | {
    data: OrderModel
    type: OrderActionType.OrderLoad
  } | {
    type: OrderActionType.OrderClear
  } | {
    type: OrderActionType.OrderClear
  } | {
    type: OrderActionType.OrderLoad
    value?: OrderModel

  };

export { OrderActionType };
export type { OrderModel, OrderAction, CartDataModel, linesDataModel, OrderDetailsDataModel, OrderDataModel, CheckoutDetailsDataModel, CheckoutsModel, LinesModel, CheckoutsDataModel };
