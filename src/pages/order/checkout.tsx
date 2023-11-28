/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/prefer-tag-over-role */
/* eslint-disable linebreak-style */
import { useEffect, useMemo, useState } from 'react';
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
import { useAuth } from '@hooks/use-auth';
import { checkoutCommand } from '@models/checkout/commands';
import { halamanRestoCommand } from '@models/halaman-resto/commands';
import { useStore } from '@models/store';

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

const Checkout: PageComponent = (props: Props) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state?.checkout);
  const theme = useTheme();
  const { window } = props;
  const [totalMenu, setTotalMenu] = useState(0);
  const [totalPembayaran, setTotalPembayaran] = useState(0);
  const [biayaLayanan, setBiayaLayanan] = useState(2000);
  const [biayaFasilitas, setBiayaFasilitas] = useState(600);
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
    if (token) {
      dispatch(checkoutCommand.loadCheckoutMenu(token))

        .catch((err: unknown) => {
          console.error(err);
        });

      return () => {
        dispatch(checkoutCommand.clearCheckoutMenu());
      };
    }

    if (store && store?.checkoutMenuOutput) {
      const calculatedTotalMenu = store.checkoutMenuOutput.reduce(
        (total, menu) => total + menu.harga * menu.count,
        0
      );

      setTotalMenu(calculatedTotalMenu);

      const calculatedTotalPembayaran = calculatedTotalMenu + biayaLayanan + biayaFasilitas;

      setTotalPembayaran(calculatedTotalPembayaran);
    }

    if (DUMMY_PESANAN) {
      setOrders(DUMMY_PESANAN);
    }
  }, [orders, biayaFasilitas, biayaLayanan]);

  useEffect(() => {
    if (store?.checkoutMenuOutput) {
      const calculatedTotalMenu = store.checkoutMenuOutput.reduce(
        (total, menu) => total + menu.harga * menu.count,
        0
      );
     
      setTotalMenu(calculatedTotalMenu);

      const calculatedTotalPembayaran = calculatedTotalMenu + biayaLayanan + biayaFasilitas;

      setTotalPembayaran(calculatedTotalPembayaran);
    }
  }, [store, biayaFasilitas, biayaLayanan]);

  console.log('cekstore', store);

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
          {store?.checkoutMenuOutput?.map((obj, index) => {
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
        <Button color="primary" fullWidth={true} variant="contained">
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

              Rp. {totalMenu.toLocaleString('id-ID')}
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

              Rp. {biayaFasilitas.toLocaleString('id-ID')}
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
            <Typography sx={{ fontWeight: 'bold', marginTop: '1rem' }} variant="h5">
                        Rp. {totalPembayaran.toLocaleString('id-ID')}
            </Typography>
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

Checkout.displayName = 'Checkout';

export default Checkout;
