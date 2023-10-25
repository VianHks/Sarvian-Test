import type { OwnerStateThemeType } from '../types.js';

export const Dialog = () => {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[18],

          '&:not(.MuiDialog-paperFullScreen)': {
            [theme.breakpoints.down('sm')]: {
              margin: theme.spacing(4),
              maxWidth: `calc(100% - ${theme.spacing(8)}) !important`,
              width: `calc(100% - ${theme.spacing(8)})`
            }
          },

          '& > .MuiList-root': {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
          }
        })
      }
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(5, 6, 1)
        })
      }
    },

    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: `${theme.spacing(5, 6)} !important`
        })
      }
    },

    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(1, 6, 5),

          '&.dialog-actions-dense': {
            padding: theme.spacing(1, 2.5, 2.5)
          }
        })
      }
    }
  };
};
