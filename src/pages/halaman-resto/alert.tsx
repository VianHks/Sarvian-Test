import type { FC } from 'react';
import { forwardRef } from 'react';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import type { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomizedSnackbarsProps {
  readonly message: string
  readonly onClose: () => void
  readonly open: boolean
}

const CustomizedSnackbars: FC<CustomizedSnackbarsProps> = ({
  open,
  message,
  onClose
}) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar autoHideDuration={6000} open={open} onClose={onClose}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={onClose}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

CustomizedSnackbars.displayName = 'CustomizedSnackbars';
Alert.displayName = 'Alert';
export default CustomizedSnackbars;
