import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  styled,
  TextField,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material';

import {
  AccessTimeFilled,
  ArrowBackFilled,
  LocationOnFilled,
  SearchOutlined,
  StarFilled
} from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { ChannelCommand } from '@models/halaman-resto/reducers';
import { RatingCommand } from '@models/rating/commands';
import { useStore } from '@models/store';

import FloatingShoppingButton from './floatingshopping-button';
import ListMenuRecomendation from './list-menu-recomendation';
import ListMenu from './listmenu';
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
interface RestoSchedule {
  closed: string
  day: string
  isOpen: boolean
  open: string
}

interface LinesModel {
  colectionId: string
  isAvailableForPurchase: boolean
  lineId: string
  metadata: [
    {
      key: string
      value: string
    }
  ]
  name: string
  note: string
  price: string
  productId: string
  quantity: number
  thumbnail: string
  update: string
  variantId: string
}

const SESSION_STORAGE_KEYS = {
  CHECKOUT: 'CheckoutId',
  COLIDS: 'ColIds'
};

const HalamanResto: PageComponent = () => {
  const theme = useTheme();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  const [colIds, setColIds] = useState<{ id: string, name: string }[]>([]);
  const checkoutIdFromStorage =
    window.sessionStorage.getItem(SESSION_STORAGE_KEYS.CHECKOUT) ?? '';
  const [isLoading, setIsLoading] = useState(false);
  const [slug, setSlug] = useState('');
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get('id');
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
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [showAlert, setShowAlert] = useState(true);
  const filteredCategories =
    store?.halamanResto?.productListOutput?.data?.filter(
      (category) => category.products.totalCount > 0
    ) || [];

  const handleLihatSemuaClick = () => {
    navigate(`./ulasan-rating?id=${channelId}`);
  };

  const handleBack = () => {
    navigate(-1);
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

  /*
   * Const scrollToTesElement = () => {
   *   const tesElement = tesElementRef.current;
   */

  /*
   *   // Check if tesElement is not null or undefined before accessing its properties
   *   if (tesElement) {
   *     tesElement.scrollTop = tesElement.scrollHeight;
   *   }
   * };
   */

  /*
   * useEffect(() => {
   *   scrollToTesElement();
   * }, []);
   */

  const calculateTotal = (lines: LinesModel[]) => {
    let totalAmount = 0;
    let totalQuantity = 0;

    lines.forEach((line) => {
      const price = parseFloat(line.price);
      const quantity = line.quantity || 0;

      totalAmount += price * quantity;
      totalQuantity += quantity;
    });

    return { totalAmount, totalQuantity };
  };

  useEffect(() => {
    if (store?.halamanResto?.linesOutput) {
      const { totalAmount, totalQuantity } = calculateTotal(
        store.halamanResto.linesOutput
      );

      setTotalAmount(totalAmount);
      setTotalItems(totalQuantity);
    }
  }, [store?.halamanResto?.linesOutput]);

  useEffect(() => {
    if (store?.halamanResto?.channelDetailOutput?.data?.channel.slug) {
      setSlug(store?.halamanResto?.channelDetailOutput?.data?.channel.slug || '');
    }

    if (slug !== '') {
      const paramMetadata = {
        after: '',
        channel: slug,
        filterKey: 'recomendation',
        filterValue: 'true',
        first: 10
      };

      dispatch(
        ChannelCommand.getCollectionsbyMetadata(paramMetadata, token || '')
      );
      const param = {
        after: '',
        channel: slug,
        direction: 'ASC',
        field: 'NAME',
        first: 100,
        published: 'PUBLISHED'
      };

      dispatch(ChannelCommand.getCollections(param, token || ''));
    }
  }, [store?.halamanResto?.channelDetailOutput]);

  console.log('cekslug', slug);

  const handleShoppingButtonClick = () => {
    navigate('/keranjang');
  };

  const handleLanjutPembayaranClick = () => {
    setIsLoading(true);
    const filteredPutLines = (store?.halamanResto?.linesOutput || [])
      .map((line) => {
        return {
          colectionId: line?.colectionId || '',
          isAvailableForPurchase: line?.isAvailableForPurchase || false,
          lineId: line?.lineId || '',
          metadata: line?.metadata || [],
          name: line?.name || '',
          note: line?.note || '',
          price: line?.price || '0',
          productId: line?.productId || '',
          quantity: line?.quantity || 0,
          thumbnail: line?.thumbnail || '',
          update: line?.update || '',
          variantId: line?.variantId || ''
        };
      })
      .filter((line) => line.quantity > 0 && line.lineId);

    const checkoutIdFromStorage = sessionStorage.getItem('CheckoutId');

    if (checkoutIdFromStorage) {
      const linesToUpdate = filteredPutLines.filter((line) => line.lineId);
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

    const filteredPostLines = (store?.halamanResto?.linesOutput || [])
      .map((line) => {
        return {
          colectionId: line?.colectionId || '',
          isAvailableForPurchase: line?.isAvailableForPurchase || false,
          lineId: line?.lineId || '',
          metadata: line?.metadata || [],
          name: line?.name || '',
          note: line?.note || '',
          price: line?.price || '0',
          productId: line?.productId || '',
          quantity: line?.quantity || 0,
          thumbnail: line?.thumbnail || '',
          update: line?.update || '',
          variantId: line?.variantId || ''
        };
      })
      .filter((line) => line.quantity > 0 && !line.lineId);

    if (filteredPostLines.length > 0 && slug !== '') {
      const paramCreate = {
        after: '',
        channel: slug,
        deliveryMethodId:
          'V2FyZWhvdXNlOjRhYjM1NjU4LTQ2MTMtNGUwYS04MWNlLTA4NjVlNjMyMzIwMA==',
        first: 100,
        lines: filteredPostLines.map((line) => ({
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
  /*
   * Const handleScroll = () => {
   *   const tesElement = tesElementRef.current;
   *   const listMenuElement = listMenuElementRef.current;
   */

  /*
   *   if (tesElement && listMenuElement) {
   *     listMenuElement.scrollTop = tesElement.scrollTop;
   *   }
   * };
   */

  /*
   * useEffect(() => {
   *   handleScroll();
   */

  /*
   *   const tesElement = tesElementRef.current;
   *   tesElement?.addEventListener('scroll', handleScroll);
   */

  /*
   *   return () => {
   *     tesElement?.removeEventListener('scroll', handleScroll);
   *   };
   * }, []);
   */

  useEffect(() => {
    // Const emailUser = 'ridwan.azis@navcore.com';
    const paramChekoutList = {
      channel: slug,
      token
    };

    if (token) {
      dispatch(ChannelCommand.getCheckoutList(paramChekoutList, token || ''));
    }

    if (channelId) {
      dispatch(ChannelCommand.getChannelDetail(channelId, token || ''));

      const dummyId = 'Q2hhbm5lbDo0';

      dispatch(RatingCommand.RatingLoad(dummyId)).catch((err: unknown) => {
        console.error(err);
      });
    }

    return () => {
      dispatch(RatingCommand.RatingClear());
    };
  }, [dispatch, token]);

  const scrollToKategoriMenu = (event: SelectChangeEvent<string>) => {
    const selectedCategory = event.target.value as string;
    const listMenuElement = document.getElementById(selectedCategory);

    listMenuElement?.scrollIntoView({ behavior: 'smooth' });
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

  console.log('MAINPAGESTORE', store);

  return (
    <>
      <div>
        <Toolbar
          sx={{
            backgroundColor: '#D5ECFE',
            left: 0,
            paddingInline: '1rem',
            position: 'fixed',
            width: '100%',
            top: 0,
            zIndex: 100
          }}
        >
          <IconButton
            aria-label="back"
            color="default"
            edge="start"
            size="large"
            sx={{ marginTop: '0.2rem', mr: -2 }}
          >
            <ArrowBackFilled onClick={handleBack} />
          </IconButton>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              marginLeft: '0.5rem'
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
                  backgroundColor: '#FFFFFF',
                  color: 'black',
                  marginRight: 1,
                  width: 210
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
              sx={{ backgroundColor: '#FFFFFF', marginLeft: '0.5rem' }}
            >
              <SearchOutlined fontSize="25px" style={{ color: 'black' }} />
            </IconButton>
            <IconButton
              aria-label="share"
              color="inherit"
              size="small"
              sx={{ backgroundColor: '#FFFFFF', marginLeft: '0.5rem' }}
            >
              <ShareOutlinedIcon fontSize="medium" style={{ color: 'black' }} />
            </IconButton>
          </Box>
        </Toolbar>

        <Box
          sx={{
            margin: '0.5rem 0.5rem',
            marginBottom: '7rem',
            marginTop: '5rem',
            paddingInline: '1rem'
          }}
        >
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
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '1rem',
                    marginTop: '2rem',
                    padding: '0.5rem'
                  }}
                >
                  <Grid container={true} spacing={2}>
                    <Grid
                      item={true}
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: '0.25rem'
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
                            sx={{
                              fontSize: '0.75rem',
                              marginLeft: '0.25rem',
                              marginTop: '0.5rem'
                            }}
                            variant="body2"
                          >
                            Verified by TokoRumahan
                          </Typography>
                          )
                          : null}
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            marginLeft: '0.25rem',
                            marginTop: '0.5rem',
                            textAlign: 'start'
                          }}
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

          {store?.rating?.data && store?.rating?.data.length > 0
            ? (
            <>
              <Grid
                container={true}
                justifyContent="space-between"
                spacing={2}
                sx={{ marginBottom: '1rem' }}
              >
                <Grid item={true} xs={6}>
                  <Typography
                    sx={{
                      color: '#1F66D0',
                      fontWeight: 'bold',
                      textAlign: 'start'
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
                      backgroundColor: '#FBD600',
                      border: 'none',
                      color: 'black',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      paddingInline: '0.5rem'
                    }}
                    variant="outlined"
                    onClick={handleLihatSemuaClick}
                  >
                    Lihat semua
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ paddingInline: '1.5rem' }}>
                <Card
                  sx={{
                    borderColor: 'transparent',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '1rem',
                    marginInline: '-1.5rem',
                    position: 'relative',
                    zIndex: 20
                  }}
                >
                  <Box sx={{ overflowX: 'auto' }}>
                    <Grid
                      container={true}
                      sx={{ overflowX: 'auto', width: '100rem' }}
                    >
                      <Grid
                        item={true}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        {store?.rating?.data?.map((obj) => {
                          return (
                            <Card
                              key={obj.id}
                              sx={{
                                borderColor: 'transparent',
                                padding: '0.5rem'
                              }}
                            >
                              <Grid container={true} spacing={2}>
                                <Grid
                                  item={true}
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginLeft: '-0.25rem'
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
                                    marginTop: '0.85rem',
                                    paddingTop: '0rem!important'
                                  }}
                                  xs={8}
                                >
                                  <Box>
                                    <Typography
                                      sx={{
                                        fontWeight: 'bold',
                                        textAlign: 'start'
                                      }}
                                      variant="h6"
                                    >
                                      {obj.customerId}
                                    </Typography>
                                    <Box sx={{ marginTop: '0.25rem' }}>
                                      {obj.rating
                                        ? (
                                        <Rating
                                          rating={obj.rating.toString()} />
                                        )
                                        : null}
                                    </Box>
                                  </Box>
                                </Grid>
                                <Box
                                  sx={{
                                    marginLeft: '-0.5rem',
                                    marginTop: '10px',
                                    paddingInline: '1rem',
                                    width: '83%'
                                  }}
                                >
                                  <TextField
                                    InputProps={{
                                      readOnly: true,
                                      style: { maxHeight: 'none' }
                                    }}
                                    fullWidth={true}
                                    multiline={true}
                                    size="small"
                                    sx={{
                                      color: 'black'
                                    }}
                                    value={obj.review}
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
            </>
            )
            : null}

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
              color: 'black',
              fontWeight: 'bold',
              marginBottom: '1rem',
              textAlign: 'start'
            }}
            variant="h4"
          >
            Menu
          </Typography>
          <ListMenuRecomendation />
          <ListMenu scrollToKategoriMenu={scrollToKategoriMenu} />
          {!checkoutIdFromStorage &&
            <FloatingShoppingButton onClick={handleShoppingButtonClick} />}
        </Box>
      </div>
      <Card
        sx={{
          borderRadius: '12px 12px 0 0',
          bottom: 0,
          left: 0,
          marginTop: '1rem',
          paddingInline: '1rem',
          position: 'fixed',
          width: '100%'
        }}
      >
        <Typography
          sx={{
            color: '#1F66D0',
            fontWeight: 'medium',
            marginTop: '0.5rem',
            textAlign: 'start'
          }}
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
              sx={{ color: 'black', fontWeight: 'medium', textAlign: 'start' }}
              variant="h6"
            >
              Total Pembayaran
            </Typography>
          </Grid>
          <Grid item={true} xs={6}>
            <Typography
              sx={{ color: 'black', fontWeight: 'medium', textAlign: 'end' }}
              variant="h6"
            >
              Rp. {totalAmount.toLocaleString('id-ID')}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          gap={1}
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {/* <Button
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
          </Button> */}
          <Button
            size="medium"
            sx={{
              background: theme.palette.primary.gradient,
              marginBottom: '0.5rem',
              textTransform: 'none',
              width: '100%'
            }}
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
export type { RestoItem };
