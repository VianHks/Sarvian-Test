import type { OwnerStateThemeType } from '../types.js';

export const Table = () => {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          borderTopColor: theme.palette.divider,
          boxShadow: theme.shadows[0]
        })
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          textTransform: 'uppercase',

          '& .MuiTableCell-head': {
            fontSize: theme.typography.body2.fontSize,
            fontWeight: 500,
            letterSpacing: '1px'
          }
        })
      }
    },

    MuiTableBody: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiTableCell-body': {
            color: theme.palette.text.secondary,
            letterSpacing: '0.25px',

            '&:not(.MuiTableCell-sizeSmall):not(.MuiTableCell-paddingCheckbox):not(.MuiTableCell-paddingNone)': {
              paddingBottom: theme.spacing(3.5),
              paddingTop: theme.spacing(3.5)
            }
          }
        })
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          '& .MuiTableCell-head:not(.MuiTableCell-paddingCheckbox):first-child, & .MuiTableCell-root:not(.MuiTableCell-paddingCheckbox):first-child ':
            {
              paddingLeft: theme.spacing(6)
            },

          '& .MuiTableCell-head:last-child, & .MuiTableCell-root:last-child': {
            paddingRight: theme.spacing(6)
          }
        })
      }
    },

    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          borderBottom: `1px solid ${theme.palette.divider}`
        }),

        paddingCheckbox: ({ theme }: OwnerStateThemeType) => ({
          paddingLeft: theme.spacing(3.25)
        }),

        stickyHeader: ({ theme }: OwnerStateThemeType) => ({
          backgroundColor: theme.palette.customColors.tableHeaderBg
        })
      }
    }
  };
};
