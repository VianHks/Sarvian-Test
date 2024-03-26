import { useEffect, useState } from 'react';

import {

  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import { ChannelCommand } from '@models/news/reducers';
import { useStore } from '@models/store';

import { categories, filterOptions,  getEndpoint } from './types';

import logo from '@assets/images/logo.png';

import type { SelectChangeEvent } from '@mui/material/Select';

const NewsPage: PageComponent = () => {
  const [store, dispatch] = useStore((state) => state);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [filterOption, setFilterOption] = useState<string>('');
  const [filterDispatch, setFilterDispatch] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedName = event.target.value;
    const selectedCategory = categories.find((category) => category.name === selectedName);

    if (selectedCategory) {
      setFilterDispatch(parseInt(selectedCategory.id, 10));
    }

    setSelectedValue(event.target.value);
  };

  const handleChangeFilter = (event: SelectChangeEvent<string>) => {
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
    if (filterDispatch !== 0) {
      const endpoint = getEndpoint(filterDispatch.toString());

      setIsLoading(true);
      dispatch(ChannelCommand.getAppleNews(endpoint)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, filterDispatch]);

  useEffect(() => {
    if (!store?.newsList?.newsAppleList?.articles || store.newsList.newsAppleList.articles.length < 2) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [store]);

  console.log('cekvalue', selectedValue);
  console.log('cekLoad', isLoading);

  return (
    <div>
      <Toolbar
        sx={{
          backgroundColor: '#D5ECFE',
          left: 0,
          paddingInline: '1rem',
          position: 'fixed',
          top: 0,
          width: '100%',
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
              {categories.map((category) => (

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
          display: isLoading ? 'none' : 'block',
          margin: '0.5rem 0.5rem',
          marginBottom: '7rem',
          marginTop: '5rem',
          paddingInline: '1rem'
        }}
      >
        {store?.newsList?.newsAppleList?.articles
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
      {isLoading && selectedValue !== ''
        ? (
  <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
    <CircularProgress />
  </Box>
        )
        : selectedValue === ''
          ? (
  <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
    <img alt="Logo" src={logo} style={{ height: '100px', width: '80px' }} />
  </Box>
          )
          : null}
    </div>
  );
};

NewsPage.displayName = 'NewsPage';

export default NewsPage;
