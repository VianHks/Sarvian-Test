interface Nasi {
  id: number
  checked: boolean
  itemName: string
  price: number

}

interface Menu {
  id: number
  itemName: string
  price: number
  terjual: number

}
interface Ayam {
  id: number
  itemName: string
  price: number

}
interface Sambel {
  id: number
  itemName: string
  price: number

}

// NEW DATA MODEL

interface ChannelListingsDataModel {
  availableForPurchase: string
  channel: {
    id: string
    name: string
  }
  id: string
  isAvailableForPurchase: boolean
  isPublished: boolean
  publicationDate: string
  visibleInListings: boolean
}

interface ProductDetailsDataModel {
  data: {
    product: {
      channelListings: ChannelListingsDataModel[]
      collections: {
        id: string
        name: string
      }[]
      description: string
      id: string
      media: {
        url: string
      }[]
      metadata: {
        key: string
        value: string
      }[]
      name: string
      productType: {
        hasVariants: boolean
        id: string
        name: string
      }
      rating: number
      variants: {
        channelListings: [
          {
            channel: {
              id: string
              name: string
            }
            costPrice: {
              amount: number
              currency: string
            }
            id: string
            price: {
              amount: number
              currency: string
            }
          }
        ]
        id: string
        name: string
      }[]
    }
  }
}

interface CreateCheckoutDataModel {
  checkout_id: string
}

interface ProductViewsModel {
  nasiOutput?: Nasi[]
  ayamOutput?: Ayam[]
  sambelOutput?: Sambel[]
  menuOutput?: Menu[]

  // NEW
  productDetails?: ProductDetailsDataModel
  responseCreateCheckout?: CreateCheckoutDataModel
}

enum ProductViewsActionType {
  NasiLoad = 'nasi-load',
  NasiClear = 'nasi-clear',
  AyamLoad = 'ayam-load',
  AyamClear = 'ayam-clear',
  SambelLoad = 'sambel-load',
  SambelClear = 'sambel-clear',
  MenuLoad = 'menu-load',
  MenuClear = 'menu-clear',
  // NEW
  GetProductDetails = '⌘➝Product-View➝GetProductDetails',
  GetCheckoutId = '⌘➝Product-View➝GetCheckoutId'

}

type ProductViewsAction = {
  data: ProductViewsModel
  type: ProductViewsActionType.GetCheckoutId
} | {
  data: ProductViewsModel
  type: ProductViewsActionType.GetProductDetails
} | {
  type: ProductViewsActionType.AyamClear
} | {
  type: ProductViewsActionType.AyamLoad
  value?: ProductViewsModel
} | {
  type: ProductViewsActionType.MenuClear
} | {
  type: ProductViewsActionType.MenuLoad
  value?: ProductViewsModel

} | {
  type: ProductViewsActionType.NasiClear
} | {
  type: ProductViewsActionType.NasiLoad
  value?: ProductViewsModel
} | {
  type: ProductViewsActionType.SambelClear
} | {
  type: ProductViewsActionType.SambelLoad
  value?: ProductViewsModel
};

export { ProductViewsActionType };
export type { ProductViewsModel, ProductViewsAction, ProductDetailsDataModel, CreateCheckoutDataModel };
