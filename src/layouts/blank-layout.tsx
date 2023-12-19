import type { FC, PropsWithChildren } from 'react';

import { Box, styled } from '@components/material.js';
import type { BoxProps } from '@components/material.js';

import { routes } from '@config/routes';

interface BlankLayoutProps extends PropsWithChildren {
  readonly className?: string
}

// Styled component for Blank Layout component
const currentRoute = routes.find((route) => route.path === location.pathname);
const pageId = currentRoute?.meta?.appBarId || '';
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}));

const BlankLayout: FC<BlankLayoutProps> = ({
  children = undefined,
  className = 'layout-wrapper'
}) => {
  return (
    <BlankLayoutWrapper className={className}>
      <Box
        className="app-content"
        sx={{
          minHeight: pageId === 'recommendation' ? '100vh' : '200vh',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {children}
      </Box>
    </BlankLayoutWrapper>
  );
};

BlankLayout.displayName = 'BlankLayout';

export { BlankLayout };
