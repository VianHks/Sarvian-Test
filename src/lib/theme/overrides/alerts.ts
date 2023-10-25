import { hexToRGBA } from '@nxweb/core';

import type { OwnerStateThemeType } from '../types.js';

export const Alerts = () => {
  return {
    MuiAlert: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          alignItems: 'flex-start',
          fontSize: theme.typography.body1.fontSize,
          fontWeight: 500,
          lineHeight: 1.467,
          padding: theme.spacing(1.25, 3.5),

          '& .MuiAlertTitle-root': {
            marginBottom: theme.spacing(2.5)
          },

          '& a': {
            color: 'inherit',
            fontWeight: 700
          }
        }),

        action: ({ theme }: OwnerStateThemeType) => ({
          paddingTop: theme.spacing(1.25),

          '& svg': {
            fontSize: '1rem'
          }
        }),
        icon: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: theme.shape.borderRadius,
          fontSize: '1.125rem',
          margin: theme.spacing(1.75, 2.5, 1.75, 0),
          opacity: 1,
          padding: theme.spacing(1),

          '& + .MuiAlert-message': {
            padding: theme.spacing(2.25, 0)
          },

          '& ~ .MuiAlert-action': {
            paddingTop: theme.spacing(1.75)
          }
        }),
        message: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(1.75, 0)
        }),

        standard: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiAlert-icon': {
            backgroundColor: theme.palette.background.paper
          }
        }),
        standardError: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: hexToRGBA(theme.palette.error.main, 0.16),
          color: theme.palette.error.main,

          '& .MuiAlertTitle-root': {
            color: theme.palette.error.main
          },

          '& .MuiAlert-icon': {
            color: theme.palette.error.main
          }
        }),
        standardInfo: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: hexToRGBA(theme.palette.info.main, 0.16),
          color: theme.palette.info.main,

          '& .MuiAlertTitle-root': {
            color: theme.palette.info.main
          },

          '& .MuiAlert-icon': {
            color: theme.palette.info.main
          }
        }),
        standardSuccess: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: hexToRGBA(theme.palette.success.main, 0.16),
          color: theme.palette.success.main,

          '& .MuiAlertTitle-root': {
            color: theme.palette.success.main
          },

          '& .MuiAlert-icon': {
            color: theme.palette.success.main
          }
        }),
        standardWarning: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: hexToRGBA(theme.palette.warning.main, 0.16),
          color: theme.palette.warning.main,

          '& .MuiAlertTitle-root': {
            color: theme.palette.warning.main
          },

          '& .MuiAlert-icon': {
            color: theme.palette.warning.main
          }
        }),

        outlined: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(1, 3.25)
        }),
        outlinedError: ({ theme }: OwnerStateThemeType) => ({
          borderColor: theme.palette.error.main,
          color: theme.palette.error.main,

          '& .MuiAlertTitle-root': {
            color: theme.palette.error.main
          },

          '& .MuiAlert-icon': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white
          }
        }),
        outlinedInfo: ({ theme }: OwnerStateThemeType) => ({
          borderColor: theme.palette.info.main,
          color: theme.palette.info.main,

          '& .MuiAlertTitle-root': {
            color: theme.palette.info.main
          },

          '& .MuiAlert-icon': {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.common.white
          }
        }),
        outlinedSuccess: ({ theme }: OwnerStateThemeType) => ({
          borderColor: theme.palette.success.main,
          color: theme.palette.success.main,

          '& .MuiAlertTitle-root': {
            color: theme.palette.success.main
          },

          '& .MuiAlert-icon': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.common.white
          }
        }),
        outlinedWarning: ({ theme }: OwnerStateThemeType) => ({
          borderColor: theme.palette.warning.main,
          color: theme.palette.warning.main,

          '& .MuiAlertTitle-root': {
            color: theme.palette.warning.main
          },

          '& .MuiAlert-icon': {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.common.white
          }
        }),

        filled: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.common.white,

          '& .MuiAlert-icon': {
            backgroundColor: theme.palette.common.white
          }
        }),
        filledError: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiAlert-icon': {
            color: theme.palette.error.main
          }
        }),
        filledInfo: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiAlert-icon': {
            color: theme.palette.info.main
          }
        }),
        filledSuccess: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiAlert-icon': {
            color: theme.palette.success.main
          }
        }),
        filledWarning: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiAlert-icon': {
            color: theme.palette.warning.main
          }
        })
      }
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.125rem',
          lineHeight: 1.3334,
          marginTop: 0
        }
      }
    }
  };
};
