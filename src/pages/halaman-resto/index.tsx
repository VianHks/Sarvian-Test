import { Fragment, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';

import {
  AccessTimeFilled,
  AddBoxFilled,
  ArrowBackFilled,
  IndeterminateCheckBoxFilled,
  LocationOnFilled,
  SearchOutlined,
  StarFilled
} from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { ChannelCommand } from '@models/halaman-resto/reducers';
import { OrderCommand } from '@models/order/reducers';
import { RatingCommand } from '@models/rating/commands';
import { useStore } from '@models/store';

import FloatingShoppingButton from './floatingshopping-button';
import Rating from './rating';

import ProfilFoto from '@assets/images/Orang.svg';

import type { SelectChangeEvent } from '@mui/material/Select';

interface RestoItem {
  id: number
  location: number
  open: string
  orderMethode: string
  rating: string
  restoName: string
  verified: boolean
}

const DUMMY_MENU_RECOMDATION = [
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

const DUMMY_RESTO = [
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
  colectionId: string
  productId: string
  thumbnail: string
  name: string
  isAvailableForPurchase: boolean
}

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
  update: '',
  colectionId: '',
  productId: '',
  thumbnail: '',
  name: '',
  isAvailableForPurchase: false
};

interface PayloadDataModel {
  after: string
  channel: string
  deliveryMethodId: string
  first: number
  lines: LinesModel[]
  userId: string
}

const DATA: PayloadDataModel = {
  after: '',
  channel: 'makan',
  deliveryMethodId: 'string',
  first: 100,
  lines: [DefaultLines],
  userId: 'string'
};

const SESSION_STORAGE_KEYS = {
  CHECKOUT: 'CheckoutId',
  COLIDS: 'ColIds'
};

const HalamanResto: PageComponent = () => {
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const checkoutIdFromStorage = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.CHECKOUT) ?? '';
  const colIdFromStorage = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.COLIDS) ?? '';
  const [isLoading, setIsLoading] = useState(false);
  const channelId = 'Q2hhbm5lbDo0';
  const daysOfWeek = [
    'minggu',
    'senin',
    'selasa',
    'rabu',
    'kamis',
    'jumat',
    'sabtu'
  ];
  const currentDayIndex = new Date().getDay();
  const currentDay = daysOfWeek[currentDayIndex];
  const jadwalOperasional = JSON.parse(
    store?.halamanResto?.channelDetailOutput?.data?.channel?.metafields
      ?.operationalHour || '[]'
  );

  const filteredJadwal = jadwalOperasional.filter((resto: RestoSchedule) => {
    return resto.day.toLowerCase() === currentDay;
  });
  const [colIds, setColIds] = useState<{ id: string, name: string }[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [showAlert, setShowAlert] = useState(true);
  const filteredCategories =
    store?.halamanResto?.productListOutput?.data?.filter(
      (category) => category.products.totalCount > 0
    ) || [];

  const [formData, setFormData] = useState(DATA);

  const calculateTotalAmount = (lines: LinesModel[] | undefined): number => {
    if (!lines) {
      return 0;
    }

    return lines.reduce((total, line) => {
      const price = parseFloat(line.price) || 0;
      const lineTotal = price * line.quantity;

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
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      const lineToUpdate = updatedFormData.lines.find(
        (line) => line.variantId === id
      );

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
        const lineToUpdate = updatedFormData.lines.find(
          (line) => line.variantId === id
        );

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
      window.sessionStorage.setItem(
        SESSION_STORAGE_KEYS.CHECKOUT,
        JSON.stringify(res)
      );
      window.sessionStorage.setItem(
        SESSION_STORAGE_KEYS.COLIDS,
        JSON.stringify(colIds)
      );

      navigate('/keranjang');
    } else {
      setIsLoading(true);
    }
  };

  const handleShoppingButtonClick = () => {
    navigate('/keranjang');
  };

  const handleCardClick = (variantId: string, productId: string) => {
    navigate(`/product-view?productId=${productId}&variantId?=${variantId}`);
  };

  const handleLanjutPembayaranClick = () => {
    setIsLoading(true);
    const filteredLines = formData.lines.filter(
      (line) => line.quantity > 0 && !line.lineId
    );

    // Const checkoutIdFromStorage = sessionStorage.getItem('checkoutId');

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

      ChannelCommand.putCheckoutLines(paramUpdate, token || '').then((res) => {
        handleResponse(res);
      });
    }

    if (filteredLines.length > 0) {
      const paramCreate = {
        after: '',
        channel: 'makan',
        deliveryMethodId:
          'V2FyZWhvdXNlOjRhYjM1NjU4LTQ2MTMtNGUwYS04MWNlLTA4NjVlNjMyMzIwMA==',
        first: 100,
        lines: filteredLines.map((line) => ({
          metadata: line.metadata,
          price: line.price,
          quantity: line.quantity,
          variantId: line.variantId
        })),
        userId: 'VXNlcjoyMDUwMjQwNjE5'
      };

      ChannelCommand.postCreateCheckout(paramCreate, token || '').then(
        (res) => {
          handleResponse(res);
        }
      );
    }
  };

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
    const paramMetadata = {
      after: '',
      channel: 'makan',
      filterKey: 'recomendation',
      filterValue: 'true',
      first: 100
    };

    dispatch(
      ChannelCommand.getCollectionsbyMetadata(paramMetadata, token || '')
    );

    // Const checkoutIdFromStorage = sessionStorage.getItem('checkoutId');
    if (checkoutIdFromStorage !== null) {
      dispatch(
        OrderCommand.getCheckoutDetails(checkoutIdFromStorage, token || '')
      );
    }

    dispatch(ChannelCommand.getChannelDetail(channelId, token || ''));
    dispatch(RatingCommand.RatingLoad(channelId)).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(RatingCommand.RatingClear());
    };
  }, [dispatch, token]);

  useEffect(() => {
    const collectionIds = (store?.halamanResto?.productListOutput?.data || [])
      .filter((category) => category.products.totalCount > 0)
      .map((category) => ({
        id: category.id.toString(),
        name: category.name
      }));

    setColIds(collectionIds);

    const colIdsOnly = colIds.map((colObj) => colObj.id);
    if (colIds.length > 0) {
      const paramCollection = {
        after: '',
        channel: 'makan',
        collection: colIdsOnly,
        direction: 'ASC',
        field: 'NAME',
        first: 100
      };

      dispatch(
        ChannelCommand.getproductbyCollection(paramCollection, token || '')
      );
    }
  }, [store?.halamanResto?.productListOutput?.data]);

  useEffect(() => {
    if (store?.halamanResto?.productByCollectionsOutput) {
      const linesUpdate = Array.from(
        { length: store?.halamanResto?.productByCollectionsOutput.totalCount },
        (_, index) => {
          const matchingColId = colIds.find((colId) => store?.halamanResto?.productByCollectionsOutput?.data[
            index
          ]?.collections.some((collection) => collection.id === colId.id));

          const colectionIds = matchingColId?.id || '';
          const targetId = matchingColId
            ? store?.halamanResto?.productByCollectionsOutput?.data[index]
              ?.variants[0].id || ''
            : '';
          const matchingProduct =
            store?.halamanResto?.productByCollectionsOutput?.data.find(
              (product) => product.variants[0].id === targetId
            );

          const productIds =
            store?.halamanResto?.productByCollectionsOutput?.data[index].id ||
            '';
          const defaultPrice =
            matchingProduct?.pricing?.priceRange?.start?.net?.amount || 0;

          const defaultName = matchingProduct?.name || '';
          const defaultThumbnail = matchingProduct?.thumbnail.url || '';
          const defaultAvailableforPurchase =
            matchingProduct?.channelListings[0]?.isAvailableForPurchase ||
            false;

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
            note: initialNote,
            colectionId: colectionIds,
            productId: productIds,
            thumbnail: defaultThumbnail,
            name: defaultName,
            isAvailableForPurchase: defaultAvailableforPurchase
          };
        }
      );

      setFormData({ ...formData, lines: linesUpdate });
    }
  }, [
    store?.halamanResto?.productByCollectionsOutput,
    store?.order?.checkoutDetails?.data?.checkout
  ]);

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

  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, showAlert]);

  return (
    <>
      <div>
        <Toolbar sx={{ backgroundColor: '#D5ECFE', paddingInline: '1rem' }}>
          <IconButton
            aria-label="back"
            color="default"
            edge="start"
            size="large"
            sx={{ mr: -2, marginTop: '0.2rem' }}
          >
            <ArrowBackFilled />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <FormControl size="small" sx={{ backgroundColor: '#D5ECFE' }}>
              <InputLabel id="filter-label" sx={{ color: 'black' }}>
                Menu
              </InputLabel>
              <Select
                id="filter"
                label="Menu"
                labelId="filter-label"
                sx={{
                  width: 210,
                  marginRight: 1,
                  color: 'black',
                  backgroundColor: '#FFFFFF'
                }}
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

            <IconButton
              aria-label="search"
              color="inherit"
              size="small"
              sx={{ marginLeft: '0.5rem', backgroundColor: '#FFFFFF' }}
            >
              <SearchOutlined fontSize="25px" style={{ color: 'black' }} />
            </IconButton>
            <IconButton
              aria-label="share"
              color="inherit"
              size="small"
              sx={{ marginLeft: '0.5rem', backgroundColor: '#FFFFFF' }}
            >
              <ShareOutlinedIcon fontSize="medium" style={{ color: 'black' }} />
            </IconButton>
          </Box>
        </Toolbar>

        <Box sx={{ margin: '0.5rem 0.5rem', paddingInline: '1rem' }}>
          {filteredJadwal.map((resto: RestoSchedule) => {
            const currentHour = new Date().getHours();

            const [openHour] = (resto.open || '')
              .split(' - ')
              .map((time) => parseInt(time, 10));
            const [closeHour] = (resto.closed || '')
              .split(' - ')
              .map((time) => parseInt(time, 10));

            const isOpen = currentHour >= openHour && currentHour <= closeHour;

            return (
              <div
                key={
                  store?.halamanResto?.channelDetailOutput?.data?.channel?.id
                }
              >
                <Grid item={true} xs={12}>
                  {isLoading
                    ? (
                    <Alert
                      color="error"
                      severity="error"
                      sx={{ alignItems: 'center', display: 'flex' }}
                    >
                      <Typography fontSize="1rem">
                        Ada kesalahan pada Jaringan, Silahkan coba lagi kembali
                      </Typography>
                    </Alert>
                    )
                    : null}

                  {!isOpen && !isLoading && (
                    <Alert
                      color="info"
                      severity="info"
                      sx={{ alignItems: 'center', display: 'flex' }}
                    >
                      <Typography fontSize="1rem">
                        Resto ini lagi tutup, Buka lagi besok jam{' '}
                        {resto.open.split(' - ')[0]} ya!
                      </Typography>
                    </Alert>
                  )}
                </Grid>

                <Card
                  key={
                    store?.halamanResto?.channelDetailOutput?.data?.channel?.id
                  }
                  sx={{
                    borderColor: 'transparent',
                    marginBottom: '1rem',
                    padding: '0.5rem',
                    marginTop: '2rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
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
                      <Avatar
                        src={
                          store?.halamanResto?.channelDetailOutput?.data
                            ?.channel?.metafields?.media
                        }
                        sx={{ height: '50px', width: '50px' }} />
                    </Grid>
                    <Grid
                      item={true}
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'start',
                        paddingTop: '0rem!important'
                      }}
                      xs={8}
                    >
                      <Box>
                        {store?.halamanResto?.channelDetailOutput?.data?.channel
                          ?.name
                          ? (
                          <Typography
                            color="neutral-70"
                            sx={{ marginBottom: '0.125' }}
                            variant="body2"
                          >
                            Verified by TokoRumahan
                          </Typography>
                          )
                          : null}
                        <Typography
                          sx={{ fontWeight: 'bold', textAlign: 'start' }}
                          variant="h4"
                        >
                          {
                            store?.halamanResto?.channelDetailOutput?.data
                              ?.channel?.name
                          }
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item={true}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                      xs={11}
                    >
                      <Box gap={1} sx={{ display: 'flex' }}>
                        <Box
                          gap={1}
                          sx={{ alignItems: 'center', display: 'flex' }}
                        >
                          <StarFilled size={10} style={{ color: '#FBD600' }} />
                          <Typography color="neutral-90" variant="caption">
                            {
                              store?.halamanResto?.channelDetailOutput
                                ?.avgRating
                            }
                          </Typography>
                        </Box>
                        <Divider flexItem={true} orientation="vertical" />
                        <Box
                          gap={1}
                          sx={{ alignItems: 'center', display: 'flex' }}
                        >
                          <LocationOnFilled
                            size={10}
                            style={{ color: 'red' }} />
                          <Typography color="neutral-90" variant="caption">
                            9m
                          </Typography>
                        </Box>
                        <Divider flexItem={true} orientation="vertical" />
                        <Box
                          gap={1}
                          sx={{ alignItems: 'center', display: 'flex' }}
                        >
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

          <Grid
            container={true}
            justifyContent="space-between"
            spacing={2}
            sx={{ marginBottom: '1rem' }}
          >
            <Grid item={true} xs={6}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'start',
                  color: '#1F66D0'
                }}
                variant="h6"
              >
                Ulasan dan Rating
              </Typography>
            </Grid>
            <Grid
              item={true}
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'end'
              }}
              xs={6}
            >
              <Button
                size="small"
                sx={{
                  paddingInline: '0.5rem',
                  backgroundColor: '#FBD600',
                  fontSize: '0.75rem',
                  color: 'black'
                }}
                variant="outlined"
                onClick={handleLihatSemuaClick}
              >
                Lihat Semua
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ paddingInline: '1.5rem' }}>
            <Card
              sx={{
                borderColor: 'transparent',
                borderRadius: 0,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '1rem',
                marginInline: '-1.5rem',
                position: 'relative',
                zIndex: 100
              }}
            >
              <Box sx={{ overflowX: 'auto' }}>
                <Grid
                  container={true}
                  sx={{ width: '100rem', overflowX: 'auto' }}
                >
                  <Grid
                    item={true}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    {store?.rating?.data?.map((obj) => {
                      return (
                        <Card
                          key={obj.id}
                          sx={{
                            borderColor: 'transparent',
                            marginBottom: '1rem',
                            padding: '0.5rem'
                          }}
                        >
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
                              <Avatar
                                src={ProfilFoto}
                                sx={{ height: '50px', width: '50px' }} />
                            </Grid>
                            <Grid
                              item={true}
                              sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'start',
                                paddingTop: '0rem!important'
                              }}
                              xs={8}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontWeight: 'bold',
                                    textAlign: 'start',
                                    marginLeft: '0.5rem'
                                  }}
                                  variant="h6"
                                >
                                  {obj.customerId}
                                </Typography>
                                <Box sx={{ marginLeft: '0.5rem' }}>
                                  {obj.rating
                                    ? <Rating rating={obj.rating.toString()} />
                                    : null}
                                </Box>
                              </Box>
                            </Grid>
                            <Box sx={{ marginTop: '10px', width: '80%' }}>
                              <TextField
                                fullWidth={true}
                                placeholder={obj.review}
                                size="small"
                                variant="outlined" />
                            </Box>
                          </Grid>
                        </Card>
                      );
                    })}
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Box>
          <Grid container={true} justifyContent="center">
            {isLoading
              ? (
              <Box>
                <CircularProgress />
              </Box>
              )
              : null}
          </Grid>
          <Typography
            sx={{
              fontWeight: 'bold',
              textAlign: 'start',
              color: 'black',
              marginBottom: '1rem'
            }}
            variant="h4"
          >
            Menu
          </Typography>
          {colIds.map((colId, colIndex) => (
            <Fragment key={colIndex}>
              <Typography
                id="tes"
                sx={{
                  fontWeight: 'medium',
                  textAlign: 'start',
                  marginBottom: '0.25rem'
                }}
                variant="h5"
              >
                {colId.name}
              </Typography>
              {formData?.lines
                ?.filter((obj) => (Array.isArray(obj.colectionId)
                  ? obj.colectionId.some(
                    (collection) => collection === colId.id
                  )
                  : true))
                .map((obj) => {
                  return (
                    <div key={obj.productId} style={{ marginBottom: '0.5rem' }}>
                      <Card sx={{ paddingInline: '0.5rem' }}>
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
                                src={obj.thumbnail}
                                style={{
                                  maxHeight: '100%',
                                  maxWidth: '100%',
                                  marginTop: '0.5rem',
                                  borderRadius: '8px'
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
                            xs={9}
                          >
                            <Box
                              sx={{
                                marginTop: obj.isAvailableForPurchase
                                  ? '2.5rem'
                                  : '1rem',
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                              onClick={() => handleCardClick(
                                obj?.variantId,
                                obj?.productId || ''
                              )}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 'bold',
                                  textAlign: 'start',
                                  marginTop: '-2rem',
                                  color: 'black'
                                }}
                                variant="body2"
                              >
                                {obj.name}
                              </Typography>
                            </Box>
                            {!obj.isAvailableForPurchase && (
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
                            {obj.isAvailableForPurchase
                              ? (
                              <div>
                                <Grid
                                  container={true}
                                  justifyContent="space-between"
                                  spacing={2}
                                  sx={{ marginBottom: '1rem' }}
                                >
                                  <Grid item={true} xs={6}>
                                    <Typography
                                      sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'start',
                                        color: '#1f66d0'
                                      }}
                                      variant="body2"
                                    >
                                      Rp. {obj?.price?.toLocaleString()}
                                    </Typography>
                                  </Grid>
                                  <Grid item={true} xs={6}>
                                    <Typography
                                      sx={{
                                        fontWeight: 'medium',
                                        marginLeft: '2.5rem'
                                      }}
                                      variant="body2"
                                    >
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
                                  <Grid
                                    item={true}
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'end'
                                    }}
                                    xs="auto"
                                  >
                                    <IconButton
                                      aria-label="min"
                                      size="small"
                                      sx={{ color: 'black' }}
                                      onClick={() => handleDecrement(obj.variantId)}
                                    >
                                      <IndeterminateCheckBoxFilled size={24} />
                                    </IconButton>
                                    <Typography
                                      key={obj.productId}
                                      style={{
                                        display: 'inline-block',
                                        margin: '0 0.5rem',
                                        marginTop: '0.5rem'
                                      }}
                                      variant="body2"
                                    >
                                      {obj?.quantity || 0}
                                    </Typography>

                                    <IconButton
                                      aria-label="plus"
                                      size="small"
                                      sx={{ color: 'black' }}
                                      onClick={() => handleIncrement(obj.variantId)}
                                    >
                                      <AddBoxFilled size={24} />
                                    </IconButton>
                                  </Grid>
                                </Box>
                              </div>
                              )
                              : null}
                          </Grid>
                        </Grid>
                      </Card>
                    </div>
                  );
                })}
            </Fragment>
          ))}

          {!checkoutIdFromStorage &&
            <FloatingShoppingButton onClick={handleShoppingButtonClick} />}
        </Box>
      </div>
      <Card
        sx={{
          borderRadius: '12px 12px 0 0',
          bottom: 0,
          marginTop: '1rem',
          paddingInline: '1rem',
          position: 'sticky'
        }}
      >
        <Typography
          sx={{ color: '#1F66D0', fontWeight: 'medium', textAlign: 'start' }}
          variant="body2"
        >
          {totalItems} Item
        </Typography>
        <Grid
          container={true}
          justifyContent="space-between"
          spacing={2}
          sx={{ marginBottom: '1rem' }}
        >
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
        <Grid
          gap={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button
            color="primary"
            size="small"
            sx={{ textTransform: 'none', width: '20%', marginBottom: '0.5rem' }}
            variant="outlined"
            onClick={handleLanjutPembayaranClick}
          >
            <Grid
              alignItems="center"
              container={true}
              justifyContent="center"
              spacing={1}
            >
              <Grid item={true} onClick={handleLanjutPembayaranClick}>
                <ShoppingBasketIcon />
              </Grid>
              <Grid item={true} />
            </Grid>
          </Button>
          <Button
            color="primary"
            size="medium"
            sx={{ textTransform: 'none', width: '80%', marginBottom: '0.5rem' }}
            variant="contained"
            onClick={handleLanjutPembayaranClick}
          >
            Lanjut Pembayaran
          </Button>
        </Grid>
      </Card>
    </>
  );
};

HalamanResto.displayName = 'HalamanResto';

export default HalamanResto;
export { DUMMY_MENU_RECOMDATION, DUMMY_RESTO };
export type { RestoItem };
