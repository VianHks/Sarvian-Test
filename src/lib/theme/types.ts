import type { ComponentsPropsList, Theme } from '@components/material.js';

declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      avatarBg: string
      bodyBg: string
      dark: string
      darkPaperBg: string
      gradient: string
      light: string
      lightPaperBg: string
      main: string
      tableHeaderBg: string
      trackBg: string
    }
  }
  interface PaletteColor {
    gradient?: string
  }
  interface PaletteOptions {
    customColors?: {
      avatarBg?: string
      bodyBg?: string
      dark?: string
      darkPaperBg?: string
      gradient?: string
      light?: string
      lightPaperBg?: string
      main?: string
      tableHeaderBg?: string
      trackBg?: string
    }
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    tonal: true
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides {
    tonal: true
  }
}

export interface OwnerStateThemeType {
  ownerState: ComponentsPropsList[keyof ComponentsPropsList] & Record<string, unknown>
  theme: Theme
}
