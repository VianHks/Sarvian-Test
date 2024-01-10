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
import { OrderCommand } from '@models/order/reducers';
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
    DELIVERY_STATUS: 'Delivery Order',
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

interface OrderItem {
  billingAddress: {
    city: string
    cityArea: string
    companyName: string
    country: {
      code: string
      country: string
    }
    countryArea: string
    firstName: string
    id: string
    lastName: string
    phone: string
    postalCode: string
    streetAddress1: string
    streetAddress2: string
  }
  created: string
  id: string
  lines: [
    {
      id: string
      isShippingRequired: string
      metafields: {
        note: string
      }
      productName: string
      quantity: string
      quantityFulfilled: string
      thumbnail: {
        url: string
      }
      totalPrice: {
        gross: {
          amount: string
          currency: string
        }
        net: {
          amount: string
          currency: string
        }
      }
      unitPrice: {
        gross: {
          amount: string
          currency: string
        }
        net: {
          amount: string
          currency: string
        }
      }
    }
  ]
  number: string
  paymentStatus: string
  status: string
  total: {
    gross: {
      amount: number
      currency: string
    }
  }
  userEmail: string
}

const Order: PageComponent = () => {
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state?.order);
  const navigate = useNavigate();
  const idOrder = 'T3JkZXI6NDNmNDQ4OTYtYzhmNS00NjQ1LWJlZjgtYzNjZjE0MjI3Y2Rk';
  const theme = useTheme();
  const [tabValue, setTabValue] = useState('Diproses');
  /*
   * Const [statusFilterUnConfirmed, setStatusFilterUnConfirmed] = useState('All');
   * const [statusFilterFulfilled, setStatusFilterFulfilled] = useState('All');
   * const [statusFilterCanceled, setStatusFilterCanceled] = useState('All');
   * const [filteredDataUnConfirmed, setFilteredDataUnConfirmed] = useState<OrderItem[]>([]);
   * const [filteredDataFulfilled, setFilteredDataFulfilled] = useState<OrderItem[]>([]);
   * const [filteredDataCanceled, setFilteredDataCanceled] = useState<OrderItem[]>([]);
   */

  const handleTabChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setTabValue(newValue);
  };

  const handleLihatPesanana = (orderNumber: string) => {
    navigate(`/order-in-progress/single-order?id=${orderNumber}`);
  };
  /*
   * Const filterDataByStatus = (status: string) => {
   *   const data = store?.orderListOutput?.data || [];
   *   const filtered = data.filter((item) => item.status === status);
   */

  /*
   *   setFilteredData(filtered);
   * };
   */

  useEffect(() => {
    const param = {
      after: '',
      customer: 'Holly Acosta',
      direction: 'DESC',
      field: 'NUMBER',
      first: 100,
      paymentStatus: 'FULLY_CHARGED',
      status: 'UNCONFIRMED'
    };

    dispatch(OrderCommand.getOrderList(param, token || ''));
  }, []);
  useEffect(() => {

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
        {tabValue === 'Diproses' && store?.orderListOutput?.data.map((order) => {
          const isUnfulfilled = order.status === 'UNFULFILLED' || order.status === 'UNCONFIRMED';
          const totalAmount = order?.lines.reduce((acc, line) => {
            // Mengonversi line.totalPrice?.net.amount ke tipe number
            const lineAmount = Number(line.totalPrice?.net.amount) || 0;

            // Menambahkan harga setiap item ke akumulator
            return acc + lineAmount;
          }, 0);

          if (isUnfulfilled) {
            return (
      <Card key={order.id} sx={{ marginBottom: '1rem', padding: '1rem' }}>
        <Grid container={true} sx={{ alignItems: 'center', display: 'flex', marginBottom: '0.75rem' }}>
                <Grid item={true} sx={{ textAlign: 'start' }} xs={4}>
                  <Typography color="black" sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }} variant="caption">No. Pesanan</Typography>
                </Grid>
                <Grid item={true} sx={{ textAlign: 'center' }} xs={4}>
                  <Typography sx={{ color: 'black', fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim(), fontWeight: 'bold' }} variant="caption">#{order.number}</Typography>
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
                  <Typography color="black" fontWeight="bold" variant="body1">
                    {order?.channel.name}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'end' }}>
                  <Typography color="black" variant="caption">{order?.created ? new Date(order.created).toLocaleDateString() : ''}</Typography>
                </Box>
              </Box>
              {order?.lines?.map((obj) => {
                return (
                  <div key={obj.id}>
                    <Grid
                      container={true}
                      spacing={3}
                      sx={{ marginBottom: '0.5rem' }}
                    >
                       <Grid item={true} xs={3}>
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
                        alt={obj.productName}
                        src={obj.thumbnail.url}
                        style={{ maxHeight: '100%', maxWidth: '100%' }} />
                    </div>
                       </Grid>
                      <Grid item={true}>
                        <Typography
                          color="black"
                          fontWeight="medium"
                          sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }}
                          variant="body2"
                        >
                          {obj.productName}
                        </Typography>
                        <Typography
                          sx={{ fontFamily: theme?.typography?.fontFamily?.split(',')[1].trim() }}
                          variant="body2"
                        >
                          Rp. {Number(obj?.totalPrice?.gross?.amount || 0).toLocaleString()}
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
                          {obj.quantity} item
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ marginBottom: '0.75rem' }}>
                      <TextField
                        disabled={true}
                        fullWidth={true}
                        placeholder={obj.metafields?.note}
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
                    Rp. {totalAmount.toLocaleString()}
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
                  onClick={() => handleLihatPesanana(store?.orderDetailOutput?.data?.order?.id as unknown as string)}
                >
                  Lihat Pesanan
                </Button>
              </Box>
      </Card>
            );
          }

          return null;
        })}
          {/* {tabValue === 'Selesai' &&
            <> */}
              {/* <Card sx={{ marginBottom: '0.5rem', padding: '1rem' }}>
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
                {store?.orderDetailOutput?.data?.order?.lines?.map((obj) => {
                  return (
                    <div key={store?.orderDetailOutput?.data?.order?.lines[0].id}>
                      <Grid
                        container={true}
                        spacing={3}
                        sx={{ marginBottom: '0.5rem' }}
                      >
                        <Grid item={true} xs={3}>
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
                        alt={obj.productName}
                        src={obj.thumbnail.url}
                        style={{ maxHeight: '100%', maxWidth: '100%' }} />
                    </div>
                  </Grid>
                        <Grid item={true}>
                          <Typography
                            color="black"
                            fontWeight="medium"
                            variant="body2"
                          >
                            {obj.productName}
                          </Typography>
                          <Typography
                            variant="body2"
                          >
                            Rp. {obj.totalPrice?.gross?.amount.toLocaleString()}
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
                            {obj.quantity} item
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box sx={{ marginBottom: '0.75rem' }}>
                        <TextField
                          fullWidth={true}
                          placeholder={obj.metadata[0].value}
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
                  {store?.orderDetailOutput?.data?.order?.lines?.map((obj) => {
                    return (
                      <div key={store?.orderDetailOutput?.data?.order?.lines[0].id}>
                        <Grid
                          container={true}
                          spacing={3}
                          sx={{ marginBottom: '0.5rem' }}
                        >
                          <Grid item={true}>
                            <img alt="Foto" src={obj.thumbnail.url} />
                          </Grid>
                          <Grid item={true}>
                            <Typography
                              color="black"
                              fontWeight="medium"
                              variant="body2"
                            >
                              {obj.productName}
                            </Typography>
                            <Typography
                              variant="body2"
                            >
                              Rp. {obj.totalPrice.gross.amount.toLocaleString()}
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
                              {obj.quantity} item
                            </Typography>
                          </Grid>
                        </Grid>
                        <Box sx={{ marginBottom: '0.75rem' }}>
                          <TextField
                            fullWidth={true}
                            placeholder={obj.metadata[0].value}
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
              </Card> */}
              {tabValue === 'Selesai' && store?.orderListOutput?.data?.map((order) => {
                const isfulfilled = order.status === 'FULFILLED';

                if (isfulfilled) {
                  return (
                    <Card key={order.id} sx={{ padding: '1rem' }}>
                    <Grid container={true} sx={{ alignItems: 'center', display: 'flex', marginBottom: '0.75rem' }}>
                      <Grid item={true} sx={{ textAlign: 'start' }} xs={4}>
                        <Typography color="black" variant="caption">No. Pesanan</Typography>
                      </Grid>
                      <Grid item={true} sx={{ textAlign: 'center' }} xs={4}>
                        <Typography sx={{ color: 'black', fontWeight: 'medium' }} variant="caption">#{order?.number}</Typography>
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
                          {order?.channel.name}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'end' }}>
                        <Typography color="black" variant="caption">{order?.created ? new Date(order.created).toLocaleDateString() : ''}</Typography>
                      </Box>
                    </Box>
                    {order?.lines?.map((obj) => {
                      return (
                        <div key={obj.id}>

                          <Grid
                            container={true}
                            spacing={3}
                            sx={{ marginBottom: '0.5rem' }}
                          >
                           <Grid item={true} xs={3}>
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
                            alt={obj.productName}
                            src={obj.thumbnail.url}
                            style={{ maxHeight: '100%', maxWidth: '100%' }} />
                        </div>
                           </Grid>
                            <Grid item={true}>
                              <Typography
                                color="black"
                                fontWeight="medium"
                                variant="body2"
                              >
                                {obj.productName}
                              </Typography>
                              <Typography
                                variant="body2"
                              >
                                Rp. {obj.totalPrice.gross.amount.toLocaleString()}
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
                                {obj.quantity} item
                              </Typography>
                            </Grid>
                          </Grid>
                          <Box sx={{ marginBottom: '0.75rem' }}>
                            <TextField
                              fullWidth={true}
                              placeholder={obj.metafields.note}
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
                          Rp. {order?.lines[0].totalPrice?.net.amount?.toLocaleString()}
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
                        sx={{ flex: 1, padding: '0.5rem 1.375rem' }}
                        variant="contained"
                      >
                        Beli Lagi
                      </Button>
                    </Box>
                    </Card>
                  );
                }

                return null;
              })}
            {/* </>} */}
            {tabValue === 'Dibatalkan' && store?.orderListOutput?.data?.map((order) => {
              const isFulfilled = order?.status === 'CANCEL';

              if (isFulfilled) {
                return (
      <Card key={order.id} sx={{ padding: '1rem' }}>
        <Grid container={true} sx={{ alignItems: 'center', display: 'flex', marginBottom: '0.75rem' }}>
                <Grid item={true} sx={{ textAlign: 'start' }} xs={4}>
                  <Typography color="black" variant="caption">No. Pesanan</Typography>
                </Grid>
                <Grid item={true} sx={{ textAlign: 'center' }} xs={4}>
                  <Typography sx={{ color: 'black', fontWeight: 'medium' }} variant="caption">#{order?.number}</Typography>
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
                    {order?.channel.name}
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
              {order?.lines?.map((obj) => {
                return (
                  <div key={obj.id}>
                    <Grid
                      container={true}
                      spacing={3}
                      sx={{ marginBottom: '0.5rem' }}
                    >
                      <Grid item={true} xs={3}>
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
                        alt={obj.productName}
                        src={obj.thumbnail.url}
                        style={{ maxHeight: '100%', maxWidth: '100%' }} />
                    </div>
                      </Grid>
                      <Grid item={true}>
                        <Typography
                          color="black"
                          fontWeight="medium"
                          variant="body2"
                        >
                          {obj.productName}
                        </Typography>
                        <Typography
                          variant="body2"
                        >
                          Rp. {obj.totalPrice.gross.amount.toLocaleString()}
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
                          {obj.quantity} item
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ marginBottom: '0.75rem' }}>
                      <TextField
                        fullWidth={true}
                        placeholder={obj.metafields.note}
                        size="small"
                        variant="outlined" />
                    </Box>
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
                    Rp. {obj.totalPrice.gross.amount.toLocaleString()}
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
                  </div>
                );
              })}

      </Card>
                );
              }

              return null;
            })}
        </div>
      </Container>
    </>
  );
};

Order.displayName = 'Order';

export default Order;
