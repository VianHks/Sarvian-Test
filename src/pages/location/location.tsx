import { useNavigate } from 'react-router-dom';

import { Box, Button, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material';

import { LocationOnFilled, MYLocationFilled } from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

const Location: PageComponent = () => {
  const navigate = useNavigate();

  const handleAddLocation = () => {
    navigate('/add-location');
  };

  const handleChooseLocation = () => {
    navigate('/GPS');
  };

  return (
    <Box sx={{ margin: '1rem 1.5rem' }}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnFilled style={{ color: 'blue' }} />
            </InputAdornment>
          )
        }}
        fullWidth={true}
        placeholder="Cari alamat"
        size="small"
        sx={{ marginBottom: '1rem' }}
        variant="outlined" />
      <Button fullWidth={true} size="small" variant="outlined" onClick={handleAddLocation}>
        <Typography color="primary" fontWeight="bold" variant="body1">
          Tambah Alamat Baru
        </Typography>
      </Button>
      <Typography color="neutral-90" fontWeight="bold" sx={{ marginBlock: '1rem' }} variant="h5">
        Pilih Lokasi Saat Ini
      </Typography>
      <Grid container={true}>
        <Grid alignItems="center" display="flex" item={true} sx={{ marginRight: '0.5rem' }} xs="auto">
          <MYLocationFilled style={{ color: 'blue', height: 24, width: 24 }} />
        </Grid>
        <Grid item={true} xs={true}>
          <Typography color="neutral-90" fontWeight="bold" variant="h6">
            Toko Rumahan
          </Typography>
          <Typography color="neutral-90" sx={{ marginBottom: '0.5rem' }} variant="body2">
            Jl. Hegarmanah No. 28, Hermanah, Cidadap, Kota Bandung, Jawa Barat
          </Typography>
          <Divider />
        </Grid>
      </Grid>
      <Typography color="neutral-90" fontWeight="bold" sx={{ marginBlock: '1rem' }} variant="h5">
        Pilih Riwayat Lokasi
      </Typography>
      <Grid container={true}>
        <Grid alignItems="center" display="flex" item={true} sx={{ marginRight: '0.5rem' }} xs="auto">
          <LocationOnFilled style={{ height: 24, width: 24 }} />
        </Grid>
        <Grid item={true} xs={true}>
          <Typography color="neutral-90" fontWeight="bold" variant="h6">
            Toko Rumahan
          </Typography>
          <Typography color="neutral-90" sx={{ marginBottom: '0.5rem' }} variant="body2">
            Jl. Hegarmanah No. 28, Hermanah, Cidadap, Kota Bandung, Jawa Barat
          </Typography>
          <Divider />
        </Grid>
      </Grid>
      <Grid container={true}>
        <Grid alignItems="center" display="flex" item={true} sx={{ marginRight: '0.5rem' }} xs="auto">
          <LocationOnFilled style={{ height: 24, width: 24 }} />
        </Grid>
        <Grid item={true} xs={true}>
          <Typography color="neutral-90" fontWeight="bold" variant="h6">
            Toko Rumahan
          </Typography>
          <Typography color="neutral-90" sx={{ marginBottom: '0.5rem' }} variant="body2">
            Jl. Hegarmanah No. 28, Hermanah, Cidadap, Kota Bandung, Jawa Barat
          </Typography>
          <Divider />
        </Grid>
      </Grid>
      <Box
        bgcolor="white"
        bottom="0"
        left="0"
        padding="1.5rem"
        position="fixed"
        right="0"
        zIndex="1000"
      >
        <Button fullWidth={true} size="small" variant="outlined">
          <Typography color="primary" fontWeight="bold" variant="body1" onClick={handleChooseLocation}>
            Pilih Lewat Map
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

Location.displayName = 'Location';

export default Location;
