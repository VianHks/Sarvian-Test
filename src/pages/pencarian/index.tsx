import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Global } from '@emotion/react';

import { History, Star } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  makeStyles,
  styled,
  SwipeableDrawer,
  TextField,
  Theme,
  useTheme
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { FilterAltFilled, SearchFilled, StarFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import { Card, Grid, Typography } from '@components/material.js';

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

interface FoodsDataModel {
  id: string
  photo: string
  title: string
}

interface FoodsListDataModel {
  [key: string]: FoodsDataModel[]
  breakfast: FoodsDataModel[]
  dinner: FoodsDataModel[]
  lunch: FoodsDataModel[]
}

interface Props {
  readonly window?: () => Window
}

const DUMMY_FOODS: FoodsDataModel[] = [
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

const DEFAULT_FOODS_LIST: FoodsListDataModel = {
  breakfast: [],
  dinner: [],
  lunch: []
};

const drawerBleeding = 200;

const Puller = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  height: 6,
  left: 'calc(50% - 30px)',
  position: 'absolute',
  top: 17,
  width: 50
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800]
}));

const List_Riwayat = ['Ayam Goreng', 'Sunda Gila', 'Ayam Matah', 'Sop Ayam Brokoli', 'Ayam Rebus'];
const List_Harga = ['<15.000>', '15.000-50.000', '50.000-100.000', '>100.000'];
const List_Jarak = ['<1Km', '1Km-3Km', '3Km-5Km', '>5Km'];
const List_Penilaian = [`1${<StarFilled color="#FBD600" size={16} />}`, `2${<StarFilled color="#FBD600" size={16} />}`, `3${<StarFilled color="#FBD600" size={16} />}`, `4${<StarFilled color="#FBD600" size={16} />}`, `5${<StarFilled color="#FBD600" size={16} />}`];
const List_Operasional = ['Open Now', '24 Jam'];
const List_Pengantaran = ['Pesan Antar', 'Pickup', 'Dinein'];
const List_Halal = ['Halal', 'Non-Halal'];

const Pencarian: PageComponent = (props: Props) => {
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [riwayat, setRiwayat] = useState(true);
  const [foodsList, setFoodsList] = useState<FoodsListDataModel>(DEFAULT_FOODS_LIST);
  const [filterFoods, setFilterFoods] = useState<FoodsDataModel[]>(DUMMY_FOODS);
  const [searchValue, setSearchValue] = useState('');

  const filterFood = (method: string) => {
    const filtered = DUMMY_FOODS.filter((food) => {
      return food.title.toLowerCase().includes(method.toLowerCase());
    });

    setFilterFoods(filtered);
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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const renderFoodCard = (obj: FoodsDataModel) => {
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
  };

  return (
    <Container>
      <TextField
        InputProps={{
          endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleDrawer(true)}>
              <FilterAltFilled color={theme.palette.primary.main} size={20} />
            </IconButton>
          </InputAdornment>
          ),
          startAdornment: (
          <InputAdornment position="start">
            <SearchFilled color={theme.palette.grey[900]} size={20} />
          </InputAdornment>
          )
        }}
        fullWidth={true}
        placeholder="Mau makan apa hari ini?"
        size="small"
        sx={{ marginBottom: '1rem' }}
        variant="outlined"
        onChange={(e) => {
          const searchTerm = e.target.value;

          setSearchValue(searchTerm);
          filterFood(searchTerm);
        }} />
      <Box gap={1} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'start', marginBottom: '1rem' }}>
        <History />
        <Typography
          sx={{ fontWeight: 'bold', textAlign: 'start' }}
          variant="h5"
        >
          Terakhir dicari
        </Typography>
      </Box>
      {riwayat
        ? <Grid container={true} spacing={2}>
        {List_Riwayat.map((str) => {
          return (
            <Grid item={true} key={str} xs="auto">
              <Chip label={str} />
            </Grid>
          );
        })}
          </Grid>
        : null}
      <hr />
      <Typography
        sx={{ fontWeight: 'bold', marginBottom: '0.5rem', marginTop: '1rem', textAlign: 'start' }}
        variant="h5"
      >
        Kategori Makanan
      </Typography>
      <Box>
        <Grid container={true} spacing={2}>
        {searchValue === ''
          ? DUMMY_FOODS.map((obj: FoodsDataModel) => renderFoodCard(obj))
          : filterFoods.map((obj: FoodsDataModel) => renderFoodCard(obj))}
        </Grid>
      </Box>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible'
          }
        }} />
      <SwipeableDrawer
        ModalProps={{
          keepMounted: true
        }}
        anchor="bottom"
        container={container}
        disableSwipeToOpen={false}
        open={open}
        swipeAreaWidth={drawerBleeding}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <StyledBox
          sx={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            left: 0,
            position: 'relative',
            right: 0,
            top: -400
          }}
        >
          <Puller />
          <Box sx={{ p: 4 }}>
            <Typography
              sx={{ fontWeight: 'bold', marginTop: '1rem' }}
              variant="h5"
            >
              Filter
            </Typography>
            <hr />
            <Typography
              sx={{ fontWeight: 'bold', marginBottom: '0.5rem', marginTop: '1rem' }}
              variant="body1"
            >
              Harga
            </Typography>
            <Grid container={true} spacing={2} sx={{ marginBottom: '0.5rem' }}>
              {List_Harga.map((str) => {
                return (
                  <Grid item={true} key={str} xs="auto">
                    <Chip label={str} />
                  </Grid>
                );
              })}
            </Grid>
            <Typography
              sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
              variant="body1"
            >
              Jarak
            </Typography>
            <Grid container={true} spacing={2} sx={{ marginBottom: '0.5rem' }}>
              {List_Jarak.map((str) => {
                return (
                  <Grid item={true} key={str} xs="auto">
                    <Chip label={str} />
                  </Grid>
                );
              })}
            </Grid>
            <Typography
              sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
              variant="body1"
            >
              Penilaian
            </Typography>
            <Grid container={true} spacing={2} sx={{ marginBottom: '0.5rem' }}>
              {List_Penilaian.map((str, idx) => {
                return (
                  <Grid item={true} key={str} xs="auto">
                    <Chip icon={<StarFilled color="#FBD600" size={16} />} label={idx + 1} />
                  </Grid>
                );
              })}
            </Grid>
            <Typography
              sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
              variant="body1"
            >
              Jadwal Operasional
            </Typography>
            <Grid container={true} spacing={2} sx={{ marginBottom: '0.5rem' }}>
              {List_Operasional.map((str) => {
                return (
                  <Grid item={true} key={str} xs="auto">
                    <Chip label={str} />
                  </Grid>
                );
              })}
            </Grid>
            <Typography
              sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
              variant="body1"
            >
              Tipe Pengantaran
            </Typography>
            <Grid container={true} spacing={2} sx={{ marginBottom: '0.5rem' }}>
              {List_Pengantaran.map((str) => {
                return (
                  <Grid item={true} key={str} xs="auto">
                    <Chip label={str} />
                  </Grid>
                );
              })}
            </Grid>
            <Typography
              sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
              variant="body1"
            >
              Halal/Non-Halal
            </Typography>
            <Grid container={true} spacing={2} sx={{ marginBottom: '0.5rem' }}>
              {List_Halal.map((str) => {
                return (
                  <Grid item={true} key={str} xs="auto">
                    <Chip label={str} />
                  </Grid>
                );
              })}
            </Grid>
            <Typography
              sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
              variant="body1"
            >
              Badge Toko
            </Typography>
            <Chip label="Diverifikasi oleh TokoRumahan" />
          <Box gap={2} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Button size="medium" sx={{ width: '50%' }} variant="outlined">Reset</Button>
            <Button size="medium" sx={{ width: '50%' }} variant="contained">Terapkan</Button>
          </Box>
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </Container>
  );
};

Pencarian.displayName = 'Pencarian';
Pencarian.layout = 'appbar';

export default Pencarian;
