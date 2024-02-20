/* eslint-disable import/max-dependencies */
import { lazy } from 'react';

import type { Route } from '@nxweb/react';

const dropDownValue = '';

export const routes: Route[] = [

  {
    path: '/',
    redirectTo: (_location, authenticated) => (authenticated ? '/auth' : '/not-found')
  },
  {
    path: '/callback',
    redirectTo: (_location, _) => {
      return '/';
    }
  },
  {
    path: '/login',
    redirectTo: (_location, _) => {
      return '/';
    }
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
    layout: 'bottomnav',
    path: '/beranda',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/home/search-result.js')),
    hash: true,
    layout: 'appbar',
    meta: { appBarId: 'searchresult' },
    path: '/beranda/search-result',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/personalized-recomendation/index.js')),
    hash: true,
    layout: 'blank',
    meta: { appBarId: 'recommendation' },
    path: '/personalized-recomendation',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/order/checkout.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Halaman Checkout' },
    path: '/checkout-dinein',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/order/order-in-progress_single-order.js')),
    hash: true,
    layout: 'appbar',
    meta: { appBarId: 'pesananberlangsung', description: 'Pesanan Berlangsung' },
    path: '/order-in-progress/single-order',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/order/order.js')),
    hash: true,
    layout: 'bottomnav',
    meta: { description: 'Pesanan' },
    path: '/order',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/order/penilaian.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Penilaian Saya' },
    path: '/order/penilaian-saya',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/product-view/index.js')),
    hash: true,
    layout: 'blank',
    path: '/product-view',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/halaman-resto/index.js')),
    hash: true,
    // meta: { appBarId: 'pageresto', dropDownValue },
    layout: 'blank',
    path: '/page-resto',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/halaman-resto/view-rating.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Ulasan & Rating' },
    path: '/page-resto/ulasan-rating',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/chat-and-call/index.js')),
    hash: true,
    layout: 'bottomnav',
    meta: { description: 'Chat' },
    path: '/chat-list',
    search: true,
    title: 'Chat'
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
  },
  {
    auth: false,
    element: lazy(() => import('@pages/location/location-by-gps.js')),
    hash: true,
    layout: 'blank',
    path: '/location-by-gps',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/location/location.js')),
    hash: true,
    layout: 'blank',
    path: '/location',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/location/add-location')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Tambah Alamat' },
    path: '/add-location',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/location/gps.js')),
    hash: true,
    layout: 'blank',
    path: '/GPS',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/rating/rating.js')),
    hash: true,
    layout: 'blank',
    path: '/rating',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/pencarian/index.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Cari' },
    path: '/pencarian',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/checkout-multi-order-pickup/index.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Halaman Checkout' },
    path: '/multi-order',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/checkout-multi-order-pickup/multi-order-in-progress.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Pesanan Berlangsung' },
    path: '/inprogress/multi-order/pickup',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/checkout-single-order-pesan-antar/index.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Halaman Checkout' },
    path: '/single-order-pesan-antar',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/pusat-bantuan/index.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Pusat Bantuan' },
    path: '/help-center',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/order/keranjang.js')),
    hash: true,
    layout: 'appbar',
    meta: { appBarId: 'keranjang', description: 'Keranjang' },
    path: '/keranjang',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/checkout-multi-order-pesan-antar/index.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Halaman Checkout' },
    path: '/checkout/multi-order/pesan-antar',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/pesanan-berlangsung-multi-order-pesan-antar/index.js')),
    hash: true,
    layout: 'appbar',
    meta: { description: 'Pesanan Berlangsung' },
    path: '/inprogress/multi-order/pesan-antar',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/user-profile/index.js')),
    hash: true,
    layout: 'bottomnav',
    path: '/profile',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/user-profile/editphoto.js')),
    hash: true,
    layout: 'blank',
    path: '/edit-photo',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/registration/index.js')),
    hash: true,
    layout: 'blank',
    path: '/registration_info',
    search: true
  },
  {
    auth: false,
    element: lazy(() => import('@pages/registration/success.js')),
    hash: true,
    layout: 'blank',
    path: '/registration_success',
    search: true
  }
];
