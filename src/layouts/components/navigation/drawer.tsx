import type { FC } from 'react';

import { SwipeableDrawer as MuiSwipeableDrawer, styled } from '@components/material.js';
import type { SwipeableDrawerProps } from '@components/material.js';
import type { LayoutProps } from '@layouts/types.js';

interface Props {
  readonly children: LayoutProps['children']
  readonly collapsedNavWidth: number
  readonly hidden: LayoutProps['hidden']
  readonly navHover: boolean
  readonly navMenuProps: LayoutProps['layout']['navMenu']['componentProps']
  readonly navVisible: boolean
  readonly navWidth: number
  readonly setNavHover: (values: boolean) => void
  readonly setNavVisible: (value: boolean) => void
  readonly settings: LayoutProps['settings']
}

const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',

  '& ul': {
    listStyle: 'none'
  },

  '& .MuiListItem-gutters': {
    paddingLeft: 4,
    paddingRight: 4
  },

  '& .MuiDrawer-paper': {
    left: 'unset',
    overflowX: 'hidden',
    right: 'unset',
    transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
  }
});

const Drawer: FC<Props> = (props) => {
  const {
    hidden,
    children,
    navHover,
    navWidth,
    settings,
    navVisible,
    setNavHover,
    navMenuProps,
    setNavVisible,
    collapsedNavWidth
  } = props;

  // ** Vars
  const { navCollapsed } = settings;

  let flag = true;

  // Drawer Props for Mobile & Tablet screens
  const MobileDrawerProps = {
    ModalProps: {
      keepMounted: true // Better open performance on mobile.
    },
    open: navVisible,

    onClose: () => setNavVisible(false),
    onOpen: () => setNavVisible(true)
  };

  // Drawer Props for Laptop & Desktop screens
  const DesktopDrawerProps = {
    open: true,

    onClose: () => null,
    onOpen: () => null,

    onMouseEnter: () => {
      // Declared flag to resolve first time flicker issue while trying to collapse the menu
      if (flag || navCollapsed) {
        setNavHover(true);
        flag = false;
      }
    },
    onMouseLeave: () => {
      if (navCollapsed) {
        setNavHover(false);
      }
    }
  };

  let userNavMenuStyle = {};
  let userNavMenuPaperStyle = {};
  if (navMenuProps && navMenuProps.sx) {
    userNavMenuStyle = navMenuProps.sx;
  }

  if (navMenuProps && navMenuProps.PaperProps && navMenuProps.PaperProps.sx) {
    userNavMenuPaperStyle = navMenuProps.PaperProps.sx;
  }

  const userNavMenuProps = { ...navMenuProps };

  delete userNavMenuProps.sx;
  delete userNavMenuProps.PaperProps;

  return (
    <SwipeableDrawer
      className="layout-vertical-nav"
      variant={hidden ? 'temporary' : 'permanent'}
      {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          ...!hidden && { boxShadow: 2 },
          width: navCollapsed && !navHover ? collapsedNavWidth : navWidth,
          ...userNavMenuPaperStyle
        },
        ...navMenuProps?.PaperProps
      }}
      sx={{
        width: navCollapsed ? collapsedNavWidth : navWidth,
        ...userNavMenuStyle
      }}
      {...userNavMenuProps}
    >
      {children}
    </SwipeableDrawer>
  );
};

Drawer.displayName = 'Drawer';

export { Drawer };
