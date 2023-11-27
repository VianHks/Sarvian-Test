import type { FetchInstance } from '@nxweb/core';
import { applyMock } from '@nxweb/core';

import { ayamList } from './mock/ayam.js';
import { faq } from './mock/faq.js';
import { rekomendMenuList } from './mock/menu-rekomend.js';
import { menuList } from './mock/menu.js';
import { nasiList } from './mock/nasi.js';
import { paketHematList } from './mock/paket-hemat.js';
import { products } from './mock/products.js';
import { restoRatingList } from './mock/resto-rating.js';
import { sambelList } from './mock/sambel.js';
import { ulasanAndRating } from './mock/ulasan-rating.js';

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
      menuList,
      ulasanAndRating,
      rekomendMenuList,
      paketHematList,
      restoRatingList
    ], {
      // Add mock options here
      delayResponse: 1000
    });
};
