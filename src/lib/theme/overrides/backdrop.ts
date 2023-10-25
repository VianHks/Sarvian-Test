import { hexToRGBA } from '@nxweb/core';

import type { OwnerStateThemeType } from '../types.js';

export const Backdrop = () => {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor:
            theme.palette.mode === 'light'
              ? `rgba(${theme.palette.customColors.main}, 0.7)`
              : hexToRGBA(theme.palette.background.default, 0.7)
        }),

        invisible: {
          backgroundColor: 'transparent'
        }
      }
    }
  };
};
