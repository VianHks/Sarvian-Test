/* eslint-disable react/display-name */
/* eslint-disable linebreak-style */
import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import type { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomizedSnackbarsProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const CustomizedSnackbars: React.FC<CustomizedSnackbarsProps> = ({
  open,
  message,
  onClose
}) => {
  return (
    <Stack spacing={2} sx={{ width: '100%'}}>
      <Snackbar autoHideDuration={6000} open={open} onClose={onClose}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={onClose}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomizedSnackbars;
