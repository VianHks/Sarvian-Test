import type { FC, SyntheticEvent } from 'react';
import { useMemo, useState } from 'react';

import type { UserData } from '@nxweb/auth';
import { CreditCard, CurrencyDollar, InfoCircle, Lifebuoy, Logout, Settings as SettingsIcon, UserCheck } from '@nxweb/icons/tabler';

import { Avatar, Badge, Box, Divider, Menu, MenuItem, styled, Typography } from '@components/material.js';
import type { MenuItemProps } from '@components/material.js';
import { useAuth } from '@hooks/use-auth.js';
import type { Settings } from '@hooks/use-settings.js';

interface Props {
  readonly settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  borderRadius: '50%',
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  height: 8,
  width: 8
}));

const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}));

const UserDropdown: FC<Props> = ({ settings }) => {
  const { direction } = settings;

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { auth, logout } = useAuth();
  const user = useMemo<UserData>(() => (auth && auth.loggedIn && auth.user) || { name: 'Guest User' }, [auth]);

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const styles = {
    alignItems: 'center',
    color: 'text.primary',
    display: 'flex',
    px: 4,
    py: 1.75,
    textDecoration: 'none',
    width: '100%',

    '& svg': {
      color: 'text.secondary',
      fontSize: '1.5rem',
      mr: 2.5
    }
  };

  const handleLogout = () => {
    logout().then(() => { setAnchorEl(null); });
  };

  return (
    <>
      <Box sx={{ alignItems: 'center', display: 'flex' }}>
        <Box sx={{ alignItems: 'flex-end', display: 'flex', flexDirection: 'column', ml: 2.5 }}>
          <Typography sx={{ fontWeight: 500 }}>{user.name}</Typography>
          { user.email ? <Typography variant="body2">{user.email}</Typography> : null }
        </Box>
        <Badge
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom'
          }}
          badgeContent={<BadgeContentSpan />}
          overlap="circular"
          sx={{ cursor: 'pointer', ml: 2 }}
          onClick={handleDropdownOpen}
        >
          <Avatar
            alt={user.name}
            src={user.picture}
            sx={{ height: 38, width: 38 }}
            onClick={handleDropdownOpen} />
        </Badge>
      </Box>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: direction === 'ltr' ? 'right' : 'left', vertical: 'bottom' }}
        open={Boolean(anchorEl)}
        sx={{ '& .MuiMenu-paper': { mt: 4.75, width: 230 } }}
        transformOrigin={{ horizontal: direction === 'ltr' ? 'right' : 'left', vertical: 'top' }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItemStyled sx={{ p: 0 }} onClick={() => setAnchorEl(null)}>
          <Box sx={styles}>
            <UserCheck />
            My Profile
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => setAnchorEl(null)}>
          <Box sx={styles}>
            <SettingsIcon />
            Settings
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => setAnchorEl(null)}>
          <Box sx={styles}>
            <CreditCard />
            Billing
          </Box>
        </MenuItemStyled>
        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={() => setAnchorEl(null)}>
          <Box sx={styles}>
            <Lifebuoy />
            Help
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => setAnchorEl(null)}>
          <Box sx={styles}>
            <InfoCircle />
            FAQ
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => setAnchorEl(null)}>
          <Box sx={styles}>
            <CurrencyDollar />
            Pricing
          </Box>
        </MenuItemStyled>
        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={handleLogout}>
          <Box sx={styles}>
            <Logout />
            Sign Out
          </Box>
        </MenuItemStyled>
      </Menu>
    </>
  );
};

UserDropdown.displayName = 'UserDropdown';

export { UserDropdown };
