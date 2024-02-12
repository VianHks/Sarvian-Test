/* eslint-disable linebreak-style */
import type { FC } from 'react';
import {  forwardRef } from 'react';

import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import type { AlertProps } from '@mui/material/Alert';
import type { SlideProps } from '@mui/material/Slide';

interface CustSnackBarProps {
  readonly message: string
  readonly onClose?: () => void
  readonly severity: 'error' | 'info' | 'success' | 'warning'

}
type TransitionProps = Omit<SlideProps, 'direction'>;

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransitionLeft = (props: TransitionProps) => {
  return <Slide {...props} direction="left" />;
};

const CustSnackBar: FC<CustSnackBarProps> = ({ message, severity, onClose }) => {
  const transition = TransitionLeft as React.ComponentType<TransitionProps>;

  const handleClose = (_event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    if (onClose) {
      onClose();
    }
  };

  return (
        <Stack spacing={2} sx={{ width: '100%' }}>

            <Snackbar TransitionComponent={transition} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={5000} open={true} onClose={handleClose}>
                <Alert severity={severity} sx={{ width: '100%' }} onClose={handleClose}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
  );
};

CustSnackBar.displayName = 'CustSnackBar';
Alert.displayName = 'Alert';
TransitionLeft.displayName = 'TransitionLeft';
export { CustSnackBar };
export type { CustSnackBarProps };
