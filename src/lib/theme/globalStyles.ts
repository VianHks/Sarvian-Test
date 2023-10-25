import type { Theme } from '@components/material.js';

export const globalStyles = (theme: Theme) => {
  return {
    '.demo-space-x > *': {
      marginRight: '1rem !important',
      marginTop: '1rem !important',

      'body[dir="rtl"] &': {
        marginLeft: '1rem !important',
        marginRight: '0 !important'
      }
    },
    '.demo-space-y > *:not(:last-of-type)': {
      marginBottom: '1rem'
    },
    '.MuiGrid-container.match-height .MuiCard-root': {
      height: '100%'
    },
    '.ps__rail-y': {
      left: 'auto !important',
      right: '0 !important',
      zIndex: 1,

      '&:hover, &:focus, &.ps--clicking': {
        backgroundColor: theme.palette.mode === 'light' ? '#F1F0F5 !important' : '#393D55 !important'
      },

      '& .ps__thumb-y': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(93, 89, 108, 0.2) !important' : 'rgba(207, 211, 236, 0.3) !important',
        left: 'auto !important',
        right: '3px !important'
      },
      '.layout-vertical-nav &': {
        '& .ps__thumb-y': {
          width: 4
        },

        '&:hover, &:focus, &.ps--clicking': {
          backgroundColor: 'transparent !important',

          '& .ps__thumb-y': {
            width: 6
          }
        }
      }
    },

    '#nprogress': {
      pointerEvents: 'none',

      '& .bar': {
        backgroundColor: theme.palette.primary.main,
        height: 3,
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 2000
      }
    }
  };
};
