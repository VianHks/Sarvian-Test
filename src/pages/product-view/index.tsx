/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Paper,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';
/*
 * Import SwipeableViews from 'react-swipeable-views';
 * import { autoPlay } from 'react-swipeable-views-utils';
 */

import { AddBoxFilled, IndeterminateCheckBoxFilled } from '@nxweb/icons/material';

import { Grid } from '@components/material.js';

import Pict1 from '@assets/images/Video.svg';
import Pict2 from '@assets/images/Video2.svg';

// Const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
const images = [Pict1, Pict2];
const ProductView = () => {
  const [count, setCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleChange = (_: unknown, newIndex: number[] | number) => {
    setCurrentImageIndex(newIndex as number);
  };
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <Container
        sx={{
        //   BackgroundColor: '#E4F3FF',
          height: '16rem',
          padding: '1.5rem',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      <Slider
        max={images.length - 1}
        value={currentImageIndex}
        onChange={handleChange}
      >
        {images.map((image, index) => (
          <img
            alt={`Slide ${index + 1}`}
            key={index}
            src={image}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ))}
      </Slider>
         {/* <Carousel
           animation="slide"
           autoPlay={false}
           index={currentImageIndex}
           indicators={false}
           onChange={(index: number) => handleChange(index)}
         >
          {images.map((image, index) => (
           <Carousel.Item key={index}>
           <img
             alt={`Slide ${index + 1}`}
             className="d-block w-100"
             src={image} />
           </Carousel.Item>
          ))}
         </Carousel> */}
      </Container>

      <Container
        sx={{
          marginTop: '10px',
          position: 'relative',
          zIndex: '1',
          marginBottom: '-1.5rem'
        }}
      >
        <Card sx={{ padding: '0.625rem' }}>
          <Typography sx={{ marginBottom: '0.5rem' }} variant="h4">
            Paket Ayam Bakar
          </Typography>
          <Grid container={true} justifyContent="space-between" spacing={2}>
            <Grid item={true} xs={6}>
              <Typography
                sx={{ marginBottom: '0.25rem', color: '#1F66D0' }}
                variant="body2"
              >
                Rp. 50.000,00
              </Typography>
            </Grid>
            <Grid item={true} xs="auto">
              <Typography
                sx={{ marginBottom: '0.25rem' }}
                variant="body2"
              >
                Terjual 24
              </Typography>
            </Grid>
          </Grid>
          <Box>
            <Typography
              sx={{ marginBottom: '1rem', textAlign: 'left' }}
              variant="body2"
            >
              Ayam goreng yang renyah dan empuk disajikan dengan berbagai macam
              sambal yang segar dan pedas. Sambal terbuat dari bawang merah,
              cabai rawit, serai, daun jeruk, dan minyak kelapa yang dicampur
              dengan garam dan gula. Menu ini cocok untuk Anda yang suka makanan
              pedas dan berbumbu. Satu porsi ayam goreng pisan terdiri dari dua
              potong ayam goreng, sambal matah, nasi putih, lalapan, dan
              kerupuk.
            </Typography>
            <Typography
              sx={{
                marginBottom: '0.25rem',
                color: 'black',
                textAlign: 'left'
              }}
              variant="h5"
            >
              Catatan
            </Typography>
            <TextField
              hiddenLabel={true}
              id="outlined-basic"
              placeholder="Tambahkan catatan ke menumu"
              size="small"
              sx={{ width: '100%', marginBottom: '0.5rem' }}
              type="text"
              variant="outlined" />
           <Grid container={true} spacing={2} sx={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                  <Grid item={true} xs={3}>
                    <Typography
                      sx={{
                        marginBottom: '0.25rem',
                        color: 'black',
                        textAlign: 'left'
                      }}
                      variant="h6"
                    >
                    Jumlah
                    </Typography>
                  </Grid>
                    <Grid item={true} sx={{ display: 'flex', justifyContent: 'end' }} xs={9}>
                    <Box>
                        <IconButton
                          aria-label="min"
                          size="small"
                          onClick={() => handleDecrement()}
                          sx={{ color: 'black' }}
                        >
                          <IndeterminateCheckBoxFilled />
                        </IconButton>
                        <Typography
                          style={{
                            display: 'inline-block',
                            margin: '0 0.5rem'
                          }}
                          variant="body2"
                        >
                          {count}
                        </Typography>
                        <IconButton
                          aria-label="plus"
                          size="small"
                          onClick={() => handleIncrement()}
                          sx={{ color: 'black' }}
                        >
                          <AddBoxFilled />
                        </IconButton>
                    </Box>
                    </Grid>

           </Grid>
            <Grid container={true} justifyContent="space-between" spacing={2} sx={{ marginBottom: '1rem' }}>
              <Grid item={true} xs={6}>
                <Typography
                  sx={{ marginBottom: '0.25rem', color: 'black' }}
                  variant="h5"
                >
                  Harga Menu
                </Typography>
              </Grid>
              <Grid item={true} xs="auto">
                <Typography
                  sx={{ marginBottom: '0.25rem', color: '#1F66D0' }}
                  variant="h5"
                >
                  Rp. 0
                </Typography>
              </Grid>
            </Grid>
            <Button
              color="primary"
              size="medium"
              sx={{ textTransform: 'none', width: '100%' }}
              variant="contained"
            >
            Tambah Keranjang
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  );
};

ProductView.displayName = 'ProductView';
export default ProductView;
