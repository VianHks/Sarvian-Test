import { hexToRGBA } from '@nxweb/core';

import type { OwnerStateThemeType } from '../types.js';

export const Slider = () => {
  return {
    MuiSlider: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          '&:not(.MuiSlider-vertical)': {
            height: 6
          },

          '&.MuiSlider-vertical': {
            width: 6
          },

          '&.MuiSlider-colorPrimary': {
            '& .MuiSlider-thumb.Mui-active': {
              boxShadow: `0 0 0 10px ${hexToRGBA(theme.palette.primary.main, 0.16)}`
            },

            '& .MuiSlider-thumbSizeSmall:hover, &.MuiSlider-sizeSmall .MuiSlider-thumb.Mui-focusVisible': {
              boxShadow: `0 0 0 6px ${hexToRGBA(theme.palette.primary.main, 0.16)}`
            },

            '& .MuiSlider-thumbSizeSmall.Mui-active': {
              boxShadow: `0 0 0 8px ${hexToRGBA(theme.palette.primary.main, 0.16)} !important`
            }
          },
          '&.MuiSlider-colorSecondary': {
            '& .MuiSlider-thumb.Mui-active': {
              boxShadow: `0 0 0 10px ${hexToRGBA(theme.palette.secondary.main, 0.16)}`
            },

            '& .MuiSlider-thumbSizeSmall:hover, &.MuiSlider-sizeSmall .MuiSlider-thumb.Mui-focusVisible': {
              boxShadow: `0 0 0 6px ${hexToRGBA(theme.palette.secondary.main, 0.16)}`
            },

            '& .MuiSlider-thumbSizeSmall.Mui-active': {
              boxShadow: `0 0 0 8px ${hexToRGBA(theme.palette.secondary.main, 0.16)} !important`
            }
          }
        }),

        rail: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: theme.palette.action.selected,
          opacity: 1
        }),

        track: {
          border: 0
        },

        thumb: ({ theme }: OwnerStateThemeType) => ({
          height: 14,
          width: 14,

          '&:before': {
            border: `2px solid ${theme.palette.background.paper}`,
            boxShadow: theme.shadows[3]
          },

          '&:not(.Mui-active):after': {
            height: 30,
            width: 30
          },

          '&.Mui-active': {
            height: 19,
            width: 19,

            '&:before': {
              borderWidth: 3
            },

            '&:after': {
              height: 38,
              width: 38
            }
          }
        }),

        sizeSmall: {
          '&:not(.MuiSlider-vertical)': {
            height: 4
          },

          '&.MuiSlider-vertical': {
            width: 4
          }
        },
        thumbSizeSmall: ({ theme }: OwnerStateThemeType) => ({
          height: 12,
          width: 12,

          '&:before': {
            boxShadow: theme.shadows[2]
          },

          '&:not(.Mui-active):after': {
            height: 24,
            width: 24
          },

          '&.Mui-active': {
            height: 14,
            width: 14,

            '&:before': {
              borderWidth: 2
            },

            '&:after': {
              height: 30,
              width: 30
            }
          }
        }),
        valueLabel: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor:
            theme.palette.mode === 'light'
              ? `rgba(${theme.palette.customColors.main}, 0.9)`
              : hexToRGBA(theme.palette.customColors.trackBg, 0.9),
          borderRadius: 4,
          padding: theme.spacing(1, 2),

          '&:before': {
            display: 'none'
          },

          '& .MuiSlider-valueLabelCircle': {
            lineHeight: 'normal'
          }
        }),

        markLabel: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.disabled
        })
      }
    }
  };
};
