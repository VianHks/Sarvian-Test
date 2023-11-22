/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/prefer-tag-over-role */
/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Global } from '@emotion/react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
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
import Cake from '@assets/images/Cake.svg';
import Vodka from '@assets/images/Dessert.png';
import DineIn from '@assets/images/DineIn.svg';
import MieBaso from '@assets/images/MieBaso.png';
import PesanAntar from '@assets/images/PesanAntar.svg';
import PickUp from '@assets/images/PickUp.svg';
import Pisan from '@assets/images/Pisan.png';
import Roti from '@assets/images/Roti.png';
import TokoHw from '@assets/images/TokoHw.svg';
import TelponLogo from '@assets/images/FotoTelpon.svg';

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

interface DetailOrder {
  count: number
  detail: string
  foto: string
  harga: number
  title: string
}

interface PesananDataModel {
  restoId: number
  restoName: string
  restoFoto: string
  detailOrder: DetailOrder[]
  catatan: string
}

const DUMMY_PESANAN: PesananDataModel[] = [
  {
    restoId: 1,
    restoName: 'Resto Bundo Gilo',
    restoFoto: `${MieBaso}`,
    detailOrder: [
      {
        count: 0,
        detail: 'Nasi di pisah',
        foto: `${Pisan}`,
        harga: 25000,
        title: 'Ayam Goreng Pisan'
      },
      {
        count: 0,
        detail: 'Kuah Yang Banyak',
        foto: `${MieBaso}`,
        harga: 20000,
        title: 'Baso Campur'
      }
    ],
    catatan: 'Baso nya jangan sampai dingin'
  },
  {
    restoId: 2,
    restoName: 'Cake Mamah',
    restoFoto: `${TelponLogo}`,
    detailOrder: [
      {
        count: 0,
        detail: 'Gulanya Sedikit',
        foto: `${Cake}`,
        harga: 100000,
        title: 'Cake Wonder'
      },
      {
        count: 0,
        detail: 'Rotinya Potong dulu',
        foto: `${Roti}`,
        harga: 150000,
        title: 'Roti isi'
      }
    ],
    catatan: 'Rotinya Harus anget'
  },
  {
    restoId: 3,
    restoName: 'HolyWings',
    restoFoto: `${TokoHw}`,
    detailOrder: [
      {
        count: 0,
        detail: 'Dingin Ya',
        foto: `${Vodka}`,
        harga: 400000,
        title: 'Vodka Crystal'
      },
      {
        count: 0,
        detail: 'Extra Keju',
        foto: `${Bakar}`,
        harga: 75000,
        title: 'Chicken Wings HW'
      }
    ],
    catatan: 'Vodkanya Yang Crystal'
  }
];

const DEFAULT_PESANAN: PesananDataModel = {
  restoId: 0,
  restoName: '',
  restoFoto: '',
  detailOrder: [
    {
      count: 0,
      detail: '',
      foto: '',
      harga: 0,
      title: ''
    }
  ],
  catatan: ''

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

const CheckoutMultiOrder: PageComponent = (props: Props) => {
  const [menuCost, setMenuCost] = useState(0);
  const [biayaLayanan, setBiayaLayanan] = useState(2000);
  const [fasPembayaran, setFasPembayaran] = useState(600);
  const [totalmenuCost, settotalMenuCost] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const { window } = props;
  const [orders, setOrders] = useState<PesananDataModel[]>([DEFAULT_PESANAN]);
  const [delivery, setDelivery] = useState('Dine In');
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [open, setOpen] = useState(false),
    [openSummary, setOpenSummary] = useState(false),
    [openTime, setOpenTime] = useState(false);

  const [isCheckout, setIsCheckOut] = useState(false),
    [openModal, setOpenModal] = useState(false);

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

  const handleConfirmCheckout = () => {
    setIsCheckOut(true);
    setOpenModal(!openModal);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleIncrement = (orderIndex: number, index: number) => {
    const updatedOrders = [...orders];

    updatedOrders[orderIndex].detailOrder[index].count += 1;
    setOrders(updatedOrders);
  };

  const handleDecrement = (orderIndex: number, index: number) => {
    const updatedOrders = [...orders];

    if (updatedOrders[orderIndex].detailOrder[index].count > 0) {
      updatedOrders[orderIndex].detailOrder[index].count -= 1;
      setOrders(updatedOrders);
    }
  };

  const handleDelivery = (item: string) => {
    setDelivery(item);
    setOpen(false);
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

    const newTotalMenuCost = orders.reduce((total, order) => {
      const orderCost = order.detailOrder.reduce((orderTotal, item) => {
        return orderTotal + item.count * item.harga;
      }, 0);

      return total + orderCost;
    }, 0);

    setMenuCost(newTotalMenuCost);
    settotalMenuCost(newTotalMenuCost + biayaLayanan + fasPembayaran);
  }, [orders]);

  return (
    <Container>
      <Typography
        sx={{ fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'start' }}
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
              TokoRumahan
            </Typography>
            <Typography variant="body2">
              Jl. Hegarmanah No. 28, Hermanah, Cidadap, Kota Bandung, Jawa Barat
            </Typography>
          </Box>
        </Grid>
      </Grid>
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
              {delivery}
            </Typography>
            <ChevronRightFilled color={theme.palette.primary.main} size={20} />
          </Box>
        </CardContent>
      </Card>
      <Card
        sx={{ borderColor: theme.palette.primary.main, marginBottom: '1rem' }}
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
              {selectedTime.format('HH:mm')}
            </Typography>
            <ChevronRightFilled color={theme.palette.primary.main} size={20} />
          </Box>
        </CardContent>
      </Card>
      <Typography sx={{ fontWeight: 'bold' }} variant="h5">
        Pesanan Kamu
      </Typography>
      {DUMMY_PESANAN.map((order, orderIndex) => (
      <Accordion key={order.restoId} sx={{ marginBottom: '1rem' }}>
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
            <Avatar src={order.restoFoto} sx={{ height: '30px', width: '30px' }} />
            <Typography sx={{ fontWeight: 'bold' }} variant="body1">
              {order.restoName}
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
          {order.detailOrder.map((obj, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
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
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <img
                  alt={obj.title}
                  src={obj.foto}
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }} />
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
                    onClick={() => handleDecrement(orderIndex, index)}
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
                    onClick={() => handleIncrement(orderIndex, index)}
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
          ))}
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
                  value={order.catatan}
                  variant="outlined" />
              </Box>
        </AccordionDetails>
      </Accordion>
      ))}
      <Typography
        sx={{ fontWeight: 'bold', marginBottom: '0.5rem', marginTop: '1rem' }}
        variant="h5"
      >
        Tambah resto
      </Typography>
      <Box sx={{ marginBottom: '1rem' }}>
        <Button color="secondary" fullWidth={true} variant="contained">
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
              Rp. {menuCost.toLocaleString('id-ID')}
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
                  onClick={() => handleDelivery(obj.text)}
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
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'start',
                    marginBottom: '0.5rem'
                  }}
                  variant="text"
                  onClick={() => handleDelivery(obj.text)}
                >
                  <img alt={obj.text} src={obj.icon} />
                  <Typography>{obj.text}</Typography>
                </Button>
              );
            })}
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
            <Typography sx={{ fontWeight: 'bold', marginTop: '1rem' }} variant="h5">Rp. {menuCost > 0 ? totalmenuCost.toLocaleString('id-ID') : '0'}</Typography>
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
          <Box gap={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
              color="primary"
              size="medium"
              sx={{ width: '100%' }}
              variant="contained"
              onClick={handleConfirmCheckout}
            >
              Sesuai
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

CheckoutMultiOrder.displayName = 'CheckoutMultiOrder';

export default CheckoutMultiOrder;
