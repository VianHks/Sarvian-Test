import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Card, CardContent, CardMedia, Chip, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material';

import { AccessTimeFilled, ExpandMoreFilled, FilterAltFilled, LocationOnFilled, SearchFilled, StarFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import type { ChannelsDataModel } from '@models/home/types';
import { useCommand, useStore } from '@models/store';
import FloatingShoppingButton from '@pages/halaman-resto/floatingshopping-button';

import dineInIcon from '@assets/images/pages/beranda/DineIn.svg';
import pesanAntarIcon from '@assets/images/pages/beranda/PesanAntar.svg';
import pickUpIcon from '@assets/images/pages/beranda/PickUp.svg';
import recomendationIcon from '@assets/images/pages/beranda/Rekomendasi 1.svg';
import jajananLokalIcon from '@assets/images/pages/beranda/jajananLokalIcon.svg';
import recomendationImage from '@assets/images/pages/beranda/recomandation.svg';
import terdekat from '@assets/images/pages/beranda/terdekat.svg';
import terhemat from '@assets/images/pages/beranda/terhemat.svg';
import terlaris from '@assets/images/pages/beranda/terlaris.svg';
import topRated from '@assets/images/pages/beranda/topRated.svg';
import verifyIcon from '@assets/images/pages/beranda/verify.svg';

interface RestoItem {
  id: number
  location: string
  open: string
  orderMethode: string
  rating: string
  restoName: string
  verified: boolean
}

interface MenuItem {
  id: number
  itemName: string
  itemPrice: number
  location: string
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
    location: '1.5km',
    orderMethode: 'Pesan Antar, Pick Up',
    restoName: 'Resto Sunda Gila 1',
    sold: 24,
    verified: true
  },
  {
    id: 2,
    itemName: 'Bubur Sumsum',
    itemPrice: 120000,
    location: '1.5km',
    orderMethode: 'Pesan Antar, Pick Up, Dine In',
    restoName: 'Dapur Pak Raden',
    sold: 24,
    verified: false
  },
  {
    id: 3,
    itemName: 'Ayam Goreng Kemarin',
    itemPrice: 130000,
    location: '1.5km',
    orderMethode: 'Dine In',
    restoName: 'Kedai Nyonyah',
    sold: 24,
    verified: true
  },
  {
    id: 4,
    itemName: 'Bebek Bubuk',
    itemPrice: 130000,
    location: '1.5km',
    orderMethode: 'Dine In',
    restoName: 'Warung Gusti',
    sold: 24,
    verified: true
  },
  {
    id: 5,
    itemName: 'Gorengan Rebus',
    itemPrice: 130000,
    location: '1.5km',
    orderMethode: 'Dine In',
    restoName: 'Warung Cak Waluh',
    sold: 24,
    verified: true
  },
  {
    id: 4,
    itemName: 'Kopi Paste',
    itemPrice: 130000,
    location: '1.5km',
    orderMethode: 'Dine In',
    restoName: 'Warung Kopas',
    sold: 24,
    verified: true
  }
];

const DUMMY_RESTO = [
  {
    id: 1,
    location: '1.5km',
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Pesan Antar, Pick Up',
    rating: '4.9',
    restoName: 'Resto Sunda Gila 1',
    verified: true
  },
  {
    id: 2,
    location: '1.5km',
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Pesan Antar, Pick Up, Dine In',
    rating: '4.8',
    restoName: 'Dapur Pak Raden',
    verified: false
  },
  {
    id: 3,
    location: '1.5km',
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Dine In',
    rating: '5.0',
    restoName: 'Kedai Nyonyah',
    verified: true
  },
  {
    id: 4,
    location: '1.5km',
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Pick Up',
    rating: '3.1',
    restoName: 'Warung Gusti',
    verified: true
  },
  {
    id: 5,
    location: '1.5km',
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Dine In',
    rating: '1.4',
    restoName: 'Warung Cak Waluh',
    verified: false
  },
  {
    id: 6,
    location: '1.5km',
    open: '9.00 - 12.00 WIB',
    orderMethode: 'Pesan Antar, Dine In',
    rating: '2.6',
    restoName: 'Warung Kopas',
    verified: true
  }
];

const Home: PageComponent = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const command = useCommand((cmd) => cmd);

  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const thisDay = daysOfWeek[dayOfWeek].toLowerCase();

  const [store, dispatch] = useStore((state) => state?.home);
  const [shipmentMethode, setShipmentMethode] = useState('Pick Up');
  const [searchValue, setSearchValue] = useState('');
  const [deliveryData, setDeliveryData] = useState<ChannelsDataModel[]>([]);
  const [pickUpData, setPickUpData] = useState<ChannelsDataModel[]>([]);
  const [dineInData, setDineInData] = useState<ChannelsDataModel[]>([]);
  const [dataMenu, setDataMenu] = useState(pickUpData);

  const tokrumCoordinate = '-6.878979254712864, 107.60084527975108';

  useEffect(() => {
    if (token) {
      dispatch(
        command.home.getHomeMenu(token || '')
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (store?.HomeRestoOutput?.data?.channels) {
      const deliveryChannels: ChannelsDataModel[] = store?.HomeRestoOutput?.data?.channels.filter((channel) => channel.metafields.delivery === 'true');
      const pickUpChannels: ChannelsDataModel[] = store?.HomeRestoOutput?.data?.channels.filter((channel) => channel.metafields.pickUp === 'true');
      const dineInChannels: ChannelsDataModel[] = store?.HomeRestoOutput?.data?.channels.filter((channel) => channel.metafields.dineIn === 'true');

      setDeliveryData((prevDeliveryData) => {
        const uniqueDeliveryData = Array.from(new Set([...prevDeliveryData, ...deliveryChannels].map((item) => item.id)))
          .map((id) => deliveryChannels.find((item) => item.id === id))
          .filter(Boolean) as ChannelsDataModel[];

        return uniqueDeliveryData;
      });

      setPickUpData((prevPickUpChannels) => {
        const uniquePickUpData = Array.from(new Set([...prevPickUpChannels, ...pickUpChannels].map((item) => item.id)))
          .map((id) => pickUpChannels.find((item) => item.id === id))
          .filter(Boolean) as ChannelsDataModel[];

        return uniquePickUpData;
      });

      setDineInData((prevDineInData) => {
        const uniqueDineInData = Array.from(new Set([...prevDineInData, ...dineInChannels].map((item) => item.id)))
          .map((id) => dineInChannels.find((item) => item.id === id))
          .filter(Boolean) as ChannelsDataModel[];

        return uniqueDineInData;
      });
    }
  }, [store]);

  useEffect(() => {
    if (pickUpData) {
      setDataMenu(pickUpData);
    }
  }, [pickUpData]);

  const handleShipmentMethodChange = (method: string) => {
    setShipmentMethode(method);

    switch (method) {
      // case 'Pesan Antar':
      //   setDataMenu([...deliveryData]);
      //   break;
      case 'Pick Up':
        setDataMenu([...pickUpData]);
        break;
      case 'Dine In':
        setDataMenu([...dineInData]);
        break;

      default:
        setDataMenu([]);
        break;
    }
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
  };

  const tokrumCoords = tokrumCoordinate.split(',').map((coord) => parseFloat(coord.trim()));
  const coordinate1 = { latitude: tokrumCoords[0], longitude: tokrumCoords[1] };

  dataMenu.forEach((location) => {
    const coords = location.metafields.coordinate.split(',').map((coord) => parseFloat(coord.trim()));
    const coordinate2 = { latitude: coords[0], longitude: coords[1] };

    const distance = calculateDistance(
      coordinate1.latitude,
      coordinate1.longitude,
      coordinate2.latitude,
      coordinate2.longitude
    );
  });

  const calculateDistances = () => {
    return dataMenu.map((location) => {
      const coords = location.metafields.coordinate.split(',').map((coord) => parseFloat(coord.trim()));
      const coordinate2 = { latitude: coords[0], longitude: coords[1] };

      const distance = calculateDistance(
        coordinate1.latitude,
        coordinate1.longitude,
        coordinate2.latitude,
        coordinate2.longitude
      );

      return { distance, location };
    });
  };

  const sortedDataMenu = useMemo(() => {
    const distances = calculateDistances();

    const activeData = dataMenu.filter((item) => item.isActive);

    return [...activeData].sort((a, b) => {
      const distanceA = distances.find((item) => item.location.id === a.id)?.distance || 0;
      const distanceB = distances.find((item) => item.location.id === b.id)?.distance || 0;

      return distanceA - distanceB;
    });
  }, [dataMenu]);

  const getOpenAndClosedValues = (data: ChannelsDataModel[], day: string) => {
    const openingHours = [];

    for (const restaurant of data) {
      if (restaurant?.metafields?.operationalHour !== '') {
        const operationalHours = JSON.parse(restaurant?.metafields?.operationalHour);

        let shouldAddDefault = false;
        if (!operationalHours || operationalHours.length === 0) {
          shouldAddDefault = true;
        }

        if (!shouldAddDefault) {
          for (const schedule of operationalHours) {
            if (schedule.day.toLowerCase() === day.toLowerCase()) {
              openingHours.push({
                closed: schedule.closed,
                open: schedule.open,
                restaurantName: restaurant.name
              });
              break;
            }
          }
        }

        if (shouldAddDefault) {
          openingHours.push({
            closed: '',
            open: '',
            restaurantName: restaurant.name
          });
        }
      }
    }

    return openingHours;
  };

  const operationalHour = getOpenAndClosedValues(sortedDataMenu, thisDay);

  const handleSearch = () => {
    navigate(`/pencarian`);
  };

  const handleCardToRestoClick = () => {
    navigate('/page-resto');
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
            <InputAdornment position="start">
              <SearchFilled />
            </InputAdornment>
          )
        }}
        fullWidth={true}
        placeholder="Mau makan apa hari ini?"
        size="small"
        sx={{
          '& input::placeholder': { color: 'blue' },
          boxShadow: '0px 4px 8px 0px rgba(49, 127, 242, 0.08)',
          marginBottom: '1rem'
        }}
        value={searchValue}
        variant="outlined"
        onClick={handleSearch} />
      <Grid container={true} spacing={1} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: shipmentMethode === 'Pesan Antar' ? '1rem' : '2rem' }}>
        <Grid item={true}>
          <Chip color={shipmentMethode === 'Pesan Antar' ? 'primary' : 'default'} disabled={true} icon={<img alt="icon" sizes="large" src={pesanAntarIcon} />} label="Pesan Antar" sx={{ borderRadius: '0.5rem', padding: '0.4rem' }} onClick={() => handleShipmentMethodChange('Pesan Antar')} />
        </Grid>
        <Grid item={true}>
          <Chip color={shipmentMethode === 'Pick Up' ? 'primary' : 'default'} icon={<img alt="icon" sizes="large" src={pickUpIcon} />} label="Pick Up" sx={{ borderRadius: '0.5rem', padding: '0.4rem' }} onClick={() => handleShipmentMethodChange('Pick Up')} />
        </Grid>
        <Grid item={true}>
          <Chip color={shipmentMethode === 'Dine In' ? 'primary' : 'default'} icon={<img alt="icon" sizes="large" src={dineInIcon} />} label="Dine In" sx={{ borderRadius: '0.5rem', padding: '0.4rem' }} onClick={() => handleShipmentMethodChange('Dine In')} />
        </Grid>
      </Grid>
      {shipmentMethode === 'Pesan Antar'
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
                  <Card key={obj.id} sx={{ borderColor: 'transparent', marginRight: '0.5rem', padding: '0.5rem', width: '9.25rem' }} onClick={handleCardToRestoClick}>
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
      <Card sx={{ backgroundColor: 'transparent', borderColor: 'transparent', borderRadius: 0, boxShadow: 'none', marginBottom: '-1rem', marginInline: '-1.5rem', padding: '1rem 1.5rem' }}>
        <Box gap={1} sx={{ display: 'flex', marginBottom: '1rem' }}>
          <img alt="test" src={shipmentMethode === 'Pick Up' ? pickUpIcon : shipmentMethode === 'Dine In' ? dineInIcon : jajananLokalIcon} />
          <Typography color="neutral-90" fontWeight="bold" variant="h5">
            {shipmentMethode === 'Pesan Antar' ? 'Eksplor Jajanan Lokal' : shipmentMethode === 'Dine In' ? 'Dine-In di Resto' : 'Resto yang bisa Pickup'}
          </Typography>
        </Box>
        {/* {shipmentMethode === 'Pesan Antar'
          ? <Box sx={{ overflowX: 'auto' }}>
            <Grid container={true} sx={{ width: '28.75rem' }}>
              <Grid item={true} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {store?.menuBerandaOutput?.map((obj) => {
                  return (
                    <Card key={obj.id} sx={{ borderColor: 'transparent', marginRight: '0.5rem', padding: '0.5rem', width: '9.25rem' }} onClick={handleCardToRestoClick}>
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
          : null} */}
      </Card>
      {shipmentMethode !== 'Pesan Antar' && sortedDataMenu.map((resto, index) => (
        <Card key={resto.id} sx={{ borderColor: 'transparent', marginBottom: '1rem', padding: '0.5rem' }}>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={4}>
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  height: '100%',
                  justifyContent: 'center',
                  position: 'relative',
                  width: '100%'
                }}
              >
                <img
                  alt="test"
                  src={resto.metafields.media}
                  style={{ maxHeight: '100%', maxWidth: '100%' }} />
                {resto.metafields.verified === 'true' &&
                  <img
                    alt="Verified"
                    src={verifyIcon}
                    style={{
                      maxHeight: '1.5rem',
                      maxWidth: '1.5rem',
                      position: 'absolute',
                      right: '5px',
                      top: '5px'
                    }} />}
              </div>
            </Grid>
            <Grid item={true} xs={8}>
              {resto.metafields.verified === 'true'
                ? <Typography color="neutral-70" sx={{ marginBottom: '0.125' }} variant="body2">
                  Verified by TokoRumahan
                  </Typography>
                : null}
              <Typography color="neutral-90" fontWeight="bold" sx={{ marginBottom: '0.125' }} variant="h6">
                {resto.name}
              </Typography>
              <Box gap={1} sx={{ display: 'flex' }}>
                <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                  <StarFilled size={10} style={{ color: 'yellow' }} />
                  <Typography color="neutral-90" variant="caption">
                    {resto.metafields.rating}
                  </Typography>
                </Box>
                <Divider flexItem={true} orientation="vertical" />
                <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                  <LocationOnFilled size={10} style={{ color: 'red' }} />
                  <Typography color="neutral-90" variant="caption">
                  {calculateDistance(
                    coordinate1.latitude,
                    coordinate1.longitude,
                    parseFloat(resto.metafields.coordinate.split(',')[0]),
                    parseFloat(resto.metafields.coordinate.split(',')[1])
                  ).toFixed(2)} km
                  </Typography>
                </Box>
                <Divider flexItem={true} orientation="vertical" />
                <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                  <AccessTimeFilled size={10} />
                  <Typography color="neutral-90" variant="caption">
                    {operationalHour[index].open} - {operationalHour[index].closed}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      ))}
      {/* {shipmentMethode === 'Pesan Antar' &&
        <Box>
          <Grid container={true} spacing={2} sx={{ marginTop: '1.5rem' }}>
            {store?.HomeRestoOutput?.map((obj: FoodsDataModel) => {
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
        </Box>} */}
      <FloatingShoppingButton onClick={() => navigate('/order')} />
    </Box>
  );
};

Home.displayName = 'Home';

export default Home;
export { DUMMY_RESTO };
export type { RestoItem, MenuItem };
