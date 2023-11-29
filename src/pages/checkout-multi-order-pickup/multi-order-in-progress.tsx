/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/prefer-tag-over-role */
/* eslint-disable linebreak-style */
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

import Bakar from '@assets/images/Bakar.png';
import Cake from '@assets/images/Cake.svg';
import Vodka from '@assets/images/Dessert.png';
import QR from '@assets/images/Dummy_QR.svg';
import TelponLogo from '@assets/images/FotoTelpon.svg';
import MieBaso from '@assets/images/MieBaso.png';
import Pisan from '@assets/images/Pisan.png';
import Roti from '@assets/images/Roti.png';
import TokoHw from '@assets/images/TokoHw.svg';

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
  orderApproved: boolean
  status: string
}

const DUMMY_PESANAN: PesananDataModel[] = [
  {
    restoId: 1,
    restoName: 'Resto Bundo Gilo',
    restoFoto: `${MieBaso}`,
    detailOrder: [
      {
        count: 1,
        detail: 'Nasi di pisah',
        foto: `${Pisan}`,
        harga: 25000,
        title: 'Ayam Goreng Pisan'
      },
      {
        count: 1,
        detail: 'Kuah Yang Banyak',
        foto: `${MieBaso}`,
        harga: 20000,
        title: 'Baso Campur'
      }
    ],
    catatan: 'Baso nya jangan sampai dingin',
    orderApproved: false,
    status: 'Resto tidak konfirmasi'
  },
  {
    restoId: 2,
    restoName: 'Cake Mamah',
    restoFoto: `${TelponLogo}`,
    detailOrder: [
      {
        count: 1,
        detail: 'Gulanya Sedikit',
        foto: `${Cake}`,
        harga: 100000,
        title: 'Cake Wonder'
      },
      {
        count: 1,
        detail: 'Rotinya Potong dulu',
        foto: `${Roti}`,
        harga: 150000,
        title: 'Roti isi'
      }
    ],
    catatan: 'Rotinya Harus anget',
    orderApproved: true,
    status: 'Pesanan disiapkan resto'
  },
  {
    restoId: 3,
    restoName: 'HolyWings',
    restoFoto: `${TokoHw}`,
    detailOrder: [
      {
        count: 1,
        detail: 'Dingin Ya',
        foto: `${Vodka}`,
        harga: 400000,
        title: 'Vodka Crystal'
      },
      {
        count: 1,
        detail: 'Extra Keju',
        foto: `${Bakar}`,
        harga: 75000,
        title: 'Chicken Wings HW'
      }
    ],
    catatan: 'Vodkanya Yang Crystal',
    orderApproved: true,
    status: 'Pesanan sudah siap'
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
  catatan: '',
  orderApproved: true,
  status: ''
};

const Steps = [
  {
    active: 1,
    description: `Gg. Bahagia Selalu`,
    label: 'Lokasi Kamu'
  },
  {
    active: 2,
    description: `Gg. Murah Selalu`,
    label: 'Alamat Resto'
  },
  {
    active: 3,
    description: `Gg. Suka Kawin`,
    label: 'Alamat Resto'
  }
];

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...ownerState.active && {
      color: '#1D2939'
    },
    '& .QontoStepIcon-completedIcon': {
      color: '#1D2939',
      zIndex: 1,
      fontSize: 18
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor'
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

const MultiOrderInProgress: PageComponent = () => {
  const [biayaLayanan, setBiayaLayanan] = useState(2000);
  const [fasPembayaran, setFasPembayaran] = useState(600);
  const [totalmenuCost, settotalMenuCost] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const [orders, setOrders] = useState<PesananDataModel[]>([DEFAULT_PESANAN]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalSiapkanPesanan, setModalSiapkanPesanan] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [orderApproved, setOrderApproved] = useState(true);

  const toggleOpenModalBatal = () => {
    setOpenModal(!openModal);
  };

  const toggleOpenModalSiapkanPesanan = () => {
    setModalSiapkanPesanan(!openModalSiapkanPesanan);
  };

  const handleConfirmBatal = () => {
    navigate('./lanjut');
  };

  const toggleOpenModalQR = () => {
    setOpenQR(!openQR);
  };

  useEffect(() => {
    if (DUMMY_PESANAN) {
      setOrders(DUMMY_PESANAN);
    }

    const totalMenuCost = orders.reduce(
      (total, order) => total +
        order.detailOrder.reduce(
          (subtotal, item) => subtotal + item.harga * item.count,
          0
        ),
      0
    );

    settotalMenuCost(totalMenuCost);
  }, [orders]);

  return (
    <Container>
      {DUMMY_PESANAN.map((order) => (
      <Fragment key={order.restoId}>
      <Grid container={true} spacing={2} sx={{ opacity: order.orderApproved ? 1 : 0.5 }}>
        <Grid
          item={true}
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
          xs={2}
        >
          <Avatar src={MieBaso} sx={{ height: '50px', width: '50px' }} />
        </Grid>
        <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'start', paddingTop: '0rem!important' }} xs={8}>
          <Box>
            <Typography
              sx={{ fontWeight: 'bold', textAlign: 'start' }}
              variant="h6"
            >
            {order.restoName}
            </Typography>
            <Typography variant="body2">
              {order.status}
            </Typography>
          </Box>
        </Grid>

        <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', paddingTop: '0rem!important' }} xs={2}>
            {order.orderApproved
              ? <Box gap={2} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'end', marginRight: '1rem' }}>
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
                    2:00
                </Typography>
                </Box>}
        </Grid>
      </Grid>
      <hr />
      </Fragment>
      ))}

      {orderApproved
        ? <>
            <Box sx={{ marginBottom: '1rem' }}>
                <Button
                  color="primary"
                  size="medium"
                  sx={{ width: '100%' }}
                  variant="contained"
                  onClick={toggleOpenModalSiapkanPesanan}
                >
                  Siapkan Pesanan Saya
                </Button>
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
                <Alert color="info" severity="info" sx={{ alignItems: 'center', backgroundColor: '#D5ECFE', borderColor: theme.palette.grey[100], display: 'flex' }} variant="outlined">
                  <Typography color="#1050AE" sx={{ backgroundColor: '#D5ECFE', fontSize: '12px' }} variant="h5">
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

      <Typography sx={{ fontWeight: 'bold' }} variant="h5">
        Pesanan Kamu
      </Typography>
      {DUMMY_PESANAN.map((order) => (
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
        Pengantaran
      </Typography>
      <Card sx={{ marginBottom: '1rem' }}>
        <CardContent sx={{ padding: '1rem 1rem 1rem 1rem!important' }}>
            <Stepper orientation="vertical">
                {Steps.map((step) => (
                <Step active={true} key={step.label}>
                    <StepLabel StepIconComponent={QontoStepIcon} sx={{ marginLeft: '0.5rem' }}>
                        {step.label}
                    </StepLabel>
                    <StepContent>
                        <Typography>{step.description}</Typography>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
        </CardContent>
      </Card>
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
            Rp. 2.000.000
          </Typography>
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
              Rp. {(totalmenuCost + biayaLayanan + fasPembayaran).toLocaleString('id-ID')}
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
      <Box sx={{ bottom: 0, left: 0, padding: '1rem', position: 'fixed', right: 0 }}>
        <Button color="error" fullWidth={true} sx={{ marginBottom: '1rem' }} variant="contained" onClick={toggleOpenModalBatal}>
            Batalkan Pesanan
        </Button>
        <Button color="primary" fullWidth={true} variant="outlined">
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
            sx={{ color: `${theme?.palette?.error}`, fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}
            variant="h3"
          >
            Yakin mau batalin pesanan kamu?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ marginBottom: '0.5rem', textAlign: 'center' }}
            variant="body1"
          >
            Inget, ya. Pesanan yang kamu batalin akan hilang dari daftar manapun. Masih yakin mau batalin pesanan?
          </Typography>
          <Box gap={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        open={openModalSiapkanPesanan}
        onClose={toggleOpenModalSiapkanPesanan}
      >
        <Box sx={style}>
          <Typography
            component="h3"
            id="modal-modal-title"
            sx={{ color: `${theme?.palette?.error}`, fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}
            variant="h3"
          >
            Yakin pesananmu mau disiapin sekarang?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ marginBottom: '0.5rem', textAlign: 'center' }}
            variant="body1"
          >
            Setelah konfirmasi, resto langsung siapin pesanan kamu.
          </Typography>
          <Box gap={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Button
              color="primary"
              size="medium"
              sx={{ width: '100%', textTransform: 'none', fontSize: '1rem' }}
              variant="contained"
              onClick={toggleOpenModalSiapkanPesanan}
            >
              Siapkan Sekarang
            </Button>
            <Button
              color="primary"
              size="medium"
              sx={{ width: '30%' }}
              variant="outlined"
              onClick={toggleOpenModalSiapkanPesanan}
            >
              Nanti
            </Button>
          </Box>
        </Box>
      </Modal>
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

    </Container>
  );
};

MultiOrderInProgress.displayName = 'MultiOrderInProgress';

export default MultiOrderInProgress;
