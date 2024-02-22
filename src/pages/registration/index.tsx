import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Card, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import type { PageComponent } from '@nxweb/react';

import { useAuth } from '@hooks/use-auth';
import { useCommand, useStore } from '@models/store';

import bilo_registration from '@assets/images/bilo_regis_info.svg';

import type { SelectChangeEvent } from '@mui/material';

interface RegistrationModel {
  [key: string]: unknown
  first_name: string
  last_name: string
  gender: string
  dob: string
  created_date: string
  phone: string
}

const DEFAULT_REGISTRATION: RegistrationModel = {
  first_name: '',
  last_name: '',
  gender: '',
  dob: '',
  created_date: '',
  phone: ''
};

const GENERIC_INVALID_INPUT = 'This field cannot be empty';

const RegistrationInfo: PageComponent = () => {
  const navigate = useNavigate();
  const command = useCommand((cmd) => cmd);
  const [store, dispatch] = useStore((state) => state?.registration);
  const maxDate = dayjs().subtract(13, 'year').endOf('year');
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);

  const [formData, setFormData] = useState<RegistrationModel>(DEFAULT_REGISTRATION),
    [isInvalid, setIsInvalid] = useState(false),
    [isInputClickedPhone, setIsInputClickedPhone] = useState(false),
    [formSubmitted, setFormSubmitted] = useState(false),
    [gender, setGender] = useState(''),
    [status, setStatus] = useState('');

  const handleNavigateSuccess = () => {
    navigate('/registration_success');
  };

  const handleChangeGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);

    setFormData({ ...formData, gender: event.target.value as string });
  };

  const handleFromTimeChange = (newTime: dayjs.Dayjs | null) => {
    const formattedTime = newTime ? newTime.format('YYYY-MM-DDTHH:mm:ssZ[Z]') : '';

    setFormData({ ...formData, dob: formattedTime });
  };

  const isValid = () => {
    setIsInvalid(true);
    const valids = [];

    const validationFields = ['first_name', 'last_name', 'gender', 'dob', 'phone'];

    for (const key of validationFields) {
      if (formData[key]) {
        valids.push(true);
      } else {
        valids.push(false);
      }
    }

    return !valids.includes(false);
  };

  const isInputValid = (key: string): boolean | string => {
    if (isInvalid && !formData[key]) {
      return GENERIC_INVALID_INPUT;
    }

    return false;
  };

  const handleSubmit = async () => {
    const valid = isValid();

    if (valid) {
      setFormSubmitted(true);

      if (formData.first_name !== 'fail') {
        try {
          await command.registration.createUserProfile({
            birthDate: formData.dob,
            firstName: formData.first_name,
            gender: formData.gender,
            lastName: formData.last_name,
            phone: `0${formData.phone}`,
            token
          }, token || '');

          if (store?.profile) {
            store.profile.name = formData.first_name;
            store.profile.name = formData.last_name;
            store.profile.phone = `0${formData.phone}`;
            store.profile.created_date = new Date();
            store.profile.date_of_birth = formData.dob;
            store.profile.gender = formData.gender;
          }

          // Redirect to success page
          handleNavigateSuccess();
        } catch (error) {
          setStatus('fail');
          console.error('Error submitting help ticket:', error);
        }
      } else {
        setStatus('fail');
        console.error('Error create profile');
      }
    } else {
      setIsInvalid(true);
      setFormSubmitted(true);
    }
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        background: 'linear-gradient(180deg, #61A1FF 0%, #D4EBFD 99.99%, #D5ECFE 100%)',
        // BorderRadius: '0px 0px 40px 40px',
        display: 'flex',
        flexDirection: 'column',
        minheight: '140vh',
        justifyContent: 'center'
      }}
    >

        <Grid
          container={true}
          sx={{
            position: 'relative'
          }}
          xs={12}
        >

          <Grid item={true} xs={12}>

            {/* TEXT */}
            <Typography
              color="white"
              fontSize="1.25rem"
              fontWeight="bold"
              minWidth="19.5rem"
              paddingTop="5.375rem"
              textAlign="center"
              variant="h4"
            >
              1 Langkah lagi untuk bisa jajan di
              <br />
              TokoRumahan Eats
            </Typography>

            {/* IMAGE */}
            <Box sx={{ textAlign: 'center', paddingTop: '1.5rem' }}>
                <img
                  alt="bilo"
                  src={bilo_registration}
                  style={{
                    width: '15rem'
                  }} />
            </Box>

            <Card sx={{ borderRadius: '1rem', margin: '1.18rem 1rem 1rem 1rem' }}>
              <Grid container={true} sx={{ padding: '1.5rem' }}>
                <Grid item={true} sx={{ marginBottom: '1rem' }} xs={12}>
                  <TextField
                    error={formSubmitted ? formData.first_name === '' : false}
                    helperText={formSubmitted && formData.first_name === '' ? 'Data is Required' : null}
                    id="outlined-basic"
                    label="Nama Depan*"
                    size="small"
                    sx={{ width: '100%' }}
                    type="text"
                    variant="outlined"
                    onChange={(event) => setFormData({ ...formData, first_name: event.target.value })} />
                </Grid>

                <Grid item={true} sx={{ marginBottom: '1rem' }} xs={12}>
                  <TextField
                    error={formSubmitted ? formData.last_name === '' : false}
                    helperText={formSubmitted && formData.last_name === '' ? 'Data is Required' : null}
                    id="outlined-basic"
                    label="Nama Belakang*"
                    size="small"
                    sx={{ width: '100%' }}
                    type="text"
                    variant="outlined"
                    onChange={(event) => setFormData({ ...formData, last_name: event.target.value })} />
                </Grid>

                <Grid item={true} sx={{ marginBottom: '1rem' }} xs={12}>
                  <FormControl
                    error={formSubmitted ? formData.gender === '' : false}
                    fullWidth={true}
                    size="small"
                    sx={{ marginTop: '0.5rem' }}
                  >
                    <InputLabel
                      id="demo-simple-select-standard-label"
                    >Jenis Kelamin*
                    </InputLabel>
                    <Select
                      id="demo-simple-select"
                      label="Jenis Kelamin*"
                      labelId="demo-simple-select-label"
                      value={gender}
                      onChange={handleChangeGender}
                    >
                      <MenuItem disabled={true} value="">
                        Pilih
                      </MenuItem>

                      <MenuItem value="Pria">Pria</MenuItem>
                      <MenuItem value="Wanita">Wanita</MenuItem>

                    </Select>
                    <FormHelperText>{!isInputValid && 'Data is required'}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item={true} sx={{ marginBottom: '1rem' }} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="Tanggal Lahir*"
                    slotProps={{
                      textField: {
                        helperText: 'minimum age is 13 years old',
                        size: 'small'
                      }
                    }}
                    sx={{ width: '100%' }}
                    value={formSubmitted && formData.dob === '' ? '' : formData.dob ? dayjs(formData.dob) : null}
                    onChange={(newTime) => handleFromTimeChange(dayjs(newTime))}
                    // maxDate={dayjs()} // selector date cant choose over today
                    maxDate={maxDate} />
                </LocalizationProvider>
                </Grid>

                <Grid item={true} sx={{ marginBottom: '1rem' }} xs={12}>
                  <TextField
                    InputProps={{
                      startAdornment: isInputClickedPhone &&
                        <InputAdornment position="start">+62 </InputAdornment>
                    }}
                    error={formSubmitted ? formData.phone === '' : false}
                    helperText={formSubmitted && formData.phone === '' ? 'Data is Required' : null}
                    id="outlined-basic"
                    label="No. Handphone"
                    size="small"
                    sx={{ width: '100%' }}
                    type="numeric"
                    variant="outlined"
                    onBlur={() => setIsInputClickedPhone(false)}
                    onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                    onFocus={() => setIsInputClickedPhone(true)} />
                </Grid>

                <Grid item={true} xs={12}>
                  <Button
                    fullWidth={true}
                    size="large"
                    sx={{ marginTop: '1rem', padding: '1rem' }}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Lanjut
                  </Button>
                </Grid>

              </Grid>
            </Card>
          </Grid>
        </Grid>

    </Box>
  );
};

RegistrationInfo.displayName = 'RegistrationInfo';
export default RegistrationInfo;
