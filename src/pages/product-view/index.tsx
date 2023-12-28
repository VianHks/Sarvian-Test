/* eslint-disable linebreak-style */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  Container,
  Drawer,
  IconButton,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import {
  AddBoxFilled,
  IndeterminateCheckBoxFilled
} from '@nxweb/icons/material';

import { Grid } from '@components/material.js';
import { useAuth } from '@hooks/use-auth';
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
  price: string
  quantity: number
  userId: string
  value: string
  variantId: string
}

const DEFAULT_FORM_DATA: FormData = {
  channel: '',
  price: '',
  quantity: 0,
  userId: '',
  value: '',
  variantId: ''
};

const ProductView = () => {
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const channel = searchParams.get('channel');
  const productId = searchParams.get('productId');
  const variantId = searchParams.get('variantId');
  const command = useCommand((cmd) => cmd);

  const [store, dispatch] = useStore((state) => state?.productView);
  const [description, setDescription] = useState<DescriptionDataModel>(DEFAULT_DESCRIPTION);
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const productPrice = useMemo(() => store?.productDetails?.data?.product.variants[0]?.channelListings[0]?.price?.amount, [store]);
  const [total, setTotal] = useState(0);

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
    if (store) {
      const descriptionString = store?.productDetails?.data?.product.description || '';
      const descriptionObject = descriptionString
        ? JSON.parse(descriptionString)
        : DEFAULT_DESCRIPTION;

      if (productId && variantId && channel) {
        setFormData({
          ...formData,
          channel: channel || 'makan',
          userId: 'VXNlcjozMTc4NjkwMDc=',
          variantId: variantId || ''
        });
      }

      setFormData({
        ...formData,
        channel: channel || 'makan',
        userId: 'VXNlcjozMTc4NjkwMDc=',
        variantId: variantId || 'UHJvZHVjdFZhcmlhbnQ6NDEy'
      });

      setDescription(descriptionObject);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, count, productId, store, variantId]);

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
    command.productView.postCreateCheckout(formData, token || '')
      .then((response) => {
        if (response) {
          setTimeout(() => navigate(`/keranjang?checkoutId=${response}`), 1000);
        }
      });
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>

        <SwipeableTextMobileStepper images={store?.productDetails?.data?.product?.media || []} />
        <Card sx={{ borderRadius: '1rem', bottom: 0, height: '650px', left: 0, padding: '1rem 1.5rem', position: 'fixed', right: 0 }}>
        <Typography sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }} variant="h3">
          {store?.productDetails?.data?.product?.name}
        </Typography>
        <Grid container={true} justifyContent="space-between" spacing={2} sx={{ marginBottom: '0.5rem' }}>
          <Grid item={true} xs={6}>
            <Typography
              sx={{ color: theme?.palette?.primary?.main, fontWeight: 'bold', marginBottom: '0.25rem' }}
              variant="h5"
            >
              Rp {store?.productDetails?.data?.product?.variants[0]?.channelListings[0]?.price?.amount.toLocaleString('id-ID')}
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
              fullWidth={true}
              size="medium"
              variant="contained"
              onClick={handleAddToCart}
            >
              Tambah Keranjang
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
