import React, { useState } from 'react';
import { Container, TextField, Button, Toolbar, LinearProgress, Grid, Tabs, Tab, Box } from '@mui/material';
import { styled } from '@stitches/react';

import { createCompany } from '../../../services/auth';
import Error from '../../../components/Messages/ErrorMessage';
import Success from '../../../components/Messages/SuccessMessage';

const FormContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  justifyContent: 'center',
  alignItems: 'center'
});

const formatCNPJ = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove todos os caracteres não numéricos
    .replace(/^(\d{2})(\d)/, '$1.$2') // Adiciona ponto após os dois primeiros dígitos
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Adiciona ponto após os próximos três dígitos
    .replace(/\.(\d{3})(\d)/, '.$1/$2') // Adiciona barra após os próximos três dígitos
    .replace(/(\d{4})(\d)/, '$1-$2') // Adiciona hífen após os próximos quatro dígitos
    .replace(/(-\d{2})\d+?$/, '$1'); // Limita o número de dígitos após o hífen
};

const cleanCNPJ = (value: string) => {
  return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
};

const ManageCompany: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [ssoName, setSsoName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCnpj(formatCNPJ(e.target.value));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const cleanedCnpj = cleanCNPJ(cnpj);
      const newCompany = await createCompany(name, cleanedCnpj, clientId, clientSecret, ssoName, tenantId);
      console.log('Empresa criada com sucesso:', newCompany);
      setMessage('Empresa criada com sucesso!');
      setSeverity('success');
      setName('');
      setCnpj('');
      setClientId('');
      setClientSecret('');
      setTenantId('');
      setSsoName('');
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      setMessage('Erro ao criar empresa');
      setSeverity('error');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.ChangeEvent<object>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Toolbar />
      {loading && <LinearProgress />}
      <FormContainer maxWidth="xs">
        {severity === 'error' && <Error message={message as string} />}
        {severity === 'success' && <Success message={message as string} />}
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Dados Principais" />
          <Tab label="Dados SSO Externo" />
        </Tabs>
        <Box mt={2} width="100%">
          {tabIndex === 0 && (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  label="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex.: Nome da Empresa"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="CNPJ"
                  value={cnpj}
                  onChange={handleCnpjChange}
                  placeholder="Ex.: 00.000.000/0000-00"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          )}
          {tabIndex === 1 && (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <TextField
                  label="Client ID"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Client ID"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Client Secret"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  placeholder="Client Secret"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tenant ID"
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  placeholder="Tenant ID"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nome do SSO"
                  value={ssoName}
                  onChange={(e) => setSsoName(e.target.value)}
                  placeholder="Nome do SSO"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          )}
        </Box>
        <Grid container spacing={1} justifyContent="center" mt={2}>
        
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </FormContainer>
    </>
  );
};

export default ManageCompany;
