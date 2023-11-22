import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MailOutlineOutlined } from '@mui/icons-material';
import { Box, Button, FormControl, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import type { SelectChangeEvent } from '@mui/material';

const AddLocation: PageComponent = () => {
  const navigate = useNavigate();
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  const handleFinish = () => {
    navigate('/location');
  };

  const handleProvinceChange = (event: SelectChangeEvent) => {
    setProvince(event.target.value);
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };

  const handleDistrictChange = (event: SelectChangeEvent) => {
    setDistrict(event.target.value);
  };

  const isButtonDisabled = province === '' || city === '' || district === '';

  return (
    <Box margin="1rem 1.5rem">
      <Typography color="neutral-90" fontWeight="bold" marginBlock="1rem 0.375rem" variant="h6">
        Provinsi
      </Typography>
      <FormControl sx={{ width: '100%' }}>
        <Select
          displayEmpty={true}
          size="small"
          value={province}
          onChange={handleProvinceChange}
        >
          <MenuItem disabled={true} value="">
            Pilih Provinsi
          </MenuItem>
          <MenuItem value="Jawa Barat">Jawa Barat</MenuItem>
          <MenuItem value="Jawa Tengah">Jawa Tengah</MenuItem>
          <MenuItem value="Jawa Timur">Jawa Timur</MenuItem>
        </Select>
      </FormControl>
      <Typography color="neutral-90" fontWeight="bold" marginBlock="1rem 0.375rem" variant="h6">
        Kota/Kabupaten
      </Typography>
      <FormControl sx={{ width: '100%' }}>
        <Select
          displayEmpty={true}
          size="small"
          value={city}
          onChange={handleCityChange}
        >
          <MenuItem disabled={true} value="">
            Pilih Kota/Kabupaten
          </MenuItem>
          <MenuItem value="Bandung">Bandung</MenuItem>
          <MenuItem value="Semarang">Semarang</MenuItem>
          <MenuItem value="Surabaya">Surabaya</MenuItem>
        </Select>
      </FormControl>
      <Typography color="neutral-90" fontWeight="bold" marginBlock="1rem 0.375rem" variant="h6">
        Kecamatan
      </Typography>
      <FormControl sx={{ width: '100%' }}>
        <Select
          displayEmpty={true}
          size="small"
          value={district}
          onChange={handleDistrictChange}
        >
          <MenuItem disabled={true} value="">
            Pilih Kecamatan
          </MenuItem>
          <MenuItem value="Dago">Dago</MenuItem>
          <MenuItem value="Leuwi Gajah">Leuwi Gajah</MenuItem>
          <MenuItem value="Regol">Regol</MenuItem>
        </Select>
      </FormControl>
      <Typography color="neutral-90" fontWeight="bold" marginBlock="1rem 0.375rem" variant="h6">
        Rincian Alamat
      </Typography>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlineOutlined />
            </InputAdornment>
          )
        }}
        fullWidth={true}
        placeholder="Contoh: Blok, No. Rumah, Patokan"
        size="small"
        variant="outlined" />
      <Button disabled={isButtonDisabled} fullWidth={true} size="small" sx={{ marginTop: '1rem' }} variant="outlined" onClick={handleFinish}>
        <Typography color={isButtonDisabled ? 'neutral-70' : 'primary'} fontWeight="bold" variant="body1">
          Selesai
        </Typography>
      </Button>
    </Box>
  );
};

AddLocation.displayName = 'AddLocation';

export default AddLocation;
