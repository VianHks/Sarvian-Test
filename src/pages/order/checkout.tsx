import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Global } from '@emotion/react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  Snackbar,
  styled,
  SwipeableDrawer,
  TextField,
  useTheme
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';

import {
  AddBoxFilled,
  ChevronRightFilled,
  IndeterminateCheckBoxFilled,
  KeyboardArrowDownFilled,
  MYLocationFilled
} from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { Card, CardContent, Grid, Typography } from '@components/material.js';
import { useAuth } from '@hooks/use-auth';
import { OrderCommand } from '@models/order/reducers';
import { useCommand, useStore } from '@models/store';

import DineIn from '@assets/images/DineIn.svg';
import MieBaso from '@assets/images/MieBaso.png';
import PickUp from '@assets/images/PickUp.svg';
import LogoBilo from '@assets/images/logoBiloCheckout.svg';

import type { Dayjs } from 'dayjs';

const style = {
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  left: '50%',
  p: 4,
  position: 'absolute' as const,
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300
};

const drawerBleeding = 120;

interface Props {
  readonly windowProps?: () => Window
}

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800]
}));

const Puller = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  height: 6,
  left: 'calc(50% - 30px)',
  position: 'absolute',
  top: 17,
  width: 50
}));

const DeliveryType = [
  // { text: 'Pesan Antar', icon: `${PesanAntar}`, value: 'delivery' },
  { icon: `${PickUp}`, text: 'Pick Up', value: 'pickUp' },
  { icon: `${DineIn}`, text: 'Dine In', value: 'dineIn' }
];

/*
 * Const Delivery = [
 *   { text: 'SiJago', icon: `${Bike}`, value: 'siJago' },
 *   { text: 'SiJabat', icon: `${Bike}`, value: 'siJabat' }
 * ];
 */

interface ChekoutDetailDataModel {
  channel: {
    id: string
    metadata: {
      key: string
      value: string
    }[]
    name: string
  }
  created: string
  id: string
  lines: {
    id: string
    metadata: {
      key: string
      value: string
    }[]
    metafields: {
      note: string
    }
    quantity: number
    totalPrice: {
      gross: {
        amount: number
        currency: string
      }
    }
    variant: {
      id: string
      name: string
      pricing: {
        price: {
          gross: {
            amount: number
            currency: string
          }
        }
      }
      product: {
        id: string
        name: string
        slug: string
        thumbnail: {
          alt: string
          url: string
        }
      }
    }
  }[]
  totalPrice: {
    gross: {
      amount: number
      currency: string
    }
  }
  user: {
    addresses: {
      city: string
      countryArea: string
      id: string
      postalCode: string
      streetAddress1: string
    }[]
    firstName: string
    id: string
    lastName: string
  }
}

const DEFAULT_CHECKOUT_DETAILS: ChekoutDetailDataModel = {
  channel: {
    id: '',
    metadata: [
      {
        key: '',
        value: ''
      }
    ],
    name: ''
  },
  created: '',
  id: '',
  lines: [
    {
      id: '',
      metadata: [
        {
          key: '',
          value: ''
        }
      ],
      metafields: {
        note: ''
      },
      quantity: 0,
      totalPrice: {
        gross: {
          amount: 0,
          currency: ''
        }
      },
      variant: {
        id: '',
        name: '',
        pricing: {
          price: {
            gross: {
              amount: 0,
              currency: ''
            }
          }
        },
        product: {
          id: '',
          name: '',
          slug: '',
          thumbnail: {
            alt: '',
            url: ''
          }
        }
      }
    }
  ],
  totalPrice: {
    gross: {
      amount: 0,
      currency: ''
    }
  },
  user: {
    addresses: [
      {
        city: '',
        countryArea: '',
        id: '',
        postalCode: '',
        streetAddress1: ''
      }
    ],
    firstName: '',
    id: '',
    lastName: ''
  }
};

interface FormOrderDataModel {
  buyerName: string
  channel: string
  checkoutId: string
  estimation: Dayjs
  note: string
  orderType: string
  transactionReference: string
}

const DEFAULT_FORM_ORDER: FormOrderDataModel = {
  buyerName: '',
  channel: '',
  checkoutId: '',
  estimation: dayjs(),
  note: '',
  orderType: 'dineIn',
  transactionReference: ''
};

const SESSION_STORAGE_CHECKOUT = 'CheckoutId';
const SESSION_STORAGE_ORDER = 'orderId';

const Checkout: PageComponent = (props: Props) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const theme = useTheme();
  const { windowProps } = props;
  const checkoutIdFromStorage = window.sessionStorage.getItem(SESSION_STORAGE_CHECKOUT) ?? '';
  const command = useCommand((cmd) => cmd);

  const [store, dispatch] = useStore((state) => state?.order);
  const [checkoutDetails, setCheckoutDetails] = useState<ChekoutDetailDataModel>(DEFAULT_CHECKOUT_DETAILS);
  const [formOrder, setFormOrder] = useState<FormOrderDataModel>(DEFAULT_FORM_ORDER);
  const [total, setTotal] = useState(0);

  const [isLoad, setIsLoad] = useState(false);
  const [alert, setAlert] = useState(false);

  const [open, setOpen] = useState(false),
    [openTime, setOpenTime] = useState(false),
    [openModal, setOpenModal] = useState(false),
    [openChangeResto, setOpenChangeResto] = useState(false);

  const container =
    windowProps !== undefined ? () => windowProps().document.body : undefined;

  const calculateTotal = () => {
    const newTotal = checkoutDetails.lines.reduce((acc, line) => {
      const lineTotal = line.quantity * line.variant.pricing.price.gross.amount;

      return acc + lineTotal;
    }, 0);

    setTotal(newTotal);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const toggleDrawerTime = (newOpen: boolean) => () => {
    setOpenTime(newOpen);
  };

  const toggleOpenModalCheckout = () => {
    setOpenModal(!openModal);
  };

  const toggleOpenChangeResto = () => {
    setOpenChangeResto(!openChangeResto);
  };

  const handleIncrement = (index: number) => {
    const updatedCheckout = { ...checkoutDetails };
    const updatedLines = [...updatedCheckout.lines];
    const updatedLine = { ...updatedLines[index] };

    updatedLine.quantity += 1;
    updatedLines[index] = updatedLine;
    updatedCheckout.lines = updatedLines;

    setCheckoutDetails(updatedCheckout);
  };

  const handleDecrement = (index: number) => {
    const updatedCheckout = { ...checkoutDetails };
    const updatedLines = [...updatedCheckout.lines];
    const updatedLine = { ...updatedLines[index] };

    if (updatedLine.quantity > 0) {
      updatedLine.quantity -= 1;
      updatedLines[index] = updatedLine;
      updatedCheckout.lines = updatedLines;

      setCheckoutDetails(updatedCheckout);
    }
  };

  const handleNoteChange = (index: number, newValue: string) => {
    const updatedCheckout = { ...checkoutDetails };
    const updatedLines = [...updatedCheckout.lines];
    const updatedLine = { ...updatedLines[index] };

    updatedLine.metafields.note = newValue;
    updatedLines[index] = updatedLine;
    updatedCheckout.lines = updatedLines;

    setCheckoutDetails(updatedCheckout);
  };

  const handleOrderType = (item: string) => {
    setFormOrder({ ...formOrder, orderType: item });
    setOpen(false);
  };

  const handleTimeChange = (newTime: Dayjs | null) => {
    if (newTime !== null) {
      setFormOrder({ ...formOrder, estimation: newTime });
    }
  };

  const handlePilihButtonClick = () => {
    setOpenTime(false);
  };

  const handleConfirmChangeResto = () => {
    setOpenChangeResto(!openChangeResto);
    OrderCommand.postCheckoutCustomerDetach(
      { checkoutId: checkoutIdFromStorage },
      token || ''
    ).then(() => {
      window.sessionStorage.removeItem(SESSION_STORAGE_CHECKOUT);
      navigate('/beranda');
    });
  };

  const handleConfirmOrder = () => {
    setOpenModal(!openModal);
    setIsLoad(true);
    const payloadOrder = {
      buyerName: `${checkoutDetails?.user?.firstName} ${checkoutDetails?.user?.lastName}`,
      channel: 'makan',
      checkoutId: checkoutIdFromStorage,
      customerId: 'tokrum:b5bbc271-1cc2-4cc9-9b07-8f0dd92966e1',
      estimation: formOrder.estimation.format('HH:mm'),
      note: formOrder.note,
      orderType: formOrder.orderType,
      transactionReference: ''
    };
    if (store?.checkoutDetails?.data?.checkout !== checkoutDetails) {
      const payload = {
        checkoutId: checkoutIdFromStorage,
        lines: checkoutDetails?.lines.map((item) => ({
          lineId: item?.id,
          note: item?.metafields?.note,
          price: item?.variant?.pricing?.price?.gross?.amount.toString(),
          quantity: item?.quantity
        }))
      };

      command.productView.putCheckout(payload, token || '')
        .then((resp) => {
          if (resp !== 'err') {
            OrderCommand.postCreateOrder(payloadOrder, token || '').then(
              (res) => {
                window?.sessionStorage?.removeItem(SESSION_STORAGE_CHECKOUT);
                window?.sessionStorage?.setItem(SESSION_STORAGE_ORDER, JSON.stringify(res));
                navigate(`/order-in-progress/single-order?orderId=${res}`);
                setIsLoad(false);
              }
            );
          } else {
            setIsLoad(false);
            setAlert(true);
          }
        });
    } else {
      OrderCommand.postCreateOrder(payloadOrder, token || '').then((res) => {
        if (res !== 'err') {
          window?.sessionStorage?.removeItem(SESSION_STORAGE_CHECKOUT);
          window?.sessionStorage?.setItem(SESSION_STORAGE_ORDER, JSON.stringify(res));
          navigate(`/order-in-progress/single-order?orderId=${res}`);
          setIsLoad(false);
        } else {
          setIsLoad(false);
          setAlert(true);
        }
      });
    }
  };

  useEffect(() => {
    if (checkoutIdFromStorage) {
      dispatch(OrderCommand.getCheckoutDetails(checkoutIdFromStorage || '', token || ''));
    }
  }, [dispatch, token, checkoutIdFromStorage]);

  useEffect(() => {
    if (store?.checkoutDetails) {
      setCheckoutDetails(store?.checkoutDetails?.data?.checkout);

      setTotal(
        store?.checkoutDetails?.data?.checkout?.totalPrice?.gross?.amount
      );
    }
  }, [store?.checkoutDetails]);

  useEffect(() => {
    calculateTotal();
  }, [checkoutDetails]);

  return (
    <Container>
      <Snackbar autoHideDuration={3000} open={alert} sx={{ left: 'auto', position: 'relative', right: 'auto' }}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={() => setAlert(false)}>
          Gagal Membuat Order
        </Alert>
      </Snackbar>
      {checkoutIdFromStorage
        ? (
        <>
          <Typography
            sx={{
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              textAlign: 'start'
            }}
            variant="h5"
          >
            Alamat Resto:
          </Typography>
          <Grid container={true} spacing={2} sx={{ marginBottom: '1rem' }}>
            <Grid
              item={true}
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}
              xs={2}
            >
              <Avatar sx={{ backgroundColor: '#BDD7FF' }}>
                <MYLocationFilled size={24} />
              </Avatar>
            </Grid>
            <Grid item={true} xs={10}>
              <Box>
                <Typography
                  sx={{ fontWeight: 'bold', textAlign: 'start' }}
                  variant="h6"
                >
                  {checkoutDetails?.channel?.name}
                </Typography>
                <Typography variant="body2">
                  {
                    checkoutDetails?.channel?.metadata.find(
                      (item) => item.key === 'address'
                    )?.value
                  }
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Card
            sx={{
              borderColor: theme.palette.primary.main,
              marginBottom: '1rem'
            }}
            onClick={toggleDrawer(true)}
          >
            <CardContent
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem 1rem 0.5rem 1rem!important'
              }}
            >
              <Typography
                sx={{ fontWeight: 'bold', textAlign: 'start' }}
                variant="h5"
              >
                Pilih Pengantaran
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'end'
                }}
              >
                <Typography
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                  variant="body1"
                >
                  {formOrder.orderType === 'dineIn' ? 'Dine In' : 'Pick Up'}
                </Typography>
                <ChevronRightFilled
                  color={theme.palette.primary.main}
                  size={20} />
              </Box>
            </CardContent>
          </Card>
          <Card
            sx={{
              borderColor: theme.palette.primary.main,
              marginBottom: '1rem'
            }}
            onClick={toggleDrawerTime(true)}
          >
            <CardContent
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem 1rem 0.5rem 1rem!important'
              }}
            >
              <Typography
                sx={{ fontWeight: 'bold', textAlign: 'start' }}
                variant="h5"
              >
                Waktu Penyiapan
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'end'
                }}
              >
                <Typography
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                  variant="body1"
                >
                  {formOrder.estimation.format('HH:mm')}
                </Typography>
                <ChevronRightFilled
                  color={theme.palette.primary.main}
                  size={20} />
              </Box>
            </CardContent>
          </Card>
          <Typography sx={{ fontWeight: 'bold' }} variant="h5">
            Pesanan Kamu
          </Typography>
          <Accordion expanded={true} sx={{ marginBottom: '1rem !important' }}>
            <AccordionSummary
              aria-controls="panel1a-content"
              expandIcon={<KeyboardArrowDownFilled />}
              id="panel1a-header"
              sx={{ padding: '0.5rem, 1rem, 0.5rem, 1rem!important' }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'start'
                }}
              >
                <Avatar src={MieBaso} sx={{ height: '24px', width: '24px' }} />
                <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                  {checkoutDetails?.channel?.name}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container={true}
                spacing={5}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}
              >
                <Grid item={true} xs={6}>
                  <Button
                    color="primary"
                    fullWidth={true}
                    size="small"
                    variant="outlined"
                    onClick={toggleOpenChangeResto}
                  >
                    Ganti Resto
                  </Button>
                </Grid>
                <Grid item={true} xs={6}>
                  <Button
                    color="primary"
                    fullWidth={true}
                    size="small"
                    sx={{ paddingInline: '0.5rem' }}
                    variant="outlined"
                  >
                    Tambah Pesanan
                  </Button>
                </Grid>
              </Grid>
              {checkoutDetails?.lines.map((obj, index) => {
                return (
                  <div key={obj.id} style={{ marginBottom: '1rem' }}>
                    <Grid
                      container={true}
                      spacing={2}
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <Grid
                        item={true}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          paddingTop: '0px !important'
                        }}
                        xs={3}
                      >
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
                            alt={obj?.variant?.product?.name}
                            src={obj?.variant?.product?.thumbnail?.url}
                            style={{
                              borderRadius: '8px',
                              maxHeight: '100%',
                              maxWidth: '100%'
                            }} />
                        </div>
                      </Grid>
                      <Grid
                        item={true}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                        xs={9}
                      >
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 'bold', textAlign: 'start' }}
                            variant="body2"
                          >
                            {obj?.variant?.product?.name}
                          </Typography>
                          <Button color="primary" size="small" variant="text">
                            Edit
                          </Button>
                        </Box>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 'bold', textAlign: 'start' }}
                            variant="body2"
                          >
                            Rp.{' '}
                            {obj?.variant?.pricing?.price?.gross?.amount.toLocaleString(
                              'id-ID'
                            )}
                          </Typography>
                          <Box sx={{ textAlign: 'center' }}>
                            <IconButton
                              aria-label="min"
                              size="small"
                              onClick={() => handleDecrement(index)}
                            >
                              <IndeterminateCheckBoxFilled size={24} />
                            </IconButton>
                            <Typography
                              style={{
                                display: 'inline-block',
                                margin: '0 0.5rem'
                              }}
                              variant="body2"
                            >
                              {obj?.quantity}
                            </Typography>
                            <IconButton
                              aria-label="plus"
                              size="small"
                              onClick={() => handleIncrement(index)}
                            >
                              <AddBoxFilled size={24} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box sx={{ marginBottom: '1rem' }}>
                      <TextField
                        fullWidth={true}
                        id="detail"
                        size="small"
                        value={obj?.metafields?.note}
                        variant="outlined"
                        onChange={(e) => handleNoteChange(index, e.target.value)} />
                    </Box>
                  </div>
                );
              })}
              <Typography
                sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
                variant="body1"
              >
                Catatan buat Resto:
              </Typography>
              <Box sx={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth={true}
                  id="detail"
                  placeholder="Tulis catatan untuk resto disini"
                  size="small"
                  value={formOrder.note}
                  variant="outlined"
                  onChange={(e) => setFormOrder({ ...formOrder, note: e.target.value })} />
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* SKENARIO MULTIPLE CHANNEL */}
          {/* <Typography
                sx={{ fontWeight: 'bold', marginBottom: '0.5rem', marginTop: '1rem' }}
                variant="h5"
              >
                Tambah resto
              </Typography>
              <Box sx={{ marginBottom: '1rem' }}>
                <Button color="primary" fullWidth={true} variant="contained">
                  Tambah Resto
                </Button>
              </Box>
          */}

          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', textAlign: 'start' }}
              variant="h5"
            >
              Pilih Pembayaran
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'end'
              }}
            >
              <Typography
                color="primary"
                sx={{ fontWeight: 'bold' }}
                variant="body1"
              >
                DANA
              </Typography>
              <ChevronRightFilled
                color={theme.palette.primary.main}
                size={20} />
            </Box>
          </Box>
          <Card>
            <CardContent sx={{ padding: '1rem 1rem 1rem 1rem!important' }}>
              <Typography
                sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
                variant="h5"
              >
                Detail Pembayaran
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
                  variant="body2"
                >
                  Harga Menu
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    textAlign: 'end'
                  }}
                  variant="body2"
                >
                  Rp. {total.toLocaleString('id-ID')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
                  variant="body2"
                >
                  Biaya Layanan
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    textAlign: 'end'
                  }}
                  variant="body2"
                >
                  Rp. -
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
                  variant="body2"
                >
                  Biaya Fasilitas Pembayaran
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    textAlign: 'end'
                  }}
                  variant="body2"
                >
                  Rp. -
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card
            sx={{
              borderRadius: '1rem',
              bottom: 0,
              height: '125px',
              left: 0,
              padding: '1rem',
              position: 'fixed',
              right: 0
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}
            >
              <Typography
                sx={{ fontWeight: 'bold', marginTop: '1rem' }}
                variant="h5"
              >
                Total Pembayaran
              </Typography>
              <Typography
                sx={{ fontWeight: 'bold', marginTop: '1rem' }}
                variant="h5"
              >
                Rp. {total.toLocaleString('id-ID')}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Button
                fullWidth={true}
                sx={{ background: theme.palette.primary.gradient }}
                variant="contained"
                onClick={
                  checkoutIdFromStorage
                    ? toggleOpenModalCheckout
                    : () => navigate('./order-in-progress')
                }
              >
                Proses Pesanan
              </Button>
            </Box>
          </Card>
        </>
        )
        : (
        <>
          <div
            style={{
              marginTop: '2rem',
              padding: '5rem 5rem 0rem 5rem',
              textAlign: 'center'
            }}
          >
          <img
            alt="Logo"
            src={LogoBilo}
            style={{ height: 'auto', width: '100%' }} />
          </div>
          <Typography sx={{ color: theme?.palette?.primary?.main, textAlign: 'center' }} variant="h5">
            Keranjang kamu masih kosong...
          </Typography>
          <Typography sx={{ textAlign: 'center' }} variant="body1">
            Yuk masukan minuman & makanan favoritmu kedalam keranjang!
          </Typography>
        </>
        )}
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible'
            }
          }} />
          <SwipeableDrawer
            ModalProps={{
              keepMounted: true
            }}
            anchor="bottom"
            container={container}
            disableSwipeToOpen={!open}
            open={open}
            swipeAreaWidth={drawerBleeding}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <StyledBox
              sx={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                left: 0,
                position: 'relative',
                right: 0,
                top: -drawerBleeding
              }}
            >
              <Puller />
              <Box sx={{ p: 4 }}>
                <Typography
                  sx={{ fontWeight: 'bold', marginTop: '1rem' }}
                  variant="h5"
                >
                  Pilih Tipe Pengantaran
                </Typography>
                <hr />
                {DeliveryType.map((obj) => {
                  return (
                    <Button
                      fullWidth={true}
                      key={obj.text}
                      size="small"
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'start',
                        marginBottom: '0.5rem'
                      }}
                      variant="text"
                      onClick={() => handleOrderType(obj.value)}
                    >
                      <img alt={obj.text} src={obj.icon} />
                      <Typography>{obj.text}</Typography>
                    </Button>
                  );
                })}
                {/* DELIVERY SCENARIO */}
                {/* <Typography
              sx={{ fontWeight: 'bold', marginTop: '1rem' }}
              variant="h5"
            >
              Pilih Pengantaran
            </Typography>
            <hr />
            {Delivery.map((obj) => {
              return (
                <Button
                  fullWidth={true}
                  key={obj.text}
                  size="small"
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'start',
                    marginBottom: '0.5rem'
                  }}
                  variant="text"
                  onClick={() => handleOrderType(obj.text)}
                >
                  <img alt={obj.text} src={obj.icon} />
                  <Typography>{obj.text}</Typography>
                </Button>
              );
            })} */}
              </Box>
            </StyledBox>
          </SwipeableDrawer>

          <Global
            styles={{
              '.MuiDrawer-root > .MuiPaper-root': {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: 'visible'
              }
            }} />

          <Global
            styles={{
              '.MuiDrawer-root > .MuiPaper-root': {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: 'visible'
              }
            }} />
          <SwipeableDrawer
            ModalProps={{
              keepMounted: true
            }}
            anchor="bottom"
            container={container}
            disableSwipeToOpen={!openTime}
            open={openTime}
            swipeAreaWidth={drawerBleeding}
            onClose={toggleDrawerTime(false)}
            onOpen={toggleDrawerTime(true)}
          >
            <StyledBox
              sx={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                left: 0,
                position: 'relative',
                right: 0,
                top: -drawerBleeding
              }}
            >
              <Puller />
              <Box sx={{ p: 4 }}>
                <Typography
                  sx={{ fontWeight: 'bold', marginTop: '1rem' }}
                  variant="h5"
                >
                  Pilih Waktu Penyiapan Pesanan
                </Typography>
                <hr />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '3rem'
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      value={formOrder.estimation}
                      onChange={(newTime) => handleTimeChange(newTime)} />
                  </LocalizationProvider>
                </Box>
              </Box>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>
                  Pesanan kamu akan disiapkan pada pukul <br />{' '}
                  {formOrder.estimation.format('HH:mm')}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem 1rem 1rem 1rem'
                }}
              >
                <Button
                  fullWidth={true}
                  sx={{ background: theme.palette.primary.gradient }}
                  variant="contained"
                  onClick={handlePilihButtonClick}
                >
                  Pilih
                </Button>
              </Box>
            </StyledBox>
          </SwipeableDrawer>
          <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            open={openModal}
            onClose={toggleOpenModalCheckout}
          >
            <Box sx={style}>
              <Typography
                component="h3"
                id="modal-modal-title"
                sx={{
                  color: `${theme?.palette?.error}`,
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}
                variant="h3"
              >
                Udah yakin dengan pesananmu?
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ marginBottom: '0.5rem', textAlign: 'center' }}
                variant="body1"
              >
                Sebelum pesan, pastiin pesananmu udah bener-bener sesuai, ya!
              </Typography>
              <Box
                gap={2}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Button
                  color="primary"
                  size="medium"
                  sx={{ width: '100%' }}
                  variant="outlined"
                  onClick={toggleOpenModalCheckout}
                >
                  Cek Ulang
                </Button>
                <Button
                  size="medium"
                  sx={{ background: theme.palette.primary.gradient, width: '100%' }}
                  variant="contained"
                  onClick={handleConfirmOrder}
                >
                  Sesuai
                </Button>
              </Box>
            </Box>
          </Modal>

          <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            open={openChangeResto}
            onClose={toggleOpenChangeResto}
          >
            <Box sx={style}>
              <Typography
                component="h3"
                id="modal-modal-title"
                sx={{
                  color: `${theme?.palette?.error}`,
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}
                variant="h3"
              >
                Yakin ingin mengganti resto?
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ marginBottom: '0.5rem', textAlign: 'center' }}
                variant="body1"
              >
                Setelah ganti resto, pesananmu dalam keranjang akan hilang semua
              </Typography>
              <Box
                gap={2}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Button
                  color="primary"
                  size="medium"
                  sx={{ width: '100%' }}
                  variant="outlined"
                  onClick={toggleOpenChangeResto}
                >
                  Batalkan
                </Button>
                <Button
                  size="medium"
                  sx={{ background: theme.palette.primary.gradient, width: '100%' }}
                  variant="contained"
                  onClick={handleConfirmChangeResto}
                >
                  Ya
                </Button>
              </Box>
            </Box>
          </Modal>
    </Container>
  );
};

Checkout.displayName = 'Checkout';

export default Checkout;
