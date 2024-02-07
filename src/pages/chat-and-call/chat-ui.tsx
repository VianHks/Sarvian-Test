import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CallEnd } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import {
  ArrowBackFilled,
  AttachmentFilled,
  CameraAltFilled,
  PhoneEnabledFilled,
  SendFilled
} from '@nxweb/icons/material';

import Message from './message-style';

import ProductImage from '@assets/images/Bakar.png';
import SellerImage from '@assets/images/MieBaso.png';
import RestoFoto from '@assets/images/RestoFoto.svg';

import type { chatListData } from '.';
import { DUMMY_ChatList } from '.';

interface ChatListDetail {
  date: string
  id: number
  sender: 'bot' | 'user'
  text: string
}

const chatOutput: ChatListDetail[] = [
  {
    date: '10:00, 02 Agustus 2023',
    id: 1,
    sender: 'bot',
    text: 'WOIIIIIII!'
  },
  {
    date: '10:05, 02 Agustus 2023',
    id: 2,
    sender: 'user',
    text: 'Pesanan saya gmn?'
  },
  {
    date: '10:07, 02 Agustus 2023',
    id: 3,
    sender: 'bot',
    text: 'Mohon Bersabar'
  },
  {
    date: '10:10, 02 Agustus 2023',
    id: 4,
    sender: 'user',
    text: 'Ok'
  }
];

const ChatUI: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState<string>('');
  const [chatData, setChatData] = useState<chatListData | null>(null);
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      const foundChatData = DUMMY_ChatList.find((data) => data.id === id);
      if (foundChatData) {
        setChatData(foundChatData);
      }
    }
  }, [id]);

  const handleSend = () => {
    if (input.trim() !== '') {
      setInput('');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Box sx={{ backgroundColor: 'white', position: 'sticky', zIndex: 1000 }}>
        <Grid
          alignItems="center"
          container={true}
          display="flex"
          justifyContent="space-between"
          sx={{ padding: '0.5rem 1.5rem' }}
        >
          <Grid alignItems="center" display="flex" item={true}>
            <ArrowBackFilled
              color="#475467"
              style={{ height: '24px', marginRight: '1rem', width: '24px' }}
              onClick={handleBack} />
            <Avatar
              src={RestoFoto}
              style={{ height: '40px', marginRight: '0.5rem', width: '40px' }} />
            <Typography color="black" sx={{ fontWeight: 'bold' }} variant="h5">
              {chatData?.userName}
            </Typography>
          </Grid>
          <IconButton onClick={() => navigate('/call')}>
            <PhoneEnabledFilled
              color={theme.palette.grey[900]}
              style={{ height: '24px', width: '24px' }} />
          </IconButton>
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          paddingInline: '0.5rem'
        }}
      >
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                backgroundColor: '#E4F3FF',
                borderRadius: '4px',
                marginY: '1rem',
                padding: '0.25rem 0.5rem',
                width: 'fit-content'
              }}
            >
              <Typography
                color="primary"
                sx={{ textAlign: 'center' }}
                variant="body2"
              >
                24 Agustus 2023
              </Typography>
            </Box>
          </div>

          <Box sx={{ paddingInline: '0.5rem' }}>
            <Card sx={{ marginBottom: '1rem', padding: '1rem' }}>
              <Box>
                <Grid
                  container={true}
                  sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Grid item={true} xs={true}>
                    <Typography color="neutral-90" variant="body2">
                      No. Pesanan:
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={true}>
                    <Typography color="black" variant="body2">
                      #FFDA2023
                    </Typography>
                  </Grid>
                  <Grid item={true} xs="auto">
                    <Box
                      sx={{
                        backgroundColor: '#E4F3FF',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        width: 'fit-content'
                      }}
                    >
                      <Typography
                        color="primary"
                        sx={{ textAlign: 'center' }}
                        variant="body2"
                      >
                        Single Order
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ marginBlock: '1rem' }} />
                <Grid
                  container={true}
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                  }}
                >
                  <Grid item={true} sx={{ marginRight: '0.5rem' }} xs="auto">
                    <img
                      alt="Profile"
                      src={SellerImage}
                      style={{
                        display: 'block',
                        height: 'auto',
                        marginRight: 'auto',
                        paddingLeft: '0rem !important',
                        width: '50%'
                      }} />
                  </Grid>
                  <Grid item={true} sx={{ marginLeft: '-2rem' }} xs={true}>
                    <Typography
                      color="neutral-90"
                      fontWeight="bold"
                      variant="h6"
                    >
                      Resto Bunda
                    </Typography>
                  </Grid>
                  <Grid item={true} xs="auto">
                    <Typography color="neutral-90" variant="body2">
                      2 Aug 2023
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container={true}
                  sx={{
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                    marginTop: '-0.25rem'
                  }}
                >
                  <Grid item={true} sx={{ marginRight: '1rem' }} xs="auto">
                    <img alt="Profile" src={ProductImage} />
                  </Grid>
                  <Grid item={true} xs={true}>
                    <Typography
                      color="neutral-90"
                      fontWeight="bold"
                      variant="body2"
                    >
                      Paket Ayam Pedes
                    </Typography>
                    <Typography color="neutral-70" variant="body2">
                      Rp. 25.000
                    </Typography>
                  </Grid>
                  <Grid item={true} xs="auto">
                    <Typography
                      color="neutral-90"
                      fontWeight="bold"
                      variant="body2"
                    >
                      1 Item
                    </Typography>
                  </Grid>
                </Grid>
                <TextField
                  disabled={true}
                  size="small"
                  sx={{
                    marginBottom: '1rem',
                    marginTop: '-0.5rem',
                    width: '100%'
                  }}
                  value="Gg. Tumpah 2 No.25"
                  variant="outlined" />
                <Grid
                  container={true}
                  sx={{
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                    marginTop: '-0.25rem'
                  }}
                >
                  <Grid item={true} sx={{ marginRight: '1rem' }} xs="auto">
                    <img alt="Profile" src={ProductImage} />
                  </Grid>
                  <Grid item={true} xs={true}>
                    <Typography
                      color="neutral-90"
                      fontWeight="bold"
                      variant="body2"
                    >
                      Paket Ayam Bakar
                    </Typography>
                    <Typography color="neutral-70" variant="body2">
                      Rp. 75.000
                    </Typography>
                  </Grid>
                  <Grid item={true} xs="auto">
                    <Typography
                      color="neutral-90"
                      fontWeight="bold"
                      variant="body2"
                    >
                      3 Item
                    </Typography>
                  </Grid>
                </Grid>
                <TextField
                  disabled={true}
                  size="small"
                  sx={{
                    marginBottom: '0.75rem',
                    marginTop: '-0.5rem',
                    width: '100%'
                  }}
                  value="Gg. Pedesaan Dekat Counter HP"
                  variant="outlined" />
              </Box>
            </Card>
          </Box>

          {chatOutput.map((message) => (
            <div key={message.id} style={{ paddingInline: '10px' }}>
              <Message message={message} />
            </div>
          ))}
        </Box>
        <Paper
          component="form"
          sx={{
            alignItems: 'center',
            background: theme.palette.grey[100],
            bottom: 0,
            boxShadow: '0px -4px 8px -2px rgba(16, 24, 40, 0.10)',
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '-1rem',
            p: 2,
            position: 'fixed',
            width: '100%'
          }}
        >
          <IconButton aria-label="attachment" sx={{ marginLeft: '-0.5rem' }}>
            <AttachmentFilled size={24} />
          </IconButton>

          <IconButton aria-label="attachment" sx={{ marginLeft: '-0.5rem' }}>
            <CameraAltFilled size={24} />
          </IconButton>
          <FormControl fullWidth={true} hiddenLabel={true} variant="outlined">
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleSend}
                  >
                    <SendFilled />
                  </IconButton>
                </InputAdornment>
              }
              fullWidth={true}
              id="outlined-adornment-password"
              label=""
              placeholder="Tulis Pesan Kamu..."
              size="small"
              sx={{ borderRadius: '24px' }}
              type="text"
              value={input}
              onChange={handleInputChange} />
          </FormControl>
        </Paper>
      </Box>
    </>
  );
};

ChatUI.displayName = 'ChatUI';
export default ChatUI;
