import type { FC } from 'react';
import { cloneElement, isValidElement, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { classNames } from '@nxweb/core';
import { ChevronLeft, ChevronRight } from '@nxweb/icons/tabler';
import type { NavigationGroup } from '@nxweb/react';

import { Box, Chip, Collapse, ListItem, ListItemButton, ListItemIcon, styled, Typography } from '@components/material.js';
import type { BoxProps, ChipProps } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import { Translation } from '@layouts/components/translation.js';
import type { LayoutProps } from '@layouts/types.js';
import { hasActiveChild, removeChildren } from '@layouts/utils.js';

import { NavItems } from './nav-items.js';

interface Props {
  readonly collapsedNavWidth: number
  readonly currentActiveGroup: string[]
  readonly groupActive: string[]
  readonly isSubToSub?: NavigationGroup | undefined
  readonly item: NavigationGroup
  readonly navHover: boolean
  readonly navVisible?: boolean
  readonly parent?: NavigationGroup
  readonly saveSettings: LayoutProps['saveSettings']
  readonly setCurrentActiveGroup: (items: string[]) => void
  readonly setGroupActive: (values: string[]) => void
  readonly settings: LayoutProps['settings']
}

const MenuItemTextWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  width: '100%',
  ...themeConfig.menuTextTruncate && { overflow: 'hidden' }
}));

// eslint-disable-next-line complexity, react/require-default-props
const NavGroup: FC<Props> = (props) => {
  const {
    item,
    parent,
    settings,
    navHover,
    navVisible,
    isSubToSub,
    groupActive,
    setGroupActive,
    collapsedNavWidth,
    currentActiveGroup,
    setCurrentActiveGroup
  } = props;

  const location = useLocation();
  const currentURL = location.pathname;
  const { direction, navCollapsed, navToggleType } = settings;

  // ** Accordion menu group open toggle
  const toggleActiveGroup = (item: NavigationGroup, parent: NavigationGroup | undefined) => {
    let openGroup = groupActive;

    // ** If Group is already open and clicked, close the group
    if (openGroup.includes(item.id)) {
      openGroup.splice(openGroup.indexOf(item.id), 1);

      // If clicked Group has open group children, Also remove those children to close those groups
      if (item.children) {
        removeChildren(item.children, openGroup, currentActiveGroup);
      }
    } else if (parent) {
      // ** If Group clicked is the child of an open group, first remove all the open groups under that parent
      if (parent.children) {
        removeChildren(parent.children, openGroup, currentActiveGroup);
      }

      // ** After removing all the open groups under that parent, add the clicked group to open group array
      if (!openGroup.includes(item.id)) {
        openGroup.push(item.id);
      }
    } else {
      // ** If clicked on another group that is not active or open, create openGroup array from scratch

      // ** Empty Open Group array
      openGroup = [];

      // ** Push Current Active Group To Open Group array
      if (currentActiveGroup.every((elem) => groupActive.includes(elem))) {
        openGroup.push(...currentActiveGroup);
      }

      // ** Push current clicked group item to Open Group array
      if (!openGroup.includes(item.id)) {
        openGroup.push(item.id);
      }
    }

    setGroupActive([...openGroup]);
  };

  // ** Menu Group Click
  const handleGroupClick = () => {
    const openGroup = groupActive;
    if (navToggleType === 'collapse') {
      if (openGroup.includes(item.id)) {
        openGroup.splice(openGroup.indexOf(item.id), 1);
      } else {
        openGroup.push(item.id);
      }

      setGroupActive([...openGroup]);
    } else {
      toggleActiveGroup(item, parent);
    }
  };

  useEffect(() => {
    if (hasActiveChild(item, currentURL)) {
      if (!groupActive.includes(item.id)) groupActive.push(item.id);
    } else {
      const index = groupActive.indexOf(item.id);
      if (index > -1) groupActive.splice(index, 1);
    }

    setGroupActive([...groupActive]);
    setCurrentActiveGroup([...groupActive]);

    // Empty Active Group When Menu is collapsed and not hovered, to fix issue route change
    if (navCollapsed && !navHover) {
      setGroupActive([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (navCollapsed && !navHover) {
      setGroupActive([]);
    }

    if ((navCollapsed && navHover) || (groupActive.length === 0 && !navCollapsed)) {
      setGroupActive([...currentActiveGroup]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navCollapsed, navHover]);

  useEffect(() => {
    if (groupActive.length === 0 && !navCollapsed) {
      setGroupActive([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navHover]);

  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon;

  const menuGroupCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 };

  return (
    <ListItem
      className="nav-group"
      disablePadding={true}
      sx={{
        flexDirection: 'column',
        mt: 1,
        px: '0 !important'
      }}
      onClick={handleGroupClick}
    >
      <ListItemButton
        className={classNames({
          'Mui-selected': groupActive.includes(item.id) || currentActiveGroup.includes(item.id)
        })}
        sx={{
          borderRadius: 1,
          mx: 3.5,
          px: navCollapsed && !navHover ? (collapsedNavWidth - 22 - 28) / 8 : 4,
          py: 2,
          transition: 'padding-left .25s ease-in-out, padding-right .25s ease-in-out',
          width: (theme) => `calc(100% - ${theme.spacing(3.5 * 2)})`,

          '&:hover': {
            backgroundColor: 'action.hover'
          },

          '& .MuiTypography-root, & :not(.menu-item-meta) > svg': {
            color: 'text.secondary'
          },

          '&.Mui-selected': {
            backgroundColor: 'action.selected',

            '&:hover': {
              backgroundColor: 'action.selected'
            },

            '& .MuiTypography-root, & :not(.menu-item-meta) > svg': {
              color: 'text.primary'
            },

            '& .menu-item-meta > svg': {
              color: 'text.secondary'
            },

            '&.Mui-focusVisible': {
              backgroundColor: 'action.focus',

              '&:hover': {
                backgroundColor: 'action.focus'
              }
            }
          }
        }}
      >
        <ListItemIcon
          sx={{
            transition: 'margin .25s ease-in-out',
            ...parent && navCollapsed && !navHover ? {} : { mr: 2 },
            ...navCollapsed && !navHover ? { mr: 0 } : {}, // This condition should come after (parent && navCollapsed && !navHover) condition for proper styling
            ...parent && item.children ? { ml: 1.5, mr: 3.5 } : {}
          }}
        >
          { isValidElement(icon)
            ? cloneElement(icon, { ...icon.props || {}, ...parent, fontSize: '0.625rem' })
            : null }
        </ListItemIcon>
        <MenuItemTextWrapper sx={{ ...menuGroupCollapsedStyles, ...isSubToSub ? { ml: 2 } : {} }}>
          <Typography
            {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
              noWrap: true
            })}
          >
            <Translation text={item.text} />
          </Typography>
          <Box
            className="menu-item-meta"
            sx={{
              alignItems: 'center',
              display: 'flex',

              '& svg': {
                color: 'text.disabled',
                transition: 'transform .25s ease-in-out',
                ...groupActive.includes(item.id) && {
                  transform: direction === 'ltr' ? 'rotate(90deg)' : 'rotate(-90deg)'
                }
              }
            }}
          >
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
                      mr: 2,

                      '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                    }} />
                )
                : item.badge
              : null}
            {direction === 'ltr' ? <ChevronRight fontSize="1.125rem" /> : <ChevronLeft fontSize="1.125rem" />}
          </Box>
        </MenuItemTextWrapper>
      </ListItemButton>
      <Collapse
        component="ul"
        in={groupActive.includes(item.id)}
        sx={{
          pl: 0,
          width: '100%',
          ...menuGroupCollapsedStyles,
          transition: 'all 0.25s ease-in-out'
        }}
        onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
      >
        <NavItems
          {...props}
          isSubToSub={parent && item.children ? item : undefined}
          navItems={item.children}
          navVisible={navVisible}
          parent={item} />
      </Collapse>
    </ListItem>
  );
};

NavGroup.displayName = 'NavGroup';

export { NavGroup };
