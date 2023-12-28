/* eslint-disable import/exports-last */
/* eslint-disable linebreak-style */

export interface ChannelDetailDataModel {
  avgRating: string
  data: {
    channel: {

      currencyCode: string
      defaultCountry: {

        code: string
        country: string
      }
      hasOrders: boolean
      id: string
      isActive: boolean
      metafields: {
        address: string
        media: string
        bank_account_name: string
        bank_account_no: number
        bank_name: string
        delivery: string
        dine_in: string
        jadwal_operasional: string
        pick_up: string
      }
      name: string
      orderSettings: {
        allowUnpaidOrders: boolean
        deleteExpiredOrdersAfter: number
        markAsPaidStrategy: string
      }
      paymentSettings: {

        defaultTransactionFlowStrategy: string
      }
      slug: string
      stockSettings: {

        allocationStrategy: string
      }
      warehouses: [
        {

          address: {
            city: string
            cityArea: string
            streetAddress1: string
            streetAddress2: string
          }
          id: string
          name: string
        }
      ]
    }
  }
}
export interface ProductListDataModel {
  data: [
    {
      channelListings: [
        {
          channel: {
            id: string
            name: string
          }
          isPublished: boolean
          publicationDate: string
        }
      ]
      id: string
      name: string
      products: {
        totalCount: number
      }
    }
  ]
  pageInfo: {
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
  }
}
export interface ProductByMetadataDataModel {
  data: [
    {
      availableForPurchase: string
      availableForPurchaseAt: string
      channel: string
      description: string
      id: string
      isAvailable: boolean
      isAvailableForPurchase: boolean
      metafields: {
        recomendation: string
      }
      name: string
      pricing: {
        displayGrossPrices: boolean
        priceRange: {
          start: {
            gross: {
              amount: number
            }
            net: {
              amount: number
            }
          }
        }
      }
      rating: number
      thumbnail: {
        alt: string
        url: string
      }
    }
  ]
  pageInfo: {
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
  }
  totalCount: number
}
export interface ProductbyCollectionsDataModel {
  data: [
    {
      channelListings: [
        {
          availableForPurchase: string
          channel: {
            currencyCode: string
            id: string
            name: string
          }
          isAvailableForPurchase: boolean
          isPublished: boolean
          publicationDate: string
          visibleInListings: boolean
        }
      ]
      description: string
      id: string
      name: string
      pricing: {
        priceRange: {
          start: {
            currency: string
            gross: {
              amount: number
              currency: string
            }
            net: {
              amount: number
              currency: string
            }
          }
        }
      }
      productType: {
        hasVariants: boolean
        id: string
        name: string
      }
      thumbnail: {
        url: string
      }
      updatedAt: string
    }
  ]
  pageInfo: {
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
  }
  totalCount: number
}
interface UlasanAndRating {
  id: number
  userName: string
  rating: string
  commentTag: string
  tagDetail: string []
  commentDetail: string
  tanggal: string

}
interface MenuRekomend {
  id: number
  count: number
  foto: string
  harga: number
  title: string
  terjual: number
  customized: boolean
  stok: number
}

interface PaketHemat {
  id: number
  count: number
  foto: string
  harga: number
  title: string
  terjual: number
  customized: boolean
  stok: number
}
interface RestoRating {
  id: number
  location: string
  open: string
  orderMethode: string
  rating: string
  restoName: string
  verified: boolean
  foto: string
}

interface HalamanRestoModel {

  ulasanRatingOutput?: UlasanAndRating[]
  menuRekomendOutput?: MenuRekomend[]
  paketHematOutput?: PaketHemat[]
  restoRatingOutput?: RestoRating[]
  channelDetailOutput?: ChannelDetailDataModel
  productListOutput?: ProductListDataModel
  productByMetadataOutput?: ProductByMetadataDataModel
  productByCollectionsOutput?: ProductbyCollectionsDataModel

}

enum HalamanRestoActionType {
  UlasanAndRatingLoad = 'ulasanandrating-load',
  UlasanAndRatingClear = 'ulasanandrating-clear',
  MenuRekomendLoad = 'menurekomend-load',
  MenuRekomendClear = 'menurekomend-clear',
  PaketHematLoad = 'pakethemat-load',
  PaketHematClear = 'pakethemat-clear',
  RestoRatingLoad = 'restorating-load',
  RestoRatingClear = 'restorating-clear',
  ChannelDetailLoad = 'channel-channelDetail-load',
  ProductListLoad = 'productlist-load',
  ProductbyMetadataLoad = 'productbyMetadata-load',
  ProductbyCollectionLoad = 'productbyCollection-load'
}

  type HalamanRestoAction = {

    type: HalamanRestoActionType.UlasanAndRatingLoad
    value?: HalamanRestoModel
  } | {
    data: HalamanRestoModel
    type: HalamanRestoActionType.ChannelDetailLoad
  } | {
    data: HalamanRestoModel
    type: HalamanRestoActionType.ProductbyCollectionLoad
  } | {
    data: HalamanRestoModel
    type: HalamanRestoActionType.ProductbyMetadataLoad
  } | {
    data: HalamanRestoModel
    type: HalamanRestoActionType.ProductListLoad
  } | {
    type: HalamanRestoActionType.MenuRekomendClear
  } | {
    type: HalamanRestoActionType.MenuRekomendLoad
    value?: HalamanRestoModel
  } | {
    type: HalamanRestoActionType.PaketHematClear
  } | {
    type: HalamanRestoActionType.PaketHematLoad
    value?: HalamanRestoModel
  } | {
    type: HalamanRestoActionType.RestoRatingClear
  } | {
    type: HalamanRestoActionType.RestoRatingLoad
    value?: HalamanRestoModel
  } | {
    type: HalamanRestoActionType.UlasanAndRatingClear
  };

export { HalamanRestoActionType };
export type { HalamanRestoModel, HalamanRestoAction };
