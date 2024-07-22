import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  SelectChangeEvent,
  Toolbar,
} from '@mui/material';
import { styled } from '@stitches/react'; 
import TabPanel from '../../../../components/PermissionTab';
import LoadingDialog from '../../../../components/LoadingDialog';
import { Module } from '../../../../types';
import { getModules, createPermissionGroupHasModule } from '../../../../services/auth';
import Error from '../../../../components/Messages/ErrorMessage';
import Success from '../../../../components/Messages/SuccessMessage';

const SaveButton = styled(Button, {
  marginTop: '1rem',
  backgroundColor: '#6a0dad'
});

interface Permission {
  id: number;
  name: string;
  get: boolean;
  post: boolean;
  put: boolean;
  delete: boolean;
  modules_id: number;
  permissions_groups_id: number;
  created_at: string;
  updated_at: string;
}

const PermissionForm: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [currentPermissions, setCurrentPermissions] = useState<Permission>({
    id: 0,
    name: '',
    get: true,
    post: false,
    put: false,
    delete: false,
    modules_id: 1,
    permissions_groups_id: 0,
    created_at: '',
    updated_at: '',
  });
  const [modules, setModules] = useState<Module[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const fetchedModules = await getModules();
        setModules(fetchedModules);
      } catch (error) {
        setError('Erro ao carregar dados');
        console.error('Erro ao carregar dados', error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchModules();
  }, []);

  const handleTabChange = (_event: React.ChangeEvent<object>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSaveGroupName = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess('Nome do grupo salvo com sucesso!');
    setTabValue(1);
  };

  const handleSavePermissions = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (groupName) {
        const newPermissionGroupHasModule = {
          modules_id: currentPermissions.modules_id,
          get: currentPermissions.get,
          post: currentPermissions.post,
          put: currentPermissions.put,
          delete: currentPermissions.delete,
          id: 0, // ID is generated on the backend
          created_at: '',
          updated_at: '',
          name: groupName,
          permissions_groups_id: 0, // Placeholder, update based on API response
        };
        await createPermissionGroupHasModule(newPermissionGroupHasModule);
        setSuccess('Permissões criadas com sucesso!');
        resetForm();
      }
    } catch (error) {
      console.error('Erro ao salvar permissões', error);
      setError('Erro ao salvar permissões');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPermissions((prevPermissions) => ({
      ...prevPermissions,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleModuleChange = (event: SelectChangeEvent<number | string>) => {
    const moduleId = event.target.value as number;
    setCurrentPermissions({
      ...currentPermissions,
      modules_id: moduleId,
    });
  };

  const resetForm = () => {
    setGroupName('');
    setCurrentPermissions({
      id: 0,
      name: '',
      get: true,
      post: false,
      put: false,
      delete: false,
      modules_id: 1,
      permissions_groups_id: 0,
      created_at: '',
      updated_at: '',
    });
    setTabValue(0);
  };

  return (
    <>
    <Toolbar/>
    <Toolbar/>
    <Box sx={{ maxWidth: '600px', margin: 'auto', mt: 4 }}>
      <LoadingDialog open={initialLoading} message="Carregando informações, por favor aguarde..." />
      {error && <Error message={error} />}
      {success && <Success message={success} />}
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Principais" />
        <Tab label="Módulos" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <form onSubmit={handleSaveGroupName}>
          <TextField
            label="Nome do grupo"
            variant="outlined"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            fullWidth
            margin="normal"
            disabled={loading}
            />
          <SaveButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Salvar
          </SaveButton>
        </form>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <form onSubmit={handleSavePermissions}>
          <FormControl fullWidth margin="normal" disabled={loading}>
            <InputLabel>Módulo</InputLabel>
            <Select
              label="Módulo"
              value={currentPermissions.modules_id || ''}
              onChange={handleModuleChange}
              required
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {modules.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  {module.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" flexDirection="column" alignItems="start" width="100%">
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentPermissions.get}
                  onChange={handlePermissionChange}
                  name="get"
                  disabled={true}
                />
              }
              label="Ler"
              />
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentPermissions.post}
                  onChange={handlePermissionChange}
                  name="post"
                  disabled={loading}
                />
              }
              label="Criar"
              />
            <FormControlLabel
              control={
                <Checkbox
                checked={currentPermissions.put}
                onChange={handlePermissionChange}
                name="put"
                  disabled={loading}
                />
              }
              label="Editar"
              />
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentPermissions.delete}
                  onChange={handlePermissionChange}
                  name="delete"
                  disabled={loading}
                />
              }
              label="Apagar"
            />
          </Box>
          <SaveButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Salvar
          </SaveButton>
        </form>
      </TabPanel>
    </Box>
            </>
  );
};

export default PermissionForm;
