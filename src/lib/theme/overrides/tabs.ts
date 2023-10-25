import type { OwnerStateThemeType } from '../types.js';

export const Tabs = () => {
  return {
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          minHeight: 38,

          '&:not(.MuiTabs-vertical)': {
            borderBottom: `1px solid ${theme.palette.divider}`
          }
        }),
        vertical: ({ theme }: OwnerStateThemeType) => ({
          borderRight: `1px solid ${theme.palette.divider}`,
          marginRight: theme.spacing(4),
          minWidth: 130,

          '& .MuiTab-root': {
            minWidth: 130
          }
        })
      }
    },

    MuiTab: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          minHeight: 38,
          padding: theme.spacing(1.75, 5),
          textTransform: 'none'
        }),
        textColorSecondary: ({ theme }: OwnerStateThemeType) => ({
          '&.Mui-selected': {
            color: theme.palette.text.secondary
          }
        })
      }
    },
    MuiTabPanel: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(6)
        })
      }
    }
  };
};
