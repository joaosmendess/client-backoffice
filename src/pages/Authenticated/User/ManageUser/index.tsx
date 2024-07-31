import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Box, CircularProgress, Toolbar, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { getUserById, updateUser, createUser } from '../../../../services/userService';
import { fetchPermissionGroups } from '../../../../services/permissionGroupService';
import { getCompany } from '../../../../services/companyService';
import Success from '../../../../components/Messages/SuccessMessage';
import Error from '../../../../components/Messages/ErrorMessage';
import FormContainer from '../../../../components/FormContainer';
import FormButton from '../../../../components/FormButton';
import { PermissionGroup, Company } from '../../../../types';

const ManageUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [invitationEmail, setInvitationEmail] = useState('');
  const [password, setPassword] = useState(''); // Novo campo para senha
  const [companyId, setCompanyId] = useState<number | ''>(''); // Campo para companyId
  const [companies, setCompanies] = useState<Company[]>([]); // Estado para armazenar as empresas
  const [status, setStatus] = useState(''); // Valor inicial do status

  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([]);
  const [selectedPermissionGroup, setSelectedPermissionGroup] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchPermissionGroupsData = async () => {
      try {
        const groups = await fetchPermissionGroups();
        setPermissionGroups(groups);
      } catch (error) {
        console.error('Erro ao buscar grupos de permissão', error);
        setError('Erro ao buscar grupos de permissão');
      }
    };

    const fetchCompaniesData = async () => {
      try {
        let page = 1;
        let allCompanies: Company[] = [];
        let response;

        do {
          response = await getCompany(page);
          allCompanies = [...allCompanies, ...response.data];
          page++;
        } while (page <= response.last_page);

        setCompanies(allCompanies);
      } catch (error) {
        console.error('Erro ao buscar empresas', error);
        setError('Erro ao buscar empresas');
      }
    };

    fetchPermissionGroupsData();
    fetchCompaniesData();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const user = await getUserById(parseInt(id));
          console.log('Fetched user:', user);

          setName(user.name);
          setUsername(user.username);
          setInvitationEmail(user.invitationEmail);
          setStatus(user.status);
          setCompanyId(user.companyId);
          setSelectedPermissionGroup(user.permissionGroupId || '');
        } catch (error) {
          console.error('Erro ao buscar usuário', error);
          setError('Erro ao buscar usuário');
        }
      };
      fetchUser();
    }
  }, [id]);

  useEffect(() => {
    if (name && username && invitationEmail && companyId) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, username, invitationEmail, companyId]);

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

    if (!invitationEmail) {
      setEmailError('Email é obrigatório');
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      if (id) {
        await updateUser({
          id: parseInt(id),
          name,
          username,
          invitationEmail,
          companyId: companyId as number,
          status,
          permissionGroupId: selectedPermissionGroup
        });
        setSuccessMessage('Dados de usuário atualizados com sucesso!');
      } else {
        await createUser(name, username, invitationEmail, companyId as number, password);
        setSuccessMessage('Usuário criado com sucesso!');
        setName('');
        setUsername('');
        setInvitationEmail('');
        setStatus('Ativo');
        setPassword(''); // Resetando o campo de senha após o envio
        setCompanyId(''); // Resetando o campo de empresa após o envio
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
            value={invitationEmail}
            onChange={(e) => setInvitationEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
            error={!!emailError}
            helperText={emailError}
          />
          {!id && (
            <TextField
              label="Senha"
              id="input-password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
          )}
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="select-status-label">Status</InputLabel>
            <Select
              labelId="select-status-label"
              id="select-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem  id='menu-active' value="Ativo">Ativo</MenuItem>
              <MenuItem  id='menu-block' value="Bloqueado">Bloqueado</MenuItem>
              <MenuItem  id='menu-inactive' value="Inativo">Inativo</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="select-company-id-label">Empresa</InputLabel>
            <Select
              labelId="select-company-id-label"
              id="select-company-id"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value as number)}
              label="Empresa"
            >
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {id && (
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="select-permission-group-label">Grupo de Permissão</InputLabel>
              <Select
                labelId="select-permission-group-label"
                id="select-permission-group"
                value={selectedPermissionGroup}
                onChange={(e) => setSelectedPermissionGroup(e.target.value)}
                label="Grupo de Permissão"
              >
                {permissionGroups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Box display="flex" justifyContent="center" width="100%">
            <FormButton
              type="submit"
              id="button-manage-user"
              loading={loading}
              disabled={loading || isButtonDisabled}
            >
              {loading ? <CircularProgress size={24} /> : id ? 'Editar' : 'Criar usuário'}
            </FormButton>
          </Box>
        </form>
      </FormContainer>
    </>
  );
};

export default ManageUser;
