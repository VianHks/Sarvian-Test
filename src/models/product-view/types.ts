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

interface VariantAttributesModel {
  choices: {
    edges: {
      node: {
        id: string
        name: string
        slug: string
        value: string
      }
    }[]
  }
  id: string
  inputType: string
  name: string
}

interface ProductTypeModel {
  data: {
    productType: {
      name: string
      variantAttributes: VariantAttributesModel[]
    }
  }
}

interface ProductViewsModel {
  productDetails?: ProductDetailsDataModel
  productTypeDetails?: ProductTypeModel
  responseCreateCheckout?: CreateCheckoutDataModel
}

enum ProductViewsActionType {
  GetProductDetails = '⌘➝Product-View➝GetProductDetails',
  GetCheckoutId = '⌘➝Product-View➝GetCheckoutId',
  GetProductTypeDetails = '⌘➝Product-View➝GetProductTypeDetails'
}

type ProductViewsAction =
  | {
    data: ProductViewsModel
    type: ProductViewsActionType.GetCheckoutId
  }
  | {
    data: ProductViewsModel
    type: ProductViewsActionType.GetProductDetails
  } | {
    data: ProductViewsModel
    type: ProductViewsActionType.GetProductTypeDetails
  };

export { ProductViewsActionType };
export type {
  ProductViewsModel,
  ProductViewsAction,
  ProductDetailsDataModel,
  CreateCheckoutDataModel,
  ProductTypeModel,
  VariantAttributesModel
};
