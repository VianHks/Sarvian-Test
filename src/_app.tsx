import {  Suspense } from 'react';
import type { FC } from 'react';

import { CacheProvider } from '@emotion/react';

import type { LayoutWrapperProps } from '@nxweb/react';
import { AuthProvider, createEmotionCache, Head } from '@nxweb/react';

import { FallbackSpinner } from '@components/spinner';
import { app } from '@config/app.js';
import { auth } from '@config/auth.js';
import { SettingsProvider } from '@hooks/use-settings.js';
import { LayoutWrapper } from '@layouts/wrapper.js';

/*
 * Uncomment to import additional stylesheets for this App
 * import '@styles/index.scss';
 */

const clientEmotionCache = createEmotionCache();

// eslint-disable-next-line react/require-default-props
const App: FC<LayoutWrapperProps> = ({
  emotionCache = clientEmotionCache, ...props
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{app.name}</title>
        <meta content={`${app.name} — ${app.description}`} name="description" />
        <meta content={app.keywords.join(',')} name="keywords" />
        <meta content="initial-scale=1, width=device-width" name="viewport" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Quicksand&display=swap" rel="stylesheet" />
      </Head>

      <AuthProvider
        config={auth}
        loader={<FallbackSpinner />}
        manual={true}
        skipRedirect={window.location.pathname === '/news-list'}
      >
        <SettingsProvider>
          <Suspense fallback={<FallbackSpinner />}>
            <LayoutWrapper emotionCache={emotionCache} {...props} />
          </Suspense>
        </SettingsProvider>
      </AuthProvider>
    </CacheProvider>
  );
};

App.displayName = 'App';

export default App;
