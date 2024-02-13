import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import { ConsoleLogger } from '@nxweb/core';
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

interface VariantValueModel {
  name: string
  id: string
}

interface VariantModel {
  choices: VariantValueModel[]
  id: string
  variant: string
}

const ProductView = () => {
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const channel = searchParams.get('channel');
  const productId = searchParams.get('productId');
  const variantId = searchParams.get('variantId') || 'UHJvZHVjdFZhcmlhbnQ6NDEy';
  const idUser = 'VXNlcjoyMDUwMjQwNjE5';
  const command = useCommand((cmd) => cmd);

  const [store, dispatch] = useStore((state) => state);
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [variants, setVariants] = useState<VariantModel[]>([]);
  const [description, setDescription] = useState<DescriptionDataModel>(DEFAULT_DESCRIPTION);
  const checkoutIdFromStore = store?.productView?.checkoutId?.checkout_id || '';
  const productPrice = useMemo(() => store?.productView?.productDetails?.data?.product.variants[0]?.channelListings[0]?.price?.amount, [store]) || 0;

  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});

  const [variantValue, setVariantValue] = useState<string[]>([]);
  const [attributeValue, setAttributeValue] = useState<string[]>([]);
  const variantPrice = variantValue.map((v) => parseInt(v, 10)).reduce((atr, num) => atr + num, 0);
  const attributePrice = attributeValue.map((v) => parseInt(v, 10)).reduce((atr, num) => atr + num, 0);

  const [isLoad, setIsLoad] = useState(false);
  const [count, setCount] = useState(1);
  const calculateTotalPrice = (count: number, productPrice: number): string => {
    const totalPrice = (count * productPrice).toString();

    return totalPrice;
  };

  const total = (count * productPrice) + (count * variantPrice) + (count * attributePrice);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleVariantChange = (id: string, name: string, choice: { name: string, id: string }, price: string, index: number) => {
    setSelectedChoices((prevSelectedChoices) => ({
      ...prevSelectedChoices,
      [`${id}:${name}`]: `${choice.id}:${choice.name}`
    }));

    setVariants((prevVariants) => {
      const existingVariantIndex = prevVariants.findIndex((variant) => variant.id === id);

      if (existingVariantIndex !== -1) {
        const updatedVariants = [...prevVariants];
        const updatedChoices = [{ id: choice.id, name: choice.name }];

        updatedVariants[existingVariantIndex] = { id, variant: name, choices: updatedChoices };

        return updatedVariants;
      }

      const newVariant: VariantModel = {
        id,
        variant: name,
        choices: [{ id: choice.id, name: choice.name }]
      };

      return [...prevVariants, newVariant];
    });

    setVariantValue((prevValues) => {
      const newValues = [...prevValues];

      if (newValues[index] === price) {
        newValues[index] = '';
      } else {
        newValues[index] = price;
      }

      const filteredValues = newValues.filter((value) => value !== '');

      return filteredValues;
    });
  };

  const handleMultiselectChange = (id: string, name: string, choice: { name: string, id: string }, price: string, index: number, length: number) => {
    setVariants((prevVariants) => {
      const existingVariantIndex = prevVariants.findIndex((variant) => variant.id === id);

      if (existingVariantIndex !== -1) {
        const updatedVariants = [...prevVariants];
        const updatedChoices = [...updatedVariants[existingVariantIndex].choices];

        const existingChoiceIndex = updatedChoices.findIndex((c) => c.id === choice.id);

        if (existingChoiceIndex === -1) {
          updatedChoices.push({
            id: choice.id,
            name: choice.name
          });
        } else {
          updatedChoices.splice(existingChoiceIndex, 1);
        }

        updatedVariants[existingVariantIndex].choices = updatedChoices;

        return updatedVariants;
      }

      // For 'MULTISELECT' type, allow multiple choices
      const newVariant: VariantModel = {
        id,
        variant: name,
        choices: [{ id: choice.id, name: choice.name }]
      };

      return [...prevVariants, newVariant];
    });

    if (attributeValue.length === 0) {
      const defaultValues = Array.from({ length }, () => '0');

      setAttributeValue(defaultValues);
    }

    setAttributeValue((prevValues) => {
      const newValues = [...prevValues];

      newValues[index] = newValues[index] === price ? '0' : price;

      const anyChecked = newValues.some((value) => value !== '0');

      if (!anyChecked) {
        newValues.fill('0');
      }

      return newValues;
    });
  };

  useEffect(() => {
    dispatch(
      command.productView?.getProductDetails(
        productId || 'UHJvZHVjdDoxNzM=',
        token || ''
      )
    );
    dispatch(
      command.productView.getCheckoutId({ checkout_id: checkoutIdFromStore })
    );
  }, [dispatch]);

  useEffect(() => {
    if (store?.productView?.productDetails?.data?.product?.productType?.hasVariants === true) {
      dispatch(
        command.productView?.getProductTypeDetails(
          store?.productView?.productDetails?.data?.product?.productType?.id,
          token || ''
        )
      );
    }
  }, [store?.productView?.productDetails?.data?.product?.productType, dispatch, token]);

  useEffect(() => {
    if (checkoutIdFromStore) {
      dispatch(OrderCommand.getCart(checkoutIdFromStore, token || ''));
      dispatch(OrderCommand.getCheckoutDetails(checkoutIdFromStore, token || ''));
    }
  }, [checkoutIdFromStore, dispatch, token]);

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
          userId: idUser,
          variantId: variantId || ''
        });
      }

      setFormData({
        ...formData,
        channel: channel || 'makan',
        userId: idUser,
        variantId: variantId || 'UHJvZHVjdFZhcmlhbnQ6NDEy'
      });

      setDescription(descriptionObject);

      const variantMetadata = store?.order?.checkoutDetails?.data?.checkout?.lines[0]?.metadata.filter((item) => item.key === 'variant')[0];

      if (variantMetadata) {
        const parsedVariants = JSON.parse(variantMetadata.value);

        setVariants(parsedVariants);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, count, productId, store, variantId]);

  useEffect(() => {
    if (checkoutIdFromStore && store?.order?.cart?.data?.checkout) {
      const { lines } = store.order.cart.data.checkout;
      const variantIndex = lines.findIndex((item) => item?.variant?.id === variantId);

      if (variantIndex !== -1) {
        const processedFormData = {
          channel: 'makan',
          deliveryMethodId: 'V2FyZWhvdXNlOjRhYjM1NjU4LTQ2MTMtNGUwYS04MWNlLTA4NjVlNjMyMzIwMA==',
          lineId: lines[variantIndex]?.id,
          price: lines[variantIndex]?.totalPrice?.gross?.amount.toString() || '',
          quantity: lines[variantIndex]?.quantity || 0,
          userId: idUser,
          value: lines[variantIndex]?.metafields?.note || '',
          variantId: variantId || ''
        };

        setFormData(processedFormData);
        setCount(formData.quantity);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutIdFromStore, store?.order]);

  const handleAddToCart = () => {
    setIsLoad(true);

    if (checkoutIdFromStore) {
      const payload = {
        checkoutId: checkoutIdFromStore,
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
            dispatch(command.productView.getCheckoutId({ checkout_id: response }));
            setTimeout(() => {
              setIsLoad(false);
              // Navigate(`/keranjang`, { state: { CheckoutId: response } });
              navigate(`/checkout-dinein?checkoutId=${response}`, { state: { CheckoutId: response } });
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
              },
              {
                key: 'variant',
                value: JSON.stringify(variants)
              },
              {
                key: 'total',
                value: String(total / count)
              }
            ],
            price: calculateTotalPrice(count, productPrice),
            quantity: count,
            variantId: formData.variantId
          }
        ],
        userId: idUser
      };

      command.productView.postCreateCheckout(payload, token || '')
        .then((response) => {
          if (response) {
            dispatch(command.productView.getCheckoutId({ checkout_id: response }));
            setIsLoad(false);
            setTimeout(() => {
              setIsLoad(false);
              navigate(`/checkout-dinein?checkoutId=${response}`);
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
        <Card sx={{ borderRadius: '1rem', bottom: 0, height: '650px', left: 0, overflowY: 'auto', padding: '1rem 1.5rem', position: 'fixed', right: 0 }}>
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
            {store?.productView?.productDetails?.data?.product?.productType?.hasVariants === true
              ? (
              <>
                <Typography
                  sx={{
                    color: theme?.palette?.grey[900],
                    fontWeight: 'bold',
                    textAlign: 'left'
                  }}
                  variant="h5"
                >
                  Ganti Item
                </Typography>
                <hr style={{ marginTop: '0rem !important' }} />
                {store?.productView?.productTypeDetails?.data?.productType?.variantAttributes?.filter((type) => type?.inputType === 'DROPDOWN').map((obj, idx) => {
                  return (
                    <div key={obj.id}>
                      <Typography
                        sx={{
                          color: theme?.palette?.grey[900],
                          fontWeight: 'bold',
                          marginBottom: '0.25rem',
                          textAlign: 'left'
                        }}
                        variant="h6"
                      >
                      {obj.name}
                      </Typography>
                      {obj?.choices?.edges?.map((item) => {
                        const nameParts = item?.node?.name.split(':');
                        if (nameParts.length === 3) {
                          const name = nameParts[0].trim();
                          const price = nameParts[1].trim();

                          return (
                            <Grid container={true} key={item?.node?.id} sx={{ alignItem: 'center', display: 'flex', justifyContent: 'space-between' }}>
                              <Grid item={true} xs={8}>
                              <FormControlLabel
                                control={
                                  <Radio
                                    checked={selectedChoices[`${obj.id}:${obj.name}`] ===  `${item?.node?.id}:${item?.node?.name}`}
                                    onChange={() => {
                                      handleVariantChange(obj.id, obj.name, { id: item?.node?.id, name: item?.node?.name }, price, idx);
                                    }} />
                                }
                                label={
                                  <Typography fontWeight="bold" variant="h6">
                                    {name}
                                  </Typography>
                                }
                                value={`${item?.node?.id}:${item?.node?.name}`} />
                              </Grid>
                              <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'end' }} xs={4}>
                                  <Typography fontWeight="bold">
                                  {price === '0' ? 'Gratis' : `+ Rp. ${Number(price).toLocaleString('id-ID')}`}
                                  </Typography>
                              </Grid>
                            </Grid>
                          );
                        }

                        return null;
                      })}
                    </div>
                  );
                })}
                <Typography
                  sx={{
                    color: theme?.palette?.grey[900],
                    fontWeight: 'bold',
                    textAlign: 'left'
                  }}
                  variant="h5"
                >
                    Tambahan
                </Typography>
                <hr style={{ marginTop: '0rem !important' }} />
                {store?.productView?.productTypeDetails?.data?.productType?.variantAttributes?.filter((type) => type?.inputType === 'MULTISELECT').map((obj) => {
                  return (
                    <div key={obj.id}>
                      <Typography
                        sx={{
                          color: theme?.palette?.grey[900],
                          fontWeight: 'bold',
                          marginBottom: '0.25rem',
                          textAlign: 'left'
                        }}
                        variant="h6"
                      >
                      {obj.name}
                      </Typography>
                      {obj?.choices?.edges?.map((item, idx) => {
                        const nameParts = item?.node?.name.split(':');
                        if (nameParts.length === 3) {
                          const name = nameParts[0].trim();
                          const price = nameParts[1].trim();

                          return (
                            <Grid container={true} key={item?.node?.id} sx={{ alignItem: 'center', display: 'flex', justifyContent: 'space-between' }}>
                              <Grid item={true} xs={8}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      // Checked={selectedChoices[`${obj.id}:${obj.name}`] ===  `${item?.node?.id}:${item?.node?.name}`}
                                      onChange={() => {
                                        handleMultiselectChange(obj.id, obj.name, { id: item?.node?.id, name: item?.node?.name }, price, idx, obj?.choices?.edges?.length);
                                      }} />
                                  }
                                  label={
                                    <Typography fontWeight="bold" variant="h6">
                                      {name}
                                    </Typography>
                                  }
                                  sx={{ fontWeight: 'bold' }}
                                  value={`${item?.node?.id}:${item?.node?.name}`} />
                              </Grid>
                              <Grid item={true} sx={{ alignItems: 'center', display: 'flex', fontWeight: 'bold', justifyContent: 'end' }} xs={4}>
                                  <Typography fontWeight="bold">
                                    {price === '0' ? 'Gratis' : `+ Rp. ${Number(price).toLocaleString('id-ID')}`}
                                  </Typography>
                              </Grid>
                            </Grid>
                          );
                        }

                        return null;
                      })}
                    </div>
                  );
                })}
              </>
              )
              : null}
            <Typography
              sx={{
                color: theme?.palette?.grey[900],
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                marginTop: '1rem',
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
                    color: theme?.palette?.grey[900],
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
            <hr />
            <Grid
              container={true}
              justifyContent="space-between"
              spacing={2}
              sx={{ marginBottom: '1rem' }}
            >
              <Grid item={true} xs={6}>
                <Typography
                  sx={{
                    color: theme?.palette?.grey[900],
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
            <Button
              color="primary"
              disabled={isLoad === true}
              fullWidth={true}
              size="large"
              variant="contained"
              onClick={handleAddToCart}
            >
              {isLoad === true ? <Loader /> : 'Tambah Keranjang' }
            </Button>
          </Box>
        </Card>

    </Box>
  );
};

ProductView.displayName = 'ProductView';
ProductView.layout = 'blank';
export default ProductView;
export type { VariantModel, VariantValueModel };
