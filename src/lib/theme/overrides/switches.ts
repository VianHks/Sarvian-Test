import type { OwnerStateThemeType } from '../types.js';

export const Switches = () => {
  return {
    MuiSwitch: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          height: 42,
          width: 54,

          '& .MuiSwitch-track': {
            backgroundColor: theme.palette.background.paper,
            border: `1px solid rgba(${theme.palette.customColors.main}, ${theme.palette.mode === 'dark' ? 0.4 : 0.2})`,
            borderRadius: 30,
            height: 18,
            opacity: 1,
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, background-color 0.15s ease-in-out',
            width: 30
          }
        }),
        switchBase: ({ theme }: OwnerStateThemeType) => ({
          color: `rgba(${theme.palette.customColors.main}, ${theme.palette.mode === 'dark' ? 0.4 : 0.2})`,
          left: 6,
          padding: `${theme.spacing(2.5)} !important`,
          top: 5,
          transition: 'left 0.15s ease-in-out, transform 0.15s ease-in-out, color 0.15s ease-in-out',

          '&:hover': {
            backgroundColor: 'transparent !important'
          },

          '&.Mui-disabled': {
            color: `rgba(${theme.palette.customColors.main}, ${theme.palette.mode === 'dark' ? 0.8 : 0.4})`,

            '& + .MuiSwitch-track': {
              backgroundColor: `rgba(${theme.palette.customColors.main}, ${theme.palette.mode === 'dark' ? 0.4 : 0.2})`,
              borderColor: 'transparent !important'
            },
            '&, & + .MuiSwitch-track': {
              opacity: 0.5
            },
            '&.Mui-checked': {
              opacity: theme.palette.mode === 'dark' ? 0.5 : 0.9,

              '& + .MuiSwitch-track': {
                boxShadow: 'none',
                opacity: 0.3
              }
            }
          },

          '&.Mui-checked': {
            color: `${theme.palette.common.white} !important`,
            transform: 'translateX(11px)',

            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              boxShadow: theme.shadows[2],
              opacity: 1
            },

            '&.MuiSwitch-colorSecondary + .MuiSwitch-track': {
              backgroundColor: theme.palette.secondary.main,
              borderColor: theme.palette.secondary.main
            },

            '&.MuiSwitch-colorSuccess + .MuiSwitch-track': {
              backgroundColor: theme.palette.success.main,
              borderColor: theme.palette.success.main
            },

            '&.MuiSwitch-colorError + .MuiSwitch-track': {
              backgroundColor: theme.palette.error.main,
              borderColor: theme.palette.error.main
            },

            '&.MuiSwitch-colorWarning + .MuiSwitch-track': {
              backgroundColor: theme.palette.warning.main,
              borderColor: theme.palette.warning.main
            },

            '&.MuiSwitch-colorInfo + .MuiSwitch-track': {
              backgroundColor: theme.palette.info.main,
              borderColor: theme.palette.info.main
            }
          }
        }),
        thumb: {
          boxShadow: 'none',
          height: 12,
          width: 12
        },

        sizeSmall: ({ theme }: OwnerStateThemeType) => ({
          height: 30,
          width: 38,

          '& .MuiSwitch-track': {
            height: 16,
            width: 24
          },

          '& .MuiSwitch-thumb': {
            height: 10,
            width: 10
          },

          '& .MuiSwitch-switchBase': {
            left: 5,
            padding: `${theme.spacing(1.5)} !important`,
            top: 4,

            '&.Mui-checked': {
              transform: 'translateX(7px)'
            }
          }
        })
      }
    }
  };
};
