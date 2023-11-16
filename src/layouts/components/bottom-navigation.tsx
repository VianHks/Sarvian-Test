/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';

import type { NavigationLink } from '@nxweb/react';

import type { LayoutProps, NavItemsType } from '@layouts/types';

interface Props extends PropsWithChildren {
  readonly hidden: LayoutProps['hidden']
  readonly settings: LayoutProps['settings']
  readonly navItems: LayoutProps['layout']['navMenu']['navItems']
}

const FixedBottomNavigation: FC<Props> = (props) => {
  // ** Props
  const {
    hidden,
    settings,
    navItems
  } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    if (!value) return;
    if (!navItems) return;

    navigate(value);
  }, [value]);

  const RenderMenuItems = navItems?.map((item: NavItemsType, index: number) => {
    const navItem = (item as NavigationLink).text ? item as NavigationLink : null;

    return navItem !== null &&
      <BottomNavigationAction
        icon={navItem.icon}
        key={index}
        label={navItem.text}
        value={navItem.link} />;
  });

  return (
    <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: '100' }}>
      <BottomNavigation
        showLabels={true}
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        {RenderMenuItems}
      </BottomNavigation>
    </Paper>
  );
};

FixedBottomNavigation.displayName = 'FixedBottomNavigation';
export { FixedBottomNavigation };
