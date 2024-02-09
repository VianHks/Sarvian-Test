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
  Container,
  Divider,
  Modal,
  styled,
  TextField,
  useTheme
} from '@mui/material';

import { KeyboardArrowDownFilled, QRCodeFilled } from '@nxweb/icons/material';
import { Check } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@components/material.js';
import { useAuth } from '@hooks/use-auth';
import { OrderCommand } from '@models/order/reducers';
import type { OrderDataModel } from '@models/order/types';
import { useStore } from '@models/store';

import QR from '@assets/images/Dummy_QR.svg';
import MieBaso from '@assets/images/MieBaso.png';

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

const DEFAULT_ORDER_DETAILS = {
  channel: {
    id: '',
    isActive: false,
    metadata: [],
    name: '',
    slug: ''
  },
  deliveryMethod: {
    __typename: '',
    id: '',
    name: ''
  },
  id: '',
  isPaid: false,
  lines: [],
  metafields: {
    buyer: '',
    conversation_id_buyer: '',
    conversation_id_driver: '',
    conversation_id_seller: '',
    driver: '',
    estimation: '',
    is_ready: '',
    note: '',
    order_type: '',
    seller: ''
  },
  number: '',
  paymentStatus: '',
  status: '',
  user: {
    addresses: [],
    email: '',
    firstName: '',
    id: '',
    lastName: ''
  },
  userEmail: ''
};

const SESSION_STORAGE_ORDER = 'orderId';

const Orders: PageComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);

  const [store, dispatch] = useStore((state) => state);
  const [detailOrder, setDetailOrder] = useState<OrderDataModel>(DEFAULT_ORDER_DETAILS);
  const [openModal, setOpenModal] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [restoCountdown, setRestoCountdown] = useState(120);
  const [orderApproved, setOrderApproved] = useState(false);
  const [openModalRestoCanceled, setOpenModalRestoCanceled] = useState(false);
  const [isDriverOnTheWay, setIsDriverOnTheWay] = useState(false);

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
    OrderCommand.postCancelOrder({ orderId: orderId || '' }, token || '').then(() => {
      navigate('/beranda');
      window?.sessionStorage?.removeItem(SESSION_STORAGE_ORDER);
    });
  };

  const toggleOpenModalQR = () => {
    setOpenQR(!openQR);
  };

  const handleCloseModalRestoCanceled = () => {
    setOpenModalRestoCanceled(!openModalRestoCanceled);
  };

  useEffect(() => {
    dispatch(
      OrderCommand.getOrderDetails(orderId || '', token || '')
    );
  }, [dispatch]);

  useEffect(() => {
    if (store?.order?.orderDetails?.data?.order) {
      setDetailOrder(store?.order?.orderDetails?.data?.order);
    }
  }, [store?.order?.orderDetails?.data]);

  return (
    <Container sx={{ marginBottom: '-5.5rem', marginTop: '-0.25rem' }}>
      {/* DELIVERY SCENARIO */}
      {/* {detailOrder?.metafields?.order_type === 'delivery' && isDriverOnTheWay === true
        ? <img alt="map" src={map} style={{ height: '400px', marginInline: '-1rem', marginTop: '-1.2rem', width: '360px' }} />
        : null} */}
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
              color={theme.palette.grey[900]}
              sx={{ fontWeight: 'bold', textAlign: 'start' }}
              variant="h6"
            >
              {detailOrder?.channel?.name}
            </Typography>
            <Typography color={theme.palette.grey[900]} variant="body2">
              Menunggu konfirmasi resto(hardcode)
            </Typography>
          </Box>
        </Grid>
        <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', paddingTop: '0rem!important' }} xs={orderApproved ? 4 : 2}>
          {/* ORDER APPROVED */}
          {/* {orderApproved
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
              <Typography color={theme.palette.grey[900]} variant="caption">
                {formatTime(restoCountdown)}
              </Typography>
              </Box>} */}
          <Box>
            <Typography color={theme.palette.grey[900]} variant="caption">
              {formatTime(restoCountdown)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <hr />
      {/* DELIVERY SCENARIO */}
      {/* {detailOrder?.metafields?.order_type === 'delivery'
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
        : null} */}
      {detailOrder?.metafields?.order_type === 'pickUp' && orderApproved
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
        : detailOrder?.metafields?.order_type === 'delivery' && orderApproved && isDriverOnTheWay
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
      <Typography color={theme.palette.grey[900]} fontWeight="bold" marginBlock="1rem" variant="h5">
        Pesanan Kamu
      </Typography>
      <Accordion expanded={true} sx={{ borderRadius: '0.5rem', marginBottom: '1rem' }}>
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
            <Typography color={theme.palette.grey[900]} fontWeight="bold" variant="body1">
              {detailOrder?.channel?.name}
            </Typography>
          </Box>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          {detailOrder?.lines.map((obj) => {
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
                        src={obj.thumbnail?.url}
                        style={{ borderRadius: '8px', maxHeight: '100%', maxWidth: '100%' }} />
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
                        color={theme.palette.grey[900]}
                        sx={{ fontWeight: 'bold', textAlign: 'start' }}
                        variant="body2"
                      >
                        {obj.productName}
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
                        color={theme.palette.grey[700]}
                        sx={{ fontWeight: 'bold', textAlign: 'start' }}
                        variant="body2"
                      >
                        Rp. {obj.unitPrice?.gross?.amount.toLocaleString('id-ID')}
                      </Typography>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          color={theme.palette.grey[900]}
                          style={{
                            display: 'inline-block',
                            margin: '0 0.5rem'
                          }}
                          variant="body2"
                        >
                          {obj.quantity} Item
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
                    value={obj.metadata.length > 0 ? obj.metadata[0].value : ''}
                    variant="outlined" />
                </Box>
              </div>
            );
          })}
          <Typography
            color={theme.palette.grey[900]}
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
              value={detailOrder?.metafields?.note || ''}
              variant="outlined" />
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* DELIVERY SCENARIO */}
      {/* <Typography
        color={theme.palette.grey[900]}
        sx={{ fontWeight: 'bold', marginBottom: '0.5rem', marginTop: '1rem' }}
        variant="h5"
      >
        Pengantaran
      </Typography>
      <Card sx={{ marginBottom: '1rem' }}>
        <CardContent sx={{ padding: '1rem 1rem 1rem 1rem!important' }}>
          <Stepper orientation="vertical">
            <Step active={true}>
              <StepLabel StepIconComponent={QontoStepIcon} sx={{ marginLeft: '0.5rem' }}>
                <Typography color={theme.palette.grey[900]} fontWeight="bold">Lokasi Kamu</Typography>
              </StepLabel>
              <StepContent>
                <Typography color={theme.palette.grey[900]}>{detailOrder?.user?.addresses[0]?.streetAddress1}</Typography>
              </StepContent>
            </Step>
            <Step active={true}>
              <StepLabel StepIconComponent={QontoStepIcon} sx={{ marginLeft: '0.5rem' }}>
                <Typography color={theme.palette.grey[900]} fontWeight="bold">{detailOrder?.channel?.name}</Typography>
              </StepLabel>
              <StepContent>
                <Typography color={theme.palette.grey[900]}>{detailOrder?.channel?.metadata.find((item) => item.key === 'address')?.value}</Typography>
              </StepContent>
            </Step>
          </Stepper>
        </CardContent>
      </Card> */}
      <Typography color={theme.palette.grey[900]} fontWeight="Bold" marginBottom="1rem" variant="h5">
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
          color={theme.palette.primary.main}
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
            color={theme.palette.grey[900]}
            sx={{ fontWeight: 'bold' }}
            variant="h5"
          >
            Rp. {detailOrder?.lines[0]?.totalPrice?.gross?.amount?.toLocaleString('id-ID')}
          </Typography>
        </Box>
      </Box>
      <Card>
        <CardContent sx={{ padding: '1rem 1rem 1rem 1rem!important' }}>
          <Typography
            color={theme.palette.grey[900]}
            fontWeight="bold"
            sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
            variant="h5"
          >
            Detail Pembayaran
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              color={theme.palette.grey[900]}
              sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
              variant="body2"
            >
              Total Pembayaran
            </Typography>
            <Typography
              color={theme.palette.grey[900]}
              sx={{
                fontWeight: 'medium',
                marginBottom: '0.5rem',
                textAlign: 'end'
              }}
              variant="body2"
            >
              Rp. {detailOrder?.lines[0]?.totalPrice?.gross?.amount?.toLocaleString('id-ID')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              color={theme.palette.grey[900]}
              sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
              variant="body2"
            >
              Biaya Layanan
            </Typography>
            <Typography
              color={theme.palette.grey[900]}
              sx={{
                fontWeight: 'medium',
                marginBottom: '0.5rem',
                textAlign: 'end'
              }}
              variant="body2"
            >
              Rp. -
            </Typography>
          </Box>
          {/* DELIVERY SCENARIO */}
          {/* {detailOrder[0]?.DELIVERY_STATUS === 'Delivery Order'
            ? <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  color={theme.palette.grey[900]}
                  sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
                  variant="body2"
                >
                  Biaya Parkir
                </Typography>
                <Typography
                  color={theme.palette.grey[900]}
                  sx={{
                    fontWeight: 'medium',
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
                  color={theme.palette.grey[900]}
                  sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
                  variant="body2"
                >
                  Biaya Ongkir
                </Typography>
                <Typography
                  color={theme.palette.grey[900]}
                  sx={{
                    fontWeight: 'medium',
                    marginBottom: '0.5rem',
                    textAlign: 'end'
                  }}
                  variant="body2"
                >
                  Rp. -
                </Typography>
              </Box>
              </>
            : null} */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              color={theme.palette.grey[900]}
              sx={{ marginBottom: '0.5rem', textAlign: 'start' }}
              variant="body2"
            >
              Biaya Fasilitas Pembayaran
            </Typography>
            <Typography
              color={theme.palette.grey[900]}
              sx={{
                fontWeight: 'medium',
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
      <Box marginTop="2rem">
        <Button color="error" fullWidth={true} sx={{ borderRadius: '0.5rem', marginBottom: '1rem', padding: '8px 22px' }} variant="contained" onClick={toggleOpenModalBatal}>
          Batalkan Pesanan
        </Button>
        <Button color="primary" fullWidth={true} sx={{ borderRadius: '0.5rem', padding: '8px 22px' }} variant="outlined" onClick={() => navigate('/pusat-bantuan')}>
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
      {/* DELIVERY SCENARIO */}
      {/* {restoCountdown === 0 && detailOrder?.metafields?.order_type === 'Delivery Order'
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
      {driverCountdown === 0 && detailOrder?.metafields?.order_type === 'Delivery Order'
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
        : null} */}
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
    </Container>
  );
};

Orders.displayName = 'Orders';

export default Orders;
