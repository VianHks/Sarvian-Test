import type { ChangeEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Check, ChevronRight, PowerSettingsNew } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  EditRound,
  InfoRound
} from '@nxweb/icons/material';
import type { PageComponent } from '@nxweb/react';

import type { CustSnackBarProps } from '@components/custom-component/snackbar';
import { useAuth } from '@hooks/use-auth';
import { PersonalizedRecomendationCommand } from '@models/personalized-recomendation/reducers';
import { useCommand, useStore } from '@models/store';
import type { PhotoEditorModel } from '@models/user-profile/types';

import { toBase64 } from './validatesize';

import iconPhoto from '@assets/images/unggahfoto.svg';

const VisuallyHiddenInput = styled('input')({
  bottom: 0,
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  left: 0,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
  borderRadius: '1rem'
});

interface UpdateUserProfile {
  [key: string]: unknown
  name: string
  profileUrl: string
  // Profile_picture: string | null
}

const DEFAULT_USER_DATA: UpdateUserProfile = {
  name: '',
  profileUrl: ''
  // Profile_picture: ''
};

const Profile: PageComponent = () => {
  const theme = useTheme();
  const command = useCommand((cmd) => cmd);
  const navigate = useNavigate();
  const [store, dispatch] = useStore((state) => state);
  const { action } = useParams();

  const [formData, setFormData] = useState<UpdateUserProfile>(DEFAULT_USER_DATA);

  const [isFail, setIsFail] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const [modalCloseProfileOpen, setModalCloseProfileOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessAlertPicture, setShowSuccessAlertPicture] = useState(false);

  const [originalName, setOriginalName] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<(File | null)>(null);
  const [base64Images, setBase64Images] = useState<string>('');
  const [snackbarProps, setSnackbarProps] = useState<CustSnackBarProps | null>(null);

  const fileInputRefs = useRef<(HTMLInputElement | null)>(null);
  const { auth } = useAuth();
  const token = useMemo(() => auth?.token.accessToken, [auth]);

  const handleEditProfile = () => {
    setIsEditProfile(true);
  };

  const handleSaveProfile = async () => {
    /* This is testing fail need to change for prod */
    if (formData.name === 'fail') {
      setIsFail(true);
      setShowSuccessAlert(true);
      setFormData({ ...formData, name: originalName });
    } else {
      console.log(formData.name);

      const [firstName, ...lastNameArray] = formData.name.split(' ');
      const lastName = lastNameArray.join(' ');

      const file = store?.profile?.photoeditor?.file;
      const custId = store?.personalizedRec?.customerProfile?.data?.user?.id || '';

      if (base64Images && file) {
        const base64Data = base64Images.split(',')[1];
        const fileName = file?.name || '';
        const fileType = file?.type || 'image/png';

        const response = await command.profile.uploadFile(token || '', base64Data, fileName, custId, fileType);

        const payload = {
          firstName,
          lastName,
          profileUrl: response || '',
          token
        };

        await command.profile.putUpdateCustomer(payload, token || '').then((res) => {
          console.log('cekRespUpdate', res);

          setIsFail(false);
          setShowSuccessAlert(true);
        });
        const transformedProfile: UpdateUserProfile = {
          name: `${firstName} ${lastName}` || formData.name,
          profileUrl: `${response}` || formData.profileUrl
          // Profile_picture: store?.photoeditor?.fileName || null
        };

        setFormData(transformedProfile);
      }
    }

    setIsEditProfile(false);
  };

  function getPreviewImageSrc(): string | undefined {
    if (store?.profile?.photoeditor) {
      const photoModel = store?.profile?.photoeditor;
      if (photoModel?.base64Image) {
        // SetShowSuccessAlertPicture(true);

        return photoModel.base64Image;
      }
    }

    return iconPhoto;
  }

  useEffect(() => {
    if (token) {
      const tokenKey = {
        token
      };

      dispatch(PersonalizedRecomendationCommand.getCustomerProfile(token, tokenKey));
    }
  }, [dispatch]);

  useEffect(() => {
    const user = store?.personalizedRec?.customerProfile?.data?.user;
    const profileUrl = store?.personalizedRec?.customerProfile?.data?.user?.metadata.find(item => item.key === 'profileUrl')?.value;

    if (user && user.firstName !== undefined && user.lastName !== undefined) {
      const transformedProfile: UpdateUserProfile = {
        name: `${user.firstName} ${user.lastName}` || formData.name,
        profileUrl: `${profileUrl}`
        // Profile_picture: store?.photoeditor?.fileName || null
      };

      setFormData(transformedProfile);
    }
  }, [store]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (showSuccessAlert) {
      timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showSuccessAlert]);

  /*
   * UseEffect(() => {
   *   let timer: NodeJS.Timeout | null = null;
   *   if (showSuccessAlertPicture) {
   *     timer = setTimeout(() => {
   *       setShowSuccessAlert(false);
   *     }, 2000);
   *   }
   */

  /*
   *   return () => {
   *     if (timer) clearTimeout(timer);
   *   };
   * }, [showSuccessAlertPicture]);
   */

  useEffect(() => {
    const storedFileInfo = store?.profile?.photoeditor;

    if (storedFileInfo !== null && typeof storedFileInfo === 'object') {
      const fileInfo = storedFileInfo;

      const file = fileInfo !== null ? new File([''], fileInfo.fileName, { type: fileInfo.typeFile }) : null;

      setSelectedImages(file);

      const base64Image = fileInfo !== null ? fileInfo.base64Image : '';

      setBase64Images(base64Image as string);
    }
  }, [store?.profile?.photoeditor]);

  /*
   * Const handleCloseSnackbar = () => {
   *   setSnackbarProps(null);
   * };
   */

  const handleNavigateLocataion = () => {
    navigate('/location');
  };

  const handleNavigateHelp = () => {
    navigate('/help-center');
  };

  const handleNavigateLogin = () => {
    navigate('/logout');
  };

  const handleOpenModal = () => {
    setModalCloseProfileOpen(true);
  };

  const handleCloseModal = () => {
    setModalCloseProfileOpen(false);
  };

  const handleButtonClick = () => {
    if (fileInputRefs.current) {
      fileInputRefs.current?.click();
    }
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      /*
       * If (file.size > 1024 * 1024) {
       *   setSnackbarProps({
       *     message: 'Gambar melebihi ukururan 1MB. Pastikan jika ukurannya kurang dari 1MB',
       *     severity: 'warning'
       *   });
       */

      /*
       *   return;
       * }
       */

      try {
        const base64Image = await toBase64(file);

        const newImage = file;

        setSelectedImages(newImage);

        setBase64Images(base64Image as string);

        const updatedSelectedImages: PhotoEditorModel | null = selectedImages
          ? {
            ...selectedImages,
            file: newImage,
            fileName: newImage.name || '',
            size: newImage.size || 0,
            typeFile: newImage.type || '',
            base64Image: base64Images || ''
          }
          : null;

        // eslint-disable-next-line no-console
        console.log(updatedSelectedImages);

        dispatch(command.profile?.updatePhotoEditorData(updatedSelectedImages || null));

        const imgPreview = document.getElementById(`imgPreview_0`) as HTMLImageElement | null;
        if (imgPreview) {
          imgPreview.src = base64Image as string;
        }

        navigate('/edit-photo');
      } catch (error) {
        setSnackbarProps({
          message: 'Upload Gambar gagal',
          severity: 'warning'
        });

        console.error(error);
      }
    }
  };

  /*
   * Const handleConfirm = () => {
   *   setModalCloseProfileOpen(false);
   * };
   */

  // eslint-disable-next-line no-console
  console.log('cekstore', store);
  console.log('cekFormData', formData);

  return (
    <Container
      disableGutters={true}
      style={{ marginBottom: '0', paddingBottom: 0 }}
    >

      <Box
        sx={{
          background: 'linear-gradient(180deg, #5698FB 0%, #2B77E7 100%)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '14.125rem',
          width: '22.5'
        }}
      >
        {/* HEAD BAR */}
        <Box
          sx={{
            display: 'flex',
            p: '0.5rem 1.5rem',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '3.5rem'
          }}
        >

          <Typography color="white" fontWeight="bold" variant="h4">
            Profil
          </Typography>

          {isEditProfile
            ? <Button
                aria-label="ubah spanduk"
                size="small"
                startIcon={<Check />}
                sx={{ p: '0.25rem 0.625rem', borderRadius: '.5rem .5rem .5rem .5rem', border: '1px solid #FFF', color: '#FFF' }}
                onClick={handleSaveProfile}
              >
            <Typography
              color="white"
              fontWeight="semibold"
              textTransform="none"
              variant="body2"
            >
              Selesai Edit
            </Typography>
              </Button>
            : (
            <Button
              aria-label="ubah spanduk"
              endIcon={<EditRound />}
              size="small"
              sx={{ p: '0.25rem 0.625rem', borderRadius: '.5rem .5rem .5rem .5rem', border: '1px solid #FFF', color: '#FFF' }}
              onClick={handleEditProfile}
            >
            <Typography
              color="white"
              fontWeight="semibold"
              textTransform="none"
              variant="body2"
            >
              Edit Profil
            </Typography>
            </Button>
            )}

        </Box>
      </Box>

      <Box
        sx={{
          alignItems: 'center',
          mb: '-1.5rem',
          bottom: 0,
          position: 'relative',
          top: 'auto',
          width: '100%',
          zIndex: 2
        }}
      >
        <Card
          sx={{
            alignItems: 'center',
            background: theme.palette.grey[200],
            borderRadius: '2rem 2rem 0 0',
            bottom: 0,
            mb: 0,
            marginTop: '-4rem',
            paddingX: '1.5rem',
            width: '100%',
            height: '100%'
          }}
        >

          {/* CARD PROFILE */}
          <Box
            sx={{
              position: 'absolute',
              display: 'block',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              top: '-5rem',
              left: '0',
              right: '0',
              paddingX: '1.5rem'
            }}
          >

            {/* ALERT */}

            {showSuccessAlert
              ? <>
              {isFail
                ? (
                <Alert
                  color="error"
                  severity="error"
                  sx={{
                    position: 'absolute',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FECDCA',
                    top: '-4.3rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    paddingX: '1.5rem'
                  }}
                >
                  <Typography fontSize="1rem">
                    Kamu gagal memperbarui Profil, coba beberapa saat lagi!
                  </Typography>
                </Alert>
                )
                : (
                <Alert
                  color="success"
                  severity="success"
                  sx={{
                    position: 'absolute',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#DDFAA7',
                    top: '-4.3rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    paddingX: '1.5rem'
                  }}
                >
                  <Typography fontSize="1rem">
                    Selamat, kamu berhasil memperbarui Profil!
                  </Typography>
                </Alert>
                )}
                </>
              : null}

            {/* {showSuccessAlertPicture
              ? <>
              {isFail
                ? (
                <Alert
                  color="error"
                  severity="error"
                  sx={{
                    position: 'absolute',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FECDCA',
                    top: '-4.3rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    paddingX: '1.5rem'
                  }}
                >
                  <Typography fontSize="1rem">
                    Kamu gagal memperbarui Profil Picture, coba beberapa saat lagi!
                  </Typography>
                </Alert>
                )
                : (
                <Alert
                  color="success"
                  severity="success"
                  sx={{
                    position: 'absolute',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#DDFAA7',
                    top: '-4.3rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    paddingX: '1.5rem'
                  }}
                >
                  <Typography fontSize="1rem">
                    Selamat, kamu berhasil memperbarui Profil Picture!
                  </Typography>
                </Alert>
                )}
                </>
              : null} */}

            <Card sx={{ padding: 0 }}>
              <CardContent
                sx={{
                  padding: '1rem',
                  '&:last-child': {
                    paddingBottom: '0.5rem'
                  }
                }}
              >
                <Grid container={true}>
                  <Grid item={true} xs={8}>
                    <Typography color="primary" fontWeight="bold" paddingBottom=".5rem" textAlign="start" variant="h4">TokRuMates</Typography>

                    {isEditProfile
                      ? <TextField
                          InputProps={{ disableUnderline: true }}
                          fullWidth={true}
                          // Multiline={true}
                          rows={1}
                          sx={{ border: '1px solid lightgrey', borderRadius: '.5rem', paddingLeft: '.5rem', right: '5px', marginBottom: '10px' }}
                          value={formData.name}
                          variant="standard"
                          onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
                      : (
                      <>
                        <Typography color={theme.palette.grey[600]} textAlign="start" variant="caption">Nama:</Typography>
                        <Typography color={theme.palette.grey[800]} fontWeight="bold" textAlign="start" variant="body2">
                        {formData.name}
                        </Typography>
                      </>
                      )}

                    <Typography color={theme.palette.grey[600]} textAlign="start" variant="caption">Email:</Typography>
                    <Typography color={theme.palette.grey[800]} fontWeight="bold" textAlign="start" variant="body2">{store?.personalizedRec?.customerProfile?.data?.user?.email}</Typography>

                    <Typography color={theme.palette.grey[600]} textAlign="start" variant="caption">No. Handphone:</Typography>
                    <Typography color={theme.palette.grey[800]} fontWeight="bold" textAlign="start" variant="body2">{store?.personalizedRec?.customerProfile?.data?.user?.metadata.find((meta) => meta.key === 'phone')?.value}</Typography>
                  </Grid>

                  {/* <Grid item={true} sx={{ alignItems: 'start', display: 'flex', justifyContent: 'end' }} xs={4}>
                    <div
                      style={{
                        alignItems: 'start',
                        display: 'flex',
                        height: '6rem',
                        justifyContent: 'center',
                        width: '6rem'
                      }}
                    >
                      {store?.profile?.profile_picture
                        ? <img
                            alt="profile"
                            src={store.profile.profile_picture}
                            style={{ maxHeight: '100%', minWidth: '100%', borderRadius: '.5rem' }} />
                        : null}
                    </div>
                  </Grid> */}

                  {/* TESTING DATA - CUSTOM COMPONENT */}
                  <Grid item={true} sx={{ alignItems: 'start', display: 'flex', justifyContent: 'end' }} xs={4}>
                    <Grid item={true}>
                      <Button
                        disabled={isEditProfile}
                        style={{
                          height: 'auto',
                          minWidth: 0,
                          padding: 0,
                          textTransform: 'none',
                          width: 'auto'
                        }}
                        onClick={handleButtonClick}
                      >
                        <img
                          alt="Selected"
                          id="imgPreview_0"
                          src={getPreviewImageSrc() || ''}
                          style={{
                            display: 'block',
                            height: '6rem',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            objectFit: 'cover',
                            paddingLeft: '0rem !important',
                            width: '6rem',
                            opacity: isEditProfile ? '0.5' : undefined,
                            borderRadius: '.5rem'
                          }} />
                        <VisuallyHiddenInput
                          accept="image/jpeg, image/jpg"
                          ref={(el) => {
                            fileInputRefs.current = el;
                          }}
                          type="file"
                          onChange={(event) => {
                            handleImageChange(event);
                          }} />
                      </Button>
                    </Grid>
                  </Grid>

                </Grid>

              </CardContent>
            </Card>
          </Box>

          <Stack
            display="block"
            mt="6.375rem"
            pb="0.5rem"
            pt="1.5rem"
            spacing={2}
          >

            {/* ALAMAT */}
            <Grid item={true} xs={12}>
              <Paper sx={{ p: 0 }}>
                <Card sx={{ padding: 0, borderRadius: '.5rem .5rem .5rem .5rem' }} onClick={!isEditProfile ? handleNavigateLocataion : undefined}>
                  <CardContent
                    sx={{
                      padding: '0.5rem',
                      '&:last-child': {
                        paddingBottom: '0.5rem'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        py: '0.25rem',
                        px: '0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        opacity: isEditProfile ? '0.5' : undefined
                      }}
                    >
                      <Typography
                        color="#1050AE"
                        fontWeight="bold"
                        variant="h6"
                      >
                        Alamat
                      </Typography>
                      <IconButton aria-label="rating">
                        <Box height="1.5rem" width="1.5rem">
                          <ChevronRight />
                        </Box>
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>

            {/* TENTANG TOKRUM */}
            <Grid item={true} xs={12}>
              <Paper sx={{ p: 0 }}>
                <Card sx={{ padding: 0, borderRadius: '.5rem .5rem .5rem .5rem' }}>
                  <CardContent
                    sx={{
                      padding: '0.5rem',
                      '&:last-child': {
                        paddingBottom: '0.5rem'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        py: '0.25rem',
                        px: '0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        opacity: isEditProfile ? '0.5' : undefined
                      }}
                    >
                      <Typography
                        color="#1050AE"
                        fontWeight="bold"
                        variant="h6"
                      >
                        Tentang TokRum
                      </Typography>
                      <IconButton aria-label="rating">
                        <Box height="1.5rem" width="1.5rem">
                          <ChevronRight />
                        </Box>
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>

            {/* SK */}
            <Grid item={true} xs={12}>
              <Paper sx={{ p: 0 }}>
                <Card sx={{ padding: 0, borderRadius: '.5rem .5rem .5rem .5rem' }}>
                  <CardContent
                    sx={{
                      padding: '0.5rem',
                      '&:last-child': {
                        paddingBottom: '0.5rem'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        py: '0.25rem',
                        px: '0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        opacity: isEditProfile ? '0.5' : undefined
                      }}
                    >
                      <Typography
                        color="#1050AE"
                        fontWeight="bold"
                        variant="h6"
                      >
                        Syarat & Ketentuan
                      </Typography>
                      <IconButton aria-label="rating">
                        <Box height="1.5rem" width="1.5rem">
                          <ChevronRight />
                          {/* <img height="100%" src={ChevronRight} width="100%" /> */}
                        </Box>
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>

            {/* BANTUAN */}
            <Grid item={true} xs={12}>
              <Paper sx={{ p: 0 }}>
                <Card sx={{ padding: 0, borderRadius: '.5rem .5rem .5rem .5rem' }} onClick={!isEditProfile ? handleNavigateHelp : undefined}>
                  <CardContent
                    sx={{
                      padding: '0.5rem',
                      '&:last-child': {
                        paddingBottom: '0.5rem'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        py: '0.25rem',
                        px: '0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        opacity: isEditProfile ? '0.5' : undefined
                      }}
                    >
                      <Typography
                        color="#1050AE"
                        fontWeight="bold"
                        variant="h6"
                      >
                        Bantuan/FAQ
                      </Typography>
                      <IconButton aria-label="rating">
                        <Box height="1.5rem" width="1.5rem">
                          <InfoRound
                            style={{
                              color: '#5698FB'
                            }} />
                          {/* <img height="100%" src={ChevronRight} width="100%" /> */}
                        </Box>
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>

            {/* KELUAR APLIKASI */}
            <Grid item={true} xs={12}>
              <Paper sx={{ p: 0 }}>
                <Card sx={{ padding: 0 }} onClick={!isEditProfile ? handleOpenModal : undefined}>
                  <CardContent
                    sx={{
                      padding: '0.5rem',
                      '&:last-child': {
                        paddingBottom: '0.5rem'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        py: '0.25rem',
                        px: '0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        opacity: isEditProfile ? '0.5' : undefined
                      }}
                    >
                      <Typography
                        color={theme.palette.error.main}
                        fontWeight="bold"
                        variant="h6"
                      >
                        Keluar Aplikasi
                      </Typography>
                      <IconButton
                        aria-label="keluar aplikasi"
                      >
                        <Box height="1.5rem" width="1.5rem">
                          <PowerSettingsNew
                            style={{
                              color: theme.palette.error.main
                            }} />
                          {/* <img height="100%" src={onOff} width="100%" /> */}
                        </Box>
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>

          </Stack>
        </Card>
      </Box>

      {/* DIALOG - KELUAR APLIKASI */}
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        open={modalCloseProfileOpen}
        onClose={handleCloseModal}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              color={theme.palette.grey[900]}
              fontWeight="bold"
              variant="h4"
            >
              Yakin kamu ingin keluar dari Tokrum Food Buyer?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleCloseModal}
          >
            <Typography
              color={theme.palette.grey[100]}
              fontWeight="semibold"
              variant="body1"
            >
              Tidak
            </Typography>
          </Button>
          <Button
            autoFocus={true}
            color="error"
            size="small"
            variant="contained"
            onClick={handleNavigateLogin}
          >
            <Typography
              color={theme.palette.grey[100]}
              fontWeight="semibold"
              variant="body1"
            >
              Ya, Keluar
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

Profile.displayName = 'Profile';

export default Profile;
