/* eslint-disable linebreak-style */
import { Avatar, Box, Paper, Typography, useTheme } from '@mui/material';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import fotoOrang from '@assets/images/User1.svg';
import SellerImage from '@assets/images/MieBaso.png';

interface MessageDataModel {
  date: string
  id: number
  sender: 'bot' | 'user'
  text: string
}
interface MessageProps {
  readonly message: MessageDataModel
}

const ChatDetail: React.FC<MessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const theme = useTheme();

  const getMessageColor = () => {
    return isBot ? theme.palette.grey[900] : theme.palette.grey[100];
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      <Box
        sx={{
          display: 'block',
          flexDirection: isBot ? 'row' : 'row-reverse',
          alignItems: 'center'
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', gap: '0.25rem', justifyContent: isBot ? 'flex-start' : 'flex-end' }}>
          <Avatar
            sx={{
              bgcolor: 'secondary.main',
              marginBottom: '0.5rem'
            }}
          >
           <img src={isBot ? SellerImage : fotoOrang} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </Avatar>
          <Typography sx={{ color: 'black' }}>{isBot ? 'Resto' : 'Anda'}</Typography>
        </Box>
        <Paper
          sx={{
            backgroundColor: isBot ? theme.palette.grey[100] : '#1F66D0',
            borderRadius: isBot
              ? '0px var(--1, 8px) var(--1, 8px) var(--1, 8px)'
              : 'var(--1, 8px) 0px var(--1, 8px) var(--1, 8px)',
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            p: 2
          }}
          variant="outlined"
        >
          <Typography sx={{ color: getMessageColor() }} variant="body2">{message.text}</Typography>
          <Box sx={{ alignItems: 'center', display: 'flex', gap: '1.5rem', justifyContent: 'space-between' }}>
            <Typography sx={{ color: getMessageColor(), fontSize: '8px', lineHeight: '12px' }}>{message.date}</Typography>
            <DoneAllIcon sx={{ fontSize: '1rem', color: isBot ? '#1F66D0' : 'white', alignItems: 'end', marginTop: '5px' }} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

ChatDetail.displayName = 'ChatDetail';

export default ChatDetail;
// export type { MessageDataModel };
