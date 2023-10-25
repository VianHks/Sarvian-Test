import type { FC } from 'react';
import { useState } from 'react';

import { ArrowUP } from '@nxweb/icons/tabler';
import type { LayoutProps as NextWebLayoutProps } from '@nxweb/react';

import { Customizer } from '@components/customizer.js';
import { Footer } from '@components/footer.js';
import { Box, Fab, styled } from '@components/material.js';
import type { BoxProps } from '@components/material.js';
import { ScrollToTop } from '@components/scroll-to-top.js';
import { config as themeConfig } from '@config/theme.js';
import type { LayoutProps } from '@layouts/types.js';

import { VerticalAppBar } from './components/app-bar.js';
import { Navigation } from './components/navigation.js';

const DefaultLayoutWrapper = styled('div')({
  display: 'flex',
  height: '100%'
});

const MainContentWrapper = styled(Box)<BoxProps>({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  minHeight: '100vh',
  minWidth: 0
});

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}));

type DefaultLayoutProps = LayoutProps & NextWebLayoutProps;

// eslint-disable-next-line react/require-default-props
const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
  const {
    hidden,
    settings,
    children,
    scrollToTop,
    footerProps,
    contentHeightFixed,
    layout
  } = props;

  // ** Vars
  const { navHidden } = settings;
  const { navSize: navigationSize, disableCustomizer, collapsedNavigationSize } = themeConfig;
  const navWidth = navigationSize;
  const collapsedNavWidth = collapsedNavigationSize;

  // ** States
  const [navVisible, setNavVisible] = useState<boolean>(false);

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible);

  return (
    <>
      <DefaultLayoutWrapper className="layout-wrapper">
        {/* Navigation Menu */}
        {navHidden
          ? null
          : (
          <Navigation
            afterNavMenuContent={layout.navMenu.afterContent}
            beforeNavMenuContent={layout.navMenu.beforeContent}
            collapsedNavWidth={collapsedNavWidth}
            menuLockedIcon={layout.navMenu.lockedIcon}
            menuUnlockedIcon={layout.navMenu.unlockedIcon}
            navItems={layout.navMenu.navItems}
            navMenuBranding={layout.navMenu.branding}
            navMenuContent={layout.navMenu.content}
            navMenuProps={layout.navMenu.componentProps}
            navVisible={navVisible}
            navWidth={navWidth}
            setNavVisible={setNavVisible}
            toggleNavVisibility={toggleNavVisibility}
            {...props} />
          )}
        <MainContentWrapper
          className="layout-content-wrapper"
          sx={{ ...contentHeightFixed && { maxHeight: '100vh' } }}
        >
          {/* AppBar Component */}
          <VerticalAppBar
            appBarContent={layout.appBar?.content}
            appBarProps={layout.appBar?.componentProps}
            toggleNavVisibility={toggleNavVisibility}
            {...props} />

          {/* Content */}
          <ContentWrapper
            className="layout-page-content"
            sx={{
              ...contentHeightFixed && {
                overflow: 'hidden',

                '& > :first-of-type': { height: '100%' }
              }
            }}
          >
            {children}
          </ContentWrapper>

          {/* Footer Component */}
          <Footer footerContent={footerProps?.content} footerStyles={footerProps?.sx} {...props} />
        </MainContentWrapper>
      </DefaultLayoutWrapper>

      {/* Customizer */}
      {disableCustomizer || hidden ? null : <Customizer />}

      {/* Scroll to top button */}
      {scrollToTop
        ? scrollToTop(props)

        : (
        <ScrollToTop className="mui-fixed">
          <Fab aria-label="scroll back to top" color="primary" size="small">
            <ArrowUP />
          </Fab>
        </ScrollToTop>
        )}
    </>
  );
};

DefaultLayout.displayName = 'DefaultLayout';

export { DefaultLayout };
