/* eslint-disable linebreak-style */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import { CircleFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';

import Bakar from '@assets/images/Bakar.png';
import MieBaso from '@assets/images/MieBaso.png';

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

const Order: PageComponent = () => {
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
    <>
      <Box sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
        <CustomTabs
          aria-label="tabs"
          centered={true}
          indicatorColor="primary"
          scrollButtons="auto"
          textColor="primary"
          value={tabValue}
          variant="fullWidth"
          onChange={handleTabChange}
        >
          <CustomTab label="Diproses" value="Diproses" />
          <CustomTab label="Selesai" value="Selesai" />
          <CustomTab label="Dibatalkan" value="Dibatalkan" />
        </CustomTabs>
      </Box>
      <Container sx={{ paddingInline: '0.5rem' }}>
        <div>
          {tabValue === 'Diproses' &&
            <Card sx={{ padding: '1rem' }}>
              <Grid container={true} sx={{ display: 'flex' }}>
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
              <hr />
              <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
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
              <Box sx={{ marginBottom: '0.75rem' }}>
                <TextField
                  fullWidth={true}
                  placeholder="Gg. Jalanin Dulu Aja No.171"
                  size="small"
                  variant="outlined" />
              </Box>
              <Grid
                container={true}
                spacing={3}
                sx={{ marginBottom: '0.5rem' }}
              >
                <Grid item={true}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
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
              <Box>
                <TextField
                  fullWidth={true}
                  placeholder="Gg. Jalanin Dulu Aja No.171"
                  size="small"
                  variant="outlined" />
              </Box>
              <hr />
              <Grid
                container={true}
                sx={{ marginBottom: '0.75rem' }}
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
              <Box>
                <Button
                  color="primary"
                  fullWidth={true}
                  size="medium"
                  variant="contained"
                >
                  Lihat Pesanan
                </Button>
              </Box>
            </Card>}
          {tabValue === 'Selesai' &&
            <Card sx={{ padding: '1rem' }}>
              <Grid container={true} sx={{ display: 'flex' }}>
                <Grid item={true} sx={{ textAlign: 'start' }} xs={4}>
                  <Typography variant="caption">No. Pesanan</Typography>
                </Grid>
                <Grid item={true} sx={{ fontWeight: 'bold', textAlign: 'center' }} xs={4}>
                  <Typography variant="caption">#FFDA21223</Typography>
                </Grid>
                <Grid item={true} sx={{ textAlign: 'end' }} xs={4}>
                  <Typography color="primary" variant="caption">Multi-Order</Typography>
                </Grid>
              </Grid>
              <hr />
              <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
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
              <Box sx={{ marginBottom: '0.75rem' }}>
                <TextField
                  fullWidth={true}
                  placeholder="Gg. Jalanin Dulu Aja No.171"
                  size="small"
                  variant="outlined" />
              </Box>
              <Grid
                container={true}
                spacing={3}
                sx={{ marginBottom: '0.5rem' }}
              >
                <Grid item={true}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
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
              <Box>
                <TextField
                  fullWidth={true}
                  placeholder="Gg. Jalanin Dulu Aja No.171"
                  size="small"
                  variant="outlined" />
              </Box>
              <hr />
              <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
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
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'start'
                  }}
                >
                  <CircleFilled color={theme.palette.error.main} size={4} />
                  <Typography
                    color="error"
                    fontWeight="bold"
                    variant="h6"
                  >
                    Gagal
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
              <Box sx={{ marginBottom: '0.75rem' }}>
                <TextField
                  fullWidth={true}
                  placeholder="Gg. Jalanin Dulu Aja No.171"
                  size="small"
                  variant="outlined" />
              </Box>
              <Grid
                container={true}
                spacing={3}
                sx={{ marginBottom: '0.5rem' }}
              >
                <Grid item={true}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
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
              <Box>
                <TextField
                  fullWidth={true}
                  placeholder="Gg. Jalanin Dulu Aja No.171"
                  size="small"
                  variant="outlined" />
              </Box>
            </Card>}
          {tabValue === 'Dibatalkan' &&
            <> TEST 3 </>}
        </div>
      </Container>
    </>
  );
};

Order.displayName = 'Order';

export default Order;
