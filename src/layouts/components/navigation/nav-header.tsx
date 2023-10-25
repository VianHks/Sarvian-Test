import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Circle, CircleDot, X as XIcon } from '@nxweb/icons/tabler';

import { Box, IconButton, styled, Typography } from '@components/material.js';
import type { BoxProps, TypographyProps } from '@components/material.js';
import { app as appConfig } from '@config/app.js';
import type { LayoutProps } from '@layouts/types.js';

interface Props {
  readonly collapsedNavWidth: number
  readonly hidden: LayoutProps['hidden']
  readonly menuLockedIcon?: LayoutProps['layout']['navMenu']['lockedIcon']
  readonly menuUnlockedIcon?: LayoutProps['layout']['navMenu']['unlockedIcon']
  readonly navHover: boolean
  readonly navMenuBranding?: LayoutProps['layout']['navMenu']['branding']
  readonly saveSettings: LayoutProps['saveSettings']
  readonly settings: LayoutProps['settings']
  readonly toggleNavVisibility: () => void
}

const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  minHeight: theme.mixins.toolbar.minHeight,
  paddingRight: theme.spacing(3.5),
  transition: 'padding .25s ease-in-out'
}));

const HeaderTitle = styled(Typography)<TypographyProps>({
  fontWeight: 700,
  lineHeight: '24px',
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
});

const LinkStyled = styled(Link)({
  alignItems: 'center',
  display: 'flex',
  textDecoration: 'none'
});

// eslint-disable-next-line react/require-default-props
const NavHeader: FC<Props> = (props) => {
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props;

  const { navCollapsed } = settings;
  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 };

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0;
      }

      return (collapsedNavWidth - 34) / 8;
    }

    return 6;
  };

  return (
    <MenuHeaderWrapper className="nav-header" sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding
        ? userNavMenuBranding(props)

        : (
        <LinkStyled to="/">
          <img alt="logo" height={32} src={appConfig.logo} width={32} />
          <HeaderTitle sx={{ ...menuCollapsedStyles, ...navCollapsed && !navHover ? {} : { ml: 2.5 } }} variant="h4">
            {appConfig.name}
          </HeaderTitle>
        </LinkStyled>
        )}

      {hidden
        ? (
        <IconButton
          disableFocusRipple={true}
          disableRipple={true}
          sx={{
            backgroundColor: 'transparent !important',
            color: 'text.secondary',
            p: 0
          }}
          onClick={toggleNavVisibility}
        >
          <XIcon fontSize="1.25rem" />
        </IconButton>
        )
        : userMenuLockedIcon === null && userMenuUnlockedIcon === null
          ? null
          : (
        <IconButton
          disableFocusRipple={true}
          disableRipple={true}
          sx={{
            backgroundColor: 'transparent !important',
            color: 'text.primary',
            p: 0,

            '& svg': {
              fontSize: '1.25rem',
              ...menuCollapsedStyles,
              transition: 'opacity .25s ease-in-out'
            }
          }}
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
        >
          {navCollapsed
            ? userMenuUnlockedIcon || <Circle />
            : userMenuLockedIcon || <CircleDot /> }
        </IconButton>
          )}
    </MenuHeaderWrapper>
  );
};

NavHeader.displayName = 'NavHeader';

export { NavHeader };
