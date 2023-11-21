import { lazy } from 'react';

import type { Route } from '@nxweb/react';

export const routes: Route[] = [
  {
    path: '/',
    redirectTo: (_location, authenticated) => (authenticated ? '/personalized-recomendation' : '/beranda')
  },
  // ** Fallback routes, must be the last route item
  {
    auth: false,
    element: lazy(() => import('@views/errors/404.js')),
    fallback: true,
    layout: 'blank',
    title: '404: Not Found'
  },
  {
    auth: false,
    element: lazy(() => import('@pages/home/dahsboard.js')),
    hash: true,
    layout: 'blank',
    path: '/beranda',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/home/search-result.js')),
    hash: true,
    layout: 'blank',
    path: '/beranda/search-result',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/personalized-recomendation/index.js')),
    hash: true,
    layout: 'blank',
    path: '/recomendation',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/order/checkout.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Halaman Checkout' },
    path: '/checkout',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/order/order-in-progress.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Pesanan Berlangsung' },
    path: '/checkout/order-in-progress',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/order/order.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Pesanan' },
    path: '/order',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/product-view/index.js')),
    hash: true,
    layout: 'blank',
    path: '/produk-review',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/product-view/gantiitem.js')),
    hash: true,
    layout: 'blank',
    path: '/ganti-item',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/halaman-resto/index.js')),
    hash: true,
    layout: 'blank',
    path: '/page-resto',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/halaman-resto/view-rating.js')),
    hash: true,
    layout: 'blank',
    path: '/page-resto/ulasan-rating',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/chat-and-call/index.js')),
    hash: true,
    meta: { description: 'Chat' },
    layout: 'blank',
    path: '/chat-list',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/chat-and-call/chat-ui')),
    hash: true,
    layout: 'blank',
    path: '/chat-detail',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/chat-and-call/call-ui')),
    hash: true,
    layout: 'blank',
    path: '/call',
    search: true
  }
];
