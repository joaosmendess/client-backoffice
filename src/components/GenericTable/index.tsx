/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface TableData {
  [key: string]: any;
}

interface GenericTableProps<T> {
  columns: string[];
  data: T[];
  loading: boolean;
  error: string | null;
  handleEdit: (item: T) => void;
  handleDelete: (item: T) => void;
}

const columnLabels: { [key: string]: string } = {
  name: 'Nome',
  username: 'Nome de usuário',
  invitationEmail: 'Email de Convite',
  description: 'Descrição',
  status: 'Status'
  // Adicione outros mapeamentos de colunas conforme necessário
};

const statusStyles: { [key: string]: { color: string; fontWeight: string } } = {
  ativo: { color: 'green', fontWeight: 'bold' },
  inativo: { color: 'red', fontWeight: 'bold' },
};
const GenericTable = <T extends TableData>({ columns, data, loading, error, handleEdit, handleDelete }: GenericTableProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<null | T>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, item: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleEditClick = () => {
    if (selectedItem) {
      handleEdit(selectedItem);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (selectedItem) {
      setConfirmOpen(true);
    }
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      handleDelete(selectedItem);
    }
    setConfirmOpen(false);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {error && <Typography variant="body1" color="error">{error}</Typography>}
          {data.length === 0 ? (
            <Typography variant="body1" align="center">Nenhum dado encontrado</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column}>{columnLabels[column] || column}</TableCell>
                    ))}
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell
                          key={column}
                          style={column === 'status' ? statusStyles[item[column]] : {}}
                        >
                          {item[column]}
                        </TableCell>
                      ))}
                      <TableCell>
                        <IconButton onClick={(event) => handleMenuClick(event, item)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleEditClick}>Editar</MenuItem>
                          <MenuItem onClick={handleDeleteClick}>Excluir</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      <Dialog open={confirmOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Confirmar Exclusão
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir este item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GenericTable;
