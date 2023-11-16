import { ShoppingCart, SmartHome, TestPipe } from '@nxweb/icons/tabler';

import type { NavItemsType } from '@layouts/types.js';

export const navigation: readonly NavItemsType[] = [
  {
    icon: <SmartHome />,
    id: 'beranda',
    link: '/beranda',
    text: 'Beranda'
  },
  {
    icon: <ShoppingCart />,
    id: 'products-page',
    link: '/products',
    text: 'Products'
  },
  {
    icon: <TestPipe />,
    id: 'other-page',
    link: '/other-page',
    text: 'Other Page'
  }
];
