/* eslint-disable linebreak-style */
import { useEffect, useMemo, useState } from 'react';
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

import { CircleFilled, StarBorderOutlined, StarFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { orderCommand } from '@models/order/commands';
import { useStore } from '@models/store';

import Bakar from '@assets/images/Bakar.png';
import MieBaso from '@assets/images/MieBaso.png';

interface StyledTabProps {
  label: string
  value: string
}

interface OrderItemDataModel {
  COMMENT: string
  ITEM: number
  PHOTO: string
  PRICE: number
  TITLE: string
}

// eslint-disable-next-line import/exports-last
export interface OrderDataModel {
  DELIVERY_STATUS: string
  NO_ORDER: number
  ORDER_DATE: string
  ORDER_ITEM: OrderItemDataModel[]
  ORDER_STATUS: string
  RESTO_NAME: string
  SINGLE_ORDER: boolean
}

// eslint-disable-next-line import/exports-last
export const DUMMY_ORDER = [
  {
    DELIVERY_STATUS: 'Pickup',
    NO_ORDER: 1,
    ORDER_DATE: '2 Aug 2023',
    ORDER_ITEM: [
      {
        COMMENT: 'Gg. Jalanin Dulu Aja No.171',
        ITEM: 2,
        PHOTO: `${Bakar}`,
        PRICE: 25000,
        TITLE: 'Paket Ayam Bakar'
      },
      {
        COMMENT: 'Gg. Jalanin Dulu Aja No.1711',
        ITEM: 2,
        PHOTO: `${Bakar}`,
        PRICE: 27000,
        TITLE: 'Paket Ayam Bakar2'
      }
    ],
    ORDER_STATUS: 'Diproses',
    RESTO_NAME: 'Resto Bunda Gila',
    SINGLE_ORDER: false
  },
  {
    DELIVERY_STATUS: 'Delivery Order',
    NO_ORDER: 2,
    ORDER_DATE: '2 Aug 2023',
    ORDER_ITEM: [
      {
        COMMENT: 'Gg. Jalan jalan hati ku senang.172',
        ITEM: 2,
        PHOTO: `${Bakar}`,
        PRICE: 25000,
        TITLE: 'Paket Ayam Bakar'
      },
      {
        COMMENT: 'Gg. Jalan jalan hati ku senang.172',
        ITEM: 2,
        PHOTO: `${Bakar}`,
        PRICE: 27000,
        TITLE: 'Paket Ayam Bakar2'
      }
    ],
    ORDER_STATUS: 'Diproses',
    RESTO_NAME: 'Resto Bunda Gila',
    SINGLE_ORDER: true
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
    color: '#D5ECFE',
    marginRight: theme.spacing(1),
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
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state?.order);
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState('Diproses');

  const handleTabChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setTabValue(newValue);
  };

  const handleLihatPesanana = (orderNumber: string) => {
    navigate(`/order-in-progress/single-order?id=${orderNumber}`);
  };

  useEffect(() => {
    if (token) {
      dispatch(orderCommand.orderLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });

      return () => {
        dispatch(orderCommand.orderClear());
      };
    }
  }, []);

  // Console.log('cekstore', store);

  return (
    <>
      <Box sx={{ backgroundColor: 'white', marginBottom: '1rem' }}>
        <Box sx={{ padding: '2.5rem 1.75rem 1rem 1.75rem' }}>
          <Typography color="black" sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[0].trim(), fontWeight: 'bold' }} variant="h4">
            Pesanan
          </Typography>
        </Box>
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
          <CustomTab label="Diproses" sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }} value="Diproses" />
          <CustomTab label="Selesai" sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }} value="Selesai" />
          <CustomTab label="Dibatalkan" sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }} value="Dibatalkan" />
        </CustomTabs>
      </Box>
      <Container sx={{ padding: '0rem 1.6rem 0rem 1.6rem' }}>
        <div>
          {tabValue === 'Diproses' && store?.orderOutput?.map((order) => (

            <Card key={order.NO_ORDER} sx={{ marginBottom: '1rem', padding: '1rem' }}>
              <Grid container={true} sx={{ alignItems: 'center', display: 'flex', marginBottom: '0.75rem' }}>
                <Grid item={true} sx={{ textAlign: 'start' }} xs={4}>
                  <Typography color="black" sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }} variant="caption">No. Pesanan</Typography>
                </Grid>
                <Grid item={true} sx={{ textAlign: 'center' }} xs={4}>
                  <Typography sx={{ color: 'black', fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim(), fontWeight: 'bold' }} variant="caption">#FFDA21223</Typography>
                </Grid>
                <Grid item={true} sx={{ alignItems: 'end', textAlign: 'end', width: 'fit-content' }} xs={4}>
                  <Typography color="primary" sx={{ backgroundColor: '#E4F3FF', borderRadius: '4px', fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim(), padding: '0.25rem 0.5rem' }} variant="caption">
                    Single Order
                  </Typography>
                </Grid>
              </Grid>
              <hr style={{ opacity: '0.2' }} />
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
                  <Typography color="black" fontWeight="bold" sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }} variant="body1">
                    Resto Bunda Gila
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'end' }}>
                  <Typography color="black" sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }} variant="caption">2 Aug 2023</Typography>
                </Box>
              </Box>
              {order.ORDER_ITEM.map((obj) => {
                return (
                  <div key={obj.TITLE}>
                    <Grid
                      container={true}
                      spacing={3}
                      sx={{ marginBottom: '0.5rem' }}
                    >
                      <Grid item={true}>
                        <img alt="Foto" src={obj.PHOTO} />
                      </Grid>
                      <Grid item={true}>
                        <Typography
                          color="black"
                          fontWeight="medium"
                          sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }}
                          variant="body2"
                        >
                          {obj.TITLE}
                        </Typography>
                        <Typography
                          sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }}
                          variant="body2"
                        >
                          Rp. {obj.PRICE.toLocaleString('id-ID')}
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
                          sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }}
                          variant="caption"
                        >
                          {obj.ITEM} item
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ marginBottom: '0.75rem' }}>
                      <TextField
                        disabled={true}
                        fullWidth={true}
                        placeholder={obj.COMMENT}
                        size="small"
                        variant="outlined" />
                    </Box>
                  </div>
                );
              })}
              <hr style={{ borderTop: 'dotted 1px', opacity: '0.1' }} />
              <Grid
                container={true}
                sx={{ marginBottom: '0.75rem' }}
              >
                <Grid item={true}>
                  <Typography
                    color="black"
                    fontWeight="Bold"
                    sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[0].trim() }}
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
                    sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[0].trim() }}
                    variant="h6"
                  >
                    Rp. 33333333
                  </Typography>
                </Grid>
              </Grid>
              <Box>
                <Button
                  color="primary"
                  fullWidth={true}
                  size="medium"
                  sx={{ padding: '0.6rem' }}
                  variant="contained"
                  onClick={() => handleLihatPesanana(order.NO_ORDER as unknown as string)}
                >
                  Lihat Pesanan
                </Button>
              </Box>
            </Card>
          ))}
          {tabValue === 'Selesai' &&
            <>
              <Card sx={{ marginBottom: '0.5rem', padding: '1rem' }}>
                <Grid container={true} sx={{ alignItems: 'center', display: 'flex', marginBottom: '0.75rem' }}>
                  <Grid item={true} sx={{ textAlign: 'start' }} xs={4}>
                    <Typography color="black" variant="caption">No. Pesanan</Typography>
                  </Grid>
                  <Grid item={true} sx={{ textAlign: 'center' }} xs={4}>
                    <Typography sx={{ color: 'black', fontWeight: 'medium' }} variant="caption">#FFDA21223</Typography>
                  </Grid>
                  <Grid item={true} sx={{ alignItems: 'end', textAlign: 'end', width: 'fit-content' }} xs={4}>
                    <Typography color="primary" sx={{ backgroundColor: '#E4F3FF', borderRadius: '4px', padding: '0.25rem 0.5rem' }} variant="caption">
                      Multi-Order
                    </Typography>
                  </Grid>
                </Grid>
                <hr style={{ opacity: '0.2' }} />
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
                    <Typography color="black" fontWeight="bold" variant="body1">
                      Resto Bunda Gila
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'end' }}>
                    <Typography color="black" variant="caption">2 Aug 2023</Typography>
                  </Box>
                </Box>
                {store?.orderOutput?.[0].ORDER_ITEM.map((obj) => {
                  return (
                    <div key={obj.TITLE}>
                      <Grid
                        container={true}
                        spacing={3}
                        sx={{ marginBottom: '0.5rem' }}
                      >
                        <Grid item={true}>
                          <img alt="Foto" src={obj.PHOTO} />
                        </Grid>
                        <Grid item={true}>
                          <Typography
                            color="black"
                            fontWeight="medium"
                            variant="body2"
                          >
                            {obj.TITLE}
                          </Typography>
                          <Typography
                            variant="body2"
                          >
                            Rp. {obj.PRICE.toLocaleString('id-ID')}
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
                            {obj.ITEM} item
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box sx={{ marginBottom: '0.75rem' }}>
                        <TextField
                          fullWidth={true}
                          placeholder={obj.COMMENT}
                          size="small"
                          variant="outlined" />
                      </Box>
                    </div>
                  );
                })}
                <hr style={{ opacity: '0.2' }} />
                <div style={{ opacity: '0.4' }}>
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
                      <Typography color="black" fontWeight="bold" variant="body1">
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
                      <Typography color="black" variant="caption">2 Aug 2023</Typography>
                    </Box>
                  </Box>
                  {store?.orderOutput?.[0].ORDER_ITEM.map((obj) => {
                    return (
                      <div key={obj.TITLE}>
                        <Grid
                          container={true}
                          spacing={3}
                          sx={{ marginBottom: '0.5rem' }}
                        >
                          <Grid item={true}>
                            <img alt="Foto" src={obj.PHOTO} />
                          </Grid>
                          <Grid item={true}>
                            <Typography
                              color="black"
                              fontWeight="medium"
                              variant="body2"
                            >
                              {obj.TITLE}
                            </Typography>
                            <Typography
                              variant="body2"
                            >
                              Rp. {obj.PRICE.toLocaleString('id-ID')}
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
                              {obj.ITEM} item
                            </Typography>
                          </Grid>
                        </Grid>
                        <Box sx={{ marginBottom: '0.75rem' }}>
                          <TextField
                            fullWidth={true}
                            placeholder={obj.COMMENT}
                            size="small"
                            variant="outlined" />
                        </Box>
                      </div>
                    );
                  })}
                </div>
                <hr style={{ borderTop: 'dotted 1px', opacity: '0.1' }} />
                <Grid
                  container={true}
                  sx={{ marginBottom: '0.75rem' }}
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
                      Rp. 2222222
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container={true}
                  sx={{ marginBottom: '0.75rem' }}
                >
                  <Grid item={true}>
                    <Typography
                      color="black"
                      fontWeight="Bold"
                      variant="h6"
                    >
                      Total Refund
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
                      Rp. 10.000
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container={true}
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                  }}
                >
                  <Grid item={true}>
                    <Typography
                      color="black"
                      fontWeight="Bold"
                      variant="h6"
                    >
                      Rating Driver
                    </Typography>
                  </Grid>
                  <Grid
                    item={true}
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                    xs={true}
                  >
                    <StarFilled color="#FBD600" fontSize="medium" />
                    <StarFilled color="#FBD600" fontSize="medium" />
                    <StarFilled color="#FBD600" fontSize="medium" />
                    <StarFilled color="#FBD600" fontSize="medium" />
                    <StarFilled color="#FBD600" fontSize="medium" />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: '0.7rem',
                    width: '100%'
                  }}
                >
                  <Button
                    color="primary"
                    endIcon={false}
                    size="medium"
                    startIcon={false}
                    sx={{ flex: 1, padding: '0.5rem' }}
                    variant="outlined"
                  >
                    Lihat Penilaian
                  </Button>
                  <Button
                    color="primary"
                    endIcon={false}
                    size="medium"
                    startIcon={false}
                    sx={{ flex: 1, padding: '0.5rem' }}
                    variant="contained"
                  >
                    Beli Lagi
                  </Button>
                </Box>
              </Card>
              <Card sx={{ padding: '1rem' }}>
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
                <hr style={{ opacity: '0.2' }} />
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
                    <Typography color="black" fontWeight="bold" variant="body1">
                      Resto Bunda Gila
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'end' }}>
                    <Typography color="black" variant="caption">2 Aug 2023</Typography>
                  </Box>
                </Box>
                {store?.orderOutput?.[0].ORDER_ITEM.map((obj) => {
                  return (
                    <div key={obj.TITLE}>

                      <Grid
                        container={true}
                        spacing={3}
                        sx={{ marginBottom: '0.5rem' }}
                      >
                        <Grid item={true}>
                          <img alt="Foto" src={obj.PHOTO} />
                        </Grid>
                        <Grid item={true}>
                          <Typography
                            color="black"
                            fontWeight="medium"
                            variant="body2"
                          >
                            {obj.TITLE}
                          </Typography>
                          <Typography
                            variant="body2"
                          >
                            Rp. {obj.PRICE.toLocaleString('id-ID')}
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
                            {obj.ITEM} item
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box sx={{ marginBottom: '0.75rem' }}>
                        <TextField
                          fullWidth={true}
                          placeholder={obj.COMMENT}
                          size="small"
                          variant="outlined" />
                      </Box>
                    </div>
                  );
                })}
                <hr style={{ borderTop: 'dotted 1px', opacity: '0.1' }} />
                <Grid
                  container={true}
                  sx={{ marginBottom: '0.75rem' }}
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
                      Rp. 111111
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container={true}
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                  }}
                >
                  <Grid item={true}>
                    <Typography
                      color="black"
                      fontWeight="Bold"
                      variant="h6"
                    >
                      Rating Driver
                    </Typography>
                  </Grid>
                  <Grid
                    item={true}
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                    xs={true}
                  >
                    <StarBorderOutlined fontSize="medium" />
                    <StarBorderOutlined fontSize="medium" />
                    <StarBorderOutlined fontSize="medium" />
                    <StarBorderOutlined fontSize="medium" />
                    <StarBorderOutlined fontSize="medium" />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: '0.7rem',
                    width: '100%'
                  }}
                >
                  <Button
                    color="primary"
                    endIcon={false}
                    size="medium"
                    startIcon={false}
                    sx={{ flex: 1, padding: '0.5rem' }}
                    variant="outlined"
                  >
                    Lihat Penilaian
                  </Button>
                  <Button
                    color="primary"
                    endIcon={false}
                    size="medium"
                    startIcon={false}
                    sx={{ flex: 1, padding: '0.5rem' }}
                    variant="contained"
                  >
                    Beli Lagi
                  </Button>
                </Box>
              </Card>
            </>}
          {tabValue === 'Dibatalkan' &&
            <Card sx={{ padding: '1rem' }}>
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
              <hr style={{ opacity: '0.2' }} />
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
                  <Typography color="black" fontWeight="bold" variant="body1">
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
                  <Typography color="black" variant="caption">2 Aug 2023</Typography>
                </Box>
              </Box>
              {store?.orderOutput?.[0].ORDER_ITEM.map((obj) => {
                return (
                  <div key={obj.TITLE}>
                    <Grid
                      container={true}
                      spacing={3}
                      sx={{ marginBottom: '0.5rem' }}
                    >
                      <Grid item={true}>
                        <img alt="Foto" src={obj.PHOTO} />
                      </Grid>
                      <Grid item={true}>
                        <Typography
                          color="black"
                          fontWeight="medium"
                          variant="body2"
                        >
                          {obj.TITLE}
                        </Typography>
                        <Typography
                          variant="body2"
                        >
                          Rp. {obj.PRICE.toLocaleString('id-ID')}
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
                          {obj.ITEM} item
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ marginBottom: '0.75rem' }}>
                      <TextField
                        fullWidth={true}
                        placeholder={obj.COMMENT}
                        size="small"
                        variant="outlined" />
                    </Box>
                  </div>
                );
              })}
              <hr style={{ borderTop: 'dotted 1px', opacity: '0.1' }} />
              <Grid
                container={true}
                sx={{ marginBottom: '0.75rem' }}
              >
                <Grid item={true}>
                  <Typography
                    color="black"
                    fontWeight="Bold"
                    variant="h6"
                  >
                    Total Refund
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
                    Rp. 0000
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
                  Beli Lagi
                </Button>
              </Box>
            </Card>}
        </div>
      </Container>
    </>
  );
};

Order.displayName = 'Order';

export default Order;
