/* eslint-disable react/display-name */
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
        borderRadius: '100%',
        bottom: '3rem',
        height: '65px',
        position: 'fixed',
        right: '3rem',
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

export default FloatingShoppingButton;
