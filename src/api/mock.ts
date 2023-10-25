import type { FetchInstance } from '@nxweb/core';
import { applyMock } from '@nxweb/core';

import { products } from './mock/products.js';

export const apiMock = (instance: FetchInstance) => {
  return process.env.NODE_ENV === 'production'
    ? instance
    : applyMock(instance, [
      // Add mock initializers here
      products
    ], {
      // Add mock options here
      delayResponse: 1000
    });
};
