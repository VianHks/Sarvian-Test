/* eslint-disable linebreak-style */
import { count } from 'console';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';

import { AddBoxFilled, IndeterminateCheckBoxFilled } from '@nxweb/icons/material';

import { Grid } from '@components/material.js';

import Pict1 from '@assets/images/Video.svg';
import Pict2 from '@assets/images/Video2.svg';

const images = [Pict1, Pict2];

type SelectedItemsNasi = Record<string, boolean>;
type SelectedItemsAyam = Record<string, boolean>;
type SelectedItemsSambel = Record<string, boolean>;
const items = [
  { id: 'nasiPutih', label: 'Nasi Putih', price: 'Gratis' },
  { id: 'nasiKecap', label: 'Nasi Kecap', price: 'Rp. 1000'},
  { id: 'nasiUduk', label: 'Nasi Uduk', price: 'Rp. 2000'}
];
const itemsAyam = [
  { id: 'ayamGorengMadu', label: 'Ayam Goreng Madu' },
  { id: 'ayamGorengKuning', label: 'Ayam Goreng Kuning' },
  { id: 'ayamGorengGosong', label: 'Ayam Goreng Gosong' }
];
const itemsSambel = [
  { id: 'sambelJeruk', label: 'Sambel Jeruk' },
  { id: 'sambelDadak', label: 'Sambel Dadak' },
  { id: 'sambelGoyang', label: 'Sambel Goyang' },
  { id: 'sambelMatah', label: 'Sambel Matah' }
];

const itemsAddNasi = [
  { id: 'gratis', label: 'Gratis' },
  { id: 'seribu', label: '+ Rp. 1.000' },
  { id: 'duaribu', label: '+ Rp. 2.000' }

];

interface PesananDataModel {
  count: number

}

const DEFAULT_PESANAN: PesananDataModel = {
  count: 0
};

const ProductView = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const [count, setCount] = useState(0);
  const [checkedAyam, setCheckedAyam] = useState<SelectedItemsAyam>({
    ayamGorengMadu: false,
    ayamGorengKuning: false,
    ayamGorengGosong: false
  });
  const [checkedNasi, setCheckedNasi] = useState<SelectedItemsNasi>({
    nasiPutih: false,
    nasiKecap: false,
    nasiUduk: false
  });
  const [checkedSambel, setCheckedSambel] = useState<SelectedItemsAyam>({
    sambelJeruk: false,
    sambelDadak: false,
    sambelGoyang: false,
    sambelMatah: false
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleChange = (_: unknown, newIndex: number[] | number) => {
    setCurrentImageIndex(newIndex as number);
  };

  const handleChangeCheckbox = (itemName: keyof SelectedItemsNasi) => {
    setCheckedNasi((prevItems) => ({
      ...prevItems,
      [itemName]: !prevItems[itemName]
    }));
  };
  const handleChangeCheckboxAyam = (itemName: keyof SelectedItemsAyam) => {
    setCheckedAyam((prevItems) => ({
      ...prevItems,
      [itemName]: !prevItems[itemName]
    }));
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

        {/* <Slider
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
        </Slider> */}
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
          <Typography sx={{ marginBottom: '0.25rem' }} variant="h4">
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
                sx={{ marginBottom: '0.25rem', color: '#1F66D0' }}
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
              Ganti Item
            </Typography>
            <hr />
            <Typography
              sx={{
                marginBottom: '0.25rem',
                color: 'black',
                textAlign: 'left'
              }}
              variant="h5"
            >
              Nasi
            </Typography>

              {items.map((item) => (
      <Grid container={true} key={item.id} sx={{ alignItem: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <Grid item={true} xs={8}>
            <FormControlLabel
              control={
              <Checkbox
                checked={true}
                style={{ borderRadius: '50%' }} />
            }
              label={<>{item.label}</>} />
            </Grid>
            <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'end' }} xs={4} >
                <Typography>
                  {item.price}
                </Typography>
            </Grid>

      </Grid>
              ))}
            <Typography
              sx={{
                marginBottom: '0.25rem',
                color: 'black',
                textAlign: 'left'
              }}
              variant="h5"
            >
              Ayam
            </Typography>
            <FormGroup sx={{ marginBottom: '1rem' }}>
              {itemsAyam.map((item) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedAyam[item.id]}
                      style={{ borderRadius: '50%' }}
                      onChange={() => handleChangeCheckboxAyam(
                        item.id as keyof SelectedItemsAyam
                      )} />
                  }
                  key={item.id}
                  label={item.label} />
              ))}
            </FormGroup>
            <Typography
              sx={{
                marginBottom: '0.25rem',
                color: 'black',
                textAlign: 'left'
              }}
              variant="h5"
            >
              Tambahan
            </Typography>
            <hr />
            <Typography
              sx={{
                marginBottom: '0.25rem',
                color: 'black',
                textAlign: 'left'
              }}
              variant="h6"
            >
              Sambel
            </Typography>
          </Box>
          <Typography
            sx={{
              marginBottom: '0.25rem',
              color: 'black',
              textAlign: 'left'
            }}
            variant="h6"
          >
              Catatan
          </Typography>
            <TextField
              disabled={true}
              size="small"
              sx={{
                marginBottom: '0.75rem',
                marginTop: '0.5rem',
                width: '100%'
              }}
              value="Sambal dipisah"
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
                        >
                          <AddBoxFilled />
                        </IconButton>
                    </Box>
                    </Grid>

              </Grid>
               <hr style={{ border: 'none', borderBottom: '1px dotted #000' }} />
               <Grid container={true} justifyContent="space-between" spacing={2} sx={{ marginBottom: '1rem' }}>
                  <Grid item={true} xs={8}>
                    <Typography
                      sx={{
                        marginBottom: '0.25rem',
                        color: 'black',
                        textAlign: 'left'
                      }}
                      variant="h6"
                    >
                    Harga Menu
                    </Typography>
                  </Grid>
                  <Grid item={true} sx={{ display: 'flex', justifyContent: 'end' }} xs={4}>
                    <Typography
                      sx={{
                        marginBottom: '0.25rem',
                        color: '#1F66D0',
                        textAlign: 'left'
                      }}
                      variant="h6"
                    >
                    Rp. 100.000
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
        </Card>
      </Container>
    </>
  );
};

ProductView.displayName = 'ProductView';
export default ProductView;
