import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { OrderCommand } from '@models/order/reducers';
import type { CheckoutsDataModel } from '@models/order/types';
import { useStore } from '@models/store';

import LogoBilo from '@assets/images/logoBiloCheckout.svg';

const SESSION_STORAGE_CHECKOUT = 'CheckoutId';
// NOTES: Edit keranjang harus di adjust dari segi logicnya

const Keranjang: PageComponent = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const location = useLocation();
  const { state } = location;
  const theme = useTheme();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action');
  const checkoutIdFromStorage = window.sessionStorage.getItem(SESSION_STORAGE_CHECKOUT) ?? '';
  // Const checkoutIdFromStorage = state.CheckoutId;

  const [store, dispatch] = useStore((state) => state?.order);
  const [orders, setOrders] = useState<CheckoutsDataModel[]>([]);

  const [selectAll, setSelectAll] = useState(false);
  const [childChecked, setChildChecked] = useState<Record<string, boolean>>({});
  const [isLoad, setIsLoad] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleCheckout = () => {
    navigate(`/checkout-dinein`);
  };

  const handleChildCheckboxChange =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      setChildChecked((prevChecked) => ({ ...prevChecked, [id]: isChecked }));
    };

  const handleDelete = () => {
    setIsLoad(true);

    if (childChecked) {
      const selectedItems = Object.entries(childChecked)
        .filter(([_orderId, isChecked]) => isChecked)
        .map(([orderId]) => orderId);

      if (selectedItems.length > 0) {
        OrderCommand.deleteCheckoutLines(
          checkoutIdFromStorage || '',
          selectedItems,
          token || ''
        )
          .then((res) => {
            if (res !== 'err') {
              OrderCommand.postCheckoutCustomerDetach(
                { checkoutId: checkoutIdFromStorage },
                token || ''
              );
              dispatch(
                OrderCommand.getCart(checkoutIdFromStorage || '', token || '')
              );
              window.sessionStorage.removeItem(SESSION_STORAGE_CHECKOUT);
              setIsLoad(false);
              navigate('/keranjang');
            } else {
              setAlert(!alert);
              setIsLoad(false);
            }
          });
      }
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allChildChecked: Record<string, boolean> = {};

    orders.forEach((order) => {
      allChildChecked[order.id] = !selectAll;
    });
    setChildChecked(allChildChecked);
  };

  useEffect(() => {
    const payload = {
      after: '',
      customerEmail: 'ridwan.azis@navcore.com',
      first: 100
    };

    dispatch(
      OrderCommand.getCheckouts(payload, token || '')
    );
  }, [dispatch, checkoutIdFromStorage, token]);

  useEffect(() => {
    if (store?.checkouts) {
      setOrders(store?.checkouts?.data);
    }
  }, [store?.checkouts]);

  return (
    <>
      <Snackbar autoHideDuration={3000} open={alert} sx={{ left: 'auto', position: 'relative', right: 'auto' }} onClose={handleDelete}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={handleDelete}>
          Gagal menghapus keranjang
        </Alert>
      </Snackbar>
      {isLoad === true
        ? <CircularProgress
            color="primary"
            variant="indeterminate" />

        : <Container>
        {orders.length === 0 || !checkoutIdFromStorage
          ? (
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
            <Typography
              sx={{ color: theme?.palette?.primary?.main, textAlign: 'center' }}
              variant="h5"
            >
              Keranjang kamu masih kosong...
            </Typography>
            <Typography sx={{ textAlign: 'center' }} variant="body1">
              Yuk masukan minuman & makanan favoritmu kedalam keranjang!
            </Typography>
          </>
          )
          : (
          <>
          {orders?.map((obj) => {
            const dateTime = new Date(obj?.created || '');
            const options: Intl.DateTimeFormatOptions = {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            };
            const createdTime = dateTime.toLocaleDateString('en-US', options);

            return (
              <Card sx={{ marginBottom: '1rem', padding: '1rem' }} key={obj.id}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}
                >
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'start'
                    }}
                  >
                    {action === 'edit'
                      ? (
                      <Checkbox
                        checked={selectAll}
                        inputProps={{ 'aria-label': 'controlled' }}
                        size="small"
                        onChange={handleSelectAll} />
                      )
                      : null}
                    <Avatar
                      src=""
                      sx={{ height: '24px', marginRight: '0.5rem', width: '24px' }} />
                    <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                      {obj.channel?.name}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'end' }}>
                    <Typography variant="caption">{createdTime}</Typography>
                  </Box>
                </Box>
                {obj?.lines.map((items) => {
                  const originalText = items?.metafields?.note;
                  const truncatedText =
                    items?.metafields?.note.length > 20
                      ? `${originalText.slice(0, 15)}...`
                      : originalText;

                  return (
                    <div key={items.id}>
                      <div style={{ marginBottom: '1rem' }}>
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
                          {action === 'edit'
                            ? (
                            <Grid
                              item={true}
                              sx={{
                                alignItems: 'top',
                                display: 'flex',
                                justifyContent: 'end',
                                paddingLeft: '0rem!important'
                              }}
                              xs={3}
                            >
                              <Checkbox
                                checked={childChecked[items.id] || false}
                                inputProps={{ 'aria-label': 'controlled' }}
                                size="small"
                                onChange={handleChildCheckboxChange(items.id)} />
                            </Grid>
                            )
                            : null}
                          <Grid
                            item={true}
                            sx={{ display: 'flex', justifyContent: 'center' }}
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
                                alt={items?.variant?.product?.name}
                                src={items?.variant?.product?.thumbnail?.url}
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
                            xs={action === 'edit' ? 6 : 9}
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
                                noWrap={true}
                                sx={{ fontWeight: 'bold', textAlign: 'start' }}
                                variant="body2"
                              >
                                {items?.variant?.product?.name}
                              </Typography>
                              <Typography
                                sx={{ fontWeight: 'bold' }}
                                variant="caption"
                              >
                                {items?.quantity} item
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
                                Rp.{' '}
                                {items?.variant?.pricing?.price?.gross?.amount.toLocaleString(
                                  'id-ID'
                                )}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            marginBottom: '1rem'
                          }}
                        >
                          <TextField
                            disabled={true}
                            id="detail"
                            size="small"
                            sx={{ width: action === 'edit' ? '50%' : '100%' }}
                            value={action === 'edit' ? truncatedText : originalText}
                            variant="outlined" />
                        </Box>
                      </div>
                    </div>
                  );
                })}
                <hr style={{ borderTop: 'dotted 1px' }} />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                    Total Pembayaran
                  </Typography>
                  <Typography
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                    variant="h5"
                  >
                    Rp{' '}
                    {obj?.totalPrice?.gross?.amount.toLocaleString(
                      'id-ID'
                    )}
                  </Typography>
                </Box>
                <Box>
                  {action !== 'edit'
                    ? (
                    <Button
                      color="primary"
                      fullWidth={true}
                      variant="contained"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                    )
                    : null}
                </Box>
              </Card>
            );
          })}
            {action === 'edit'
              ? (
              <Box
                bgcolor="white"
                bottom="0"
                left="0"
                padding="1.5rem"
                position="fixed"
                right="0"
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
                zIndex="1000"
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'start'
                  }}
                >
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                  <Typography variant="body1">Pilih Semua</Typography>
                </Box>
                <Button
                  color="error"
                  disabled={Object.keys(childChecked).length === 0}
                  size="small"
                  variant="contained"
                  onClick={handleDelete}
                >
                  Hapus
                </Button>
              </Box>
              )
              : null}
          </>
          )}
          </Container>}
    </>
  );
};

Keranjang.displayName = 'Keranjang';
export default Keranjang;
