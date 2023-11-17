/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/prefer-tag-over-role */
/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react';
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
import QR from '@assets/images/Dummy_QR.svg';
import MieBaso from '@assets/images/MieBaso.png';
import Pisan from '@assets/images/Pisan.png';

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

const DEFAULT_PESANAN: PesananDataModel = {
  count: 0,
  detail: '',
  foto: '',
  harga: 0,
  title: ''
};

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

const Orders: PageComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [orders, setOrders] = useState<PesananDataModel[]>([DEFAULT_PESANAN]);
  const [openModal, setOpenModal] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [orderApproved, setOrderApproved] = useState(true);

  const toggleOpenModalBatal = () => {
    setOpenModal(!openModal);
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
  }, [orders]);

  return (
    <Container>
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
          <Avatar src={MieBaso} sx={{ height: '50px', width: '50px' }} />
        </Grid>
        <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'start', paddingTop: '0rem!important' }} xs={8}>
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
        <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', paddingTop: '0rem!important' }} xs={2}>
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
                    2:00
                </Typography>
                </Box>}
        </Grid>
      </Grid>
      <hr />
      {orderApproved
        ? <>
            <Box>
                <Alert severity="info" sx={{ alignItems: 'center', backgroundColor: theme.palette.grey[100], borderColor: theme.palette.grey[100], display: 'flex' }} variant="outlined">
                    Perlihatkan kode dibawah kepada resto untuk mengkonfirmasi pesananmu
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
          {DUMMY_PESANAN.map((obj) => {
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
            Rp. 200.000
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
              Rp. 50.000
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
              Rp. 2.000
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
              Rp. 200
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
          <Box gap={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              color="primary"
              size="medium"
              sx={{ width: '100%' }}
              variant="outlined"
              onClick={toggleOpenModalBatal}
            >
              Batal
            </Button>
            <Button
              color="primary"
              size="medium"
              sx={{ width: '100%' }}
              variant="contained"
              onClick={handleConfirmBatal}
            >
              Lanjut
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

Orders.displayName = 'Orders';

export default Orders;
