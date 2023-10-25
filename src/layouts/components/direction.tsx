import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { default as stylisRTLPlugin } from 'stylis-plugin-rtl';

import type { Direction as DirectionType } from '@components/material.js';

interface DirectionProps {
  readonly children: ReactNode
  readonly direction: DirectionType
}

const styleCache = () => createCache({
  key: 'rtl',
  prepend: true,
  stylisPlugins: [stylisRTLPlugin]
});

const Direction: FC<DirectionProps> = ({ children, direction }) => {
  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  if (direction === 'rtl') {
    return <CacheProvider value={styleCache()}>{children}</CacheProvider>;
  }

  return <>{children}</>;
};

Direction.displayName = 'Direction';

export { Direction };
