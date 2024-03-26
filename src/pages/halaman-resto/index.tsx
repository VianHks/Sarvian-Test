import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
// Import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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
import { PersonalizedRecomendationCommand } from '@models/personalized-recomendation/reducers';
import { useStore } from '@models/store';

// Import FloatingShoppingButton from './floatingshopping-button';

import type { SelectChangeEvent } from '@mui/material/Select';
import { Bold } from '@nxweb/icons/tabler';

interface RestoItem {
  id: number
  location: number
  open: string
  orderMethode: string
  rating: string
  restoName: string
  verified: boolean
}

const HalamanResto: PageComponent = () => {
  const { auth } = useAuth();
  const [store, dispatch] = useStore((state) => state?.personalizedRec);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const scrollToKategoriMenu = (event: SelectChangeEvent<string>) => {
    const selectedCategory = event.target.value as string;
    const listMenuElement = document.getElementById(selectedCategory);

    listMenuElement?.scrollIntoView({ behavior: 'smooth' });
    setSelectedValue(selectedCategory);
  };

  useEffect(() => {
    dispatch(PersonalizedRecomendationCommand.getNews());
  }, [dispatch]);

  console.log('cekstore', store);

  return (
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
                {/* {filteredCategories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>

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
  {store?.newsList?.articles?.map((article: any, index: number) => (
          <Card key={index} sx={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography component="h2" variant="h5" fontWeight="bold">
                {article.title}
              </Typography>
              <Typography color="textSecondary" gutterBottom={true}>
                {article.publishedAt}
              </Typography>
              <Typography component="p" variant="body2">
                {article.description}
              </Typography>
              <CardMedia
                alt="News Image"
                component="img"
                height="140"
                image={article.urlToImage || 'https://via.placeholder.com/150'} />
              <Typography color="textSecondary" component="p" variant="body2">
                {article.content}
              </Typography>
            </CardContent>
          </Card>
  ))}
        </Box>
      </div>
  );
};

HalamanResto.displayName = 'HalamanResto';

export default HalamanResto;
export type { RestoItem };
