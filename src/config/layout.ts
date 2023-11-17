import type { Layout } from '@nxweb/react';
import { LayoutRegistry } from '@nxweb/react';

import { AppBarLayout } from '@layouts/appbar-layout.js';
import { BlankLayout } from '@layouts/blank-layout.js';
import { BottomNavLayout } from '@layouts/bottom-navigation-layout';
import { DefaultLayout } from '@layouts/default-layout.js';

// ** All of the available layouts
const layouts = new LayoutRegistry({
  appbar: AppBarLayout as Layout,
  blank: BlankLayout,
  bottomnav: BottomNavLayout as Layout,
  default: DefaultLayout as Layout
});

export { layouts };
