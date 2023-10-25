import type { FC } from 'react';

import { Box } from '@components/material.js';
import type { BoxProps } from '@components/material.js';

import AppLogo from '@assets/images/logo.svg?icon';

interface FallbackSpinnerProps {
  readonly sx?: BoxProps['sx']
}

const FallbackSpinner: FC<FallbackSpinnerProps> = ({ sx = undefined }) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        ...sx
      }}
    >
      <AppLogo size={72} />
    </Box>
  );
};

FallbackSpinner.displayName = 'FallbackSpinner';

export { FallbackSpinner };
