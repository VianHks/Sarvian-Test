import type { OwnerStateThemeType } from '../types.js';

export const Progress = () => {
  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: theme.palette.customColors.trackBg,
          borderRadius: '10px',
          height: 12,

          '& .MuiLinearProgress-dashed': {
            marginTop: theme.spacing(1)
          }
        }),

        bar: {
          borderRadius: '10px'
        }
      }
    }
  };
};
