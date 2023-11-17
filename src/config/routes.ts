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
  }
];
