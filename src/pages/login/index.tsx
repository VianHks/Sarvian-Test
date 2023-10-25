import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { BrandFacebook, BrandGithub, BrandGoogle, BrandTwitter } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import {
  Box, Button, Divider, IconButton, Stack,
  styled, Typography, useMediaQuery, useTheme
} from '@components/material.js';
import type { BoxProps } from '@components/material.js';
import { app as appConfig } from '@config/app.js';
import { useAuth } from '@hooks/use-auth.js';
import { FooterIllustrations } from '@views/pages/auth/footer-illustration.js';

import loginImage from '@assets/images/pages/auth-v2-login-illustration-light.png';

const LoginIllustration = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(12),
  marginTop: theme.spacing(12),
  maxHeight: 680,
  zIndex: 2,
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  textDecoration: 'none'
}));

const LoginPage: PageComponent = () => {
  const auth = useAuth();
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogin = () => {
    auth.login();
  };

  return (
    <Box className="content-right" sx={{ backgroundColor: 'background.paper' }}>
      {!hidden
        ? (
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'customColors.bodyBg',
            borderRadius: '20px',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            margin: (theme) => theme.spacing(8, 0, 8, 8),
            position: 'relative'
          }}
        >
          <LoginIllustration alt="login-illustration" src={loginImage} />
          <FooterIllustrations />
        </Box>
        )
        : null}
      <RightWrapper>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            p: [6, 12]
          }}
        >
          <Box sx={{ maxWidth: 400, width: '100%' }}>
            <Box sx={{ my: 6 }}>
              <Typography sx={{ mb: 1.5 }} variant="h3">
                {`Welcome to ${appConfig.name}! 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>

            <Button fullWidth={true} sx={{ mb: 4 }} type="submit" variant="contained" onClick={handleLogin}>
              Login
            </Button>
            <Stack
              alignItems="center"
              direction="row"
              divider={<Divider flexItem={true} orientation="vertical" />}
              justifyContent="center"
              spacing={2}
            >
              <Typography component={LinkStyled} to="/forgot-password">
                Forgot Password?
              </Typography>
              <Typography component={LinkStyled} to="/register">
                Create an account
              </Typography>
            </Stack>
            <Divider
              sx={{
                color: 'text.disabled',
                fontSize: theme.typography.body2.fontSize,
                my: (theme) => `${theme.spacing(6)} !important`,

                '& .MuiDivider-wrapper': { px: 6 }
              }}
            >
              or
            </Divider>
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <IconButton
                component={Link}
                sx={{ color: '#497ce2' }}
                to="/"
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <BrandFacebook />
              </IconButton>
              <IconButton
                component={Link}
                sx={{ color: '#1da1f2' }}
                to="/"
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <BrandTwitter />
              </IconButton>
              <IconButton
                component={Link}
                sx={{ color: (theme) => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                to="/"
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <BrandGithub />
              </IconButton>
              <IconButton
                component={Link}
                sx={{ color: '#db4437' }}
                to="/"
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <BrandGoogle />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  );
};

LoginPage.auth = false;
LoginPage.displayName = 'LoginPage';
LoginPage.guest = true;
LoginPage.layout = 'blank';

export default LoginPage;
