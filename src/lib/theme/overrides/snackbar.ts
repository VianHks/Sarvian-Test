import type { OwnerStateThemeType } from '../types.js';

export const Snackbar = () => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: `rgb(${theme.palette.customColors.main})`,
          boxShadow: 'none',
          color: theme.palette.common[theme.palette.mode === 'light' ? 'white' : 'black']
        })
      }
    }
  };
};
