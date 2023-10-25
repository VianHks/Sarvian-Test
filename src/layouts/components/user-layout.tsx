import { cloneElement,  isValidElement,  useEffect, useRef } from 'react';
import type { FC } from 'react';

import type { LayoutWrapperProps } from '@nxweb/react';

import type { Theme } from '@components/material.js';
import { useMediaQuery } from '@components/material.js';
import { navigation } from '@config/navigation.js';
import { useSettings } from '@hooks/use-settings.js';

import { AppBarContent } from './app-bar-content.js';

const UserLayout: FC<LayoutWrapperProps> = ({
  children = undefined,
  route,
  ...props
}) => {
  const { settings, saveSettings } = useSettings();
  const isCollapsed = useRef(settings.navCollapsed);

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  useEffect(() => {
    if (hidden) {
      if (settings.navCollapsed) {
        saveSettings({ ...settings, navCollapsed: false });
        isCollapsed.current = true;
      }
    } else if (isCollapsed.current) {
      saveSettings({ ...settings, navCollapsed: true });
      isCollapsed.current = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden]);

  const childProps = {
    ...props,
    contentHeightFixed: route?.meta?.fixedHeight ?? false,
    hidden,
    layout: {
      appBar: {
        content: (props: { readonly toggleNavVisibility: () => void }) => (
          <AppBarContent
            hidden={hidden}
            saveSettings={saveSettings}
            settings={settings}
            toggleNavVisibility={props.toggleNavVisibility} />
        )
      },
      navMenu: {
        navItems: navigation
      }
    },
    route,
    saveSettings,
    settings
  };

  return isValidElement(children)
    ? cloneElement(children, { ...childProps })
    : null;
};

UserLayout.displayName = 'UserLayout';

export { UserLayout };
