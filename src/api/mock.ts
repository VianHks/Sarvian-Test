import type { FetchInstance } from '@nxweb/core';
import { applyMock } from '@nxweb/core';

import { faq } from './mock/faq.js';
import { nasiList } from './mock/nasi.js';
import { products } from './mock/products.js';
import { ayamList } from './mock/ayam.js';
import { sambelList } from './mock/sambel.js';
import { menuList } from './mock/menu.js';

export const apiMock = (instance: FetchInstance) => {
  return process.env.NODE_ENV === 'production'
    ? instance
    : applyMock(instance, [
      // Add mock initializers here
      products,
      faq,
      nasiList,
      ayamList,
      sambelList,
      menuList
    ], {
      // Add mock options here
      delayResponse: 1000
    });
};
