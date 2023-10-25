import type { FC, PropsWithChildren, UIEvent } from 'react';
import { useRef, useState } from 'react';

import { hexToRGBA } from '@nxweb/core';
import { ScrollBar } from '@nxweb/react-bootstrap';

import { Box, createTheme, List, responsiveFontSizes, styled, ThemeProvider } from '@components/material.js';
import type { BoxProps } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import type { LayoutProps } from '@layouts/types.js';
import { themeOptions } from '@lib/theme/options.js';

import { Drawer } from './navigation/drawer.js';
import { NavHeader } from './navigation/nav-header.js';
import { NavItems } from './navigation/nav-items.js';

interface Props extends PropsWithChildren {
  readonly afterNavMenuContent: LayoutProps['layout']['navMenu']['afterContent']
  readonly beforeNavMenuContent: LayoutProps['layout']['navMenu']['beforeContent']
  readonly collapsedNavWidth: number
  readonly hidden: LayoutProps['hidden']
  readonly menuLockedIcon: LayoutProps['layout']['navMenu']['lockedIcon']
  readonly menuUnlockedIcon: LayoutProps['layout']['navMenu']['unlockedIcon']
  readonly navItems: LayoutProps['layout']['navMenu']['navItems']
  readonly navMenuBranding: LayoutProps['layout']['navMenu']['branding']
  readonly navMenuContent: LayoutProps['layout']['navMenu']['content']
  readonly navMenuProps: LayoutProps['layout']['navMenu']['componentProps']
  readonly navVisible: boolean
  readonly navWidth: number
  readonly saveSettings: LayoutProps['saveSettings']
  readonly setNavVisible: (value: boolean) => void
  readonly settings: LayoutProps['settings']
  readonly toggleNavVisibility: () => void
}

const StyledBoxForShadow = styled(Box)<BoxProps>(({ theme }) => ({
  background: `linear-gradient(${theme.palette.background.paper} ${
    theme.direction === 'rtl' ? '95%' : '5%'
  },${hexToRGBA(theme.palette.background.paper, 0.85)} 30%,${hexToRGBA(
    theme.palette.background.paper,
    0.5
  )} 65%,${hexToRGBA(theme.palette.background.paper, 0.3)} 75%,transparent)`,
  height: theme.mixins.toolbar.minHeight,
  left: -8,
  opacity: 0,
  pointerEvents: 'none',
  position: 'absolute',
  top: 60,
  transition: 'opacity .15s ease-in-out',
  width: 'calc(100% + 15px)',
  zIndex: 2,

  '&.scrolled': {
    opacity: 1
  }
}));

// eslint-disable-next-line react/require-default-props
const Navigation: FC<Props> = (props) => {
  // ** Props
  const {
    hidden,
    settings,
    afterNavMenuContent,
    beforeNavMenuContent,
    navMenuContent: userNavMenuContent
  } = props;

  // ** States
  const [navHover, setNavHover] = useState<boolean>(false);
  const [groupActive, setGroupActive] = useState<string[]>([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([]);

  // ** Ref
  const shadowRef = useRef<HTMLElement>(null);

  // ** Var
  const { afterNavMenuContentPosition: afterVerticalNavMenuContentPosition, beforeNavMenuContentPosition: beforeVerticalNavMenuContentPosition } = themeConfig;

  const navMenuContentProps = {
    ...props,
    currentActiveGroup,
    groupActive,
    navHover,
    setCurrentActiveGroup,
    setGroupActive
  };

  // ** Create new theme for the navigation menu when mode is `semi-dark`
  let darkTheme = createTheme(themeOptions(settings));

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    darkTheme = responsiveFontSizes(darkTheme);
  }

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = (ref: HTMLElement) => {
    if (ref) {
      // @ts-expect-error custom DOM property
      // eslint-disable-next-line no-underscore-dangle
      ref._getBoundingClientRect = ref.getBoundingClientRect;

      ref.getBoundingClientRect = () => {
        // @ts-expect-error custom DOM property
        // eslint-disable-next-line no-underscore-dangle
        const original = ref._getBoundingClientRect();

        return { ...original, height: Math.floor(original.height) };
      };
    }
  };

  // ** Scroll Menu
  const scrollMenu = (container: HTMLElement | UIEvent<HTMLDivElement>) => {
    if (shadowRef.current === null) { return; }

    if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
      const ctr: HTMLElement = 'target' in container
        ? container.target as HTMLElement
        : container;

      if (ctr.scrollTop > 0) {
        if (!shadowRef.current.classList.contains('scrolled')) {
          shadowRef.current.classList.add('scrolled');
        }
      } else {
        shadowRef.current.classList.remove('scrolled');
      }
    }
  };

  const ScrollWrapper = hidden ? Box : ScrollBar;

  return (
    <ThemeProvider theme={darkTheme}>
      <Box onScroll={() => {}} />
      <Drawer {...props} navHover={navHover} setNavHover={setNavHover}>
        <NavHeader {...props} navHover={navHover} />
        {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'fixed'
          ? beforeNavMenuContent(navMenuContentProps)
          : null}
        {(beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) &&
          <StyledBoxForShadow ref={shadowRef} />}
        <Box sx={{ overflow: 'hidden', position: 'relative' }}>
          <ScrollWrapper
            {...(hidden
              ? {
                onScroll: scrollMenu,
                sx: { height: '100%', overflowX: 'hidden', overflowY: 'auto' }
              }
              : {
                containerRef: handleInfiniteScroll,
                onScrollY: scrollMenu,
                options: { wheelPropagation: false }
              })}
          >
            {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'static'
              ? beforeNavMenuContent(navMenuContentProps)
              : null}
            {userNavMenuContent
              ? userNavMenuContent(navMenuContentProps)

              : (
              <List className="nav-items" sx={{ '& > :first-of-type': { mt: '0' }, pt: 0 }}>
                <NavItems
                  currentActiveGroup={currentActiveGroup}
                  groupActive={groupActive}
                  navHover={navHover}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                  setGroupActive={setGroupActive}
                  {...props} />
              </List>
              )}
            {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'static'
              ? afterNavMenuContent(navMenuContentProps)
              : null}
          </ScrollWrapper>
        </Box>
        {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'fixed'
          ? afterNavMenuContent(navMenuContentProps)
          : null}
      </Drawer>
    </ThemeProvider>
  );
};

Navigation.displayName = 'Navigation';
export { Navigation };
