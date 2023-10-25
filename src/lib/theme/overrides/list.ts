import { hexToRGBA } from '@nxweb/core';

import type { OwnerStateThemeType } from '../types.js';

export const List = () => {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          paddingLeft: theme.spacing(5),
          paddingRight: theme.spacing(5),

          '&:hover': {
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08),

            '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiListItemText-secondary, & .MuiListItemSecondaryAction-root .MuiIconButton-root':
              {
                color: theme.palette.primary.main
              }
          },

          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,

            '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiListItemText-secondary, & .MuiListItemSecondaryAction-root .MuiIconButton-root': {
              color: theme.palette.common.white
            }
          }
        })
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
          marginRight: theme.spacing(2.25),
          minWidth: '0 !important'
        })
      }
    },

    MuiListItemAvatar: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          marginRight: theme.spacing(4),
          minWidth: 0
        })
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          marginBottom: theme.spacing(0.5),
          marginTop: theme.spacing(0.5)
        }),

        dense: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiListItemText-primary': {
            color: theme.palette.text.primary
          }
        })
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.disabled,
          textTransform: 'uppercase'
        })
      }
    }
  };
};
