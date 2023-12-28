/* eslint-disable linebreak-style */
import { apiFetch } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types.js';

import { ProductViewsActionType } from './types.js';

import type { CreateCheckoutDataModel, ProductDetailsDataModel, ProductViewsAction, ProductViewsModel } from './types.js';

const DEFAULT_PRODUCT_DETAILS = {
  data: {
    product: {
      channelListings: [],
      collections: [],
      description: '',
      id: '',
      media: [],
      metadata: [],
      name: '',
      productType: {
        hasVariants: false,
        id: '',
        name: ''
      },
      rating: 0,
      variants: []
    }
  }
};

const DEFAULT_RESPONSE_CREATE_CHECKOUT = {
  checkout_id: ''
};

const ProductViewsDefault: ProductViewsModel = {
  productDetails: DEFAULT_PRODUCT_DETAILS,
  responseCreateCheckout: DEFAULT_RESPONSE_CREATE_CHECKOUT
};

const ProductViewReducer = (
  state: ProductViewsModel = ProductViewsDefault,
  action: ProductViewsAction
): ProductViewsModel => {
  switch (action.type) {
    case ProductViewsActionType.NasiLoad:
      return { ...state, ...action.value };
    case ProductViewsActionType.NasiClear:
      return {};
    case ProductViewsActionType.AyamLoad:
      return { ...state, ...action.value };
    case ProductViewsActionType.AyamClear:
      return {};
    case ProductViewsActionType.SambelLoad:
      return { ...state, ...action.value };
    case ProductViewsActionType.SambelClear:
      return {};
    case ProductViewsActionType.MenuLoad:
      return { ...state, ...action.value };
    case ProductViewsActionType.MenuClear:
      return {};
    case ProductViewsActionType.GetProductDetails:
      return { ...state, ...action.data };
    case ProductViewsActionType.GetCheckoutId:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

const ProductViewsCommand = {
  getProductDetails: (productId: string, token: string): TAction<ProductViewsAction, void> => {
    return (dispatch: TDispatch<ProductViewsAction>) => {
      return apiFetch(token).get(`/foodbuyer/0.1/product/${productId}`).then((response) => {
        if (response.status === 200) {
          if (response.data !== null) {
            const productViews: ProductViewsModel = {
              productDetails: (response.data as ProductDetailsDataModel)
            };

            dispatch({
              data: productViews,
              type: ProductViewsActionType.GetProductDetails
            });
          } else {
            dispatch({
              data: ProductViewsDefault,
              type: ProductViewsActionType.GetProductDetails
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
          return id;
        }

        return 'err';
      }).catch(() => {
        return 'err';
      });
  },
  getCheckoutId: (payload: unknown, token: string): TAction<ProductViewsAction, void> => {
    return (dispatch: TDispatch<ProductViewsAction>) => {
      return apiFetch(token).post(`/foodbuyer/0.1/checkout`, payload).then((response) => {
        if (response.status === 200) {
          if (response.data !== null) {
            const productViews: ProductViewsModel = {
              responseCreateCheckout: (response.data as CreateCheckoutDataModel)
            };

            dispatch({
              data: productViews,
              type: ProductViewsActionType.GetProductDetails
            });
          } else {
            dispatch({
              data: ProductViewsDefault,
              type: ProductViewsActionType.GetProductDetails
            });
          }
        }
      });
    };
  }
};

export { ProductViewReducer, ProductViewsCommand, ProductViewsDefault };
