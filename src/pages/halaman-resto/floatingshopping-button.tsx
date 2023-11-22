import React from 'react';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Button } from '@mui/material';

import type { ButtonProps } from '@mui/material';

interface FloatingShoppingButtonProps extends ButtonProps {
  readonly onClick: React.MouseEventHandler<HTMLButtonElement>
}

const FloatingShoppingButton: React.FC<FloatingShoppingButtonProps> = ({ onClick, ...buttonProps }) => {
  return (
    <Button
      color="primary"
      sx={{
        position: 'fixed',
        bottom: '3rem',
        right: '3rem',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        zIndex: 100
      }}
      variant="contained"
      onClick={onClick}
      {...buttonProps}
    >
      <ShoppingBasketIcon />
    </Button>
  );
};

export default FloatingShoppingButton;
