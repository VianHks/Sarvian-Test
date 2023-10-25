// ** Type Import
import type { OwnerStateThemeType } from '../types.js';

export const Divider = () => {
  return {
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          '.MuiStack-root &:not(.MuiDivider-vertical)': {
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2)
          }
        }),

        middle: ({ theme }: OwnerStateThemeType) => ({
          '&:not(.MuiDivider-vertical)': {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5)
          },

          '&.MuiDivider-vertical': {
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2)
          }
        })
      }
    }
  };
};
