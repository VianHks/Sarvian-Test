import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Avatar, Button, Dialog, DialogContent, Grid, IconButton, InputBase, Paper, styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { LinkOutline } from '@nxweb/icons/ionicons';
import { ArrowBackFilled, ContentCopyOutlined, EmailOutlined, FileDownloadOutlined, FilterAltFilled, SearchFilled, ShareFilled, SmsOutlined } from '@nxweb/icons/material';
import { Facebook, Instagram, LINE, Telegram, Twitter, WhatsApp } from '@nxweb/icons/simple';

import { routes } from '@config/routes';

type ActionType = 'detailpesanan' | undefined;

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  paddingBottom: theme.spacing(35),
  paddingTop: theme.spacing(5),
  transition: 'padding .25s ease-in-out',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}));

// NOTE: SUBDESCRIPTION OR GET DATA FROM PAGE

const AppBarLayout = ({ children }: { readonly children?: React.ReactNode, readonly action?: ActionType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action');
  let dynamicIcon = null;
  let dynamicHandler: React.ReactNode = null;

  const currentRoute = routes.find((route) => route.path === location.pathname);
  const pageDescription = currentRoute?.meta?.description || '';
  const pageId = currentRoute?.meta?.appBarId || '';

  const handleBack = () => {
    navigate(-1);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  switch (pageId) {
    case 'detailpesanan':
      dynamicIcon = <ShareFilled />;

      dynamicHandler = (
        <div>
          <IconButton
            aria-label="dynamic-action"
            color="default"
            size="large"
            sx={{ mr: 2 }}
            onClick={openDialog}
          >
            {dynamicIcon}
          </IconButton>
        </div>
      );
      break;
    case 'keranjang':
      dynamicHandler = (
        <div>
          <Button
            color="primary"
            variant="text"
            onClick={() => navigate(action === 'edit' ? '/keranjang' : '/keranjang?action=edit')}
          >
            {action === 'edit' ? 'Selesai' : 'Edit'}
          </Button>
        </div>
      );
      break;

    default:
      break;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: pageId === 'searchresult' ? '#D5ECFE' : 'white', elevation: 0 }}>
        <Toolbar>
          <IconButton
            aria-label="back"
            color="default"
            edge="start"
            size="large"
            sx={{ mr: 2 }}
          >
            <ArrowBackFilled onClick={handleBack} />
          </IconButton>
          { pageId === 'searchresult' && (
          <Paper
            component="form"
            sx={{
              alignItems: 'center',
              borderRadius: '0.5rem',
              boxShadow: 'none',
              display: 'flex',
              p: '0.5 rem 1rem',
              width: 280
            }}
          >
            <IconButton aria-label="menu" sx={{ p: '10px' }}>
              <SearchFilled />
            </IconButton>
            <InputBase
              inputProps={{ 'aria-label': 'search google maps' }}
              placeholder="Mau makan apa hari ini?"
              sx={{ ml: 1, flex: 1 }} />
            <IconButton aria-label="search" sx={{ p: '10px' }} type="button">
              <FilterAltFilled style={{ color: '#317FF2' }} />
            </IconButton>
          </Paper>
          ) }
          <Typography component="div" fontWeight="bold" sx={{ flexGrow: 1 }} variant="h5">
            {String(pageDescription)}
          </Typography>
          {dynamicHandler}
          <Dialog open={isDialogOpen} onClose={closeDialog}>
            <DialogContent sx={{ width: '30rem' }}>
              <div style={{ marginBottom: '1rem', overflowY: 'auto' }}>
                <Grid container={true}>
                  <Grid item={true} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} xs={2}>
                    <Avatar>
                      <WhatsApp />
                    </Avatar>
                    <Typography style={{ marginTop: '0.3rem' }} variant="body2">
                      WhatsApp
                    </Typography>
                  </Grid>
                  <Grid item={true} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} xs={2}>
                    <Avatar>
                      <Instagram />
                    </Avatar>
                    <Typography style={{ marginTop: '0.3rem' }} variant="body2">
                      Instagram
                    </Typography>
                  </Grid>
                  <Grid item={true} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} xs={2}>
                    <Avatar>
                      <Telegram />
                    </Avatar>
                    <Typography style={{ marginTop: '0.3rem' }} variant="body2">
                      Telegram
                    </Typography>
                  </Grid>
                  <Grid item={true} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} xs={2}>
                    <Avatar>
                      <Facebook />
                    </Avatar>
                    <Typography style={{ marginTop: '0.3rem' }} variant="body2">
                      Facebook
                    </Typography>
                  </Grid>
                  <Grid item={true} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} xs={2}>
                    <Avatar>
                      <LINE />
                    </Avatar>
                    <Typography style={{ marginTop: '0.3rem' }} variant="body2">
                      Line
                    </Typography>
                  </Grid>
                  <Grid item={true} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} xs={2}>
                    <Avatar>
                      <Twitter />
                    </Avatar>
                    <Typography style={{ marginTop: '0.3rem' }} variant="body2">
                      Twitter
                    </Typography>
                  </Grid>
                </Grid>
              </div>

              <div style={{ overflowY: 'auto' }}>
                <Grid container={true}>
                  <Grid item={true} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} xs={2}>
                    <Avatar>
                      <LinkOutline />
                    </Avatar>
                    <Typography style={{ marginTop: '0.3rem' }} variant="body2">
                      Tautan
                    </Typography>
                  </Grid>
                  <Grid item={true} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} xs={2}>
                    <Avatar>
                      <ContentCopyOutlined />
                    </Avatar>
                    <Typography style={{ marginTop: '0.3rem' }} variant="body2">
                      Salin info
                    </Typography>
                  </Grid>
                  <Grid item={true} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} xs={2}>
                    <Avatar>
                      <SmsOutlined />
                    </Avatar>
                    <Typography style={{ marginTop: '0.3rem' }} variant="body2">
                      SMS
                    </Typography>
                  </Grid>
                  <Grid item={true} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} xs={2}>
                    <Avatar>
                      <EmailOutlined />
                    </Avatar>
                    <Typography style={{ marginTop: '0.3rem' }} variant="body2">
                      Email
                    </Typography>
                  </Grid>
                  <Grid item={true} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} xs={2}>
                    <Avatar>
                      <FileDownloadOutlined />
                    </Avatar>
                    <Typography style={{ marginTop: '0.3rem' }} variant="body2">
                      Simpan
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
          </Dialog>
        </Toolbar>
      </AppBar>
      <Box
        className="app-content"
        sx={{
          minHeight: (theme) => `calc(100vh - ${theme.spacing((theme.mixins.toolbar.minHeight as number) / 4)})`,
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        <ContentWrapper>{children}</ContentWrapper>
      </Box>
    </Box>
  );
};

AppBarLayout.displayName = 'AppBarLayout';

export { AppBarLayout };
