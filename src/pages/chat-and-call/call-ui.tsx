/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable linebreak-style */
import type { ChangeEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
  Box,

  Button,

  Grid,

  Typography,
  useTheme
} from '@mui/material';

import FavLogo from '@assets/images/FavLogo.svg';
import TelponLogo from '@assets/images/FotoTelpon.svg';

const CallUI: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingInline: '0.5rem'
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              borderRadius: '4px',
              marginY: '1rem',
              padding: '0.25rem 0.5rem',
              width: 'fit-content'
            }}
          >
            <Typography
              color="black"
              sx={{ textAlign: 'center' }}
              variant="h3"
            >
              Resto Sunda Gila
            </Typography>
          </Box>

        </div>
      </Box>
    <Grid
      container={true}
      spacing={2}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}
    >
                <Grid item={true} sx={{ display: 'flex', justifyContent: 'end' }} xs={4}>
                <img
                  alt="Profile"
                  src={FavLogo}
                  style={{
                        height: 'auto',
                        paddingLeft: '0rem !important',
                        width: '20%'
                      }} />

                </Grid>

                <Grid item={true} sx={{ display: 'flex', justifyContent: 'start' }} xs={8}>
                  <Typography
                    color="#D0D5DD"
                    fontWeight="medium"
                    variant="h5"
                  >
                      TokoRumahan
                  </Typography>
                </Grid>
    </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }} xs={12}>
          <Typography
            color="#D0D5DD"
            fontWeight="medium"
            variant="h5"
          >
              Calling...
          </Typography>
        </Grid>

        <Grid sx={{ display: 'flex', justifyContent: 'center', marginBottom: '5rem' }} xs={12}>
              <img
                alt="Foto"
                src={TelponLogo}
                style={{
                  height: 'auto',
                        paddingLeft: '0rem !important',
                        width: '50%'
                      }} />
        </Grid>
        <Grid
          container={true}
          spacing={3}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}
        >
            <Grid item={true} sx={{ display: 'flex', justifyContent: 'end' }} xs={4}>
            <Button
              color="primary"
              sx={{

              borderRadius: '50%',
              width: '60px',
              height: '60px'

            }}
              variant="contained" />
            </Grid>
            <Grid item={true} sx={{ display: 'flex', justifyContent: 'center' }} xs={4}>
            <Button
              color="primary"
              sx={{

              borderRadius: '50%',
              width: '60px',
              height: '60px'

            }}
              variant="contained" />
            </Grid>
            <Grid item={true} sx={{ display: 'flex', justifyContent: 'start' }} xs={4}>
            <Button
              color="primary"
              sx={{

              borderRadius: '50%',
              width: '60px',
              height: '60px'

            }}
              variant="contained" />
            </Grid>
        </Grid>
    </Box>
  );
};

CallUI.displayName = 'CallUI';
export default CallUI;
