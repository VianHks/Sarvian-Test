import {
  combineReducers, createStore
} from '@nxweb/core';
import {
  createCommandHook, createDispatchHook, createStoreHook, createStoreProvider
} from '@nxweb/react';

import { halamanRestoCommand } from './halaman-resto/commands.js';
import { HalamanRestoReducer } from './halaman-resto/reducers.js';
import { PersonalizedRecomendationCommand, PersonalizedRecReducer, PersonalRecomendationDefault } from './personalized-recomendation/reducers.js';

import type { RootAction, RootModel } from './types.js';

// ** Init reducers
const rootReducer = combineReducers({
  halamanResto: HalamanRestoReducer,
  personalizedRec: PersonalizedRecReducer

});

// ** Init models
const rootModel: RootModel = {
  personalizedRec: PersonalRecomendationDefault
};

// ** Init commands
const rootCommand = {
  halamanResto: halamanRestoCommand,
  personalizedRec: PersonalizedRecomendationCommand

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
