import type { OwnerStateThemeType } from '../types.js';

export const Popover = () => {
  const boxShadow = (theme: OwnerStateThemeType['theme']) => {
    if (theme.palette.mode === 'light') {
      return theme.shadows[6];
    }

    return '0px 3px 14px 0px rgba(15, 20, 34, 0.38)';
  };

  return {
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: boxShadow(theme)
        })
      }
    }
  };
};
