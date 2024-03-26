import { ChangeEvent, useEffect, useState } from 'react';

import {

  Box,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

// Import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import type { PageComponent } from '@nxweb/react';

import { ChannelCommand } from '@models/news/reducers';
import { useStore } from '@models/store';

// Import FloatingShoppingButton from './floatingshopping-button';

import type { SelectChangeEvent } from '@mui/material/Select';

const dummyCategories = [
  { id: '1', name: 'All articles mentioning Apple from yesterday, sorted by popular publishers first' },
  { id: '2', name: 'All articles about Tesla from the last month, sorted by recent first' },
  { id: '3', name: 'Top business headlines in the US right now' },
  { id: '4', name: 'Top headlines from TechCrunch right now' },
  { id: '5', name: 'All articles published by the Wall Street Journal in the last 6 months, sorted by recent first' }
];

const filterOptions = [
  { value: 'showAll', label: 'Show All' },
  { value: 'show10', label: 'Show 10' },
  { value: 'show20', label: 'Show 20' },
  { value: 'show50', label: 'Show 50' },
  { value: 'show100', label: 'Show 100' }
];

const NewsPage: PageComponent = () => {
  const [store, dispatch] = useStore((state) => state);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [filterOption, setFilterOption] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeFilter = (event: SelectChangeEvent<string>) => {
    console.log('New filter value:', event.target.value);
    setFilterOption(event.target.value);
  };

  const getFilterValue = (option: string) => {
    switch (option) {
      case 'Show All':
        return Infinity;
      case 'Show 10':
        return 10;
      case 'Show 20':
        return 20;
      case 'Show 50':
        return 50;
      case 'Show 100':
        return 100;

      default:

        return Infinity;
    }
  };

  const handleCardClick = (url: string) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    dispatch(ChannelCommand.getNews());
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
              News
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
              onChange={handleChange}
            >
              {dummyCategories.map((category) => (

                <MenuItem key={category.id} style={{ whiteSpace: 'normal' }} value={category.name}>
                  {category.name}
                </MenuItem>

              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ backgroundColor: '#D5ECFE' }}>
            <InputLabel id="filter-label" sx={{ color: 'black' }}>
              Filter
            </InputLabel>
            <Select
              id="filter"
              label="Filter Options"
              labelId="filter-label"
              sx={{
                backgroundColor: '#FFFFFF',
                color: 'black',
                marginRight: 1,
                width: 100
              }}
              value={filterOption}
              onChange={handleChangeFilter}
            >
              {filterOptions.map((option) => (

                <MenuItem key={option.value} style={{ whiteSpace: 'normal' }} value={option.label}>
                  {option.label}
                </MenuItem>

              ))}
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
        {store?.halamanResto?.newsList?.articles
  ?.slice(0, getFilterValue(filterOption))
  .map((article: any, index: number) => (
    <Card
      key={index}
      sx={{ marginBottom: '20px' }}
      onClick={() => handleCardClick(article.url)}
    >
      <CardContent>
        <Typography component="h2" fontWeight="bold" sx={{ marginBottom: '1rem' }} variant="h5">
          {article.title}
        </Typography>

        <Typography component="p" sx={{ marginBottom: '0.2rem' }} variant="body2">
          {article.description}
        </Typography>
        <CardMedia
          alt="News Image"
          component="img"
          height="140"
          image={article.urlToImage || 'https://via.placeholder.com/150'}
          sx={{ marginBottom: '0.2rem' }} />
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

NewsPage.displayName = 'NewsPage';

export default NewsPage;
