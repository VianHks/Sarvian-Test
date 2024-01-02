/* eslint-disable no-lonely-if */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable linebreak-style */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { DEFAULT_LINES, OrderCommand } from '@models/order/reducers';
import type { linesDataModel } from '@models/order/types';
import { useCommand, useStore } from '@models/store';

const SESSION_STORAGE_CHECKOUT = 'CheckoutId';

const Keranjang: PageComponent = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action');
  const checkoutId = searchParams.get('checkoutId');
  const checkoutIdFromStorage = window.sessionStorage.getItem(SESSION_STORAGE_CHECKOUT) ?? '';
  const command = useCommand((cmd) => cmd);

  const [store, dispatch] = useStore((state) => state?.order);
  const [orders, setOrders] = useState<linesDataModel[]>(DEFAULT_LINES);
  const [checkedItems, setCheckedItems] = useState<Record<string, linesDataModel | boolean>>({});
  const inputTime = useMemo(() => store?.cart?.data?.checkout?.created, [store?.cart]);
  const dateTime = new Date(inputTime || '');

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const createdTime = dateTime.toLocaleDateString('en-US', options);

  const [selectAll, setSelectAll] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, orderId: string) => {
    const isChecked = event.target.checked;

    setCheckedItems((prevCheckedItems) => {
      if (isChecked) {
        const selectedItem = orders.find((item) => item?.id === orderId);

        return { ...prevCheckedItems, [orderId]: selectedItem } as Record<string, linesDataModel | boolean>;
      }

      const { [orderId]: omit, ...rest } = prevCheckedItems;

      return rest as Record<string, linesDataModel | boolean>;
    });
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    setSelectAll(isChecked);
    setCheckedItems((_prevCheckedItems) => {
      if (isChecked) {
        const selectedItems: Record<string, linesDataModel | boolean> = {};

        orders.forEach((item) => {
          selectedItems[item.variant?.name] = item;
        });

        return selectedItems;
      }

      return {};
    });
  };

  const handleDelete = () => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.filter((order) => !checkedItems[order?.variant?.name]);

      setCheckedItems({});

      return updatedOrders;
    });
  };

  useEffect(() => {
    dispatch(
      OrderCommand.getCart(checkoutId || '', token || '')
    );
  }, [dispatch, checkoutId, token]);

  useEffect(() => {
    if (store?.cart) {
      setOrders(store?.cart?.data?.checkout?.lines);
    }
  }, [store?.cart]);

  return (
    <Container>
      {orders.map((obj) => {
        const originalText = obj?.metafields?.note;
        const truncatedText = obj?.metafields?.note.length > 20 ? `${originalText.slice(0, 15)}...` : originalText;

        return (
          <Card key={obj.id} sx={{ marginBottom: '1rem', padding: '1rem' }}>
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
                ? <Checkbox
                    checked={checkedItems[obj.variant?.name] !== undefined && typeof checkedItems[obj.variant?.name] !== 'boolean'}
                    inputProps={{ 'aria-label': 'controlled' }}
                    size="small"
                    onChange={(event) => handleChange(event, obj.variant?.name)} />
                : null}
              <Avatar
                src=""
                sx={{ height: '24px', marginRight: '0.5rem', width: '24px' }} />
              <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                {store?.cart?.data?.checkout?.channel?.name}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'end' }}>
              <Typography variant="caption">{createdTime}</Typography>
            </Box>
          </Box>
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
                ? <Grid
                    item={true}
                    sx={{ alignItems: 'top', display: 'flex', justifyContent: 'end', paddingLeft: '0rem!important' }}
                    xs={3}
                  >
                    <Checkbox
                      checked={checkedItems[obj.variant?.name] !== undefined && typeof checkedItems[obj.variant?.name] !== 'boolean'}
                      inputProps={{ 'aria-label': 'controlled' }}
                      size="small"
                      onChange={(event) => handleChange(event, obj?.variant?.product?.name)} />
                  </Grid>
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
                    alt={obj?.variant?.product?.name}
                    src={obj?.variant?.product?.thumbnail?.url}
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
                    sx={{ fontWeight: 'bold', textAlign: 'start' }}
                    variant="body2"
                  >
                    {obj?.variant?.product?.name}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 'bold' }}
                    variant="caption"
                  >
                    {obj?.quantity} item
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
                    Rp. {obj?.variant?.pricing?.price?.gross?.amount.toLocaleString('id-ID')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: '1rem' }}>
              <TextField
                id="detail"
                size="small"
                sx={{ width: action === 'edit' ? '50%' : '100%' }}
                value={action === 'edit' ? truncatedText : originalText}
                variant="outlined" />
            </Box>
          </div>

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
              Rp {obj?.totalPrice?.gross?.amount.toLocaleString('id-ID')}
            </Typography>
          </Box>
          <Box>
            <Button color="primary" fullWidth={true} variant="contained">
              Checkout
            </Button>
          </Box>
          </Card>
        );
      })}
      {action === 'edit'
        ? <Box
            bgcolor="white"
            bottom="0"
            left="0"
            padding="1.5rem"
            position="fixed"
            right="0"
            sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
            zIndex="1000"
          >
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'start' }}>
            <Checkbox
              checked={selectAll}
              onChange={handleSelectAll} />
                <Typography variant="body1">Pilih Semua</Typography>
            </Box>
              <Button
                color="error"
                size="small"
                variant="contained"
                onClick={() => handleDelete()}
              >
                Hapus
              </Button>
          </Box>
        : null}
    </Container>
  );
};

Keranjang.displayName = 'Keranjang';
export default Keranjang;
