/* eslint-disable linebreak-style */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Grid,
  styled,
  Tab,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';

import { CircleFilled, StarBorderOutlined, StarFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';

import Bakar from '@assets/images/Bakar.png';
import MieBaso from '@assets/images/MieBaso.png';
import OrangJatnika from '@assets/images/OrangJatnika.svg';

interface StyledTabProps {
  label: string
  value: string
}

interface OrderDataModel {
  foto: string
  item: number
  price: number
  title: string
}

const DATA_ORDER_DUMMY: OrderDataModel[] = [
  {
    foto: `${Bakar}`,
    item: 2,
    price: 25000,
    title: 'Paket Ayam Bakar'
  },
  {
    foto: `${Bakar}`,
    item: 2,
    price: 27000,
    title: 'Paket Ayam Bakar2'
  }
];

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

  const totalPrice = DATA_ORDER_DUMMY.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );

  return (
    <Container sx={{ paddingInline: '0.5rem' }}>
      <div>
        <Card sx={{ padding: '1rem' }}>
          <Grid item={true} sx={{ textAlign: 'start' }}>
            <Typography sx={{ color: 'black', fontWeight: 'bold' }} variant="h6">
              Review
            </Typography>
          </Grid>
          <hr style={{ opacity: '0.2' }} />
          <Grid container={true} sx={{ alignItems: 'center', display: 'flex', marginBottom: '0.75rem' }}>
            <Grid item={true} sx={{ textAlign: 'start' }} xs={4}>
              <Typography color="black" variant="caption">No. Pesanan</Typography>
            </Grid>
            <Grid item={true} sx={{ textAlign: 'center' }} xs={4}>
              <Typography sx={{ color: 'black', fontWeight: 'medium' }} variant="caption">#FFDA21223</Typography>
            </Grid>
            <Grid item={true} sx={{ alignItems: 'end', textAlign: 'end', width: 'fit-content' }} xs={4}>
              <Typography color="primary" sx={{ backgroundColor: '#E4F3FF', borderRadius: '4px', padding: '0.25rem 0.5rem' }} variant="caption">
                Single Order
              </Typography>
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
              <StarBorderOutlined fontSize="medium" />
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
          <hr style={{ opacity: '0.2' }} />
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
              <Typography color="black" fontWeight="bold" variant="body1">
                Resto Bunda Gila
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'end' }}>
              <Typography color="black" variant="caption">2 Aug 2023</Typography>
            </Box>
          </Box>
          {DATA_ORDER_DUMMY.map((obj) => {
            return (
              <div key={obj.title}>
                <Grid
                  container={true}
                  spacing={3}
                  sx={{ marginBottom: '0.5rem' }}
                >
                  <Grid item={true}>
                    <img alt="Foto" src={obj.foto} />
                  </Grid>
                  <Grid item={true}>
                    <Typography
                      color="black"
                      fontWeight="medium"
                      variant="body2"
                    >
                      {obj.title}
                    </Typography>
                    <Typography
                      variant="body2"
                    >
                      Rp. {obj.price.toLocaleString('id-ID')}
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
                      color="black"
                      fontWeight="medium"
                      variant="caption"
                    >
                      {obj.item} item
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            );
          })}
          <hr style={{ borderTop: 'dotted 1px', opacity: '0.1' }} />
          <Grid
            container={true}
            sx={{ marginTop: '1rem' }}
          >
            <Grid item={true}>
              <Typography
                color="black"
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
                Rp. {totalPrice.toLocaleString('id-ID')}
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
