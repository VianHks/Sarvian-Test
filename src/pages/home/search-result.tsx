/* eslint-disable multiline-ternary */
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import InputBase from '@mui/material/InputBase';

import {
  AccessTimeFilled,
  ArrowBackFilled,
  FilterAltFilled,
  LocationOnFilled,
  StarFilled,
  VerifiedFilled
} from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import type { SearchResultDataDataModel, SearchResultDataModel } from '@models/home/types';
import { useCommand, useStore } from '@models/store';

import { DUMMY_RESTO } from './dahsboard';

import menuImage from '@assets/images/pages/beranda/Menu.svg';
import searchImage from '@assets/images/pages/beranda/Search.svg';
import restoImage from '@assets/images/pages/beranda/resto.svg';
import terdekat from '@assets/images/pages/beranda/terdekat.svg';
import terhemat from '@assets/images/pages/beranda/terhemat.svg';
import terlaris from '@assets/images/pages/beranda/terlaris.svg';
import topRated from '@assets/images/pages/beranda/topRated.svg';
import verifyIcon from '@assets/images/verified-rounded.svg';

import type { MenuItem, RestoItem } from './dahsboard';

const DashboardSearchResult: PageComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('product');

  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const thisDay = daysOfWeek[dayOfWeek].toLowerCase();

  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const command = useCommand((cmd) => cmd);
  const [store, dispatch] = useStore((state) => state?.home);

  const [filteredResto, setFilteredResto] = useState<SearchResultDataDataModel[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<SearchResultDataDataModel[]>([]);
  const [restaurantsSellingMenu, setRestaurantsSellingMenu] = useState<SearchResultDataDataModel[][]>([]);
  const [searchResult, setSearchResult] = useState<SearchResultDataModel>();

  const tokrumCoordinate = '-6.878979254712864, 107.60084527975108';

  useEffect(() => {
    if (token) {
      dispatch(
        command.home.searchResult({
          after: '',
          direction: 'ASC',
          field: 'RANK',
          first: '20',
          search: searchParam
        }, token || '')
      );
    }
  }, [dispatch, searchParam]);

  useEffect(() => {
    setSearchResult(store?.searchResultOutput);
  }, [store]);

  useEffect(() => {
    const newFilteredMenu = searchResult?.data?.filter(
      (menu) => menu.name.toLowerCase().includes(query.toLowerCase())
    ) ?? [];

    setFilteredMenu(newFilteredMenu);

    const uniqueRestaurants: Record<string, SearchResultDataDataModel[]> = {};

    newFilteredMenu.forEach((menu) => {
      const restaurantName = menu.channelListings[0].channel.name.toLowerCase();

      uniqueRestaurants[restaurantName] ||= [];

      uniqueRestaurants[restaurantName].push(menu);
    });

    // Convert the object back to an array
    const restaurantsSellingMenu = Object.values(uniqueRestaurants);

    setRestaurantsSellingMenu(restaurantsSellingMenu);
  }, [query, searchResult?.data]);

  console.log('restaurantsSellingMenu', restaurantsSellingMenu);

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

  searchResult?.data.forEach((location) => {
    const coords = location?.channelListings[0]?.channel?.metafields?.coordinate?.split(',').map((coord: string) => parseFloat(coord.trim()));
    if (coords && coords.length >= 2) {
      const coordinate2 = { latitude: coords[0], longitude: coords[1] };

      const distance = calculateDistance(
        coordinate1.latitude,
        coordinate1.longitude,
        coordinate2.latitude,
        coordinate2.longitude
      );
    }
  });

  const handleCardToRestoClick = () => {
    navigate('/page-resto');
  };

  return (
    <Box sx={{ marginBottom: '1.5rem', marginTop: '-0.25rem', paddingInline: '0.5rem' }}>
      <Box
        gap={1}
        sx={{ alignItems: 'center', display: 'flex', marginBottom: '1rem' }}
      >
        <img
          alt="test"
          src={
            query === 'top-rate'
              ? `${topRated}`
              : query === 'terlaris'
                ? `${terlaris}`
                : query === 'terhemat'
                  ? `${terhemat}`
                  : query === 'terdekat'
                    ? `${terdekat}`
                    : `${searchImage}`
          }
          style={{ height: '1.5rem', width: '1.5rem' }} />
        <Typography color="neutral-90" fontWeight="bold" variant="h5">
          {query === 'top-rate'
            ? 'Top Rated'
            : query === 'terlaris'
              ? 'Terlaris'
              : query === 'terhemat'
                ? 'Terhemat'
                : query === 'terdekat'
                  ? 'Terdekat'
                  : 'Hasil Pencarian'}
        </Typography>
      </Box>
      {restaurantsSellingMenu.map((resto, index) => {
        return (
          <Card
            key={resto[index].channelListings[0].channel.id}
            sx={{
              borderColor: 'transparent',
              marginBottom: '1rem',
              padding: '0.5rem'
            }}
            onClick={handleCardToRestoClick}
          >
            <Grid container={true} spacing={2}>
              <Grid item={true} xs={4}>
                <div
                  style={{
                    height: '100%',
                    position: 'relative',
                    width: '100%'
                  }}
                >
                  <img
                    alt="test"
                    src={restoImage}
                    style={{
                      borderRadius: '8px',
                      height: '100%',
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'cover',
                      width: '100%'
                    }} />
                  {resto[index].channelListings[0].channel.metafields.badgeVerification
                    ? <img
                        alt="Verified"
                        src={verifyIcon}
                        style={{
                          maxHeight: '1.5rem',
                          maxWidth: '1.5rem',
                          position: 'absolute',
                          right: '5px',
                          top: '5px'
                        }} />
                    : null}
                </div>
              </Grid>
              <Grid item={true} xs={8}>
                {resto[index]?.channelListings[0].channel.metafields.verified === 'true' ? (
                  <Typography
                    color="neutral-70"
                    sx={{ marginBottom: '0.125' }}
                    variant="body2"
                  >
                    Verified by TokoRumahan
                  </Typography>
                ) : null}
                <Typography
                  color="neutral-90"
                  fontWeight="bold"
                  sx={{ marginBottom: '0.125' }}
                  variant="h6"
                >
                  {resto[index].channelListings[0].channel.name}
                </Typography>
                <Box gap={1} sx={{ display: 'flex' }}>
                  <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                    <StarFilled size={10} style={{ color: 'yellow' }} />
                    <Typography color="neutral-90" variant="caption">
                      {resto[index]?.channelListings[0]?.channel?.metafields.rating}
                    </Typography>
                  </Box>
                  <Divider flexItem={true} orientation="vertical" />
                  <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                    <LocationOnFilled size={10} style={{ color: 'red' }} />
                    <Typography color="neutral-90" variant="caption">
                      {calculateDistance(
                        coordinate1.latitude,
                        coordinate1.longitude,
                        parseFloat(resto[index].channelListings[0].channel.metafields.coordinate.split(',')[0] || ''),
                        parseFloat(resto[index].channelListings[0].channel.metafields.coordinate.split(',')[1] || '')
                      ).toFixed(2)} km
                    </Typography>
                  </Box>
                  <Divider flexItem={true} orientation="vertical" />
                  <Box gap={1} sx={{ alignItems: 'center', display: 'flex' }}>
                    <AccessTimeFilled size={10} />
                    <Typography color="neutral-90" variant="caption">
                      {/* {resto.open} */} 07.00-12.00 WIB
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {restaurantsSellingMenu
              .flat()
              .map((menu) => (
                <Grid container={true} key={menu.id} sx={{ marginBottom: '1rem' }}>
                  <Grid item={true} xs={4} />
                  <Grid item={true} sx={{ display: 'flex' }} xs={8}>
                    <img
                      alt="MenuImg"
                      src={menuImage}
                      style={{
                        height: '3.5rem',
                        marginRight: '0.5rem',
                        width: '3.5rem'
                      }} />
                    <Box>
                      <Typography
                        color="neutral-90"
                        fontWeight="bold"
                        sx={{ marginBottom: '0.24rem' }}
                        variant="caption"
                      >
                        {menu.name}
                      </Typography>
                      <Typography
                        color="primary"
                        fontWeight="bold"
                        variant="body2"
                      >
                        Rp {menu.pricing.toLocaleString('id-ID')}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              ))}
          </Card>
        );
      })}
      {query === 'top-rate' ||
        query === 'terhemat' ||
        query === 'terlaris' ||
        query === 'terdekat'
        ? DUMMY_RESTO.map((resto) => (
          <Card
            key={resto.id}
            sx={{
              borderColor: 'transparent',
              marginBottom: '1rem',
              padding: '0.5rem'
            }}
            onClick={handleCardToRestoClick}
          >
            <Grid container={true} spacing={2}>
              <Grid item={true} xs={4}>
                <div
                  style={{
                    height: '100%',
                    position: 'relative',
                    width: '100%'
                  }}
                >
                  <img
                    alt="test"
                    src={restoImage}
                    style={{
                      height: '100%',
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'cover',
                      width: '100%'
                    }} />
                  {resto.verified
                    ? <img
                        alt="Verified"
                        src={verifyIcon}
                        style={{
                          maxHeight: '1.5rem',
                          maxWidth: '1.5rem',
                          position: 'absolute',
                          right: '5px',
                          top: '5px'
                        }} />
                    : null}
                </div>
              </Grid>
              <Grid item={true} xs={8}>
                {resto.verified ? (
                  <Typography
                    color="neutral-70"
                    sx={{ marginBottom: '0.125' }}
                    variant="body2"
                  >
                    Verified by TokoRumahan
                  </Typography>
                ) : null}
                <Typography
                  color="neutral-90"
                  fontWeight="bold"
                  sx={{ marginBottom: '0.125' }}
                  variant="h6"
                >
                  {resto.restoName}
                </Typography>
                <Box gap={1} sx={{ display: 'flex' }}>
                  <Box
                    gap={1}
                    sx={{ alignItems: 'center', display: 'flex' }}
                  >
                    <StarFilled size={10} style={{ color: 'yellow' }} />
                    <Typography color="neutral-90" variant="caption">
                      {resto.rating}
                    </Typography>
                  </Box>
                  <Divider flexItem={true} orientation="vertical" />
                  <Box
                    gap={1}
                    sx={{ alignItems: 'center', display: 'flex' }}
                  >
                    <LocationOnFilled size={10} style={{ color: 'red' }} />
                    <Typography color="neutral-90" variant="caption">
                      {resto.location}
                    </Typography>
                  </Box>
                  <Divider flexItem={true} orientation="vertical" />
                  <Box
                    gap={1}
                    sx={{ alignItems: 'center', display: 'flex' }}
                  >
                    <AccessTimeFilled size={10} />
                    <Typography color="neutral-90" variant="caption">
                      {resto.open}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        ))
        : null}
    </Box>
  );
};

DashboardSearchResult.displayName = 'DashboardSearchResult';

export default DashboardSearchResult;
