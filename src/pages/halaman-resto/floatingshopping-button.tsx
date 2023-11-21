import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

interface FloatingShoppingButtonProps extends ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const FloatingShoppingButton: React.FC<FloatingShoppingButtonProps> = ({ onClick, ...buttonProps }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
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
      {...buttonProps}
    >
      <ShoppingBasketIcon />
    </Button>
  );
};

export default FloatingShoppingButton;