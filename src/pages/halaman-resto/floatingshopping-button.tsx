import React from 'react';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Button, useTheme } from '@mui/material';

import type { ButtonProps } from '@mui/material';

interface FloatingShoppingButtonProps extends ButtonProps {
  readonly onClick: React.MouseEventHandler<HTMLButtonElement>
}

const FloatingShoppingButton: React.FC<FloatingShoppingButtonProps> = ({ onClick, ...buttonProps }) => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        background: theme.palette.primary.gradient,
        borderRadius: '100%',
        bottom: '8rem',
        boxShadow: '2px -2px 8px 0px rgba(37, 105, 206, 0.24) inset, 0px 4px 4px 0px #8DBAFF inset',
        height: '65px',
        position: 'fixed',
        right: '2.75rem',
        width: '60px',
        zIndex: 100
      }}
      variant="contained"
      onClick={onClick}
      {...buttonProps}
    >
      <ShoppingBasketIcon style={{ fontSize: '2.5rem' }} />
    </Button>
  );
};

FloatingShoppingButton.displayName = 'FloatingShoppingButton';
export default FloatingShoppingButton;
