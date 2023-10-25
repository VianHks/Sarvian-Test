import type { OwnerStateThemeType } from '../types.js';

export const Avatar = () => {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          fontSize: theme.typography.body1.fontSize
        }),

        colorDefault: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: theme.palette.customColors.avatarBg,
          color: theme.palette.text.secondary
        })
      }
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          '&.pull-up': {
            '& .MuiAvatar-root': {
              cursor: 'pointer',
              transition: 'box-shadow 0.25s ease, transform 0.25s ease',

              '&:hover': {
                boxShadow: theme.shadows[3],
                transform: 'translateY(-4px)',
                zIndex: 2
              }
            }
          },

          justifyContent: 'flex-end',

          '.MuiCard-root & .MuiAvatar-root': {
            borderColor: theme.palette.background.paper
          }
        })
      }
    }
  };
};
