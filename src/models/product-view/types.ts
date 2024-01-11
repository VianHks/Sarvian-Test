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
  productDetails?: ProductDetailsDataModel
  responseCreateCheckout?: CreateCheckoutDataModel
}

enum ProductViewsActionType {
  GetProductDetails = '⌘➝Product-View➝GetProductDetails',
  GetCheckoutId = '⌘➝Product-View➝GetCheckoutId'

}

type ProductViewsAction = {
  data: ProductViewsModel
  type: ProductViewsActionType.GetCheckoutId
} | {
  data: ProductViewsModel
  type: ProductViewsActionType.GetProductDetails
};

export { ProductViewsActionType };
export type { ProductViewsModel, ProductViewsAction, ProductDetailsDataModel, CreateCheckoutDataModel };
