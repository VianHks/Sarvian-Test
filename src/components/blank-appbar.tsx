import { Link } from 'react-router-dom';

import { AppBar, styled, Toolbar, Typography, useTheme } from '@components/material.js';
import { app as appConfig } from '@config/app.js';

const LinkStyled = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  marginRight: theme.spacing(8),
  textDecoration: 'none'
}));

const BlankAppBar = () => {
  // ** Hooks & Vars
  const theme = useTheme();

  return (
    <AppBar
      color="default"
      position="sticky"
      sx={{
        backgroundColor: 'background.paper'
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
          p: (theme) => `${theme.spacing(0, 6)} !important`
        }}
      >
        <LinkStyled to="/">
          <img alt="logo" height={32} src={appConfig.logo} width={32} />
          <Typography
            sx={{
              fontWeight: 700,
              lineHeight: '24px',
              ml: 2.5
            }}
            variant="h4"
          >
            {appConfig.name}
          </Typography>
        </LinkStyled>
      </Toolbar>
    </AppBar>
  );
};

BlankAppBar.displayName = 'BlankAppBar';

export { BlankAppBar };
