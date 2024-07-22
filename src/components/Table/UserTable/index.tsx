import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { User } from '../../../types';

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>, userName: string) => void;
  handleMenuClose: () => void;
  handleEditClick: (user: User) => void;
  handleDeleteClick: (userId: number) => void;
  anchorEl: null | HTMLElement;
  selectedUser: null | string;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  error,
  handleMenuClick,
  handleMenuClose,
  handleEditClick,
  handleDeleteClick,
  anchorEl,
  selectedUser,
}) => {
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {error && <Typography variant="body1" color="error">{error}</Typography>}
          {users.length === 0 ? (
            <Typography variant="body1" align="center">
              Usuário não encontrado
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={(event) => handleMenuClick(event, user.userName)}
                          id={`menu-button-${user.id}`}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl) && selectedUser === user.userName}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={() => handleEditClick(user)} id={`edit-button-${user.id}`}>
                            Editar
                          </MenuItem>
                          <MenuItem onClick={() => handleDeleteClick(user.id)} id={`delete-button-${user.id}`}>
                            Deletar
                          </MenuItem>
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
    </>
  );
};

export default UserTable;
