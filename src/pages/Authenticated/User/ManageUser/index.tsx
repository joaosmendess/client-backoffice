import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Box, CircularProgress, Toolbar, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { getUserById, updateUser } from '../../../../services/userService';
import { register } from '../../../../services/registerService';
import Success from '../../../../components/Messages/SuccessMessage';
import Error from '../../../../components/Messages/ErrorMessage';
import FormContainer from '../../../../components/FormContainer';
import FormButton from '../../../../components/FormButton';

const ManageUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // Valor inicial do status
  const [companyId, setCompanyId] = useState<number | null>(null); // Inicializado como null
  const [tagCompany, setTagCompany] = useState<string>(''); // Inicializado como string vazia

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    // Obter o companyId e tagCompany do localStorage
    const loggedUser = JSON.parse(localStorage.getItem('customerData') || '{}');
    setCompanyId(loggedUser.companyId);
    setTagCompany(loggedUser.tagCompany);

    if (id) {
      const fetchUser = async () => {
        try {
          const user = await getUserById(parseInt(id));
          console.log('Fetched user:', user);
          
          setName(user.name);
          setUsername(user.username);
          setEmail(user.invitationEmail);
          setStatus(user.status);
          setCompanyId(user.companyId); // Isso pode ser necessário se você permitir que um usuário edite seu próprio perfil
          setTagCompany(user.tagCompany); // Isso pode ser necessário se você permitir que um usuário edite seu próprio perfil
        } catch (error) {
          console.error('Erro ao buscar usuário', error);
          setError('Erro ao buscar usuário');
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    let hasError = false;

    if (!name) {
      setNameError('Nome é obrigatório');
      hasError = true;
    } else {
      setNameError(null);
    }

    if (!username) {
      setUsernameError('Usuário é obrigatório');
      hasError = true;
    } else {
      setUsernameError(null);
    }

    if (!email) {
      setEmailError('Email é obrigatório');
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    if (!companyId) {
      setError('ID da empresa não encontrado.');
      setLoading(false);
      return;
    }

    try {
      if (id) {
        await updateUser({
          id: parseInt(id),
          name,
          username: username,
          invitationEmail: email,
          companyId: companyId,
          status,
          tagCompany: tagCompany, // Adiciona tagCompany ao atualizar
        });
        setSuccessMessage('Dados de usuário atualizados com sucesso!');
      } else {
        await register({
          name,
          username,
          invitationEmail: email,
          companyId,
          status,
          password: '0fm53nh4@2024'
        });
        setSuccessMessage('E-mail de confirmação enviado com sucesso!');
        setName('');
        setUsername('');
        setEmail('');
        setStatus('Ativo');
      }
    } catch (error) {
      console.error('Erro ao salvar usuário', error);
      setError('Erro ao salvar usuário');
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
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            label="Usuário"
            id="input-username"
            variant="outlined"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            margin="normal"
            error={!!usernameError}
            helperText={usernameError}
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
            error={!!emailError}
            helperText={emailError}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="select-status-label">Status</InputLabel>
            <Select
              labelId="select-status-label"
              id="select-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Ativo">Ativo</MenuItem>
              <MenuItem value="Bloqueado">Bloqueado</MenuItem>
              <MenuItem value="Inativo">Inativo</MenuItem>
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="center" width="100%">
            <FormButton
              type="submit"
              id="button-manage-user"
              loading={loading}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : id ? 'Editar' : 'Salvar'}
            </FormButton>
          </Box>
        </form>
      </FormContainer>
    </>
  );
};

export default ManageUser;
