import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getApplications, softDeleteApplication, updateApplication } from '../../../services/auth'; // Altere para o caminho correto
import { Application } from '../../../types';
import EditDialog from '../../../components/EditDialog';
import DeleteDialog from '../../../components/DeleteDialog';

const ListContainer = styled(Container, {
  marginTop: '20px',
});

const ListApplication: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        setError('Erro ao buscar aplicações');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, application: Application) => {
    setAnchorEl(event.currentTarget);
    setSelectedApp(application);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
    handleMenuClose();
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
    setSelectedApp(null);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteClose = () => {
    setIsDeleteDialogOpen(false);
    setSelectedApp(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedApp && selectedApp.id !== undefined) {
      setActionLoading(true);
      try {
        await softDeleteApplication(selectedApp.id);
        setApplications(applications.filter(app => app.id !== selectedApp.id));
        setError(null);
      } catch (error) {
        setError('Erro ao excluir aplicação');
      } finally {
        setActionLoading(false);
        handleDeleteClose();
      }
    }
  };

  const handleEditSave = async (application: Application) => {
    if (application) {
      setActionLoading(true);
      try {
        await updateApplication(application);
        setApplications(applications.map(app => app.id === application.id ? application : app));
        setError(null);
      } catch (error) {
        setError('Erro ao atualizar aplicação');
      } finally {
        setActionLoading(false);
        handleEditClose();
      }
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Application) => {
    if (selectedApp) {
      setSelectedApp({ ...selectedApp, [field]: e.target.value });
    }
  };

  const filteredApplications = applications.filter(application =>
    application.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Toolbar />
      <ListContainer maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        ) : (
          filteredApplications.map((application) => (
            <Paper key={application.id} sx={{ padding: '16px', margin: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6">{application.name}</Typography>
                <Typography variant="body2">{application.description}</Typography>
                <Typography variant="body2">URL de Desenvolvimento: {application.developUrl}</Typography>
                <Typography variant="body2">URL de Homologação: {application.homologUrl}</Typography>
                <Typography variant="body2">URL de Produção: {application.productionUrl}</Typography>
              </Box>
              <IconButton onClick={(e) => handleMenuClick(e, application)}>
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
            </Paper>
          ))
        )}
        <Toolbar />
      </ListContainer>
      
      <EditDialog<Application>
        open={isEditDialogOpen}
        entity={selectedApp}
        onClose={handleEditClose}
        onSave={handleEditSave}
        onChange={handleEditChange}
        loading={actionLoading}
      />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
        loading={actionLoading}
      />
    </div>
  );
};

export default ListApplication;
