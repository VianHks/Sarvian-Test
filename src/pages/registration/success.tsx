import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@emotion/react';

import { Box, Card, Grid, Stack, Typography } from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import bilo_registration_success from '@assets/images/bilo_regis_success.svg';

const RegistrationSuccess: PageComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigationRecomendation = () => {
    navigate('/personalized-recomendation');
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleNavigationRecomendation();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Box
      sx={{
        alignItems: 'center',
        background: 'linear-gradient(180deg, #61A1FF 0%, #D4EBFD 99.99%, #D5ECFE 100%)',
        // BorderRadius: '0px 0px 40px 40px',
        display: 'flex',
        flexDirection: 'column',
        minheight: '140vh',
        // Height: '140vh',
        justifyContent: 'center'
      }}
    >
      <Grid
        container={true}
        sx={{
          position: 'relative'
        }}
        xs={12}
      >

          <Grid item={true} xs={12}>

            {/* TEXT */}
            <Typography
              color="white"
              // FontSize="2rem"
              fontWeight="bold"
              // MinWidth="19.5rem"
              paddingTop="10.75rem"
              textAlign="center"
              variant="h2"
            >
              Selamat Datang di
              <br />
              TokoRumahan Eats!
            </Typography>

            {/* IMAGE */}
            <Box sx={{ textAlign: 'center', paddingTop: '1.5rem' }}>
                <img
                  alt="bilo"
                  src={bilo_registration_success}
                  style={{
                    width: '19.5rem'
                  }} />
            </Box>

            <Box
              sx={{
                alignItems: 'center',
                bottom: 0,
                position: 'relative',
                top: 'auto',
                width: '100%',
                zIndex: 2
              }}
            >
              <Card
                sx={{
                  alignItems: 'center',
                  background: '#D5ECFE',
                  borderRadius: '8rem 8rem 0 0',
                  bottom: 0,
                  paddingBottom: '40vh',
                  // Mb: 0,
                  paddingX: '1.5rem',
                  width: '100%',
                  height: '100%'
                }}
              >
                  <Stack
                    display="block"
                    mt="6.375rem"
                    pb="0.5rem"
                    pt="1.5rem"
                    spacing={2} />
              </Card>
            </Box>
          </Grid>
      </Grid>

    </Box>
  );
};

RegistrationSuccess.displayName = 'RegistrationSuccess';
export default RegistrationSuccess;
