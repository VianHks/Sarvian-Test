import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import { MYLocationFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import map from '@assets/images/pages/Map.svg';

const Gps: PageComponent = () => {
  const navigate = useNavigate();

  const handleChooseLocation = () => {
    navigate('/location');
  };

  return (
    <>
      <img alt="map" src={map} />
      <Box position="relative">
        <img alt="map" src={map} style={{ height: '100%', width: '100%' }} />
        <Box
          alignItems="center"
          display="flex"
          height="100%"
          justifyContent="center"
          left="0"
          position="absolute"
          top="0"
          width="100%"
          zIndex="10001"
        >
          <MYLocationFilled style={{ height: 24, width: 24 }} />
        </Box>
        <Box
          bgcolor="white"
          bottom="0"
          left="0"
          padding="1.5rem"
          position="fixed"
          right="0"
          zIndex="1000"
        >
          <Button fullWidth={true} size="small" variant="outlined" onClick={handleChooseLocation}>
            <Typography color="primary" fontWeight="bold" variant="body1">
              Pilih Lokasi
            </Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
};

Gps.displayName = 'Gps';

export default Gps;
