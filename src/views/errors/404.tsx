import { Link } from 'react-router-dom';

import { FooterIllustrations } from '@components/illustrations/footer-illustrations.js';
import { Box, Button, styled, Typography } from '@components/material.js';
import type { BoxProps } from '@components/material.js';

import image404 from '@assets/images/pages/404.png';

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}));

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}));

const Error404 = () => {
  return (
    <Box className="content-center">
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 5,
          textAlign: 'center'
        }}
      >
        <BoxWrapper>
          <Typography sx={{ mb: 1.5 }} variant="h2">
            Page Not Found :(
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              mb: 6
            }}
          >
            Oops! 😖 The requested URL was not found on this server.
          </Typography>
          <Button component={Link} to="/" variant="contained">
            Back to Home
          </Button>
        </BoxWrapper>
        <Img alt="error-illustration" height="500" src={image404} />
      </Box>
      <FooterIllustrations />
    </Box>
  );
};

Error404.displayName = 'Error404';

export default Error404;
