import type { FC } from 'react';

import { MoonStars, Sun } from '@nxweb/icons/tabler';

import { IconButton } from '@components/material.js';
import type { Settings } from '@hooks/use-settings.js';
import type { ThemeMode } from '@layouts/types.js';

interface Props {
  readonly saveSettings: (values: Settings) => void
  readonly settings: Settings
}

const ModeToggler: FC<Props> = ({ settings, saveSettings }) => {
  const handleModeChange = (mode: ThemeMode) => {
    saveSettings({ ...settings, mode });
  };

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark' as ThemeMode);
    } else {
      handleModeChange('light' as ThemeMode);
    }
  };

  return (
    <IconButton aria-haspopup="true" color="inherit" onClick={handleModeToggle}>
      { settings.mode === 'dark'
        ? <Sun fontSize="1.625rem" />
        : <MoonStars fontSize="1.625rem" /> }
    </IconButton>
  );
};

ModeToggler.displayName = 'ModeToggler';

export { ModeToggler };
