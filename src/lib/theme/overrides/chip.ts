import { hexToRGBA } from '@nxweb/core';

import type { OwnerStateThemeType } from '../types.js';

export const Chip = () => {
  return {
    MuiChip: {
      styleOverrides: {
        root: ({ theme, ownerState }: OwnerStateThemeType) => ({
          fontSize: theme.typography.body2.fontSize,
          fontWeight: 500,
          ...ownerState.size === 'medium' && {
            height: 30
          },
          '&.MuiChip-rounded': {
            borderRadius: 4
          }
        }),

        outlined: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-colorDefault': {
            borderColor: `rgba(${theme.palette.customColors.main}, 0.2)`
          }
        }),

        labelSmall: ({ theme }: OwnerStateThemeType) => ({
          paddingLeft: theme.spacing(2.5),
          paddingRight: theme.spacing(2.5)
        }),

        deleteIcon: {
          height: 18,
          width: 18
        },

        avatar: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary
        }),

        deletableColorPrimary: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.primary.main, 0.7),

            '&:hover': {
              color: theme.palette.primary.main
            }
          }
        }),

        deletableColorSecondary: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.secondary.main, 0.7),

            '&:hover': {
              color: theme.palette.secondary.main
            }
          }
        }),

        deletableColorSuccess: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.success.main, 0.7),

            '&:hover': {
              color: theme.palette.success.main
            }
          }
        }),

        deletableColorError: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.error.main, 0.7),

            '&:hover': {
              color: theme.palette.error.main
            }
          }
        }),

        deletableColorWarning: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.warning.main, 0.7),

            '&:hover': {
              color: theme.palette.warning.main
            }
          }
        }),

        deletableColorInfo: ({ theme }: OwnerStateThemeType) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.info.main, 0.7),

            '&:hover': {
              color: theme.palette.info.main
            }
          }
        })
      }
    }
  };
};
