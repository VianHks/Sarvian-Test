import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography,
  useTheme
} from '@mui/material';

import {
  CircleFilled,
  // CloseFilled,
  EditRound,
  InfoRound,
  PersonFilled
} from '@nxweb/icons/material';
import { ChevronDown } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

// Import { useCommand, useStore } from '@models/store';

import type { TooltipProps } from '@mui/material';
import { ChevronRight, Power, PowerSettingsNew } from '@mui/icons-material';

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} arrow={true} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main
  }
}));

const Profile: PageComponent = () => {
  const theme = useTheme();
  //   Const command = useCommand((cmd) => cmd);
  const navigate = useNavigate();

  /*
   *   Const [store, dispatch] = useStore('');
   *   const fileInputRef = useRef<HTMLInputElement | null>(null);
   */
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedValue, setSelectedValue] = useState('tutup');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [temporaryStoreDescription, setTemporaryStoreDescription] =
    useState('');
  const [isEditDescription, setIsEditDescription] = useState(false);
  const [storeDescription, setStoreDiscription] = useState('');
  const [modalCloseProfileOpen, setModalCloseProfileOpen] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const handleSaveDescription = () => {
    setIsEditDescription(false);

    setStoreDiscription(temporaryStoreDescription);
  };

  const handleHelpTicketNavigate = () => {
    navigate('/help-center');
  };

  const handleRatingNavigate = () => {
    navigate('/sellerRating');
  };

  useEffect(() => {
    if (!isEditDescription) {
      setStoreDiscription(temporaryStoreDescription);
    }
  }, [isEditDescription]);

  const handleEditDescription = () => {
    setIsEditDescription(true);
  };

  const handleOpenModal = () => {
    setModalCloseProfileOpen(true);
  };

  const handleConfirm = () => {
    setModalCloseProfileOpen(false);
  };

  const handleCloseModal = () => {
    setModalCloseProfileOpen(false);
  };

  const handleListItemClick = (status: string) => {
    setSelectedValue(status);
    setOpenDrawer(false);
  };

  const handleToPreviewToko = () => {
  };

  /*
   *   Const handleChangeProfilePicture = async () => {
   *     console.log('bhjer');
   */

  /*
   *     if (fileInputRef.current) {
   *       fileInputRef.current.click();
   *       await new Promise((resolve) => fileInputRef.current?.addEventListener('change', resolve));
   *       const file = fileInputRef.current?.files?.[0];
   */

  /*
   *       if (file) {
   *         const fileReader = new FileReader();
   */

  /*
   *         fileReader.onload = () => {
   *           const newImage = fileReader.result as string;
   */

  /*
   *           setImage(newImage);
   *         };
   */

  /*
   *         fileReader.readAsDataURL(file);
   *       }
   *     }
   *   };
   */

  const getIconColor = () => {
    return selectedValue.toLocaleLowerCase() === 'buka' ? '#A5E656' : '#EC3C3C';
  };

  return (
    <Container
      disableGutters={true}
      style={{ marginBottom: '0', paddingBottom: 0 }}
    >
      <Box
        sx={{
          // BackgroundImage: `url(${background})`,
          backgroundColor: '#5698FB',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '14.125rem',
          width: '22.5'
        }}
      >
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

          <Button
            aria-label="ubah spanduk"
            endIcon={<EditRound />}
            size="small"
            sx={{ p: '0.25rem 0.625rem', borderRadius: '.5rem .5rem .5rem .5rem', border: '1px solid #FFF', backgroundColor: '#5698FB' }}
            variant="contained"
            // OnClick={handleChangeProfilePicture}
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

          {/*  */}
          <Box
            sx={{
              position: 'absolute',
              // textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              top: '0',
              left: 0,
              right: 0
              // left: '50%',
              // transform: 'translate(-50%, -50%)'
            }}
          >
            {/* CARD */}
            <Grid item={true} xs={12}>
              <Paper sx={{ p: 0 }}>
                <Card sx={{ padding: 0 }}>
                  <CardContent
                    sx={{
                      padding: '0.5rem',
                      '&:last-child': {
                        paddingBottom: '0.5rem'
                      }
                    }}
                  >
                    <Box sx={{ padding: '1rem' }}>
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography
                            color="black"
                            fontWeight="medium"
                            variant="body2"
                          >
                            Penilaian
                          </Typography>

                          <Typography
                            color={theme.palette.grey[700]}
                            fontWeight="regular"
                            variant="body2"
                          >
                            4.9 dari 5 (1,6rb komentar)
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography
                            color="black"
                            fontWeight="medium"
                            variant="body2"
                          >
                            Performa Chat
                          </Typography>

                          <Typography
                            color={theme.palette.grey[700]}
                            fontWeight="regular"
                            variant="body2"
                          >
                            100%(Hitungan Jam)
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography
                            color="black"
                            fontWeight="medium"
                            variant="body2"
                          >
                            Produk
                          </Typography>
                          <Typography
                            color={theme.palette.grey[700]}
                            fontWeight="regular"
                            variant="body2"
                          >
                            test
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography
                            color="black"
                            fontWeight="medium"
                            variant="body2"
                          >
                            Bergabung
                          </Typography>

                          <Typography
                            color={theme.palette.grey[700]}
                            fontWeight="regular"
                            variant="body2"
                          >
                            {/* 5 Tahun */}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>

            {/* <Badge
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              badgeContent={4}
              color="success"
              invisible={true}
              overlap="circular"
              variant="dot"
            >
              <Box
                component="span"
                sx={{
                  position: 'relative',
                  width: '7.5rem',
                  height: '7.5rem',
                  borderRadius: '100%'
                }}
              >
                <Box sx={{ width: '100%', height: '100%' }}>
                  <Avatar
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: '100%',
                      backgroundColor: '#BDBDBD'
                    }}
                  >
                    <PersonFilled />
                  </Avatar>
                </Box>
                <Button
                  startIcon={<EditRound />}
                  sx={{
                    position: 'absolute',
                    bottom: '0.9rem',
                    transform: 'translateX(-50%)',
                    color: 'white'
                  }}
                  variant="text"
                  // onClick={handleChangeProfilePicture}
                >
                  <Typography
                    color="inherit"
                    fontWeight="regular"
                    noWrap={true}
                    textTransform="none"
                    variant="caption"
                  >
                    Ubah Foto
                  </Typography>
                </Button>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '0',
                    width: '100%',
                    height: '100%',
                    borderRadius: 'inherit',
                    background:
                      'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0.64) 100%)'
                  }} />
              </Box>
            </Badge> */}
          </Box>

          <Stack
            display="block"
            mt="6.375rem"
            pt="1.5rem"
            spacing={2}
            pb="0.5rem"
          >

            {/* ALAMAT */}
            <Grid item={true} xs={12}>
              <Paper sx={{ p: 0 }}>
                <Card sx={{ padding: 0, borderRadius: '.5rem .5rem .5rem .5rem' }} /*onClick={handleRatingNavigate}*/>
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
                        alignItems: 'center'
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
                          {/* <img height="100%" src={ChevronRight} width="100%" /> */}
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
                <Card sx={{ padding: 0, borderRadius: '.5rem .5rem .5rem .5rem' }} /*onClick={handleRatingNavigate}*/>
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
                        alignItems: 'center'
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
                          {/* <img height="100%" src={ChevronRight} width="100%" /> */}
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
                <Card sx={{ padding: 0, borderRadius: '.5rem .5rem .5rem .5rem' }} /*onClick={handleRatingNavigate}*/>
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
                        alignItems: 'center'
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
                <Card sx={{ padding: 0, borderRadius: '.5rem .5rem .5rem .5rem' }} /*onClick={handleRatingNavigate}*/>
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
                        alignItems: 'center'
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
                <Card sx={{ padding: 0 }}>
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
                        alignItems: 'center'
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
                        onClick={handleOpenModal}
                      >
                        <Box height="1.5rem" width="1.5rem">
                          <PowerSettingsNew
                            style={{
                              color: '#D92D20'
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
              Yakin kamu ingin keluar dari TokoRumahan Mitra?
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
            onClick={handleConfirm}
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
