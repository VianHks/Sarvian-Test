import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Avatar, Button, Dialog, DialogContent, Grid, IconButton, InputLabel, Menu, MenuItem, Select, styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { LinkOutline } from '@nxweb/icons/ionicons';
import { ArrowBackFilled, ContentCopyOutlined, EmailOutlined, FileDownloadOutlined, ShareFilled, SmsOutlined } from '@nxweb/icons/material';
import { Facebook, Instagram, LINE, Telegram, Twitter, WhatsApp } from '@nxweb/icons/simple';

import { routes } from '@config/routes';
import { SearchOutlined } from '@mui/icons-material';

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

const DUMMY_MENU = [
  { id: 0, category_name: 'Menu', active: true, category_description: 'Menu' },
  { id: 1, category_name: 'Paket Kombo', active: true, category_description: 'Paket Kombo' },
  { id: 2, category_name: 'Paket Hemat', active: true, category_description: 'Paket Hemat' },
  { id: 3, category_name: 'Paket Komplit', active: true, category_description: 'Paket Komplit' }
];
// NOTE: SUBDESCRIPTION OR GET DATA FROM PAGE

const AppBarLayout = ({ children }: { readonly children?: React.ReactNode, readonly action?: ActionType }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>('Menu');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action');
  let dynamicIcon = null;
  let dynamicHandler: React.ReactNode = null;

  const currentRoute = routes.find((route) => route.path === location.pathname);
  const pageDescription = currentRoute?.meta?.description || '';
  const pageId = currentRoute?.meta?.appBarId || '';

  useEffect(() => {
    setAnchorEl(document.body);
  }, []);

  const handleBack = () => {
    console.log('cek');
    navigate(-1);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      <AppBar position="static" sx={{ background: 'white', elevation: 0 }}>
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

          <div>
  <Select label="Filter" labelId="filter-label" displayEmpty value={selectedValue} onChange={(event) => setSelectedValue(event.target.value as string)} sx={{ width: 200 }}>

  {DUMMY_MENU.filter((category) => category.category_name !== 'Menu').map((category) => (
    <MenuItem key={category.id} value={category.category_name}>
      {category.category_description}
    </MenuItem>
  ))}
  </Select>

</div>

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
