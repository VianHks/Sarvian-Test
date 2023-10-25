import type { ElementType, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { hexToRGBA } from '@nxweb/core';
import type { NavigationGroup, NavigationLink } from '@nxweb/react';

import { Box, Chip, ListItem, ListItemButton, ListItemIcon, styled, Typography } from '@components/material.js';
import type { BoxProps, ChipProps, ListItemButtonProps } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import type { Settings } from '@hooks/use-settings.js';
import { Translation } from '@layouts/components/translation.js';
import { handleURLQueries } from '@layouts/utils.js';

interface Props {
  readonly collapsedNavWidth: number
  readonly isSubToSub?: NavigationGroup | undefined
  readonly item: NavigationLink
  readonly navHover?: boolean
  readonly navVisible?: boolean
  readonly parent?: boolean
  readonly settings: Settings
  readonly toggleNavVisibility: () => void
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)<
ListItemButtonProps & { component?: ElementType, target?: '_blank' | undefined, to: string }
>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginLeft: theme.spacing(3.5),
  marginRight: theme.spacing(3.5),
  transition: 'padding-left .25s ease-in-out, padding-right .25s ease-in-out',
  width: '100%',

  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },

  '&.active': {
    '&, &:hover': {
      background: `linear-gradient(72.47deg, ${
        theme.direction === 'ltr' ? theme.palette.primary.main : hexToRGBA(theme.palette.primary.main, 0.7)
      } 22.16%, ${
        theme.direction === 'ltr' ? hexToRGBA(theme.palette.primary.main, 0.7) : theme.palette.primary.main
      } 76.47%)`,
      boxShadow: `0px 2px 6px ${hexToRGBA(theme.palette.primary.main, 0.48)}`,

      '&.Mui-focusVisible': {
        background: `linear-gradient(72.47deg, ${theme.palette.primary.dark} 22.16%, ${hexToRGBA(
          theme.palette.primary.dark,
          0.7
        )} 76.47%)`
      }
    },

    '& .MuiTypography-root, & svg': {
      color: `${theme.palette.common.white} !important`
    }
  }
}));

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  width: '100%',
  ...themeConfig.menuTextTruncate && { overflow: 'hidden' }
}));

// eslint-disable-next-line complexity
const NavLink: FC<Props> = ({
  item,
  parent = undefined,
  navHover = undefined,
  settings,
  navVisible = undefined,
  isSubToSub = undefined,
  collapsedNavWidth,
  toggleNavVisibility
}: Props) => {
  const location = useLocation();
  const { navCollapsed } = settings;
  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon;
  const isNavLinkActive = () => {
    if (location.pathname === item.link || handleURLQueries(location, item.link)) {
      return true;
    }

    return false;
  };

  return (
    <ListItem
      className="nav-link"
      disablePadding={true}
      disabled={item.disabled || false}
      sx={{ mt: 1, px: '0 !important' }}
    >
      <MenuNavLink
        component={Link}
        {...(item.disabled && { tabIndex: -1 })}
        className={isNavLinkActive() ? 'active' : ''}
        sx={{
          py: 2,
          ...item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' },
          px: navCollapsed && !navHover ? (collapsedNavWidth - 22 - 28) / 8 : 4,

          '& .MuiTypography-root, & svg': {
            color: 'text.secondary'
          }
        }}
        target={item.external ? '_blank' : undefined}
        to={item.link === undefined ? '/' : `${item.link}`}
        onClick={(e: { preventDefault: () => void, stopPropagation: () => void }) => {
          if (item.link === undefined) {
            e.preventDefault();
            e.stopPropagation();
          }

          if (navVisible) {
            toggleNavVisibility();
          }
        }}
      >
        <ListItemIcon
          sx={{
            transition: 'margin .25s ease-in-out',
            ...navCollapsed && !navHover ? { mr: 0 } : { mr: 2 },
            ...parent ? { ml: 1.5, mr: 3.5 } : {}, // This line should be after (navCollapsed && !navHover) condition for proper styling
            '& svg': {
              fontSize: '0.625rem',
              ...!parent ? { fontSize: '1.375rem' } : {},
              ...parent && item.icon ? { fontSize: '0.875rem' } : {}
            }
          }}
        >
          {icon}
        </ListItemIcon>

        <MenuItemTextMetaWrapper
          sx={{
            ...isSubToSub ? { ml: 2 } : {},
            ...navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }
          }}
        >
          <Typography
            {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
              noWrap: true
            })}
          >
            <Translation text={item.text} />
          </Typography>
          {item.badge
            ? typeof item.badge === 'object' && 'content' in item.badge
              ? (
                <Chip
                  color={item.badge.color as ChipProps['color'] || 'primary'}
                  label={item.badge.content}
                  size="small"
                  sx={{
                    height: 22,
                    minWidth: 22,

                    '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                  }} />
              )
              : item.badge
            : null}
        </MenuItemTextMetaWrapper>
      </MenuNavLink>
    </ListItem>
  );
};

NavLink.displayName = 'NavLink';

export { NavLink };
