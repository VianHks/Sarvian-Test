import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ServiceWorker } from '@nxweb/core';
import { BrowserRouter, disableReactDevTools } from '@nxweb/react';

import { FallbackSpinner } from '@components/spinner.js';
import { layouts } from '@config/layout.js';
import { routes } from '@config/routes.js';
import { StoreProvider } from '@models/store.js';

import App from './_app.js';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = createRoot(document.getElementById('root') as HTMLElement);
const error = lazy(() => import('@views/errors/route.js'));

root.render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter
        error={error}
        fallback={<FallbackSpinner />}
        layouts={layouts}
        resolvePages={true}
        routes={routes}
        wrapper={App} />
    </StoreProvider>
  </StrictMode>
);

/**
 * ServiceWorker registration
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below, and set the pwa property to true in .nextweb.ts.
 *
 * Note:
 * This comes with some pitfalls though, make sure you know the implications.
 */

ServiceWorker.unregister();

/**
 * Performance metric reporting
 * If you want your app to send anlytics metrics you can pass a custom
 * handler for processing the metrics below.
 * The `console.debug` is provided as example only.
 *
 * WebVitals.register(console.debug);
 */

/**
 * The default application export
 * If enabled, this will be available as global `NX` object
 *
 * Note:
 * At runtime these could be overwritten by the host application.
 */

export default {
  env: {
    API_FOOD_BUYER: process.env.API_FOOD_BUYER,
    API_URL: process.env.API_URL,
    BUCKET: process.env.BUCKET
  }
};
