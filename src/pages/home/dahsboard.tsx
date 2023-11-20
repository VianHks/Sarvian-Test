import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Card, CardContent, CardMedia, Chip, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material';

import { AccessTimeFilled, ExpandMoreFilled, FilterAltFilled, LocationOnFilled, SearchFilled, StarFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import dineInIcon from '@assets/images/pages/beranda/DineIn.svg';
import pesanAntarIcon from '@assets/images/pages/beranda/PesanAntar.svg';
import pickUpIcon from '@assets/images/pages/beranda/PickUp.svg';
import recomendationIcon from '@assets/images/pages/beranda/Rekomendasi 1.svg';
import recomendationImage from '@assets/images/pages/beranda/recomandation.svg';
import restoImage from '@assets/images/pages/beranda/resto.svg';
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

const Home: PageComponent = () => {
  const navigate = useNavigate();

  const [methode, setMethode] = useState('Pesan Antar');
  const [filteredResto, setFilteredResto] = useState(DUMMY_RESTO);
  const [searchValue, setSearchValue] = useState('');

  const filterResto = (method: string) => {
    const filtered = DUMMY_RESTO.filter((resto) => {
      return resto.orderMethode.toLowerCase().includes(method.toLowerCase());
    });

    setFilteredResto(filtered);
  };

  useEffect(() => {
    filterResto(methode);
  }, [methode]);

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
              <FilterAltFilled style={{ color: 'blue' }} />
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
      <Grid container={true} gap={1.4} sx={{ justifyContent: 'center', marginBottom: '2rem' }}>
        <Grid item={true}>
          <Chip color={methode === 'Pesan Antar' ? 'primary' : 'default'} icon={<img alt="icon" src={pesanAntarIcon} />} label="Pesan Antar" onClick={() => handleMethode('Pesan Antar')} />
        </Grid>
        <Grid item={true}>
          <Chip color={methode === 'Pick Up' ? 'primary' : 'default'} icon={<img alt="icon" src={pickUpIcon} />} label="Pick Up" onClick={() => handleMethode('Pick Up')} />
        </Grid>
        <Grid item={true}>
          <Chip color={methode === 'Dine In' ? 'primary' : 'default'} icon={<img alt="icon" src={dineInIcon} />} label="Dine In" onClick={() => handleMethode('Dine In')} />
        </Grid>
      </Grid>
      <Card sx={{ borderColor: 'transparent', borderRadius: 0, boxShadow: 'none', marginBottom: '1rem', marginInline: '-1.5rem', padding: '1rem 1.5rem' }}>
        <Box gap={1} sx={{ display: 'flex', marginBottom: '0.875rem' }}>
          <img alt="test" src={recomendationIcon} />
          <Typography color="neutral-90" fontWeight="bold" variant="h5">
            Rekomendasi Untukmu
          </Typography>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <Grid container={true} sx={{ width: '28.75rem' }}>
            <Grid item={true} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {DUMMY_MENU_RECOMDATION.map((obj) => {
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
      <Box gap={1} sx={{ display: 'flex', marginBottom: '1.125rem' }}>
        <img alt="test" src={pickUpIcon} />
        <Typography color="neutral-90" fontWeight="bold" variant="h5">
          Resto Yang Bisa Pickup
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
        </Card>
      ))}
    </Box>
  );
};

Home.displayName = 'Home';

export default Home;
