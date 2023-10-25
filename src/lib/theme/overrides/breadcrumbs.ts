import type { OwnerStateThemeType } from '../types.js';

export const Breadcrumbs = () => {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          '& a': {
            color: theme.palette.primary.main,
            textDecoration: 'none'
          }
        }),

        li: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,

          '& .MuiTypography-root': {
            color: 'inherit'
          }
        })
      }
    }
  };
};
