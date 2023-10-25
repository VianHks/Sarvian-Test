import type { ReactNode } from 'react';

import type { NavigationGroup, NavigationItem, NavigationLink, NavigationSection } from '@nxweb/react';

import type { AppBarProps, PaletteMode, SwipeableDrawerProps, SxProps, Theme } from '@components/material.js';
import type { Settings } from '@hooks/use-settings.js';

interface FooterProps {
  content?: (props?: unknown) => ReactNode
  sx?: SxProps<Theme>
}

interface LayoutProps {
  children?: ReactNode
  contentHeightFixed?: boolean
  footerProps?: FooterProps
  hidden: boolean
  layout: {
    appBar?: {
      componentProps?: AppBarProps
      content?: (props?: unknown) => ReactNode
    }
    navMenu: {
      afterContent?: (props?: unknown) => ReactNode
      beforeContent?: (props?: unknown) => ReactNode
      branding?: (props?: unknown) => ReactNode
      componentProps?: Omit<SwipeableDrawerProps, 'onClose' | 'onOpen' | 'open'>
      content?: (props?: unknown) => ReactNode
      lockedIcon?: ReactNode
      navItems?: readonly NavItemsType[]
      unlockedIcon?: ReactNode
    }
  }
  saveSettings: (values: Settings) => void
  scrollToTop?: (props?: unknown) => ReactNode
  settings: Settings
}

type NavItemsType = NavigationGroup | NavigationItem | NavigationLink | NavigationSection;
type ThemeMode = PaletteMode;
type AppBarType = 'fixed' | 'hidden' | 'static';
type FooterType = 'fixed' | 'hidden' | 'static';
type NavToggleType = 'accordion' | 'collapse';
type ThemeColor = 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';

export type {
  FooterProps, LayoutProps, NavItemsType,
  AppBarType, FooterType, NavToggleType, ThemeMode, ThemeColor
};
