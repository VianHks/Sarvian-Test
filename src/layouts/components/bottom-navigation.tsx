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
        icon={
        <span
          style={{
            fontSize: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {navItem.icon}
        </span>
      }
        key={index}
        label={navItem.text}
        sx={{
          position: 'relative',
          '::before': {
            content: '""',
            position: 'absolute',
            top: 3,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#2671df',
            display: value === navItem.link ? 'block' : 'none'
          }
        }}
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
