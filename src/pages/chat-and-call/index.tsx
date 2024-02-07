import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { WarningAmber } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Avatar, Box, Card, Divider, Grid, Typography, useTheme } from '@mui/material';

import type { PageComponent } from '@nxweb/react';

import RestoFoto from '@assets/images/RestoFoto.svg';

interface chatListData {
  id: string
  isi: string
  status: string
  tanggal: string
  userName: string
}

const DUMMY_ChatList: chatListData[] = [
  {
    id: '1',
    isi: 'Kurang suka sama sambelnya terlalu pedes',
    status: 'ceklis',
    tanggal: '12 Juni 2023',
    userName: 'Pa Hasan'
  },
  {
    id: '2',
    isi: 'suka banget rasanya',
    status: 'send',
    tanggal: '25 Agustus 2023',
    userName: 'Bu Winda'
  },
  {
    id: '3',
    isi: 'Udah terimakasih',
    status: 'read',
    tanggal: '7 September 2023',
    userName: 'Retno'
  }
];

const Chat: PageComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    // Navigate to your desired route
    navigate(`/chat-detail?id=${id}`);
  };

  return (
    <Box sx={{ margin: '1rem 1.5rem' }}>
      <Typography
        color={theme.palette.grey[900]}
        fontWeight="bold"
        sx={{ marginBlock: '1rem' }}
        variant="h4"
      >
        Chat
      </Typography>
      <Grid
        item={true}
        sx={{
          backgroundColor: '#FFE6B1',
          borderRadius: '0.5rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
          padding: '0.5rem'
        }}
        xs={12}
      >
        <WarningAmber sx={{ color: '#FFA73D' }} />
        <Typography sx={{ fontSize: '12px' }} variant="h5">
          Chat akan hilang dalam 2x24 jam dan akan dikirim melalui email.
        </Typography>
      </Grid>
      {DUMMY_ChatList.map((obj) => (
        <Box
          key={obj.id}
          sx={{
            borderColor: 'transparent',
            marginBottom: '-1.5rem',
            marginTop: '2rem',
            padding: '0.5rem'
          }}
          onClick={() => handleClick(obj.id)}
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
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'start',
                marginLeft: '10px',
                paddingTop: '0rem!important'
              }}
              xs={6}
            >
              <Box>
                <Typography
                  sx={{
                    color: 'black',
                    fontWeight: 'bold',
                    marginLeft: '5px',
                    textAlign: 'start'
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
                    fontSize: '0.6rem',
                    fontWeight: 'medium',
                    marginLeft: '5px',
                    marginTop: '0.25rem',
                    textAlign: 'start'
                  }}
                  variant="h6"
                >
                  {obj.tanggal}
                </Typography>
                {obj.status === 'ceklis' && (
                  <Grid sx={{ marginLeft: '50px' }}>
                    <CheckIcon
                      sx={{
                        alignItems: 'end',
                        fontSize: '1rem',
                        marginTop: '5px'
                      }} />
                  </Grid>
                )}
                {obj.status === 'send' && (
                  <Grid sx={{ marginLeft: '50px' }}>
                    <DoneAllIcon
                      sx={{
                        alignItems: 'end',
                        fontSize: '1rem',
                        marginTop: '5px'
                      }} />
                  </Grid>
                )}
                {obj.status === 'read' && (
                  <Grid sx={{ marginLeft: '50px' }}>
                    <DoneAllIcon
                      sx={{
                        alignItems: 'end',
                        color: 'blue',
                        fontSize: '1rem',
                        marginTop: '5px'
                      }} />
                  </Grid>
                )}
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: '1rem' }} />
        </Box>
      ))}
    </Box>
  );
};

Chat.displayName = 'Chat';

export default Chat;
export { DUMMY_ChatList };
export type { chatListData };
