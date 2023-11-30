import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Card, CardContent, CardMedia, Chip, Divider, Grid, InputAdornment, TextField, Typography, useTheme } from '@mui/material';

import { AccessTimeFilled, ExpandMoreFilled, FilterAltFilled, LocationOnFilled, SearchFilled, StarFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { berandaCommand } from '@models/beranda/commands';
import { useStore } from '@models/store';
import FloatingShoppingButton from '@pages/halaman-resto/floatingshopping-button';
import type { FoodsDataModel, FoodsListDataModel } from '@pages/personalized-recomendation';
import { DEFAULT_FOODS_LIST } from '@pages/personalized-recomendation';

import Bubur from '@assets/images/Bubur.png';
import Chinese from '@assets/images/Chinese.png';
import Dessert from '@assets/images/Dessert.png';
import Jajanan from '@assets/images/Jajanan.png';
import Kopi from '@assets/images/Kopi.png';
import MieBaso from '@assets/images/MieBaso.png';
import Minuman from '@assets/images/Minuman.png';
import Nasi from '@assets/images/Nasi.png';
import Padang from '@assets/images/Padang.png';
import Roti from '@assets/images/Roti.png';
import Sate from '@assets/images/Sate.png';
import Sunda from '@assets/images/Sunda.png';
import dineInIcon from '@assets/images/pages/beranda/DineIn.svg';
import pesanAntarIcon from '@assets/images/pages/beranda/PesanAntar.svg';
import pickUpIcon from '@assets/images/pages/beranda/PickUp.svg';
import recomendationIcon from '@assets/images/pages/beranda/Rekomendasi 1.svg';
import jajananLokalIcon from '@assets/images/pages/beranda/jajananLokalIcon.svg';
import recomendationImage from '@assets/images/pages/beranda/recomandation.svg';
import restoImage from '@assets/images/pages/beranda/resto.svg';
import terdekat from '@assets/images/pages/beranda/terdekat.svg';
import terhemat from '@assets/images/pages/beranda/terhemat.svg';
import terlaris from '@assets/images/pages/beranda/terlaris.svg';
import topRated from '@assets/images/pages/beranda/topRated.svg';
import verifyIcon from '@assets/images/pages/beranda/verify.svg';

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
  itemName: string
  itemPrice: number
  location: number
  orderMethode: string
  restoName: string
  sold: number
  verified: boolean
}

const CARD_PESAN_ANTAR = [
  {
    icon: `${topRated}`,
    path: 'top-rate',
    title: 'Top Rate'
  },
  {
    icon: `${terlaris}`,
    path: 'terlaris',
    title: 'Terlaris'
  },
  {
    icon: `${terhemat}`,
    path: 'terhemat',
    title: 'Terhemat'
  },
  {
    icon: `${terdekat}`,
    path: 'terdekat',
    title: 'Terdekat'
  }
];

// eslint-disable-next-line import/exports-last
export const DUMMY_MENU_RECOMDATION = [
  {
    id: 1,
    itemName: 'Ayam Goreng Pisan',
    itemPrice: 100000,
    location: 1.5,
    orderMethode: 'Pesan Antar, Pick Up',
    restoName: 'Resto Sunda Gila 1',
    sold: 24,
    verified: true
  },
  {
    id: 2,
    itemName: 'Bubur Sumsum',
    itemPrice: 120000,
    location: 1.5,
    orderMethode: 'Pesan Antar, Pick Up, Dine In',
    restoName: 'Dapur Pak Raden',
    sold: 24,
    verified: false
  },
  {
    id: 3,
    itemName: 'Ayam Goreng Kemarin',
    itemPrice: 130000,
    location: 1.5,
    orderMethode: 'Dine In',
    restoName: 'Kedai Nyonyah',
    sold: 24,
    verified: true
  },
  {
    id: 4,
    itemName: 'Bebek Bubuk',
    itemPrice: 130000,
    location: 1.5,
    orderMethode: 'Dine In',
    restoName: 'Warung Gusti',
    sold: 24,
    verified: true
  },
  {
    id: 5,
    itemName: 'Gorengan Rebus',
    itemPrice: 130000,
    location: 1.5,
    orderMethode: 'Dine In',
    restoName: 'Warung Cak Waluh',
    sold: 24,
    verified: true
  },
  {
    id: 4,
    itemName: 'Kopi Paste',
    itemPrice: 130000,
    location: 1.5,
    orderMethode: 'Dine In',
    restoName: 'Warung Kopas',
    sold: 24,
    verified: true
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
  },
  {
    id: 2,
    location: 1.5,
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Pesan Antar, Pick Up, Dine In',
    rating: '4.8',
    restoName: 'Dapur Pak Raden',
    verified: false
  },
  {
    id: 3,
    location: 1.5,
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Dine In',
    rating: '5.0',
    restoName: 'Kedai Nyonyah',
    verified: true
  },
  {
    id: 4,
    location: 1.5,
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Pick Up',
    rating: '3.1',
    restoName: 'Warung Gusti',
    verified: true
  },
  {
    id: 5,
    location: 1.5,
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Dine In',
    rating: '1.4',
    restoName: 'Warung Cak Waluh',
    verified: false
  },
  {
    id: 6,
    location: 1.5,
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Pesan Antar, Dine In',
    rating: '2.6',
    restoName: 'Warung Kopas',
    verified: true
  }
];

const DUMMY_FOODS = [
  {
    id: '0',
    photo: `${Minuman}`,
    title: 'Minuman'
  },
  {
    id: '1',
    photo: `${Nasi}`,
    title: 'Aneka Nasi'
  },
  {
    id: '2',
    photo: `${Roti}`,
    title: 'Roti'
  },
  {
    id: '3',
    photo: `${Jajanan}`,
    title: 'Jajanan'
  },
  {
    id: '4',
    photo: `${Kopi}`,
    title: 'Kopi'
  },
  {
    id: '5',
    photo: `${MieBaso}`,
    title: 'Mie & Bakso'
  },
  {
    id: '6',
    photo: `${Dessert}`,
    title: 'Desert'
  },
  {
    id: '7',
    photo: `${Sunda}`,
    title: 'Sunda'
  },
  {
    id: '8',
    photo: `${Chinese}`,
    title: 'Chinese'
  },
  {
    id: '9',
    photo: `${Padang}`,
    title: 'Padang'
  },
  {
    id: '10',
    photo: `${Sate}`,
    title: 'Sate'
  },
  {
    id: '11',
    photo: `${Bubur}`,
    title: 'Bubur'
  }
];

const Home: PageComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state?.beranda);
  const [methode, setMethode] = useState('Pesan Antar');
  const [filteredResto, setFilteredResto] = useState(store?.berandaRestoListOutput);
  const [searchValue, setSearchValue] = useState('');
  const [foodsList, setFoodsList] = useState<FoodsListDataModel>(DEFAULT_FOODS_LIST);

  const filterResto = (method: string) => {
    const filtered = store?.berandaRestoListOutput?.filter((resto) => {
      return resto.orderMethode.toLowerCase().includes(method.toLowerCase());
    });

    setFilteredResto(filtered);
  };

  const handleFoodItemClick = (clickedItem: FoodsDataModel, mealType: string) => {
    setFoodsList((prevFoodsList) => {
      const updatedFoodsList = { ...prevFoodsList };

      const isItemAlreadySelected = updatedFoodsList[mealType].some((item) => {
        return item.id === clickedItem.id;
      });

      if (isItemAlreadySelected) {
        updatedFoodsList[mealType] = updatedFoodsList[mealType].filter(
          (item) => item.id !== clickedItem.id
        );
      } else {
        updatedFoodsList[mealType] = [...updatedFoodsList[mealType], clickedItem];
      }

      return updatedFoodsList;
    });
  };

  useEffect(() => {
    if (token) {
      dispatch(berandaCommand.menuBerandaLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });
      dispatch(berandaCommand.makananLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });
      dispatch(berandaCommand.restoListLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });

      return () => {
        dispatch(berandaCommand.menuBerandaClear());
      };
    }

    filterResto(methode);
  }, [methode]);

  console.log('cekstore', store);

  const handleMethode = (newValue: string) => {
    setMethode(newValue);
    filterResto(newValue);
  };

  const handleSearch = () => {
    navigate(`/beranda/search-result?query=${searchValue}`);
  };

  return (
    <Box sx={{ margin: '1rem 1.5rem' }}>
      <Typography color="neutral-90" sx={{ marginBottom: '0.5rem' }} variant="body2">
        Antar ke:
      </Typography>
      <Grid container={true} gap={1} sx={{ alignItems: 'center', marginBottom: '1rem' }}>
        <Grid item={true}>
          <LocationOnFilled size={16} style={{ color: 'red' }} />
        </Grid>
        <Grid item={true}>
          <Typography color="neutral-90" fontWeight="bold" variant="h5">
            Jl. Hegarmanah No.28
          </Typography>
        </Grid>
        <Grid item={true}>
          <ExpandMoreFilled />
        </Grid>
      </Grid>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <FilterAltFilled style={{ color: '#317FF2' }} />
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start" onClick={handleSearch}>
              <SearchFilled />
            </InputAdornment>
          )
        }}
        fullWidth={true}
        placeholder="Mau makan apa hari ini?"
        size="small"
        sx={{ marginBottom: '1rem' }}
        value={searchValue}
        variant="outlined"
        onChange={(e) => setSearchValue(e.target.value)} />
      <Grid container={true} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: methode === 'Pesan Antar' ? '1rem' : '2rem' }}>
        <Grid item={true}>
          <Chip color={methode === 'Pesan Antar' ? 'primary' : 'default'} icon={<img alt="icon" sizes="large" src={pesanAntarIcon} />} label="Pesan Antar" onClick={() => handleMethode('Pesan Antar')} />
        </Grid>
        <Grid item={true}>
          <Chip color={methode === 'Pick Up' ? 'primary' : 'default'} icon={<img alt="icon" sizes="large" src={pickUpIcon} />} label="Pick Up" onClick={() => handleMethode('Pick Up')} />
        </Grid>
        <Grid item={true}>
          <Chip color={methode === 'Dine In' ? 'primary' : 'default'} icon={<img alt="icon" sizes="large" src={dineInIcon} />} label="Dine In" onClick={() => handleMethode('Dine In')} />
        </Grid>
      </Grid>
      {methode === 'Pesan Antar'
        ? <Grid container={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          {CARD_PESAN_ANTAR.map((obj) => {
            return (
            <Grid item={true} key={obj.title} xs="auto">
              <Card sx={{ padding: '0.8rem' }} onClick={() => navigate(`./search-result?query=${obj.path}`)}>
                <img alt={obj.title} src={obj.icon} />
              </Card>
              <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }} variant="body2">{obj.title}</Typography>
            </Grid>
            );
          })}
          </Grid>
        : null}
      <Card sx={{ backgroundColor: '#D5ECFE', borderColor: 'transparent', borderRadius: 0, boxShadow: 'none', marginBottom: '1rem', marginInline: '-1.5rem', padding: '1rem 1.5rem' }}>
        <Box gap={1} sx={{ display: 'flex', marginBottom: '0.875rem' }}>
          <img alt="test" src={recomendationIcon} />
          <Typography color="neutral-90" fontWeight="bold" variant="h5">
            Rekomendasi Untukmu
          </Typography>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <Grid container={true} sx={{ width: '28.75rem' }}>
            <Grid item={true} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {store?.menuBerandaOutput?.map((obj) => {
                return (
                  <Card key={obj.id} sx={{ borderColor: 'transparent', marginRight: '0.5rem', padding: '0.5rem', width: '9.25rem' }}>
                    <CardMedia
                      image={recomendationImage}
                      sx={{ height: '6rem', marginBottom: '0.5' }}
                      title="Recomendation Menu" />
                    <CardContent sx={{ padding: 0 }}>
                      <Typography
                        color="neutral-90"
                        fontWeight="bold"
                        sx={{
                          marginBottom: '0.125',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        variant="h6"
                      >
                        {obj.itemName}
                      </Typography>
                      <Typography
                        color="neutral-70"
                        sx={{
                          marginBottom: '0.125',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        variant="body2"
                      >
                        {obj.restoName}
                      </Typography>
                      <Typography color="primary" fontWeight="bold" sx={{ marginBottom: '0.125' }} variant="h6">
                        Rp. {obj.itemPrice.toLocaleString('id-ID')}
                      </Typography>
                      <Grid container={true} justifyContent="space-between">
                        <Box>
                          <Grid container={true}>
                            <Grid item={true}>
                              <LocationOnFilled size={12} style={{ color: 'red' }} />
                            </Grid>
                            <Grid item={true}>
                              <Typography color="neutral-90" variant="caption">
                                {obj.location}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Typography color="neutral-90" variant="caption">
                            Terjual {obj.sold}
                          </Typography>
                        </Box>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Card sx={{ backgroundColor: '#D5ECFE', borderColor: 'transparent', borderRadius: 0, boxShadow: 'none', marginBottom: '1rem', marginInline: '-1.5rem', padding: '1rem 1.5rem' }}>
      <Box gap={1} sx={{ display: 'flex', marginBottom: '1.125rem' }}>
        <img alt="test" src={methode === 'Pick Up' ? pickUpIcon : methode === 'Dine In' ? dineInIcon : jajananLokalIcon} />
        <Typography color="neutral-90" fontWeight="bold" variant="h5">
          {methode === 'Pesan Antar' ? 'Eksplor Jajanan Lokal' : methode === 'Dine In' ? 'Dine-In di Resto' : 'Resto yang bisa Pickup'}
        </Typography>
      </Box>
      { methode === 'Pesan Antar'
        ? <Box sx={{ overflowX: 'auto' }}>
            <Grid container={true} sx={{ width: '28.75rem' }}>
              <Grid item={true} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {store?.menuBerandaOutput?.map((obj) => {
                  return (
                    <Card key={obj.id} sx={{ borderColor: 'transparent', marginRight: '0.5rem', padding: '0.5rem', width: '9.25rem' }}>
                      <CardMedia
                        image={recomendationImage}
                        sx={{ height: '6rem', marginBottom: '0.5' }}
                        title="Recomendation Menu" />
                      <CardContent sx={{ padding: 0 }}>
                        <Typography
                          color="neutral-90"
                          fontWeight="bold"
                          sx={{
                            marginBottom: '0.125',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                          variant="h6"
                        >
                          {obj.itemName}
                        </Typography>
                        <Typography
                          color="neutral-70"
                          sx={{
                            marginBottom: '0.125',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                          variant="body2"
                        >
                          {obj.restoName}
                        </Typography>
                        <Typography color="primary" fontWeight="bold" sx={{ marginBottom: '0.125' }} variant="h6">
                          Rp. {obj.itemPrice.toLocaleString('id-ID')}
                        </Typography>
                        <Grid container={true} justifyContent="space-between">
                          <Box>
                            <Grid container={true}>
                              <Grid item={true}>
                                <LocationOnFilled size={12} style={{ color: 'red' }} />
                              </Grid>
                              <Grid item={true}>
                                <Typography color="neutral-90" variant="caption">
                                  {obj.location}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box>
                            <Typography color="neutral-90" variant="caption">
                              Terjual {obj.sold}
                            </Typography>
                          </Box>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        : null}
        </Card>
        {methode !== 'Pesan Antar' && filteredResto?.map((resto) => (
          <Card key={resto.id} sx={{ borderColor: 'transparent', marginBottom: '1rem', padding: '0.5rem' }}>
            <Grid container={true} spacing={2}>
              <Grid item={true} xs={4}>
                <div style={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center', width: '100%' }}>
                  <img alt="test" src={restoImage} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                  {/* Uncomment the following lines if you have a verified image */}
                  {/* <img
                    alt="Verified"
                    src={Verify}
                    style={{
                      top: 0,
                      right: 0,
                      maxHeight: '20px',
                      maxWidth: '20px'
                    }}
                  /> */}
                </div>
              </Grid>
              <Grid item={true} xs={8}>
                {resto.verified
                  ? <Typography color="neutral-70" sx={{ marginBottom: '0.125' }} variant="body2">
                    Verified by TokoRumahan
                    </Typography>
                  : null}
                <Typography color="neutral-90" fontWeight="bold" sx={{ marginBottom: '0.125' }} variant="h6">
                  {resto.restoName}
                </Typography>
                <Box gap={1} sx={{ display: 'flex' }}>
                  <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                    <StarFilled size={10} style={{ color: 'yellow' }} />
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
        ))}
        {methode === 'Pesan Antar' &&
        <Box>
          <Grid container={true} spacing={2} sx={{ marginTop: '1.5rem' }}>
            {store?.makananOutput?.map((obj: FoodsDataModel) => {
              const isItemSelected = foodsList.breakfast.some(
                (item) => Number(item.id) === Number(obj.id)
              );

              return (
                <Grid
                  item={true}
                  key={obj.id}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  xs={4}
                >
                  <Card
                    sx={{
                      alignItems: 'center',
                      borderRadius: '8px',
                      display: 'block',
                      justifyContent: 'center',
                      marginBottom: '0.625rem',
                      padding: '0.5rem 1rem',
                      cursor: isItemSelected ? 'not-allowed' : 'pointer',
                      opacity: isItemSelected ? 0.7 : 1,
                      boxShadow: isItemSelected
                        ? '0px 0px 10px rgba(0, 0, 0, 0.3)'
                        : 'none',
                      border: isItemSelected
                        ? '2px solid #3f51b5'
                        : '2px solid transparent'
                    }}
                    onClick={() => !isItemSelected && handleFoodItemClick(obj, 'breakfast')}
                  >
                    <Avatar
                      src={obj.photo}
                      sx={{
                        height: '66px',
                        marginBottom: '0.5rem',
                        width: '66px'
                      }} />
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: '10px',
                        lineHeight: '15px'
                      }}
                    >
                      {obj.title}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>}
        <FloatingShoppingButton onClick={() => navigate('/order')} />
    </Box>
  );
};

Home.displayName = 'Home';

export default Home;
