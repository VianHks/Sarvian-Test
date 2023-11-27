import {
  combineReducers, createStore
} from '@nxweb/core';
import {
  createCommandHook, createDispatchHook, createStoreHook, createStoreProvider
} from '@nxweb/react';

import { FAQReducer } from './faq/reducers.js';
import { HalamanRestoReducer } from './halaman-resto/reducers.js';
import { productviewCommand } from './product-view/commands.js';
import { ProductViewReducer } from './product-view/reducers.js';
import { productsCommand } from './products/commands.js';
import { productsReducer } from './products/reducers.js';

import type { RootAction, RootModel } from './types.js';
import { halamanRestoCommand } from './halaman-resto/commands.js';

// ** Init reducers
const rootReducer = combineReducers({
  faq: FAQReducer,
  products: productsReducer,
  productView: ProductViewReducer,
  halamanResto: HalamanRestoReducer
});

// ** Init models
const rootModel: RootModel = {};

// ** Init commands
const rootCommand = {
  products: productsCommand,
  productView: productviewCommand,
  halamanResto: halamanRestoCommand
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
