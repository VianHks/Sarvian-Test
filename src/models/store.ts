import {
  combineReducers, createStore
} from '@nxweb/core';
import {
  createCommandHook, createDispatchHook, createStoreHook, createStoreProvider
} from '@nxweb/react';

import { ChannelCommand, ChannelDefault, NewsReducer } from './news/reducers.js';

import type { RootAction, RootModel } from './types.js';

// ** Init reducer list
const rootReducer = combineReducers({
  newsList: NewsReducer
});

// ** Init model
const rootModel: RootModel = {
  newsList: ChannelDefault
};

// ** Init command
const rootCommand = {
  newsList: ChannelCommand
};

// *** Create store
export const store = createStore(rootReducer, rootModel);

// *** Create store provider
export const StoreProvider = createStoreProvider(store);

// *** Create store hook
export const useStore = createStoreHook<RootModel, RootAction>();

// *** Create dispatch hook
export const useDipatch = createDispatchHook<RootModel, RootAction>();

// *** Create command hook
export const useCommand = createCommandHook(rootCommand);
