import {
  combineReducers, createStore
} from '@nxweb/core';
import {
  createCommandHook, createDispatchHook, createStoreHook, createStoreProvider
} from '@nxweb/react';

import { checkoutCommand } from './checkout/commands.js';
import { CheckoutReducer } from './checkout/reducers.js';
import { FAQReducer } from './faq/reducers.js';
import { halamanRestoCommand } from './halaman-resto/commands.js';
import { HalamanRestoReducer } from './halaman-resto/reducers.js';
import { homeCommand } from './home/commands.js';
import { homeCommands, HomeReducer } from './home/reducers.js';
import { orderCommand } from './order/commands.js';
import { OrderReducer } from './order/reducers.js';
import { personalizedRecCommand } from './personalized-recomendation/commands.js';
import { PersonalizedRecReducer } from './personalized-recomendation/reducers.js';
import { ProductViewReducer, ProductViewsCommand, ProductViewsDefault } from './product-view/reducers.js';
import { productsCommand } from './products/commands.js';
import { productsReducer } from './products/reducers.js';

import type { RootAction, RootModel } from './types.js';

// ** Init reducers
const rootReducer = combineReducers({
  beranda: HomeReducer,
  checkout: CheckoutReducer,
  faq: FAQReducer,
  halamanResto: HalamanRestoReducer,
  home: HomeReducer,
  order: OrderReducer,
  personalizedRec: PersonalizedRecReducer,
  products: productsReducer,
  productView: ProductViewReducer
});

// ** Init models
const rootModel: RootModel = {
  productView: ProductViewsDefault
};

// ** Init commands
const rootCommand = {
  beranda: homeCommand,
  checkout: checkoutCommand,
  halamanResto: halamanRestoCommand,
  home: homeCommands,
  order: orderCommand,
  personalizedRec: personalizedRecCommand,
  products: productsCommand,
  productView: ProductViewsCommand
};

// ** Create store
export const store = createStore(rootReducer, rootModel);

// ** Create store provider
export const StoreProvider = createStoreProvider(store);

// ** Create store hook
export const useStore = createStoreHook<RootModel, RootAction>();

// ** Create dispatch hook
export const useDipatch = createDispatchHook<RootModel, RootAction>();

// ** Create command hook
export const useCommand = createCommandHook(rootCommand);
