/* eslint-disable linebreak-style */
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Container,
  useTheme
} from '@mui/material';

import { ChevronRight, GeoFill } from '@nxweb/icons/bootstrap';
import { Mail } from '@nxweb/icons/ionicons';
import { PhoneFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { Card, Grid, Typography } from '@components/material.js';
import { useAuth } from '@hooks/use-auth';
import { FAQCommand } from '@models/faq/commands';
import { useStore } from '@models/store';

import WA from '@assets/images/logo_wa.svg';

const PusatBantuan: PageComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state?.faq?.FAQOutput);

  useEffect(() => {
    if (token) {
      dispatch(
        FAQCommand.FAQLoad(token)
      )
        .catch((err: unknown) => {
          console.error(err);
        });

      return () => {
        dispatch(FAQCommand.FAQClear());
      };
    }
  }, []);

  console.log('STORE', store)

  return (
    <>
      <Container
        sx={{
          alignItems: 'center',
          backgroundColor: '#E4F3FF',
          display: 'flex',
          height: '11rem',
          position: 'relative'
        }}
      >
        <Box>
          <Typography color="primary" variant="h4">
            Mengalami kesulitan?
            <br />
            Kami hadir untuk membantu anda
          </Typography>
        </Box>
      </Container>

      <Container sx={{ marginTop: '-3rem', paddingInline: '1.5rem', position: 'relative', zIndex: '1' }}>
        <Card sx={{ padding: '1rem' }}>
          <Grid
            container={true}
            spacing={2}
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Grid
              item={true}
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'start'
              }}
              xs={10}
            >
              <img alt="icon" src={WA} />
              <Typography
                sx={{ fontWeight: 'bold', textAlign: 'start' }}
                variant="h5"
              >
                Hubungi CS Kami
              </Typography>
            </Grid>
            <Grid
              item={true}
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'end'
              }}
              xs="auto"
            >
              <ChevronRight size={16} />
            </Grid>
          </Grid>
        </Card>
        <Typography
          sx={{
            fontWeight: 'bold',
            marginBottom: '0.75rem',
            marginTop: '1rem',
            textAlign: 'start'
          }}
          variant="h5"
        >
          FAQ
        </Typography>
        <Card sx={{ padding: '1rem', marginBottom: '1.5rem' }}>
          {store?.map((obj, index) => {
            return (
              <div key={obj.id}>
                <Grid
                  container={true}
                  spacing={2}
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Grid item={true} xs={10}>
                    <Typography
                      color="primary"
                      sx={{ fontWeight: 'bold', textAlign: 'start' }}
                      variant="body2"
                    >
                      {obj.title}
                    </Typography>
                  </Grid>
                  <Grid
                    item={true}
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'end'
                    }}
                    xs="auto"
                  >
                    <ChevronRight size={16} />
                  </Grid>
                </Grid>
                {index !== store.length - 1 && <hr />}
              </div>
            );
          })}
        </Card>
      </Container>
      <Container sx={{ bottom: 0, paddingInline: '1.5rem', position: 'fixed' }}>
        <Box sx={{ alignItems: 'center', display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <PhoneFilled color="#1050AE" size={24} />
          <Typography
            sx={{ fontWeight: 'bold', textAlign: 'start' }}
            variant="h5"
          >
            +0813-2127-9873
          </Typography>
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <Mail color="#1050AE" size={24} />
          <Typography
            sx={{
              fontWeight: 'bold',
              textAlign: 'start'
            }}
            variant="h5"
          >
            Finfo@tokorumahan.com
          </Typography>
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <GeoFill color="#1050AE" size={24} />
          <Typography
            sx={{
              fontWeight: 'bold',
              textAlign: 'start'
            }}
            variant="h5"
          >
            PT Tokorumahan Indonesia
            <br />
            Jl. Hegarmanah no. 15
          </Typography>
        </Box>
      </Container>
    </>
  );
};

PusatBantuan.displayName = 'PusatBantuan';
PusatBantuan.layout = 'appbar';

export default PusatBantuan;
