import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  TextField
} from '@mui/material';

interface EditDialogProps<T> {
  open: boolean;
  entity: T | null;
  onClose: () => void;
  onSave: (entity: T) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof T) => void;
  loading: boolean;
}

const EditDialog = <T extends object>({ open, entity, onClose, onSave, onChange, loading }: EditDialogProps<T>) => {
  const handleSave = () => {
    if (entity) {
      onSave(entity);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Faça as alterações necessárias e clique em salvar.
        </DialogContentText>
        {entity &&
          Object.keys(entity).map((key) => (
            <TextField
              key={key}
              margin="dense"
              label={key}
              type="text"
              fullWidth
              value={(entity as any)[key] || ''}
              onChange={(e) => onChange(e, key as keyof T)}
              disabled={loading}
            />
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button onClick={handleSave} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
