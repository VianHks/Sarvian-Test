import type { OwnerStateThemeType } from '../types.js';

export const Card = () => {
  return {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          border: `1px solid ${theme.palette.divider}`,

          '& .card-more-options': {
            marginRight: theme.spacing(-3),
            marginTop: theme.spacing(-1)
          },
          '& .MuiTableContainer-root, & .MuiDataGrid-root, & .MuiDataGrid-columnHeaders': {
            borderRadius: 0
          }
        })
      },

      defaultProps: {
        elevation: 7
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(6),

          '& .MuiButton-text': {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3)
          },
          '&.card-action-dense': {
            padding: theme.spacing(0, 3, 3),

            '.MuiCard-root .MuiCardMedia-root + &': {
              paddingTop: theme.spacing(3)
            }
          },
          '.MuiCard-root &:first-of-type': {
            paddingTop: theme.spacing(3),

            '& + .MuiCardHeader-root, & + .MuiCardContent-root, & + .MuiCardActions-root': {
              paddingTop: 0
            }
          }
        })
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(6),

          '& + .MuiCardHeader-root, & + .MuiCardContent-root, & + .MuiCardActions-root': {
            paddingTop: 0
          },
          '&:last-of-type': {
            paddingBottom: theme.spacing(0)
          }
        })
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(6),

          '& + .MuiCardContent-root, & + .MuiCardActions-root, & + .MuiCollapse-root .MuiCardContent-root': {
            paddingTop: 0
          },
          '& .MuiCardHeader-subheader': {
            color: theme.palette.text.disabled,
            fontSize: theme.typography.body2.fontSize,
            lineHeight: theme.typography.body2.lineHeight,
            marginTop: theme.spacing(0.5)
          }
        }),

        action: {
          marginRight: 0,
          marginTop: 0
        },
        title: ({ theme }: OwnerStateThemeType) => ({
          fontSize: theme.typography.h5.fontSize,
          fontWeight: 500,
          letterSpacing: '0.15px',
          lineHeight: 1.334
        })

      }
    }
  };
};
