import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, Avatar, Box, Button, Card, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import { AccessTimeFilled, AddBoxFilled, LocationOnFilled, StarFilled, IndeterminateCheckBoxFilled } from '@nxweb/icons/material';
import DiningRoundedIcon from '@mui/icons-material/DiningRounded';

import type { PageComponent } from '@nxweb/react';


import restoImage from '@assets/images/pages/beranda/resto.svg';
import Bakar from '@assets/images/Bakar.png';
import Rating from './rating';
import Pisan from '@assets/images/Pisan.png';
import RestoFoto from '@assets/images/RestoFoto.svg';
import ProfilFoto from '@assets/images/Orang.svg';

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
  }
interface PaketHematDataModel {
    count: number
    foto: string
    harga: number
    title: string
    terjual: number
    customized: boolean
  }
  
  const MENU_REKOMEND: MenuRekomendDataModel[] = [
    {
      count: 1,
      foto: `${Pisan}`,
      harga: 24000,
      title: 'Ayam Goreng Pisan',
      terjual: 4,
      customized: true
    },
    {
      count: 1,
      foto: `${Bakar}`,
      harga: 22000,
      title: 'Ayam Bakar',
      terjual: 3,
      customized: false
    }
  ];
  const PAKET_HEMAT: PaketHematDataModel[] = [
    {
      count: 1,
      foto: `${Pisan}`,
      harga: 24000,
      title: 'Ayam Goreng Pisan',
      terjual: 4,
      customized: true
    },
    {
      count: 1,
      foto: `${Bakar}`,
      harga: 22000,
      title: 'Ayam Bakar',
      terjual: 3,
      customized: false
    },
    {
        count: 0,
        foto: `${Bakar}`,
        harga: 22000,
        title: 'Ayam Bakar Pedes',
        terjual: 7,
        customized: false
      }
  ];
  
  const DEFAULT_MENUREKOMEND: MenuRekomendDataModel = {

    count: 0,
    foto: '',
    harga: 0,
    title: '',
    terjual: 0,
    customized: false
  };
  const DEFAULT_PAKETHEMAT: PaketHematDataModel = {
    count: 0,
    foto: '',
    harga: 0,
    title: '',
    terjual: 0,
    customized: false
  };
  

const HalamanResto: PageComponent = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<MenuRekomendDataModel[]>([DEFAULT_MENUREKOMEND]);
  const [ordersPaketHemat, setOrdersPaketHemat] = useState<PaketHematDataModel[]>([DEFAULT_PAKETHEMAT]);
  const [methode, setMethode] = useState('Pesan Antar');
  const [filteredResto, setFilteredResto] = useState(DUMMY_RESTO);
 

  const handleIncrement = (index: number) => {
    const updatedOrders = [...orders];

    updatedOrders[index].count += 1;
    setOrders(updatedOrders);
  };

  const handleDecrement = (index: number) => {
    if (orders[index].count > 0) {
      const updatedOrders = [...orders];

      updatedOrders[index].count -= 1;
      setOrders(updatedOrders);
    }
  };

  const handleIncrementPaketHemat = (index: number) => {
    const updatedOrders = [...ordersPaketHemat];

    updatedOrders[index].count += 1;
    setOrdersPaketHemat(updatedOrders);
  };

  const handleDecrementPaketHemat = (index: number) => {
    if (ordersPaketHemat[index].count > 0) {
      const updatedOrders = [...ordersPaketHemat];

      updatedOrders[index].count -= 1;
      setOrdersPaketHemat(updatedOrders);
    }
  };

  const handleLihatSemuaClick = () => {
    navigate('./ulasan-rating');
  };

  useEffect(() => {
    if (MENU_REKOMEND) {
      setOrders(MENU_REKOMEND);
    }
    if (PAKET_HEMAT) {
        setOrdersPaketHemat(PAKET_HEMAT);
      }
  }, [orders, ordersPaketHemat]);

  console.log('cekcount', orders);
  return (
    <Box sx={{ margin: '1rem 1.5rem' }}>

        <Grid item={true} xs={12}>
            <Alert color="info" severity="info" sx={{ alignItems: 'center', display: 'flex' }}>Resto ini lagi tutup, buka lagi besok jam 09.00 WIB ya!</Alert>
        </Grid>
      {filteredResto.map((resto) => (
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
          <Avatar src={RestoFoto} sx={{ height: '50px', width: '50px' }} />
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
              Resto Bunda Gila
            </Typography>
          </Box>
        </Grid>
            <Grid item={true} xs={11} sx={{display: 'flex', justifyContent:'center' }}>
            
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
      ))}
      <Grid container={true} justifyContent="space-between" spacing={2} sx={{ marginBottom: '1rem' }}>
        <Grid item={true} xs={6}>
            <Typography
                sx={{ fontWeight: 'bold', textAlign: 'start', color: '#1F66D0' }}
                variant="h6"
            >
                Ulasan dan Rating                
                </Typography>
        </Grid>
        <Grid item={true} xs={6} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'end' }}>
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
       
      <Card sx={{ borderColor: 'transparent', borderRadius: 0, boxShadow: 'none', marginBottom: '1rem', marginInline: '-1.5rem', padding: '1rem 1.5rem' }}>
         <Box sx={{ overflowX: 'auto' }}>
          <Grid container={true} sx={{ width: '100rem' }}>
            <Grid item={true} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {DUMMY_MENU_RECOMDATION.map((obj) => {
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
                        sx={{ fontWeight: 'bold', textAlign: 'start', marginLeft: '20px' }}
                        variant="h6"
                      >
                        {obj.userName}
                      </Typography>
                        <Box sx={{ marginLeft: '20px' }}>
                          <Rating rating={obj.rating} />
                        </Box>
                    </Box>
                  </Grid>
                  <Box sx={{ marginTop: '10px', marginLeft: '10px', width: '100%    ' }}>
                  <TextField fullWidth={true} placeholder={obj.comment} size="small" variant="outlined" />
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
                {MENU_REKOMEND.map((obj, index) => {
            return (
              <div key={obj.title} style={{ marginBottom: '0.5rem' }}>
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
                        style={{ maxHeight: '100%', maxWidth: '100%',marginTop: '0.5rem' }}
                         />
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
                        marginTop: obj.count > 0 ? '2.5rem' : '1rem',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 'bold', textAlign: 'start',marginTop: '-2rem', color: 'black' }}
                        variant="body2"
                      >
                        {obj.title}
                      </Typography>
                      
                    </Box>
                    {obj.count === 0 && (
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
                    {obj.count > 0 && (
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
                        
                        {obj.customized && (
                    <Grid container={true} xs={12} sx={{ alignItems: 'center', display: 'flex' }}>
                        <Grid item={true} xs={2} sx={{ textAlign: 'left' }}>
                        <DiningRoundedIcon fontSize="small" />
                        </Grid>
                        <Grid item={true} xs={9} sx={{ textAlign: 'left' }}>
                        <Typography
                            sx={{ fontWeight: 'medium', textAlign: 'start' }}
                            variant="body2"
                        >
                            Bisa Di Custom
                        </Typography>
                        </Grid>
                    </Grid>
                            )}
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
            {PAKET_HEMAT.map((obj, index) => {
            return (
              <div key={obj.title} style={{ marginBottom: '0.5rem' }}>
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
                        style={{ maxHeight: '100%', maxWidth: '100%',marginTop: '0.5rem' }}
                         />
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
                        marginTop: obj.count > 0 ? '2.5rem' : '1rem',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 'bold', textAlign: 'start',marginTop: '-2rem', color: 'black' }}
                        variant="body2"
                      >
                        {obj.title}
                      </Typography>
                      
                    </Box>
                    {obj.count === 0 && (
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
                    {obj.count > 0 && (
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
                        
                        {obj.customized && (
                    <Grid container={true} xs={12} sx={{ alignItems: 'center', display: 'flex' }}>
                        <Grid item={true} xs={2} sx={{ textAlign: 'left' }}>
                        <DiningRoundedIcon fontSize="small" />
                        </Grid>
                        <Grid item={true} xs={9} sx={{ textAlign: 'left' }}>
                        <Typography
                            sx={{ fontWeight: 'medium', textAlign: 'start' }}
                            variant="body2"
                        >
                            Bisa Di Custom
                        </Typography>
                        </Grid>
                    </Grid>
                            )}
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
    </Box>
  );
};

HalamanResto.displayName = 'HalamanResto';

export default HalamanResto;
