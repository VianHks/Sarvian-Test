import type { FC, PropsWithChildren } from 'react';

import { BlankAppBar } from '@components/blank-appbar.js';
import { Box, styled } from '@components/material.js';
import type { BoxProps } from '@components/material.js';

// Styled component for Blank Layout with AppBar component
const AppBarLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`,
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`,
    overflowX: 'hidden',
    position: 'relative'
  }
}));

const AppBarLayout: FC<PropsWithChildren> = ({
  children = undefined
}) => {
  return (
    <AppBarLayoutWrapper>
      <BlankAppBar />
      <Box
        className="app-content"
        sx={{
          minHeight: (theme) => `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`,
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        {children}
      </Box>
    </AppBarLayoutWrapper>
  );
};

AppBarLayout.displayName = 'AppBarLayout';

export { AppBarLayout };
