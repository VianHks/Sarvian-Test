/* eslint-disable linebreak-style */
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DiningRoundedIcon from '@mui/icons-material/DiningRounded';
import { Alert, Avatar, Box, Button, Card, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';

import { AccessTimeFilled, AddBoxFilled, IndeterminateCheckBoxFilled, LocationOnFilled, StarFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { routes } from '@config/routes';
import { useAuth } from '@hooks/use-auth';
import { ChannelCommand } from '@models/halaman-resto/reducers';
import { RatingCommand } from '@models/rating/commands';
import { useStore } from '@models/store';

import FloatingShoppingButton from './floatingshopping-button';
import Rating from './rating';

import Bakar from '@assets/images/Bakar.png';
import ProfilFoto from '@assets/images/Orang.svg';
import Pisan from '@assets/images/Pisan.png';

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
export interface MenuItem {
  id: number
  userName: string
  rating: string
  comment: string

}

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
interface MenuRekomendDataModel {
  count: number
  foto: string
  harga: number
  title: string
  terjual: number
  customized: boolean
  stok: number
}
interface PaketHematDataModel {
  count: number
  foto: string
  harga: number
  title: string
  terjual: number
  customized: boolean
  stok: number
}

const MENU_REKOMEND: MenuRekomendDataModel[] = [
  {
    count: 0,
    foto: `${Pisan}`,
    harga: 24000,
    title: 'Ayam Goreng Pisan',
    terjual: 4,
    customized: true,
    stok: 5
  },
  {
    count: 0,
    foto: `${Bakar}`,
    harga: 22000,
    title: 'Ayam Bakar',
    terjual: 3,
    customized: false,
    stok: 3
  }
];
const PAKET_HEMAT: PaketHematDataModel[] = [
  {
    count: 0,
    foto: `${Pisan}`,
    harga: 24000,
    title: 'Ayam Goreng Pisan',
    terjual: 4,
    customized: true,
    stok: 4
  },
  {
    count: 0,
    foto: `${Bakar}`,
    harga: 22000,
    title: 'Ayam Bakar',
    terjual: 3,
    customized: false,
    stok: 3
  },
  {
    count: 0,
    foto: `${Bakar}`,
    harga: 22000,
    title: 'Ayam Bakar Pedes',
    terjual: 7,
    customized: false,
    stok: 0
  }
];

const DEFAULT_MENUREKOMEND: MenuRekomendDataModel = {

  count: 0,
  foto: '',
  harga: 0,
  title: '',
  terjual: 0,
  customized: false,
  stok: 0
};
const DEFAULT_PAKETHEMAT: PaketHematDataModel = {
  count: 0,
  foto: '',
  harga: 0,
  title: '',
  terjual: 0,
  customized: false,
  stok: 0
};

interface RestoSchedule {
  day: string
  open: string
  closed: string
  isOpen: boolean
}

const HalamanResto: PageComponent = () => {
  interface MenuItem {
    count: number
    harga: number

  }
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  const [orders, setOrders] = useState<MenuRekomendDataModel[]>([DEFAULT_MENUREKOMEND]);
  const [ordersPaketHemat, setOrdersPaketHemat] = useState<PaketHematDataModel[]>([DEFAULT_PAKETHEMAT]);
  const location = useLocation();
  const [methode, setMethode] = useState('Pesan Antar');
  const [filteredResto, setFilteredResto] = useState(DUMMY_RESTO);
  const channelId = 'Q2hhbm5lbDo0';
  const daysOfWeek = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
  const currentDayIndex = new Date().getDay();
  const currentDay = daysOfWeek[currentDayIndex];
  const jadwalOperasional = JSON.parse(store?.halamanResto?.channelDetailOutput?.data?.channel?.metafields?.jadwal_operasional || '[]');
  const currentRoute = routes.find((route) => route.path === location.pathname);
  let dropDownValue = currentRoute?.meta?.dropDownValue || '';
  const filteredJadwal = jadwalOperasional.filter((resto: RestoSchedule) => {
    return resto.day.toLowerCase() === currentDay && resto.isOpen;
  });
  const [colIds, setColIds] = useState<{ id: string, name: string }[]>([]);

  const calculateTotal = (selectedItems: MenuItem[]) => {
    let amount = 0;
    let items = 0;

    selectedItems.forEach((item: MenuItem) => {
      amount += item.count * item.harga;
      items += item.count;
    });

    setTotalAmount(amount);
    setTotalItems(items);
  };
  const handleShoppingButtonClick = () => {
    console.log('Tombol Belanja Diklik');
  };

  const handleIncrement = (index: number) => {
    const updatedOrders = [...orders];

    updatedOrders[index].count += 1;
    setOrders(updatedOrders);
    calculateTotal([...updatedOrders, ...ordersPaketHemat]);
  };

  const handleDecrement = (index: number) => {
    if (orders[index].count > 0) {
      const updatedOrders = [...orders];

      updatedOrders[index].count -= 1;
      setOrders(updatedOrders);
      calculateTotal([...updatedOrders, ...ordersPaketHemat]);
    }
  };

  const handleIncrementPaketHemat = (index: number) => {
    const updatedOrders = [...ordersPaketHemat];

    updatedOrders[index].count += 1;
    setOrdersPaketHemat(updatedOrders);
    calculateTotal([...orders, ...updatedOrders]);
  };

  const handleDecrementPaketHemat = (index: number) => {
    if (ordersPaketHemat[index].count > 0) {
      const updatedOrders = [...ordersPaketHemat];

      updatedOrders[index].count -= 1;
      setOrdersPaketHemat(updatedOrders);
      calculateTotal([...orders, ...updatedOrders]);
    }
  };

  const handleLihatSemuaClick = () => {
    navigate('./ulasan-rating');
  };

  const handleLanjutPembayaranClick = () => {
    navigate('/keranjang');
  };

  useEffect(() => {
    const paramMetadata = {

      after: '',
      channel: 'makan',
      filterKey: 'recomendation',
      filterValue: 'true',
      first: 100

    };
    if (colIds && colIds.length > 0) {
      const colIdsOnly = colIds.map((colObj) => colObj.id);

      console.log('cekcollid', colIdsOnly);

      const paramCollection = {

        after: '',
        channel: 'makan',
        collection: colIdsOnly,
        direction: 'ASC',
        field: 'NAME',
        first: 100

      };

      dispatch(ChannelCommand.getproductbyCollection(paramCollection, token || ''));
    }

    dispatch(ChannelCommand.getCollectionsbyMetadata(paramMetadata, token || ''));
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
  }, [dispatch, colIds, token]);

  useEffect(() => {
    const collectionIds = (store?.halamanResto?.productListOutput?.data || [])
      .filter((category) => category.products.totalCount > 0)
      .map((category) => ({
        id: category.id.toString(),
        name: category.name
      }));

    setColIds(collectionIds);
  }, [store?.halamanResto?.productListOutput, dropDownValue]);

  console.log('cekdihalrestonilainya', dropDownValue);

  return (
    <Box sx={{ margin: '0.5rem 0.5rem' }}>
{filteredJadwal.map((resto: RestoSchedule) => {
  const currentHour = new Date().getHours();
  const [openHour, closeHour] = resto.open.split(' - ').map((time) => parseInt(time));

  const isOpen = currentHour >= openHour && currentHour <= closeHour;

  return (
   <div key={store?.halamanResto?.channelDetailOutput?.data?.channel?.id}>
    <Grid item={true} xs={12}>
      {!isOpen && (
        <Alert color="info" severity="info" sx={{ alignItems: 'center', display: 'flex' }}>
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
                  sx={{ fontWeight: 'medium', textAlign: 'start', marginBottom: '0.25rem' }}
                  variant="h5"
                >
              {colId.name}

                </Typography>
                {store?.halamanResto?.productByCollectionsOutput?.data
                  ?.filter((obj) => obj.collections.some((collection) => collection.id === colId.id))
                  .map((obj, index) => (

        <div key={obj.id} style={{ marginBottom: '0.5rem' }}>

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
                    src={obj.thumbnail.url}
                    style={{ maxHeight: '100%', maxWidth: '100%', marginTop: '0.5rem' }} />
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
                        <Typography sx={{ fontWeight: 'medium', textAlign: 'end' }} variant="body2">
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
                          onClick={() => handleDecrement(index)}
                        >
                          <IndeterminateCheckBoxFilled size={24} />
                        </IconButton>
                        <Typography
                          style={{
                            display: 'inline-block',
                            margin: '0 0.5rem',
                            marginTop: '0.5rem'
                          }}
                          variant="body2"
                        >
                          0
                        </Typography>
                        <IconButton
                          aria-label="plus"
                          size="small"
                          sx={{ color: 'black' }}
                          onClick={() => handleIncrement(index)}
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
  );
};

HalamanResto.displayName = 'HalamanResto';

export default HalamanResto;
