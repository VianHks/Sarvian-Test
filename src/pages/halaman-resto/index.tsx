/* eslint-disable multiline-ternary */
/* eslint-disable linebreak-style */
import { Fragment, useEffect, useMemo, useState } from 'react';
import type { MouseEvent, SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Alert, Avatar, Box, Button, Card, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Toolbar, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { AccessTimeFilled, AddBoxFilled, ArrowBackFilled, IndeterminateCheckBoxFilled, LocationOnFilled, SearchOutlined, StarFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { ChannelCommand } from '@models/halaman-resto/reducers';
import { orderCommand } from '@models/order/commands';
import { OrderCommand } from '@models/order/reducers';
import { RatingCommand } from '@models/rating/commands';
import { useStore } from '@models/store';

import CustomizedSnackbars from './alert';
import FloatingShoppingButton from './floatingshopping-button';
import Rating from './rating';

import Bakar from '@assets/images/Bakar.png';
import ProfilFoto from '@assets/images/Orang.svg';
import Pisan from '@assets/images/Pisan.png';

import type { SnackbarCloseReason } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

// eslint-disable-next-line import/exports-last
export interface RestoItem {
  id: number
  location: number
  open: string
  orderMethode: string
  rating: string
  restoName: string
  verified: boolean
}

// eslint-disable-next-line import/exports-last

// eslint-disable-next-line import/exports-last
export const DUMMY_MENU_RECOMDATION = [
  {
    id: 1,
    userName: 'Jatnika',
    rating: '4',
    comment: 'Ngenah weh pokokna mah'
  },
  {
    id: 2,
    userName: 'Rere',
    rating: '2',
    comment: 'Endol'
  },
  {
    id: 3,
    userName: 'Udin',
    rating: '4',
    comment: 'Enak banget'
  },
  {
    id: 1,
    userName: 'Jatnika',
    rating: '5',
    comment: 'Mantab'
  },
  {
    id: 4,
    userName: 'Retno',
    rating: '3',
    comment: 'Kurang enak g ada rasa'
  }

];

// eslint-disable-next-line import/exports-last
export const DUMMY_RESTO = [
  {
    id: 1,
    location: 1.5,
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Pesan Antar, Pick Up',
    rating: '4.9',
    restoName: 'Resto Sunda Gila 1',
    verified: true
  }

];

interface RestoSchedule {
  day: string
  open: string
  closed: string
  isOpen: boolean
}

interface LinesModel {
  metadata: [
    {
      key: string
      value: string

    }
  ]
  lineId: string
  note: string
  price: string
  quantity: number
  variantId: string
  update: string
}
/*
 * Interface LinesUpdateModel {
 *   lineId: string
 *   note: string
 *   price: string
 *   quantity: number
 * }
 * const DefaultLinesUpdate: LinesUpdateModelModel = {
 *   lineId: '',
 *   note: '',
 *   price: '',
 *   quantity: 0
 * };
 */
const DefaultLines: LinesModel = {
  metadata: [
    {
      key: 'note',
      value: ''

    }
  ],
  lineId: '',
  note: '',
  price: '',
  quantity: 0,
  variantId: '',
  update: ''

};

/*
 * Interface PayloadUpdateDataModel {
 *   checkoutId: string
 *   lines: LinesUpdateModel[]
 */

// }

/*
 * const UPDATE: PayloadUpdateDataModel =
 * {
 *   checkoutId: '',
 *   lines: [DefaultLinesUpdate]
 * };
 */

interface PayloadDataModel {
  after: string
  channel: string
  deliveryMethodId: string
  first: number
  lines: LinesModel[]
  userId: string
}

const DATA: PayloadDataModel =
{
  after: '',
  channel: 'makan',
  deliveryMethodId: 'string',
  first: 100,
  lines: [DefaultLines],
  userId: 'string'
};

const HalamanResto: PageComponent = () => {
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const channelId = 'Q2hhbm5lbDo0';
  const daysOfWeek = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
  const currentDayIndex = new Date().getDay();
  const currentDay = daysOfWeek[currentDayIndex];
  const jadwalOperasional = JSON.parse(store?.halamanResto?.channelDetailOutput?.data?.channel?.metafields?.jadwal_operasional || '[]');
  const jadwalDummy = JSON.parse('[{"day":"senin","open":"07:00","closed":"12:00","isOpen":true},{"day":"selasa","open":"07:00","closed":"12:00","isOpen":true},{"day":"rabu","open":"07:00","closed":"12:00","isOpen":true},{"day":"kamis","open":"07:00","closed":"12:00","isOpen":true},{"day":"jumat","open":"07:00","closed":"12:00","isOpen":true},{"day":"sabtu","open":"07:00","closed":"12:00","isOpen":true},{"day":"minggu","open":"07:00","closed":"12:00","isOpen":false}]');
  const filteredJadwal = jadwalDummy.filter((resto: RestoSchedule) => {
    return resto.day.toLowerCase() === currentDay;
  });
  const [colIds, setColIds] = useState<{ id: string, name: string }[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [showAlert, setShowAlert] = useState(true);
  const filteredCategories = store?.halamanResto?.productListOutput?.data
    ?.filter((category) => category.products.totalCount > 0) || [];

  const [formData, setFormData] = useState(DATA);

  const calculateTotalAmount = (lines: LinesModel[] | undefined): number => {
    if (!lines) {
      return 0;
    }

    return lines.reduce((total, line) => {
      const price = parseFloat(line.price) || 0;

      const lineTotal = price * line.quantity;

      console.log('cekprice', price);
      console.log('ceklientotal', lineTotal);

      return total + lineTotal;
    }, 0);
  };

  const calculateTotalItems = (lines: LinesModel[] | undefined): number => {
    if (!lines) {
      return 0;
    }

    return lines.reduce((total, line) => {
      return total + line.quantity;
    }, 0);
  };

  const handleIncrement = (id: string) => {
    console.log('cekvariant', id);

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      const lineToUpdate = updatedFormData.lines.find((line) => line.variantId === id);

      if (lineToUpdate) {
        lineToUpdate.quantity = Math.max(lineToUpdate.quantity + 1, 0);

        setTotalItems((prevTotalItems) => prevTotalItems + 1);
      }

      const newTotalAmount = calculateTotalAmount(updatedFormData.lines);

      setTotalAmount(newTotalAmount);

      return updatedFormData;
    });
  };

  const handleDecrement = (id: string) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      if (updatedFormData.lines) {
        const lineToUpdate = updatedFormData.lines.find((line) => line.variantId === id);

        if (lineToUpdate && lineToUpdate.quantity > 0) {
          lineToUpdate.quantity = Math.max(lineToUpdate.quantity - 1, 0);
          setTotalItems((prevTotalItems) => Math.max(prevTotalItems - 1, 0));
        }
      }

      const newTotalAmount = calculateTotalAmount(updatedFormData.lines);

      setTotalAmount(newTotalAmount);

      return updatedFormData;
    });
  };

  const handleLihatSemuaClick = () => {
    navigate('./ulasan-rating');
  };

  const handleResponse = (res: string | null | undefined) => {
    if (res !== 'err' && res !== null && res !== undefined) {
      setIsLoading(false);
      sessionStorage.setItem('checkoutId', res);
      const colIdsString = JSON.stringify(colIds);

      sessionStorage.setItem('colIds', colIdsString);
      navigate('/keranjang');
    } else {
      setIsLoading(true);
    }
  };

  const handleShoppingButtonClick = () => {
    navigate('/keranjang');
  };

  const handleCardClick = (variantId: string) => {
    navigate(`/product-view/${variantId}`);
  };

  const handleLanjutPembayaranClick = () => {
    setIsLoading(true);
    const filteredLines = formData.lines.filter((line) => line.quantity > 0);

    const checkoutIdFromStorage = sessionStorage.getItem('checkoutId');

    if (checkoutIdFromStorage) {
      const linesToUpdate = formData.lines.filter((line) => line.lineId);
      const paramUpdate = {
        checkoutId: checkoutIdFromStorage,
        lines: linesToUpdate.map((line) => ({
          lineId: line.lineId,
          note: line.note,
          price: line.price,
          quantity: line.quantity
        }))
      };

      console.log('cekrespUpdate', paramUpdate);
      ChannelCommand.putCheckoutLines(paramUpdate, token || '').then((res) => {
        handleResponse(res);
      });
    }

    if (filteredLines.length > 0) {
      const paramCreate = {
        after: '',
        channel: 'makan',
        deliveryMethodId: 'V2FyZWhvdXNlOjRhYjM1NjU4LTQ2MTMtNGUwYS04MWNlLTA4NjVlNjMyMzIwMA==',
        first: 100,
        lines: filteredLines.map((line) => ({
          metadata: line.metadata,
          price: line.price,
          quantity: line.quantity,
          variantId: line.variantId
        })),
        userId: 'VXNlcjozMTc4NjkwMDc='
      };

      ChannelCommand.postCreateCheckout(paramCreate, token || '').then((res) => {
        handleResponse(res);
      });
    }
  };

  useEffect(() => {
    const collectionIds = (store?.halamanResto?.productListOutput?.data || [])
      .filter((category) => category.products.totalCount > 0)
      .map((category) => ({
        id: category.id.toString(),
        name: category.name
      }));

    console.log('Collection IDs:', collectionIds);
    setColIds(collectionIds);

    const colIdsOnly = colIds.map((colObj) => colObj.id);

    const paramCollection = {
      after: '',
      channel: 'makan',
      collection: colIdsOnly,
      direction: 'ASC',
      field: 'NAME',
      first: 100
    };

    dispatch(ChannelCommand.getproductbyCollection(paramCollection, token || ''));
  }, [store?.halamanResto?.productListOutput?.data]);

  useEffect(() => {
    const param = {

      after: '',
      channel: 'makan',
      direction: 'ASC',
      field: 'NAME',
      first: 100,
      published: 'PUBLISHED'

    };

    dispatch(ChannelCommand.getCollections(param, token || ''));

    const colIdsOnly = colIds.map((colObj) => colObj.id);

    const paramCollection = {
      after: '',
      channel: 'makan',
      collection: colIdsOnly,
      direction: 'ASC',
      field: 'NAME',
      first: 100
    };

    dispatch(ChannelCommand.getproductbyCollection(paramCollection, token || ''));
    const checkoutIdFromStorage = sessionStorage.getItem('checkoutId');
    if (checkoutIdFromStorage !== null) {
      dispatch(OrderCommand.getCheckoutDetails(checkoutIdFromStorage, token || ''));
    }

    dispatch(ChannelCommand.getChannelDetail(channelId, token || ''));
    dispatch(
      RatingCommand.RatingLoad(channelId)
    )
      .catch((err: unknown) => {
        console.error(err);
      });

    return () => {
      dispatch(RatingCommand.RatingClear());
    };
  }, [dispatch, token]);

  useEffect(() => {
    if (store?.halamanResto?.productByCollectionsOutput) {
      const linesUpdate = Array.from(
        { length: store?.halamanResto?.productByCollectionsOutput.totalCount },
        (_, index) => {
          const matchingColId = colIds.find((colId) => store?.halamanResto?.productByCollectionsOutput?.data[index]?.collections.some(
            (collection) => collection.id === colId.id

          ));

          const targetId = matchingColId
            ? store?.halamanResto?.productByCollectionsOutput?.data[index]?.variants[0].id || ''
            : '';
          const matchingProduct = store?.halamanResto?.productByCollectionsOutput?.data.find(
            (product) => product.variants[0].id === targetId
          );

          const defaultPrice =
            matchingProduct?.pricing?.priceRange?.start?.net?.amount || 0;

          const initialQuantity =
            store?.order?.checkoutDetails?.data?.checkout?.lines &&
            store.order.checkoutDetails.data.checkout &&
            store.order.checkoutDetails.data.checkout.lines &&
            store.order.checkoutDetails.data.checkout.lines.length > 0
              ? store.order.checkoutDetails.data.checkout.lines.find(
                (line) => line.variant.id === targetId
              )?.quantity || 0
              : 0;

          const initialLineId =
              store?.order?.checkoutDetails?.data?.checkout?.lines &&
              store.order.checkoutDetails.data.checkout.lines.length > 0
                ? store.order.checkoutDetails.data.checkout.lines.find(
                  (line) => line?.variant?.id === targetId
                )?.id || ''
                : '';
          const initialNote =
                store?.order?.checkoutDetails?.data?.checkout?.lines &&
                store.order.checkoutDetails.data.checkout.lines.length > 0
                  ? store.order.checkoutDetails.data.checkout.lines.find(
                    (line) => line.variant.id === targetId
                  )?.metafields?.note || ''
                  : '';

          return {
            ...DefaultLines,
            variantId: targetId,
            price: String(defaultPrice),
            quantity: initialQuantity,
            lineId: initialLineId,
            note: initialNote
          };
        }
      );

      setFormData({ ...formData, lines: linesUpdate });
    }
  }, [store?.halamanResto?.productByCollectionsOutput, store?.order?.checkoutDetails?.data?.checkout]);

  useEffect(() => {
    const initialTotalAmount = calculateTotalAmount(formData.lines);
    const initialTotalItems = calculateTotalItems(formData.lines);

    setTotalAmount(initialTotalAmount);
    setTotalItems(initialTotalItems);
  }, [formData]);

  const scrollToKategoriMenu = (event: SelectChangeEvent<string>) => {
    const selectedCategory = event.target.value as string;

    const footerElement = document.getElementById('tes');

    footerElement?.scrollIntoView({ behavior: 'smooth' });
    setSelectedValue(selectedCategory);
  };

  console.log('cekstore', store);

  console.log('formdata', formData);

  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, showAlert]);

  return (
    <div>
      <Toolbar>

        <IconButton
          aria-label="back"
          color="default"
          edge="start"
          size="large"
          sx={{ mr: 2, marginTop: '0.2rem' }}
        >
          <ArrowBackFilled />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <FormControl sx={{ marginTop: '0.5rem' }}>
            <InputLabel id="filter-label" sx={{ color: 'black' }}>Menu</InputLabel>
            <Select
              id="filter"
              label="Menu"
              labelId="filter-label"
              sx={{ width: 200, marginRight: 1, color: 'black' }}

              value={selectedValue}
              onChange={scrollToKategoriMenu}

            >

              {filteredCategories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>

          <IconButton aria-label="search" color="inherit" sx={{ marginTop: '0.5rem' }}>
            <SearchOutlined fontSize="25px" style={{ color: 'black' }} />
          </IconButton>
          <IconButton aria-label="share" color="inherit" sx={{ marginTop: '0.5rem' }}>
            <ShareOutlinedIcon fontSize="medium" style={{ color: 'black' }} />
          </IconButton>
        </Box>
      </Toolbar>
      <Box sx={{ margin: '0.5rem 0.5rem' }}>

        {filteredJadwal.map((resto: RestoSchedule) => {
          const currentHour = new Date().getHours();

          const [openHour] = (resto.open || '').split(' - ').map((time) => parseInt(time));
          const [closeHour] = (resto.closed || '').split(' - ').map((time) => parseInt(time));

          const isOpen = currentHour >= openHour && currentHour <= closeHour;

          console.log('cekjamOpen', openHour);

          console.log('cekjamCurrent', currentHour);

          console.log('cekjamTutup', closeHour);

          return (
            <div key={store?.halamanResto?.channelDetailOutput?.data?.channel?.id}>

<Grid item={true} xs={12}>
  {isLoading ? <Alert
    color="error"
    severity="error"
    sx={{ alignItems: 'center', display: 'flex' }}
               >
      <Typography fontSize="1rem">
        Ada kesalahan pada Jaringan, Silahkan coba lagi kembali
      </Typography>
               </Alert> : null}

  {!isOpen && !isLoading && (
    <Alert
      color="info"
      severity="info"
      sx={{ alignItems: 'center', display: 'flex' }}
    >
      <Typography fontSize="1rem">
        Resto ini lagi tutup, Buka lagi besok jam {resto.open.split(' - ')[0]} ya!
      </Typography>
    </Alert>
  )}
</Grid>

              <Card key={store?.halamanResto?.channelDetailOutput?.data?.channel?.id} sx={{ borderColor: 'transparent', marginBottom: '1rem', padding: '0.5rem', marginTop: '2rem' }}>
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
                    <Avatar src={store?.halamanResto?.channelDetailOutput?.data?.channel?.metafields?.media} sx={{ height: '50px', width: '50px' }} />
                  </Grid>
                  <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'start', paddingTop: '0rem!important' }} xs={8}>
                    <Box>
                      {store?.halamanResto?.channelDetailOutput?.data?.channel?.name
                        ? <Typography color="neutral-70" sx={{ marginBottom: '0.125' }} variant="body2">
                          Verified by TokoRumahan
                          </Typography>
                        : null}
                      <Typography
                        sx={{ fontWeight: 'bold', textAlign: 'start' }}
                        variant="h4"
                      >
                        {store?.halamanResto?.channelDetailOutput?.data?.channel?.name}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item={true} sx={{ display: 'flex', justifyContent: 'center' }} xs={11}>
                    <Box gap={1} sx={{ display: 'flex' }}>
                      <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                        <StarFilled size={10} style={{ color: '#FBD600' }} />
                        <Typography color="neutral-90" variant="caption">
                          {store?.halamanResto?.channelDetailOutput?.avgRating}
                        </Typography>
                      </Box>
                      <Divider flexItem={true} orientation="vertical" />
                      <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                        <LocationOnFilled size={10} style={{ color: 'red' }} />
                        <Typography color="neutral-90" variant="caption">
                          9m
                        </Typography>
                      </Box>
                      <Divider flexItem={true} orientation="vertical" />
                      <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                        <AccessTimeFilled size={10} />
                        <Typography color="neutral-90" variant="caption">
                          {`${resto.open} - ${resto.closed}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </div>
          );
        })}
        <Grid container={true} justifyContent="space-between" spacing={2} sx={{ marginBottom: '1rem' }}>
          <Grid item={true} xs={6}>
            <Typography
              sx={{ fontWeight: 'bold', textAlign: 'start', color: '#1F66D0' }}
              variant="h6"
            >
              Ulasan dan Rating
            </Typography>
          </Grid>
          <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'end' }} xs={6}>
            <Button
              size="small"
              sx={{ paddingInline: '1rem', backgroundColor: '#FBD600', fontSize: '0.5rem', color: 'black' }}
              variant="outlined"
              onClick={handleLihatSemuaClick}
            >
              Lihat Semua
            </Button>
          </Grid>
        </Grid>

        <Card sx={{ borderColor: 'transparent', borderRadius: 0, boxShadow: 'none', marginBottom: '1rem', marginInline: '-1.5rem', padding: '1rem 1.5rem', position: 'relative', zIndex: 100 }}>
          <Box sx={{ overflowX: 'auto' }}>
            <Grid container={true} sx={{ width: '100rem', overflowX: 'auto' }}>
              <Grid item={true} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {store?.rating?.data?.map((obj) => {
                  return (
                    <Card key={obj.id} sx={{ borderColor: 'transparent', marginBottom: '1rem', padding: '0.5rem' }}>
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
                          <Avatar src={ProfilFoto} sx={{ height: '50px', width: '50px' }} />
                        </Grid>
                        <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'start', paddingTop: '0rem!important' }} xs={8}>
                          <Box>

                            <Typography
                              sx={{ fontWeight: 'bold', textAlign: 'start', marginLeft: '0.5rem' }}
                              variant="h6"
                            >
                              {obj.customerId}
                            </Typography>
                            <Box sx={{ marginLeft: '0.5rem' }}>
                              {obj.rating ? <Rating rating={obj.rating.toString()} /> : null}
                            </Box>
                          </Box>
                        </Grid>
                        <Box sx={{ marginTop: '10px', marginLeft: '10px', width: '100%    ' }}>
                          <TextField fullWidth={true} placeholder={obj.review} size="small" variant="outlined" />
                        </Box>

                      </Grid>
                    </Card>
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        </Card>

        <Typography
          sx={{ fontWeight: 'bold', textAlign: 'start', color: 'black', marginBottom: '1rem' }}
          variant="h4"
        >
          Menu
        </Typography>
        {colIds.map((colId, colIndex) => (
          <Fragment key={colIndex}>
            <Typography
              id="tes"
              sx={{ fontWeight: 'medium', textAlign: 'start', marginBottom: '0.25rem' }}
              variant="h5"
            >
              {colId.name}

            </Typography>
            {store?.halamanResto?.productByCollectionsOutput?.data
              ?.filter((obj) => obj.collections.some((collection) => collection.id === colId.id))
              .map((obj, index) => (

                <div key={obj.id} style={{ marginBottom: '0.5rem' }}>

                  <Card sx={{ paddingInline: '0.5rem' }} onClick={() => handleCardClick(obj.variants[index].id)}>
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
                            alt={obj.name}
                            src={obj.thumbnail.url}
                            style={{ maxHeight: '100%', maxWidth: '100%', marginTop: '0.5rem', borderRadius: '8px' }} />
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
                            marginTop: obj.channelListings[0].isAvailableForPurchase ? '2.5rem' : '1rem',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 'bold', textAlign: 'start', marginTop: '-2rem', color: 'black' }}
                            variant="body2"
                          >
                            {obj.name}
                          </Typography>
                        </Box>
                        {!obj.channelListings[0].isAvailableForPurchase && (
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              textAlign: 'start',
                              color: 'red'
                            }}
                            variant="body2"
                          >
                            Persediaan Habis
                          </Typography>
                        )}
                        {obj.channelListings[0].isAvailableForPurchase
                          ? <div>
                            <Grid container={true} justifyContent="space-between" spacing={2} sx={{ marginBottom: '1rem' }}>
                              <Grid item={true} xs={6}>
                                <Typography
                                  sx={{ fontWeight: 'bold', textAlign: 'start', color: '#1f66d0' }}
                                  variant="body2"
                                >
                                  Rp. {obj.pricing.priceRange.start.net.amount.toLocaleString()}
                                </Typography>
                              </Grid>
                              <Grid item={true} xs={6}>
                                <Typography sx={{ fontWeight: 'medium', marginLeft: '3.5rem' }} variant="body2">
                                  Terjual 4
                                </Typography>
                              </Grid>
                            </Grid>
                            <Box
                              sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'end',
                                marginTop: '-1rem'
                              }}
                            >
                              <Grid item={true} sx={{ display: 'flex', justifyContent: 'end' }} xs="auto">
                                <IconButton
                                  aria-label="min"
                                  size="small"
                                  sx={{ color: 'black' }}
                                  onClick={() => handleDecrement(obj.variants[0].id)}
                                >
                                  <IndeterminateCheckBoxFilled size={24} />
                                </IconButton>
                                <Typography
                                  key={obj.id}
                                  style={{
                                    display: 'inline-block',
                                    margin: '0 0.5rem',
                                    marginTop: '0.5rem'
                                  }}
                                  variant="body2"
                                >
                                  {formData?.lines.find((line) => line.variantId === obj.variants[0].id)?.quantity || 0}
                                </Typography>
                                {/* {formData.map((item, itemIndex) => item.lines.map((line, lineIndex) => (
    <Typography
      key={`${itemIndex}-${lineIndex}`}
      style={{
        display: 'inline-block',
        margin: '0 0.5rem',
        marginTop: '0.5rem'
      }}
      variant="body2"
    >
      {line.quantity}
    </Typography>
                        )))} */}
                                <IconButton
                                  aria-label="plus"
                                  size="small"
                                  sx={{ color: 'black' }}
                                  onClick={() => handleIncrement(obj.variants[0].id)}
                                >
                                  <AddBoxFilled size={24} />
                                </IconButton>
                              </Grid>
                            </Box>
                            </div>
                          : null}
                      </Grid>
                    </Grid>
                  </Card>
                </div>
              ))}
          </Fragment>
        ))}
        <Typography
          sx={{ fontWeight: 'medium', textAlign: 'start', color: '#1F66D0' }}
          variant="body2"
        >
          {totalItems} Item
        </Typography>
        <Grid container={true} justifyContent="space-between" spacing={2} sx={{ marginBottom: '1rem' }}>
          <Grid item={true} xs={6}>
            <Typography
              sx={{ fontWeight: 'medium', textAlign: 'start', color: 'black' }}
              variant="h6"
            >
              Total Pembayaran
            </Typography>
          </Grid>
          <Grid item={true} xs={6}>
            <Typography
              sx={{ fontWeight: 'medium', textAlign: 'end', color: 'black' }}
              variant="h6"
            >
              Rp. {totalAmount.toLocaleString('id-ID')}
            </Typography>
          </Grid>
        </Grid>
        <Button
          color="primary"
          size="medium"
          sx={{ textTransform: 'none', width: '100%' }}
          variant="contained"
          onClick={handleLanjutPembayaranClick}
        >
          Lanjut Pembayaran
        </Button>
        <FloatingShoppingButton onClick={handleShoppingButtonClick} />
      </Box>

    </div>
  );
};

HalamanResto.displayName = 'HalamanResto';

export default HalamanResto;
