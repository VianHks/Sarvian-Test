/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/prefer-tag-over-role */
/* eslint-disable linebreak-style */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  styled,
  TextField,
  useTheme
} from '@mui/material';

import { KeyboardArrowDownFilled, MessageFilled, PhoneFilled, QRCodeFilled } from '@nxweb/icons/material';
import { Check } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@components/material.js';
import { useAuth } from '@hooks/use-auth';
import { checkoutCommand } from '@models/checkout/commands';
import { orderCommand } from '@models/order/commands';
import { useStore } from '@models/store';

import Bakar from '@assets/images/Bakar.png';
import QR from '@assets/images/Dummy_QR.svg';
import map from '@assets/images/Map.svg';
import MieBaso from '@assets/images/MieBaso.png';
import Pisan from '@assets/images/Pisan.png';

import type { OrderDataModel } from './order';
import type { StepIconProps } from '@mui/material';

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

const Steps = [
  {
    active: 1,
    description: `Gg. Bahagia Selalu`,
    label: 'Lokasi Kamu'
  },
  {
    active: 2,
    description: `Gg. Bahagia Selalu`,
    label: 'Alamat Resto'
  }
];

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    alignItems: 'center',
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    ...ownerState.active && {
      color: '#1D2939'
    },
    '& .QontoStepIcon-circle': {
      backgroundColor: 'currentColor',
      borderRadius: '50%',
      height: 8,
      width: 8
    },
    '& .QontoStepIcon-completedIcon': {
      color: '#1D2939',
      fontSize: 18,
      zIndex: 1
    }
  })
);
const QontoStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot className={className} ownerState={{ active }}>
      {completed
        ? <Check className="QontoStepIcon-completedIcon" />
        : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
};

QontoStepIcon.displayName = 'Orders';

const Orders: PageComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state);
  const [totalPembayaran, setTotalPembayaran] = useState(0);
  const [biayaLayanan, setBiayaLayanan] = useState(2000);
  const [biayaFasilitas, setBiayaFasilitas] = useState(600);
  const [biayaParkir, setBiayaParkir] = useState(2000);
  const [biayaOngkir, setBiayaOngkir] = useState(2000);
  const [detailOrder, setDetailOrder] = useState<OrderDataModel[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [timerIdResto, setTimerIdResto] = useState<NodeJS.Timeout | null>(null);
  const [timerIdDriver, setTimerIdDriver] = useState<NodeJS.Timeout | null>(null);
  const [restoCountdown, setRestoCountdown] = useState(120);
  const [driverCountdown, setDriverCountdown] = useState(120);
  const [orderApproved, setOrderApproved] = useState(true);
  const [openModalRestoCanceled, setOpenModalRestoCanceled] = useState(false);
  const [searchDriver, setSearchDriver] = useState(3);
  const [isDriverFound, setIsDriverFound] = useState(true);
  const [isDriverOnTheWay, setIsDriverOnTheWay] = useState(true);

  useEffect(() => {
    if (token) {
      dispatch(orderCommand.orderLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });
      dispatch(checkoutCommand.loadCheckoutMenu(token))

        .catch((err: unknown) => {
          console.error(err);
        });
      dispatch(checkoutCommand.loadDana(token))

        .catch((err: unknown) => {
          console.error(err);
        });

      return () => {
        dispatch(orderCommand.orderClear());
      };
    }

    if (id) {
      const selectedOrder = store?.order?.orderOutput?.find((order) => order.NO_ORDER === parseInt(id, 10));

      if (selectedOrder) {
        setDetailOrder([selectedOrder]);
      } else {
        setDetailOrder([]);
      }
    } else {
      setDetailOrder([]);
    }
  }, [id]);

  useEffect(() => {
    if (store?.checkout?.checkoutMenuOutput) {
      const calculatedTotalMenu = store.checkout.checkoutMenuOutput.reduce(
        (total, menu) => total + menu.harga * menu.count,
        0
      );

      let calculatedTotalPembayaran = calculatedTotalMenu + biayaLayanan + biayaFasilitas;

      if (detailOrder[0]?.DELIVERY_STATUS === 'Delivery Order') {
        // Add biayaParkir and biayaOngkir for Delivery Order
        calculatedTotalPembayaran += biayaParkir + biayaOngkir;
      }

      setTotalPembayaran(calculatedTotalPembayaran);
    }
  }, [store, biayaFasilitas, biayaLayanan, biayaParkir, biayaOngkir]);

  const startCountdownResto = () => {
    setRestoCountdown(15);
    const id = setInterval(() => {
      setRestoCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          if (timerIdResto) {
            clearInterval(timerIdResto);
          }

          return 0;
        }

        return prevCountdown - 1;
      });
    }, 1000);

    if (timerIdResto) {
      clearInterval(timerIdResto);
    }

    setTimerIdResto(id);
    setOpenModalRestoCanceled(true);
  };

  const stopCountdownResto = () => {
    if (timerIdResto) {
      clearInterval(timerIdResto);
      setTimerIdResto(null);
    }
  };

  const startCountdownDriver = () => {
    setDriverCountdown(20);
    const id = setInterval(() => {
      setDriverCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          if (timerIdDriver) {
            clearInterval(timerIdDriver);
          }

          return 0;
        }

        return prevCountdown - 1;
      });
    }, 1000);

    if (timerIdDriver) {
      clearInterval(timerIdDriver);
    }

    setTimerIdDriver(id);
  };

  const stopCountdownDriver = () => {
    if (timerIdDriver) {
      clearInterval(timerIdDriver);
      setTimerIdDriver(null);
    }
  };

  console.log('cekstore', store);

  useEffect(() => {
    startCountdownResto();
    startCountdownDriver();

    return () => {
      stopCountdownResto();
      stopCountdownDriver();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const toggleOpenModalBatal = () => {
    setOpenModal(!openModal);
  };

  const handleConfirmBatal = () => {
    navigate('./lanjut');
  };

  const toggleOpenModalQR = () => {
    setOpenQR(!openQR);
  };

  const handleCloseModalRestoCanceled = () => {
    setOpenModalRestoCanceled(!openModalRestoCanceled);
  };

  return (
    <>
      {detailOrder[0]?.DELIVERY_STATUS === 'Delivery Order' && isDriverOnTheWay === true
        ? <img alt="map" src={map} style={{ height: '400px', marginInline: '-1rem', marginTop: '-1.2rem', width: '360px' }} />
        : null}
      <Grid container={true} spacing={2}>
        <Grid
          item={true}
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
          xs={2}
        >
          <Avatar src={MieBaso} sx={{ height: '40px', width: '40px' }} />
        </Grid>
        <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'start', paddingTop: '0rem!important' }} xs={orderApproved ? 6 : 8}>
          <Box>
            <Typography
              sx={{ fontWeight: 'bold', textAlign: 'start' }}
              variant="h6"
            >
              Resto Bunda Gila
            </Typography>
            <Typography variant="body2">
              Menunggu konfirmasi resto
            </Typography>
          </Box>
        </Grid>
        <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', paddingTop: '0rem!important' }} xs={orderApproved ? 4 : 2}>
          {orderApproved
            ? <Box gap={2} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'end' }}>
              <Avatar sx={{ backgroundColor: theme.palette.primary.main, height: '32px', width: '32px' }}>
                <IconButton aria-label="call">
                  <PhoneFilled color={theme.palette.grey[100]} size={16} />
                </IconButton>
              </Avatar>
              <Avatar sx={{ backgroundColor: theme.palette.primary.main, height: '32px', width: '32px' }}>
                <IconButton aria-label="call">
                  <MessageFilled color={theme.palette.grey[100]} size={16} />
                </IconButton>
              </Avatar>
              </Box>
            : <Box>
              <Typography variant="caption">
                {formatTime(restoCountdown)}
              </Typography>
              </Box>}
        </Grid>
      </Grid>
      <hr />
      {detailOrder[0]?.DELIVERY_STATUS === 'Delivery Order'
        ? <Grid container={true} spacing={2}>
          <Grid
            item={true}
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center'
            }}
            xs={2}
          >
            <Avatar sx={{ height: '40px', width: '40px' }} />
          </Grid>
          <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'start', paddingTop: '0rem!important' }} xs={orderApproved ? 6 : 8}>
            <Box>
              <Typography variant="body2">
                Mencari Driver
              </Typography>
            </Box>
          </Grid>
          <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', paddingTop: '0rem!important' }} xs={orderApproved ? 4 : 2}>
            {isDriverFound
              ? <Box gap={2} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'end' }}>
                <Avatar sx={{ backgroundColor: theme.palette.primary.main, height: '32px', width: '32px' }}>
                  <IconButton aria-label="call">
                    <PhoneFilled color={theme.palette.grey[100]} size={16} />
                  </IconButton>
                </Avatar>
                <Avatar sx={{ backgroundColor: theme.palette.primary.main, height: '32px', width: '32px' }}>
                  <IconButton aria-label="call">
                    <MessageFilled color={theme.palette.grey[100]} size={16} />
                  </IconButton>
                </Avatar>
                </Box>
              : <Box>
                <Typography variant="caption">
                  {formatTime(driverCountdown)}
                </Typography>
                </Box>}
          </Grid>
          </Grid>
        : null}
      {detailOrder[0]?.DELIVERY_STATUS === 'Pickup' && orderApproved
        ? <>
          <Box marginBlock="1rem">
            <Alert severity="info" sx={{ alignItems: 'center', backgroundColor: '#D5ECFE', display: 'flex' }} variant="filled">
              <Typography color="primary" variant="body2">
                Perlihatkan kode dibawah kepada resto untuk mengkonfirmasi pesananmu
              </Typography>
            </Alert>
          </Box>
          <Card
            sx={{ borderColor: theme.palette.primary.main, marginBottom: '1rem' }}
            onClick={toggleOpenModalQR}
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
                GHP230
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'end'
                }}
              >
                <QRCodeFilled color={theme.palette.primary.main} size={20} />
              </Box>
            </CardContent>
          </Card>
          </>
        : detailOrder[0]?.DELIVERY_STATUS === 'Delivery Order' && orderApproved && isDriverOnTheWay
          ? <>
            <Box marginBlock="1rem">
              <Alert severity="info" sx={{ alignItems: 'center', backgroundColor: '#D5ECFE', display: 'flex' }} variant="filled">
                <Typography color="primary" variant="body2">
                  Perlihatkan kode dibawah kepada resto untuk mengkonfirmasi pesananmu
                </Typography>
              </Alert>
            </Box>
            <Card
              sx={{ borderColor: theme.palette.primary.main, marginBottom: '1rem' }}
              onClick={toggleOpenModalQR}
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
                  GHP230
                </Typography>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'end'
                  }}
                >
                  <QRCodeFilled color={theme.palette.primary.main} size={20} />
                </Box>
              </CardContent>
            </Card>
            </>
          : null}
      <Typography fontWeight="bold" marginBlock="1rem" variant="h5">
        Pesananmu
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
            <Typography fontWeight="bold" variant="body1">
              Resto Bunda Gila
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {store?.checkout?.checkoutMenuOutput?.map((obj) => {
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
                        alignItems: 'center',
                        display: 'flex',
                        height: '100%',
                        justifyContent: 'center',
                        width: '100%'
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
                        <Typography
                          style={{
                            display: 'inline-block',
                            margin: '0 0.5rem'
                          }}
                          variant="body2"
                        >
                          {obj.count} Item
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ marginBottom: '1rem' }}>
                  <TextField
                    disabled={true}
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
              disabled={true}
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
        Pengantaran
      </Typography>
      <Card sx={{ marginBottom: '1rem' }}>
        <CardContent sx={{ padding: '1rem 1rem 1rem 1rem!important' }}>
          <Stepper orientation="vertical">
            {Steps.map((step) => (
              <Step active={true} key={step.label}>
                <StepLabel StepIconComponent={QontoStepIcon} sx={{ marginLeft: '0.5rem' }}>
                  <Typography fontWeight="bold">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
      <Typography color="neutral-90" fontWeight="Bold" marginBottom="1rem" variant="h5">
        Metode Pembayaran
      </Typography>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}
      >
        <Typography
          color="primary"
          sx={{ fontWeight: 'bold', textAlign: 'start' }}
          variant="body1"
        >
          DANA
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
            sx={{ fontWeight: 'bold' }}
            variant="h5"
          >
            Rp. {store?.checkout?.danaOutput?.[0]?.jumlah.toLocaleString('id-ID')}
          </Typography>
        </Box>
      </Box>
      <Card>
        <CardContent sx={{ padding: '1rem 1rem 1rem 1rem!important' }}>
          <Typography
            fontWeight="bold"
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
              Total Pembayaran
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                textAlign: 'end'
              }}
              variant="body2"
            >
              Rp. {totalPembayaran.toLocaleString('id-ID')}
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
          {detailOrder[0]?.DELIVERY_STATUS === 'Delivery Order'
            ? <>
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
                  Rp. 2.000
                </Typography>
              </Box>
              </>
            : null}
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
      <Box marginTop="4.5rem">
        <Button color="error" fullWidth={true} sx={{ marginBottom: '1rem' }} variant="contained" onClick={toggleOpenModalBatal}>
          Batalkan Pesanan
        </Button>
        <Button color="primary" fullWidth={true} variant="outlined" onClick={() => navigate('/pusat-bantuan')}>
          Pusat Bantuan
        </Button>
      </Box>

      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        open={openModal}
        onClose={toggleOpenModalBatal}
      >
        <Box sx={style}>
          <Typography
            component="h3"
            id="modal-modal-title"
            sx={{ color: `${theme?.palette?.error}`, fontWeight: 'bold', textAlign: 'center' }}
            variant="h3"
          >
            Yakin mau batalin pesanan kamu?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ marginBlock: '1rem', textAlign: 'center' }}
            variant="body1"
          >
            Inget, ya. Pesanan yang kamu batalin akan hilang dari daftar manapun. Masih yakin mau batalin pesanan?
          </Typography>
          <Box gap={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              color="primary"
              size="medium"
              sx={{ width: '100%' }}
              variant="contained"
              onClick={handleConfirmBatal}
            >
              Lanjut
            </Button>
            <Button
              color="primary"
              size="medium"
              sx={{ width: '100%' }}
              variant="outlined"
              onClick={toggleOpenModalBatal}
            >
              Batal
            </Button>
          </Box>
        </Box>
      </Modal>
      {restoCountdown === 0 && detailOrder[0]?.DELIVERY_STATUS === 'Delivery Order'
        ? <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            open={true}
            onClose={handleCloseModalRestoCanceled}
          >
          <Box sx={style}>
            <Typography
              component="h3"
              id="modal-modal-title"
              sx={{ color: `${theme?.palette?.error}`, fontWeight: 'bold', textAlign: 'center' }}
              variant="h3"
            >
              Resto Tidak Konfirmasi
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ marginBlock: '1rem', textAlign: 'center' }}
              variant="body1"
            >
              Maaf, Resto Holliwings lagi gak bisa konfirmasi pesanan. Mau diulang lagi atau batal pesan dan pilih resto lain?
            </Typography>
            <Box gap={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                color="primary"
                size="medium"
                sx={{ width: '100%' }}
                variant="outlined"
                onClick={() => navigate('/beranda')}
              >
                Pilih Resto Lain
              </Button>
              <Button
                color="primary"
                size="medium"
                sx={{ width: '100%' }}
                variant="contained"
                onClick={() => { setRestoCountdown(120); setOrderApproved(false); }}
              >
                Ulang
              </Button>
            </Box>
          </Box>
          </Modal>
        : null}
      {driverCountdown === 0 && detailOrder[0]?.DELIVERY_STATUS === 'Delivery Order'
        ? <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            open={true}
            onClose={handleCloseModalRestoCanceled}
          >
          <Box sx={style}>
            <Typography
              component="h3"
              id="modal-modal-title"
              sx={{ color: `${theme?.palette?.error}`, fontWeight: 'bold', textAlign: 'center' }}
              variant="h3"
            >
              Kami gagal menemukan driver untuk pesananmu
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ marginBlock: '1rem', textAlign: 'center' }}
              variant="body1"
            >
              Maaf, kita udah nyoba cari driver buat pesananmu, tapi kayaknya mereka lagi pada liburan. Jadi, pesanan ini harus kita batalin, maaf banget!
            </Typography>
            <Box gap={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                color="primary"
                size="medium"
                sx={{ width: '100%' }}
                variant="contained"
                onClick={() => navigate('/beranda')}
              >
                Ganti Detail Pesanan
              </Button>
              <Button
                color="primary"
                size="medium"
                sx={{ width: '100%' }}
                variant="outlined"
                onClick={() => navigate('/beranda')}
              >
                Kembali ke Beranda
              </Button>
            </Box>
          </Box>
          </Modal>
        : null}
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        open={openQR}
        onClose={toggleOpenModalQR}
      >
        <Box sx={style}>
          <Typography
            component="h3"
            id="modal-modal-title"
            sx={{ color: `${theme?.palette?.error}`, fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}
            variant="h3"
          >
            Kode QR Pesanan
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ marginBottom: '0.5rem', textAlign: 'center' }}
            variant="body1"
          >
            Tunjukkan kode QR ini kepada driver.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <img alt="QR" src={QR} />
          </Box>
        </Box>
      </Modal>
      {/* Modal untuk notif resto batalkan pesanan */}
      {/* <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            open={openModal}
            onClose={toggleOpenModalBatal}
          >
            <Box sx={style}>
              <Typography
                component="h3"
                id="modal-modal-title"
                sx={{ color: `${theme?.palette?.error}`, fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}
                variant="h3"
              >
                Maaf, resto batalin pesanan kamu
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ marginBottom: '0.5rem', textAlign: 'center' }}
                variant="body1"
              >
                Maaf banget resto batalin pesanan kamu karena item yang kamu pesan sudah habis. Kamu bisa ganti menu atau pesan di resto lain, ya!
              </Typography>
              <Box gap={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  color="primary"
                  size="medium"
                  sx={{ width: '100%' }}
                  variant="outlined"
                  onClick={toggleOpenModalBatal}
                >
                  Pilih Resto Lain
                </Button>
                <Button
                  color="primary"
                  size="medium"
                  sx={{ width: '100%' }}
                  variant="contained"
                  onClick={handleConfirmBatal}
                >
                  Ganti Menu
                </Button>
              </Box>
            </Box>
          </Modal> */}

      {/* Modal untuk notif resto tidak konfirmasi */}
      {/* <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            open={openModal}
            onClose={toggleOpenModalBatal}
          >
            <Box sx={style}>
              <Typography
                component="h3"
                id="modal-modal-title"
                sx={{ color: `${theme?.palette?.error}`, fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}
                variant="h3"
              >
                Resto Tidak Konfirmasi
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ marginBottom: '0.5rem', textAlign: 'center' }}
                variant="body1"
              >
                Maaf, Resto Holliwings lagi gak bisa konfirmasi pesanan. Mau diulang lagi atau batal pesan dan pilih resto lain?
              <Box gap={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  color="primary"
                  size="medium"
                  sx={{ width: '100%' }}
                  variant="outlined"
                  onClick={toggleOpenModalBatal}
                >
                  Pilih Resto Lain
                </Button>
                <Button
                  color="primary"
                  size="medium"
                  sx={{ width: '100%' }}
                  variant="contained"
                  onClick={handleConfirmBatal}
                >
                  Ulang
                </Button>
              </Box>
            </Box>
          </Modal> */}

      {/* </Container> */}
    </>
  );
};

Orders.displayName = 'Orders';

export default Orders;
