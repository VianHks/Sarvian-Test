/* eslint-disable linebreak-style */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DiningRoundedIcon from '@mui/icons-material/DiningRounded';
import { Alert, Avatar, Box, Button, Card, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';


import { AccessTimeFilled, AddBoxFilled, IndeterminateCheckBoxFilled, LocationOnFilled, StarFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { halamanRestoCommand } from '@models/halaman-resto/commands';
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

const HalamanResto: PageComponent = () => {
  interface MenuItem {
    count: number
    harga: number

  }
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state?.halamanResto);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const [count, setCount] = useState(item.count);
  const [orders, setOrders] = useState<MenuRekomendDataModel[]>([DEFAULT_MENUREKOMEND]);
  const [ordersPaketHemat, setOrdersPaketHemat] = useState<PaketHematDataModel[]>([DEFAULT_PAKETHEMAT]);
  const [methode, setMethode] = useState('Pesan Antar');
  const [filteredResto, setFilteredResto] = useState(DUMMY_RESTO);

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

  useEffect(() => {
    if (token) {
      dispatch(halamanRestoCommand.ulasanRatingLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });
      dispatch(halamanRestoCommand.menuRekomendLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });
      dispatch(halamanRestoCommand.paketHematLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });
      dispatch(halamanRestoCommand.restoRatingLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });

      return () => {
        dispatch(halamanRestoCommand.ulasanRatingClear());
      };
    }

    if (MENU_REKOMEND) {
      setOrders(MENU_REKOMEND);
    }

    if (PAKET_HEMAT) {
      setOrdersPaketHemat(PAKET_HEMAT);
    }
  }, []);

  console.log('cekstore', store);

  return (
    <Box sx={{ margin: '0.5rem 0.5rem' }}>
{store?.restoRatingOutput?.map((resto) => {
  const currentHour = new Date().getHours();
  const [openHour, closeHour] = resto.open.split(' - ').map((time) => parseInt(time));
  const isOpen = currentHour >= openHour && currentHour <= closeHour;

  return (
   <div key={resto.id}>
    <Grid item={true} xs={12}>
      {!isOpen && (
        <Alert color="info" severity="info" sx={{ alignItems: 'center', display: 'flex' }}>
          <Typography fontSize="1rem">
          Resto ini lagi tutup, Buka lagi besok jam {resto.open.split(' - ')[0]} ya!
          </Typography>
        </Alert>
      )}
    </Grid>

        <Card key={resto.id} sx={{ borderColor: 'transparent', marginBottom: '1rem', padding: '0.5rem', marginTop: '2rem' }}>
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
          <Avatar src={resto.foto} sx={{ height: '50px', width: '50px' }} />
        </Grid>
        <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'start', paddingTop: '0rem!important' }} xs={8}>
          <Box>
          {resto.verified
            ? <Typography color="neutral-70" sx={{ marginBottom: '0.125' }} variant="body2">
                  Verified by TokoRumahan
              </Typography>
            : null}
            <Typography
              sx={{ fontWeight: 'bold', textAlign: 'start' }}
              variant="h4"
            >
              {resto.restoName}
            </Typography>
          </Box>
        </Grid>
            <Grid item={true} sx={{ display: 'flex', justifyContent: 'center' }} xs={11}>
              <Box gap={1} sx={{ display: 'flex' }}>
                <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                  <StarFilled size={10} style={{ color: '#FBD600' }} />
                  <Typography color="neutral-90" variant="caption">
                    {resto.rating}
                  </Typography>
                </Box>
                <Divider flexItem={true} orientation="vertical" />
                <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                  <LocationOnFilled size={10} style={{ color: 'red' }} />
                  <Typography color="neutral-90" variant="caption">
                    {resto.location}
                  </Typography>
                </Box>
                <Divider flexItem={true} orientation="vertical" />
                <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                  <AccessTimeFilled size={10} />
                  <Typography color="neutral-90" variant="caption">
                    {resto.open}
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
              {store?.ulasanRatingOutput?.map((obj) => {
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
                        {obj.userName}
                      </Typography>
                        <Box sx={{ marginLeft: '0.5rem' }}>
                          <Rating rating={obj.rating} />
                        </Box>
                    </Box>
                  </Grid>
                  <Box sx={{ marginTop: '10px', marginLeft: '10px', width: '100%    ' }}>
                  <TextField fullWidth={true} placeholder={obj.commentTag} size="small" variant="outlined" />
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
                <Typography
                  sx={{ fontWeight: 'medium', textAlign: 'start', marginBottom: '0.25rem' }}
                  variant="h5"
                >
                    Menu Rekomendasi
                </Typography>
                {store?.menuRekomendOutput?.map((obj, index) => {
                  return (
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
                        alt={obj.title}
                        src={obj.foto}
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
                        marginTop: obj.stok > 0 ? '2.5rem' : '1rem',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 'bold', textAlign: 'start', marginTop: '-2rem', color: 'black' }}
                        variant="body2"
                      >
                        {obj.title}
                      </Typography>

                    </Box>
                    {obj.stok === 0 && (
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
                    {obj.stok > 0 && (
                        <div>
                    <Grid container={true} justifyContent="space-between" spacing={2} sx={{ marginBottom: '1rem' }}>
                        <Grid item={true} xs={6}>
                            <Typography
                              sx={{ fontWeight: 'bold', textAlign: 'start', color: '#1f66d0' }}
                              variant="body2"
                            >
                               Rp. {obj.harga.toLocaleString('id-ID')}
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography
                              sx={{ fontWeight: 'medium', textAlign: 'end' }}
                              variant="body2"
                            >
                                Terjual {obj.terjual}
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

                        {obj.customized
                          ? <Grid container={true} sx={{ alignItems: 'center', display: 'flex' }} xs={12}>
                        <Grid item={true} sx={{ textAlign: 'left' }} xs={2}>
                        <DiningRoundedIcon fontSize="small" />
                        </Grid>
                        <Grid item={true} sx={{ textAlign: 'left' }} xs={9}>
                        <Typography
                          sx={{ fontWeight: 'medium', textAlign: 'start' }}
                          variant="body2"
                        >
                            Bisa Di Custom
                        </Typography>
                        </Grid>
                            </Grid>
                          : null}
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
                          {obj.count}
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
                    )}
                  </Grid>

                </Grid>
                </Card>
              </div>
                  );
                })}
            <Typography
              sx={{ fontWeight: 'medium', textAlign: 'start', marginBottom: '0.25rem' }}
              variant="h5"
            >
                Paket Hemat
            </Typography>
            {store?.paketHematOutput?.map((obj, index) => {
              return (
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
                        alt={obj.title}
                        src={obj.foto}
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
                        marginTop: obj.stok > 0 ? '2.5rem' : '1rem',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 'bold', textAlign: 'start', marginTop: '-2rem', color: 'black' }}
                        variant="body2"
                      >
                        {obj.title}
                      </Typography>

                    </Box>
                    {obj.stok === 0 && (
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
                    {obj.stok > 0 && (
                        <div>
                    <Grid container={true} justifyContent="space-between" spacing={2} sx={{ marginBottom: '1rem' }}>
                        <Grid item={true} xs={6}>
                            <Typography
                              sx={{ fontWeight: 'bold', textAlign: 'start', color: '#1f66d0' }}
                              variant="body2"
                            >
                               Rp. {obj.harga.toLocaleString('id-ID')}
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography
                              sx={{ fontWeight: 'medium', textAlign: 'end' }}
                              variant="body2"
                            >
                                Terjual {obj.terjual}
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

                        {obj.customized
                          ? <Grid container={true} sx={{ alignItems: 'center', display: 'flex' }} xs={12}>
                        <Grid item={true} sx={{ textAlign: 'left' }} xs={2}>
                        <DiningRoundedIcon fontSize="small" />
                        </Grid>
                        <Grid item={true} sx={{ textAlign: 'left' }} xs={9}>
                        <Typography
                          sx={{ fontWeight: 'medium', textAlign: 'start' }}
                          variant="body2"
                        >
                            Bisa Di Custom
                        </Typography>
                        </Grid>
                            </Grid>
                          : null}
                      <Grid item={true} sx={{ display: 'flex', justifyContent: 'end' }} xs="auto">
                        <IconButton
                          aria-label="min"
                          size="small"
                          sx={{ color: 'black' }}
                          onClick={() => handleDecrementPaketHemat(index)}
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
                          {obj.count}
                        </Typography>
                        <IconButton
                          aria-label="plus"
                          size="small"
                          sx={{ color: 'black' }}

                          onClick={() => handleIncrementPaketHemat(index)}
                        >
                          <AddBoxFilled size={24} />
                        </IconButton>
                      </Grid>

                    </Box>
                        </div>
                    )}
                  </Grid>

                </Grid>

                </Card>
              </div>
              );
            })}
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
            >
                Lanjut Pembayaran
            </Button>
            <FloatingShoppingButton onClick={handleShoppingButtonClick} />
    </Box>
  );
};

HalamanResto.displayName = 'HalamanResto';

export default HalamanResto;
