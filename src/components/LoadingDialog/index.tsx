import React from 'react';
import { Dialog, DialogContent, CircularProgress, Typography } from '@mui/material';

interface LoadingDialogProps {
  open: boolean;
  message: string;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ open, message }) => {
  return (
    <Dialog open={open}>
      <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" style={{ marginTop: '1rem' }}>
          {message}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
