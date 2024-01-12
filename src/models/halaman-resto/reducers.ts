/* eslint-disable linebreak-style */
import { apiFetch } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types';

import { HalamanRestoActionType } from './types.js';

import type { ChannelDetailDataModel, HalamanRestoAction, HalamanRestoModel, ProductbyCollectionsDataModel, ProductByMetadataDataModel, ProductListDataModel } from './types.js';

const DefaultChannelDetail: ChannelDetailDataModel = {
  avgRating: '',
  data: {
    channel: {
      currencyCode: '',
      defaultCountry: {
        code: '',
        country: ''
      },
      hasOrders: false,
      id: '',
      isActive: false,
      metafields: {
        address: '',
        media: '',
        bank_account_name: '',
        bank_account_no: 0,
        bank_name: '',
        delivery: '',
        dine_in: '',
        operationalHour: '',
        pick_up: ''
      },
      name: '',
      orderSettings: {
        allowUnpaidOrders: false,
        deleteExpiredOrdersAfter: 0,
        markAsPaidStrategy: ''
      },
      paymentSettings: {

        defaultTransactionFlowStrategy: ''
      },
      slug: '',
      stockSettings: {

        allocationStrategy: ''
      },
      warehouses: [
        {

          address: {
            city: '',
            cityArea: '',
            streetAddress1: '',
            streetAddress2: ''
          },
          id: '',
          name: ''
        }
      ]
    }
  }
};
const DefaultProductList: ProductListDataModel = {
  data: [
    {
      channelListings: [
        {
          channel: {
            id: '',
            name: ''
          },
          isPublished: true,
          publicationDate: ''
        }
      ],
      id: '',
      name: '',
      products: {
        totalCount: 0
      }
    }
  ],
  pageInfo: {
    endCursor: '',
    hasNextPage: true,
    hasPreviousPage: true,
    startCursor: ''
  }
};
const DefaultCollectionsbyMetadata: ProductByMetadataDataModel = {
  data: [
    {
      availableForPurchase: '',
      availableForPurchaseAt: '',
      channel: '',
      description: '',
      id: '',
      isAvailable: true,
      isAvailableForPurchase: true,
      metafields: {
        recomendation: ''
      },
      name: '',
      pricing: {
        displayGrossPrices: true,
        priceRange: {
          start: {
            gross: {
              amount: 0
            },
            net: {
              amount: 0
            }
          }
        }
      },
      rating: 0,
      thumbnail: {
        alt: '',
        url: ''
      }
    }
  ],
  pageInfo: {
    endCursor: '',
    hasNextPage: true,
    hasPreviousPage: true,
    startCursor: ''
  },
  totalCount: 0
};
const DefaultProductbyCollection: ProductbyCollectionsDataModel = {
  data: [
    {
      channelListings: [
        {
          availableForPurchase: '',
          channel: {
            currencyCode: '',
            id: '',
            name: ''
          },
          isAvailableForPurchase: true,
          isPublished: true,
          publicationDate: '',
          visibleInListings: true
        }
      ],
      collections: [
        {
          id: '',
          name: ''
        }
      ],
      description: '',
      id: '',
      name: '',
      pricing: {
        priceRange: {
          start: {
            currency: '',
            gross: {
              amount: 0,
              currency: ''
            },
            net: {
              amount: 0,
              currency: ''
            }
          }
        }
      },
      productType: {
        hasVariants: true,
        id: '',
        name: ''
      },
      thumbnail: {
        url: ''
      },
      updatedAt: '',
      variants: [
        {
          id: ''
        }
      ]
    }
  ],
  pageInfo: {
    endCursor: '',
    hasNextPage: true,
    hasPreviousPage: true,
    startCursor: ''
  },
  totalCount: 0
};

const ChannelDefault: HalamanRestoModel = {
  channelDetailOutput: DefaultChannelDetail,
  productListOutput: DefaultProductList,
  productByMetadataOutput: DefaultCollectionsbyMetadata,
  productByCollectionsOutput: DefaultProductbyCollection
};
const HalamanRestoReducer = (
  state: HalamanRestoModel = ChannelDefault,
  action: HalamanRestoAction
): HalamanRestoModel => {
  switch (action.type) {
    case HalamanRestoActionType.ChannelDetailLoad:
      return { ...state, ...action.data };
    case HalamanRestoActionType.ProductListLoad:
      return { ...state, ...action.data };
    case HalamanRestoActionType.ProductbyMetadataLoad:
      return { ...state, ...action.data };
    case HalamanRestoActionType.ProductbyCollectionLoad:
      return { ...state, ...action.data };
    case HalamanRestoActionType.CheckoutLoad:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

export const ChannelCommand = {
  getChannelDetail: (id: string, token: string): TAction<HalamanRestoAction, void> => {
    return (dispatch: TDispatch<HalamanRestoAction>) => {
      return apiFetch(token)
        .get(`/foodbuyer/0.1/channel/${id}`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const channel: HalamanRestoModel = {
                channelDetailOutput: response.data as ChannelDetailDataModel
              };

              dispatch({
                data: channel,
                type: HalamanRestoActionType.ChannelDetailLoad
              });
            } else {
              dispatch({
                data: ChannelDefault,
                type: HalamanRestoActionType.ChannelDetailLoad
              });
            }
          }
        });
    };
  },
  getCollections: (params: unknown, token: string): TAction<HalamanRestoAction, void> => {
    return (dispatch: TDispatch<HalamanRestoAction>) => {
      return apiFetch(token)
        .post(`/foodbuyer/0.1/collections`, params)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const collections: HalamanRestoModel = {
                productListOutput: response.data as ProductListDataModel
              };

              dispatch({
                data: collections,
                type: HalamanRestoActionType.ProductListLoad
              });
            } else {
              dispatch({
                data: ChannelDefault,
                type: HalamanRestoActionType.ProductListLoad
              });
            }
          }
        });
    };
  },
  getCollectionsbyMetadata: (params: unknown, token: string): TAction<HalamanRestoAction, void> => {
    return (dispatch: TDispatch<HalamanRestoAction>) => {
      return apiFetch(token)
        .post(`/foodbuyer/0.1/products/by-metadata`, params)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const byMetadata: HalamanRestoModel = {
                productByMetadataOutput: response.data as ProductByMetadataDataModel
              };

              dispatch({
                data: byMetadata,
                type: HalamanRestoActionType.ProductbyMetadataLoad
              });
            } else {
              dispatch({
                data: ChannelDefault,
                type: HalamanRestoActionType.ProductbyMetadataLoad
              });
            }
          } else {
            throw new Error('err');
          }
        })
        .catch((error: unknown) => {
          console.error('API error:', error);
          const errorMessage = (error as Error).message || 'Unknown error';

          throw new Error(errorMessage);
        });
    };
  },
  getproductbyCollection: (params: unknown, token: string): TAction<HalamanRestoAction, void> => {
    return (dispatch: TDispatch<HalamanRestoAction>) => {
      return apiFetch(token)
        .post(`/foodbuyer/0.1/products/by-collection`, params)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const byCollection: HalamanRestoModel = {
                productByCollectionsOutput: response.data as ProductbyCollectionsDataModel
              };

              dispatch({
                data: byCollection,
                type: HalamanRestoActionType.ProductbyCollectionLoad
              });
            } else {
              dispatch({
                data: ChannelDefault,
                type: HalamanRestoActionType.ProductbyCollectionLoad
              });
            }
          }
        });
    };
  },
  postCreateCheckout: (payload: unknown, token: string): Promise<string> => {
    return apiFetch(token).post(`/foodbuyer/0.1/checkout`, payload)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        const id: string = response?.data?.checkout_id;

        if (response.status === 200) {
          return id || 'err';
        }

        return 'err';
      }).catch(() => {
        return 'err';
      });
  },
  putCheckoutLines: (payload: unknown, token: string): Promise<string> => {
    return apiFetch(token).put(`/foodbuyer/0.1/checkout`, payload)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        const id: string = response?.data?.checkoutId;

        if (response.status === 200) {
          return id || 'err';
        }

        return 'err';
      }).catch(() => {
        return 'err';
      });
  }
};

export { HalamanRestoReducer };
