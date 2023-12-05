import type { FC } from 'react';

import { ArrowUP } from '@nxweb/icons/tabler';
import type { LayoutProps as NextWebLayoutProps } from '@nxweb/react';

import { Box, Fab, styled } from '@components/material.js';
import type { BoxProps } from '@components/material.js';
import { ScrollToTop } from '@components/scroll-to-top.js';
import type { LayoutProps } from '@layouts/types.js';

import { FixedBottomNavigation } from './components/bottom-navigation.js';

const BottomNavLayoutWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%'
});

const MainContentWrapper = styled(Box)<BoxProps>({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  minHeight: '100vh',
  minWidth: 0
});

const ContentWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  paddingBottom: theme.spacing(20),
  transition: 'padding .25s ease-in-out',
  width: '100%'
}));

type BottomNavLayoutProps = LayoutProps & NextWebLayoutProps;

// eslint-disable-next-line react/require-default-props
const BottomNavLayout: FC<BottomNavLayoutProps> = (props) => {
  const {
    settings,
    children,
    scrollToTop,
    contentHeightFixed,
    layout
  } = props;

  // ** Vars
  const { navHidden } = settings;

  return (
    <>
      <BottomNavLayoutWrapper className="layout-wrapper">
        {navHidden
          ? null
          : (
            <FixedBottomNavigation
              navItems={layout.navMenu.navItems}
              {...props} />
          )}
        <MainContentWrapper
          className="layout-content-wrapper"
          sx={{ ...contentHeightFixed && { maxHeight: '100vh' } }}
        >
          {/* Content */}
          <ContentWrapper
            className="layout-page-content"
            sx={{
              ...contentHeightFixed && {
                overflow: 'hidden',
                padding: 0,

                '& > :first-of-type': { height: '100%' }
              }
            }}
          >
            {children}
          </ContentWrapper>
        </MainContentWrapper>
      </BottomNavLayoutWrapper>

      {/* Scroll to top button */}
      {scrollToTop
        ? scrollToTop(props)

        : (
        <ScrollToTop className="mui-fixed">
          <Fab aria-label="scroll back to top" color="primary" size="small" sx={{ marginBottom: '4.5rem' }}>
            <ArrowUP />
          </Fab>
        </ScrollToTop>
        )}
    </>
  );
};

BottomNavLayout.displayName = 'BottomNavLayout';

export { BottomNavLayout };
