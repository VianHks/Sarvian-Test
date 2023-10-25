import type { OwnerStateThemeType } from '../types.js';

export const FabButton = () => {
  return {
    MuiFab: {
      styleOverrides: {
        default: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary
        })
      }
    }
  };
};
