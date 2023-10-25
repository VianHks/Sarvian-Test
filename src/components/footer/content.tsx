import { Link } from 'react-router-dom';

import type { Theme } from '@components/material.js';
import { Box, styled, Typography, useMediaQuery } from '@components/material.js';

const StyledCompanyName = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  fontWeight: 500,
  textDecoration: 'none'
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  color: `${theme.palette.text.secondary} !important`,
  textDecoration: 'none',

  '&:hover': {
    color: `${theme.palette.primary.main} !important`
  }
}));

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}
    >
      <Typography
        sx={{
          color: 'text.secondary',
          display: 'flex',
          mr: 2
        }}
      >
        {`© ${new Date().getFullYear()}, Made with `}
        <Box
          component="span"
          sx={{
            color: 'error.main',
            mx: 1
          }}
        >
          ❤️
        </Box>
        by
        <Typography component={StyledCompanyName} sx={{ ml: 1 }} target="_blank" to="https://pixinvent.com">
          Pixinvent
        </Typography>
      </Typography>
      {hidden
        ? null
        : (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',

            '& :not(:last-child)': { mr: 4 }
          }}
        >
          <Typography component={LinkStyled} target="_blank" to="https://themeforest.net/licenses/standard">
            License
          </Typography>
          <Typography component={LinkStyled} target="_blank" to="https://1.envato.market/pixinvent_portfolio">
            More Themes
          </Typography>
          <Typography
            component={LinkStyled}
            target="_blank"
            to="https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation"
          >
            Documentation
          </Typography>
          <Typography component={LinkStyled} target="_blank" to="https://pixinvent.ticksy.com">
            Support
          </Typography>
        </Box>
        )}
    </Box>
  );
};

FooterContent.displayName = 'FooterContent';

export { FooterContent };
