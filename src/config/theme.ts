import type { ReactNode } from 'react';

import type { Direction, ThemeOptions } from '@components/material.js';
import type {
  AppBarType,
  FooterType,
  NavToggleType,
  ThemeMode
} from '@layouts/types.js';

interface ThemeConfig {
  afterNavMenuContentPosition: 'fixed' | 'static'
  appBar: AppBarType
  appBarBlur: boolean
  beforeNavMenuContentPosition: 'fixed' | 'static'
  collapsedNavigationSize: number
  direction: Direction
  disableCustomizer: boolean
  disableRipple: boolean
  footer: FooterType
  menuTextTruncate: boolean
  mode: ThemeMode
  navCollapsed: boolean
  navHidden: boolean
  navSize: number
  navSubItemIcon: ReactNode
  navToggleType: NavToggleType
  responsiveFontSizes: boolean
  routingLoader: boolean
  toastPosition: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right'
}

export const config: ThemeConfig = {
  direction: 'ltr',
  footer: 'static',
  mode: 'light',

  // ** Routing Configs
  routingLoader: true /* true | false */,

  // ** Navigation (Menu) Configs
  afterNavMenuContentPosition: 'fixed',
  beforeNavMenuContentPosition: 'fixed',
  collapsedNavigationSize: 82 /* Number in px */,
  menuTextTruncate: true,
  navCollapsed: false,
  navHidden: false,
  navSize: 260 /* Number in px */,
  navSubItemIcon: 'tabler:circle' /* Icon */,
  navToggleType: 'accordion',

  // ** AppBar Configs
  appBar: 'fixed',
  appBarBlur: true,

  // ** Other Configs
  disableCustomizer: false,
  disableRipple: false,
  responsiveFontSizes: false,
  toastPosition: 'top-right'
};

export const options = (): ThemeOptions => {
  /**
   * ** To use mode (light/dark), direction(ltr/rtl), etc. for conditional styles, uncomment below line
   * const \{ settings \} = useSettings();
   *
   * ** To use mode (light/dark), direction(ltr/rtl), etc. for conditional styles, uncomment below line
   * const \{ mode \} = settings;
   *
   * ** To use core palette, uncomment the below line
   * const palette = corePalette(mode as PaletteMode);
   */

  return { };
};
