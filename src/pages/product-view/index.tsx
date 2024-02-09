import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import {
  AddBoxFilled,
  IndeterminateCheckBoxFilled,
  ShareFilled,
  WestFilled
} from '@nxweb/icons/material';
import { Loader } from '@nxweb/icons/tabler';

import { Grid } from '@components/material.js';
import { useAuth } from '@hooks/use-auth';
import { OrderCommand } from '@models/order/reducers';
import { useCommand, useStore } from '@models/store';

import SwipeableTextMobileStepper from './slider';

interface DescriptionDataModel {
  blocks: [
    {
      data: {
        text: string
      }
      type: string
    }
  ]
  time: number
}

const DEFAULT_DESCRIPTION: DescriptionDataModel = {
  blocks: [
    {
      data: {
        text: ''
      },
      type: 'paragraph'
    }
  ],
  time: new Date().getTime()
};

interface FormData {
  channel: string
  deliveryMethodId: string
  lineId: string
  price: string
  quantity: number
  userId: string
  value: string
  variantId: string
}

const DEFAULT_FORM_DATA: FormData = {
  channel: '',
  deliveryMethodId: 'V2FyZWhvdXNlOjRhYjM1NjU4LTQ2MTMtNGUwYS04MWNlLTA4NjVlNjMyMzIwMA==',
  lineId: '',
  price: '',
  quantity: 0,
  userId: '',
  value: '',
  variantId: ''
};

interface Payload {
  after: string
  channel: string
  deliveryMethodId: string
  first: number
  lines: {
    metadata:
    {
      key: string
      value: string
    }[]
    price: string
    quantity: number
    variantId: string
  }[]
  userId: string
}

const SESSION_STORAGE_CHECKOUT = 'CheckoutId';

const ProductView = () => {
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const channel = searchParams.get('channel');
  const productId = searchParams.get('productId');
  const variantId = searchParams.get('variantId') || 'UHJvZHVjdFZhcmlhbnQ6NDEy';
  const command = useCommand((cmd) => cmd);

  const [store, dispatch] = useStore((state) => state);
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [description, setDescription] = useState<DescriptionDataModel>(DEFAULT_DESCRIPTION);
  const checkoutIdFromStorage = window.sessionStorage.getItem(SESSION_STORAGE_CHECKOUT) ?? '';
  const productPrice = useMemo(() => store?.productView?.productDetails?.data?.product.variants[0]?.channelListings[0]?.price?.amount, [store]);
  const [total, setTotal] = useState(0);

  const [isLoad, setIsLoad] = useState(false);
  const [count, setCount] = useState(0);
  const calculateTotalPrice = (count: number, productPrice: number): string => {
    const totalPrice = (count * productPrice).toString();

    return totalPrice;
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    dispatch(
      command.productView?.getProductDetails(
        productId || 'UHJvZHVjdDoxNzM=',
        token || ''
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (checkoutIdFromStorage !== '') {
      dispatch(OrderCommand.getCart(checkoutIdFromStorage, token || ''));
    }
  }, [checkoutIdFromStorage, dispatch, token]);

  useEffect(() => {
    if (store) {
      const descriptionString = store?.productView?.productDetails?.data?.product.description || '';
      const descriptionObject = descriptionString
        ? JSON.parse(descriptionString)
        : DEFAULT_DESCRIPTION;

      if (productId && variantId && channel) {
        setFormData({
          ...formData,
          channel: channel || 'makan',
          userId: 'VXNlcjoyMDUwMjQwNjE5',
          variantId: variantId || ''
        });
      }

      setFormData({
        ...formData,
        channel: channel || 'makan',
        userId: 'VXNlcjoyMDUwMjQwNjE5',
        variantId: variantId || 'UHJvZHVjdFZhcmlhbnQ6NDEy'
      });

      setDescription(descriptionObject);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, count, productId, store, variantId]);

  useEffect(() => {
    if (checkoutIdFromStorage && store?.order?.cart?.data?.checkout) {
      const { lines } = store.order.cart.data.checkout;
      const variantIndex = lines.findIndex((item) => item?.variant?.id === variantId);

      if (variantIndex !== -1) {
        const processedFormData = {
          channel: 'makan',
          deliveryMethodId: 'V2FyZWhvdXNlOjRhYjM1NjU4LTQ2MTMtNGUwYS04MWNlLTA4NjVlNjMyMzIwMA==',
          lineId: lines[variantIndex]?.id,
          price: lines[variantIndex]?.totalPrice?.gross?.amount.toString() || '',
          quantity: lines[variantIndex]?.quantity || 0,
          userId: 'VXNlcjoyMDUwMjQwNjE5',
          value: lines[variantIndex]?.metafields?.note || '',
          variantId: variantId || ''
        };

        setFormData(processedFormData);
        setCount(formData.quantity);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutIdFromStorage, store?.order]);

  useEffect(() => {
    if (count !== 0 && productPrice) {
      setTotal(count * productPrice);
      setFormData({
        ...formData,
        price: calculateTotalPrice(count, productPrice),
        quantity: count
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, productPrice]);

  const handleAddToCart = () => {
    setIsLoad(true);

    if (checkoutIdFromStorage !== '') {
      const payload = {
        checkoutId: checkoutIdFromStorage,
        lines: [
          {
            lineId: formData.lineId,
            note: formData?.value,
            price: formData.price,
            quantity: formData.quantity
          }
        ]
      };

      command.productView.putCheckout(payload, token || '')
        .then((response) => {
          if (response) {
            window.sessionStorage.setItem(SESSION_STORAGE_CHECKOUT, JSON.stringify(response));
            setTimeout(() => {
              setIsLoad(false);
              navigate(`/keranjang`, { state: { CheckoutId: response } });
            }, 1000);
          }
        });
    } else {
      const payload: Payload = {
        after: '',
        channel: 'makan',
        deliveryMethodId: 'V2FyZWhvdXNlOjRhYjM1NjU4LTQ2MTMtNGUwYS04MWNlLTA4NjVlNjMyMzIwMA==',
        first: 100,
        lines: [
          {
            metadata: [
              {
                key: 'note',
                value: formData.value
              }
            ],
            price: formData.price,
            quantity: formData.quantity,
            variantId: formData.variantId
          }
        ],
        userId: 'VXNlcjoyMDUwMjQwNjE5'
      };

      command.productView.postCreateCheckout(payload, token || '')
        .then((response) => {
          if (response) {
            window.sessionStorage.setItem(SESSION_STORAGE_CHECKOUT, JSON.stringify(response));
            setIsLoad(false);
            setTimeout(() => {
              setIsLoad(false);
              navigate(`/keranjang`);
            }, 1000);
          }
        });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <Box sx={{ alignItems: 'center', bgcolor: 'transparent', display: 'flex', justifyContent: 'space-between', left: 0, padding: '0rem 1rem', position: 'absolute', right: 0, zIndex: 1 }}>
        <IconButton aria-label="add to shopping cart" color="primary" onClick={() => navigate(-1)}>
          <Avatar sx={{ bgcolor: theme.palette.grey[100] }}>
            <WestFilled size={24} />
          </Avatar>
        </IconButton>
        <IconButton aria-label="add to shopping cart" color="primary">
          <Avatar sx={{ bgcolor: theme.palette.grey[100] }}>
            <ShareFilled size={24} />
          </Avatar>
        </IconButton>
      </Box>
        <SwipeableTextMobileStepper images={store?.productView?.productDetails?.data?.product?.media || []} />
        <Card sx={{ borderRadius: '1rem', bottom: 0, height: '650px', left: 0, padding: '1rem 1.5rem', position: 'fixed', right: 0 }}>
        <Typography sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }} variant="h3">
          {store?.productView?.productDetails?.data?.product?.name}
        </Typography>
        <Grid container={true} justifyContent="space-between" spacing={2} sx={{ marginBottom: '0.5rem' }}>
          <Grid item={true} xs={6}>
            <Typography
              sx={{ color: theme?.palette?.primary?.main, fontWeight: 'bold', marginBottom: '0.25rem' }}
              variant="h5"
            >
              Rp {store?.productView?.productDetails?.data?.product?.variants[0]?.channelListings[0]?.price?.amount.toLocaleString('id-ID')}
            </Typography>
          </Grid>
          <Grid item={true} xs="auto">
            <Typography sx={{ marginBottom: '0.25rem' }} variant="body2">
              Terjual 24 (hard code)
            </Typography>
          </Grid>
        </Grid>
        <Box>
          <Typography
            sx={{ marginBottom: '2rem', textAlign: 'left' }}
            variant="body1"
          >
            {description.blocks[0]?.data?.text}
          </Typography>
          <Typography
            sx={{
              color: 'black',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              textAlign: 'left'
            }}
            variant="h5"
          >
            Catatan
          </Typography>
          <TextField
            hiddenLabel={true}
            id="outlined-basic"
            placeholder="Tambahkan catatan ke menumu"
            size="small"
            sx={{ marginBottom: '1rem', width: '100%' }}
            type="text"
            value={formData?.value}
            variant="outlined"
            onChange={(e) => setFormData({ ...formData, value: e.target.value })} />
          <Grid
            container={true}
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}
          >
            <Grid item={true} xs={3}>
              <Typography
                sx={{
                  color: 'black',
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                  textAlign: 'left'
                }}
                variant="h5"
              >
                Jumlah
              </Typography>
            </Grid>
            <Grid
              item={true}
              sx={{ display: 'flex', justifyContent: 'end' }}
              xs={9}
            >
              <Box>
                <IconButton
                  aria-label="min"
                  size="small"
                  sx={{ color: 'black' }}
                  onClick={() => handleDecrement()}
                >
                  <IndeterminateCheckBoxFilled size={24} />
                </IconButton>
                <Typography
                  style={{
                    display: 'inline-block',
                    margin: '0 0.5rem'
                  }}
                  variant="body1"
                >
                  {count}
                </Typography>
                <IconButton
                  aria-label="plus"
                  size="small"
                  sx={{ color: 'black' }}
                  onClick={() => handleIncrement()}
                >
                  <AddBoxFilled size={24} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container={true}
            justifyContent="space-between"
            spacing={2}
            sx={{ marginBottom: '1rem' }}
          >
            <Grid item={true} xs={6}>
              <Typography
                sx={{
                  color: 'black',
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                  textAlign: 'left'
                }}
                variant="h5"
              >
                Harga Menu
              </Typography>
            </Grid>
            <Grid item={true} xs="auto">
              <Typography
                sx={{ color: theme?.palette?.primary?.main, fontWeight: 'bold', marginBottom: '0.25rem' }}
                variant="h5"
              >
                Rp {total.toLocaleString('id-ID')}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ bottom: 0, left: 0, padding: '1rem 1.5rem', position: 'fixed', right: 0, width: '100%' }}>
            <Button
              color="primary"
              disabled={isLoad === true}
              fullWidth={true}
              size="medium"
              variant="contained"
              onClick={handleAddToCart}
            >
              {isLoad === true ? <Loader /> : 'Tambah Keranjang' }
            </Button>
          </Box>
        </Box>
        </Card>

    </Box>
  );
};

ProductView.displayName = 'ProductView';
ProductView.layout = 'blank';
export default ProductView;
