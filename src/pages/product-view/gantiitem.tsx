/* eslint-disable linebreak-style */

import { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';

import { AddBoxFilled, IndeterminateCheckBoxFilled } from '@nxweb/icons/material';

import { useAuth } from '@hooks/use-auth';
import { productviewCommand } from '@models/product-view/commands';
import { useStore } from '@models/store';

import SwipeableTextMobileStepper from './slidergambar';

type SelectedItemsNasi = Record<string, boolean>;
type SelectedItemsAyam = Record<string, boolean>;
type SelectedItemsSambel = Record<string, boolean>;
const items = [
  { id: 'nasiPutih', label: 'Nasi Putih', price: 'Gratis' },
  { id: 'nasiKecap', label: 'Nasi Kecap', price: '+ Rp. 1000' },
  { id: 'nasiUduk', label: 'Nasi Uduk', price: '+ Rp. 2000' }
];
const itemsAyam = [
  { id: 'ayamGorengMadu', label: 'Ayam Goreng Madu', price: 'Gratis' },
  { id: 'ayamGorengKuning', label: 'Ayam Goreng Kuning', price: 'Gratis' },
  { id: 'ayamGorengGosong', label: 'Ayam Goreng Gosong', price: 'Gratis' }
];
const itemsSambel = [
  { id: 'sambelJeruk', label: 'Sambel Jeruk', price: 'Gratis' },
  { id: 'sambelDadak', label: 'Sambel Dadak', price: 'Gratis' },
  { id: 'sambelGoyang', label: 'Sambel Goyang', price: 'Gratis' },
  { id: 'sambelMatah', label: 'Sambel Matah', price: '+ RP. 2500' }
];

const ProductView = () => {
  const [totalHargaMenu, setTotalHargaMenu] = useState(0);
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const [store, dispatch] = useStore((state) => state?.productView);
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

  const handleChangeCheckbox = (id: number) => {
    const updatedNasiOutput = [...store?.nasiOutput ?? []];
    const selectedItem = updatedNasiOutput.find((item) => item.id === id);
    if (selectedItem) {
      selectedItem.checked = !selectedItem.checked;
    }

    setCheckedNasi((prevCheckedNasi) => ({
      ...prevCheckedNasi,
      [id]: selectedItem?.checked ?? false
    }));
  };
  /*
   * Const handleChangeCheckbox = (itemName: keyof SelectedItemsNasi) => {
   *   setCheckedNasi((prevItems) => ({
   *     ...prevItems,
   *     [itemName]: !prevItems[itemName]
   *   }));
   * };
   * const handleChangeCheckboxAyam = (itemName: keyof SelectedItemsAyam) => {
   *   setCheckedAyam((prevItems) => ({
   *     ...prevItems,
   *     [itemName]: !prevItems[itemName]
   *   }));
   * };
   * const handleChangeCheckboxSambel = (itemName: keyof SelectedItemsSambel) => {
   *   setCheckedSambel((prevItems) => ({
   *     ...prevItems,
   *     [itemName]: !prevItems[itemName]
   *   }));
   * };
   */

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(productviewCommand.nasiLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });
      dispatch(productviewCommand.ayamLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });
      dispatch(productviewCommand.sambelLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });

      dispatch(productviewCommand.menuLoad(token))

        .catch((err: unknown) => {
          console.error(err);
        });

      return () => {
        dispatch(productviewCommand.nasiClear());
      };
    }
  }, [token]);

  useEffect(() => {
    if (store) {
      const totalNasi = store?.nasiOutput?.reduce((total, item) => total + item.price, 0) ?? 0;
      const totalAyam = store?.ayamOutput?.reduce((total, item) => total + item.price, 0) ?? 0;
      const totalSambel = store?.sambelOutput?.reduce((total, item) => total + item.price, 0) ?? 0;
      const totalPaket = store?.menuOutput?.reduce((total, item) => total + item.price, 0) ?? 0;

      setTotalHargaMenu(totalNasi + totalAyam + totalSambel + totalPaket);
    }
  }, [store]);

  console.log('cekstore', store);

  return (
    <>
      <Container
        sx={{
          marginTop: '1rem',
          height: '16rem',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <SwipeableTextMobileStepper />
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
          {store?.menuOutput?.map((item) => (
          <Grid container={true} justifyContent="space-between" key={item.id} spacing={2}>
            <Grid item={true} xs={6}>

              <Typography

                sx={{ marginBottom: '0.25rem', color: '#1F66D0' }}
                variant="body2"
              >
                Rp. {item.price.toLocaleString('id-ID')}
              </Typography>

            </Grid>
            <Grid item={true} xs="auto">
              <Typography
                sx={{ marginBottom: '0.25rem', color: '#1F66D0' }}
                variant="body2"
              >
                Terjual {item.terjual}
              </Typography>
            </Grid>
          </Grid>
          ))}
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

              {store?.nasiOutput?.map((item) => (
      <Grid container={true} key={item.id} sx={{ alignItem: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <Grid item={true} xs={8}>
            <FormControlLabel
              control={
              <Checkbox
                checked={checkedNasi[item.id]}
                style={{ borderRadius: '50%' }}
                onClick={() => handleChangeCheckbox(item.id)} />
            }
              label={<>{item.itemName}</>} />
            </Grid>
            <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'end' }} xs={4}>
                <Typography>
                {item.price === 0 ? 'Gratis' : `Rp. ${item.price.toLocaleString('id-ID')}`}
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
            {store?.ayamOutput?.map((item) => (
      <Grid container={true} key={item.id} sx={{ alignItem: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <Grid item={true} xs={8}>
            <FormControlLabel
              control={
              <Checkbox
                checked={checkedAyam[item.id]}
                style={{ borderRadius: '50%' }} />
            }
              label={<>{item.itemName}</>} />
            </Grid>
            <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'end' }} xs={4}>
                <Typography>
                {item.price === 0 ? 'Gratis' : `Rp. ${item.price.toLocaleString('id-ID')}`}
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
            {store?.sambelOutput?.map((item) => (
      <Grid container={true} key={item.id} sx={{ alignItem: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <Grid item={true} xs={8}>
            <FormControlLabel
              control={
              <Checkbox
                checked={checkedSambel[item.id]}
                style={{ borderRadius: '50%' }} />
            }
              label={<>{item.itemName}</>} />
            </Grid>
            <Grid item={true} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'end' }} xs={4}>
                <Typography>
                {item.price === 0 ? 'Gratis' : `Rp. ${item.price.toLocaleString('id-ID')}`}
                </Typography>
            </Grid>

      </Grid>
            ))}
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
                          sx={{ color: 'black' }}
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
                          sx={{ color: 'black' }}
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
                    Rp. {totalHargaMenu.toLocaleString('id-ID')}
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
