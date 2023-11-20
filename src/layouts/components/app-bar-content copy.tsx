import type { FC } from 'react';

import { Menu2 } from '@nxweb/icons/tabler';

import { Box, IconButton } from '@components/material.js';
import { ModeToggler } from '@components/mode-toggler.js';
import { UserDropdown } from '@components/user-dropdown.js';
import type { Settings } from '@hooks/use-settings.js';

interface Props {
  readonly hidden: boolean
  readonly saveSettings: (values: Settings) => void
  readonly settings: Settings
  readonly toggleNavVisibility: () => void
}

const AppBarContent: FC<Props> = ({ hidden, settings, saveSettings, toggleNavVisibility }) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
      }}
    >
      <Box
        className="actions-left"
        sx={{
          alignItems: 'center',
          display: 'flex',
          mr: 2
        }}
      >
        {hidden
          ? (
          <IconButton color="inherit" sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Menu2 fontSize="1.5rem" />
          </IconButton>
          )
          : null}

        <ModeToggler saveSettings={saveSettings} settings={settings} />
      </Box>
      <Box
        className="actions-right"
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  );
};

AppBarContent.displayName = 'AppBarContent';

export { AppBarContent };
