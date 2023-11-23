/* eslint-disable no-lonely-if */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';

import Bakar from '@assets/images/Bakar.png';
import Brownies from '@assets/images/Brownies.png';
import CheeseCake from '@assets/images/CheeseCake.png';
import Kopi from '@assets/images/Kopi.png';
import MieBaso from '@assets/images/MieBaso.png';
import Pisan from '@assets/images/Pisan.png';

interface PesananDataModel {
  date: string
  order: {
    detail: string
    foto: string
    harga: number
    item: number
    title: string
  }[]
  profile: string
  resto: string
  total: number
}

const DUMMY_PESANAN: PesananDataModel[] = [
  {
    date: '2 Aug 2023',
    order: [
      {
        detail: 'Gg. Jalanin Dulu Aja No. 171',
        foto: `${Pisan}`,
        harga: 100000,
        item: 2,
        title: 'Ayam Goreng Pisan'
      },
      {
        detail: 'Gg. Jalanin Dulu Aja No. 171',
        foto: `${Bakar}`,
        harga: 50000,
        item: 2,
        title: 'Ayam Bakar'
      }
    ],
    profile: `${MieBaso}`,
    resto: 'Resto Bunda Gila',
    total: 150000
  },
  {
    date: '2 Aug 2023',
    order: [
      {
        detail: 'Gg. Jalanin Dulu Aja No. 171',
        foto: `${CheeseCake}`,
        harga: 100000,
        item: 2,
        title: 'Cheese Cake'
      },
      {
        detail: 'Gg. Jalanin Dulu Aja No. 171',
        foto: `${Brownies}`,
        harga: 80000,
        item: 2,
        title: 'Brownies'
      }
    ],
    profile: `${Kopi}`,
    resto: 'Cake Mamah',
    total: 180000
  }
];

const Keranjang: PageComponent = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action');
  const [orders, setOrders] = useState<PesananDataModel[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, PesananDataModel | boolean>>({});
  const [selectAll, setSelectAll] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, orderId: string) => {
    const isChecked = event.target.checked;

    setCheckedItems((prevCheckedItems) => {
      if (isChecked) {
        const selectedItem = DUMMY_PESANAN.find((item) => item.resto === orderId);

        return { ...prevCheckedItems, [orderId]: selectedItem } as Record<string, PesananDataModel | boolean>;
      }

      const { [orderId]: omit, ...rest } = prevCheckedItems;

      return rest as Record<string, PesananDataModel | boolean>;
    });
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    setSelectAll(isChecked);
    setCheckedItems((_prevCheckedItems) => {
      if (isChecked) {
        const selectedItems: Record<string, PesananDataModel | boolean> = {};

        DUMMY_PESANAN.forEach((item) => {
          selectedItems[item.resto] = item;
        });

        return selectedItems;
      }

      return {};
    });
  };

  const handleDelete = () => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.filter((order) => !checkedItems[order.resto]);

      setCheckedItems({});

      return updatedOrders;
    });
  };

  useEffect(() => {
    if (DUMMY_PESANAN) {
      setOrders(DUMMY_PESANAN);
    }
  }, []);

  return (
    <Container>
      {orders.map((obj) => {
        return (
          <Card key={obj.resto} sx={{ marginBottom: '1rem', padding: '1rem' }}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'start'
                }}
              >
                {action === 'edit'
                  ? <Checkbox
                      checked={checkedItems[obj.resto] !== undefined && typeof checkedItems[obj.resto] !== 'boolean'}
                      inputProps={{ 'aria-label': 'controlled' }}
                      size="small"
                      onChange={(event) => handleChange(event, obj.resto)} />
                  : null}
                <Avatar
                  src={obj.profile}
                  sx={{ height: '24px', marginRight: '0.5rem', width: '24px' }} />
                <Typography sx={{ fontWeight: 'bold' }} variant="body1">
                  {obj.resto}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'end' }}>
                <Typography variant="caption">{obj.date}</Typography>
              </Box>
            </Box>
            {obj.order.map((order) => {
              return (
                <div key={order.title} style={{ marginBottom: '1rem' }}>
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
                    {action === 'edit'
                      ? <Grid
                          item={true}
                          sx={{ alignItems: 'top', display: 'flex', justifyContent: 'end', paddingLeft: '0rem!important' }}
                          xs={3}
                        >
                          <Checkbox
                            checked={checkedItems[obj.resto] !== undefined && typeof checkedItems[obj.resto] !== 'boolean'}
                            inputProps={{ 'aria-label': 'controlled' }}
                            size="small"
                            onChange={(event) => handleChange(event, order.title)} />
                        </Grid>
                      : null}
                    <Grid
                      item={true}
                      sx={{ paddingLeft: '0rem!important' }}
                      xs={3}
                    >
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
                          alt={order.title}
                          src={order.foto}
                          style={{ maxHeight: '100%', maxWidth: '100%' }} />
                      </div>
                    </Grid>
                    <Grid
                      item={true}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                      xs={action === 'edit' ? 6 : 9}
                    >
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '1rem'
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: 'bold', textAlign: 'start' }}
                          variant="body2"
                        >
                          {order.title}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: 'bold' }}
                          variant="caption"
                        >
                          {order.item} item
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: 'bold', textAlign: 'start' }}
                          variant="body2"
                        >
                          Rp. {order.harga.toLocaleString('id-ID')}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: '1rem' }}>
                    <TextField
                      id="detail"
                      size="small"
                      sx={{ width: action === 'edit' ? '50%' : '100%' }}
                      value={order.detail}
                      variant="outlined" />
                  </Box>
                </div>
              );
            })}
            <hr style={{ borderTop: 'dotted 1px' }} />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                Total Pembayaran
              </Typography>
              <Typography
                color="primary"
                sx={{ fontWeight: 'bold' }}
                variant="h5"
              >
                Rp 150.000
              </Typography>
            </Box>
            <Box>
              <Button color="primary" fullWidth={true} variant="contained">
                Checkout
              </Button>
            </Box>
          </Card>
        );
      })}
      {action === 'edit'
        ? <Box
            bgcolor="white"
            bottom="0"
            left="0"
            padding="1.5rem"
            position="fixed"
            right="0"
            sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}
            zIndex="1000"
          >
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'start' }}>
            <Checkbox
              checked={selectAll}
              onChange={handleSelectAll} />
                <Typography variant="body1">Pilih Semua</Typography>
            </Box>
              <Button
                color="error"
                size="small"
                variant="contained"
                onClick={() => handleDelete()}
              >
                Hapus
              </Button>
          </Box>
        : null}
    </Container>
  );
};

Keranjang.displayName = 'Keranjang';

export default Keranjang;
