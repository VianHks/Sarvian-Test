import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Alert, Avatar, Box, Card, Grid, Typography } from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import RestoFoto from '@assets/images/RestoFoto.svg';

const DUMMY_ChatList = [
  {
    id: 1,
    userName: 'Pa Hasan',
    isi: 'Kurang suka sama sambelnya terlalu pedes',
    tanggal: '12 Juni 2023',
    status: 'ceklis'
  },
  {
    id: 2,
    userName: 'Bu Winda',
    isi: 'suka banget rasanya',
    tanggal: '25 Agustus 2023',
    status: 'send'
  },
  {
    id: 3,
    userName: 'Retno',
    isi: 'Udah terimakasih',
    tanggal: '7 September 2023',
    status: 'read'
  }
];

const Chat: PageComponent = () => {
  const navigate = useNavigate();

  const [chatList, setChatList] = useState(DUMMY_ChatList);

  const handleClick = () => {
    // Navigate to your desired route
    navigate('/chat-detail');
  };

  return (
    <Box sx={{ margin: '1rem 1.5rem' }}>
      <Grid item={true} xs={12}>
        <Alert
          color="warning"
          severity="warning"
          sx={{ alignItems: 'center', display: 'flex' }}
        >
          <Typography sx={{ fontSize: '12px' }} variant="h5">
            Chat akan hilang dalam 2x24 jam dan akan dikirim melalui email.
          </Typography>
        </Alert>
      </Grid>
      {chatList.map((obj) => (
        <Card
          key={obj.id}
          sx={{
            borderColor: 'transparent',
            marginBottom: '-1.5rem',
            padding: '0.5rem',
            marginTop: '2rem'
          }}
          onClick={handleClick}
        >
          <Grid container={true} spacing={1}>
            <Grid
              item={true}
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}
              xs={2}
            >
              <Avatar src={RestoFoto} sx={{ height: '50px', width: '50px' }} />
            </Grid>
            <Grid
              item={true}
              sx={{
                marginLeft: '10px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'start',
                paddingTop: '0rem!important'
              }}
              xs={6}
            >
              <Box>
                <Typography
                  sx={{
                    marginLeft: '5px',
                    fontWeight: 'bold',
                    textAlign: 'start',
                    color: 'black'
                  }}
                  variant="h6"
                >
                  {obj.userName}
                </Typography>
                <Box
                  sx={{
                    fontSize: '0.8rem',
                    marginLeft: '5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {obj.isi.length > 10 ? `${obj.isi.slice(0, 15)}...` : obj.isi}
                </Box>
              </Box>
            </Grid>
            <Grid
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'end'
              }}
              xs="auto"
            >
              <Box>
                <Typography
                  sx={{
                    marginLeft: '5px',
                    fontWeight: 'medium',
                    textAlign: 'start',
                    fontSize: '0.6rem',
                    marginTop: '0.25rem'
                  }}
                  variant="h6"
                >
                  {obj.tanggal}
                </Typography>
                {obj.status === 'ceklis' && (
                  <Grid sx={{ marginLeft: '50px' }}>
                    <CheckIcon
                      sx={{
                        fontSize: '1rem',
                        alignItems: 'end',
                        marginTop: '5px'
                      }} />
                  </Grid>
                )}
                {obj.status === 'send' && (
                  <Grid sx={{ marginLeft: '50px' }}>
                    <DoneAllIcon
                      sx={{
                        fontSize: '1rem',
                        alignItems: 'end',
                        marginTop: '5px'
                      }} />
                  </Grid>
                )}
                {obj.status === 'read' && (
                  <Grid sx={{ marginLeft: '50px' }}>
                    <DoneAllIcon
                      sx={{
                        fontSize: '1rem',
                        color: 'blue',
                        alignItems: 'end',
                        marginTop: '5px'
                      }} />
                  </Grid>
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  );
};

Chat.displayName = 'Chat';

export default Chat;
export { DUMMY_ChatList };
