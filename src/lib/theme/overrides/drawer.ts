import type { OwnerStateThemeType } from '../types.js';

export const Drawer = () => {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          boxShadow: theme.shadows[7]
        })
      }
    }
  };
};
