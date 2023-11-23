import type { FetchInstance } from '@nxweb/core';
import { applyMock } from '@nxweb/core';

import { faq } from './mock/faq.js';
import { products } from './mock/products.js';

export const apiMock = (instance: FetchInstance) => {
  return process.env.NODE_ENV === 'production'
    ? instance
    : applyMock(instance, [
      // Add mock initializers here
      products, faq
    ], {
      // Add mock options here
      delayResponse: 1000
    });
};
