import type { FetchInstance } from '@nxweb/core';
import { applyMock } from '@nxweb/core';

import { ayamList } from './mock/ayam.js';
import { dana } from './mock/dana.js';
import { faq } from './mock/faq.js';
import { listCheckoutMenu } from './mock/menu-checkout.js';
import { rekomendMenuList } from './mock/menu-rekomend.js';
import { menuList } from './mock/menu.js';
import { nasiList } from './mock/nasi.js';
import { paketHematList } from './mock/paket-hemat.js';
import { personalizedRecList } from './mock/personalized-recomendation.js';
import { products } from './mock/products.js';
import { restoRatingList } from './mock/resto-rating.js';
import { restoList } from './mock/restolist.js';
import { sambelList } from './mock/sambel.js';
import { ulasanAndRating } from './mock/ulasan-rating.js';
import { menuBeranda } from './mock/menu-beranda.js';
import { makanan } from './mock/makanan.js';
import { berandaRestoList } from './mock/restolist-beranda.js';

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
      restoRatingList,
      listCheckoutMenu,
      restoList,
      dana,
      personalizedRecList,
      menuBeranda,
      makanan,
      berandaRestoList
    ], {
      // Add mock options here
      delayResponse: 1000
    });
};
