import { Box, Typography } from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import biloImage from '@assets/images/pages/bilo1.svg';

const LocationByGps: PageComponent = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
    >
        <img alt="bilo" src={biloImage} />
        <Typography color="primary" fontWeight="bold" variant="h4">
          Mencari Lokasimu
        </Typography>
        <Typography color="neutral-90" variant="body1">
          Jalan Hegarmanah No. 28
        </Typography>
    </Box>
  );
};

LocationByGps.displayName = 'LocationByGps';

export default LocationByGps;
