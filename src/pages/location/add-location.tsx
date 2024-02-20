import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { useCommand, useStore } from '@models/store';

interface FormModel {
  city: string
  details: string
  district: string
  name: string
  pin: string
  province: string
  subdistrict: string
  zipCode: string
}

const DEFAULT_FORM = {
  city: '',
  details: '',
  district: '',
  name: '',
  pin: '',
  province: '',
  subdistrict: '',
  zipCode: ''
};

const AddLocation: PageComponent = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);
  const command = useCommand((cmd) => cmd);
  const theme = useTheme();
  const [store, dispatch] = useStore((state) => state?.profile);
  const [formData, setFormData] = useState<FormModel>(DEFAULT_FORM);

  const handleFinish = () => {
    const payload = {
      city: formData.city,
      countryArea: formData.province,
      postalCode: formData.zipCode,
      streetAddress: formData.details,
      subdistrict: formData.district,
      token
    };

    command.profile.postCreateAddress(payload, token || '')
      .then((res) => {
        if (res === 'ok') {
          navigate('/location');
        } else {
          console.log('Err');
        }
      });
  };

  const isButtonDisabled = formData.province === '' || formData.city === '' || formData.district === '' || formData.subdistrict === '' || formData.zipCode === '' || formData.details === '';

  useEffect(() => {
    dispatch(command.profile.getProvinces(token || ''));
  }, [dispatch, token]);

  useEffect(() => {
    if (formData?.province) {
      dispatch(command.profile.getCities(formData.province, token || ''));
    }
  }, [dispatch, formData?.province, token]);

  useEffect(() => {
    if (formData?.province && formData?.city) {
      dispatch(
        command.profile.getDistrict(formData.city, formData.province, token || '')
      );
    }
  }, [dispatch, formData?.province, formData?.city, token]);

  useEffect(() => {
    if (formData?.province && formData?.city && formData?.district) {
      dispatch(
        command.profile.getSubDistrict(formData.city, formData.district, formData.province, token || '')
      );
    }
  }, [dispatch, formData?.province, formData?.city, formData.district, token]);

  return (
    <Box>
      <FormControl sx={{ width: '100%' }}>
      <Typography
        // Color={formData?.province === '' ? theme?.palette?.error?.main : theme?.palette?.grey[900]}
        color={theme?.palette?.grey[900]}
        fontWeight="bold"
        marginBlock="0rem 0.375rem"
        variant="h6"
      >
        Provinsi
      </Typography>

        <Select
          displayEmpty={true}
          size="small"
          value={formData.province}
          onChange={(e) => setFormData({ ...formData, province: e.target.value })}
        >
          <MenuItem disabled={true} value="">
            Pilih Provinsi
          </MenuItem>
          {store?.provinces?.provinces.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
        {/* {formData.province === ''
          ? <FormHelperText>Provinsi wajib di isi</FormHelperText>
          : null} */}
      </FormControl>
      <FormControl sx={{ width: '100%' }}>
      <Typography
        // Color={formData?.city === '' ? theme?.palette?.error?.main : theme?.palette?.grey[900]}
        color={theme?.palette?.grey[900]}
        fontWeight="bold"
        marginBlock="1rem 0.375rem"
        variant="h6"
      >
        Kota/Kabupaten
      </Typography>
        <Select
          displayEmpty={true}
          size="small"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        >
          <MenuItem disabled={true} value="">
            Pilih Kota/Kabupaten
          </MenuItem>
          {store?.cities?.cities.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
        {/* {formData.city === ''
          ? <FormHelperText>Kota/Kabupaten wajib di isi</FormHelperText>
          : null} */}
      </FormControl>
      <FormControl sx={{ width: '100%' }}>
        <Typography
          // Color={formData?.district === '' ? theme?.palette?.error?.main : theme?.palette?.grey[900]}
          color={theme?.palette?.grey[900]}
          fontWeight="bold"
          marginBlock="1rem 0.375rem"
          variant="h6"
        >
          Kecamatan
        </Typography>
        <Select
          displayEmpty={true}
          size="small"
          value={formData.district}
          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
        >
          <MenuItem disabled={true} value="">
            Pilih Kecamatan
          </MenuItem>
          {store?.district?.districts.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
        {/* {formData.district === ''
          ? <FormHelperText>Kecamatan wajib di isi</FormHelperText>
          : null} */}
      </FormControl>
      <FormControl sx={{ width: '100%' }}>
        <Typography
          // Color={formData?.subdistrict === '' ? theme?.palette?.error?.main : theme?.palette?.grey[900]}
          color={theme?.palette?.grey[900]}
          fontWeight="bold"
          marginBlock="1rem 0.375rem"
          variant="h6"
        >
          Kelurahan
        </Typography>
        <Select
          displayEmpty={true}
          size="small"
          value={formData.subdistrict}
          onChange={(e) => setFormData({ ...formData, subdistrict: e.target.value })}
        >
          <MenuItem disabled={true} value="">
            Pilih Kelurahan
          </MenuItem>
          {store?.subdistrict?.subdistricts.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
        {/* {formData.subdistrict === ''
          ? <FormHelperText>Kelurahan wajib di isi</FormHelperText>
          : null} */}
      </FormControl>
      <Typography
        color={theme?.palette?.grey[900]}
        fontWeight="bold"
        marginBlock="1rem 0.375rem"
        variant="h6"
      >
        Detail Alamat
      </Typography>
      <TextField
        fullWidth={true}
        multiline={true}
        placeholder="Detail Alamat"
        rows={4}
        value={formData.details}
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, details: e.target.value })} />

      <Typography
        color={theme?.palette?.grey[900]}
        fontWeight="bold"
        marginBlock="1rem 0.375rem"
        variant="h6"
      >
        Kode Pos
      </Typography>
      <TextField
        fullWidth={true}
        placeholder="Kode Pos"
        size="small"
        value={formData.zipCode}
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} />

      <Typography
        color={theme?.palette?.grey[900]}
        fontWeight="bold"
        marginBlock="1rem 0.375rem"
        variant="h6"
      >
        Nama Alamat
      </Typography>
      <TextField
        fullWidth={true}
        placeholder="Nama Alamat"
        size="small"
        value={formData.name}
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

      <Typography
        color={theme?.palette?.grey[700]}
        marginBlock="1rem 0.375rem"
        variant="body2"
      >
        Tandai Alamat Sebagai:
      </Typography>

      <Box gap={3} sx={{ alignItems: 'center', display: 'flex' }}>
        <Chip label="Rumah" sx={{ borderRadius: '0.25rem' }} variant={formData.pin === 'rumah' ? 'filled' : 'outlined'} onClick={() => setFormData({ ...formData, pin: 'rumah' })} />
        <Chip label="Kantor" sx={{ borderRadius: '0.25rem' }} variant={formData.pin === 'kantor' ? 'filled' : 'outlined'} onClick={() => setFormData({ ...formData, pin: 'kantor' })} />
      </Box>

      <Box
        sx={{
          alignItems: 'center',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          left: 0,
          marginTop: '5rem',
          padding: '1rem',
          position: 'absolute',
          textAlign: 'center',
          width: '100%'
        }}
      >
        <Button
          color="primary"
          disabled={isButtonDisabled}
          fullWidth={true}
          size="small"
          variant="contained"
          onClick={handleFinish}
        >
          Tambah Alamat
        </Button>
      </Box>
    </Box>
  );
};

AddLocation.displayName = 'AddLocation';

export default AddLocation;
