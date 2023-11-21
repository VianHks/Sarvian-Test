/* eslint-disable linebreak-style */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import { CircleFilled, StarFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';

import Bakar from '@assets/images/Bakar.png';
import MieBaso from '@assets/images/MieBaso.png';
import OrangJatnika from '@assets/images/OrangJatnika.svg';

interface StyledTabProps {
  label: string
  value: string
}
const CustomTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#002B6A'
  },
  borderBottom: '1px solid #e8e8e8'
});

const CustomTab = styled((props: StyledTabProps) => <Tab disableRipple={true} {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: '#D5ECFE',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1
    },
    '&.Mui-selected': {
      color: '#002B6A',
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:not(.Mui-selected)': {
      color: '#1D2939'
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff'
    },
    fontSize: '18px',
    lineHeight: '21px'
  })
);

const Penilaian: PageComponent = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const theme = useTheme();
  const [tabValue, setTabValue] = useState('Diproses');

  const handleTabChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setTabValue(newValue);
  };

  return (
    <Container sx={{ paddingInline: '0.5rem' }}>
      <div>
        <Card sx={{ padding: '1rem' }}>
            <Grid item={true} sx={{ textAlign: 'start' }}>
              <Typography sx={{ color: 'black', fontWeight: 'bold' }} variant="h6">
                Review
              </Typography>
            </Grid>
            <hr />
          <Grid container={true} sx={{ display: 'flex', marginTop: '1rem' }}>
            <Grid item={true} sx={{ textAlign: 'start' }} xs={4}>
              <Typography variant="caption">No. Pesanan</Typography>
            </Grid>
            <Grid item={true} sx={{ fontWeight: 'bold', textAlign: 'center' }} xs={4}>
              <Typography variant="caption">#FFDA21223</Typography>
            </Grid>
            <Grid item={true} sx={{ textAlign: 'end' }} xs={4}>
              <Typography color="primary" variant="caption">Single Order</Typography>
            </Grid>
          </Grid>
          <Grid
            container={true}
            sx={{
              alignItems: 'center',
              marginBottom: '1rem',
              marginTop: '1rem'
            }}
          >
            <Grid
              item={true}
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'start',
                marginBottom: '0.5rem'
              }}
              xs={12}
            >
              <Avatar src={OrangJatnika} sx={{ height: '24px', width: '24px' }} />
              <Typography
                sx={{ color: 'black', fontWeight: 'medium' }}
                variant="body2"
              >
                Jatnika
              </Typography>
            </Grid>
            <Grid
              item={true}
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'start',
                marginBottom: '0.5rem'
              }}
              xs="auto"
            >
            <StarFilled color="#FBD600" fontSize="medium" />
            <StarFilled color="#FBD600" fontSize="medium" />
            <StarFilled color="#FBD600" fontSize="medium" />
            <StarFilled color="#FBD600" fontSize="medium" />
            <StarFilled color="#FBD600" fontSize="medium" />
            </Grid>
            <Grid
              item={true}
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}
              xs="auto"
            >
              <Chip
                color="primary"
                label="Harga Sesuai"
                variant="outlined" />
              <Chip
                color="primary"
                label="Kemasan Bagus"
                variant="outlined" />
            </Grid>
            <Grid
              item={true}
              sx={{
                alignItems: 'center',
                marginBottom: '1rem'
              }}
              xs="auto" />
              <Typography color="black" variant="caption">
                Kurang suka sama sambelnya terlalu pedes. Ayamnya enak garing sampe ketulang-tulang
              </Typography>
          </Grid>
          <hr />
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', marginTop: '1rem' }}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'start'
              }}
            >
              <Avatar src={MieBaso} sx={{ height: '24px', width: '24px' }} />
              <Typography fontWeight="bold" variant="body1">
                Resto Bunda Gila
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'end' }}>
              <Typography variant="caption">2 Aug 2023</Typography>
            </Box>
          </Box>
          <Grid
            container={true}
            spacing={3}
            sx={{ marginBottom: '0.5rem' }}
          >
            <Grid item={true}>
              <img alt="Foto" src={Bakar} />
            </Grid>
            <Grid item={true}>
              <Typography
                fontWeight="medium"
                variant="body2"
              >
                Paket Ayam Bakar
              </Typography>
              <Typography
                variant="body2"
              >
                Rp. 25.000
              </Typography>
            </Grid>
            <Grid
              item={true}
              sx={{
                textAlign: 'end'
              }}
              xs={true}
            >
              <Typography
                fontWeight="medium"
                variant="caption"
              >
                2 item
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container={true}
            spacing={3}
            sx={{ marginBottom: '0.75rem' }}
          >
            <Grid item={true}>
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  height: '100%',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <img
                  alt="foto"
                  src={Bakar}
                  style={{ maxHeight: '100%', maxWidth: '100%' }} />
              </div>
            </Grid>
            <Grid item={true}>
              <Typography
                fontWeight="medium"
                variant="body2"
              >
                Paket Ayam Bakar
              </Typography>
              <Typography
                variant="body2"
              >
                Rp. 25.000
              </Typography>
            </Grid>
            <Grid
              item={true}
              sx={{
                textAlign: 'end'
              }}
              xs={true}
            >
              <Typography
                fontWeight="medium"
                variant="caption"
              >
                2 item
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid
            container={true}
            sx={{ marginTop: '1rem' }}
          >
            <Grid item={true}>
              <Typography
                fontWeight="Bold"
                variant="h6"
              >
                Total Pembayaran
              </Typography>
            </Grid>
            <Grid
              item={true}
              sx={{
                textAlign: 'end'
              }}
              xs={true}
            >
              <Typography
                color="primary"
                fontWeight="Bold"
                variant="h6"
              >
                Rp. 50.000
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </div>
    </Container>
  );
};

Penilaian.displayName = 'Penilaian';

export default Penilaian;
