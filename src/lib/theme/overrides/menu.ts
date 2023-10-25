import { hexToRGBA } from '@nxweb/core';

import type { OwnerStateThemeType } from '../types.js';

export const Menu = () => {
  return {
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiMenuItem-root .MuiCheckbox-root.Mui-checked path:first-of-type': {
            fill: theme.palette.common.white
          },
          '& .MuiMenuItem-root .MuiCheckbox-root.Mui-checked path:last-of-type': {
            fill: theme.palette.primary.main,
            stroke: theme.palette.primary.main
          }
        })
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: theme.shape.borderRadius,
          margin: theme.spacing(0, 2, 1),
          padding: theme.spacing(2, 4),

          '&:last-child': {
            marginBottom: 0
          },

          '&:not(.Mui-focusVisible):hover': {
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08),
            color: theme.palette.primary.main,

            '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiListItemText-secondary, & .MuiListItemSecondaryAction-root .MuiIconButton-root': {
              color: theme.palette.primary.main
            }
          },

          '&.Mui-selected': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.common.white} !important`,

            '&.Mui-focusVisible': {
              backgroundColor: `${theme.palette.primary.dark} !important`
            },

            '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiListItemText-secondary, & .MuiListItemSecondaryAction-root .MuiIconButton-root': {
              color: `${theme.palette.common.white} !important`
            }
          }
        })
      },

      defaultProps: {
        disableRipple: true
      }
    }
  };
};
