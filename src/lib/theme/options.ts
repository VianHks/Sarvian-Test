import { deepmerge } from '@mui/utils';

import type { ThemeOptions } from '@components/material.js';
import { options as userThemeOptions } from '@config/theme.js';
import type { Settings } from '@hooks/use-settings.js';

// ** Theme Override Imports
import { breakpoints } from './breakpoints.js';
import { overrides } from './overrides.js';
import { palette } from './palette.js';
import { shadows } from './shadows.js';
import { spacing } from './spacing.js';
import { typography } from './typography.js';

export const themeOptions = (settings: Settings): ThemeOptions => {
  // ** Vars
  const { mode, direction, themeColor } = settings;

  // ** Create New object before removing user component overrides and typography objects from userThemeOptions
  const userThemeConfig: ThemeOptions = { ...userThemeOptions() };

  const mergedThemeConfig: ThemeOptions = deepmerge(
    {
      breakpoints: breakpoints(),
      components: overrides(),
      direction,
      palette: palette(mode),
      ...spacing,
      shape: {
        borderRadius: 6
      },

      mixins: {
        toolbar: {
          minHeight: 64
        }
      },
      shadows: shadows(mode),
      typography
    },
    userThemeConfig
  );

  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...mergedThemeConfig.palette
          ? mergedThemeConfig.palette[themeColor]
          : palette(mode).primary
      }
    }
  });
};
