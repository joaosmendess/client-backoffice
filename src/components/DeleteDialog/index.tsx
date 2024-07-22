import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress
} from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm, loading }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza de que deseja excluir? Esta ação não pode ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button onClick={onConfirm} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Excluir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
