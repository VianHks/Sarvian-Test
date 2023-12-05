import type { FC } from 'react';
import { useState } from 'react';

import { hexToRGBA } from '@nxweb/core';

import { Button, Menu, MenuItem, AppBar as MuiAppBar, Toolbar as MuiToolbar, styled } from '@components/material.js';
import type { AppBarProps, Theme, ToolbarProps } from '@components/material.js';
import type { LayoutProps } from '@layouts/types.js';

interface Props {
  readonly appBarContent: NonNullable<LayoutProps['layout']['appBar']>['content']
  readonly appBarProps: NonNullable<LayoutProps['layout']['appBar']>['componentProps']
  readonly hidden: LayoutProps['hidden']
  readonly saveSettings: LayoutProps['saveSettings']
  readonly settings: LayoutProps['settings']
  readonly toggleNavVisibility: () => void
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  justifyContent: 'center',
  minHeight: theme.mixins.toolbar.minHeight,
  transition: 'none',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6)
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}));

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(4),
  padding: `${theme.spacing(0, 6)} !important`,
  width: '100%'
}));

// eslint-disable-next-line react/require-default-props
const VerticalAppBar: FC<Props> = (props) => {
  const { settings, appBarProps, appBarContent: userAppBarContent } = props;
  const { appBar, appBarBlur } = settings;
  
  const appBarBlurEffect = appBarBlur && {
    '&:after': {
      backdropFilter: 'blur(10px)',
      background: (theme: Theme) => `linear-gradient(180deg,${hexToRGBA(theme.palette.background.default, 0.7)} 44%, ${hexToRGBA(
        theme.palette.background.default,
        0.43
      )} 73%, ${hexToRGBA(theme.palette.background.default, 0)})`,
      content: '""',
      height: (theme: Theme) => `calc(${theme.mixins.toolbar.minHeight as number}px + ${theme.spacing(4)})`,
      left: 0,
      mask: (theme: Theme) => `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default} 18%, transparent 100%)`,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: -1
    }
  };

  if (appBar === 'hidden') {
    return null;
  }

  let userAppBarStyle = {};
  if (appBarProps && appBarProps.sx) {
    userAppBarStyle = appBarProps.sx;
  }

  const userAppBarProps = { ...appBarProps };

  delete userAppBarProps.sx;

  

  return (
    <AppBar
      className="layout-navbar"
      color="default"
      elevation={0}
      position={appBar === 'fixed' ? 'sticky' : 'static'}
      sx={{ ...appBarBlurEffect, ...userAppBarStyle }}
      {...userAppBarProps}
    >
      <Toolbar
        className="navbar-content-container"
        sx={{
          ...appBarBlur && { backdropFilter: 'blur(6px)' },
          backgroundColor: (theme) => hexToRGBA(theme.palette.background.paper, appBarBlur ? 0.95 : 1),
          boxShadow: 2,
          minHeight: (theme) => `${theme.mixins.toolbar.minHeight as number}px !important`
        }}
      >
        {(userAppBarContent && userAppBarContent(props)) || null}
        
      </Toolbar>
    </AppBar>
  );
};

VerticalAppBar.displayName = 'VerticalAppBar';

export { VerticalAppBar };
