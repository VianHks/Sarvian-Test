import { hexToRGBA } from '@nxweb/core';

import type { OwnerStateThemeType } from '../types.js';

export const Tooltip = () => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor:
            theme.palette.mode === 'light'
              ? `rgba(${theme.palette.customColors.main}, 0.9)`
              : hexToRGBA(theme.palette.customColors.trackBg, 0.9),
          fontSize: theme.typography.body1.fontSize,
          padding: theme.spacing(1, 3)
        }),

        arrow: ({ theme }: OwnerStateThemeType) => ({
          color:
            theme.palette.mode === 'light'
              ? `rgba(${theme.palette.customColors.main}, 0.9)`
              : hexToRGBA(theme.palette.customColors.trackBg, 0.9)
        })
      }
    }
  };
};
