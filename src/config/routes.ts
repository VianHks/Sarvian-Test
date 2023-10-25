import { lazy } from 'react';

import type { Route } from '@nxweb/react';

export const routes: Route[] = [
  {
    path: '/',
    redirectTo: (_location, authenticated) => (authenticated ? '/home' : '/login')
  },
  // ** Fallback routes, must be the last route item
  {
    auth: false,
    element: lazy(() => import('@views/errors/404.js')),
    fallback: true,
    layout: 'blank',
    title: '404: Not Found'
  }
];
