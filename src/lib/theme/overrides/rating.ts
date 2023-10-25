import type { OwnerStateThemeType } from '../types.js';

export const Rating = () => {
  return {
    MuiRating: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.warning.main,

          '& svg': {
            flexShrink: 0
          }
        })
      }
    }
  };
};
