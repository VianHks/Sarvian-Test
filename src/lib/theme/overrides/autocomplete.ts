import { hexToRGBA } from '@nxweb/core';

import type { OwnerStateThemeType } from '../types.js';

export const Autocomplete = () => {
  const boxShadow = (theme: OwnerStateThemeType['theme']) => {
    if (theme.palette.mode === 'light') {
      return theme.shadows[4];
    }

    return '0px 3px 14px 0px rgba(15, 20, 34, 0.38)';
  };

  return {
    MuiAutocomplete: {
      styleOverrides: {
        popper: ({ theme }: OwnerStateThemeType) => ({
          '.MuiPaper-root': {
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: boxShadow(theme),

            '& .MuiAutocomplete-option .MuiListItemButton-root:hover': {
              backgroundColor: 'transparent'
            },
            '&.custom-autocomplete-paper': {
              ...theme.typography.body1,
              '& .MuiAutocomplete-option': {
                '&.Mui-focused': {
                  backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08),
                  color: theme.palette.primary.main,

                  '& .MuiTypography-root, & svg': {
                    color: 'inherit'
                  }
                },
                '&[aria-selected="true"]': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,

                  '& .MuiTypography-root, & svg': {
                    color: 'inherit'
                  }
                },

                '& .MuiCheckbox-root.Mui-checked path:first-of-type': {
                  fill: theme.palette.common.white
                },
                '& .MuiCheckbox-root.Mui-checked path:last-of-type': {
                  fill: theme.palette.primary.main,
                  stroke: theme.palette.primary.main
                }
              }
            }
          }
        }),

        inputRoot: {
          '& .MuiAutocomplete-tagSizeSmall': {
            height: 22
          }
        }
      }
    }
  };
};
