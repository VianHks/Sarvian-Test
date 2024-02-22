/* eslint-disable linebreak-style */
import { apiFetch } from '@api/base.js';
import type { TAction, TDispatch } from '@models/types.js';

import { ProductViewsActionType } from './types.js';

import type {
  CheckoutIdModel,
  ProductDetailsDataModel,
  ProductTypeModel,
  ProductViewsAction,
  ProductViewsModel
} from './types.js';

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

const DEFAULT_CHEKOUTID = {
  checkout_id: ''
};

const DEFAULT_PRODUCT_TYPE: ProductTypeModel = {
  data: {
    productType: {
      name: '',
      variantAttributes: [
        {
          choices: {
            edges: [
              {
                node: {
                  id: '',
                  name: '',
                  slug: '',
                  value: ''
                }
              }
            ]
          },
          id: '',
          inputType: '',
          name: ''
        }
      ]
    }
  }
};

const ProductViewsDefault: ProductViewsModel = {
  checkoutId: DEFAULT_CHEKOUTID,
  productDetails: DEFAULT_PRODUCT_DETAILS,
  productTypeDetails: DEFAULT_PRODUCT_TYPE
};

const ProductViewReducer = (
  state: ProductViewsModel = ProductViewsDefault,
  action: ProductViewsAction
): ProductViewsModel => {
  switch (action.type) {
    case ProductViewsActionType.GetProductDetails:
      return { ...state, ...action.data };
    case ProductViewsActionType.GetCheckoutId:
      return { ...state, ...action.data };
    case ProductViewsActionType.GetProductTypeDetails:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

const ProductViewsCommand = {
  getProductDetails: (
    productId: string,
    token: string
  ): TAction<ProductViewsAction, void> => {
    return (dispatch: TDispatch<ProductViewsAction>) => {
      return apiFetch(token)
        .get(`/product/${productId}`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const productViews: ProductViewsModel = {
                productDetails: response.data as ProductDetailsDataModel
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
  getProductTypeDetails: (
    productTypeId: string,
    token: string
  ): TAction<ProductViewsAction, void> => {
    return (dispatch: TDispatch<ProductViewsAction>) => {
      return apiFetch(token)
        .get(`/product-type/${productTypeId}`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== null) {
              const productViews: ProductViewsModel = {
                productTypeDetails: response.data as ProductTypeModel
              };

              dispatch({
                data: productViews,
                type: ProductViewsActionType.GetProductTypeDetails
              });
            } else {
              dispatch({
                data: ProductViewsDefault,
                type: ProductViewsActionType.GetProductTypeDetails
              });
            }
          }
        });
    };
  },
  postCreateCheckout: (payload: unknown, token: string): Promise<{ action: string, id: string }> => {
    return (
      apiFetch(token)
        .post(`/checkout`, payload)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          const id: string = response?.data?.checkout_id;
          const action: string = response?.data?.action;

          if (response.status === 200) {
            return { action, id };
          }

          throw new Error('Failed to create checkout');
        })
        .catch(() => {
          throw new Error('Failed to create checkout');
        })
    );
  },
  putCheckout: (payload: unknown, token: string): Promise<string> => {
    return (
      apiFetch(token)
        .put(`/checkout`, payload)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          const id: string = response?.data?.checkoutId;

          if (response.status === 200) {
            if (id) {
              return id;
            }

            return 'err';
          }

          return 'err';
        })
        .catch(() => {
          return 'err';
        })
    );
  },
  getCheckoutId: (data: CheckoutIdModel | null) => {
    return (dispatch: TDispatch<ProductViewsAction>) => {
      const profile: ProductViewsModel = {
        checkoutId: data || DEFAULT_CHEKOUTID
      };

      dispatch({
        data: profile,
        type: ProductViewsActionType.GetCheckoutId
      });
    };
  }
};

export { ProductViewReducer, ProductViewsCommand, ProductViewsDefault };
