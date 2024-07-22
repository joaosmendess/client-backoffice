import React, { useState, useEffect } from 'react';
import { Box, Toolbar, SelectChangeEvent, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { getUsers, updateUsers, deleteUser } from '../../../../services/auth';
import { User } from '../../../../types';
import HeaderTable from '../../../../components/HeaderTable';
import UserTable from '../../../../components/Table/UserTable';
import Success from '../../../../components/Messages/SuccessMessage';

const ListUsers: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<null | string>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [editUser, setEditUser] = useState<null | User>(null);
  const [deleteUserId, setDeleteUserId] = useState<null | number>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        setError('Erro ao buscar lista de usuários');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let sortedUsers = [...users];
    if (sortBy === 'newest') {
      sortedUsers = sortedUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'oldest') {
      sortedUsers = sortedUsers.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortBy === 'name') {
      sortedUsers = sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredUsers(
      sortedUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users, sortBy]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, userName: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const handleEditClick = (user: User) => {
    setEditUser(user);
  };

  const handleEditClose = () => {
    setEditUser(null);
  };

  const handleEditSave = async () => {
    if (editUser) {
      try {
        const updatedUser = await updateUsers(editUser.id, editUser.name, editUser.userName, editUser.status);
        setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
        setSuccessMessage('Usuário atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar usuário', error);
      } finally {
        setEditUser(null);
      }
    }
  };

  const handleDeleteClick = (userId: number) => {
    setDeleteUserId(userId);
  };

  const handleDeleteClose = () => {
    setDeleteUserId(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteUserId) {
      try {
        await deleteUser(deleteUserId);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== deleteUserId));
        setSuccessMessage('Usuário deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar usuário', error);
      } finally {
        setDeleteUserId(null);
      }
    }
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '1rem' }}>
        {successMessage && <Success message={successMessage} />}
        <HeaderTable
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          sortBy={sortBy}
          handleSortChange={handleSortChange}
        />
        <UserTable
          users={filteredUsers}
          loading={loading}
          error={error}
          handleMenuClick={handleMenuClick}
          handleMenuClose={handleMenuClose}
          anchorEl={anchorEl}
          selectedUser={selectedUser}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      </Box>

      {editUser && (
        <Dialog open={Boolean(editUser)} onClose={handleEditClose}>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Faça as alterações necessárias nos campos abaixo.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Nome"
              fullWidth
              value={editUser.name}
              id="name"
              onChange={e => setEditUser({ ...editUser, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Usuário"
              fullWidth
              value={editUser.userName}
              id="userName"
              onChange={e => setEditUser({ ...editUser, userName: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Status"
              fullWidth
              value={editUser.status}
              id="status"
              onChange={e => setEditUser({ ...editUser, status: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} id="fechar-modal">Cancelar</Button>
            <Button onClick={handleEditSave} id="salvar-usuario">Salvar</Button>
          </DialogActions>
        </Dialog>
      )}

      {deleteUserId && (
        <Dialog open={Boolean(deleteUserId)} onClose={handleDeleteClose}>
          <DialogTitle>Deletar Usuário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} id="fechar-modal-delete">Cancelar</Button>
            <Button onClick={handleDeleteConfirm} id="confirmar-delete">Deletar</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ListUsers;
