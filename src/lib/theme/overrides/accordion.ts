import type { OwnerStateThemeType } from '../types.js';

export const Accordion = () => {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
          margin: theme.spacing(2, 0),
          transition: 'box-shadow .35s ease, margin .35s ease',

          '&:before': { display: 'none' },

          '&.Mui-disabled': {
            backgroundColor: `rgba(${theme.palette.customColors.main}, 0.12)`
          },

          '&.Mui-expanded': {
            boxShadow: theme.shadows[7],
            margin: theme.spacing(2, 0)
          },

          '& .MuiCollapse-root': {
            minHeight: 'unset !important',
            transition: 'height .35s ease !important',

            '&.MuiCollapse-entered': {
              height: 'auto !important'
            }
          }
        })
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(4.5),

          '& + .MuiAccordionDetails-root': {
            paddingTop: 0
          }
        })
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          borderRadius: 'inherit',
          fontWeight: 500,
          padding: `0 ${theme.spacing(4.5)}`,

          '& + .MuiCollapse-root': {
            '& .MuiAccordionDetails-root:first-child': {
              paddingTop: 0
            }
          },

          '&.Mui-expanded': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            minHeight: 'unset',

            '& .MuiAccordionSummary-content': {
              margin: theme.spacing(3.25, 0)
            }
          },

          '& .MuiTypography-root': {
            fontWeight: 500
          }
        }),

        content: ({ theme }: OwnerStateThemeType) => ({
          margin: theme.spacing(3.25, 0)
        }),
        expandIconWrapper: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary
        })
      }
    }
  };
};
