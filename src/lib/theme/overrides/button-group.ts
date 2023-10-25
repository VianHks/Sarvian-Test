import { hexToRGBA } from '@nxweb/core';

import type { OwnerStateThemeType } from '../types.js';

export const ButtonGroup = () => {
  return {
    MuiButtonGroup: {
      variants: [
        {
          props: {
            color: 'primary',
            variant: 'contained'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.primary.main
          })
        },
        {
          props: {
            color: 'secondary',
            variant: 'contained'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.secondary.main
          })
        },
        {
          props: {
            color: 'success',
            variant: 'contained'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.success.main
          })
        },
        {
          props: {
            color: 'error',
            variant: 'contained'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.error.main
          })
        },
        {
          props: {
            color: 'warning',
            variant: 'contained'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.warning.main
          })
        },
        {
          props: {
            color: 'info',
            variant: 'contained'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            backgroundColor: theme.palette.info.main
          })
        },
        {
          props: {
            color: 'primary',
            orientation: 'horizontal',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.primary.main, 0.24)}`
            }
          })
        },
        {
          props: {
            color: 'secondary',
            orientation: 'horizontal',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.secondary.main, 0.24)}`
            }
          })
        },
        {
          props: {
            color: 'error',
            orientation: 'horizontal',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.error.main, 0.24)}`
            }
          })
        },
        {
          props: {
            color: 'warning',
            orientation: 'horizontal',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.warning.main, 0.24)}`
            }
          })
        },
        {
          props: {
            color: 'info',
            orientation: 'horizontal',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.info.main, 0.24)}`
            }
          })
        },
        {
          props: {
            color: 'success',
            orientation: 'horizontal',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderRight: `1px solid ${hexToRGBA(theme.palette.success.main, 0.24)}`
            }
          })
        },
        {
          props: {
            color: 'primary',
            orientation: 'vertical',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.primary.main, 0.24)}`
            }
          })
        },
        {
          props: {
            color: 'secondary',
            orientation: 'vertical',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.secondary.main, 0.24)}`
            }
          })
        },
        {
          props: {
            color: 'error',
            orientation: 'vertical',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.error.main, 0.24)}`
            }
          })
        },
        {
          props: {
            color: 'warning',
            orientation: 'vertical',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.warning.main, 0.24)}`
            }
          })
        },
        {
          props: {
            color: 'info',
            orientation: 'vertical',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.info.main, 0.24)}`
            }
          })
        },
        {
          props: {
            color: 'success',
            orientation: 'vertical',
            variant: 'tonal'
          },
          style: ({ theme }: OwnerStateThemeType) => ({
            '& .MuiButton-tonal:not(:last-child)': {
              borderBottom: `1px solid ${hexToRGBA(theme.palette.success.main, 0.24)}`
            }
          })
        }
      ]
    }
  };
};
