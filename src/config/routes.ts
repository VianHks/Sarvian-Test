/* eslint-disable import/max-dependencies */
import { lazy } from 'react';

import type { Route } from '@nxweb/react';

export const routes: Route[] = [

  {
    path: '/',
    redirectTo: '/news-list'
  },
  {
    path: '/callback',
    redirectTo: (_location, _) => {
      return '/';
    }
  },
  {
    path: '/login',
    redirectTo: '/news-list'
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
    element: lazy(() => import('@pages/news/index.js')),
    hash: true,
    layout: 'blank',
    path: '/news-list',
    search: true
  }
];
