import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Paper,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ListItemWithMenuProps {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  renderItemDetails: (item: any) => React.ReactNode;
}

const ListItemWithMenu: React.FC<ListItemWithMenuProps> = ({ item, onEdit, onDelete, renderItemDetails }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    onEdit(item);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    setActionLoading(true);
    try {
      await onDelete(item);
    } finally {
      setActionLoading(false);
      handleDeleteClose();
    }
  };

  return (
    <>
      <Paper className="list-item-with-menu">
        <Box sx={{ flex: 1 }}>
          {renderItemDetails(item)}
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditClick}>Editar</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Excluir</MenuItem>
          </Menu>
        </Box>
      </Paper>

      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Excluir</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza de que deseja excluir este item?</DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleDeleteClose}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} disabled={actionLoading}>
            {actionLoading ? <CircularProgress size={24} /> : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListItemWithMenu;
