import React, { useState, useEffect } from 'react';
import { styled } from '../../../../stitches.config';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, CircularProgress, Toolbar } from '@mui/material';
import { getPermissionGroups, createUser } from '../../../../services/auth';
import { PermissionGroup } from '../../../../types';
import Success from '../../../../components/Messages/SuccessMessage';
import Error from '../../../../components/Messages/ErrorMessage';

const FormContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  borderRadius: '8px',
  maxWidth: '400px',
  margin: '0 auto',
});

const SaveButton = styled(Button, {
  marginTop: '1rem',
  backgroundColor: '#6a0dad'

});

const ManageUser: React.FC = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [permissionGroupId, setPermissionGroupId] = useState<number | string>('');
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPermissionGroups();
        setPermissionGroups(data);
      } catch (error) {
        console.error('Erro ao buscar grupos de permissões', error);
        setError('Erro ao buscar grupos de permissões');
      }
    };
    fetchData();
  }, []);
 
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await createUser(name, userName, email, Number(permissionGroupId));
      setSuccessMessage('Usuário criado com sucesso!');
      // Limpar o formulário após a criação do usuário
      setName('');
      setUserName('');
      setEmail('');
      setPermissionGroupId('');
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      setError('Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toolbar /> 
      <FormContainer>
        {error && <Error message={error} />}
        {successMessage && <Success message={successMessage} />}
        <form onSubmit={handleSave}>
          <TextField
            label="Nome"
            id="input-name"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Usuário"
            id="input-username"
            variant="outlined"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            id="input-email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
         <FormControl fullWidth margin="normal">
            <InputLabel>Grupo de permissão</InputLabel>
            <Select
              value={permissionGroupId}
              id="select-permission-group"
              onChange={(e) => setPermissionGroupId(e.target.value as string)}
              required
              label="Grupo de permissão"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {permissionGroups.map((group) => (
                <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <SaveButton 
          type="submit"
          id='button-manage-user'
          variant="contained"
          color="primary"
          fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Salvar'}
          </SaveButton>
        </form>
      </FormContainer>
    </>
  );
};

export default ManageUser;
