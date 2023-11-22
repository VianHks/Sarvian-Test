import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Card, Divider, Grid, InputAdornment, TextField, Typography, useTheme } from '@mui/material';

import { AccessTimeFilled, ArrowBackFilled, FilterAltFilled, LocationOnFilled, SearchFilled, StarFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { DUMMY_MENU_RECOMDATION, DUMMY_RESTO } from './dahsboard';

import menuImage from '@assets/images/pages/beranda/Menu.svg';
import searchImage from '@assets/images/pages/beranda/Search.svg';
import restoImage from '@assets/images/pages/beranda/resto.svg';

import type { MenuItem, RestoItem } from './dahsboard';

const DashboardSearchResult: PageComponent = () => {
  const location = useLocation();
  const theme = useTheme();
  const query = new URLSearchParams(location.search).get('query') || '';

  /*
   * Const filteredResto = DUMMY_RESTO.filter(
   *   (resto) => resto.restoName.toLowerCase().includes(query.toLowerCase())
   * );
   */

  /*
   * const filteredMenu = DUMMY_MENU_RECOMDATION.filter(
   *   (menu) => menu.itemName.toLowerCase().includes(query.toLowerCase())
   * );
   */

  const [filteredResto, setFilteredResto] = useState<RestoItem[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([]);
  const [restaurantsSellingMenu, setRestaurantsSellingMenu] = useState<RestoItem[]>([]);

  useEffect(() => {
    const newFilteredResto = DUMMY_RESTO.filter(
      (resto) => resto.restoName.toLowerCase().includes(query.toLowerCase()) ||
        restaurantsSellingMenu.some((menu) => menu.restoName.toLowerCase() === resto.restoName.toLowerCase())

    );

    setFilteredResto(newFilteredResto);
  }, [query, restaurantsSellingMenu]);

  useEffect(() => {
    const newFilteredMenu = DUMMY_MENU_RECOMDATION.filter(
      (menu) => menu.itemName.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredMenu(newFilteredMenu);

    const uniqueRestaurantNames = Array.from(new Set(newFilteredMenu.map((menu) => menu.restoName.toLowerCase())));

    const restaurantsSellingMenu = DUMMY_RESTO.filter(
      (resto) => uniqueRestaurantNames.includes(resto.restoName.toLowerCase())
    );

    setRestaurantsSellingMenu(restaurantsSellingMenu);
  }, [query]);

  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.info.main, marginBottom: '1.5rem', padding: '0.5rem 1.5rem 1rem', position: 'relative' }}>
        <Box gap={5} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <ArrowBackFilled size={24} />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FilterAltFilled style={{ color: 'blue' }} />
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
            variant="outlined"
            sx={{ zIndex: 100, position: 'relative' }}
          />
        </Box>
      </Box>
      <Box sx={{ marginBottom: '1.5rem', padding: '0.5rem 1.5rem 1rem' }}>
        <Box gap={1} sx={{ display: 'flex', marginBottom: '1rem' }}>
          <img alt="test" src={searchImage} style={{ marginRight: '0.25rem' }} />
          <Typography color="neutral-90" fontWeight="bold" variant="h5">
            Hasil Pencarian
          </Typography>
        </Box>
        {filteredResto.map((resto) => (
          <Card key={resto.id} sx={{ borderColor: 'transparent', marginBottom: '1rem', padding: '0.5rem' }}>
            <Grid container={true} spacing={2}>
              <Grid item={true} xs={4}>
                <div style={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center', width: '100%' }}>
                  <img alt="test" src={restoImage} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                  {/* <img
                    alt="Verified"
                    src={Verify}
                    style={{
                      top: 0,
                      right: 0,
                      maxHeight: '20px', // Adjust the height as needed
                      maxWidth: '20px' // Adjust the width as needed
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
            {filteredMenu
              .filter((menu) => menu.restoName.toLowerCase() === resto.restoName.toLowerCase())
              .map((menu) => (
                <Grid container={true} key={menu.id}>
                  <Grid item={true} xs={4} />
                  <Grid item={true} sx={{ display: 'flex' }} xs={8}>
                    <img alt="MenuImg" src={menuImage} style={{ height: '3.5rem', marginRight: '0.5rem', width: '3.5rem' }} />
                    <Box>
                      <Typography color="neutral-90" fontWeight="bold" sx={{ marginBottom: '0.24rem' }} variant="caption">
                        {menu.itemName}
                      </Typography>
                      <Typography color="primary" fontWeight="bold" variant="body2">
                        Rp {menu.itemPrice.toLocaleString('id-ID')}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              ))}
          </Card>
        ))}
      </Box>
    </>
  );
};

DashboardSearchResult.displayName = 'DashboardSearchResult';

export default DashboardSearchResult;
