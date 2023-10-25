import type { FC, ReactNode } from 'react';

import { createTheme, CssBaseline, GlobalStyles, responsiveFontSizes, ThemeProvider } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import type { Settings } from '@hooks/use-settings.js';
import { Direction } from '@layouts/components/direction.js';

import { globalStyles } from './globalStyles.js';
import { themeOptions } from './options.js';

interface Props {
  readonly children: ReactNode
  readonly settings: Settings
}

const ThemeComponent: FC<Props> = ({ settings, children }) => {
  // ** Pass merged ThemeOptions (of core and user) to createTheme function
  let theme = createTheme(themeOptions(settings));

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return (
    <ThemeProvider theme={theme}>
      <Direction direction={settings.direction}>
        <CssBaseline />
        <GlobalStyles styles={() => globalStyles(theme)} />
        {children}
      </Direction>
    </ThemeProvider>
  );
};

ThemeComponent.displayName = 'ThemeComponent';

export { ThemeComponent };
