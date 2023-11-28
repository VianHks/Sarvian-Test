/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/prefer-tag-over-role */
/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Global } from '@emotion/react';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Modal,
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

import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@components/material.js';

import Bakar from '@assets/images/Bakar.png';
import Bike from '@assets/images/Bike.svg';
import DineIn from '@assets/images/DineIn.svg';
import MieBaso from '@assets/images/MieBaso.png';
import PesanAntar from '@assets/images/PesanAntar.svg';
import PickUp from '@assets/images/PickUp.svg';
import Pisan from '@assets/images/Pisan.png';

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

interface PesananDataModel {
  count: number
  detail: string
  foto: string
  harga: number
  title: string
}

const DUMMY_PESANAN: PesananDataModel[] = [
  {
    count: 1,
    detail: 'Nasi di pisah',
    foto: `${Pisan}`,
    harga: 100000,
    title: 'Ayam Goreng Pisan'
  },
  {
    count: 1,
    detail: 'Jangan terlalu gosong',
    foto: `${Bakar}`,
    harga: 50000,
    title: 'Ayam Bakar'
  }
];

const DEFAULT_PESANAN: PesananDataModel = {
  count: 0,
  detail: '',
  foto: '',
  harga: 0,
  title: ''
};

const drawerBleeding = 120;

interface Props {
  readonly window?: () => Window
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
  { text: 'Pesan Antar', icon: `${PesanAntar}` },
  { text: 'Pick Up', icon: `${PickUp}` },
  { text: 'Dine In', icon: `${DineIn}` }
];

const Delivery = [
  { text: 'SiJago', icon: `${Bike}` },
  { text: 'SiJabat', icon: `${Bike}` }
];

const CheckoutSinglePesanAntar: PageComponent = (props: Props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { window } = props;
  const [biayaLayanan, setBiayaLayanan] = useState(2000);
  const [biayaParkir, setBiayaParkir] = useState(2000);
  const [biayaOngkir, setBiayaOngkir] = useState(2000);
  const [fasPembayaran, setFasPembayaran] = useState(600);
  const [totalmenuCost, settotalMenuCost] = useState(0);
  const [totalPembayaran, settotalPembayaran] = useState(0);
  const [orders, setOrders] = useState<PesananDataModel[]>([DEFAULT_PESANAN]);
  const [selectedDeliveryTypes, setSelectedDeliveryTypes] = useState<Set<string>>(new Set());
  const [selectedDelivery, setSelectedDelivery] = useState<Set<string>>(new Set());
  const [selectedItemDelivery, setSelectedItemDelivery] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [open, setOpen] = useState(false),
    [openSummary, setOpenSummary] = useState(false),
    [openTime, setOpenTime] = useState(false);

  const [isCheckout, setIsCheckOut] = useState(false),
    [openModal, setOpenModal] = useState(false);

  const [isTambahResto, setIsTambahResto] = useState(false),
    [openModalTambahResto, setOpenModalTambahResto] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const toggleDrawerSummary = (newOpen: boolean) => () => {
    setOpenSummary(newOpen);
  };

  const toggleDrawerTime = (newOpen: boolean) => () => {
    setOpenTime(newOpen);
  };

  const toggleOpenModalCheckout = () => {
    setOpenModal(!openModal);
  };

  const toggleOpenModalTambahResto = () => {
    setOpenModalTambahResto(!openModalTambahResto);
  };

  const handleConfirmCheckout = () => {
    setIsCheckOut(true);
    setOpenModal(!openModal);
  };

  const handleConfirmTambahResto = () => {
    setIsTambahResto(true);
    setOpenModalTambahResto(!openModalTambahResto);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleIncrement = (index: number) => {
    const updatedOrders = [...orders];

    updatedOrders[index].count += 1;
    setOrders(updatedOrders);
  };

  const handleDecrement = (index: number) => {
    if (orders[index].count > 0) {
      const updatedOrders = [...orders];

      updatedOrders[index].count -= 1;
      setOrders(updatedOrders);
    }
  };

  const handleDeliveryType = (item: string) => {
    const updatedSet = new Set(selectedDeliveryTypes);

    if (updatedSet.has(item)) {
      updatedSet.delete(item);
    } else {
      DeliveryType.forEach((obj) => {
        if (obj.text !== item) {
          updatedSet.delete(obj.text);
        }
      });
      updatedSet.add(item);
    }

    setSelectedDeliveryTypes(updatedSet);
  };

  const handleDelivery = (item: string) => {
    const updatedSet = new Set(selectedDelivery);

    if (updatedSet.has(item)) {
      updatedSet.delete(item);
    } else {
      Delivery.forEach((obj) => {
        if (obj.text !== item) {
          updatedSet.delete(obj.text);
        }
      });
      updatedSet.add(item);
    }

    setSelectedDelivery(updatedSet);
  };
  const handlePilihDelivery = () => {
    const selectedDeliveryArray = Array.from<string>(selectedDelivery);

    setSelectedItemDelivery(selectedDeliveryArray);
    setOpen(!open);
  };

  const handleTimeChange = (newTime: Dayjs) => {
    setSelectedTime(newTime);
  };

  const handlePilihButtonClick = () => {
    setOpenTime(false);
  };

  useEffect(() => {
    if (DUMMY_PESANAN) {
      setOrders(DUMMY_PESANAN);
    }

    const menuCost = orders.reduce((acc, order) => acc + order.harga * order.count, 0);

    settotalMenuCost(menuCost);

    const totalPayment =
      menuCost + biayaLayanan + biayaParkir + biayaOngkir + fasPembayaran;

    settotalPembayaran(totalPayment);
  }, [orders]);

  return (
    <Container>
        <Grid container={true} spacing={1} sx={{ marginBottom: '1rem', justifyContent: 'space-between' }}>
            <Grid
              item={true}
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'flex-start'
              }}
              xs={6}
            >
            <Typography
              sx={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.25rem', textAlign: 'start' }}
              variant="body1"
            >
                Alamat Pengantaran:
            </Typography>
            </Grid>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'flex-end'
              }}
            >
            <Typography
              color="primary"
              sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}
              variant="body1"
            >
              Ganti Alamat
            </Typography>
            <ChevronRightFilled color={theme.palette.primary.main} size={20} />
            </Box>
        </Grid>

      <Grid container={true} spacing={2} sx={{ marginBottom: '1rem', backgroundColor: '#D5ECFE' }}>
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
              TokoRumahan
            </Typography>
            <Typography variant="body2">
              Jl. Hegarmanah No. 28, Hermanah, Cidadap, Kota Bandung, Jawa Barat
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Typography
        sx={{ fontWeight: 'medium', textAlign: 'start', marginBottom: '0.5rem' }}
        variant="h6"
      >
        Patokan:
      </Typography>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            marginBottom: '1.5rem',
            gap: '0.5rem',
            justifyContent: 'start'
          }}
        >
            <TextField
              InputProps={{
                startAdornment: (
        <MailOutlineRoundedIcon
          sx={{ height: '24px', width: '24px', marginRight: '0.5rem' }} />
                ),
                endAdornment: (
                    <HelpOutlineIcon
                      sx={{ height: '24px', width: '24px', marginLeft: '0.5rem' }} />
                )
              }}
              fullWidth={true}
              placeholder="Pinggir Ismile"
              size="small"
              variant="outlined" />
        </Box>
      <Card
        sx={{ borderColor: theme.palette.primary.main, marginBottom: '1rem' }}
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
              {selectedItemDelivery || 'SiJago'}
            </Typography>
            <ChevronRightFilled color={theme.palette.primary.main} size={20} />
          </Box>
        </CardContent>
      </Card>
      <Typography sx={{ fontWeight: 'bold' }} variant="h5">
        Pesanan Kamu
      </Typography>
      <Accordion sx={{ marginBottom: '1rem' }}>
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
              Resto Bunda Gila
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
          {DUMMY_PESANAN.map((obj, index) => {
            return (
              <div key={obj.title} style={{ marginBottom: '1rem' }}>
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
                  <Grid item={true} xs={3}>
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
                        alt={obj.title}
                        src={obj.foto}
                        style={{ maxHeight: '100%', maxWidth: '100%' }} />
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
                        {obj.title}
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
                        Rp. {obj.harga.toLocaleString('id-ID')}
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
                          {obj.count}
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
                    value={obj.detail}
                    variant="outlined" />
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
                  size="small"
                  value="Jangan terlalu Gosong"
                  variant="outlined" />
              </Box>
        </AccordionDetails>
      </Accordion>
      <Typography
        sx={{ fontWeight: 'bold', marginBottom: '0.5rem', marginTop: '1rem' }}
        variant="h5"
      >
        Tambah resto
      </Typography>
      <Box sx={{ marginBottom: '1rem' }}>
        <Button color="primary" fullWidth={true} variant="contained" onClick={toggleOpenModalTambahResto}>
          Tambah Resto
        </Button>
      </Box>
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
            DANA
          </Typography>
          <ChevronRightFilled color={theme.palette.primary.main} size={20} />
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
              Rp. {totalmenuCost.toLocaleString('id-ID')}
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
              Rp. {biayaLayanan.toLocaleString('id-ID')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
              variant="body2"
            >
              Biaya Parkir
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                textAlign: 'end'
              }}
              variant="body2"
            >
              Rp. {biayaParkir.toLocaleString('id-ID')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
              variant="body2"
            >
              Biaya Ongkir
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                textAlign: 'end'
              }}
              variant="body2"
            >
            Rp. {biayaOngkir.toLocaleString('id-ID')}
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
              Rp. {fasPembayaran.toLocaleString('id-ID')}
            </Typography>
          </Box>

        </CardContent>
      </Card>
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
            top: -200
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
                    backgroundColor: selectedDeliveryTypes.has(obj.text) ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    },
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'start',
                    marginBottom: '0.5rem'
                  }}
                  variant={selectedDeliveryTypes.has(obj.text) ? 'contained' : 'text'}
                  onClick={() => handleDeliveryType(obj.text)}

                >
                  <img alt={obj.text} src={obj.icon} />
                  <Typography>{obj.text}</Typography>
                </Button>
              );
            })}
            <Typography
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
                    backgroundColor: selectedDelivery.has(obj.text) ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    },
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'start',
                    marginBottom: '0.5rem'
                  }}
                  variant={selectedDelivery.has(obj.text) ? 'contained' : 'text'}
                  onClick={() => handleDelivery(obj.text)}
                >
                  <img alt={obj.text} src={obj.icon} />
                  <Typography>{obj.text}</Typography>
                </Button>
              );
            })}
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              onClick={() => handlePilihDelivery()}
            >
            Pilih
            </Button>
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
      <SwipeableDrawer
        ModalProps={{
          keepMounted: true
        }}
        anchor="bottom"
        disableSwipeToOpen={false}
        open={openSummary}
        swipeAreaWidth={drawerBleeding}
        onClose={toggleDrawerSummary(false)}
        onOpen={toggleDrawerSummary(true)}
      >
        <StyledBox
          sx={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            left: 0,
            position: 'relative',
            right: 0,
            top: -drawerBleeding,
            visibility: open ? 'hidden' : 'visible'
          }}
        >
          <Puller />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1rem 0rem 1rem' }}>
            <Typography sx={{ fontWeight: 'bold', marginTop: '1rem' }} variant="h5">Total Pembayaran</Typography>
            <Typography sx={{ fontWeight: 'bold', marginTop: '1rem' }} variant="h5">Rp. {totalPembayaran.toLocaleString('id-ID')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1rem 1rem 1rem' }}>
          <Button
            color="primary"
            fullWidth={true}
            variant="contained"
            onClick={!isCheckout ? toggleOpenModalCheckout : () => navigate('./order-in-progress')}
          >
            {isCheckout ? 'Checkout' : 'Proses Pesanan'}
          </Button>
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
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  value={selectedTime}
                  onChange={() => handleTimeChange} />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ textAlign: 'center' }}>Pesanan kamu akan disiapkan pada pukul <br /> {selectedTime.format('HH:mm')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1rem 1rem 1rem' }}>
            <Button
              color="primary"
              fullWidth={true}
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
            sx={{ color: `${theme?.palette?.error}`, fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}
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
          <Box gap={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Button
              color="primary"
              size="medium"
              sx={{ width: '100%' }}
              variant="contained"
              onClick={handleConfirmCheckout}
            >
              Sesuai
            </Button>
            <Button
              color="primary"
              size="medium"
              sx={{ width: '100%' }}
              variant="outlined"
              onClick={toggleOpenModalCheckout}
            >
              Cek Ulang
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        open={openModalTambahResto}
        onClose={toggleOpenModalTambahResto}
      >
        <Box sx={style}>
          <Typography
            component="h3"
            id="modal-modal-title"
            sx={{ color: `${theme?.palette?.error}`, fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}
            variant="h3"
          >
            Mau beli di resto lain?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ marginBottom: '0.5rem', textAlign: 'center' }}
            variant="body1"
          >
            Yuk, pesan makanan kesukaanmu dengan mudah! Dengan multi order, kamu dapat pesan makanan melalui resto yang searah, gak perlu muter-muter!
          </Typography>
          <Box gap={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Button
              color="primary"
              size="medium"
              sx={{ width: '100%' }}
              variant="contained"
              onClick={handleConfirmTambahResto}
            >
              Boleh
            </Button>
            <Button
              color="primary"
              size="medium"
              sx={{ width: '100%' }}
              variant="outlined"
              onClick={toggleOpenModalTambahResto}
            >
              Gak Perlu
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

CheckoutSinglePesanAntar.displayName = 'CheckoutSinglePesanAntar';

export default CheckoutSinglePesanAntar;